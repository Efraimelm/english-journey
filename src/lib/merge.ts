// Junta o progresso de dois aparelhos (ex.: celular sem internet + computador) sem perder estudo.
// Regra geral: o que foi feito em qualquer um dos dois fica. Preferências vêm do estado mais recente.
import type { AppState, PhraseProgress } from '../types'

const minDate = (a?: string, b?: string) => (!a ? b : !b ? a : a < b ? a : b)

function mergePhrase(a: PhraseProgress, b: PhraseProgress): PhraseProgress {
  // quem praticou mais tem o histórico mais completo; as habilidades comprovadas somam
  const base = a.seen > b.seen || (a.seen === b.seen && a.due >= b.due) ? a : b
  return {
    ...base,
    learnedAt: minDate(a.learnedAt, b.learnedAt)!,
    recognized: a.recognized || b.recognized,
    understood: a.understood || b.understood,
    recalled: a.recalled || b.recalled,
  }
}

function mergeRecord<T>(a: Record<string, T>, b: Record<string, T>, pick: (x: T, y: T) => T): Record<string, T> {
  const out: Record<string, T> = { ...a }
  for (const [k, v] of Object.entries(b)) out[k] = k in out ? pick(out[k], v) : v
  return out
}

export function mergeStates(local: AppState, remote: AppState): AppState {
  const newer = (remote.updatedAt ?? 0) > (local.updatedAt ?? 0) ? remote : local
  // "Apagar progresso" em um aparelho vence o progresso antigo do outro.
  const lr = local.resetAt ?? 0
  const rr = remote.resetAt ?? 0
  if (lr !== rr) return lr > rr ? local : remote

  const activity = mergeRecord(local.activity, remote.activity, (x, y) => ({
    seconds: Math.max(x.seconds, y.seconds),
    xp: Math.max(x.xp, y.xp),
    rest: x.rest || y.rest || undefined,
  }))
  const activityXp = Object.values(activity).reduce((n, a) => n + a.xp, 0)

  const tests = mergeRecord(
    local.tests as Record<string, AppState['tests'][number]>,
    remote.tests as Record<string, AppState['tests'][number]>,
    (x, y) => {
      const seen = new Set<string>()
      const attempts = [...x.attempts, ...y.attempts]
        .filter((t) => {
          const k = `${t.date}|${t.score}`
          if (seen.has(k)) return false
          seen.add(k)
          return true
        })
        .sort((p, q) => (p.date < q.date ? -1 : p.date > q.date ? 1 : 0))
      return { attempts, passedAt: minDate(x.passedAt, y.passedAt) }
    },
  )

  return {
    ...newer,
    updatedAt: Math.max(local.updatedAt ?? 0, remote.updatedAt ?? 0),
    days: mergeRecord(local.days, remote.days, (x, y) => minDate(x, y)!),
    phrases: mergeRecord(local.phrases, remote.phrases, mergePhrase),
    texts: mergeRecord(
      local.texts as Record<string, AppState['texts'][number]>,
      remote.texts as Record<string, AppState['texts'][number]>,
      (x, y) => ({
        readAt: minDate(x.readAt, y.readAt),
        score: x.score === undefined ? y.score : y.score === undefined ? x.score : Math.max(x.score, y.score),
      }),
    ),
    tests,
    favorites: [...new Set([...local.favorites, ...remote.favorites])],
    activity,
    xp: Math.max(local.xp, remote.xp, activityXp),
    achievements: mergeRecord(local.achievements, remote.achievements, (x, y) => minDate(x, y)!),
    plus: mergeRecord(local.plus ?? {}, remote.plus ?? {}, Math.max),
  }
}
