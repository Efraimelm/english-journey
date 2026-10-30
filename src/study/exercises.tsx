// Exercícios: escolha, complete, ordene, escuta, escrita, flashcard e apresentação da frase.
import { useMemo, useState, type ReactNode } from 'react'
import { getWeek, weekOfPhrase } from '../content'
import { compareAnswer, orderTokens, type CompareResult } from '../lib/compare'
import type { Quality } from '../lib/progress'
import { speak } from '../lib/speech'
import { seeded, shuffle } from '../lib/util'
import type { Phrase } from '../types'
import { Icon } from '../ui/Icon'
import { Button, Eyebrow } from '../ui/kit'
import { AudioButtons, PronunciationCheck } from './audio'

export interface ExerciseProps {
  phrase: Phrase
  seed: string
  test: boolean // modo avaliação: sem segunda chance
  onResult: (ok: boolean, quality: Quality) => void
}

/** Rodapé de verificação/feedback comum a todos os exercícios. */
function Footer({
  status, canCheck, onCheck, onContinue, correction, extra,
}: {
  status: 'answering' | 'right' | 'wrong'
  canCheck: boolean
  onCheck: () => void
  onContinue: () => void
  correction?: ReactNode
  extra?: ReactNode
}) {
  if (status === 'answering')
    return (
      <div className="mt-8">
        <Button className="w-full" disabled={!canCheck} onClick={onCheck}>Verificar resposta</Button>
      </div>
    )
  const ok = status === 'right'
  return (
    <div className={`rise mt-8 rounded-3xl p-5 ${ok ? 'bg-accent-soft' : 'bg-danger-soft'}`}>
      <div className={`mb-1 flex items-center gap-2 font-bold ${ok ? 'text-accent' : 'text-danger'}`}>
        <Icon name={ok ? 'check' : 'x'} size={20} /> {ok ? 'Correto!' : 'Não foi dessa vez'}
      </div>
      {correction && <div className="text-[15px]">{correction}</div>}
      {extra}
      <Button className="mt-4 w-full" variant={ok ? 'primary' : 'secondary'} onClick={onContinue} autoFocus>
        Continuar
      </Button>
    </div>
  )
}

function Option({ label, state, onClick, sub }: { label: ReactNode; state: 'idle' | 'selected' | 'right' | 'wrong'; onClick: () => void; sub?: ReactNode }) {
  const s = {
    idle: 'border-line bg-surface hover:border-accent/40',
    selected: 'border-accent bg-accent-soft',
    right: 'border-accent bg-accent-soft',
    wrong: 'border-danger bg-danger-soft shake',
  }[state]
  return (
    <button onClick={onClick} className={`w-full rounded-2xl border-2 px-5 py-4 text-left text-[16px] font-medium transition ${s}`}>
      {label}
      {sub}
    </button>
  )
}

function otherPhrases(phrase: Phrase, seed: string, n: number): Phrase[] {
  const week = getWeek(weekOfPhrase(phrase.id))!
  return shuffle(week.phrases.filter((p) => p.id !== phrase.id && p.pt !== phrase.pt), seeded(seed)).slice(0, n)
}

// ---------- 1. Escolha a tradução ----------
export function ChoiceExercise({ phrase, seed, onResult }: ExerciseProps) {
  const rand = useMemo(() => seeded(seed), [seed])
  const reverse = useMemo(() => rand() < 0.4, [rand]) // às vezes do português para o inglês
  const options = useMemo(() => {
    const others = otherPhrases(phrase, seed, 2)
    const all = [phrase, ...others]
    return shuffle(all, seeded(seed + 'o'))
  }, [phrase, seed])
  const [sel, setSel] = useState<string | null>(null)
  const [status, setStatus] = useState<'answering' | 'right' | 'wrong'>('answering')

  return (
    <div>
      <Eyebrow>Escolha a tradução</Eyebrow>
      <h2 className="mt-3 mb-1 text-[15px] text-muted">{reverse ? 'Como se diz em inglês?' : 'Qual é o significado de'}</h2>
      <div className="mb-6 flex items-center gap-3">
        <p className="text-[26px] leading-snug font-bold tracking-tight">{reverse ? phrase.pt : `"${phrase.en}"`}</p>
        {!reverse && (
          <button onClick={() => speak(phrase.en)} className="shrink-0 rounded-full bg-surface-2 p-2.5 text-accent" aria-label="Ouvir">
            <Icon name="volume" size={18} />
          </button>
        )}
      </div>
      <div className="space-y-3">
        {options.map((o) => (
          <Option
            key={o.id}
            label={reverse ? o.en : o.pt}
            state={status === 'answering' ? (sel === o.id ? 'selected' : 'idle') : o.id === phrase.id ? 'right' : sel === o.id ? 'wrong' : 'idle'}
            onClick={() => status === 'answering' && setSel(o.id)}
          />
        ))}
      </div>
      <Footer
        status={status}
        canCheck={!!sel}
        onCheck={() => {
          const ok = sel === phrase.id
          setStatus(ok ? 'right' : 'wrong')
          if (reverse || ok) speak(phrase.en)
        }}
        onContinue={() => onResult(status === 'right', status === 'right' ? 2 : 0)}
        correction={status === 'wrong' && <><b>{phrase.en}</b> = {phrase.pt}</>}
      />
    </div>
  )
}

