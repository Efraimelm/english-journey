// Cartão do app parceiro: o Inglês Todo Dia usa a mesma conta, então mostramos em que dia você está lá.
import { useEffect, useState } from 'react'
import { readOtherApp } from '../lib/sync'
import { Icon } from '../ui/Icon'
import { Card } from '../ui/kit'

export const ITD_URL = 'https://efraimelm.github.io/ingles-todo-dia/#hoje'
const ITD_TOTAL = 360

interface ItdState {
  done?: number[]
}

export function CompanionCard() {
  const [day, setDay] = useState<number | null>(null)
  useEffect(() => {
    let alive = true
    readOtherApp<ItdState>('ingles_todo_dia').then((d) => {
      if (!d || !alive) return
      const done = new Set(d.done ?? [])
      let n = 1
      while (done.has(n) && n <= ITD_TOTAL) n++
      setDay(n)
    })
    return () => void (alive = false)
  }, [])

  return (
    <Card onClick={() => window.open(ITD_URL, '_blank', 'noopener')} className="flex items-center gap-4">
      <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-surface-2 text-accent">
        <Icon name="book" size={24} />
      </div>
      <div className="flex-1">
        <div className="font-semibold">Inglês Todo Dia{day ? ` · dia ${Math.min(day, ITD_TOTAL)} de ${ITD_TOTAL}` : ''}</div>
        <div className="text-sm text-muted">O texto e a escuta de hoje. Aqui você fixa as frases; lá você ouve e fala.</div>
      </div>
      <Icon name="chevron" className="text-muted" />
    </Card>
  )
}
