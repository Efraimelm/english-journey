// Áudio: pronúncia via Web Speech API (voz em inglês americano do próprio aparelho)
// e reconhecimento de voz opcional (depende do navegador).

let voices: SpeechSynthesisVoice[] = []

function loadVoices() {
  if (!('speechSynthesis' in window)) return
  voices = speechSynthesis.getVoices()
}
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadVoices()
  speechSynthesis.addEventListener?.('voiceschanged', loadVoices)
}

const PREFERRED = ['Samantha', 'Google US English', 'Microsoft Aria', 'Microsoft Jenny', 'Microsoft Ava', 'Microsoft Guy', 'Alex']

export function bestVoice(): SpeechSynthesisVoice | undefined {
  const en = voices.filter((v) => v.lang.replace('_', '-').toLowerCase().startsWith('en-us'))
  for (const name of PREFERRED) {
    const natural = en.find((v) => v.name.includes(name) && /natural|online|enhanced|premium/i.test(v.name))
    if (natural) return natural
  }
  for (const name of PREFERRED) {
    const v = en.find((v) => v.name.includes(name))
    if (v) return v
  }
  return en[0] ?? voices.find((v) => v.lang.toLowerCase().startsWith('en'))
}

export const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window

export function stopSpeaking() {
  if (canSpeak) speechSynthesis.cancel()
}

/** Fala o texto em inglês. slow = velocidade reduzida. Resolve quando termina. */
export function speak(text: string, opts: { slow?: boolean } = {}): Promise<void> {
  return new Promise((resolve) => {
    if (!canSpeak) return resolve()
    speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text.replace(/[“”"]/g, ''))
    const v = bestVoice()
    if (v) u.voice = v
    u.lang = 'en-US'
    u.rate = opts.slow ? 0.6 : 0.95
    u.onend = () => resolve()
    u.onerror = () => resolve()
    speechSynthesis.speak(u)
  })
}

// ---- Reconhecimento de voz (opcional) ----

type Recognition = {
  lang: string
  interimResults: boolean
  maxAlternatives: number
  start(): void
  abort(): void
  onresult: ((e: { results: { 0: { transcript: string } }[] }) => void) | null
  onerror: (() => void) | null
  onend: (() => void) | null
}

const RecognitionCtor: (new () => Recognition) | undefined =
  typeof window !== 'undefined'
    ? ((window as unknown as Record<string, unknown>).SpeechRecognition ??
        (window as unknown as Record<string, unknown>).webkitSpeechRecognition) as (new () => Recognition) | undefined
    : undefined

export const canListen = !!RecognitionCtor

/** Escuta o aluno falando em inglês e devolve o texto reconhecido ('' se nada). */
export function listen(): { promise: Promise<string>; cancel: () => void } {
  if (!RecognitionCtor) return { promise: Promise.resolve(''), cancel: () => {} }
  const rec = new RecognitionCtor()
  rec.lang = 'en-US'
  rec.interimResults = false
  rec.maxAlternatives = 1
  let text = ''
  const promise = new Promise<string>((resolve) => {
    rec.onresult = (e) => { text = e.results[0][0].transcript }
    rec.onerror = () => resolve(text)
    rec.onend = () => resolve(text)
  })
  rec.start()
  return { promise, cancel: () => rec.abort() }
}
