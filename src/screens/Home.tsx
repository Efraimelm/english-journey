import { DAY_PLAN, getWeek, ROADMAP, TOTAL_PHRASES, WEEKS } from '../content'
import { canRest, dueIds, isMastered, nextActivity, phrasesStudied, streak, takeRest } from '../lib/progress'
import { useStore } from '../lib/store'
import { formatMinutes, today } from '../lib/util'
import { Icon } from '../ui/Icon'
import { Bar, Button, Card, Eyebrow, Ring } from '../ui/kit'
import { go, resumeSession, startDay, startReview } from './actions'

function greeting() {
  const h = new Date().getHours()
  return h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite'
}

export function Home() {
  const s = useStore()
  const next = nextActivity(s)
  const act = s.activity[today()] ?? { seconds: 0, xp: 0 }
  const goal = Math.min(1, act.seconds / (20 * 60))
  const due = dueIds(s)
  const studied = phrasesStudied(s)
  const mastered = Object.values(s.phrases).filter(isMastered).length
  const st = streak(s)
  const ongoing = s.session && !s.session.finished && s.session.pos > 0 ? s.session : undefined
  const week = next ? getWeek(next.week) : undefined
  const plan = next ? DAY_PLAN.find((d) => d.day === next.day) : undefined

  return (
    <div className="space-y-5">
      <header className="flex items-start justify-between pt-2">
        <div>
          <Eyebrow>{new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</Eyebrow>
          <h1 className="mt-1 text-[30px] leading-tight font-bold tracking-tight">
            {greeting()}{s.name ? `, ${s.name}` : ''}.
          </h1>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-sm font-bold" title="Dias seguidos de estudo">
          <Icon name="flame" size={18} className={st > 0 ? 'text-warn' : 'text-muted'} fill={st > 0} />
          {st}
        </div>
      </header>

      {/* Próxima atividade */}
      <div className="relative overflow-hidden rounded-[28px] bg-primary p-6 text-white">
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-mint/15" />
        <div className="absolute top-8 right-8 h-3 w-3 rounded-full bg-mint" />
        {ongoing ? (
          <>
            <div className="text-xs font-semibold tracking-wider text-mint uppercase">Em andamento</div>
            <div className="mt-2 text-2xl font-bold tracking-tight">
              {ongoing.kind === 'review' ? 'Revisão' : ongoing.kind === 'test' ? `Teste da semana ${ongoing.week}` : `Semana ${ongoing.week} · ${DAY_PLAN[ongoing.day! - 1].title}`}
            </div>
            <div className="mt-4 mb-5 h-1.5 overflow-hidden rounded-full bg-white/15">
              <div className="h-full rounded-full bg-mint" style={{ width: `${(ongoing.pos / Math.max(1, ongoing.steps.length - 1)) * 100}%` }} />
            </div>
            <Button className="w-full !bg-mint !text-[#10201a]" icon="play" onClick={resumeSession}>Continuar de onde parei</Button>
          </>
        ) : next && week && plan ? (
          <>
            <div className="text-xs font-semibold tracking-wider text-mint uppercase">Semana {week.n} · {plan.label}</div>
            <div className="mt-2 text-2xl font-bold tracking-tight">{plan.title}</div>
            <div className="mt-1 text-white/70">{week.theme} · {week.level}</div>
            <Button className="mt-5 w-full !bg-mint !text-[#10201a]" icon="play" onClick={() => startDay(next.week, next.day)}>
              {Object.keys(s.days).length ? 'Continuar' : 'Começar a jornada'}
            </Button>
          </>
        ) : (
          <>
            <div className="text-xs font-semibold tracking-wider text-mint uppercase">Parabéns</div>
            <div className="mt-2 text-2xl font-bold tracking-tight">Você concluiu as {WEEKS.length} semanas publicadas.</div>
            <div className="mt-1 text-white/70">A semana {WEEKS.length + 1} ({ROADMAP[WEEKS.length]?.theme}) chega em breve. Continue revisando!</div>
          </>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Meta diária */}
        <Card className="flex items-center gap-5">
          <Ring value={goal} size={76} stroke={7}>
            <span className="text-sm font-bold">{Math.round(goal * 100)}%</span>
          </Ring>
          <div>
            <div className="font-semibold">Meta de hoje</div>
            <div className="text-sm text-muted">{formatMinutes(act.seconds)} de 20 min</div>
            <div className="mt-1 text-sm text-muted">{act.xp} XP hoje</div>
            {act.rest && <div className="mt-1 text-sm font-semibold text-accent">Dia de descanso</div>}
          </div>
        </Card>

        {/* Revisões */}
        <Card onClick={due.length ? () => startReview(due, 'mix') : () => go('#/revisao')} className="flex items-center gap-4">
          <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${due.length ? 'bg-accent-soft text-accent' : 'bg-surface-2 text-muted'}`}>
            <Icon name="repeat" size={24} />
          </div>
          <div className="flex-1">
            <div className="font-semibold">{due.length ? `${due.length} ${due.length === 1 ? 'revisão pendente' : 'revisões pendentes'}` : 'Revisões em dia'}</div>
            <div className="text-sm text-muted">{due.length ? 'Toque para revisar agora' : 'Nada para revisar hoje'}</div>
          </div>
          <Icon name="chevron" className="text-muted" />
        </Card>
      </div>

      {/* Progresso anual */}
      <Card onClick={() => go('#/jornada')}>
        <div className="mb-3 flex items-baseline justify-between">
          <div className="font-semibold">Progresso da jornada</div>
          <div className="text-sm text-muted">{studied} de {TOTAL_PHRASES} frases</div>
        </div>
        <Bar value={studied / TOTAL_PHRASES} />
        <div className="mt-3 flex gap-6 text-sm text-muted">
          <span><b className="text-ink">{Object.keys(s.days).filter((k) => k.endsWith('d7')).length}</b> semanas concluídas</span>
          <span><b className="text-ink">{mastered}</b> dominadas</span>
          <span><b className="text-ink">{s.xp}</b> XP</span>
        </div>
      </Card>

      {canRest(s) && !act.rest && (
        <div className="text-center">
          <button
            onClick={() => confirm('Marcar hoje como dia de descanso? Sua sequência será mantida (1 descanso por semana).') && takeRest()}
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink"
          >
            <Icon name="coffee" size={16} /> Hoje não vou conseguir estudar
          </button>
        </div>
      )}
    </div>
  )
}
