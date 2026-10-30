# English Journey

Aplicativo web (PWA) para aprender inglês em 48 semanas: 20 frases + 1 texto por semana, 20 minutos por dia.
React + TypeScript + Vite + Tailwind CSS. Progresso salvo no aparelho e, opcionalmente, sincronizado via Supabase.

## Rodar no computador

```
cmd /c npm install
cmd /c npx.cmd vite          # abre em http://localhost:5173
cmd /c npm run build         # gera a versão final em dist/
```

## Onde fica cada coisa

| Pasta / arquivo | O que é |
| --- | --- |
| `src/content/week1.ts` … `week4.ts` | Conteúdo das semanas (frases, explicações, texto, perguntas) |
| `src/content/index.ts` | Lista de semanas publicadas e plano das 48 semanas |
| `src/lib/progress.ts` | Regras: revisão espaçada, conclusão de semana (teste ≥ 80%), XP, sequência, conquistas |
| `src/lib/store.ts` | Salvamento do progresso no aparelho |
| `src/lib/sync.ts` | Conta e sincronização na nuvem (Supabase) |
| `src/study/` | Tela de estudo e exercícios |
| `src/screens/` | Início, Jornada, Biblioteca, Revisão, Progresso, Conta |
| `supabase/schema.sql` | Tabela do progresso na nuvem, com RLS |

## Publicar uma nova semana

1. Copie `src/content/week4.ts` para `week5.ts` e troque o conteúdo (20 frases, texto, 4 perguntas).
2. Em `src/content/index.ts`, importe e adicione em `WEEKS`.
3. Confira que cada `blank.word` aparece na frase e que o texto usa as frases da semana.

## Ativar conta e sincronização

1. Crie um projeto Supabase **novo e exclusivo** para este app.
2. Rode `supabase/schema.sql` no SQL Editor.
3. Crie `.env` com:
   ```
   VITE_SUPABASE_URL=https://<ref>.supabase.co
   VITE_SUPABASE_ANON_KEY=<chave anon>
   ```
Sem `.env`, o app funciona em modo local (progresso só no navegador).
