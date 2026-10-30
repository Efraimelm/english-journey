# Especificação completa — English Journey (versão 1.0)

> Documento original do projeto, definido pelo autor. Serve de guia para todo o desenvolvimento.
> O que já foi implementado está marcado em [STATUS.md](STATUS.md).

O English Journey será um aplicativo de aprendizagem de inglês com uma jornada de 48 semanas, começando do absoluto zero (A1), com uma metodologia baseada em frases, textos contextualizados, áudio, repetição e exercícios.

A proposta não é simplesmente criar um aplicativo de flashcards. É construir uma experiência de aprendizagem completa, com a qualidade visual de um aplicativo Apple e a progressão motivadora do Duolingo.

## 1. Identidade do produto

**English Journey — Learn English. Every single day.**
Uma frase de cada vez. Uma semana de cada vez. Uma nova maneira de se comunicar.

| Característica         | Definição                          |
| ---------------------- | ---------------------------------- |
| Nome                   | English Journey                    |
| Plataforma             | Celular e computador               |
| Tipo                   | Aplicativo web responsivo (PWA)    |
| Idioma da interface    | Português brasileiro               |
| Idioma de aprendizagem | Inglês                             |
| Nível inicial          | A1 — iniciante absoluto            |
| Duração                | 48 semanas                         |
| Rotina                 | 20 minutos por dia                 |
| Metodologia            | 20 frases + 1 texto por semana     |
| Design                 | Premium, minimalista, estilo Apple |

## 2. Metodologia de aprendizagem

Meta anual: **960 frases** — 20 frases por semana, 1 texto por semana, 48 semanas, 20 minutos por dia.

Cinco frases novas por dia durante quatro dias. Os outros três dias são para consolidação, leitura e avaliação.

| Dia     | Conteúdo                    | Tempo  |
| ------- | --------------------------- | ------ |
| Segunda | Frases 1–5                  | 20 min |
| Terça   | Frases 6–10 + revisão       | 20 min |
| Quarta  | Frases 11–15 + revisão      | 20 min |
| Quinta  | Frases 16–20 + revisão      | 20 min |
| Sexta   | Revisão das 20 frases       | 20 min |
| Sábado  | Texto semanal + áudio       | 20 min |
| Domingo | Teste semanal + recuperação | 20 min |

O aplicativo também deverá oferecer uma opção de descanso, sem quebrar artificialmente o progresso de quem não puder estudar todos os dias.

### Estrutura de cada frase

1. Frase original em inglês.
2. Tradução em português.
3. Áudio com pronúncia natural.
4. Reprodução em velocidade reduzida.
5. Botão para ouvir novamente.
6. Recurso para repetir a pronúncia em voz alta.
7. Explicação de vocabulário e estrutura.
8. Exercício para testar a compreensão.

Exemplo — Frase 01 de 20 · A1 · Apresentações: **I am learning English.** — Estou aprendendo inglês.
Entenda a frase: I am = Eu estou · Learning = Aprendendo · English = Inglês.
Sua missão: escute a frase, repita em voz alta três vezes e depois tente escrevê-la sem olhar.

## 3. O texto semanal

O texto deverá utilizar as frases ensinadas durante aquela semana e, quando possível, recuperar estruturas de semanas anteriores. Cada texto deverá conter: título em inglês, texto original, tradução integral, áudio em inglês, reprodução frase por frase, destaque das palavras importantes, tradução individual ao selecionar uma palavra, exercícios de interpretação e identificação das 20 frases estudadas no texto.

Regra pedagógica: o texto deve ser compreensível para o nível do aluno, aumentando gradualmente sua complexidade.

## 4. Organização dos 12 meses

