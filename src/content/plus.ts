// Plus: as palavras-base da conversa (perguntas, começos de frase, verbos, conectores e tempo),
// cada uma com as estruturas mais usadas no inglês americano do dia a dia e frases de exemplo.

export interface PlusExample {
  en: string
  pt: string
}

export interface PlusPattern {
  form: string // estrutura, ex.: "What + do/does + sujeito + verbo?"
  pt: string // quando usar
  ex: PlusExample[]
}

export interface PlusWord {
  id: string
  en: string
  pt: string
  tip?: string
  patterns: PlusPattern[]
}

export interface PlusGroup {
  id: string
  title: string
  subtitle: string
  icon: 'search' | 'user' | 'pen' | 'path' | 'clock'
  words: PlusWord[]
}

const p = (form: string, pt: string, lines: string): PlusPattern => ({
  form,
  pt,
  ex: lines.trim().split('\n').map((l) => {
    const [en, pt] = l.split('|')
    return { en: en.trim(), pt: pt.trim() }
  }),
})

const w = (id: string, en: string, pt: string, patterns: PlusPattern[], tip?: string): PlusWord => ({ id, en, pt, patterns, tip })

// ---------------- 1. Perguntas ----------------

const QUESTIONS: PlusWord[] = [
  w('what', 'What', 'O que / Qual', [
    p("What's + ...?", 'O que é / Qual é — a forma mais curta e falada', `
What's your name? | Qual é o seu nome?
What's going on? | O que está acontecendo?
What's wrong? | O que houve?
What's the plan for tonight? | Qual é o plano para hoje à noite?`),
    p('What + do/does + sujeito + verbo?', 'Perguntas no presente (hábitos, gostos, opiniões)', `
What do you do? | O que você faz? (profissão)
What do you want to eat? | O que você quer comer?
What does she need? | Do que ela precisa?
What do you think? | O que você acha?`),
    p('What + are/is + sujeito + verbo-ing?', 'O que está acontecendo agora', `
What are you doing? | O que você está fazendo?
What are you looking for? | O que você está procurando?
What are you thinking about? | Em que você está pensando?`),
    p('What + did + sujeito + verbo?', 'Perguntas no passado', `
What did you say? | O que você disse?
What did you do yesterday? | O que você fez ontem?
What did he tell you? | O que ele te contou?`),
    p('What + are you going to + verbo?', 'Planos e futuro', `
What are you going to do tomorrow? | O que você vai fazer amanhã?
What are we going to eat? | O que a gente vai comer?`),
    p('What + verbo? (sem do/did)', 'Quando "what" é o sujeito: o que aconteceu, o que faz algo', `
What happened? | O que aconteceu?
What makes you happy? | O que te deixa feliz?`),
    p('What + substantivo + ...?', 'Qual / Que + coisa', `
What color do you like? | De que cor você gosta?
What movie did you watch? | Que filme você assistiu?`),
    p('What about...? / What if...?', 'E quanto a... / Que tal... / E se...', `
What about you? | E você?
What about tomorrow? | Que tal amanhã?
What if it rains? | E se chover?
What if we go together? | E se a gente for junto?`),
    p('What do you mean? / What does it mean?', 'Pedir explicação', `
What do you mean? | Como assim? / O que você quer dizer?
What does this word mean? | O que essa palavra significa?
What's it like to live there? | Como é morar lá?`),
  ]),
  w('when', 'When', 'Quando', [
    p('When + is/was + ...?', 'Datas e momentos', `
When is your birthday? | Quando é o seu aniversário?
When was the last time you saw her? | Quando foi a última vez que você a viu?`),
    p('When + do/does + sujeito + verbo?', 'Rotina no presente', `
When do you usually study? | Quando você costuma estudar?
When does the store open? | Quando a loja abre?`),
    p('When + did + sujeito + verbo?', 'Passado', `
When did you start learning English? | Quando você começou a aprender inglês?
When did they arrive? | Quando eles chegaram?`),
    p('When + are you going to / will + ...?', 'Futuro', `
When are you going to call him? | Quando você vai ligar para ele?
When will you be ready? | Quando você vai estar pronto?`),
    p('When + can + sujeito + verbo?', 'Combinar horários', `
When can we meet? | Quando a gente pode se encontrar?
When can I start? | Quando eu posso começar?`),
  ]),
  w('where', 'Where', 'Onde', [
    p("Where's / Where are + ...?", 'Localizar coisas e pessoas', `
Where's the bathroom? | Onde fica o banheiro?
Where are my keys? | Onde estão minhas chaves?`),
    p('Where + are/is + sujeito + from?', 'Origem', `
Where are you from? | De onde você é?
Where is she from? | De onde ela é?`),
    p('Where + do/does + sujeito + verbo?', 'Presente', `
Where do you live? | Onde você mora?
Where do you work? | Onde você trabalha?`),
    p('Where + did + sujeito + verbo?', 'Passado', `
Where did you go? | Aonde você foi?
Where did you learn that? | Onde você aprendeu isso?`),
    p('Where + are you going / should / can...?', 'Planos e pedidos de ajuda', `
Where are you going? | Aonde você está indo?
Where should we go for dinner? | Aonde a gente deveria ir jantar?
Where can I buy a ticket? | Onde eu posso comprar um ingresso?`),
  ]),
  w('who', 'Who', 'Quem', [
    p("Who's / Who is + ...?", 'Identificar pessoas', `
Who is that? | Quem é aquele?
Who's your favorite singer? | Quem é seu cantor favorito?`),
    p('Who + verbo? (sem do/did)', 'Quando "who" é quem faz a ação', `
Who called? | Quem ligou?
Who wants coffee? | Quem quer café?
Who knows the answer? | Quem sabe a resposta?`),
    p('Who + do/did/are + sujeito + verbo + preposição?', 'Com quem / Por quem / Para quem (a preposição vai no fim)', `
Who do you live with? | Com quem você mora?
Who did you talk to? | Com quem você falou?
Who are you waiting for? | Por quem você está esperando?`),
    p("Who's going to / Who can + verbo?", 'Futuro e pedidos', `
Who's going to drive? | Quem vai dirigir?
Who can help me? | Quem pode me ajudar?`),
  ]),
  w('why', 'Why', 'Por quê', [
    p('Why + are/is + sujeito + ...?', 'Estado ou ação de agora', `
Why are you sad? | Por que você está triste?
Why are you laughing? | Por que você está rindo?
Why is it so expensive? | Por que é tão caro?`),
    p('Why + do/did + sujeito + verbo?', 'Motivo de hábitos e fatos', `
Why do you want to learn English? | Por que você quer aprender inglês?
Why did you leave? | Por que você foi embora?`),
    p("Why don't you/we + verbo?", 'Sugestão (muito usado!)', `
Why don't you try again? | Por que você não tenta de novo?
Why don't we go to the beach? | Por que a gente não vai à praia?`),
    p('Why not?', 'Por que não? / Claro!', `
Why not? | Por que não?`),
  ], 'A resposta quase sempre começa com "Because...".'),
  w('which', 'Which', 'Qual / Quais', [
    p('Which + substantivo / one + ...?', 'Escolher entre opções', `
Which one do you want? | Qual você quer?
Which color is better? | Qual cor é melhor?
Which way should I go? | Para que lado eu devo ir?`),
    p('Which is + ...?', 'Comparar', `
Which is your car? | Qual é o seu carro?
Which is faster, the bus or the train? | O que é mais rápido, o ônibus ou o trem?`),
    p('Which of + these/those...?', 'Qual destes', `
Which of these shoes do you like? | De qual desses sapatos você gosta?`),
  ], 'Use "which" quando há opções definidas na frente; "what" quando a escolha é aberta.'),
  w('whose', 'Whose', 'De quem', [
    p('Whose + coisa + is this/that?', 'Dono de algo', `
Whose phone is this? | De quem é esse celular?
Whose idea was that? | De quem foi essa ideia?
Whose turn is it? | De quem é a vez?`),
    p('Whose + coisa + verbo...?', 'Outras perguntas', `
Whose house are we going to? | Para a casa de quem a gente vai?
Whose car did you take? | O carro de quem você pegou?`),
  ], 'Não confunda com "who\'s" (who is), que tem o mesmo som.'),
  w('whom', 'Whom', 'Quem / A quem', [
    p('Preposição + whom', 'Formal, mais em textos e e-mails', `
To whom it may concern. | A quem possa interessar.
With whom did you speak? | Com quem o senhor falou? (formal)
Whom should I contact? | Com quem devo entrar em contato? (formal)`),
    p('Na fala: who + ... + preposição', 'O que o americano diz de verdade', `
Who did you speak with? | Com quem você falou?
Who should I talk to? | Com quem eu devo falar?`),
  ], 'Na conversa do dia a dia os americanos quase sempre trocam "whom" por "who".'),
  w('how', 'How', 'Como', [
    p("How are / How's / How was + ...?", 'Perguntar como algo está ou foi', `
How are you? | Como você está?
How's it going? | Como vão as coisas?
How was your day? | Como foi o seu dia?
How was the movie? | Como foi o filme?`),
    p('How + do/does + sujeito + verbo?', 'Como se faz algo', `
How do you say this in English? | Como se diz isso em inglês?
How do you spell that? | Como se soletra isso?
How do I get to the station? | Como eu chego na estação?`),
    p('How + did + sujeito + verbo?', 'Passado', `
How did you know? | Como você sabia?
How did it go? | Como foi? (o resultado)`),
    p('How + can + sujeito + verbo?', 'Pedir ajuda ou caminho', `
How can I help you? | Como posso te ajudar?
How can I improve my English? | Como eu posso melhorar meu inglês?`),
    p('How + adjetivo + ...?', 'Medidas e características', `
How tall are you? | Qual é a sua altura?
How big is your house? | Qual o tamanho da sua casa?`),
    p('How about + coisa / verbo-ing?', 'Que tal...? (sugestão)', `
How about pizza? | Que tal pizza?
How about going for a walk? | Que tal dar uma caminhada?`),
  ]),
  w('how-much', 'How much', 'Quanto', [
    p('How much + is/are/does it cost?', 'Preço', `
How much is it? | Quanto custa?
How much does this cost? | Quanto isso custa?
How much are these? | Quanto custam estes?`),
    p('How much + incontável + ...?', 'Quantidade de algo que não se conta (água, tempo, dinheiro)', `
How much water do you drink? | Quanta água você bebe?
How much time do we have? | Quanto tempo a gente tem?
How much money do you need? | De quanto dinheiro você precisa?`),
  ], '"Much" é para o que não se conta (water, time, money). Para o que se conta, use "many".'),
  w('how-many', 'How many', 'Quantos', [
    p('How many + plural + do/did...?', 'Quantidade de coisas contáveis', `
How many brothers do you have? | Quantos irmãos você tem?
How many languages do you speak? | Quantas línguas você fala?
How many times did you watch it? | Quantas vezes você assistiu?`),
    p('How many + plural + are there / are coming?', 'Quantos existem / vêm', `
How many people are coming? | Quantas pessoas vêm?
How many students are there? | Quantos alunos tem?`),
  ]),
  w('how-long', 'How long', 'Quanto tempo', [
    p('How long does it take + ...?', 'Duração de uma ação', `
How long does it take to get there? | Quanto tempo leva para chegar lá?
How long will it take? | Quanto tempo vai levar?`),
    p('How long have you + been/verbo...?', 'Há quanto tempo (até agora)', `
How long have you been here? | Há quanto tempo você está aqui?
How long have you lived in Brazil? | Há quanto tempo você mora no Brasil?
How long have you been studying English? | Há quanto tempo você estuda inglês?`),
    p('How long + is / are you staying?', 'Duração de algo', `
How long is the movie? | Quanto tempo dura o filme?
How long are you staying? | Quanto tempo você vai ficar?`),
  ]),
  w('how-often', 'How often', 'Com que frequência', [
    p('How often + do/does + sujeito + verbo?', 'Frequência de hábitos', `
How often do you go to the gym? | Com que frequência você vai à academia?
How often do you study? | Com que frequência você estuda?
How often does the bus come? | De quanto em quanto tempo passa o ônibus?`),
    p('Respostas comuns', 'Como responder', `
Every day. | Todos os dias.
Twice a week. | Duas vezes por semana.
Once in a while. | De vez em quando.`),
  ]),
  w('how-far', 'How far', 'Quão longe', [
    p('How far + is + lugar?', 'Distância', `
How far is the airport? | Qual a distância até o aeroporto?
How far is it from here? | É longe daqui?
How far did you run? | Quanto você correu? (distância)`),
    p('Respostas comuns', 'Como responder', `
It's about ten minutes away. | Fica a uns dez minutos.
It's not far. | Não é longe.`),
  ]),
  w('how-old', 'How old', 'Quantos anos', [
    p('How old + are/is/were + pessoa?', 'Idade', `
How old are you? | Quantos anos você tem?
How old is your son? | Quantos anos tem seu filho?
How old were you when you started? | Quantos anos você tinha quando começou?`),
    p("I'm + número", 'Como responder', `
I'm twenty-five. | Eu tenho vinte e cinco anos.
She's ten years old. | Ela tem dez anos.`),
  ], 'Idade em inglês usa "be" (ser/estar), nunca "have": I am 25, não "I have 25".'),
  w('what-time', 'What time', 'Que horas', [
    p('What time is it?', 'Perguntar as horas', `
What time is it? | Que horas são?
It's three thirty. | São três e meia.`),
    p('What time + do/does/did + sujeito + verbo?', 'Horário de algo', `
What time do you wake up? | Que horas você acorda?
What time does the movie start? | Que horas começa o filme?
What time did you get home? | Que horas você chegou em casa?`),
    p('What time + should / are you...?', 'Combinar', `
What time should we meet? | Que horas a gente se encontra?
What time are you leaving? | Que horas você vai sair?`),
  ]),
  w('what-kind', 'What kind', 'Que tipo', [
    p('What kind of + substantivo + ...?', 'Tipo, estilo, categoria', `
What kind of music do you like? | Que tipo de música você gosta?
What kind of food do you eat? | Que tipo de comida você come?
What kind of job are you looking for? | Que tipo de trabalho você está procurando?
What kind of person is he? | Que tipo de pessoa ele é?`),
    p('What sort of + ...?', 'Sinônimo bem comum', `
What sort of things do you do on weekends? | Que tipo de coisas você faz nos fins de semana?`),
  ]),
  w('how-come', 'How come', 'Como assim / Por que', [
    p('How come + frase normal?', 'Por que (informal, mostra surpresa)', `
How come you didn't call me? | Como assim você não me ligou?
How come she's here? | Por que ela está aqui?
How come you know that? | Como é que você sabe disso?
How come it's so cheap? | Como é que está tão barato?`),
  ], 'Diferente de "why", depois de "how come" a frase NÃO inverte: "How come you are..." e não "How come are you...".'),
]

