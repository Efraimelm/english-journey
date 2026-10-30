// Regras pedagógicas: revisão espaçada, conclusão de dias/semanas, XP, sequência e conquistas.
import { DAY_PLAN, WEEKS, getWeek, TOTAL_WEEKS } from '../content'
import type { AppState, PhraseProgress, Session, Step, StepType } from '../types'
import { orderTokens } from './compare'
import { addDays, daysBetween, seeded, shuffle, today } from './util'
import { update } from './store'

// ---------------- Revisão espaçada ----------------

/** Escada de intervalos (dias): 1, 3, 7, 14, 30, 60. */
export const INTERVALS = [1, 3, 7, 14, 30, 60]

export type Quality = 0 | 1 | 2 | 3 // errou, difícil, bom, fácil

/** Habilidade comprovada por cada tipo de exercício. */
const SKILL: Partial<Record<StepType, keyof Pick<PhraseProgress, 'recognized' | 'understood' | 'recalled'>>> = {
  choice: 'understood',
  listen: 'recognized',
  fill: 'recognized',
  order: 'recognized',
  write: 'recalled',
  card: 'recalled',
}

function newProgress(): PhraseProgress {
  return {
    step: 0, due: addDays(today(), 1), seen: 0, correct: 0, wrong: 0, lapses: 0,
    learnedAt: today(), recognized: false, understood: false, recalled: false,
  }
}

export function markLearned(s: AppState, id: string): AppState {
  if (s.phrases[id]) return s
  return { ...s, phrases: { ...s.phrases, [id]: newProgress() } }
}

/**
 * Registra uma resposta. Errou: volta ao início (revisão amanhã). Difícil: mantém o intervalo.
 * Bom: sobe um degrau. Fácil: sobe dois. Só avança de degrau uma vez por dia.
 */
export function recordAnswer(s: AppState, id: string, quality: Quality, type: StepType): AppState {
  const p = s.phrases[id] ?? newProgress()
  const t = today()
  const next = { ...p, seen: p.seen + 1 }
  if (quality === 0) {
    next.wrong++
    if (p.correct > 0) next.lapses++
    next.step = 0
    next.due = addDays(t, 1)
  } else {
    next.correct++
    const skill = SKILL[type]
    if (skill) next[skill] = true
    const dueNow = daysBetween(p.due, t) >= 0
    if (dueNow) {
      const jump = quality === 1 ? 0 : quality === 2 ? 1 : 2
      next.step = Math.min(p.step + jump, INTERVALS.length - 1)
      next.due = addDays(t, INTERVALS[next.step])
    }
  }
  return { ...s, phrases: { ...s.phrases, [id]: next } }
}

/** Dominada = reconhece, entende, recupera sem tradução e já passou da revisão de 7 dias. */
export function isMastered(p?: PhraseProgress): boolean {
  return !!p && p.recognized && p.understood && p.recalled && p.step >= 3
}

export function dueIds(s: AppState, date = today()): string[] {
  return Object.entries(s.phrases)
    .filter(([, p]) => daysBetween(p.due, date) >= 0)
    .sort((a, b) => (a[1].due < b[1].due ? -1 : 1) || b[1].lapses - a[1].lapses)
    .map(([id]) => id)
}

export function difficultIds(s: AppState): string[] {
  return Object.entries(s.phrases)
    .filter(([, p]) => p.lapses >= 2 || (p.wrong >= 3 && p.wrong >= p.correct))
    .sort((a, b) => b[1].wrong - a[1].wrong)
    .map(([id]) => id)
}

// ---------------- Dias e semanas ----------------

export const dayKey = (w: number, d: number) => `w${w}d${d}`

export function isDayDone(s: AppState, w: number, d: number) {
  return !!s.days[dayKey(w, d)]
}

export function isWeekDone(s: AppState, w: number) {
  return DAY_PLAN.every((p) => isDayDone(s, w, p.day))
}

export function isWeekUnlocked(s: AppState, w: number) {
  return w === 1 || isWeekDone(s, w - 1)
}

export function weekCompletion(s: AppState, w: number): number {
  return DAY_PLAN.filter((p) => isDayDone(s, w, p.day)).length / DAY_PLAN.length
}

/** Próxima atividade da jornada (respeita a sequência pedagógica). */
export function nextActivity(s: AppState): { week: number; day: number } | null {
  for (const week of WEEKS) {
    if (!isWeekUnlocked(s, week.n)) return null
    for (const p of DAY_PLAN) if (!isDayDone(s, week.n, p.day)) return { week: week.n, day: p.day }
  }
  return null // conteúdo publicado concluído
}

export function currentWeek(s: AppState): number {
  return nextActivity(s)?.week ?? Math.min(WEEKS.length + 1, TOTAL_WEEKS)
}

// ---------------- Montagem das sessões ----------------