| Etapa            | Semanas | Conteúdo principal                                                     |
| ---------------- | ------- | ---------------------------------------------------------------------- |
| Fundamentos      | 1–8     | Apresentações, cumprimentos, números, família, rotina e verbos básicos |
| Vida cotidiana   | 9–16    | Alimentação, casa, horários, lugares, compras e preferências           |
| Comunicação      | 17–24   | Perguntas, respostas, passado, futuro e situações sociais              |
| Viagens          | 25–30   | Aeroporto, hotel, restaurantes, transporte e turismo                   |
| Trabalho         | 31–36   | Profissões, reuniões, comunicação e ambiente profissional              |
| Consolidação     | 37–42   | Conversas, opiniões, experiências e situações do cotidiano             |
| Fluência inicial | 43–48   | Diálogos maiores, compreensão de textos e comunicação espontânea       |

Níveis: A1 nas semanas iniciais, A2 como evolução principal, introdução a B1 quando o desempenho permitir. Não prometer fluência avançada em 48 semanas.

Cada semana terá: identificador, tema, nível CEFR, objetivos, 20 frases, 1 texto, áudios, vocabulário novo, exercícios, avaliação semanal e critério de conclusão. Inglês americano como padrão, com possibilidade de apresentar diferenças do britânico.

## 5. Telas

1. **Início** — saudação, sequência de dias, progresso anual, semana atual, próxima atividade, meta diária de 20 minutos, continuar de onde parou, revisões pendentes.
2. **Jornada** — as 48 semanas em trilha visual: concluídas, atual, bloqueadas, porcentagem, tema e nível, histórico de avaliações.
3. **Biblioteca** — frases estudadas, textos, vocabulário salvo, favoritas, histórico de áudios, busca.
4. **Revisão** — frases esquecidas, palavras com dificuldade, flashcards, testes de escuta, escrita, revisões programadas.
5. **Meu progresso** — frases aprendidas e dominadas, textos, tempo de estudo, aproveitamento nos testes, evolução por mês, frequência, nível estimado.

## 6. Sistema de exercícios

1. Escolha a tradução.
2. Complete a frase.
3. Organize a frase (blocos de palavras).
4. Compreensão auditiva (ouvir sem ver o texto, identificar a frase, repetir quantas vezes precisar).
5. Escrita (ver a tradução, escrever em inglês, correção mostrando erros de ortografia e palavras ausentes, nova tentativa).

## 7. Revisão inteligente

| Momento | Atividade           |
| ------- | ------------------- |
| Dia 0   | Aprendizado inicial |
| Dia 1   | Primeira revisão    |
| Dia 3   | Segunda revisão     |
| Dia 7   | Terceira revisão    |
| Dia 14  | Quarta revisão      |
| Dia 30  | Revisão de retenção |

Errou: volta mais cedo. Acertou com dificuldade: revisão próxima. Acertou facilmente: aumenta o intervalo. Errou várias vezes: explicação diferente e mais exercícios.
Uma frase só é dominada quando o aluno consegue reconhecê-la, compreender seu significado e recuperá-la sem consultar a tradução.

## 8. Gamificação

XP, streak, medalhas, níveis, meta diária de 20 minutos, desafios semanais e certificados internos. Conquistas: primeira frase, primeira semana, 100 frases, primeiro texto, 7 dias seguidos, 500 frases, jornada completa. A pontuação deve considerar atividades efetivamente realizadas, não cliques.

## 9. Design

Premium, minimalista, inspirado na Apple, sem copiar outros produtos. Modos "Dark Forest" (escuro) e "Warm Ivory" (claro).

| Elemento          | Cor       |
| ----------------- | --------- |
| Verde principal   | `#24483B` |
| Verde de destaque | `#65D6A1` |
| Fundo escuro      | `#14251F` |
| Fundo claro       | `#F5F4EF` |
| Texto principal   | `#202923` |
| Cinza secundário  | `#929A94` |

Cantos arredondados discretos, Inter ou SF Pro, ícones minimalistas, animações suaves, feedback ao acertar/errar, espaçamento generoso, layout para telas pequenas e grandes, sem elementos infantis.

## 10. Arquitetura técnica

PWA com React, TypeScript, Vite, Tailwind CSS, Supabase (PostgreSQL, autenticação, armazenamento), Web Speech API ou serviço TTS, Web Audio API. Reconhecimento de voz como recurso adicional, dependente do navegador.

