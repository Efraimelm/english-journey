# English Journey: regras para o Claude

PWA de inglês em 48 semanas (React 19 + TypeScript + Vite + Tailwind 4, Supabase opcional). Interface e textos em português do Brasil, conteúdo em inglês americano.

## Fonte da verdade
- `docs/ESPECIFICACAO.md`: o que o app deve ser (definido pelo autor). Não contrarie sem perguntar.
- `docs/STATUS.md`: o que já foi feito. Atualize ao concluir algo.

## Comandos (Windows: Node em `C:\Program Files\nodejs`)
- `npm run check` (tipos), `npm run check-content` (conteúdo), `npm run build` (os dois + build).
- Dev: `npx vite` em http://localhost:5173. Publicar: `publicar.cmd` (EAS Hosting → english-journey.expo.app). Só publique quando o autor pedir.

## Conteúdo
- Cada semana é `src/content/weekN.ts` registrada em `WEEKS` (`src/content/index.ts`); o tema vem do `outline` do mesmo arquivo.
- 20 frases (`wNpXX`), cada frase aparece igual no texto da semana, 4 perguntas sobre o texto. Nível A1/A2 conforme o roteiro.
- Rode `npm run check-content` depois de qualquer mudança no conteúdo.

## Ecossistema da rotina do autor
- **Inglês Todo Dia** (`../../ingles-todo-dia`, GitHub Pages): texto/missão do dia. Mesmo Supabase, tabela `ingles_todo_dia`.
- **Central de Estudos**: artifact no Claude com a agenda (SAP de manhã, inglês à noite, sexta é descanso).
- Papéis: English Journey = frases + revisão; Inglês Todo Dia = escuta e fala. Mantenha os textos dos três coerentes com isso.
- Progresso: uma linha JSON por usuário (`english_journey`). A sincronização junta os aparelhos (`src/lib/merge.ts`), nunca sobrescreve.

## Estilo
- Mensagens de commit em português, curtas, no presente ("Adiciona…", "Corrige…").
- Sem telas ilustrativas: todo botão precisa funcionar (regra da especificação).
