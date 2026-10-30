// Executa uma sessão (dia, teste ou revisão): mostra um passo por vez e salva após cada resposta.
import { useEffect, useState } from 'react'
import { DAY_PLAN, getPhrase, getWeek, weekOfPhrase } from '../content'
import {
  ACHIEVEMENTS, addXp, buildReviewSession, buildTestSession, checkAchievements, dayKey, markLearned, recordAnswer,
  type Quality,
} from '../lib/progress'
import { update, useStore } from '../lib/store'
import { today } from '../lib/util'
import type { AppState, Session, Step } from '../types'
import { Icon } from '../ui/Icon'
import { Bar, Button, Eyebrow } from '../ui/kit'
import {
  CardExercise, ChoiceExercise, FillExercise, LearnPhrase, ListenExercise, OrderExercise, WriteExercise,
  type ExerciseProps,
} from './exercises'
import { TextReader } from './TextReader'

const EXERCISES: Partial<Record<Step['t'], (p: ExerciseProps) => React.JSX.Element>> = {
  choice: ChoiceExercise,
  fill: FillExercise,
  order: OrderExercise,
  listen: ListenExercise,
  write: WriteExercise,
  card: CardExercise,
}

const PASS = 0.8

function setSession(fn: (s: Session) => Session | undefined) {
  update((st) => (st.session ? { ...st, session: fn(st.session) } : st))
}

/** Avança um passo; se errou (fora do teste), o exercício volta no fim da sessão. */
function answer(st: AppState, step: Step, ok: boolean, quality: Quality): AppState {
  const ses = st.session!
  let s = st
  if (step.id) s = recordAnswer(s, step.id, quality, step.t)
  if (ok) s = addXp(s, step.retry ? 5 : 10)
  const steps = [...ses.steps]
  if (!ok && ses.kind !== 'test' && step.id) {
    // reinserir antes do resultado
    steps.splice(steps.length - 1, 0, { ...step, retry: true })
  }
  return { ...s, session: { ...ses, steps, pos: ses.pos + 1, answers: [...ses.answers, { ok, id: step.id, t: step.t, retry: step.retry }] } }
}

