// Tipos do conteúdo pedagógico e do progresso do aluno.

export type Level = 'A1' | 'A2' | 'B1'

/** Uma palavra ou bloco da frase com sua tradução ("Entenda a frase"). */
export interface WordGloss {
  en: string
  pt: string
}

export interface Phrase {
  id: string // ex.: "w1p01"
  en: string
  pt: string
  words: WordGloss[]
  /** Explicação curta de estrutura/uso. */
  note?: string
  /** Palavra que some no exercício "Complete a frase" + alternativas erradas. */
  blank: { word: string; wrong: [string, string] }
}

export interface TextSentence {
  en: string
  pt: string
}

export interface Question {
  q: string
  options: string[]
  answer: number // índice da opção correta
}

export interface WeekText {
  title: string
  titlePt: string
  sentences: TextSentence[]
  /** Traduções extras de palavras do texto que não aparecem nas frases da semana. */
  glossary: Record<string, string>
  questions: Question[]
}

export interface Week {
  n: number
  theme: string
  level: Level
  goals: string[]
  phrases: Phrase[]
  text: WeekText
}

/** Semana planejada mas ainda sem conteúdo publicado. */
export interface WeekOutline {
  n: number
  theme: string
  level: Level
  stage: string
}

// ---------- Progresso ----------

export interface PhraseProgress {
  step: number // posição na escada de intervalos (0 = recém-aprendida)
  due: string // data (AAAA-MM-DD) da próxima revisão
  seen: number
  correct: number
  wrong: number
  lapses: number // erros depois de já ter acertado
  learnedAt: string
  recognized: boolean // acertou reconhecimento (escolha/escuta)
  understood: boolean // acertou significado (tradução)
  recalled: boolean // escreveu sem olhar a tradução em inglês
}

export type StepType =
  | 'intro'
  | 'learn'
  | 'choice'
  | 'fill'
  | 'order'
  | 'listen'
  | 'write'
  | 'card'
  | 'text'
  | 'textq'
  | 'result'

export interface Step {
  t: StepType
  id?: string // id da frase
  i?: number // índice da pergunta do texto
  retry?: boolean // exercício repetido após erro
}

export type SessionKind = 'day' | 'test' | 'review'

export interface Session {
  key: string // ex.: "w1d3", "w1test", "review-2026-10-30"
  kind: SessionKind
  week?: number
  day?: number
  steps: Step[]
  pos: number
  answers: { ok: boolean; id?: string; t: StepType; retry?: boolean }[]
  startedAt: string
  finished?: boolean
}

export interface DayActivity {
  seconds: number
  xp: number
  rest?: boolean
}

export interface AppState {
  version: 1
  updatedAt: number
  name: string
  days: Record<string, string> // "w1d3" -> data de conclusão
  session?: Session
  phrases: Record<string, PhraseProgress>
  texts: Record<number, { readAt?: string; score?: number }>
  tests: Record<number, { attempts: { date: string; score: number }[]; passedAt?: string }>
  favorites: string[]
  activity: Record<string, DayActivity>
  xp: number
  achievements: Record<string, string>
  theme: 'system' | 'light' | 'dark'
}
