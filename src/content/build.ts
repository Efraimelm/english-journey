// Formato compacto para escrever semanas (7 em diante). Gera exatamente o mesmo tipo `Week` das semanas 1–6.
//
// Frase (uma por linha):  inglês | português | bloco=tradução; bloco=tradução | certa / errada / errada | nota (opcional)
// Texto (uma por linha):  inglês | português
// Glossário:              palavra=tradução; palavra=tradução
// Pergunta (uma por linha): pergunta | opção | *opção certa | opção
import type { Level, Question, Week } from '../types'

const lines = (s: string) => s.split('\n').map((l) => l.trim()).filter(Boolean)
const cells = (l: string) => l.split('|').map((c) => c.trim())

export function week(
  n: number,
  theme: string,
  level: Level,
  goals: string[],
  phrases: string,
  text: { title: string; titlePt: string; sentences: string; glossary: string; questions: string },
): Week {
  return {
    n,
    theme,
    level,
    goals,
    phrases: lines(phrases).map((l, i) => {
      const [en, pt, words, blank, ...note] = cells(l)
      const [word, w1, w2] = blank.split('/').map((x) => x.trim())
      return {
        id: `w${n}p${String(i + 1).padStart(2, '0')}`,
        en,
        pt,
        words: words.split(';').map((g) => {
          const [a, ...b] = g.split('=')
          return { en: a.trim(), pt: b.join('=').trim() }
        }),
        note: note.join('|').trim() || undefined,
        blank: { word, wrong: [w1, w2] },
      }
    }),
    text: {
      title: text.title,
      titlePt: text.titlePt,
      sentences: lines(text.sentences).map((l) => {
        const [en, pt] = cells(l)
        return { en, pt }
      }),
      glossary: Object.fromEntries(
        text.glossary.split(';').map((g) => g.split('=').map((x) => x.trim())).filter((g) => g[0]).map(([k, v]) => [k.toLowerCase(), v]),
      ),
      questions: lines(text.questions).map((l): Question => {
        const [q, ...opts] = cells(l)
        return { q, options: opts.map((o) => o.replace(/^\*/, '')), answer: opts.findIndex((o) => o.startsWith('*')) }
      }),
    },
  }
}