function newPhraseIds(w: number, d: number): string[] {
  const week = getWeek(w)!
  return week.phrases.slice((d - 1) * 5, d * 5).map((p) => p.id)
}

function reviewSteps(s: AppState, ids: string[], rand: () => number): Step[] {
  return ids.map((id) => {
    const p = s.phrases[id]
    const t: StepType = !p?.recalled ? 'write' : !p.recognized ? 'listen' : shuffle(['write', 'listen', 'fill', 'order'] as StepType[], rand)[0]
    return { t, id }
  })
}

export function buildDaySession(s: AppState, w: number, d: number): Session {
  const key = dayKey(w, d)
  const rand = seeded(key + today())
  const week = getWeek(w)!
  let steps: Step[] = [{ t: 'intro' }]

  if (d <= 4) {
    const ids = newPhraseIds(w, d)
    steps.push(...ids.map((id) => ({ t: 'learn' as const, id })))
    steps.push(...shuffle(ids, rand).map((id) => ({ t: 'choice' as const, id })))
    steps.push(...shuffle(ids, rand).map((id) => ({ t: 'fill' as const, id })))
    const orderable = ids.filter((id) => orderTokens(week.phrases.find((p) => p.id === id)!.en).length >= 3)
    steps.push(...shuffle(orderable, rand).slice(0, 3).map((id) => ({ t: 'order' as const, id })))
    steps.push(...shuffle(ids, rand).map((id) => ({ t: 'listen' as const, id })))
    steps.push(...shuffle(ids, rand).map((id) => ({ t: 'write' as const, id })))
    // revisão das frases anteriores que estão vencidas
    const due = dueIds(s).filter((id) => !ids.includes(id)).slice(0, 8)
    steps.push(...reviewSteps(s, due, rand))
  } else if (d === 5) {
    const ids = week.phrases.map((p) => p.id)
    const types: StepType[] = ['listen', 'fill', 'order', 'choice']
    steps.push(...shuffle(ids, rand).map((id, i) => ({ t: types[i % types.length], id })))
    // escrita extra para as mais fracas
    const weakest = [...ids].sort((a, b) => score(s, a) - score(s, b)).slice(0, 10)
    steps.push(...weakest.map((id) => ({ t: 'write' as const, id })))
    const due = dueIds(s).filter((id) => !ids.includes(id)).slice(0, 6)
    steps.push(...reviewSteps(s, due, rand))
  } else if (d === 6) {
    steps.push({ t: 'text' })
    steps.push(...week.text.questions.map((_, i) => ({ t: 'textq' as const, i })))
  } else {
    return buildTestSession(w, s.tests[w]?.attempts.length ?? 0)
  }
  steps = [...steps, { t: 'result' }]
  return { key, kind: 'day', week: w, day: d, steps, pos: 0, answers: [], startedAt: today() }
}

function score(s: AppState, id: string) {
  const p = s.phrases[id]
  if (!p) return -10
  return p.correct - 2 * p.wrong + (p.recalled ? 2 : 0)
}

/** Teste semanal: 20 questões sem dicas, uma por frase. */
export function buildTestSession(w: number, attempt = 0): Session {
  const week = getWeek(w)!
  const rand = seeded(`test${w}-${attempt}-${today()}`)
  const types: StepType[] = ['choice', 'choice', 'choice', 'fill', 'fill', 'listen', 'listen', 'listen', 'write', 'write']
  const ids = shuffle(week.phrases.map((p) => p.id), rand)
  const steps: Step[] = [{ t: 'intro' }, ...ids.map((id, i) => ({ t: types[i % types.length], id })), { t: 'result' }]
  return { key: `w${w}test`, kind: 'test', week: w, day: 7, steps, pos: 0, answers: [], startedAt: today() }
}

/** Sessão da aba Revisão: frases vencidas (ou as indicadas), em formato de exercício ou flashcard. */
export function buildReviewSession(s: AppState, ids: string[], mode: 'mix' | 'cards' | 'listen' | 'write'): Session {
  const rand = seeded('review' + Date.now())
  let steps: Step[]
  if (mode === 'cards') steps = ids.map((id) => ({ t: 'card' as const, id }))
  else if (mode === 'listen') steps = ids.map((id) => ({ t: 'listen' as const, id }))
  else if (mode === 'write') steps = ids.map((id) => ({ t: 'write' as const, id }))
  else steps = reviewSteps(s, ids, rand)
  return { key: `review-${mode}-${today()}`, kind: 'review', steps: [...steps, { t: 'result' }], pos: 0, answers: [], startedAt: today() }
}

// ---------------- XP, atividade, sequência ----------------

export function addXp(s: AppState, xp: number): AppState {
  const t = today()
  const a = s.activity[t] ?? { seconds: 0, xp: 0 }
  return { ...s, xp: s.xp + xp, activity: { ...s.activity, [t]: { ...a, xp: a.xp + xp } } }
}

