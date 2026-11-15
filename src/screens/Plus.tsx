// Plus: complemento com as palavras-base da conversa e treino das estruturas mais usadas.
import { useState } from 'react'
import { getPlusGroup, PLUS_GROUPS, plusKey, wordExamples, type PlusExample, type PlusGroup, type PlusWord } from '../content/plus'
import { addXp } from '../lib/progress'
import { speak } from '../lib/speech'
import { getState, update, useStore } from '../lib/store'
import { shuffle } from '../lib/util'
import { CardExercise, OrderExercise, WriteExercise } from '../study/exercises'
import type { AppState, Phrase } from '../types'
import { Icon } from '../ui/Icon'
import { Bar, Button, Card, Empty, Eyebrow, PageHeader, Pill } from '../ui/kit'
import { go } from './actions'

export type Mode = 'misto' | 'cartoes' | 'montar' | 'escrever'

const MODES: { id: Mode; label: string; desc: string }[] = [
  { id: 'misto', label: 'Misto', desc: 'Cartões, montar e escrever alternados' },
  { id: 'cartoes', label: 'Falar', desc: 'Veja em português e diga em inglês em voz alta' },
  { id: 'montar', label: 'Montar', desc: 'Organize as palavras na ordem certa' },
  { id: 'escrever', label: 'Escrever', desc: 'Digite a frase inteira em inglês' },
]

const SESSION_SIZE = 10

/** Quantas frases foram acertadas ao menos uma vez. */
function trained(s: AppState, examples: PlusExample[]) {
  return examples.filter((e) => (s.plus[plusKey(e.en)] ?? 0) > 0).length
}

function BackLink({ to, label }: { to: string; label: string }) {
  return (
    <button onClick={() => go(to)} className="mb-4 inline-flex h-10 items-center gap-1.5 rounded-full border border-line bg-surface pr-4 pl-3 text-sm font-semibold active:scale-95">
      <Icon name="back" size={16} /> {label}
    </button>
  )
}

/** Destaca a palavra estudada dentro da frase de exemplo. */
function Highlight({ text, word }: { text: string; word: string }) {
  const esc = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const parts = text.split(new RegExp(`\\b(${esc})\\b`, 'i'))
  return <>{parts.map((part, i) => (i % 2 ? <span key={i} className="text-accent">{part}</span> : part))}</>
}

function ModePicker({ to }: { to: (m: Mode) => string }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {MODES.map((m) => (
        <button key={m.id} onClick={() => go(to(m.id))} className="rounded-2xl border border-line bg-surface p-3 text-left transition hover:border-accent/40 active:scale-[0.98]">
          <div className="font-semibold">{m.label}</div>
          <div className="mt-0.5 text-xs text-muted">{m.desc}</div>
        </button>
      ))}
    </div>
  )
}

// ---------- Início ----------

export function PlusHome() {
  const s = useStore()
  const all = PLUS_GROUPS.flatMap((g) => g.words.flatMap(wordExamples))
  const done = trained(s, all)
  return (
    <div>
      <PageHeader eyebrow="Complemento" title="Plus" />
      <Card className="mb-6">
        <p className="text-[15px]">
          As palavras que abrem e ligam <b>qualquer</b> frase em inglês. Para cada uma você vê os jeitos que um americano realmente usa no dia a dia — e as frases já misturam perguntas, verbos, conectores e tempo, para você aprender tudo junto.
        </p>
        <div className="mt-4 flex items-center gap-3">
          <Bar value={done / all.length} />
          <span className="shrink-0 text-sm text-muted">{done}/{all.length} frases</span>
        </div>
      </Card>

      <div className="space-y-2">
        {PLUS_GROUPS.map((g) => {
          const ex = g.words.flatMap(wordExamples)
          const n = trained(s, ex)
          return (
            <button key={g.id} onClick={() => go(`#/plus/${g.id}`)} className="flex w-full items-center gap-4 rounded-3xl border border-line bg-surface p-4 text-left transition hover:border-accent/40">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent"><Icon name={g.icon} /></div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold">{g.title}</div>
                <div className="truncate text-sm text-muted">{g.subtitle}</div>
                <Bar value={n / ex.length} className="mt-2" />
              </div>
              <div className="shrink-0 text-right text-xs text-muted">{g.words.length} palavras<br />{n}/{ex.length}</div>
              <Icon name="chevron" className="shrink-0 text-muted" />
            </button>
          )
        })}
      </div>

      <Eyebrow className="mt-8 mb-3">Treino com tudo misturado</Eyebrow>
      <ModePicker to={(m) => `#/plus-treino/todos/todas/${m}`} />
    </div>
  )
}

// ---------- Grupo ----------