export function SessionRunner({ onExit, onNavigate }: { onExit: () => void; onNavigate: (to: string) => void }) {
  const st = useStore()
  const session = st.session
  const [toast, setToast] = useState<string[]>([])
  useEffect(() => {
    if (!toast.length) return
    const t = setTimeout(() => setToast([]), 3500)
    return () => clearTimeout(t)
  }, [toast])

  if (!session) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <p className="text-muted">Nenhuma atividade em andamento.</p>
        <Button className="mt-6" onClick={onExit}>Voltar ao início</Button>
      </div>
    )
  }

  const step = session.steps[session.pos] ?? { t: 'result' }
  const total = session.steps.length - 1
  const week = session.week ? getWeek(session.week) : undefined

  function finishWith(fn: (s: AppState) => AppState) {
    update((s) => {
      const r = checkAchievements(fn(s))
      if (r.unlocked.length) setToast(r.unlocked)
      return r.state
    })
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-xl flex-col px-5 pb-10">
      <div className="sticky top-[env(safe-area-inset-top)] z-20 -mx-5 mb-6 flex items-center gap-3 bg-bg/90 px-5 pt-3 pb-3 backdrop-blur-xl">
        <button
          onClick={onExit}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line bg-surface text-ink transition active:scale-90"
          aria-label="Sair (o progresso fica salvo)"
        >
          <Icon name="x" size={20} />
        </button>
        <Bar value={session.pos / Math.max(1, total)} className="h-2" />
        <span className="min-w-12 text-right text-sm font-semibold text-muted tabular-nums">{Math.min(session.pos, total)}/{total}</span>
      </div>

      <div key={`${session.key}-${session.pos}`} className="rise flex-1">
        {step.t === 'intro' && <Intro session={session} onStart={() => setSession((s) => ({ ...s, pos: s.pos + 1 }))} />}

        {step.t === 'learn' && step.id && (
          <LearnPhrase
            phrase={getPhrase(step.id)}
            index={Number(step.id.slice(-2))}
            theme={getWeek(weekOfPhrase(step.id))!.theme}
            level={getWeek(weekOfPhrase(step.id))!.level}
            struggling={(st.phrases[step.id]?.lapses ?? 0) >= 2}
            onContinue={() =>
              update((s) => {
                const r = checkAchievements(addXp(markLearned(s, step.id!), 5))
                if (r.unlocked.length) setToast(r.unlocked)
                return { ...r.state, session: { ...s.session!, pos: s.session!.pos + 1 } }
              })
            }
          />
        )}

        {step.id && EXERCISES[step.t] && (() => {
          const Ex = EXERCISES[step.t]!
          return (
            <Ex
              phrase={getPhrase(step.id)}
              seed={`${session.key}-${session.pos}-${step.id}`}
              test={session.kind === 'test'}
              onResult={(ok, q) => update((s) => answer(s, step, ok, q))}
            />
          )
        })()}

        {step.t === 'text' && week && (
          <TextStep week={week} onDone={() => update((s) => ({
            ...addXp(s, 30),
            texts: { ...s.texts, [week.n]: { ...s.texts[week.n], readAt: today() } },
            session: { ...s.session!, pos: s.session!.pos + 1 },
          }))} />
        )}

        {step.t === 'textq' && week && step.i !== undefined && (
          <TextQuestion
            key={session.pos}
            q={week.text.questions[step.i]}
            n={step.i + 1}
            total={week.text.questions.length}
            onResult={(ok) => update((s) => answer(s, step, ok, ok ? 2 : 0))}
          />
        )}

        {step.t === 'result' && (
          <Result session={session} state={st} finishWith={finishWith} onExit={onExit} onNavigate={onNavigate} />
        )}
      </div>

      {toast.length > 0 && (
        <div className="rise fixed inset-x-4 top-[calc(env(safe-area-inset-top)+1rem)] z-50 mx-auto max-w-sm rounded-3xl bg-primary p-4 text-white shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-mint text-[#10201a]"><Icon name="trophy" /></div>
            <div className="flex-1">
              <div className="text-xs font-semibold tracking-wider text-mint uppercase">Nova conquista</div>
              <div className="font-semibold">{toast.map((id) => ACHIEVEMENTS.find((a) => a.id === id)?.title).join(' · ')}</div>
            </div>
            <button onClick={() => setToast([])} className="p-1 opacity-70"><Icon name="x" size={18} /></button>
          </div>
        </div>
      )}
    </div>
  )
}

function Intro({ session, onStart }: { session: Session; onStart: () => void }) {
  const week = session.week ? getWeek(session.week) : undefined
  const plan = DAY_PLAN.find((d) => d.day === session.day)
  const isTest = session.kind === 'test'
  const count = session.steps.filter((s) => s.t !== 'intro' && s.t !== 'result').length
  return (
    <div className="pt-6">
      <Eyebrow>{week ? `Semana ${week.n} · ${plan?.label}` : 'Revisão'}</Eyebrow>
      <h1 className="mt-2 text-[32px] leading-tight font-bold tracking-tight">{isTest ? 'Teste semanal' : plan?.title}</h1>
      {week && <p className="mt-1 text-muted">{week.theme} · {week.level}</p>}
      {isTest ? (
        <div className="mt-8 space-y-3 text-[15px]">
          <p>São <b>{count} questões</b>, uma para cada frase da semana, sem dicas e sem segunda chance.</p>
          <p>Para concluir a semana, você precisa de <b>pelo menos 80%</b>. Se não atingir, faremos uma revisão direcionada e você tenta de novo — seu progresso não é apagado.</p>
        </div>
      ) : (
        <>
          {week && session.day && session.day <= 4 && (
            <div className="mt-8 rounded-3xl border border-line bg-surface p-5">
              <div className="mb-3 font-semibold">Objetivos da semana</div>
              <ul className="space-y-2 text-[15px]">
                {week.goals.map((g) => (
                  <li key={g} className="flex gap-2"><Icon name="check" size={18} className="mt-0.5 shrink-0 text-accent" />{g}</li>
                ))}
              </ul>
            </div>
          )}
          <p className="mt-6 text-[15px] text-muted">
            {count} atividades · cerca de 20 minutos. Você pode sair a qualquer momento: o progresso fica salvo e você continua de onde parou.
          </p>
        </>
      )}
      <Button className="mt-8 w-full" onClick={onStart}>{isTest ? 'Começar o teste' : 'Começar'}</Button>
    </div>
  )
}

