import type { Phrase, Week, WeekOutline } from '../types'
import { week1 } from './week1'
import { week2 } from './week2'
import { week3 } from './week3'
import { week4 } from './week4'

/** Semanas com conteúdo publicado. Para publicar uma nova semana, crie weekN.ts e adicione aqui. */
export const WEEKS: Week[] = [week1, week2, week3, week4]

const outline: [string, WeekOutline['level']][] = [
  ['Apresentações e cumprimentos', 'A1'], ['Números e informações pessoais', 'A1'], ['Família', 'A1'],
  ['Rotina diária', 'A1'], ['Dias, meses e horários', 'A1'], ['Casa e moradia', 'A1'],
  ['Gostos e preferências', 'A1'], ['Revisão dos fundamentos', 'A1'],
  ['Comida e bebida', 'A1'], ['No supermercado', 'A1'], ['Roupas e compras', 'A1'], ['Lugares na cidade', 'A1'],
  ['Pedindo direções', 'A2'], ['Clima e estações', 'A2'], ['Saúde e corpo', 'A2'], ['Tempo livre e hobbies', 'A2'],
  ['Fazendo perguntas', 'A2'], ['O que está acontecendo agora', 'A2'], ['Passado: o que eu fiz', 'A2'],
  ['Passado: contando histórias', 'A2'], ['Planos para o futuro', 'A2'], ['Convites e combinados', 'A2'],
  ['Ao telefone', 'A2'], ['Situações sociais', 'A2'],
  ['No aeroporto', 'A2'], ['No hotel', 'A2'], ['No restaurante', 'A2'], ['Transporte', 'A2'],
  ['Turismo', 'A2'], ['Imprevistos em viagem', 'A2'],
  ['Profissões', 'A2'], ['No escritório', 'A2'], ['Reuniões', 'A2'], ['E-mails e mensagens', 'A2'],
  ['Entrevista de emprego', 'A2'], ['Projetos e prazos', 'A2'],
  ['Dando opiniões', 'A2'], ['Experiências de vida', 'B1'], ['Comparações', 'A2'], ['Conselhos e sugestões', 'A2'],
  ['Notícias e acontecimentos', 'B1'], ['Resolvendo problemas', 'B1'],
  ['Diálogos mais longos', 'B1'], ['Contando histórias', 'B1'], ['Concordar e discordar', 'B1'],
  ['Cultura e entretenimento', 'B1'], ['Comunicação espontânea', 'B1'], ['Revisão final da jornada', 'B1'],
]

export const STAGES: { name: string; from: number; to: number }[] = [
  { name: 'Fundamentos', from: 1, to: 8 },
  { name: 'Vida cotidiana', from: 9, to: 16 },
  { name: 'Comunicação', from: 17, to: 24 },
  { name: 'Viagens', from: 25, to: 30 },
  { name: 'Trabalho', from: 31, to: 36 },
  { name: 'Consolidação', from: 37, to: 42 },
  { name: 'Fluência inicial', from: 43, to: 48 },
]

export const ROADMAP: WeekOutline[] = outline.map(([theme, level], i) => ({
  n: i + 1,
  theme,
  level,
  stage: STAGES.find((s) => i + 1 >= s.from && i + 1 <= s.to)!.name,
}))

export const TOTAL_WEEKS = 48
export const TOTAL_PHRASES = TOTAL_WEEKS * 20

export function getWeek(n: number): Week | undefined {
  return WEEKS.find((w) => w.n === n)
}

const phraseIndex = new Map<string, { phrase: Phrase; week: Week }>()
for (const week of WEEKS) for (const phrase of week.phrases) phraseIndex.set(phrase.id, { phrase, week })

export function getPhrase(id: string): Phrase {
  const hit = phraseIndex.get(id)
  if (!hit) throw new Error(`Frase não encontrada: ${id}`)
  return hit.phrase
}

export function weekOfPhrase(id: string): number {
  return phraseIndex.get(id)?.week.n ?? 0
}

/** Dicionário palavra → tradução, montado com as frases e glossários de todas as semanas. */
export const DICTIONARY: Record<string, string> = (() => {
  const dict: Record<string, string> = {
    i: 'eu', am: 'sou / estou', is: 'é / está', are: 'são / estão / é', you: 'você', he: 'ele', she: 'ela',
    we: 'nós', they: 'eles / elas', my: 'meu / minha', your: 'seu / sua', his: 'dele', her: 'dela',
    a: 'um / uma', an: 'um / uma', the: 'o / a / os / as', to: 'para', in: 'em', at: 'em / às', on: 'em / no',
    and: 'e', or: 'ou', it: 'isso / ele / ela', what: 'o que / qual', how: 'como', where: 'onde',
    do: 'fazer / (auxiliar)', can: 'pode / posso', have: 'ter', go: 'ir', yes: 'sim', no: 'não',
    "i'm": 'eu sou / estou', "it's": 'é / está', "don't": 'não', "doesn't": 'não', "you're": 'você é / está',
  }
  for (const week of WEEKS) {
    for (const p of week.phrases)
      for (const w of p.words) {
        const key = w.en.toLowerCase()
        if (!key.includes(' ') && !dict[key]) dict[key] = w.pt
      }
    for (const [k, v] of Object.entries(week.text.glossary)) if (!dict[k]) dict[k] = v
  }
  return dict
})()

/** Os 7 dias da semana pedagógica. */
export const DAY_PLAN = [
  { day: 1, label: 'Segunda', title: 'Frases 1–5', kind: 'new' as const },
  { day: 2, label: 'Terça', title: 'Frases 6–10 + revisão', kind: 'new' as const },
  { day: 3, label: 'Quarta', title: 'Frases 11–15 + revisão', kind: 'new' as const },
  { day: 4, label: 'Quinta', title: 'Frases 16–20 + revisão', kind: 'new' as const },
  { day: 5, label: 'Sexta', title: 'Revisão das 20 frases', kind: 'review' as const },
  { day: 6, label: 'Sábado', title: 'Texto semanal + áudio', kind: 'text' as const },
  { day: 7, label: 'Domingo', title: 'Teste semanal', kind: 'test' as const },
]