export function PlusGroupPage({ id }: { id: string }) {
  const s = useStore()
  const g = getPlusGroup(id)
  if (!g) return <Empty icon="search" title="Trilha não encontrada" text="Volte para o Plus e escolha uma trilha." />
  return (
    <div>
      <BackLink to="#/plus" label="Plus" />
      <PageHeader eyebrow={g.subtitle} title={g.title} />
      <div className="grid gap-2 sm:grid-cols-2">
        {g.words.map((w) => {
          const ex = wordExamples(w)
          const n = trained(s, ex)
          return (
            <button key={w.id} onClick={() => go(`#/plus/${g.id}/${w.id}`)} className="rounded-3xl border border-line bg-surface p-4 text-left transition hover:border-accent/40">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-lg font-bold">{w.en}</span>
                {n === ex.length && <Pill tone="accent">Completa</Pill>}
              </div>
              <div className="text-sm text-muted">{w.pt}</div>
              <Bar value={n / ex.length} className="mt-3" />
              <div className="mt-1.5 text-xs text-muted">{w.patterns.length} estruturas · {n}/{ex.length} frases</div>
            </button>
          )
        })}
      </div>
      <Eyebrow className="mt-8 mb-3">Treinar a trilha inteira</Eyebrow>
      <ModePicker to={(m) => `#/plus-treino/${g.id}/todas/${m}`} />
    </div>
  )
}

// ---------- Palavra ----------

export function PlusWordPage({ groupId, wordId }: { groupId: string; wordId: string }) {
  const s = useStore()
  const g = getPlusGroup(groupId)
  const w = g?.words.find((x) => x.id === wordId)
  if (!g || !w) return <Empty icon="search" title="Palavra não encontrada" text="Volte para o Plus e escolha outra." />
  const i = g.words.indexOf(w)
  const prev = g.words[i - 1]
  const next = g.words[i + 1]
  return (
    <div>
      <BackLink to={`#/plus/${g.id}`} label={g.title} />
      <div className="mb-6 flex items-end justify-between gap-4 pt-2">
        <div>
          <Eyebrow className="mb-1">{g.title}</Eyebrow>
          <h1 className="text-[34px] leading-tight font-bold tracking-tight">{w.en}</h1>
          <p className="text-lg text-muted">{w.pt}</p>
        </div>
        <button onClick={() => speak(w.en)} className="rounded-full bg-surface-2 p-3 text-accent" aria-label="Ouvir">
          <Icon name="volume" />
        </button>
      </div>

      {w.tip && (
        <div className="mb-5 flex gap-3 rounded-2xl bg-accent-soft px-4 py-3 text-[15px]">
          <Icon name="star" size={18} className="mt-0.5 shrink-0 text-accent" />
          <span>{w.tip}</span>
        </div>
      )}

      <div className="space-y-4">
        {w.patterns.map((pt) => (
          <Card key={pt.form}>
            <div className="font-mono text-[15px] font-semibold text-accent">{pt.form}</div>
            <div className="mt-0.5 mb-3 text-sm text-muted">{pt.pt}</div>
            <div className="divide-y divide-line">
              {pt.ex.map((e) => {
                const ok = (s.plus[plusKey(e.en)] ?? 0) > 0
                return (
                  <button key={e.en} onClick={() => speak(e.en)} className="flex w-full items-center gap-3 py-2.5 text-left">
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold"><Highlight text={e.en} word={w.en} /></div>
                      <div className="text-sm text-muted">{e.pt}</div>
                    </div>
                    {ok && <Icon name="check" size={16} className="shrink-0 text-accent" />}
                    <Icon name="volume" size={18} className="shrink-0 text-muted" />
                  </button>
                )
              })}
            </div>
          </Card>
        ))}
      </div>

      <Eyebrow className="mt-8 mb-3">Treinar {w.en}</Eyebrow>
      <ModePicker to={(m) => `#/plus-treino/${g.id}/${w.id}/${m}`} />

      <div className="mt-8 flex justify-between gap-2">
        {prev ? <Button variant="secondary" icon="back" onClick={() => go(`#/plus/${g.id}/${prev.id}`)}>{prev.en}</Button> : <span />}
        {next && <Button variant="secondary" onClick={() => go(`#/plus/${g.id}/${next.id}`)}>{next.en} <Icon name="chevron" size={18} /></Button>}
      </div>
    </div>
  )
}

// ---------- Treino ----------

