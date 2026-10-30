# Status do desenvolvimento

Atualizado em 30/10/2026.

## Fase 1 — MVP ✅ (código pronto)

- [x] Interface premium, modos Dark Forest / Warm Ivory, celular e computador
- [x] Tela inicial (saudação, sequência, meta de 20 min, próxima atividade, continuar de onde parou, revisões pendentes)
- [x] Cadastro e login (Supabase), com opção de usar sem conta
- [x] Semanas 1–4 completas: 80 frases + 4 textos (cada texto usa as 20 frases da semana)
- [x] Frase com tradução, áudio normal/lento, explicação palavra por palavra, missão de repetição, teste de pronúncia
- [x] Texto semanal: áudio completo e frase por frase, tradução, toque na palavra, destaque das frases da semana, 4 perguntas
- [x] 5 exercícios: escolha, complete, organize, escuta, escrita (com correção e segunda tentativa)
- [x] Salvamento após cada resposta; retoma exatamente do mesmo passo
- [ ] Publicado na internet e banco Supabase criado — em andamento

## Fase 2 — Aprendizagem inteligente (boa parte já feita)

- [x] Revisão espaçada 1-3-7-14-30-60 dias, adaptada a erros e acertos
- [x] Erros voltam no fim da mesma sessão
- [x] Teste semanal (20 questões, mínimo 80%, revisão direcionada e nova tentativa)
- [x] Estatísticas, XP, níveis, nível CEFR estimado
- [x] Frase "dominada" = reconhece + entende + escreve + passou da revisão de 7 dias

## Fase 3 — Experiência completa (parcial)

- [x] Trilha das 48 semanas (temas planejados, bloqueio sequencial)
- [x] Biblioteca: frases, favoritas, textos, vocabulário, busca
- [x] 12 conquistas
- [x] Funciona offline depois do primeiro acesso (PWA)
- [x] Sincronização entre aparelhos (precisa do Supabase configurado)
- [ ] Painel administrativo
- [ ] Conteúdo das semanas 5–48

## Fase 4 — Recursos avançados

- [ ] Conversação simulada, exercícios personalizados, análise de dificuldades
- [ ] Notificações de estudo

## Decisões técnicas

- O progresso do aluno fica em uma linha JSON por usuário (`english_journey`), com RLS. É mais simples e robusto para o MVP; as tabelas separadas da especificação (§10) entram junto com o painel administrativo.
- O conteúdo das semanas fica em `src/content/` (versionado no código) até existir o painel administrativo.
- O áudio usa a voz em inglês americano do próprio aparelho (Web Speech API), sem custo.
