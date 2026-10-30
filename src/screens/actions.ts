// Ações de navegação compartilhadas entre as telas.
import { buildDaySession, buildReviewSession, dayKey } from '../lib/progress'
import { getState, update } from '../lib/store'

export function go(to: string) {
  window.location.hash = to
}

/** Abre o dia da semana; se já havia começado, continua exatamente do mesmo ponto. */
export function startDay(week: number, day: number) {
  const s = getState()
  const key = day === 7 ? `w${week}test` : dayKey(week, day)
  if (!(s.session && s.session.key === key && !s.session.finished)) {
    update((st) => ({ ...st, session: buildDaySession(st, week, day) }))
  }
  go('#/sessao')
}

export function startReview(ids: string[], mode: 'mix' | 'cards' | 'listen' | 'write') {
  if (!ids.length) return
  update((st) => ({ ...st, session: buildReviewSession(st, ids.slice(0, 20), mode) }))
  go('#/sessao')
}

export function resumeSession() {
  go('#/sessao')
}