function pickExamples(s: AppState, groupId: string, wordId: string): { title: string; back: string; items: PlusExample[] } | null {
  let groups: PlusGroup[] = PLUS_GROUPS
  let title = 'Tudo misturado'
  let back = '#/plus'
  if (groupId !== 'todos') {
    const g = getPlusGroup(groupId)
    if (!g) return null
    groups = [g]
    title = g.title
    back = `#/plus/${g.id}`
  }
  let words: PlusWord[] = groups.flatMap((g) => g.words)
  if (wordId !== 'todas') {
    words = words.filter((w) => w.id === wordId)
    if (!words.length) return null
    title = words[0].en
    back = `${back}/${wordId}`
  }
  // prioriza as frases menos treinadas, em ordem aleatória
  const pool = shuffle(words.flatMap(wordExamples))
  const unique = [...new Map(pool.map((e) => [plusKey(e.en), e])).values()]
  unique.sort((a, b) => (s.plus[plusKey(a.en)] ?? 0) - (s.plus[plusKey(b.en)] ?? 0))
  return { title, back, items: unique.slice(0, SESSION_SIZE) }
}

const asPhrase = (e: PlusExample, i: number): Phrase => ({ id: `plus${i}`, en: e.en, pt: e.pt, words: [], blank: { word: '', wrong: ['', ''] } })

function exerciseFor(mode: Mode, e: PlusExample, pos: number): 'card' | 'order' | 'write' {
  const short = e.en.split(' ').length < 3
  if (mode === 'cartoes') return 'card'
  if (mode === 'escrever') return 'write'
  if (mode === 'montar') return short ? 'card' : 'order'
  const t = (['card', 'order', 'write'] as const)[pos % 3]
  return t === 'order' && short ? 'card' : t
}

export function PlusPractice({ groupId, wordId, mode }: { groupId: string; wordId: string; mode: Mode }) {
  // a seleção é feita uma vez por rodada (não muda enquanto o progresso é salvo)
  const [plan, setPlan] = useState(() => pickExamples(getState(), groupId, wordId))
  const [queue, setQueue] = useState(() => plan?.items.map((e) => ({ e, retry: false })) ?? [])
  const [round, setRound] = useState(0)
  const [pos, setPos] = useState(0)
  const [right, setRight] = useState(0)

  if (!plan) return <Empty icon="search" title="Treino não encontrado" text="Volte para o Plus e escolha o que treinar." />
  const m = MODES.find((x) => x.id === mode) ?? MODES[0]

  function restart() {
    const fresh = pickExamples(getState(), groupId, wordId)
    setPlan(fresh)
    setQueue(fresh?.items.map((e) => ({ e, retry: false })) ?? [])
    setRound(round + 1)
    setPos(0)
    setRight(0)
  }

  function onResult(ok: boolean) {
    const cur = queue[pos]
    update((st) => {
      const k = plusKey(cur.e.en)
      const next = { ...st, plus: { ...st.plus, [k]: (st.plus[k] ?? 0) + (ok ? 1 : 0) } }
      return ok ? addXp(next, cur.retry ? 1 : 2) : next
    })
    if (ok && !cur.retry) setRight(right + 1)
    // errou: a frase volta no fim do treino
    if (!ok && !cur.retry) setQueue([...queue, { e: cur.e, retry: true }])
    setPos(pos + 1)
  }

  if (pos >= queue.length) {
    const total = plan.items.length
    return (
      <div>
        <BackLink to={plan.back} label="Voltar" />
        <Card className="text-center">
          <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-accent-soft text-accent"><Icon name="trophy" size={26} /></div>
          <h2 className="text-2xl font-bold tracking-tight">Treino concluído!</h2>
          <p className="mt-1 text-muted">{right} de {total} certas de primeira{queue.length > total ? ` · ${queue.length - total} repetidas` : ''}</p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Button icon="repeat" onClick={restart}>Treinar de novo</Button>
            <Button variant="secondary" onClick={() => go(plan.back)}>Voltar</Button>
          </div>
        </Card>
      </div>
    )
  }

  const cur = queue[pos]
  const key = `${round}-${pos}`
  const props = { phrase: asPhrase(cur.e, pos), seed: key + cur.e.en, test: false, onResult: (ok: boolean) => onResult(ok) }
  const t = exerciseFor(mode, cur.e, pos)
  return (
    <div>
      <BackLink to={plan.back} label="Sair do treino" />
      <div className="mb-6 flex items-center gap-3">
        <Bar value={pos / queue.length} />
        <span className="shrink-0 text-sm text-muted">{pos + 1}/{queue.length}</span>
      </div>
      <div className="mb-2 flex items-center gap-2">
        <Pill tone="accent">Plus · {plan.title}</Pill>
        <Pill>{m.label}</Pill>
      </div>
      {t === 'card' && <CardExercise key={key} {...props} />}
      {t === 'order' && <OrderExercise key={key} {...props} />}
      {t === 'write' && <WriteExercise key={key} {...props} />}
    </div>
  )
}
