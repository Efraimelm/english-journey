import { useState } from 'react'
import { getPhrase, getWeek, WEEKS, weekOfPhrase } from '../content'
import { isMastered } from '../lib/progress'
import { speak } from '../lib/speech'
import { update, useStore } from '../lib/store'
import { TextReader } from '../study/TextReader'
import { Icon } from '../ui/Icon'
import { Empty, PageHeader, Pill } from '../ui/kit'
import { go } from './actions'

type Tab = 'frases' | 'favoritas' | 'textos' | 'vocabulario'

const strip = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

export function Library() {
  const s = useStore()
  const [tab, setTab] = useState<Tab>('frases')
  const [q, setQ] = useState('')
  const studied = Object.keys(s.phrases).sort()
  const ids = tab === 'favoritas' ? s.favorites.filter((id) => s.phrases[id]) : studied
  const query = strip(q.trim())
  const filtered = ids.filter((id) => {
    if (!query) return true
    const p = getPhrase(id)
    return strip(p.en).includes(query) || strip(p.pt).includes(query)
  })
  const textsAvailable = WEEKS.filter((w) => s.days[`w${w.n}d6`] || s.texts[w.n]?.readAt)

  // vocabulário: palavras/blocos das frases já estudadas
  const vocab = studied.flatMap((id) => getPhrase(id).words.map((w) => ({ ...w, id })))
  const vocabUnique = [...new Map(vocab.map((v) => [v.en.toLowerCase(), v])).values()].filter(
    (v) => !query || strip(v.en).includes(query) || strip(v.pt).includes(query),
  )

  return (
    <div>
      <PageHeader eyebrow="Tudo o que você já estudou" title="Biblioteca" />

      <div className="relative mb-4">
        <Icon name="search" size={18} className="absolute top-1/2 left-4 -translate-y-1/2 text-muted" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar palavra ou expressão…"
          className="w-full rounded-2xl border border-line bg-surface py-3.5 pr-4 pl-11 outline-none placeholder:text-muted focus:border-accent"
        />
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
        {([['frases', `Frases (${studied.length})`], ['favoritas', `Favoritas (${s.favorites.length})`], ['textos', 'Textos'], ['vocabulario', 'Vocabulário']] as const).map(([k, label]) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${tab === k ? 'bg-ink text-bg' : 'bg-surface text-muted'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {(tab === 'frases' || tab === 'favoritas') &&
        (filtered.length === 0 ? (
          <Empty
            icon={tab === 'favoritas' ? 'heart' : 'book'}
            title={q ? 'Nada encontrado' : tab === 'favoritas' ? 'Nenhuma favorita ainda' : 'Nenhuma frase ainda'}
            text={q ? 'Tente outra palavra, em inglês ou português.' : tab === 'favoritas' ? 'Toque no coração de uma frase para guardá-la aqui.' : 'As frases aparecem aqui assim que você as estuda.'}
          />
        ) : (
          <div className="space-y-2">
            {filtered.map((id) => <PhraseRow key={id} id={id} />)}
          </div>
        ))}

      {tab === 'textos' &&
        (textsAvailable.length === 0 ? (
          <Empty icon="text" title="Nenhum texto ainda" text="O texto de cada semana fica disponível no sábado (dia 6)." />
        ) : (
          <div className="space-y-2">
            {textsAvailable.map((w) => (
              <button key={w.n} onClick={() => go(`#/texto/${w.n}`)} className="flex w-full items-center gap-4 rounded-3xl border border-line bg-surface p-4 text-left hover:border-accent/40">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-accent-soft text-accent"><Icon name="text" /></div>
                <div className="flex-1">
                  <div className="font-semibold">{w.text.title}</div>
                  <div className="text-sm text-muted">Semana {w.n} · {w.text.titlePt}</div>
                </div>
                <Icon name="chevron" className="text-muted" />
              </button>
            ))}
          </div>
        ))}

      {tab === 'vocabulario' &&
        (vocabUnique.length === 0 ? (
          <Empty icon="book" title="Sem vocabulário ainda" text="As palavras das frases estudadas aparecem aqui." />
        ) : (
          <div className="grid gap-2 sm:grid-cols-2">
            {vocabUnique.map((v) => (
              <button key={v.en} onClick={() => speak(v.en)} className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-surface px-4 py-3 text-left">
                <div>
                  <div className="font-semibold">{v.en}</div>
                  <div className="text-sm text-muted">{v.pt}</div>
                </div>
                <Icon name="volume" size={18} className="shrink-0 text-muted" />
              </button>
            ))}
          </div>
        ))}
    </div>
  )
}

function PhraseRow({ id }: { id: string }) {
  const s = useStore()
  const p = getPhrase(id)
  const prog = s.phrases[id]
  const fav = s.favorites.includes(id)
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-3xl border border-line bg-surface">
      <div className="flex items-center gap-2 p-2 pl-4">
        <button onClick={() => setOpen(!open)} className="min-w-0 flex-1 py-2 text-left">
          <div className="font-semibold">{p.en}</div>
          <div className="text-sm text-muted">{p.pt}</div>
        </button>
        {isMastered(prog) && <Pill tone="accent">Dominada</Pill>}
        <button onClick={() => speak(p.en)} className="rounded-full p-2.5 text-muted hover:bg-surface-2 hover:text-ink" aria-label="Ouvir">
          <Icon name="volume" size={18} />
        </button>
        <button
          onClick={() => update((st) => ({ ...st, favorites: fav ? st.favorites.filter((f) => f !== id) : [...st.favorites, id] }))}
          className={`rounded-full p-2.5 hover:bg-surface-2 ${fav ? 'text-danger' : 'text-muted'}`}
          aria-label={fav ? 'Remover dos favoritos' : 'Favoritar'}
        >
          <Icon name="heart" size={18} fill={fav} />
        </button>
      </div>
      {open && (
        <div className="rise border-t border-line px-4 py-4 text-[15px]">
          <ul className="space-y-1">
            {p.words.map((w) => <li key={w.en}><b className="text-accent">{w.en}</b> = {w.pt}</li>)}
          </ul>
          {p.note && <p className="mt-3 text-sm text-muted">{p.note}</p>}
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
            <span>Semana {weekOfPhrase(id)} · {getWeek(weekOfPhrase(id))?.theme}</span>
            {prog && <span>{prog.correct} acertos · {prog.wrong} erros</span>}
            {prog && <span>Próxima revisão: {new Date(prog.due + 'T12:00').toLocaleDateString('pt-BR')}</span>}
          </div>
        </div>
      )}
    </div>
  )
}

export function TextPage({ n }: { n: number }) {
  const s = useStore()
  const week = getWeek(n)
  if (!week || !(s.days[`w${n}d6`] || s.texts[n]?.readAt)) {
    return <Empty icon="lock" title="Texto bloqueado" text="Este texto é liberado no dia 6 da semana." />
  }
  return (
    <div>
      <button onClick={() => go('#/biblioteca')} className="mb-4 inline-flex items-center gap-1 text-sm text-muted hover:text-ink">
        <Icon name="back" size={16} /> Biblioteca
      </button>
      <TextReader week={week} />
    </div>
  )
}