// ---------------- 2. Começos de frase ----------------

const STARTERS: PlusWord[] = [
  w('i', 'I', 'Eu', [
    p("I'm + ...", 'Eu sou / estou', `
I'm tired. | Estou cansado.
I'm from Brazil. | Eu sou do Brasil.
I'm learning English. | Estou aprendendo inglês.`),
    p("I + verbo / I don't + verbo", 'Afirmar e negar', `
I want to travel. | Eu quero viajar.
I need help. | Eu preciso de ajuda.
I don't understand. | Eu não entendo.`),
    p("I'll / I've / I'd like", 'Futuro, experiência e pedido educado', `
I'll call you later. | Eu te ligo mais tarde.
I've never been there. | Eu nunca fui lá.
I'd like a coffee, please. | Eu gostaria de um café, por favor.`),
  ], 'Em inglês o "I" é sempre maiúsculo, mesmo no meio da frase.'),
  w('you', 'You', 'Você', [
    p("You're + ...", 'Você é / está', `
You're right. | Você está certo.
You're welcome. | De nada.`),
    p('You + verbo / Do you + verbo?', 'Afirmar e perguntar', `
You look happy. | Você parece feliz.
Do you speak English? | Você fala inglês?
Do you have a minute? | Você tem um minuto?`),
    p("You should / You can / You don't have to", 'Conselho, permissão e obrigação', `
You should rest. | Você deveria descansar.
You can do it. | Você consegue.
You don't have to come. | Você não precisa vir.`),
  ]),
  w('he', 'He', 'Ele', [
    p("He's + ...", 'Ele é / está', `
He's my brother. | Ele é meu irmão.
He's working now. | Ele está trabalhando agora.`),
    p("He + verbo-s / He doesn't + verbo", 'Presente (o verbo ganha -s)', `
He works from home. | Ele trabalha de casa.
He likes soccer. | Ele gosta de futebol.
He doesn't know. | Ele não sabe.`),
    p('Does he...? / He was...', 'Pergunta e passado', `
Does he live here? | Ele mora aqui?
He was late again. | Ele se atrasou de novo.`),
  ], 'No presente, he/she/it pedem -s no verbo: he works, she likes, it costs.'),
  w('she', 'She', 'Ela', [
    p("She's + ...", 'Ela é / está', `
She's a doctor. | Ela é médica.
She's on her way. | Ela está a caminho.`),
    p("She + verbo-s / She doesn't + verbo", 'Presente', `
She speaks three languages. | Ela fala três línguas.
She loves to dance. | Ela adora dançar.
She doesn't eat meat. | Ela não come carne.`),
    p("She said... / She's going to...", 'Passado e futuro', `
She said yes. | Ela disse sim.
She's going to call you. | Ela vai te ligar.`),
  ]),
  w('we', 'We', 'Nós', [
    p("We're + ...", 'Nós somos / estamos', `
We're late. | Estamos atrasados.
We're going to the mall. | A gente está indo ao shopping.`),
    p("We + verbo / Let's + verbo", 'Afirmar e convidar', `
We need to talk. | Precisamos conversar.
We have a meeting at ten. | Temos uma reunião às dez.
Let's go! | Vamos!`),
    p('We should / We can / We could', 'Sugerir', `
We should go now. | A gente deveria ir agora.
We can do it together. | Podemos fazer juntos.
We could watch a movie. | A gente podia assistir um filme.`),
  ]),
  w('they', 'They', 'Eles / Elas', [
    p("They're + ...", 'Eles são / estão', `
They're my friends. | Eles são meus amigos.
They're coming tonight. | Eles vêm hoje à noite.`),
    p("They + verbo / They don't / Do they...?", 'Presente', `
They live in New York. | Eles moram em Nova York.
They don't know yet. | Eles ainda não sabem.
Do they speak Portuguese? | Eles falam português?`),
    p('They say... / They were...', 'Genérico ("dizem") e passado', `
They say it's going to rain. | Dizem que vai chover.
They were here yesterday. | Eles estavam aqui ontem.`),
  ]),
  w('it', 'It', 'Isso / Ele / Ela (coisas)', [
    p("It's + adjetivo / hora / tempo", 'Descrever, clima e horas', `
It's cold today. | Está frio hoje.
It's late. | Está tarde.
It's ten o'clock. | São dez horas.
It's easy. | É fácil.`),
    p("It + verbo / It doesn't + verbo", 'Expressões curtíssimas', `
It works! | Funciona!
It depends. | Depende.
It doesn't matter. | Não importa.`),
    p("It was... / It's going to be...", 'Passado e futuro', `
It was amazing. | Foi incrível.
It's going to be fine. | Vai dar tudo certo.`),
  ], 'Em inglês toda frase precisa de sujeito: "Está frio" vira "It\'s cold", nunca só "Is cold".'),
  w('my', 'My', 'Meu / Minha', [
    p('My + coisa + ...', 'Algo que é seu', `
My name is Ana. | Meu nome é Ana.
My phone is dead. | Meu celular descarregou.
My mom works at a hospital. | Minha mãe trabalha em um hospital.`),
    p('My favorite... / My goal...', 'Falar de você', `
My favorite food is pizza. | Minha comida favorita é pizza.
My goal is to speak English fluently. | Meu objetivo é falar inglês com fluência.`),
    p("It's my... / My bad", 'Expressões', `
It's my turn. | É a minha vez.
My bad. | Foi mal.`),
  ]),
  w('your', 'Your', 'Seu / Sua', [
    p('Your + coisa + ...', 'Algo da pessoa com quem você fala', `
Your English is very good. | Seu inglês é muito bom.
Your bag is here. | Sua bolsa está aqui.`),
    p("What's your...? / Is this your...?", 'Perguntas', `
What's your phone number? | Qual é o seu número de telefone?
Is this your car? | Este é o seu carro?`),
    p('... your + coisa', 'No fim da frase', `
Thanks for your help. | Obrigado pela sua ajuda.
It's your turn. | É a sua vez.`),
  ], '"Your" (seu) e "you\'re" (você é) têm o mesmo som — cuidado ao escrever.'),
  w('his', 'His', 'Dele', [
    p('His + coisa + ...', 'Algo de um homem', `
His name is John. | O nome dele é John.
His car is new. | O carro dele é novo.
I like his style. | Eu gosto do estilo dele.`),
    p('Is this his...? / It\'s his.', 'Pergunta e resposta curta', `
Is this his jacket? | Essa jaqueta é dele?
That's his. | Aquilo é dele.`),
  ], 'A ordem é invertida em relação ao português: "his car" = "o carro dele".'),
  w('her', 'Her', 'Dela', [
    p('Her + coisa + ...', 'Algo de uma mulher', `
Her sister lives in Canada. | A irmã dela mora no Canadá.
Her eyes are green. | Os olhos dela são verdes.`),
    p('verbo + her', 'Também significa "a ela / para ela"', `
I love her. | Eu a amo.
Call her. | Liga pra ela.
I gave her a gift. | Eu dei um presente para ela.`),
  ]),
  w('our', 'Our', 'Nosso / Nossa', [
    p('Our + coisa + ...', 'Algo de nós', `
Our house is near the beach. | Nossa casa fica perto da praia.
Our team won! | Nosso time ganhou!
Our flight leaves at six. | Nosso voo sai às seis.
This is our first trip together. | Esta é nossa primeira viagem juntos.`),
  ]),
  w('their', 'Their', 'Deles / Delas', [
    p('Their + coisa + ...', 'Algo deles', `
Their kids are so cute. | Os filhos deles são tão fofos.
Their house is huge. | A casa deles é enorme.
I don't know their names. | Eu não sei os nomes deles.`),
  ], '"Their" (deles), "there" (lá) e "they\'re" (eles são) soam iguais.'),
  w('this', 'This', 'Este / Esta / Isso', [
    p('This is + ...', 'Apresentar ou comentar algo perto', `
This is my friend, Paul. | Este é meu amigo, Paul.
This is amazing! | Isso é incrível!
This is for you. | Isto é para você.`),
    p('This + coisa + ...', 'Este / esta + coisa', `
This place is great. | Este lugar é ótimo.
This week is busy. | Esta semana está corrida.
I love this song. | Eu adoro esta música.`),
    p('Is this...?', 'Perguntar', `
Is this seat taken? | Este lugar está ocupado?
Is this yours? | Isto é seu?`),
  ]),
  w('that', 'That', 'Aquele / Aquilo / Isso', [
    p("That's + ...", 'Reagir ao que alguém disse (muito usado)', `
That's right. | Isso mesmo.
That's a good idea. | É uma boa ideia.
That's not true. | Isso não é verdade.`),
    p('That + coisa + ...', 'Aquele / aquela + coisa', `
That guy is my neighbor. | Aquele cara é meu vizinho.
Who's that girl? | Quem é aquela garota?`),
    p('... that + frase', 'Também significa "que" para ligar frases', `
I know that you're busy. | Eu sei que você está ocupado.
The book that I bought is great. | O livro que eu comprei é ótimo.`),
  ]),
  w('these', 'These', 'Estes / Estas', [
    p('These are + ...', 'Plural de "this is"', `
These are my kids. | Estes são meus filhos.
These are delicious. | Estes estão deliciosos.`),
    p('These + plural + ...', 'Estes / estas + coisas', `
These shoes are new. | Estes sapatos são novos.
I need these documents today. | Eu preciso destes documentos hoje.
These days, I work from home. | Hoje em dia, eu trabalho de casa.`),
  ]),
  w('those', 'Those', 'Aqueles / Aquelas', [
    p('Those are/were + ...', 'Plural de "that is"', `
Those are my friends. | Aqueles são meus amigos.
Those were the days. | Bons tempos aqueles.`),
    p('Those + plural + ...', 'Aqueles / aquelas + coisas', `
Those cookies look good. | Aqueles biscoitos parecem bons.
Can you see those mountains? | Você consegue ver aquelas montanhas?
Those who study every day learn faster. | Quem estuda todo dia aprende mais rápido.`),
  ]),
]