// ---------- 2. Complete a frase ----------
function splitBlank(en: string, word: string): [string, string] {
  const esc = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const m = new RegExp(`(^|[^A-Za-z'])${esc}(?![A-Za-z'])`).exec(en)
  if (!m) return [en, '']
  const start = m.index + m[1].length
  return [en.slice(0, start), en.slice(start + word.length)]
}

export function FillExercise({ phrase, seed, onResult }: ExerciseProps) {
  const options = useMemo(() => shuffle([phrase.blank.word, ...phrase.blank.wrong], seeded(seed)), [phrase, seed])
  const [before, after] = splitBlank(phrase.en, phrase.blank.word)
  const [sel, setSel] = useState<string | null>(null)
  const [status, setStatus] = useState<'answering' | 'right' | 'wrong'>('answering')
  return (
    <div>
      <Eyebrow>Complete a frase</Eyebrow>
      <p className="mt-5 text-[26px] leading-snug font-bold tracking-tight">
        {before}
        <span className={`mx-1 inline-block min-w-16 border-b-2 text-center ${status === 'wrong' ? 'border-danger text-danger' : 'border-accent text-accent'}`}>
          {sel ?? ' '}
        </span>
        {after}
      </p>
      <p className="mt-2 mb-8 text-muted">{phrase.pt}</p>
      <div className="flex flex-wrap gap-3">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => status === 'answering' && setSel(o)}
            className={`rounded-2xl border-2 px-5 py-3 text-[17px] font-semibold transition ${
              status !== 'answering' && o === phrase.blank.word ? 'border-accent bg-accent-soft'
              : status === 'wrong' && sel === o ? 'border-danger bg-danger-soft shake'
              : sel === o ? 'border-accent bg-accent-soft' : 'border-line bg-surface'
            }`}
          >
            {o}
          </button>
        ))}
      </div>
      <Footer
        status={status}
        canCheck={!!sel}
        onCheck={() => {
          setStatus(sel === phrase.blank.word ? 'right' : 'wrong')
          speak(phrase.en)
        }}
        onContinue={() => onResult(status === 'right', status === 'right' ? 2 : 0)}
        correction={<><b>{phrase.en}</b>{phrase.note && status === 'wrong' && <div className="mt-2 text-sm text-muted">{phrase.note}</div>}</>}
      />
    </div>
  )
}

