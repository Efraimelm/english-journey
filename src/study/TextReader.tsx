// Leitura do texto semanal: áudio completo ou frase por frase, tradução, palavras tocáveis
// e destaque das frases estudadas na semana.
import { useEffect, useRef, useState } from 'react'
import { DICTIONARY } from '../content'
import { speak, stopSpeaking } from '../lib/speech'
import type { Week } from '../types'
import { Icon } from '../ui/Icon'
import { Eyebrow } from '../ui/kit'

const clean = (s: string) => s.toLowerCase().replace(/[^a-z' ]/g, ' ').replace(/\s+/g, ' ').trim()

/** Trechos da frase do texto que correspondem a frases da semana. */
function matches(sentence: string, week: Week): string[] {
  const s = ` ${clean(sentence)} `
  return week.phrases.filter((p) => s.includes(` ${clean(p.en)} `)).map((p) => p.id)
}

export function TextReader({ week, onRead, inSession = false }: { week: Week; onRead?: () => void; inSession?: boolean }) {
  const text = week.text
  const [showPt, setShowPt] = useState(false)
  const [highlight, setHighlight] = useState(true)
  const [current, setCurrent] = useState<number | null>(null)
  const [playingAll, setPlayingAll] = useState(false)
  const [word, setWord] = useState<{ w: string; pt: string } | null>(null)
  const [heard, setHeard] = useState<Set<number>>(new Set())
  const stop = useRef(false)

  useEffect(() => () => { stop.current = true; stopSpeaking() }, [])
  useEffect(() => {
    if (heard.size >= text.sentences.length) onRead?.()
  }, [heard, text.sentences.length, onRead])

  async function playFrom(i: number) {
    stop.current = false
    setPlayingAll(true)
    for (let k = i; k < text.sentences.length; k++) {
      if (stop.current) break
      setCurrent(k)
      await speak(text.sentences[k].en)
      setHeard((h) => new Set(h).add(k))
    }
    setPlayingAll(false)
    setCurrent(null)
  }

  async function playOne(i: number) {
    stop.current = true
    setPlayingAll(false)
    setCurrent(i)
    await speak(text.sentences[i].en)
    setHeard((h) => new Set(h).add(i))
    setCurrent((c) => (c === i ? null : c))
  }

  function stopAll() {
    stop.current = true
    stopSpeaking()
    setPlayingAll(false)
    setCurrent(null)
  }

  const found = new Set(text.sentences.flatMap((s) => matches(s.en, week)))

  return (
    <div>
      <Eyebrow>Texto da semana {week.n}</Eyebrow>
      <h2 className="mt-2 text-[30px] leading-tight font-bold tracking-tight">{text.title}</h2>
      <p className="text-muted">{text.titlePt}</p>

      <div
        className={`sticky z-10 -mx-1 mt-5 flex flex-wrap gap-2 bg-bg/90 px-1 py-2 backdrop-blur ${
          inSession ? 'top-[calc(env(safe-area-inset-top)+68px)]' : 'top-[env(safe-area-inset-top)]'
        }`}
      >
        {playingAll ? (
          <button onClick={stopAll} className="inline-flex items-center gap-2 rounded-2xl bg-accent px-4 py-2.5 text-sm font-semibold text-on-accent">
            <Icon name="x" size={16} /> Parar
          </button>
        ) : (
          <button onClick={() => playFrom(0)} className="inline-flex items-center gap-2 rounded-2xl bg-accent px-4 py-2.5 text-sm font-semibold text-on-accent">
            <Icon name="play" size={16} fill /> Ouvir texto
          </button>
        )}
        <button onClick={() => setShowPt(!showPt)} className={`rounded-2xl px-4 py-2.5 text-sm font-semibold ${showPt ? 'bg-accent-soft text-accent' : 'bg-surface-2'}`}>
          Tradução
        </button>
        <button onClick={() => setHighlight(!highlight)} className={`rounded-2xl px-4 py-2.5 text-sm font-semibold ${highlight ? 'bg-accent-soft text-accent' : 'bg-surface-2'}`}>
          Frases da semana
        </button>
      </div>

      <p className="mt-3 text-sm text-muted">Toque em uma frase para ouvi-la. Toque em uma palavra para ver a tradução.</p>

      <div className="mt-4 space-y-2">
        {text.sentences.map((s, i) => {
          const hit = highlight && matches(s.en, week).length > 0
          return (
            <div
              key={i}
              onClick={() => playOne(i)}
              className={`cursor-pointer rounded-2xl px-4 py-3 transition ${current === i ? 'bg-accent-soft' : 'hover:bg-surface'}`}
            >
              <p className={`text-[19px] leading-relaxed ${hit ? 'decoration-accent/60 decoration-2 underline-offset-4 [text-decoration-line:underline]' : ''}`}>
                {s.en.split(/(\s+)/).map((tok, k) => {
                  const raw = tok.toLowerCase().replace(/[^a-z']/g, '').replace(/^'+|'+$/g, '')
                  if (!raw) return tok
                  const key = DICTIONARY[raw] ? raw : raw.replace(/'s$/, '')
                  return (
                    <span
                      key={k}
                      onClick={(e) => {
                        e.stopPropagation()
                        speak(key)
                        setWord({ w: tok.replace(/[^A-Za-z']/g, ''), pt: DICTIONARY[key] ?? 'tradução não cadastrada' })
                      }}
                      className="rounded hover:bg-accent-soft"
                    >
                      {tok}
                    </span>
                  )
                })}
              </p>
              {showPt && <p className="mt-1 text-[15px] text-muted">{s.pt}</p>}
            </div>
          )
        })}
      </div>

      {highlight && (
        <p className="mt-4 text-sm text-muted">
          <span className="font-semibold text-accent">{found.size} de 20</span> frases da semana aparecem neste texto (sublinhadas).
        </p>
      )}

      {word && (
        <div className="rise fixed inset-x-4 bottom-24 z-40 mx-auto max-w-md rounded-3xl border border-line bg-surface p-5 shadow-2xl md:bottom-8">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xl font-bold">{word.w}</div>
              <div className="text-muted">{word.pt}</div>
            </div>
            <button onClick={() => setWord(null)} className="rounded-full bg-surface-2 p-2" aria-label="Fechar">
              <Icon name="x" size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