// ---------------- 3. Verbos ----------------

const VERBS: PlusWord[] = [
  w('want', 'Want', 'Querer', [
    p('want + to + verbo', 'Querer fazer algo', `
I want to learn English. | Eu quero aprender inglês.
I want to go home. | Eu quero ir para casa.
I wanna go. | Eu quero ir. (bem informal)`),
    p('Do you want...?', 'Oferecer e convidar', `
Do you want some water? | Você quer água?
Do you want to come with me? | Você quer vir comigo?`),
    p('want + pessoa + to + verbo / wanted', 'Querer que alguém faça / passado', `
I want you to be happy. | Eu quero que você seja feliz.
She wanted to stay. | Ela queria ficar.`),
  ], 'Passado: wanted.'),
  w('need', 'Need', 'Precisar', [
    p('need + coisa', 'Precisar de algo', `
I need a break. | Eu preciso de uma pausa.
We need more time. | Precisamos de mais tempo.`),
    p('need + to + verbo', 'Precisar fazer algo', `
I need to go. | Eu preciso ir.
You need to relax. | Você precisa relaxar.`),
    p("Do you need...? / don't need to", 'Perguntar e negar', `
Do you need help? | Você precisa de ajuda?
You don't need to worry. | Você não precisa se preocupar.`),
  ], 'Passado: needed. Em inglês não existe o "de": "I need help", não "I need of help".'),
  w('have', 'Have', 'Ter', [
    p('have / has + coisa', 'Ter, possuir', `
I have two sisters. | Eu tenho duas irmãs.
Do you have a pen? | Você tem uma caneta?
She has a dog. | Ela tem um cachorro.`),
    p('have to + verbo', 'Ter que (obrigação)', `
I have to work tomorrow. | Eu tenho que trabalhar amanhã.
You don't have to pay. | Você não precisa pagar.`),
    p('have + refeição / experiência', 'Comer, beber, passar por algo', `
Let's have lunch. | Vamos almoçar.
Have a nice day! | Tenha um bom dia!
I had a great time. | Eu me diverti muito.`),
  ], 'Passado: had. Com he/she/it vira "has".'),
  w('like', 'Like', 'Gostar', [
    p('like + coisa / verbo-ing', 'Gostar de algo', `
I like coffee. | Eu gosto de café.
I like watching movies. | Eu gosto de assistir filmes.
She doesn't like to wait. | Ela não gosta de esperar.`),
    p('Do you like...?', 'Perguntar', `
Do you like it? | Você gostou?
Do you like to cook? | Você gosta de cozinhar?`),
    p("I'd like / Would you like...?", 'Gostaria (pedido educado)', `
I'd like to order, please. | Eu gostaria de pedir, por favor.
Would you like some tea? | Você gostaria de um chá?`),
  ], 'Passado: liked. Sem "de": "I like pizza", não "I like of pizza".'),
  w('love', 'Love', 'Amar / Adorar', [
    p('love + coisa / verbo-ing', 'Adorar algo', `
I love this city. | Eu amo esta cidade.
I love cooking for my family. | Eu adoro cozinhar para minha família.
She loved the gift. | Ela adorou o presente.`),
    p("I'd love to + verbo", 'Eu adoraria (aceitar convite)', `
I'd love to go! | Eu adoraria ir!
I'd love to see you again. | Eu adoraria te ver de novo.`),
    p('love + pessoa', 'Amar alguém', `
I love you. | Eu te amo.
I love you too. | Eu também te amo.`),
  ], 'Passado: loved. Americanos usam "love" para coisas do dia a dia, como "adorar".'),
  w('know', 'Know', 'Saber / Conhecer', [
    p("I know / I don't know", 'Saber e conhecer', `
I know. | Eu sei.
I don't know. | Eu não sei.
I know him. | Eu conheço ele.`),
    p('Do you know + ...?', 'Perguntar', `
Do you know where she lives? | Você sabe onde ela mora?
Do you know how to swim? | Você sabe nadar?`),
    p('Let me know / I knew it / You know what?', 'Expressões do dia a dia', `
Let me know. | Me avisa.
I knew it! | Eu sabia!
You know what? I'll go. | Quer saber? Eu vou.`),
  ], 'Passado: knew. O "k" é mudo: fala-se "nou".'),
  w('think', 'Think', 'Pensar / Achar', [
    p('I think + frase', 'Dar opinião (= eu acho que)', `
I think it's a good idea. | Acho que é uma boa ideia.
I think so. | Acho que sim.
I don't think so. | Acho que não.`),
    p('think about / of', 'Pensar em', `
I'm thinking about you. | Estou pensando em você.
What do you think about it? | O que você acha disso?`),
    p('I thought... / Let me think', 'Passado e pausa', `
I thought you were busy. | Achei que você estava ocupado.
Let me think. | Deixa eu pensar.`),
  ], 'Passado: thought.'),
  w('go', 'Go', 'Ir', [
    p('go to + lugar', 'Ir a algum lugar', `
I go to work by bus. | Eu vou para o trabalho de ônibus.
Let's go to the beach. | Vamos para a praia.`),
    p('go + verbo-ing', 'Atividades (ir fazer algo)', `
Let's go shopping. | Vamos fazer compras.
We went swimming. | A gente foi nadar.`),
    p('going to + verbo / going', 'Futuro e andamento', `
I'm going to study tonight. | Eu vou estudar hoje à noite.
It's going well. | Está indo bem.`),
  ], 'Passado: went. "Go home" e "go there" não levam "to".'),
  w('come', 'Come', 'Vir', [
    p('come + lugar / pessoa', 'Vir', `
Come here. | Vem aqui.
Come with me. | Vem comigo.
Can you come to my party? | Você pode vir na minha festa?`),
    p('come in / come on / come back', 'Expressões', `
Come in! | Pode entrar!
Come on! | Vamos! / Qual é!
I'll come back later. | Eu volto mais tarde.`),
    p('came', 'Passado', `
She came home late. | Ela chegou em casa tarde.`),
  ], 'Passado: came.'),
  w('get', 'Get', 'Conseguir / Pegar', [
    p('get = conseguir / receber', 'O sentido mais comum', `
I got the job! | Eu consegui o emprego!
Did you get my message? | Você recebeu minha mensagem?
I get it. | Entendi.`),
    p('get = pegar / comprar', 'No dia a dia', `
Can I get a coffee? | Pode me ver um café?
I'll get some bread. | Eu vou comprar pão.`),
    p('get + adjetivo = ficar', 'Mudança de estado', `
I'm getting tired. | Estou ficando cansado.
It's getting late. | Está ficando tarde.`),
    p('get + lugar = chegar / get up', 'Chegar e levantar', `
I get home at six. | Eu chego em casa às seis.
Get up! | Levanta!`),
  ], 'Passado: got. "Get" é talvez o verbo mais versátil do inglês falado.'),
  w('make', 'Make', 'Fazer (criar)', [
    p('make + coisa', 'Fazer, preparar, criar', `
I'll make dinner. | Eu vou fazer o jantar.
She made a cake. | Ela fez um bolo.`),
    p('make + a mistake / a decision / money...', 'Combinações fixas', `
Everyone makes mistakes. | Todo mundo comete erros.
I need to make a decision. | Eu preciso tomar uma decisão.
He makes good money. | Ele ganha bem.`),
    p('make + pessoa + sentimento / make sense', 'Causar', `
You make me happy. | Você me faz feliz.
That makes sense. | Isso faz sentido.`),
  ], 'Passado: made. "Make" = criar/produzir; "do" = executar uma tarefa.'),
  w('do', 'Do', 'Fazer (tarefa)', [
    p('do + tarefa', 'Fazer atividades', `
I do my homework at night. | Eu faço minha lição à noite.
I'll do the dishes. | Eu lavo a louça.
Do your best. | Faça o seu melhor.`),
    p('did / done', 'Passado', `
I did it! | Eu consegui!
Did you eat? | Você comeu?`),
    p('Expressões com do', 'Muito usadas', `
Can you do me a favor? | Você pode me fazer um favor?
How are you doing? | Como você está?`),
  ], 'Passado: did. "Do" também é o ajudante das perguntas e negativas: Do you...? I don\'t...'),
  w('work', 'Work', 'Trabalhar', [
    p('work = trabalhar', 'Trabalho', `
I work at a bank. | Eu trabalho em um banco.
I work from nine to five. | Eu trabalho das nove às cinco.
She's working right now. | Ela está trabalhando agora.`),
    p('work = funcionar', 'Funcionar', `
It doesn't work. | Não funciona.
Does this work? | Isso funciona?
It worked! | Funcionou!`),
    p('work on / work out', 'Expressões', `
I'm working on it. | Estou trabalhando nisso.
I work out every morning. | Eu malho toda manhã.
Everything will work out. | Tudo vai dar certo.`),
  ], 'Passado: worked.'),
  w('study', 'Study', 'Estudar', [
    p('study + matéria', 'Estudar', `
I study English every day. | Eu estudo inglês todos os dias.
She studies at night. | Ela estuda à noite.`),
    p('study for / studied / been studying', 'Objetivo, passado e duração', `
I need to study for the test. | Eu preciso estudar para a prova.
What did you study in college? | O que você estudou na faculdade?
I've been studying for two hours. | Estou estudando há duas horas.`),
  ], 'Passado: studied. Com he/she: studies.'),
  w('learn', 'Learn', 'Aprender', [
    p('learn + coisa / learn to + verbo', 'Aprender', `
I learn something new every day. | Eu aprendo algo novo todo dia.
I want to learn to cook. | Eu quero aprender a cozinhar.`),
    p('learn from / learned', 'De onde e passado', `
We learn from our mistakes. | A gente aprende com nossos erros.
I learned a lot today. | Eu aprendi muito hoje.
Where did you learn to speak like that? | Onde você aprendeu a falar assim?`),
  ], 'Passado: learned.'),
  w('speak', 'Speak', 'Falar', [
    p('speak + língua', 'Falar um idioma', `
I speak a little English. | Eu falo um pouco de inglês.
Can you speak more slowly? | Você pode falar mais devagar?`),
    p('speak to / talk to', 'Falar com alguém', `
Can I speak to the manager? | Posso falar com o gerente?
She spoke to me yesterday. | Ela falou comigo ontem.
Let's talk later. | Vamos conversar depois.`),
  ], 'Passado: spoke. Na conversa do dia a dia, "talk" é mais comum que "speak".'),
  w('say', 'Say', 'Dizer', [
    p('say + algo', 'Dizer palavras', `
Say it again. | Diga de novo.
Don't say that. | Não diga isso.
I'd say yes. | Eu diria que sim.`),
    p('said + (that) + frase', 'Contar o que alguém disse', `
He said he was tired. | Ele disse que estava cansado.
She said it was fine. | Ela disse que estava tudo bem.`),
  ], 'Passado: said (fala-se "séd"). "Say" algo; "tell" alguém.'),
  w('tell', 'Tell', 'Contar / Dizer', [
    p('tell + pessoa + ...', 'Dizer/contar a alguém', `
Tell me. | Me conta.
Tell me about your day. | Me conta do seu dia.
Can you tell me where the bank is? | Você pode me dizer onde fica o banco?`),
    p('told', 'Passado', `
I told you! | Eu te disse!
She told me the truth. | Ela me contou a verdade.`),
    p('tell a story / Don\'t tell', 'Expressões', `
Let me tell you a story. | Deixa eu te contar uma história.
Don't tell anyone. | Não conta para ninguém.`),
  ], 'Passado: told.'),
  w('see', 'See', 'Ver', [
    p('see = ver', 'Enxergar', `
Did you see that? | Você viu aquilo?
I saw a great movie. | Eu vi um filme ótimo.`),
    p('See you...', 'Despedidas', `
See you later! | Até mais!
See you tomorrow! | Até amanhã!
Nice to see you again. | Bom te ver de novo.`),
    p('I see / Let\'s see', 'Entender e decidir', `
I see. | Entendo.
Let's see. | Vamos ver.
We'll see. | Veremos.`),
  ], 'Passado: saw.'),
  w('look', 'Look', 'Olhar', [
    p('look at + coisa', 'Olhar para', `
Look at this! | Olha isso!
Look at me. | Olha para mim.`),
    p('look + adjetivo = parecer', 'Aparência', `
You look tired. | Você parece cansado.
It looks good. | Ficou bonito.`),
    p('look for / look forward to / look like', 'Expressões', `
I'm looking for my phone. | Estou procurando meu celular.
I'm looking forward to it. | Estou ansioso por isso.
You look like your father. | Você parece com seu pai.`),
  ], 'Passado: looked.'),
  w('understand', 'Understand', 'Entender', [
    p("I understand / I don't understand", 'Afirmar e negar', `
I understand. | Eu entendo.
I don't understand this word. | Eu não entendo esta palavra.
She doesn't understand why. | Ela não entende por quê.`),
    p('Do you understand...? / understood', 'Pergunta e passado', `
Do you understand me? | Você me entende?
Did you understand the question? | Você entendeu a pergunta?
I finally understood it. | Finalmente eu entendi.`),
  ], 'Passado: understood.'),
  w('feel', 'Feel', 'Sentir', [
    p('feel + adjetivo', 'Como você se sente', `
I feel tired. | Eu me sinto cansado.
How do you feel? | Como você se sente?
I feel much better now. | Me sinto muito melhor agora.`),
    p('feel like + verbo-ing', 'Estar a fim de', `
I feel like eating pizza. | Estou com vontade de comer pizza.
I don't feel like going out. | Não estou a fim de sair.`),
    p('felt / It feels...', 'Passado e sensação', `
I felt sick yesterday. | Eu me senti mal ontem.
It feels good. | É uma sensação boa.`),
  ], 'Passado: felt.'),
  w('try', 'Try', 'Tentar', [
    p('try to + verbo', 'Tentar fazer', `
I'll try to help. | Vou tentar ajudar.
Try to relax. | Tenta relaxar.`),
    p('try + coisa', 'Experimentar', `
Try this cake. | Experimenta este bolo.
Can I try it on? | Posso experimentar? (roupa)`),
    p('tried / try again', 'Passado e insistir', `
I tried my best. | Eu fiz o meu melhor.
Try again. | Tenta de novo.
Let me try. | Deixa eu tentar.`),
  ], 'Passado: tried.'),
  w('believe', 'Believe', 'Acreditar', [
    p('believe + pessoa / algo', 'Acreditar no que dizem', `
I believe you. | Eu acredito em você.
I can't believe it! | Não acredito!`),
    p('believe in', 'Acreditar em (fé, potencial)', `
I believe in you. | Eu acredito em você.
Do you believe in God? | Você acredita em Deus?`),
    p('Believe me / I believe that...', 'Convencer e opinar', `
Believe me, it works. | Acredite em mim, funciona.
I believe that everything happens for a reason. | Eu acredito que tudo acontece por um motivo.`),
  ], 'Passado: believed.'),
  w('remember', 'Remember', 'Lembrar', [
    p('remember + pessoa / algo', 'Lembrar de', `
I remember you. | Eu lembro de você.
Do you remember me? | Você lembra de mim?
I don't remember his name. | Eu não lembro o nome dele.`),
    p('remember to + verbo', 'Não esquecer de fazer', `
Remember to call your mom. | Lembre de ligar para sua mãe.
I didn't remember to bring it. | Eu não lembrei de trazer.`),
  ], 'Passado: remembered. Sem "de": "I remember you", não "I remember of you".'),
]

