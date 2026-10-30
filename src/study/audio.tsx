// Botões de áudio e prática de pronúncia.
import { useEffect, useRef, useState } from 'react'
import { similarity } from '../lib/compare'
import { canListen, canSpeak, listen, speak, stopSpeaking } from '../lib/speech'
import { Icon } from '../ui/Icon'

export function AudioButtons({ text, autoPlay = false, big = false }: { text: string; autoPlay?: boolean; big?: boolean }) {
  const [playing, setPlaying] = useState<'normal' | 'slow' | null>(null)
  useEffect(() => {
    if (autoPlay) {
      const t = setTimeout(() => play('normal'), 250)
      return () => clearTimeout(t)
    }
    return () => stopSpeaking()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])
  useEffect(() => () => stopSpeaking(), [])

  async function play(mode: 'normal' | 'slow') {
    setPlaying(mode)
    await speak(text, { slow: mode === 'slow' })
    setPlaying(null)
  }

  if (!canSpeak) return <p className="text-sm text-muted">Este navegador não reproduz áudio. Tente o Chrome, Edge ou Safari.</p>

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => play('normal')}
        className={`inline-flex items-center gap-2 rounded-2xl bg-accent font-semibold text-on-accent transition active:scale-95 ${big ? 'px-5 py-3.5' : 'px-4 py-2.5 text-sm'} ${playing === 'normal' ? 'pop' : ''}`}
      >
        <Icon name="volume" size={18} /> Ouvir
      </button>
      <button
        onClick={() => play('slow')}
        className={`inline-flex items-center gap-2 rounded-2xl bg-surface-2 font-semibold transition active:scale-95 ${big ? 'px-5 py-3.5' : 'px-4 py-2.5 text-sm'} ${playing === 'slow' ? 'pop' : ''}`}
      >
        <Icon name="slow" size={18} /> Lento
      </button>
    </div>
  )
}

/** Grava o aluno falando e mostra o quanto foi reconhecido (só em navegadores compatíveis). */
export function PronunciationCheck({ text }: { text: string }) {
  const [state, setState] = useState<'idle' | 'listening' | 'done'>('idle')
  const [heard, setHeard] = useState('')
  const [score, setScore] = useState(0)
  const cancel = useRef<() => void>(() => {})
  useEffect(() => () => cancel.current(), [])
  useEffect(() => setState('idle'), [text])

  if (!canListen) return null

  async function start() {
    stopSpeaking()
    setState('listening')
    const r = listen()
    cancel.current = r.cancel
    const said = await r.promise
    setHeard(said)
    setScore(said ? similarity(said, text) : 0)
    setState('done')
  }

  return (
    <div className="mt-3 rounded-2xl bg-surface-2 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm">
          <div className="font-semibold">Teste sua pronúncia</div>
          <div className="text-muted">Toque e fale a frase em inglês.</div>
        </div>
        <button
          onClick={start}
          disabled={state === 'listening'}
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-full transition ${state === 'listening' ? 'animate-pulse bg-danger text-white' : 'bg-accent text-on-accent'}`}
          aria-label="Gravar pronúncia"
        >
          <Icon name="mic" />
        </button>
      </div>
      {state === 'done' && (
        <div className="rise mt-3 text-sm">
          {heard ? (
            <>
              <div className="text-muted">Entendemos: <span className="text-ink">"{heard}"</span></div>
              <div className={`mt-1 font-semibold ${score >= 0.8 ? 'text-accent' : score >= 0.5 ? 'text-warn' : 'text-danger'}`}>
                {score >= 0.8 ? 'Muito bem! Pronúncia clara.' : score >= 0.5 ? 'Quase lá. Ouça de novo e repita.' : 'Tente de novo, mais devagar.'}
              </div>
            </>
          ) : (
            <div className="text-muted">Não ouvimos nada. Verifique a permissão do microfone.</div>
          )}
        </div>
      )}
    </div>
  )
}