function TextStep({ week, onDone }: { week: NonNullable<ReturnType<typeof getWeek>>; onDone: () => void }) {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 45000)
    return () => clearTimeout(t)
  }, [])
  return (
    <div>
      <TextReader week={week} inSession onRead={() => setReady(true)} />
      <Button className="mt-8 w-full" disabled={!ready} onClick={onDone}>
        {ready ? 'Concluí a leitura' : 'Leia ou ouça o texto completo…'}
      </Button>
    </div>
  )
}

function TextQuestion({ q, n, total, onResult }: { q: { q: string; options: string[]; answer: number }; n: number; total: number; onResult: (ok: boolean) => void }) {
  const [sel, setSel] = useState<number | null>(null)
  const [checked, setChecked] = useState(false)
  const ok = sel === q.answer
  return (
    <div>
      <Eyebrow>Interpretação · {n} de {total}</Eyebrow>
      <h2 className="mt-3 mb-6 text-[24px] leading-snug font-bold tracking-tight">{q.q}</h2>
      <div className="space-y-3">
        {q.options.map((o, i) => (
          <button
            key={i}
            onClick={() => !checked && setSel(i)}
            className={`w-full rounded-2xl border-2 px-5 py-4 text-left text-[16px] font-medium transition ${
              checked && i === q.answer ? 'border-accent bg-accent-soft'
              : checked && sel === i ? 'border-danger bg-danger-soft shake'
              : sel === i ? 'border-accent bg-accent-soft' : 'border-line bg-surface'
            }`}
          >
            {o}
          </button>
        ))}
      </div>
      {!checked ? (
        <Button className="mt-8 w-full" disabled={sel === null} onClick={() => setChecked(true)}>Verificar resposta</Button>
      ) : (
        <div className={`rise mt-8 rounded-3xl p-5 ${ok ? 'bg-accent-soft' : 'bg-danger-soft'}`}>
          <div className={`font-bold ${ok ? 'text-accent' : 'text-danger'}`}>{ok ? 'Correto!' : `Resposta certa: ${q.options[q.answer]}`}</div>
          <Button className="mt-4 w-full" variant={ok ? 'primary' : 'secondary'} onClick={() => onResult(ok)}>Continuar</Button>
        </div>
      )}
    </div>
  )
}

