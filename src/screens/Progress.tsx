import { TOTAL_PHRASES, WEEKS } from '../content'
import { ACHIEVEMENTS, estimatedLevel, isMastered, isWeekDone, level, streak } from '../lib/progress'
import { useStore } from '../lib/store'
import { addDays, formatMinutes, today } from '../lib/util'
import { Icon } from '../ui/Icon'
import { Bar, Card, PageHeader, Stat } from '../ui/kit'
import { go } from './actions'

export function Progress() {
  const s = useStore()
  const studied = Object.keys(s.phrases).length
  const mastered = Object.values(s.phrases).filter(isMastered).length
  const seconds = Object.values(s.activity).reduce((a, d) => a + d.seconds, 0)
  const attempts = Object.values(s.tests).flatMap((t) => t.attempts)
  const avg = attempts.length ? attempts.reduce((a, t) => a + t.score, 0) / attempts.length : undefined
  const answers = Object.values(s.phrases).reduce((a, p) => ({ c: a.c + p.correct, w: a.w + p.wrong }), { c: 0, w: 0 })
  const accuracy = answers.c + answers.w ? answers.c / (answers.c + answers.w) : undefined
  const lv = level(s.xp)
  const texts = Object.values(s.texts).filter((t) => t.readAt).length

  // frequência: últimas 12 semanas (84 dias), semana começando na segunda
  const start = (() => {
    const d = addDays(today(), -83)
    const dow = (new Date(d + 'T12:00').getDay() + 6) % 7
    return addDays(d, -dow)
  })()
  const days = Array.from({ length: 7 * 12 + 7 }, (_, i) => addDays(start, i)).filter((d) => d <= today())

  // evolução por mês: frases aprendidas
  const months = new Map<string, number>()
  for (const p of Object.values(s.phrases)) months.set(p.learnedAt.slice(0, 7), (months.get(p.learnedAt.slice(0, 7)) ?? 0) + 1)
  const monthList = [...months.entries()].sort()
  const maxMonth = Math.max(1, ...monthList.map((m) => m[1]))

  return (
    <div className="space-y-5">
      <PageHeader
        eyebrow="Sua evolução"
        title="Meu progresso"
        right={
          <button onClick={() => go('#/conta')} className="rounded-full bg-surface p-2.5 text-muted hover:text-ink" aria-label="Conta e ajustes">
            <Icon name="user" />
          </button>
        }
      />

      <Card className="flex items-center gap-5">
        <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-primary text-2xl font-bold text-mint">{lv.lvl}</div>
        <div className="flex-1">
          <div className="flex items-baseline justify-between">
            <div className="font-semibold">Nível {lv.lvl}</div>
            <div className="text-sm text-muted">{s.xp} XP</div>
          </div>
          <Bar value={lv.progress} className="my-2" />
          <div className="text-sm text-muted">Faltam {lv.toNext} XP para o nível {lv.lvl + 1} · Inglês estimado: <b className="text-ink">{estimatedLevel(s)}</b></div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Frases aprendidas" value={studied} hint={`de ${TOTAL_PHRASES}`} />
        <Stat label="Frases dominadas" value={mastered} hint="reconhece, entende e escreve" />
        <Stat label="Textos concluídos" value={texts} hint={`de ${WEEKS.length} publicados`} />
        <Stat label="Tempo de estudo" value={formatMinutes(seconds)} />
        <Stat label="Sequência" value={`${streak(s)} ${streak(s) === 1 ? 'dia' : 'dias'}`} />
        <Stat label="Semanas concluídas" value={WEEKS.filter((w) => isWeekDone(s, w.n)).length} hint="de 48" />
        <Stat label="Média nos testes" value={avg === undefined ? '—' : `${Math.round(avg * 100)}%`} />
        <Stat label="Acertos nos exercícios" value={accuracy === undefined ? '—' : `${Math.round(accuracy * 100)}%`} />
      </div>

      <Card>
        <div className="mb-1 font-semibold">As 960 frases</div>
        <div className="mb-3 text-sm text-muted">Cada quadradinho é uma frase da jornada.</div>
        <div className="grid gap-[3px]" style={{ gridTemplateColumns: 'repeat(40, minmax(0, 1fr))' }}>
          {Array.from({ length: TOTAL_PHRASES }, (_, i) => {
            const id = `w${Math.floor(i / 20) + 1}p${String((i % 20) + 1).padStart(2, '0')}`
            const p = s.phrases[id]
            return <div key={i} className={`aspect-square rounded-[2px] ${isMastered(p) ? 'bg-accent' : p ? 'bg-accent/40' : 'bg-surface-2'}`} />
          })}
        </div>
        <div className="mt-3 flex gap-4 text-xs text-muted">
          <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-sm bg-accent" /> dominada</span>
          <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-sm bg-accent/40" /> estudada</span>
          <span className="flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-sm bg-surface-2" /> a estudar</span>
        </div>
      </Card>

      <Card>
        <div className="mb-3 font-semibold">Frequência</div>
        <div className="grid grid-flow-col grid-rows-7 gap-[3px]" style={{ gridAutoColumns: 'minmax(0, 1fr)' }}>
          {days.map((d) => {
            const a = s.activity[d]
            const m = (a?.seconds ?? 0) / 60
            const cls = a?.rest ? 'bg-warn/40' : !a?.xp ? 'bg-surface-2' : m >= 20 ? 'bg-accent' : m >= 10 ? 'bg-accent/65' : 'bg-accent/35'
            return <div key={d} title={`${new Date(d + 'T12:00').toLocaleDateString('pt-BR')}: ${Math.round(m)} min`} className={`aspect-square rounded-[3px] ${cls}`} />
          })}
        </div>
        <div className="mt-3 text-xs text-muted">Últimas 12 semanas · mais escuro = mais tempo de estudo · amarelo = descanso</div>
      </Card>

      <Card>
        <div className="mb-4 font-semibold">Evolução por mês</div>
        {monthList.length === 0 ? (
          <p className="text-sm text-muted">Aparece assim que você aprender as primeiras frases.</p>
        ) : (
          <div className="space-y-2.5">
            {monthList.map(([m, n]) => (
              <div key={m} className="flex items-center gap-3 text-sm">
                <span className="w-16 text-muted capitalize">{new Date(m + '-15T12:00').toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')}/{m.slice(2, 4)}</span>
                <div className="h-2 flex-1 rounded-full bg-surface-2"><div className="h-full rounded-full bg-accent" style={{ width: `${(n / maxMonth) * 100}%` }} /></div>
                <span className="w-10 text-right font-semibold tabular-nums">{n}</span>
              </div>
            ))}
          </div>
        )}
      </Card>

      <div>
        <h2 className="mb-3 text-lg font-bold">Conquistas</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {ACHIEVEMENTS.map((a) => {
            const got = s.achievements[a.id]
            return (
              <div key={a.id} className={`rounded-3xl border p-4 ${got ? 'border-accent/40 bg-accent-soft' : 'border-line bg-surface opacity-60'}`}>
                <Icon name={got ? 'trophy' : 'lock'} className={got ? 'text-accent' : 'text-muted'} />
                <div className="mt-2 font-semibold">{a.title}</div>
                <div className="text-xs text-muted">{got ? `Conquistada em ${new Date(got + 'T12:00').toLocaleDateString('pt-BR')}` : a.desc}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
