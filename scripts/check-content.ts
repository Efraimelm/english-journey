// Confere o conteúdo das semanas antes de publicar: npm run check-content
// Substitui a conferência manual do README (blank na frase, texto usando as frases, perguntas válidas).
import { WEEKS } from '../src/content'

const errors: string[] = []
const warnings: string[] = []
const ids = new Set<string>()
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9' ]/g, ' ').replace(/\s+/g, ' ').trim()
const words = (s: string) => norm(s).split(' ')

WEEKS.forEach((week, wi) => {
  const W = `Semana ${week.n}`
  if (week.n !== wi + 1) errors.push(`${W}: está na posição ${wi + 1} de WEEKS`)
  if (week.phrases.length !== 20) errors.push(`${W}: tem ${week.phrases.length} frases (precisa de 20)`)
  const text = norm(week.text.sentences.map((s) => s.en).join(' '))

  week.phrases.forEach((p, i) => {
    const P = `${W}, frase ${i + 1} (${p.id})`
    const expected = `w${week.n}p${String(i + 1).padStart(2, '0')}`
    if (p.id !== expected) errors.push(`${P}: id deveria ser ${expected}`)
    if (ids.has(p.id)) errors.push(`${P}: id repetido`)
    ids.add(p.id)
    if (!words(p.en).includes(norm(p.blank.word))) errors.push(`${P}: a palavra do "complete" ("${p.blank.word}") não está na frase`)
    const opts = [p.blank.word, ...p.blank.wrong].map(norm)
    if (new Set(opts).size !== 3) errors.push(`${P}: alternativas do "complete" repetidas`)
    if (!p.words.length) errors.push(`${P}: sem "Entenda a frase"`)
    if (!text.includes(norm(p.en))) warnings.push(`${P}: "${p.en}" não aparece igual no texto da semana`)
  })

  week.text.sentences.forEach((s, i) => {
    if (!s.en.trim() || !s.pt.trim()) errors.push(`${W}, texto, frase ${i + 1}: falta inglês ou tradução`)
  })
  if (week.text.questions.length !== 4) errors.push(`${W}: texto tem ${week.text.questions.length} perguntas (precisa de 4)`)
  week.text.questions.forEach((q, i) => {
    if (q.answer < 0 || q.answer >= q.options.length) errors.push(`${W}, pergunta ${i + 1}: resposta fora das opções`)
  })
})

for (const w of warnings) console.log('aviso  ' + w)
for (const e of errors) console.log('ERRO   ' + e)
console.log(`\n${WEEKS.length} semanas, ${ids.size} frases · ${errors.length} erro(s), ${warnings.length} aviso(s)`)
process.exit(errors.length ? 1 : 0)