function Result({ session, state, finishWith, onExit, onNavigate }: {
  session: Session
  state: AppState
  finishWith: (fn: (s: AppState) => AppState) => void
  onExit: () => void
  onNavigate: (to: string) => void
}) {
  // primeira tentativa de cada exercício (repetições não contam na nota)
  const firstTry = session.answers.filter((a) => !a.retry)
  const correct = firstTry.filter((a) => a.ok).length
  const score = firstTry.length ? correct / firstTry.length : 1
  const missed = [...new Set(firstTry.filter((a) => !a.ok && a.id).map((a) => a.id!))]
  const isTest = session.kind === 'test'
  const passed = isTest && score >= PASS
  const xpToday = state.activity[today()]?.xp ?? 0

  // registra a conclusão uma única vez (marcada na própria sessão salva)
  useEffect(() => {
    if (session.finished) return
    finishWith((s) => {
      if (!s.session || s.session.finished) return s
      let n: AppState = { ...s, session: { ...s.session, finished: true } }
      if (session.kind === 'day' && session.week && session.day) {
        const k = dayKey(session.week, session.day)
        if (!n.days[k]) n = addXp({ ...n, days: { ...n.days, [k]: today() } }, 20) // bônus só na primeira vez
        if (session.day === 6) n = { ...n, texts: { ...n.texts, [session.week]: { ...n.texts[session.week], score } } }
      }
      if (isTest && session.week) {
        const prev = n.tests[session.week] ?? { attempts: [] }
        const tests = { ...n.tests, [session.week]: { attempts: [...prev.attempts, { date: today(), score }], passedAt: prev.passedAt ?? (passed ? today() : undefined) } }
        n = { ...n, tests }
        const k = dayKey(session.week, 7)
        if (passed && !n.days[k]) n = addXp({ ...n, days: { ...n.days, [k]: today() } }, 100)
      }
      return n
    })
  }, [session.finished]) // eslint-disable-line

  function close() {
    update((s) => ({ ...s, session: undefined }))
    onExit()
  }

  function retryTest() {
    const attempts = state.tests[session.week!]?.attempts.length ?? 0
    update((s) => ({ ...s, session: buildTestSession(session.week!, attempts) }))
  }

  function targetedReview() {
    update((s) => ({ ...s, session: buildReviewSession(s, missed, 'mix') }))
  }

  return (
    <div className="pt-6 text-center">
      <div className={`mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full ${isTest && !passed ? 'bg-danger-soft text-danger' : 'bg-accent-soft text-accent'}`}>
        <Icon name={isTest && !passed ? 'repeat' : 'check'} size={36} />
      </div>
      <h1 className="text-[30px] font-bold tracking-tight">
        {isTest ? (passed ? 'Semana concluída!' : 'Quase lá') : session.kind === 'review' ? 'Revisão concluída' : 'Atividade concluída!'}
      </h1>
      <p className="mt-2 text-muted">
        {isTest
          ? passed
            ? `Você atingiu ${Math.round(score * 100)}% e desbloqueou a próxima semana.`
            : `Você fez ${Math.round(score * 100)}%. São necessários 80%. Vamos revisar o que faltou e tentar de novo.`
          : 'Seu progresso foi salvo.'}
      </p>

      <div className="mt-8 grid grid-cols-3 gap-3">
        <div className="rounded-3xl bg-surface p-4">
          <div className="text-2xl font-bold">{Math.round(score * 100)}%</div>
          <div className="text-xs text-muted">acertos</div>
        </div>
        <div className="rounded-3xl bg-surface p-4">
          <div className="text-2xl font-bold">{correct}/{firstTry.length}</div>
          <div className="text-xs text-muted">questões</div>
        </div>
        <div className="rounded-3xl bg-surface p-4">
          <div className="text-2xl font-bold">{xpToday}</div>
          <div className="text-xs text-muted">XP hoje</div>
        </div>
      </div>

      {missed.length > 0 && (
        <div className="mt-6 rounded-3xl border border-line bg-surface p-5 text-left">
          <div className="mb-3 font-semibold">Para revisar</div>
          <ul className="space-y-2">
            {missed.map((id) => {
              const p = getPhrase(id)
              return <li key={id} className="text-[15px]"><b>{p.en}</b> <span className="text-muted">— {p.pt}</span></li>
            })}
          </ul>
        </div>
      )}

      <div className="mt-8 space-y-3">
        {isTest && !passed ? (
          <>
            {missed.length > 0 && <Button className="w-full" icon="repeat" onClick={targetedReview}>Revisão direcionada</Button>}
            <Button className="w-full" variant={missed.length ? 'secondary' : 'primary'} onClick={retryTest}>Refazer o teste</Button>
            <Button className="w-full" variant="ghost" onClick={close}>Voltar depois</Button>
          </>
        ) : (
          <>
            <Button className="w-full" onClick={close}>Voltar ao início</Button>
            {session.week && (
              <Button className="w-full" variant="ghost" onClick={() => { update((s) => ({ ...s, session: undefined })); onNavigate(`#/semana/${session.week}`) }}>
                Ver a semana {session.week}
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  )
}