Tabelas previstas: `users`, `weeks`, `phrases`, `texts`, `vocabulary`, `lessons`, `exercises`, `user_progress`, `phrase_progress`, `text_progress`, `review_schedule`, `achievements`, `study_sessions`.

Segurança: cada usuário acessa só seus dados (RLS), sem senhas em texto puro, salvar após cada atividade, sincronizar entre dispositivos, recuperação de conta, não perder progresso ao fechar o navegador, cache offline.

## 11. Requisitos funcionais

| ID   | Requisito                           | Prioridade |
| ---- | ----------------------------------- | ---------- |
| RF01 | Cadastro e acesso do usuário        | Alta       |
| RF02 | Tela inicial com progresso          | Alta       |
| RF03 | Cadastro das 48 semanas             | Alta       |
| RF04 | Disponibilizar 20 frases por semana | Alta       |
| RF05 | Disponibilizar um texto por semana  | Alta       |
| RF06 | Reproduzir áudio das frases         | Alta       |
| RF07 | Tradução das frases e textos        | Alta       |
| RF08 | Exercícios interativos              | Alta       |
| RF09 | Sistema de revisão espaçada         | Alta       |
| RF10 | Salvar progresso automaticamente    | Alta       |
| RF11 | Sincronizar entre dispositivos      | Alta       |
| RF12 | Testes semanais                     | Alta       |
| RF13 | Estatísticas de aprendizagem        | Média      |
| RF14 | Medalhas e conquistas               | Média      |
| RF15 | Favoritar frases                    | Média      |
| RF16 | Pesquisa na biblioteca              | Média      |
| RF17 | Modo offline                        | Média      |
| RF18 | Painel administrativo               | Alta       |
| RF19 | Modo claro e escuro                 | Média      |
| RF20 | Notificações de estudo              | Baixa      |

## 12. Conclusão de uma semana

1. As 20 frases estudadas.
2. Revisões realizadas.
3. Texto semanal lido ou escutado.
4. Exercícios de interpretação feitos.
5. Teste semanal com pelo menos 80%.

Abaixo de 80%: revisão direcionada e nova tentativa. Nunca apagar o progresso por causa de uma avaliação ruim.

## 13. Painel administrativo

Criar e editar semanas, cadastrar frases, alterar traduções, adicionar áudios, criar textos, adicionar exercícios, organizar por nível, ver quantidade de frases, publicar/despublicar, ver estatísticas de uso. Conteúdo revisado antes de publicar.

## 14. Plano de desenvolvimento

1. **Fase 1 — MVP:** interface premium, tela inicial, cadastro e login, primeiras 4 semanas, sistema de frases, traduções e áudios, texto semanal, exercícios, salvamento do progresso.
2. **Fase 2 — Aprendizagem inteligente:** revisão espaçada, histórico de erros, testes semanais, estatísticas, sistema de evolução.
3. **Fase 3 — Experiência completa:** trilha de 48 semanas, biblioteca, medalhas, modo offline, sincronização, painel administrativo.
4. **Fase 4 — Recursos avançados:** reconhecimento de pronúncia, conversação simulada, exercícios personalizados, análise de dificuldades, recomendações de revisão.

## 15. Critérios de aprovação

Criar conta e entrar; usar no celular e no computador; começar na semana 1 do A1; aprender cinco frases em uma sessão; ouvir as frases; consultar traduções; repetir a pronúncia; fazer exercícios diferentes; ler e ouvir o texto semanal; fazer a avaliação da semana; consultar revisões pendentes; fechar e abrir sem perder o progresso; continuar exatamente de onde parou; visualizar a evolução das 960 frases.

## 16. Regras gerais

Salvar automaticamente; sincronizar entre dispositivos; adaptar revisões a erros e acertos; exigir 80% na avaliação semanal; permitir refazer avaliações; respeitar a sequência pedagógica; não contabilizar cliques como aprendizagem; traduções naturais e revisadas. Não criar telas meramente ilustrativas: todos os botões devem funcionar. Começar com quatro semanas completas, validar a metodologia e depois completar as outras 44.
