// Correção do exercício de escrita: compara a resposta do aluno com a frase esperada,
// palavra por palavra, tolerando maiúsculas, pontuação, contrações e pequenos erros de digitação.

const CONTRACTIONS: Record<string, string> = {
  "i'm": 'i am', "you're": 'you are', "he's": 'he is', "she's": 'she is', "it's": 'it is',
  "we're": 'we are', "they're": 'they are', "don't": 'do not', "doesn't": 'does not',
  "isn't": 'is not', "aren't": 'are not', "can't": 'cannot', "what's": 'what is', "that's": 'that is',
}

function normalize(text: string): string[] {
  let t = text.toLowerCase().replace(/[’‘`]/g, "'")
  t = t.replace(/[.,!?;:"“”()]/g, ' ').replace(/\s+/g, ' ').trim()
  return t
    .split(' ')
    .filter(Boolean)
    .flatMap((w) => (CONTRACTIONS[w] ?? w).split(' '))
    .map((w) => w.normalize('NFD').replace(/[̀-ͯ]/g, '')) // "São" = "Sao"
}

function levenshtein(a: string, b: string): number {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)])
  for (let j = 1; j <= b.length; j++) dp[0][j] = j
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
  return dp[a.length][b.length]
}

export type TokenStatus = 'ok' | 'typo' | 'missing' | 'wrong' | 'extra'

export interface CompareResult {
  verdict: 'correct' | 'almost' | 'wrong'
  tokens: { word: string; status: TokenStatus; expected?: string }[]
}

/** Alinha as palavras (programação dinâmica) e classifica cada uma. */
export function compareAnswer(answer: string, expected: string): CompareResult {
  const a = normalize(answer)
  const e = normalize(expected)
  const n = a.length, m = e.length
  const close = (x: string, y: string) => x === y || (y.length > 3 && levenshtein(x, y) <= 1)
  const cost: number[][] = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0))
  for (let i = 0; i <= n; i++) cost[i][0] = i
  for (let j = 0; j <= m; j++) cost[0][j] = j
  for (let i = 1; i <= n; i++)
    for (let j = 1; j <= m; j++)
      cost[i][j] = Math.min(
        cost[i - 1][j] + 1,
        cost[i][j - 1] + 1,
        cost[i - 1][j - 1] + (a[i - 1] === e[j - 1] ? 0 : close(a[i - 1], e[j - 1]) ? 0.4 : 1.2),
      )
  const tokens: CompareResult['tokens'] = []
  let i = n, j = m
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0) {
      const sub = a[i - 1] === e[j - 1] ? 0 : close(a[i - 1], e[j - 1]) ? 0.4 : 1.2
      if (Math.abs(cost[i][j] - (cost[i - 1][j - 1] + sub)) < 1e-9) {
        tokens.unshift({
          word: a[i - 1],
          status: sub === 0 ? 'ok' : sub < 1 ? 'typo' : 'wrong',
          expected: sub === 0 ? undefined : e[j - 1],
        })
        i--; j--
        continue
      }
    }
    if (j > 0 && (i === 0 || Math.abs(cost[i][j] - (cost[i][j - 1] + 1)) < 1e-9)) {
      tokens.unshift({ word: e[j - 1], status: 'missing' })
      j--
    } else {
      tokens.unshift({ word: a[i - 1], status: 'extra' })
      i--
    }
  }
  const bad = tokens.filter((t) => t.status === 'wrong' || t.status === 'missing' || t.status === 'extra').length
  const typos = tokens.filter((t) => t.status === 'typo').length
  return { verdict: bad === 0 ? (typos === 0 ? 'correct' : 'almost') : 'wrong', tokens }
}

/** Similaridade 0..1 entre o que foi falado (reconhecimento de voz) e a frase. */
export function similarity(spoken: string, expected: string): number {
  const r = compareAnswer(spoken, expected)
  const ok = r.tokens.filter((t) => t.status === 'ok' || t.status === 'typo').length
  const total = Math.max(normalize(expected).length, 1)
  return Math.min(1, ok / total)
}

/** Palavras da frase para o exercício de ordenar (sem pontuação final). */
export function orderTokens(en: string): string[] {
  return en.replace(/[.!?]+$/, '').split(' ').filter(Boolean)
}