// ---------------- 4. Conectores ----------------

const CONNECTORS: PlusWord[] = [
  w('and', 'And', 'E', [
    p('... and ...', 'Somar ideias', `
I like coffee and tea. | Eu gosto de café e chá.
I woke up and took a shower. | Eu acordei e tomei banho.
She's smart and funny. | Ela é inteligente e engraçada.`),
    p('And...?', 'Continuar a conversa', `
And you? | E você?
And then what happened? | E aí, o que aconteceu?`),
  ]),
  w('but', 'But', 'Mas', [
    p('..., but ...', 'Contraste', `
I want to go, but I'm tired. | Eu quero ir, mas estou cansado.
It's expensive, but it's worth it. | É caro, mas vale a pena.
I tried, but I couldn't. | Eu tentei, mas não consegui.
Sorry, but I can't. | Desculpa, mas não posso.`),
  ]),
  w('because', 'Because', 'Porque', [
    p('... because + frase', 'Explicar o motivo', `
I'm studying because I want a better job. | Estou estudando porque quero um emprego melhor.
I stayed home because it was raining. | Fiquei em casa porque estava chovendo.`),
    p('because of + coisa', 'Por causa de', `
We were late because of the traffic. | A gente se atrasou por causa do trânsito.
I couldn't sleep because of the noise. | Eu não consegui dormir por causa do barulho.`),
  ], 'Na fala rápida vira "\'cause" (cóz).'),
  w('so', 'So', 'Então / Por isso', [
    p('..., so ...', 'Consequência', `
I was tired, so I went to bed. | Eu estava cansado, então fui dormir.
It was raining, so we stayed home. | Estava chovendo, por isso ficamos em casa.`),
    p('so + adjetivo', 'Tão', `
I'm so happy! | Estou tão feliz!
It's so good. | É tão bom.`),
    p('So, ... (início)', 'Começar ou retomar assunto', `
So, what do you think? | Então, o que você acha?
So what? | E daí?`),
  ]),
  w('or', 'Or', 'Ou', [
    p('... or ...?', 'Opções', `
Coffee or tea? | Café ou chá?
Do you want to stay or go? | Você quer ficar ou ir?`),
    p('..., or ... / not ... or', 'Senão / nem', `
Hurry up, or we'll be late. | Anda logo, senão a gente vai se atrasar.
I don't drink coffee or tea. | Eu não bebo café nem chá.`),
  ]),
  w('if', 'If', 'Se', [
    p('If + presente, ... will / imperativo', 'Condição real', `
If it rains, I'll stay home. | Se chover, eu fico em casa.
If you need help, call me. | Se precisar de ajuda, me liga.`),
    p('If I were / had..., I would...', 'Situação imaginária', `
If I were you, I'd go. | Se eu fosse você, eu iria.
If I had money, I would travel. | Se eu tivesse dinheiro, eu viajaria.`),
    p('... if + frase', 'Se (dúvida)', `
I don't know if he's coming. | Eu não sei se ele vem.
Ask her if she wants to come. | Pergunta se ela quer vir.`),
  ]),
  w('although', 'Although', 'Embora', [
    p('Although + frase, ...', 'Contraste mais elaborado', `
Although it was late, we kept talking. | Embora fosse tarde, continuamos conversando.
Although I'm tired, I'll go to the gym. | Embora eu esteja cansado, vou para a academia.
She came, although she was sick. | Ela veio, apesar de estar doente.`),
    p('..., though.', 'Na fala: "though" no fim = "mas"', `
It was fun, though. | Mas foi divertido.
I like it, though. | Mas eu gosto.`),
  ]),
  w('however', 'However', 'Entretanto', [
    p('... . However, ...', 'Contraste entre duas frases (mais formal)', `
I'd love to go. However, I have to work. | Eu adoraria ir. No entanto, tenho que trabalhar.
The hotel was nice. However, it was expensive. | O hotel era legal. Porém, era caro.`),
  ], 'Comum em textos e e-mails; na conversa, os americanos usam mais "but".'),
  w('also', 'Also', 'Também', [
    p('also + verbo / is also', 'No meio da frase', `
I also speak Spanish. | Eu também falo espanhol.
She's also coming. | Ela também vem.`),
    p('Also, ...', 'Acrescentar uma ideia', `
Also, don't forget your keys. | E também, não esqueça suas chaves.`),
    p('... too', 'No fim da frase use "too"', `
Me too. | Eu também.
I love you too. | Eu também te amo.`),
  ]),
  w('then', 'Then', 'Então / Depois', [
    p('First..., then...', 'Sequência', `
First I take a shower, then I have breakfast. | Primeiro eu tomo banho, depois tomo café da manhã.
Let's eat, then we can go. | Vamos comer, depois a gente pode ir.`),
    p('then = naquele momento / então', 'Outros usos', `
See you then! | Até lá!
I was a kid back then. | Eu era criança naquela época.
OK then, let's do it. | Então tá, vamos fazer.`),
  ]),
  w('before', 'Before', 'Antes', [
    p('before + verbo-ing / frase', 'Antes de', `
Wash your hands before eating. | Lave as mãos antes de comer.
Call me before you leave. | Me liga antes de sair.`),
    p('... before / the day before', 'Antes (no fim) e anteontem', `
I've seen this before. | Eu já vi isso antes.
I saw her the day before yesterday. | Eu a vi anteontem.`),
  ]),
  w('after', 'After', 'Depois', [
    p('After + coisa, ...', 'Depois de', `
After work, I go to the gym. | Depois do trabalho, eu vou à academia.
After dinner, let's watch a movie. | Depois do jantar, vamos ver um filme.`),
    p('... after + frase / the day after', 'Depois que / depois de amanhã', `
I'll call you after I finish. | Eu te ligo depois que eu terminar.
See you the day after tomorrow. | Te vejo depois de amanhã.`),
  ], 'Para "depois" sozinho no fim da frase, use "later": "I\'ll do it later".'),
  w('while', 'While', 'Enquanto', [
    p('... while + frase', 'Duas coisas ao mesmo tempo', `
I listen to music while I work. | Eu escuto música enquanto trabalho.
She called while I was sleeping. | Ela ligou enquanto eu estava dormindo.`),
    p('a while', 'Um tempo', `
Can you wait a while? | Você pode esperar um pouco?
I haven't seen him in a while. | Faz um tempo que não o vejo.`),
  ]),
  w('until', 'Until', 'Até', [
    p('... until + momento / frase', 'Até (tempo)', `
Wait until I get there. | Espera até eu chegar.
I work until six. | Eu trabalho até as seis.
I didn't know until today. | Eu não sabia até hoje.`),
  ], 'Informalmente vira "till". Para lugar (até a praça), use "to".'),
  w('since', 'Since', 'Desde / Já que', [
    p('since + momento', 'Desde', `
I've lived here since 2020. | Eu moro aqui desde 2020.
We've been friends since childhood. | Somos amigos desde a infância.`),
    p('Since + frase, ...', 'Já que', `
Since you're here, let's start. | Já que você está aqui, vamos começar.
Since it's raining, let's stay in. | Já que está chovendo, vamos ficar em casa.`),
  ]),
  w('for', 'For', 'Para / Por', [
    p('for + coisa / pessoa', 'Para, por', `
This gift is for you. | Este presente é para você.
Thanks for everything. | Obrigado por tudo.
What's for dinner? | O que tem para o jantar?
I'm looking for a job. | Estou procurando um emprego.`),
    p('for + período', 'Duração (por / há)', `
I lived there for five years. | Eu morei lá por cinco anos.
I've been waiting for an hour. | Estou esperando há uma hora.`),
  ]),
  w('with', 'With', 'Com', [
    p('with + pessoa / coisa', 'Com', `
I live with my parents. | Eu moro com meus pais.
Coffee with milk, please. | Café com leite, por favor.
I agree with you. | Eu concordo com você.`),
    p('Expressões com with', 'Muito usadas', `
What's wrong with you? | O que há de errado com você?
I'm with you. | Estou com você.`),
  ]),
  w('without', 'Without', 'Sem', [
    p('without + coisa / verbo-ing', 'Sem', `
I can't live without you. | Eu não consigo viver sem você.
Coffee without sugar, please. | Café sem açúcar, por favor.
He left without saying goodbye. | Ele foi embora sem se despedir.`),
  ], 'Depois de "without" o verbo vai com -ing: without saying, without eating.'),
]