// ---------- 3. Organize a frase ----------
export function OrderExercise({ phrase, seed, onResult }: ExerciseProps) {
  const tokens = useMemo(() => orderTokens(phrase.en), [phrase])
  const bank = useMemo(() => {
    let s = shuffle(tokens.map((w, i) => ({ w, i })), seeded(seed))
    if (s.every((t, k) => t.i === k)) s = [...s.slice(1), s[0]] // nunca já na ordem certa
    return s
  }, [tokens, seed])
  const [picked, setPicked] = useState<number[]>([])
  const [status, setStatus] = useState<'answering' | 'right' | 'wrong'>('answering')
  const answer = picked.map((i) => tokens[i]).join(' ')
  return (
    <div>
      <Eyebrow>Organize a frase</Eyebrow>
      <h2 className="mt-3 text-[15px] text-muted">Toque nas palavras na ordem certa para formar:</h2>
      <p className="mb-5 text-[22px] font-bold tracking-tight">{phrase.pt}</p>
      <div className={`flex min-h-[72px] flex-wrap content-start gap-2 rounded-2xl border-2 border-dashed p-3 ${status === 'wrong' ? 'border-danger shake' : status === 'right' ? 'border-accent' : 'border-line'}`}>
        {picked.map((i) => (
          <button
            key={i}
            onClick={() => status === 'answering' && setPicked(picked.filter((p) => p !== i))}
            className="rise rounded-xl bg-accent-soft px-3.5 py-2 text-[17px] font-semibold text-accent"
          >
            {bank.find((b) => b.i === i)!.w}
          </button>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {bank.map((b) => {
          const used = picked.includes(b.i)
          return (
            <button
              key={b.i}
              disabled={used || status !== 'answering'}
              onClick={() => setPicked([...picked, b.i])}
              className={`rounded-xl border border-line px-3.5 py-2 text-[17px] font-semibold transition ${used ? 'bg-surface-2 text-transparent' : 'bg-surface active:scale-95'}`}
            >
              {b.w}
            </button>
          )
        })}
      </div>
      <Footer
        status={status}
        canCheck={picked.length === tokens.length}
        onCheck={() => {
          // compara o texto (palavras repetidas podem estar em qualquer posição equivalente)
          setStatus(answer === tokens.join(' ') ? 'right' : 'wrong')
          speak(phrase.en)
        }}
        onContinue={() => onResult(status === 'right', status === 'right' ? 2 : 0)}
        correction={<b>{phrase.en}</b>}
      />
    </div>
  )
}

// ---------- 4. Compreensão auditiva ----------
export function ListenExercise({ phrase, seed, onResult }: ExerciseProps) {
  const options = useMemo(() => shuffle([phrase, ...otherPhrases(phrase, seed, 2)], seeded(seed + 'l')), [phrase, seed])
  const [sel, setSel] = useState<string | null>(null)
  const [status, setStatus] = useState<'answering' | 'right' | 'wrong'>('answering')
  return (
    <div>
      <Eyebrow>Compreensão auditiva</Eyebrow>
      <h2 className="mt-3 mb-5 text-[22px] font-bold tracking-tight">Qual frase você ouviu?</h2>
      <div className="mb-6">
        <AudioButtons text={phrase.en} autoPlay big />
      </div>
      <div className="space-y-3">
        {options.map((o) => (
          <Option
            key={o.id}
            label={o.en}
            sub={status !== 'answering' && <div className="mt-0.5 text-sm font-normal text-muted">{o.pt}</div>}
            state={status === 'answering' ? (sel === o.id ? 'selected' : 'idle') : o.id === phrase.id ? 'right' : sel === o.id ? 'wrong' : 'idle'}
            onClick={() => status === 'answering' && setSel(o.id)}
          />
        ))}
      </div>
      <Footer
        status={status}
        canCheck={!!sel}
        onCheck={() => setStatus(sel === phrase.id ? 'right' : 'wrong')}
        onContinue={() => onResult(status === 'right', status === 'right' ? 2 : 0)}
      />
    </div>
  )
}

// ---------- 5. Escrita ----------
function Diff({ result }: { result: CompareResult }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {result.tokens.map((t, i) => {
        const cls = {
          ok: 'bg-accent-soft text-accent',
          typo: 'bg-warn/15 text-warn',
          wrong: 'bg-danger-soft text-danger line-through',
          extra: 'bg-danger-soft text-danger line-through',
          missing: 'border border-dashed border-danger text-danger',
        }[t.status]
        return (
          <span key={i} className={`rounded-lg px-2 py-1 text-[15px] font-medium ${cls}`} title={t.expected ? `Esperado: ${t.expected}` : undefined}>
            {t.status === 'missing' ? `+ ${t.word}` : t.word}
          </span>
        )
      })}
    </div>
  )
}

export function WriteExercise({ phrase, test, onResult }: ExerciseProps) {
  const [value, setValue] = useState('')
  const [tries, setTries] = useState(0)
  const [result, setResult] = useState<CompareResult | null>(null)
  const [status, setStatus] = useState<'answering' | 'retry' | 'right' | 'wrong'>('answering')

  function check() {
    const r = compareAnswer(value, phrase.en)
    setResult(r)
    const n = tries + 1
    setTries(n)
    if (r.verdict !== 'wrong') {
      setStatus('right')
      speak(phrase.en)
    } else if (n < 2 && !test) setStatus('retry')
    else {
      setStatus('wrong')
      speak(phrase.en)
    }
  }

  const quality: Quality = status === 'right' ? (tries > 1 || result?.verdict === 'almost' ? 1 : 2) : 0

  return (
    <div>
      <Eyebrow>Escrita</Eyebrow>
      <h2 className="mt-3 text-[15px] text-muted">Escreva em inglês:</h2>
      <p className="mb-6 text-[26px] leading-snug font-bold tracking-tight">{phrase.pt}</p>
      <textarea
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          if (status === 'retry') setStatus('answering')
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            if (value.trim() && (status === 'answering' || status === 'retry')) check()
          }
        }}
        disabled={status === 'right' || status === 'wrong'}
        rows={2}
        autoFocus
        autoCapitalize="sentences"
        autoCorrect="off"
        spellCheck={false}
        lang="en"
        placeholder="Digite a frase em inglês…"
        className="w-full resize-none rounded-2xl border-2 border-line bg-surface p-4 text-[18px] outline-none placeholder:text-muted focus:border-accent"
      />
      {status === 'retry' && result && (
        <div className="rise mt-4 rounded-2xl bg-danger-soft p-4">
          <div className="mb-2 text-sm font-semibold text-danger">Quase! Veja o que ajustar e tente mais uma vez:</div>
          <Diff result={result} />
          <div className="mt-2 text-xs text-muted">Riscado = palavra errada ou sobrando · tracejado = palavra que falta</div>
        </div>
      )}
      {status === 'answering' || status === 'retry' ? (
        <div className="mt-6">
          <Button className="w-full" disabled={!value.trim()} onClick={check}>
            {status === 'retry' ? 'Tentar novamente' : 'Verificar resposta'}
          </Button>
        </div>
      ) : (
        <Footer
          status={status}
          canCheck
          onCheck={check}
          onContinue={() => onResult(status === 'right', quality)}
          correction={
            <>
              {result && result.verdict !== 'correct' && <div className="mb-3"><Diff result={result} /></div>}
              {result?.verdict === 'almost' && <div className="mb-2 text-sm text-warn">Pequeno erro de digitação — atenção à grafia.</div>}
              <div>Resposta: <b>{phrase.en}</b></div>
            </>
          }
        />
      )}
    </div>
  )
}

