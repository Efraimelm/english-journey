import { getPhrase } from '../content'
import { difficultIds, dueIds, INTERVALS, isMastered } from '../lib/progress'
import { useStore } from '../lib/store'
import { addDays, today } from '../lib/util'
import type { IconName } from '../ui/Icon'
import { Icon } from '../ui/Icon'
import { Card, Empty, PageHeader } from '../ui/kit'
import { startReview } from './actions'

export function Review() {
  const s = useStore()
  const due = dueIds(s)
  const hard = difficultIds(s)
  const all = Object.keys(s.phrases)
  const notRecalled = all.filter((id) => !s.phrases[id].recalled)
  const upcoming = [1, 2, 3, 4, 5, 6, 7].map((d) => {
    const date = addDays(today(), d)
    return { date, n: Object.values(s.phrases).filter((p) => p.due === date).length }
  })
  const maxUp = Math.max(1, ...upcoming.map((u) => u.n))

  if (!all.length) {
    return (
      <div>
        <PageHeader eyebrow="Memorização" title="Revisão" />
        <Empty icon="repeat" title="Ainda não há o que revisar" text="Assim que você aprender as primeiras frases, as revisões programadas aparecem aqui." />
      </div>
    )
  }

  const modes: { icon: IconName; title: string; text: string; ids: string[]; mode: 'mix' | 'cards' | 'listen' | 'write' }[] = [
    { icon: 'cards', title: 'Flashcards', text: 'Lembre a frase e avalie como foi', ids: due.length ? due : all, mode: 'cards' },
    { icon: 'volume', title: 'Teste de escuta', text: 'Ouça e identifique a frase', ids: due.length ? due : all, mode: 'listen' },
    { icon: 'pen', title: 'Exercício de escrita', text: 'Escreva sem olhar', ids: notRecalled.length ? notRecalled : due.length ? due : all, mode: 'write' },
  ]

  return (
    <div className="space-y-5">
      <PageHeader eyebrow="Memorização" title="Revisão" />

      <div className="rounded-[28px] bg-primary p-6 text-white">
        <div className="text-xs font-semibold tracking-wider text-mint uppercase">Revisões programadas</div>
        <div className="mt-2 text-3xl font-bold">{due.length} {due.length === 1 ? 'frase' : 'frases'} para hoje</div>
        <p className="mt-1 text-white/70">
          {due.length ? 'Revisar no momento certo é o que fixa as frases na memória.' : 'Tudo em dia. Você pode praticar livremente abaixo.'}
        </p>
        {due.length > 0 && (
          <button onClick={() => startReview(due, 'mix')} className="mt-5 w-full rounded-2xl bg-mint py-3.5 font-semibold text-[#10201a] active:scale-[0.98]">
            Revisar agora{due.length > 20 ? ' (20 primeiras)' : ''}
          </button>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {modes.map((m) => (
          <Card key={m.mode} onClick={() => startReview(shuffleCopy(m.ids), m.mode)}>
            <div className="mb-3 grid h-11 w-11 place-items-center rounded-2xl bg-accent-soft text-accent"><Icon name={m.icon} /></div>
            <div className="font-semibold">{m.title}</div>
            <div className="text-sm text-muted">{m.text}</div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="mb-1 flex items-center justify-between">
          <div className="font-semibold">Frases com dificuldade</div>
          {hard.length > 0 && (
            <button onClick={() => startReview(hard, 'mix')} className="text-sm font-semibold text-accent">Praticar</button>
          )}
        </div>
        {hard.length === 0 ? (
          <p className="text-sm text-muted">Nenhuma frase com erros repetidos. Muito bem!</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {hard.slice(0, 8).map((id) => {
              const p = getPhrase(id)
              return (
                <li key={id} className="flex items-baseline justify-between gap-3 text-[15px]">
                  <span><b>{p.en}</b> <span className="text-muted">— {p.pt}</span></span>
                  <span className="shrink-0 text-xs text-danger">{s.phrases[id].wrong} erros</span>
                </li>
              )
            })}
          </ul>
        )}
      </Card>

      <Card>
        <div className="mb-4 font-semibold">Próximos 7 dias</div>
        <div className="flex h-28 items-end gap-2">
          {upcoming.map((u) => (
            <div key={u.date} className="flex flex-1 flex-col items-center gap-1.5">
              <span className="text-xs font-semibold text-muted">{u.n || ''}</span>
              <div className="w-full rounded-lg bg-accent/70" style={{ height: `${(u.n / maxUp) * 64 + 4}px`, opacity: u.n ? 1 : 0.25 }} />
              <span className="text-[11px] text-muted">{new Date(u.date + 'T12:00').toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '')}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted">
          Intervalos: {INTERVALS.join(', ')} dias. Errou, a frase volta no dia seguinte; acertou com facilidade, o intervalo aumenta.
          {' '}{all.filter((id) => isMastered(s.phrases[id])).length} de {all.length} frases já dominadas.
        </p>
      </Card>
    </div>
  )
}

function shuffleCopy(ids: string[]) {
  return [...ids].sort(() => Math.random() - 0.5)
}