export function addStudyTime(seconds: number) {
  update((s) => {
    const t = today()
    const a = s.activity[t] ?? { seconds: 0, xp: 0 }
    return { ...s, activity: { ...s.activity, [t]: { ...a, seconds: a.seconds + seconds } } }
  })
}

/** Dia de descanso: preserva a sequência (no máximo 1 por semana). */
export function canRest(s: AppState): boolean {
  const t = today()
  if (s.activity[t]?.xp) return false
  for (let i = 0; i < 7; i++) if (s.activity[addDays(t, -i)]?.rest) return false
  return true
}

export function takeRest() {
  update((s) => {
    const t = today()
    const a = s.activity[t] ?? { seconds: 0, xp: 0 }
    return { ...s, activity: { ...s.activity, [t]: { ...a, rest: true } } }
  })
}

const studied = (s: AppState, d: string) => (s.activity[d]?.xp ?? 0) > 0

/** Dias consecutivos de estudo (dias de descanso mantêm a sequência mas não somam). */
export function streak(s: AppState): number {
  let d = today()
  if (!studied(s, d) && !s.activity[d]?.rest) d = addDays(d, -1)
  let count = 0
  for (;;) {
    if (studied(s, d)) count++
    else if (!s.activity[d]?.rest) break
    d = addDays(d, -1)
  }
  return count
}

export function level(xp: number) {
  const lvl = Math.floor(Math.sqrt(xp / 100)) + 1
  const base = (lvl - 1) ** 2 * 100
  const next = lvl ** 2 * 100
  return { lvl, progress: (xp - base) / (next - base), toNext: next - xp }
}

/** Nível CEFR estimado a partir das semanas concluídas e frases dominadas. */
export function estimatedLevel(s: AppState): string {
  const weeks = WEEKS.filter((w) => isWeekDone(s, w.n)).length
  if (weeks >= 36) return 'A2+ / B1'
  if (weeks >= 24) return 'A2'
  if (weeks >= 12) return 'A1+ / A2'
  if (weeks >= 4) return 'A1+'
  return 'A1'
}

// ---------------- Conquistas ----------------

export const ACHIEVEMENTS: { id: string; title: string; desc: string; test: (s: AppState) => boolean }[] = [
  { id: 'first-phrase', title: 'Primeira frase', desc: 'Aprendeu sua primeira frase', test: (s) => Object.keys(s.phrases).length >= 1 },
  { id: 'first-day', title: 'Primeiro dia', desc: 'Concluiu o primeiro dia de estudo', test: (s) => Object.keys(s.days).length >= 1 },
  { id: 'first-text', title: 'Primeiro texto', desc: 'Leu o primeiro texto semanal', test: (s) => Object.values(s.texts).some((t) => t.readAt) },
  { id: 'first-week', title: 'Primeira semana', desc: 'Concluiu a semana 1', test: (s) => isWeekDone(s, 1) },
  { id: 'streak-7', title: '7 dias seguidos', desc: 'Estudou 7 dias consecutivos', test: (s) => streak(s) >= 7 },
  { id: 'perfect-test', title: 'Nota máxima', desc: 'Acertou 100% de um teste semanal', test: (s) => Object.values(s.tests).some((t) => t.attempts.some((a) => a.score === 1)) },
  { id: 'phrases-50', title: '50 frases', desc: 'Estudou 50 frases', test: (s) => Object.keys(s.phrases).length >= 50 },
  { id: 'phrases-100', title: '100 frases', desc: 'Estudou 100 frases', test: (s) => Object.keys(s.phrases).length >= 100 },
  { id: 'mastered-20', title: '20 dominadas', desc: 'Dominou 20 frases', test: (s) => Object.values(s.phrases).filter(isMastered).length >= 20 },
  { id: 'streak-30', title: '30 dias seguidos', desc: 'Estudou 30 dias consecutivos', test: (s) => streak(s) >= 30 },
  { id: 'phrases-500', title: '500 frases', desc: 'Estudou 500 frases', test: (s) => Object.keys(s.phrases).length >= 500 },
  { id: 'journey', title: 'Jornada completa', desc: 'Concluiu as 48 semanas', test: (s) => isWeekDone(s, 48) },
]

/** Verifica conquistas novas e devolve o estado atualizado + as conquistas recém-obtidas. */
export function checkAchievements(s: AppState): { state: AppState; unlocked: string[] } {
  const unlocked = ACHIEVEMENTS.filter((a) => !s.achievements[a.id] && a.test(s)).map((a) => a.id)
  if (!unlocked.length) return { state: s, unlocked }
  const achievements = { ...s.achievements }
  for (const id of unlocked) achievements[id] = today()
  return { state: { ...s, achievements }, unlocked }
}

export function phrasesStudied(s: AppState) {
  return Object.keys(s.phrases).length
}