// ---------- Flashcard (revisão) ----------
export function CardExercise({ phrase, onResult }: ExerciseProps) {
  const [revealed, setRevealed] = useState(false)
  return (
    <div>
      <Eyebrow>Flashcard</Eyebrow>
      <h2 className="mt-3 text-[15px] text-muted">Lembre a frase em inglês antes de virar o cartão:</h2>
      <div className="mt-4 rounded-3xl border border-line bg-surface p-7 text-center">
        <p className="text-[24px] leading-snug font-bold tracking-tight">{phrase.pt}</p>
        {revealed && (
          <div className="rise mt-6 border-t border-line pt-6">
            <p className="mb-4 text-[24px] leading-snug font-bold tracking-tight text-accent">{phrase.en}</p>
            <div className="flex justify-center"><AudioButtons text={phrase.en} autoPlay /></div>
          </div>
        )}
      </div>
      {!revealed ? (
        <Button className="mt-6 w-full" icon="eye" onClick={() => setRevealed(true)}>Mostrar resposta</Button>
      ) : (
        <div className="rise mt-6">
          <div className="mb-3 text-center text-sm text-muted">Como foi?</div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {([['Errei', 0], ['Difícil', 1], ['Bom', 2], ['Fácil', 3]] as const).map(([label, q]) => (
              <Button key={label} variant={q === 0 ? 'danger' : q === 3 ? 'primary' : 'secondary'} onClick={() => onResult(q > 0, q)}>
                {label}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ---------- Apresentação da frase ----------
export function LearnPhrase({ phrase, index, theme, level, struggling, onContinue }: {
  phrase: Phrase
  index: number
  theme: string
  level: string
  struggling: boolean
  onContinue: () => void
}) {
  const [reps, setReps] = useState(0)
  return (
    <div>
      <div className="flex items-center justify-between">
        <Eyebrow>Frase {String(index).padStart(2, '0')} de 20</Eyebrow>
        <span className="text-[12px] font-semibold text-muted">{level} · {theme}</span>
      </div>
      <h2 className="mt-5 text-[34px] leading-[1.15] font-bold tracking-tight">{phrase.en}</h2>
      <p className="mt-2 mb-6 text-[18px] text-muted">{phrase.pt}</p>
      <AudioButtons text={phrase.en} autoPlay big />
      <PronunciationCheck text={phrase.en} />

      <div className="mt-6 rounded-3xl border border-line bg-surface p-5">
        <div className="mb-3 font-semibold">Entenda a frase</div>
        <ul className="space-y-2">
          {phrase.words.map((w) => (
            <li key={w.en} className="flex items-baseline gap-2 text-[15px]">
              <span className="font-semibold text-accent">{w.en}</span>
              <span className="text-muted">=</span>
              <span>{w.pt}</span>
            </li>
          ))}
        </ul>
        {phrase.note && <p className={`mt-4 rounded-2xl p-3 text-sm ${struggling ? 'bg-warn/15' : 'bg-surface-2 text-muted'}`}>{phrase.note}</p>}
      </div>

      <div className="mt-4 rounded-3xl bg-accent-soft p-5">
        <div className="mb-1 font-semibold text-accent">Sua missão</div>
        <p className="text-[15px]">Escute a frase, repita em voz alta três vezes e depois tente escrevê-la sem olhar.</p>
        <button
          onClick={() => {
            setReps((r) => Math.min(3, r + 1))
          }}
          className="mt-3 inline-flex items-center gap-2 rounded-xl bg-surface px-4 py-2 text-sm font-semibold"
        >
          <span className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <span key={i} className={`h-2.5 w-2.5 rounded-full ${i < reps ? 'bg-accent' : 'bg-surface-2'}`} />
            ))}
          </span>
          {reps < 3 ? 'Repeti em voz alta' : 'Feito!'}
        </button>
      </div>

      <Button className="mt-8 w-full" onClick={onContinue}>Continuar</Button>
    </div>
  )
}