// ---------------- 5. Frequência e tempo ----------------

const TIME: PlusWord[] = [
  w('always', 'Always', 'Sempre', [
    p('sujeito + always + verbo / be + always', 'Antes do verbo; depois de am/is/are', `
I always wake up early. | Eu sempre acordo cedo.
She's always late. | Ela está sempre atrasada.
You can always call me. | Você sempre pode me ligar.
Thank you, as always. | Obrigado, como sempre.`),
  ], 'Palavras de frequência ficam ANTES do verbo principal, mas DEPOIS de am/is/are.'),
  w('usually', 'Usually', 'Geralmente', [
    p('sujeito + usually + verbo', 'Costumar fazer', `
I usually have coffee in the morning. | Eu geralmente tomo café de manhã.
What do you usually do on weekends? | O que você costuma fazer nos fins de semana?
It's usually quiet here. | Geralmente é tranquilo aqui.`),
  ], '"Usually" é o jeito natural de dizer "costumar" no presente.'),
  w('sometimes', 'Sometimes', 'Às vezes', [
    p('Sometimes + frase / sujeito + sometimes + verbo', 'Pode vir no início', `
Sometimes I cook at home. | Às vezes eu cozinho em casa.
I sometimes forget his name. | Às vezes eu esqueço o nome dele.
Sometimes it's hard, but I don't give up. | Às vezes é difícil, mas eu não desisto.`),
  ]),
  w('often', 'Often', 'Frequentemente', [
    p('sujeito + often + verbo', 'Com frequência', `
I often go to the movies. | Eu vou ao cinema com frequência.
Do you often travel? | Você viaja com frequência?
We don't see each other often. | A gente não se vê com frequência.`),
  ]),
  w('never', 'Never', 'Nunca', [
    p('sujeito + never + verbo', 'Nunca (sem "don\'t")', `
I never drink coffee at night. | Eu nunca tomo café à noite.
I've never been to the US. | Eu nunca fui aos Estados Unidos.`),
    p('Never + ...', 'Expressões', `
Never give up. | Nunca desista.
Never mind. | Deixa pra lá.`),
  ], 'Inglês não usa dupla negação: "I never go", não "I don\'t never go".'),
  w('rarely', 'Rarely', 'Raramente', [
    p('sujeito + rarely / hardly ever + verbo', 'Quase nunca', `
I rarely eat fast food. | Eu raramente como fast food.
She rarely complains. | Ela raramente reclama.
We hardly ever see him. | A gente quase nunca o vê.`),
  ], 'Na fala, "hardly ever" (quase nunca) é mais comum que "rarely".'),
  w('today', 'Today', 'Hoje', [
    p('... today / Today + ...', 'Hoje', `
What are you doing today? | O que você vai fazer hoje?
Today is a good day. | Hoje é um bom dia.
I have a lot to do today. | Tenho muito para fazer hoje.`),
  ]),
  w('yesterday', 'Yesterday', 'Ontem', [
    p('... yesterday (verbo no passado)', 'Ontem', `
I saw him yesterday. | Eu o vi ontem.
Yesterday was crazy. | Ontem foi uma loucura.
Where were you yesterday? | Onde você estava ontem?
I called you yesterday morning. | Eu te liguei ontem de manhã.`),
  ]),
  w('tomorrow', 'Tomorrow', 'Amanhã', [
    p('... tomorrow (futuro)', 'Amanhã', `
I'll do it tomorrow. | Eu faço isso amanhã.
What are you doing tomorrow night? | O que você vai fazer amanhã à noite?
I have an interview tomorrow morning. | Tenho uma entrevista amanhã de manhã.
Tomorrow is another day. | Amanhã é outro dia.`),
  ]),
  w('now', 'Now', 'Agora', [
    p('... now / right now', 'Agora / agora mesmo', `
I'm busy right now. | Estou ocupado agora.
Let's go now. | Vamos agora.
Where do you live now? | Onde você mora agora?`),
    p('From now on...', 'De agora em diante', `
From now on, I'll study every day. | De agora em diante, vou estudar todo dia.`),
  ]),
  w('later', 'Later', 'Mais tarde', [
    p('... later', 'Depois, mais tarde', `
Talk to you later. | A gente se fala depois.
Can we do it later? | A gente pode fazer isso depois?
Two days later, she called. | Dois dias depois, ela ligou.`),
  ]),
  w('soon', 'Soon', 'Em breve', [
    p('... soon', 'Logo', `
See you soon! | Até breve!
I'll be there soon. | Chego logo.
Get well soon! | Melhoras!`),
    p('As soon as + frase', 'Assim que', `
As soon as I get home, I'll call you. | Assim que eu chegar em casa, eu te ligo.`),
  ]),
  w('every-day', 'Every day', 'Todos os dias', [
    p('... every day', 'Todo dia', `
I walk my dog every day. | Eu passeio com meu cachorro todo dia.
Do you work every day? | Você trabalha todos os dias?
Every day is a new chance. | Cada dia é uma nova chance.`),
  ], '"Every day" (separado) = todo dia. "Everyday" (junto) = do dia a dia: "everyday English".'),
  w('every-week', 'Every week', 'Toda semana', [
    p('... every week / every other week', 'Toda semana / semana sim, semana não', `
I call my parents every week. | Eu ligo para os meus pais toda semana.
Every week I learn twenty new phrases. | Toda semana eu aprendo vinte frases novas.
We play soccer every other week. | A gente joga futebol semana sim, semana não.`),
  ]),
  w('already', 'Already', 'Já', [
    p("I've already... / already", 'Algo que já aconteceu', `
I've already eaten. | Eu já comi.
I already know. | Eu já sei.
It's already ten o'clock! | Já são dez horas!`),
    p('... already?', 'Surpresa por ser cedo', `
Are you leaving already? | Você já vai embora?`),
  ]),
  w('still', 'Still', 'Ainda', [
    p('still + verbo / be + still', 'Algo que continua', `
I still live with my parents. | Eu ainda moro com meus pais.
Are you still at work? | Você ainda está no trabalho?
I still don't understand. | Eu ainda não entendo.
It's still early. | Ainda é cedo.`),
  ]),
  w('yet', 'Yet', 'Ainda / Já', [
    p('negativa + yet = ainda não', 'Algo que ainda não aconteceu', `
I haven't finished yet. | Eu ainda não terminei.
Not yet. | Ainda não.
She's not here yet. | Ela ainda não chegou.`),
    p('pergunta + yet = já', 'Perguntar se já aconteceu', `
Have you eaten yet? | Você já comeu?
Is it ready yet? | Já está pronto?`),
  ], '"Yet" vai no fim da frase. Negativa = ainda; pergunta = já.'),
  w('again', 'Again', 'Novamente', [
    p('... again', 'De novo', `
Say that again, please. | Fala de novo, por favor.
Can you explain it again? | Você pode explicar de novo?
See you again soon. | Até a próxima.`),
    p('Expressões', 'Muito usadas', `
Here we go again. | Lá vamos nós de novo.
Never again! | Nunca mais!`),
  ]),
]

export const PLUS_GROUPS: PlusGroup[] = [
  { id: 'perguntas', title: 'Perguntas', subtitle: 'What, When, Where, How... e todas as formas de usar', icon: 'search', words: QUESTIONS },
  { id: 'inicios', title: 'Começos de frase', subtitle: 'I, You, My, This... para abrir qualquer frase', icon: 'user', words: STARTERS },
  { id: 'verbos', title: 'Verbos essenciais', subtitle: 'Want, Need, Get, Make... com passado e expressões', icon: 'pen', words: VERBS },
  { id: 'conectores', title: 'Conectores', subtitle: 'And, But, Because, If... para frases maiores', icon: 'path', words: CONNECTORS },
  { id: 'tempo', title: 'Frequência e tempo', subtitle: 'Always, Never, Already, Yet... e onde colocar', icon: 'clock', words: TIME },
]

export const getPlusGroup = (id: string) => PLUS_GROUPS.find((g) => g.id === id)

/** Todas as frases de exemplo de uma palavra. */
export const wordExamples = (word: PlusWord) => word.patterns.flatMap((pt) => pt.ex)

/** Chave estável de uma frase para guardar o progresso. */
export const plusKey = (en: string) => en.toLowerCase()
