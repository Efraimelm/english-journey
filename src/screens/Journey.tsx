import { DAY_PLAN, getWeek, ROADMAP, STAGES } from '../content'
import { isDayDone, isWeekDone, isWeekUnlocked, nextActivity, weekCompletion } from '../lib/progress'
import { useStore } from '../lib/store'
import { Icon } from '../ui/Icon'
import { Bar, Button, Eyebrow, PageHeader, Pill } from '../ui/kit'
import { go, startDay } from './actions'

export function Journey() {
  const s = useStore()
  const next = nextActivity(s)
  const doneWeeks = ROADMAP.filter((w) => isWeekDone(s, w.n)).length

  return (
    <div>
      <PageHeader eyebrow="48 semanas" title="Jornada" right={<Pill tone="accent">{Math.round((doneWeeks / 48) * 100)}%</Pill>} />
      <Bar value={doneWeeks / 48} className="mb-8" />

      {STAGES.map((stage) => (
        <section key={stage.name} className="mb-8">
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-lg font-bold">{stage.name}</h2>
            <span className="text-sm text-muted">Semanas {stage.from}–{stage.to}</span>
          </div>
          <div className="relative">
            <div className="absolute top-6 bottom-6 left-[27px] w-0.5 bg-line" />
            <div className="space-y-2">
              {ROADMAP.filter((w) => w.n >= stage.from && w.n <= stage.to).map((w) => {
                const has = !!getWeek(w.n)
                const done = isWeekDone(s, w.n)
                const current = next?.week === w.n
                const unlocked = has && isWeekUnlocked(s, w.n)
                const pct = weekCompletion(s, w.n)
                const test = s.tests[w.n]
                const best = test?.attempts.length ? Math.max(...test.attempts.map((a) => a.score)) : undefined
                return (
                  <button
                    key={w.n}
                    disabled={!unlocked}
                    onClick={() => go(`#/semana/${w.n}`)}
                    className={`relative flex w-full items-center gap-4 rounded-3xl p-2 pr-4 text-left transition ${unlocked ? 'hover:bg-surface' : 'opacity-60'} ${current ? 'bg-surface ring-1 ring-accent/40' : ''}`}
                  >
                    <div
                      className={`z-[1] grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-bold ${
                        done ? 'bg-accent text-on-accent' : current ? 'bg-primary text-white ring-4 ring-accent/30' : 'bg-surface-2 text-muted'
                      } ml-1.5`}
                    >
                      {done ? <Icon name="check" size={18} /> : unlocked ? w.n : <Icon name="lock" size={16} />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-semibold">{w.theme}</div>
                      <div className="text-sm text-muted">
                        Semana {w.n} · {w.level}
                        {!has && ' · em breve'}
                        {best !== undefined && ` · teste ${Math.round(best * 100)}%`}
                      </div>
                    </div>
                    {unlocked && !done && pct > 0 && <span className="text-sm font-semibold text-accent">{Math.round(pct * 100)}%</span>}
                  </button>
                )
              })}
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}

export function WeekDetail({ n }: { n: number }) {
  const s = useStore()
  const week = getWeek(n)
  if (!week || !isWeekUnlocked(s, n)) {
    return (
      <div className="py-16 text-center">
        <p className="text-muted">Esta semana ainda não está disponível.</p>
        <Button className="mt-6" onClick={() => go('#/jornada')}>Ver a jornada</Button>
      </div>
    )
  }
  const next = nextActivity(s)
  const test = s.tests[n]
  return (
    <div>
      <button onClick={() => go('#/jornada')} className="mb-4 inline-flex items-center gap-1 text-sm text-muted hover:text-ink">
        <Icon name="back" size={16} /> Jornada
      </button>
      <PageHeader eyebrow={`Semana ${n} · ${week.level}`} title={week.theme} />

      <div className="mb-6 rounded-3xl border border-line bg-surface p-5">
        <div className="mb-3 font-semibold">Objetivos</div>
        <ul className="space-y-2 text-[15px]">
          {week.goals.map((g) => <li key={g} className="flex gap-2"><Icon name="check" size={18} className="mt-0.5 shrink-0 text-accent" />{g}</li>)}
        </ul>
      </div>

      <div className="space-y-2">
        {DAY_PLAN.map((d) => {
          const done = isDayDone(s, n, d.day)
          const available = done || (next?.week === n && next.day === d.day)
          return (
            <button
              key={d.day}
              disabled={!available}
              onClick={() => startDay(n, d.day)}
              className={`flex w-full items-center gap-4 rounded-3xl border p-4 text-left transition ${
                available && !done ? 'border-accent/50 bg-surface' : 'border-line bg-surface'
              } ${available ? 'hover:border-accent/60' : 'opacity-55'}`}
            >
              <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${done ? 'bg-accent text-on-accent' : available ? 'bg-accent-soft text-accent' : 'bg-surface-2 text-muted'}`}>
                {done ? <Icon name="check" size={18} /> : available ? <Icon name="play" size={16} fill /> : <Icon name="lock" size={16} />}
              </div>
              <div className="flex-1">
                <Eyebrow>Dia {d.day} · {d.label}</Eyebrow>
                <div className="font-semibold">{d.title}</div>
              </div>
              {done && <span className="text-sm text-muted">{d.day === 7 ? 'Aprovado' : 'Refazer'}</span>}
            </button>
          )
        })}
      </div>

      {test && test.attempts.length > 0 && (
        <div className="mt-6 rounded-3xl border border-line bg-surface p-5">
          <div className="mb-3 font-semibold">Histórico de avaliações</div>
          <ul className="space-y-1.5 text-sm">
            {test.attempts.map((a, i) => (
              <li key={i} className="flex justify-between">
                <span className="text-muted">Tentativa {i + 1} · {new Date(a.date + 'T12:00').toLocaleDateString('pt-BR')}</span>
                <span className={`font-semibold ${a.score >= 0.8 ? 'text-accent' : 'text-danger'}`}>{Math.round(a.score * 100)}%</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
