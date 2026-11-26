// Semanas 13–20: fim da Vida cotidiana e começo da Comunicação (A2). Formato em ./build.ts
import { week } from './build'

export const weeks13to20 = [
  week(13, 'Pedindo direções', 'A2', [
    'Pedir e entender o caminho na rua',
    'Usar left, right, straight ahead, blocks',
    'Localizar: next to, between, in front of',
    'Dizer que está perdido e agradecer a ajuda',
  ], `
Excuse me, how do I get to the station? | Com licença, como chego à estação? | Excuse me=Com licença; how do I get to=como chego a; the station=a estação | get / go / got
Go straight ahead. | Siga em frente. | Go=Siga; straight ahead=em frente | straight / street / strait
Turn left at the light. | Vire à esquerda no semáforo. | Turn left=Vire à esquerda; at the light=no semáforo | left / lift / let
Turn right on Main Street. | Vire à direita na Main Street. | Turn right=Vire à direita; on Main Street=na Main Street | right / write / ride
It's on your left. | Fica à sua esquerda. | It's=Fica; on your left=à sua esquerda | on / in / at
Take the second street on the right. | Pegue a segunda rua à direita. | Take=Pegue; the second street=a segunda rua; on the right=à direita | second / seconds / seven
Walk for two blocks. | Ande dois quarteirões. | Walk=Ande; for two blocks=dois quarteirões | blocks / block / books | Nos EUA, distância na cidade se mede em "blocks" (quarteirões).
It's next to the bank. | Fica ao lado do banco. | It's=Fica; next to the bank=ao lado do banco | next / near / nest
It's between the bakery and the bank. | Fica entre a padaria e o banco. | It's=Fica; between=entre; the bakery and the bank=a padaria e o banco | between / behind / beside
It's in front of the park. | Fica em frente ao parque. | It's=Fica; in front of=em frente a; the park=o parque | front / from / font
Cross the street. | Atravesse a rua. | Cross=Atravesse; the street=a rua | Cross / Across / Close
How far is it? | Qual é a distância? | How far=Quão longe; is it=é | far / for / fat
It's about ten minutes on foot. | São uns dez minutos a pé. | It's about=São uns; ten minutes=dez minutos; on foot=a pé | foot / feet / food
You can't miss it. | Não tem como errar. | You can't miss it=Não tem como errar | miss / mess / mist | Frase comum no fim de uma explicação de caminho.
I'm lost. | Estou perdido. | I'm lost=Estou perdido | lost / lose / last
Can you show me on the map? | Você pode me mostrar no mapa? | Can you show me=Você pode me mostrar; on the map=no mapa | show / shown / shoe
Is this the way to the museum? | Este é o caminho para o museu? | Is this=Este é; the way to=o caminho para; the museum=o museu | way / weigh / why
Sorry, I'm not from here. | Desculpe, não sou daqui. | Sorry=Desculpe; I'm not from here=não sou daqui | from / for / of
Ask that police officer. | Pergunte àquele policial. | Ask=Pergunte a; that police officer=aquele policial | Ask / Tell / Asks
Thank you for your help. | Obrigado pela ajuda. | Thank you=Obrigado; for your help=pela ajuda | for / to / of
`, {
    title: 'Lost in Boston',
    titlePt: 'Perdido em Boston',
    sentences: `
My name is Thiago. I'm visiting Boston, and I'm lost. | Meu nome é Thiago. Estou visitando Boston e estou perdido.
I ask a woman: "Excuse me, how do I get to the station?" | Pergunto a uma mulher: "Com licença, como chego à estação?"
"Sorry, I'm not from here. Ask that police officer." | "Desculpe, não sou daqui. Pergunte àquele policial."
The officer is very nice. "Go straight ahead. Walk for two blocks." | O policial é muito simpático. "Siga em frente. Ande dois quarteirões."
"Then turn left at the light. Turn right on Main Street." | "Depois vire à esquerda no semáforo. Vire à direita na Main Street."
"Take the second street on the right. It's between the bakery and the bank." | "Pegue a segunda rua à direita. Fica entre a padaria e o banco."
"It's on your left. You can't miss it." | "Fica à sua esquerda. Não tem como errar."
"How far is it?" "It's about ten minutes on foot." | "Qual é a distância?" "São uns dez minutos a pé."
"Can you show me on the map?" "Sure, here." | "Você pode me mostrar no mapa?" "Claro, aqui."
"Thank you for your help." | "Obrigado pela ajuda."
In the afternoon, I want to see the museum. "Is this the way to the museum?" | À tarde, quero ver o museu. "Este é o caminho para o museu?"
A man answers: "Yes. Cross the street. It's in front of the park." | Um homem responde: "Sim. Atravesse a rua. Fica em frente ao parque."
"And is there a good café near the museum?" "Yes. It's next to the bank." | "E tem um café bom perto do museu?" "Tem. Fica ao lado do banco."
`,
    glossary: 'name=nome; thiago=Thiago (nome); visiting=visitando; boston=Boston (cidade dos EUA); ask=pergunto; woman=mulher; officer=policial; very=muito; nice=simpático; then=depois; sure=claro; here=aqui; afternoon=tarde; want=quero; see=ver; man=homem; answers=responde; yes=sim; good=bom; café=café (lugar); near=perto de; main=principal; street=rua',
    questions: `
Quem explica o caminho para a estação? | Uma mulher | *Um policial | Um motorista
Quantos quarteirões o Thiago anda primeiro? | Um | *Dois | Cinco
Onde fica a estação? | *Entre a padaria e o banco | Em frente ao parque | Ao lado do museu
Quanto tempo leva a pé até a estação? | Cinco minutos | *Uns dez minutos | Meia hora
`,
  }),

  week(14, 'Clima e estações', 'A2', [
    'Perguntar e descrever o tempo (sunny, cloudy, windy)',
    'Falar das quatro estações',
    'Fazer previsões com "going to"',
    'Entender temperatura em Fahrenheit',
  ], `
What's the weather like today? | Como está o tempo hoje? | What's the weather like=Como está o tempo; today=hoje | weather / whether / water
It's sunny and hot. | Está ensolarado e quente. | It's=Está; sunny=ensolarado; and hot=e quente | sunny / sun / funny
It's raining. | Está chovendo. | It's raining=Está chovendo | raining / rain / rains
It's cloudy now. | Está nublado agora. | It's cloudy=Está nublado; now=agora | cloudy / cloud / clouds
It's very windy. | Está ventando muito. | It's very windy=Está ventando muito | windy / wind / window
It's freezing! | Está congelando! | It's freezing=Está congelando (muito frio) | freezing / freeze / frozen
It's going to rain tomorrow. | Vai chover amanhã. | It's going to rain=Vai chover; tomorrow=amanhã | going / go / goes | "Going to" para previsão: it's going to rain.
Take an umbrella. | Leve um guarda-chuva. | Take=Leve; an umbrella=um guarda-chuva | an / a / the
The temperature is eighty degrees. | A temperatura está em oitenta graus. | The temperature=A temperatura; is eighty degrees=está em oitenta graus | degrees / degree / decrees | Nos EUA, a temperatura é em Fahrenheit: 80 °F ≈ 27 °C.
Summer is my favorite season. | O verão é minha estação favorita. | Summer=O verão; is my favorite season=é minha estação favorita | season / reason / seasons
In winter, it snows a lot. | No inverno, neva muito. | In winter=No inverno; it snows=neva; a lot=muito | snows / snow / knows
I love spring. | Eu amo a primavera. | I love=Eu amo; spring=a primavera | spring / string / sprint | Estações: spring, summer, fall (EUA) ou autumn, winter.
In the fall, the leaves change color. | No outono, as folhas mudam de cor. | In the fall=No outono; the leaves=as folhas; change color=mudam de cor | fall / full / fell
It's humid in Brazil. | É úmido no Brasil. | It's humid=É úmido; in Brazil=no Brasil | humid / human / humor
I don't like cold weather. | Não gosto de tempo frio. | I don't like=Não gosto de; cold weather=tempo frio | cold / cool / could
It's a beautiful day. | Está um dia lindo. | It's a beautiful day=Está um dia lindo | beautiful / beauty / dutiful
The sky is clear. | O céu está limpo. | The sky=O céu; is clear=está limpo | clear / clean / clever
There's a storm coming. | Tem uma tempestade vindo. | There's=Tem; a storm=uma tempestade; coming=vindo | storm / store / stone
Let's stay inside. | Vamos ficar dentro de casa. | Let's stay=Vamos ficar; inside=dentro (de casa) | inside / outside / beside
I can't wait for summer. | Não vejo a hora do verão chegar. | I can't wait for=Não vejo a hora de; summer=verão | wait / weight / white
`, {
    title: 'Weather in New York',
    titlePt: 'O tempo em Nova York',
    sentences: `
I'm Camila. I'm from Brazil, but now I live in New York. | Eu sou a Camila. Sou do Brasil, mas agora moro em Nova York.
In my city, it's always warm. It's humid in Brazil. | Na minha cidade, sempre está calor. É úmido no Brasil.
Here, the weather changes a lot. I love spring. | Aqui, o tempo muda muito. Eu amo a primavera.
In the fall, the leaves change color. In winter, it snows a lot. | No outono, as folhas mudam de cor. No inverno, neva muito.
I don't like cold weather. In January, it's freezing! | Não gosto de tempo frio. Em janeiro, está congelando!
Today is a day in May. My neighbor Sam asks: "What's the weather like today?" | Hoje é um dia de maio. Meu vizinho Sam pergunta: "Como está o tempo hoje?"
I look outside. "It's sunny and hot. The temperature is eighty degrees." | Olho lá fora. "Está ensolarado e quente. A temperatura está em oitenta graus."
"It's a beautiful day. The sky is clear." | "Está um dia lindo. O céu está limpo."
"It's still spring, but I can't wait for summer. Summer is my favorite season!" | "Ainda é primavera, mas não vejo a hora do verão chegar. O verão é minha estação favorita!"
Two hours later, Sam calls me. "The weather changes fast. It's cloudy now, and it's very windy." | Duas horas depois, o Sam me liga. "O tempo muda rápido. Está nublado agora, e está ventando muito."
"There's a storm coming. And it's going to rain tomorrow too." | "Tem uma tempestade vindo. E vai chover amanhã também."
Then I hear it. "It's raining!" | Aí eu escuto. "Está chovendo!"
"Take an umbrella," says Sam. "No," I answer. "Let's stay inside." | "Leve um guarda-chuva", diz o Sam. "Não", eu respondo. "Vamos ficar dentro de casa."
`,
    glossary: 'camila=Camila (nome); sam=Sam (nome); brazil=Brasil; but=mas; now=agora; live=moro; york=York (New York = Nova York); city=cidade; always=sempre; warm=calor / quente; here=aqui; weather=tempo (clima); changes=muda; january=janeiro; today=hoje; day=dia; may=maio; neighbor=vizinho; asks=pergunta; look=olho; outside=lá fora; still=ainda; two=duas; hours=horas; later=depois; calls=liga; fast=rápido; too=também; then=aí / depois; hear=escuto; says=diz; answer=respondo',
    questions: `
De onde a Camila é? | *Do Brasil | De Nova York | Do Canadá
Qual é a estação favorita dela? | Inverno | Primavera | *Verão
Qual é a temperatura de manhã? | Vinte graus | *Oitenta graus Fahrenheit | Trinta graus Fahrenheit
O que acontece no fim do dia? | Neva | *Chove | Faz sol
`,
  }),

  week(15, 'Saúde e corpo', 'A2', [
    'Dizer o que está sentindo (headache, fever, sore throat)',
    'Marcar consulta e responder ao médico',
    'Entender conselhos com "should"',
    'Falar de hábitos saudáveis',
  ], `
I don't feel well. | Não estou me sentindo bem. | I don't feel=Não me sinto; well=bem | well / good / will | "I don't feel well" é o jeito mais comum de dizer que está mal.
I have a headache. | Estou com dor de cabeça. | I have=Estou com; a headache=dor de cabeça | headache / heartache / headaches
My back hurts. | Minhas costas doem. | My back=Minhas costas; hurts=doem | hurts / hurt / hearts
I have a fever. | Estou com febre. | I have=Estou com; a fever=febre | fever / favor / fewer
I have a cold. | Estou resfriado. | I have=Estou com; a cold=um resfriado | cold / cool / gold
I need to see a doctor. | Preciso ir ao médico. | I need to=Preciso; see a doctor=ir ao médico | doctor / doctors / daughter
I'd like to make an appointment. | Gostaria de marcar uma consulta. | I'd like to=Gostaria de; make=marcar; an appointment=uma consulta | appointment / apartment / point
What are your symptoms? | Quais são seus sintomas? | What are=Quais são; your symptoms=seus sintomas | symptoms / systems / symptom
When did it start? | Quando começou? | When=Quando; did it start=começou | start / starts / started | Na pergunta no passado, use "did" + verbo normal: did it start (não "did it started").
Take this medicine twice a day. | Tome este remédio duas vezes ao dia. | Take=Tome; this medicine=este remédio; twice a day=duas vezes ao dia | twice / twins / two
You should rest. | Você deveria descansar. | You should=Você deveria; rest=descansar | should / shoot / could | "Should" dá conselho.
You should drink more water. | Você deveria beber mais água. | You should drink=Você deveria beber; more water=mais água | more / most / many
I broke my arm. | Eu quebrei o braço. | I broke=Eu quebrei; my arm=o braço | broke / break / broken | Partes do corpo usam "my": my arm, my leg (não "the arm").
My eyes are red. | Meus olhos estão vermelhos. | My eyes=Meus olhos; are red=estão vermelhos | eyes / ice / ears
I have a sore throat. | Estou com dor de garganta. | I have=Estou com; a sore throat=dor de garganta | throat / threat / thought
I have a stomachache. | Estou com dor de barriga. | I have=Estou com; a stomachache=dor de barriga | stomachache / stomach / headache
I exercise three times a week. | Eu faço exercício três vezes por semana. | I exercise=Eu faço exercício; three times a week=três vezes por semana | times / time / tames
I sleep seven hours a night. | Eu durmo sete horas por noite. | I sleep=Eu durmo; seven hours=sete horas; a night=por noite | sleep / slip / sleeps
I feel much better now. | Estou bem melhor agora. | I feel=Eu me sinto; much better=bem melhor; now=agora | better / best / butter
Get well soon! | Melhoras! | Get well=Fique bem; soon=logo | soon / son / sun
`, {
    title: 'A Bad Week',
    titlePt: 'Uma semana ruim',
    sentences: `
On Monday, I wake up and I don't feel well. | Na segunda, eu acordo e não estou me sentindo bem.
I have a headache, and my back hurts. I have a fever too. | Estou com dor de cabeça e minhas costas doem. Estou com febre também.
I need to see a doctor. I call the clinic: "Hello, I'd like to make an appointment." | Preciso ir ao médico. Ligo para a clínica: "Alô, gostaria de marcar uma consulta."
At the clinic, the doctor asks: "What are your symptoms?" | Na clínica, a médica pergunta: "Quais são seus sintomas?"
"I have a sore throat, and my eyes are red." "When did it start?" "On Sunday." | "Estou com dor de garganta, e meus olhos estão vermelhos." "Quando começou?" "No domingo."
"It's a cold. Take this medicine twice a day. You should rest." | "É um resfriado. Tome este remédio duas vezes ao dia. Você deveria descansar."
"And you should drink more water." | "E você deveria beber mais água."
I send a message to my boss: "I have a cold. I can't work today." | Mando uma mensagem para o meu chefe: "Estou resfriado. Não posso trabalhar hoje."
My friend Jake texts me: "Get well soon!" | Meu amigo Jake me manda mensagem: "Melhoras!"
"Thanks! Last year I broke my arm, so this is easy." | "Valeu! No ano passado eu quebrei o braço, então isto é fácil."
The medicine is strong. On Wednesday, I have a stomachache! | O remédio é forte. Na quarta, estou com dor de barriga!
On Friday, I tell Jake: "I feel much better now." | Na sexta, eu digo ao Jake: "Estou bem melhor agora."
Now I take care of my health. I exercise three times a week, and I sleep seven hours a night. | Agora eu cuido da minha saúde. Faço exercício três vezes por semana e durmo sete horas por noite.
`,
    glossary: 'monday=segunda-feira; wake=acordo (wake up); up=(wake up = acordar); too=também; call=ligo; clinic=clínica; hello=alô; asks=pergunta; sunday=domingo; send=mando; message=mensagem; boss=chefe; work=trabalhar; today=hoje; friend=amigo; jake=Jake (nome); texts=manda mensagem; thanks=valeu; last=passado; year=ano; so=então; easy=fácil; medicine=remédio; strong=forte; wednesday=quarta-feira; friday=sexta-feira; tell=digo; take=tomo (take care = cuidar); care=cuidado; health=saúde',
    questions: `
O que o narrador sente na segunda? | *Dor de cabeça e nas costas | Dor no braço | Nada
Quantas vezes por dia ele toma o remédio? | Uma | *Duas | Três
O que a médica recomenda? | Trabalhar | *Descansar e beber mais água | Correr
Quantas horas ele dorme agora? | Seis | *Sete | Oito
`,
  }),

  week(16, 'Tempo livre e hobbies', 'A2', [
    'Contar o que faz no tempo livre',
    'Usar "go + -ing", "play the" e "good at"',
    'Diferenciar boring e bored',
    'Convidar e responder: That sounds fun!',
  ], `
What do you do in your free time? | O que você faz no seu tempo livre? | What do you do=O que você faz; in your free time=no seu tempo livre | free / three / tree
I read a lot. | Eu leio muito. | I read=Eu leio; a lot=muito | read / red / reads
I play the guitar. | Eu toco violão. | I play=Eu toco; the guitar=violão | play / plays / pray | Instrumento usa "play the": play the guitar, play the piano.
I go running in the park. | Eu vou correr no parque. | I go running=Eu vou correr; in the park=no parque | running / run / ruining | "Go" + verbo-ing para atividades: go running, go swimming, go shopping.
I'm into video games. | Eu curto videogame. | I'm into=Eu curto; video games=videogame | into / in / onto | "Be into" = curtir, ser fã de. Bem informal.
I watch series on weekends. | Eu assisto séries nos fins de semana. | I watch=Eu assisto; series=séries; on weekends=nos fins de semana | watch / see / look | Para TV, série e filme, use "watch".
How often do you go to the gym? | Com que frequência você vai à academia? | How often=Com que frequência; do you go=você vai; to the gym=à academia | often / after / soften
Twice a week. | Duas vezes por semana. | Twice=Duas vezes; a week=por semana | Twice / Two / Twin
I'm good at cooking. | Eu sou bom em cozinhar. | I'm good at=Sou bom em; cooking=cozinhar | at / in / on | "Good at" + verbo-ing ou substantivo.
I'm not good at drawing. | Não sou bom em desenhar. | I'm not good at=Não sou bom em; drawing=desenhar | drawing / drawn / draw
I want to learn to swim. | Quero aprender a nadar. | I want to=Quero; learn=aprender; to swim=a nadar | swim / swing / swims
I spend a lot of time online. | Eu passo muito tempo na internet. | I spend=Eu passo; a lot of time=muito tempo; online=na internet | spend / spent / send
It's relaxing. | É relaxante. | It's relaxing=É relaxante | relaxing / relaxed / relax | "-ing" descreve a coisa (relaxing). "-ed" descreve como você se sente (relaxed).
It's boring. | É chato. | It's boring=É chato (entediante) | boring / bored / bring
I'm bored. | Estou entediado. | I'm bored=Estou entediado | bored / boring / board
Do you want to join us? | Quer se juntar a nós? | Do you want to=Você quer; join us=se juntar a nós | join / joy / joint
I have a new hobby. | Tenho um hobby novo. | I have=Eu tenho; a new hobby=um hobby novo | hobby / hobbies / happy
I don't have time for that. | Não tenho tempo para isso. | I don't have time=Não tenho tempo; for that=para isso | time / times / team
That sounds fun! | Parece divertido! | That sounds=Isso parece; fun=divertido | sounds / sound / seems | "Sounds" = parece (pelo que você ouviu).
I'm a big fan of basketball. | Sou muito fã de basquete. | I'm a big fan of=Sou muito fã de; basketball=basquete | fan / fun / fans
`, {
    title: 'Free Time',
    titlePt: 'Tempo livre',
    sentences: `
What do you do in your free time? This is my answer. | O que você faz no seu tempo livre? Esta é a minha resposta.
I read a lot, and I play the guitar. | Eu leio muito e toco violão.
I go running in the park. Twice a week. | Eu vou correr no parque. Duas vezes por semana.
I'm good at cooking, but I'm not good at drawing. | Sou bom em cozinhar, mas não sou bom em desenhar.
I watch series on weekends, and I'm a big fan of basketball. | Assisto séries nos fins de semana e sou muito fã de basquete.
I spend a lot of time online too. | Também passo muito tempo na internet.
"I'm into video games," says my little brother. He plays every day. | "Eu curto videogame", diz meu irmão mais novo. Ele joga todo dia.
My friend Leo asks me: "How often do you go to the gym?" "Twice a week." | Meu amigo Leo me pergunta: "Com que frequência você vai à academia?" "Duas vezes por semana."
"I have a new hobby: yoga. It's relaxing. Do you want to join us?" | "Tenho um hobby novo: ioga. É relaxante. Quer se juntar a nós?"
"That sounds fun! But I don't have time for that." | "Parece divertido! Mas não tenho tempo para isso."
On Sunday, I have nothing to do. I'm bored. | No domingo, não tenho nada para fazer. Estou entediado.
I turn on the TV, but it's boring. | Ligo a TV, mas é chato.
So I call Leo: "OK, I want to try yoga!" | Então ligo para o Leo: "Tá bom, quero experimentar ioga!"
And next year, I want to learn to swim. | E no ano que vem, quero aprender a nadar.
`,
    glossary: 'answer=resposta; but=mas; too=também; says=diz; little=pequeno (little brother = irmão mais novo); brother=irmão; plays=joga; every=todo; day=dia; friend=amigo; leo=Leo (nome); asks=pergunta; yoga=ioga; sunday=domingo; nothing=nada; turn=ligo (turn on = ligar); on=(turn on = ligar); tv=TV; so=então; call=ligo para; ok=tá bom; try=experimentar; next=próximo; year=ano',
    questions: `
Que instrumento o narrador toca? | Piano | *Violão | Bateria
Com que frequência ele corre no parque? | Todo dia | *Duas vezes por semana | Uma vez por mês
Qual é o hobby novo do Leo? | Natação | Basquete | *Ioga
O que o narrador quer aprender no ano que vem? | Desenhar | *Nadar | Cozinhar
`,
  }),

  week(17, 'Fazendo perguntas', 'A2', [
    'Montar perguntas com do, does e did',
    'Usar who, which, whose, why, how long',
    'Pedir ajuda e explicação com educação',
    'Perguntar o significado de palavras',
  ], `
Can I ask you a question? | Posso te fazer uma pergunta? | Can I ask you=Posso te perguntar; a question=uma pergunta | ask / make / do | Em inglês você "ask" a question, não "make".
What do you do for a living? | Com o que você trabalha? | What do you do=O que você faz; for a living=para viver (profissão) | living / life / leaving
Where do you work? | Onde você trabalha? | Where=Onde; do you work=você trabalha | do / does / are
Does she speak English? | Ela fala inglês? | Does she=Ela; speak English=fala inglês | Does / Do / Is | Com he, she, it a pergunta usa "does", e o verbo fica sem "s".
Why are you learning English? | Por que você está aprendendo inglês? | Why=Por que; are you learning=você está aprendendo; English=inglês | Why / Who / Where
Because I want to work abroad. | Porque eu quero trabalhar no exterior. | Because=Porque; I want to work=quero trabalhar; abroad=no exterior | abroad / aboard / board
How long does it take? | Quanto tempo leva? | How long=Quanto tempo; does it take=leva | long / far / much
Who is your best friend? | Quem é seu melhor amigo? | Who=Quem; is your best friend=é seu melhor amigo | Who / How / Whose
Which one do you prefer? | Qual você prefere? | Which one=Qual (deles); do you prefer=você prefere | Which / What / Witch | Use "which" quando há opções definidas.
What time does the class start? | Que horas a aula começa? | What time=Que horas; does the class start=a aula começa | start / starts / started
Is this seat taken? | Este lugar está ocupado? | Is this seat=Este lugar; taken=está ocupado | taken / take / token
Are you sure? | Você tem certeza? | Are you sure=Você tem certeza | sure / shore / sour
What does this word mean? | O que significa esta palavra? | What does=O que; this word=esta palavra; mean=significa | mean / means / meant
How do you say "saudade" in English? | Como se diz "saudade" em inglês? | How do you say=Como se diz; in English=em inglês | say / tell / speak
Could you help me, please? | Você poderia me ajudar, por favor? | Could you=Você poderia; help me=me ajudar; please=por favor | Could / Should / Must
Do you mind if I sit here? | Você se importa se eu sentar aqui? | Do you mind=Você se importa; if I sit here=se eu sentar aqui | mind / mine / mild | Resposta "No" ou "Not at all" = pode, não me importo.
What's the difference? | Qual é a diferença? | What's=Qual é; the difference=a diferença | difference / different / differ
Whose phone is this? | De quem é este celular? | Whose=De quem; phone=celular; is this=é este | Whose / Who / Who's
How many people are coming? | Quantas pessoas vêm? | How many=Quantas; people=pessoas; are coming=vêm (estão vindo) | many / much / more
Any questions? | Alguma pergunta? | Any=Alguma; questions=perguntas | Any / Some / Many
`, {
    title: 'The First Class',
    titlePt: 'A primeira aula',
    sentences: `
Today is my first English class in the US. | Hoje é a minha primeira aula de inglês nos EUA.
I see a free chair and ask a girl: "Is this seat taken?" "No." "Do you mind if I sit here?" "Not at all." | Vejo uma cadeira livre e pergunto a uma moça: "Este lugar está ocupado?" "Não." "Você se importa se eu sentar aqui?" "De jeito nenhum."
"What time does the class start?" "At nine." | "Que horas a aula começa?" "Às nove."
The teacher, Mrs. Green, asks me: "Why are you learning English?" "Because I want to work abroad." | A professora, Mrs. Green, me pergunta: "Por que você está aprendendo inglês?" "Porque eu quero trabalhar no exterior."
She asks a student: "What do you do for a living?" "I'm a nurse." "Where do you work?" "At a hospital." | Ela pergunta a uma aluna: "Com o que você trabalha?" "Sou enfermeira." "Onde você trabalha?" "Num hospital."
A new girl comes in. I ask my classmate Ken: "Does she speak English?" "A little." | Entra uma moça nova. Pergunto ao meu colega Ken: "Ela fala inglês?" "Um pouco."
Ken says: "Can I ask you a question? Who is your best friend in Brazil?" | O Ken diz: "Posso te fazer uma pergunta? Quem é seu melhor amigo no Brasil?"
I raise my hand. "Could you help me, please? What does this word mean?" | Levanto a mão. "Você poderia me ajudar, por favor? O que significa esta palavra?"
"And how do you say "saudade" in English?" "That's difficult!" | "E como se diz "saudade" em inglês?" "Isso é difícil!"
Mrs. Green writes "big" and "large". "Which one do you prefer?" "What's the difference?" "Not much." "Are you sure?" | A Mrs. Green escreve "big" e "large". "Qual você prefere?" "Qual é a diferença?" "Não muita." "Você tem certeza?"
Ken asks: "How long does it take to learn English?" "It takes time!" | O Ken pergunta: "Quanto tempo leva para aprender inglês?" "Leva tempo!"
There is a phone on the table. "Whose phone is this?" "Mine!" | Tem um celular na mesa. "De quem é este celular?" "Meu!"
"Next week we have a party. How many people are coming?" | "Semana que vem temos uma festa. Quantas pessoas vêm?"
At the end, Mrs. Green says: "Any questions?" | No final, a Mrs. Green diz: "Alguma pergunta?"
`,
    glossary: "today=hoje; first=primeira; class=aula; us=EUA (the US); see=vejo; free=livre; chair=cadeira; girl=moça / menina; not=não (not at all = de jeito nenhum); all=tudo; nine=nove; teacher=professora; mrs=senhora (Mrs.); green=Green (sobrenome); student=aluna; nurse=enfermeira; hospital=hospital; new=nova; comes=vem (comes in = entra); classmate=colega de classe; ken=Ken (nome); little=pouco; says=diz; brazil=Brasil; raise=levanto; hand=mão; difficult=difícil; writes=escreve; big=grande; large=grande; much=muito; takes=leva; time=tempo; phone=celular; table=mesa; mine=meu; next=próxima; week=semana; party=festa; end=final",
    questions: `
Por que o narrador está aprendendo inglês? | Para viajar | *Para trabalhar no exterior | Para a faculdade
Que horas a aula começa? | *Às nove | Às oito | Às dez
Qual é a profissão da aluna? | Professora | *Enfermeira | Médica
O que a professora pergunta no final? | Quem é seu amigo? | *Alguma pergunta? | De quem é o celular?
`,
  }),

  week(18, 'O que está acontecendo agora', 'A2', [
    'Usar o presente contínuo (I am doing) para o agora',
    'Usar o presente contínuo para algo temporário',
    'Perguntar: What are you doing? Who are you talking to?',
    'Diferenciar look for e look at',
  ], `
What are you doing? | O que você está fazendo? | What=O que; are you doing=você está fazendo | doing / do / does
I'm working from home today. | Estou trabalhando de casa hoje. | I'm working=Estou trabalhando; from home=de casa; today=hoje | working / work / worked
I'm cooking dinner right now. | Estou fazendo o jantar agora. | I'm cooking=Estou fazendo; dinner=o jantar; right now=agora | cooking / cook / cooker
She's talking on the phone. | Ela está falando ao telefone. | She's talking=Ela está falando; on the phone=ao telefone | on / in / at
They're watching TV. | Eles estão assistindo TV. | They're watching=Eles estão assistindo; TV=TV | watching / watch / washing
The baby is sleeping. | O bebê está dormindo. | The baby=O bebê; is sleeping=está dormindo | sleeping / sleep / slipping
It's getting late. | Está ficando tarde. | It's getting=Está ficando; late=tarde | getting / get / going
Are you listening to me? | Você está me ouvindo? | Are you listening=Você está ouvindo; to me=me | listening / listen / hearing
I'm not doing anything. | Não estou fazendo nada. | I'm not doing=Não estou fazendo; anything=nada | anything / nothing / something | Com "not", use "anything". Errado: "I'm not doing nothing".
We're waiting for the bus. | Estamos esperando o ônibus. | We're waiting=Estamos esperando; for the bus=o ônibus | for / to / at | "Wait for" + pessoa ou coisa.
He's wearing a blue shirt. | Ele está usando uma camisa azul. | He's wearing=Ele está usando; a blue shirt=uma camisa azul | wearing / using / wear
Who are you talking to? | Com quem você está falando? | Who=Quem; are you talking to=você está falando com | to / with / for
I'm studying for a test. | Estou estudando para uma prova. | I'm studying=Estou estudando; for a test=para uma prova | studying / study / studies
Hold on, I'm coming! | Espera, já estou indo! | Hold on=Espera; I'm coming=já estou indo | coming / going / come | "I'm coming" = já vou (indo até a pessoa).
Things are going well. | As coisas estão indo bem. | Things=As coisas; are going well=estão indo bem | well / good / will
I'm living with my cousin this year. | Estou morando com minha prima este ano. | I'm living=Estou morando; with my cousin=com minha prima (meu primo); this year=este ano | cousin / cousins / cushion | O presente contínuo também serve para algo temporário.
Prices are going up. | Os preços estão subindo. | Prices=Os preços; are going up=estão subindo | up / down / on
Is it still raining? | Ainda está chovendo? | Is it still=Ainda está; raining=chovendo | still / steel / stall
I'm looking for my keys. | Estou procurando minhas chaves. | I'm looking for=Estou procurando; my keys=minhas chaves | for / at / to | "Look for" = procurar. "Look at" = olhar.
Everyone is having fun. | Todo mundo está se divertindo. | Everyone=Todo mundo; is having fun=está se divertindo | having / have / has
`, {
    title: 'A Video Call',
    titlePt: 'Uma chamada de vídeo',
    sentences: `
It's Monday evening in Miami. I'm living with my cousin this year. | É segunda à noite em Miami. Estou morando com minha prima este ano.
My mother calls me on video. "Hi, Bruna! What are you doing?" | Minha mãe me liga por vídeo. "Oi, Bruna! O que você está fazendo?"
"I'm cooking dinner right now. I'm working from home today, so I have time." | "Estou fazendo o jantar agora. Estou trabalhando de casa hoje, então tenho tempo."
"Where is your cousin?" "She's talking on the phone in her room." | "Cadê sua prima?" "Ela está falando ao telefone no quarto dela."
"Here, your brothers are home. They're watching TV. The baby is sleeping." | "Aqui, seus irmãos estão em casa. Eles estão assistindo TV. O bebê está dormindo."
"How is work?" "Things are going well." | "Como está o trabalho?" "As coisas estão indo bem."
"Here in Brazil, prices are going up," says my mother. | "Aqui no Brasil, os preços estão subindo", diz minha mãe.
"Is it still raining there?" "No, it's sunny." | "Ainda está chovendo aí?" "Não, está sol."
My internet is bad. "Bruna? Are you listening to me?" "Yes, Mom!" | Minha internet está ruim. "Bruna? Você está me ouvindo?" "Sim, mãe!"
My cousin comes in. "Who are you talking to?" "My mother." | Minha prima entra. "Com quem você está falando?" "Com a minha mãe."
"Hi! Sorry, I'm looking for my keys. I'm studying for a test, and I need my books from the car." | "Oi! Desculpa, estou procurando minhas chaves. Estou estudando para uma prova e preciso dos meus livros do carro."
My mother sees a man in the kitchen. "Who is that? He's wearing a blue shirt." "That's our neighbor, Tom." | Minha mãe vê um homem na cozinha. "Quem é? Ele está usando uma camisa azul." "É o nosso vizinho, o Tom."
"And now, what are you doing?" "I'm not doing anything. It's getting late, Mom." | "E agora, o que você está fazendo?" "Não estou fazendo nada. Está ficando tarde, mãe."
At ten, my cousin and Tom call me from the door: "There's a party next door! We're waiting for the bus... no, for you!" | Às dez, minha prima e o Tom me chamam da porta: "Tem uma festa na casa ao lado! Estamos esperando o ônibus... não, você!"
"Hold on, I'm coming!" At the party, everyone is having fun. | "Espera, já estou indo!" Na festa, todo mundo está se divertindo.
`,
    glossary: "monday=segunda-feira; evening=noite (começo); miami=Miami (cidade dos EUA); mother=mãe; calls=liga / chamam; video=vídeo; hi=oi; bruna=Bruna (nome); so=então; time=tempo; where=onde; room=quarto; here=aqui; brothers=irmãos; home=casa; how=como; work=trabalho; brazil=Brasil; says=diz; there=aí / lá; sunny=ensolarado; internet=internet; bad=ruim; yes=sim; mom=mãe; comes=vem (comes in = entra); sorry=desculpa; need=preciso; books=livros; car=carro; sees=vê; man=homem; kitchen=cozinha; neighbor=vizinho; tom=Tom (nome); now=agora; ten=dez; door=porta; party=festa; next=próximo (next door = casa ao lado); you=você",
    questions: `
Com quem a Bruna mora este ano? | *Com a prima | Com a mãe | Sozinha
O que a Bruna está fazendo quando a mãe liga? | Estudando | *Fazendo o jantar | Assistindo TV
O que a prima está procurando? | O celular | *As chaves | O ônibus
O que está acontecendo com os preços no Brasil? | Estão caindo | *Estão subindo | Não mudam
`,
  }),

  week(19, 'Passado: o que eu fiz', 'A2', [
    'Usar o passado regular (-ed) e os irregulares mais comuns',
    'Fazer perguntas e negativas com did / didn\'t',
    'Usar was e were',
    'Contar o fim de semana para um colega',
  ], `
I worked late yesterday. | Eu trabalhei até tarde ontem. | I worked=Eu trabalhei; late=até tarde; yesterday=ontem | worked / work / works | Passado regular: verbo + "-ed".
I watched a movie last night. | Eu assisti um filme ontem à noite. | I watched=Eu assisti; a movie=um filme; last night=ontem à noite | watched / watch / washed
We went to the beach. | Nós fomos à praia. | We went=Nós fomos; to the beach=à praia | went / go / gone | "Go" é irregular: go → went.
I didn't sleep well. | Eu não dormi bem. | I didn't sleep=Eu não dormi; well=bem | didn't / don't / wasn't | Negativa no passado: didn't + verbo normal.
Did you have a good weekend? | Você teve um bom fim de semana? | Did you have=Você teve; a good weekend=um bom fim de semana | Did / Do / Was
Yes, I did. | Sim, tive. | Yes=Sim; I did=tive (fiz) | did / do / was
I bought a new phone. | Eu comprei um celular novo. | I bought=Eu comprei; a new phone=um celular novo | bought / brought / buy | Buy → bought (comprei). Bring → brought (trouxe).
She called me this morning. | Ela me ligou hoje de manhã. | She called=Ela ligou; me=me; this morning=hoje de manhã | called / call / cold
I saw your message. | Eu vi sua mensagem. | I saw=Eu vi; your message=sua mensagem | saw / see / seen
I forgot to call you. | Eu esqueci de te ligar. | I forgot=Eu esqueci; to call you=de te ligar | forgot / forget / forgotten
We had a great time. | Nós nos divertimos muito. | We had=Nós tivemos; a great time=um ótimo tempo (nos divertimos) | had / have / has
I was at home. | Eu estava em casa. | I was=Eu estava; at home=em casa | was / were / is
They were very tired. | Eles estavam muito cansados. | They were=Eles estavam; very tired=muito cansados | were / was / are
What did you do yesterday? | O que você fez ontem? | What did you do=O que você fez; yesterday=ontem | do / did / does | Na pergunta com "did", o verbo volta ao normal: what did you do.
I cleaned my room. | Eu limpei meu quarto. | I cleaned=Eu limpei; my room=meu quarto | cleaned / clean / cleans
I met an old friend. | Eu encontrei um velho amigo. | I met=Eu encontrei; an old friend=um velho amigo | met / meet / meat
It was amazing! | Foi incrível! | It was=Foi; amazing=incrível | was / were / is
I studied for two hours. | Eu estudei por duas horas. | I studied=Eu estudei; for two hours=por duas horas | studied / study / studies | Consoante + y: study → studied.
I came back on Sunday. | Eu voltei no domingo. | I came back=Eu voltei; on Sunday=no domingo | came / come / comes
How was your trip? | Como foi sua viagem? | How was=Como foi; your trip=sua viagem | trip / trap / tripe
`, {
    title: 'Monday Morning',
    titlePt: 'Segunda de manhã',
    sentences: `
It's Monday morning at the office. My coworker Jessica asks: "Did you have a good weekend?" "Yes, I did." | É segunda de manhã no escritório. Minha colega Jessica pergunta: "Você teve um bom fim de semana?" "Sim, tive."
"What did you do yesterday?" | "O que você fez ontem?"
"On Saturday, we went to the beach. It was amazing!" | "No sábado, nós fomos à praia. Foi incrível!"
"I met an old friend there. We had a great time." | "Eu encontrei um velho amigo lá. Nós nos divertimos muito."
"Yesterday I was at home. I cleaned my room, and I studied for two hours." | "Ontem eu estava em casa. Limpei meu quarto e estudei por duas horas."
"Then I watched a movie last night. And you? How was your trip?" | "Depois assisti um filme ontem à noite. E você? Como foi sua viagem?"
"Good, but long. I came back on Sunday. My kids? They were very tired." | "Boa, mas longa. Eu voltei no domingo. Meus filhos? Eles estavam muito cansados."
"And I didn't sleep well. I worked late yesterday, after the trip." | "E eu não dormi bem. Trabalhei até tarde ontem, depois da viagem."
"Oh, and look! I bought a new phone." | "Ah, e olha! Eu comprei um celular novo."
"Nice! By the way, did Ana call you?" "Yes, she called me this morning." | "Legal! Aliás, a Ana te ligou?" "Sim, ela me ligou hoje de manhã."
"Sorry, Jessica. I saw your message, but I forgot to call you." | "Desculpa, Jessica. Eu vi sua mensagem, mas esqueci de te ligar."
"No problem. Coffee?" "Yes, please!" | "Sem problema. Café?" "Sim, por favor!"
`,
    glossary: 'monday=segunda-feira; morning=manhã; office=escritório; coworker=colega de trabalho; jessica=Jessica (nome); asks=pergunta; saturday=sábado; there=lá; yesterday=ontem; then=depois; good=boa; but=mas; long=longa; kids=filhos / crianças; after=depois de; oh=ah; look=olha; nice=legal; by=(by the way = aliás); way=(by the way = aliás); ana=Ana (nome); call=ligar; sorry=desculpa; no=não / sem; problem=problema; coffee=café; please=por favor',
    questions: `
Aonde o narrador foi no sábado? | Ao shopping | *À praia | Ao trabalho
Quem o narrador encontrou? | A chefe | *Um velho amigo | A Jessica
Quando a Jessica voltou da viagem? | No sábado | *No domingo | Na segunda
O que a Jessica comprou? | Um computador | *Um celular novo | Uma passagem
`,
  }),

  week(20, 'Passado: contando histórias', 'A2', [
    'Contar uma história em ordem: first, then, after that, finally',
    'Usar "ago" e mais verbos irregulares',
    'Dar emoção: suddenly, I couldn\'t believe it',
    'Fechar a história: in the end, I\'ll never forget',
  ], `
Last year, I traveled to Chile. | No ano passado, eu viajei para o Chile. | Last year=No ano passado; I traveled=eu viajei; to Chile=para o Chile | traveled / travel / travels | Americano: traveled. Britânico: travelled.
It happened two years ago. | Aconteceu há dois anos. | It happened=Aconteceu; two years ago=há dois anos | ago / before / later | "Ago" vem depois do tempo: two years ago.
First, we took a taxi. | Primeiro, pegamos um táxi. | First=Primeiro; we took=pegamos; a taxi=um táxi | took / take / taken
Then, it started to rain. | Depois, começou a chover. | Then=Depois; it started=começou; to rain=a chover | started / start / starting
After that, we got lost. | Depois disso, nos perdemos. | After that=Depois disso; we got lost=nos perdemos | got / get / gotten
Suddenly, the lights went out. | De repente, as luzes apagaram. | Suddenly=De repente; the lights=as luzes; went out=apagaram | Suddenly / Sudden / Soon
I was so scared. | Eu fiquei com tanto medo. | I was=Eu fiquei; so scared=com tanto medo | scared / scary / scare | Scared = com medo. Scary = assustador.
Finally, we arrived at the hotel. | Finalmente, chegamos ao hotel. | Finally=Finalmente; we arrived=chegamos; at the hotel=ao hotel | arrived / arrive / arrives | "Arrive at" (lugar específico), "arrive in" (cidade, país).
We left early in the morning. | Saímos cedo de manhã. | We left=Saímos; early=cedo; in the morning=de manhã | left / leave / lift
I couldn't believe it! | Eu não conseguia acreditar! | I couldn't=Eu não conseguia; believe it=acreditar (nisso) | couldn't / can't / wouldn't
Nobody was there. | Não tinha ninguém lá. | Nobody=Ninguém; was there=estava lá | Nobody / Anybody / Somebody
We waited for an hour. | Esperamos por uma hora. | We waited=Esperamos; for an hour=por uma hora | hour / our / hours | Em "hour" o h é mudo, por isso "an hour".
A man helped us. | Um homem nos ajudou. | A man=Um homem; helped us=nos ajudou | helped / help / helps
He told us a funny story. | Ele nos contou uma história engraçada. | He told us=Ele nos contou; a funny story=uma história engraçada | told / tell / said
We laughed a lot. | Rimos muito. | We laughed=Rimos; a lot=muito | laughed / laugh / launched
In the end, everything was OK. | No fim, deu tudo certo. | In the end=No fim; everything=tudo; was OK=deu certo | end / and / ending
It was the best day of the trip. | Foi o melhor dia da viagem. | It was=Foi; the best day=o melhor dia; of the trip=da viagem | best / better / good
I'll never forget that day. | Nunca vou esquecer aquele dia. | I'll never=Nunca vou; forget=esquecer; that day=aquele dia | never / ever / every
What happened next? | O que aconteceu depois? | What happened=O que aconteceu; next=depois | happened / happen / happens
Let me tell you a story. | Deixa eu te contar uma história. | Let me=Deixa eu; tell you=te contar; a story=uma história | tell / say / talk
`, {
    title: 'A Night in Santiago',
    titlePt: 'Uma noite em Santiago',
    sentences: `
Let me tell you a story. Last year, I traveled to Chile again, but this story is from my first trip. | Deixa eu te contar uma história. No ano passado, eu viajei para o Chile de novo, mas esta história é da minha primeira viagem.
It happened two years ago. My friend and I arrived in Santiago at night. | Aconteceu há dois anos. Eu e meu amigo chegamos em Santiago à noite.
First, we took a taxi. Then, it started to rain. | Primeiro, pegamos um táxi. Depois, começou a chover.
The driver didn't speak English. After that, we got lost. | O motorista não falava inglês. Depois disso, nos perdemos.
Suddenly, the lights went out in the street. I was so scared. | De repente, as luzes da rua apagaram. Eu fiquei com tanto medo.
We stopped at a small store, but nobody was there. We waited for an hour. | Paramos numa lojinha, mas não tinha ninguém lá. Esperamos por uma hora.
"What happened next?" my sister always asks when I tell this story. | "O que aconteceu depois?", minha irmã sempre pergunta quando eu conto esta história.
A man helped us. He told us a funny story about tourists, and we laughed a lot. | Um homem nos ajudou. Ele nos contou uma história engraçada sobre turistas, e rimos muito.
Finally, we arrived at the hotel. I couldn't believe it! The hotel was next to the store. | Finalmente, chegamos ao hotel. Eu não conseguia acreditar! O hotel ficava ao lado da loja.
In the end, everything was OK. | No fim, deu tudo certo.
We left early in the morning to see the mountains. | Saímos cedo de manhã para ver as montanhas.
It was the best day of the trip. I'll never forget that day. | Foi o melhor dia da viagem. Nunca vou esquecer aquele dia.
`,
    glossary: 'again=de novo; but=mas; this=esta; story=história; first=primeira; trip=viagem; friend=amigo; arrived=chegamos; santiago=Santiago (capital do Chile); night=noite; driver=motorista; didn\'t=não; speak=falava; english=inglês; street=rua; stopped=paramos; small=pequena; store=loja; sister=irmã; always=sempre; asks=pergunta; when=quando; tell=conto; about=sobre; tourists=turistas; hotel=hotel; next=ao lado (next to); see=ver; mountains=montanhas',
    questions: `
Quando a história aconteceu? | No ano passado | *Há dois anos | Há cinco anos
O que aconteceu depois que começou a chover? | Eles chegaram ao hotel | *Eles se perderam | Eles pegaram um ônibus
Quanto tempo eles esperaram na loja? | Dez minutos | *Uma hora | A noite toda
Onde ficava o hotel? | Longe da loja | *Ao lado da loja | No centro
`,
  }),
]
