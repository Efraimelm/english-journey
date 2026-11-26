// Semanas 7–12: fim dos Fundamentos e começo da Vida cotidiana (A1). Formato em ./build.ts
import { week } from './build'

export const weeks07to12 = [
  week(7, 'Gostos e preferências', 'A1', [
    'Dizer do que gosta e do que não gosta (like, love, hate)',
    'Usar like + verbo-ing: I like playing',
    'Perguntar e responder curto: Do you like…? Yes, I do.',
    'Concordar com "me too" e "me neither"',
  ], `
I like music. | Eu gosto de música. | I like=Eu gosto de; music=música | like / likes / liking
I love pizza. | Eu amo pizza. | I love=Eu amo / adoro; pizza=pizza | love / loves / lovely | Para comida e coisas, "love" = adorar.
I don't like coffee. | Eu não gosto de café. | I don't like=Eu não gosto de; coffee=café | don't / doesn't / not
Do you like movies? | Você gosta de filmes? | Do you like=Você gosta de; movies=filmes | Do / Does / Are
Yes, I do. | Sim, gosto. | Yes=Sim; I do=gosto | do / am / like | Resposta curta: repita só o auxiliar. Não diga "Yes, I like".
My favorite color is blue. | Minha cor favorita é azul. | My favorite=Minha favorita; color=cor; is blue=é azul | favorite / favorites / favor | Americano: favorite, color. Britânico: favourite, colour.
I like playing soccer. | Eu gosto de jogar futebol. | I like=Eu gosto de; playing=jogar; soccer=futebol | playing / play / plays | Like + verbo-ing. Nos EUA, futebol é "soccer"; "football" é o futebol americano.
She likes dancing. | Ela gosta de dançar. | She likes=Ela gosta de; dancing=dançar | likes / like / liking | Com he, she, it: "like" vira "likes".
He doesn't like vegetables. | Ele não gosta de legumes. | He doesn't like=Ele não gosta de; vegetables=legumes / verduras | doesn't / don't / isn't
I hate waiting. | Eu odeio esperar. | I hate=Eu odeio; waiting=esperar | hate / hat / hates
I prefer tea. | Eu prefiro chá. | I prefer=Eu prefiro; tea=chá | prefer / prefers / proper
I'd like a glass of water. | Eu gostaria de um copo de água. | I'd like=Eu gostaria de; a glass of water=um copo de água | like / love / likes | "I'd like" (I would like) é o jeito educado de pedir.
What do you like to do? | O que você gosta de fazer? | What=O que; do you like=você gosta de; to do=fazer | What / Where / Who
I really like this song. | Eu gosto muito desta música. | I really like=Eu gosto muito de; this song=esta música | really / real / very | "Really" vem antes do verbo. Errado: "I like very much this song".
It's my favorite movie. | É o meu filme favorito. | It's=É; my favorite movie=meu filme favorito | movie / movies / move
I don't like it very much. | Eu não gosto muito disso. | I don't like it=Eu não gosto disso; very much=muito | much / many / more
We both like rock music. | Nós dois gostamos de rock. | We both=Nós dois; like=gostamos de; rock music=rock | both / together / two
What kind of music do you like? | Que tipo de música você gosta? | What kind of=Que tipo de; music=música; do you like=você gosta | kind / kid / kinds
Me too. | Eu também. | Me too=Eu também | too / to / two | Para concordar com uma frase positiva.
Me neither. | Eu também não. | Me neither=Eu também não | neither / either / never | Para concordar com uma frase negativa: "I don't like coffee." "Me neither."
`, {
    title: 'Likes and Dislikes',
    titlePt: 'Gostos e desgostos',
    sentences: `
My name is Lucas. I like music, and I love pizza. | Meu nome é Lucas. Eu gosto de música e amo pizza.
I don't like coffee. I prefer tea. | Eu não gosto de café. Eu prefiro chá.
I like playing soccer on the weekend. | Eu gosto de jogar futebol no fim de semana.
My sister Ana is fun. She likes dancing. | Minha irmã Ana é divertida. Ela gosta de dançar.
My brother is different. He doesn't like vegetables. | Meu irmão é diferente. Ele não gosta de legumes.
Today I am at a café with my new friend Amy. She is late. I hate waiting! | Hoje estou num café com minha nova amiga Amy. Ela está atrasada. Eu odeio esperar!
Amy arrives. "Sorry! So, what do you like to do?" | A Amy chega. "Desculpa! Então, o que você gosta de fazer?"
"I like playing soccer. Oh, listen! I really like this song." | "Eu gosto de jogar futebol. Ah, escuta! Eu gosto muito desta música."
"It's from Titanic. It's my favorite movie." | "É do Titanic. É o meu filme favorito."
"Really? I don't like it very much." | "Sério? Eu não gosto muito dele."
"OK! What kind of music do you like?" | "Tudo bem! Que tipo de música você gosta?"
"Rock." "I like rock too. And my favorite color is blue." | "Rock." "Eu também gosto de rock. E minha cor favorita é azul."
"Me too!" We both like rock music. | "Eu também!" Nós dois gostamos de rock.
"Do you like movies?" "Yes, I do." | "Você gosta de filmes?" "Sim, gosto."
The waiter asks: "Coffee?" Amy says: "No, I don't like coffee." | O garçom pergunta: "Café?" A Amy diz: "Não, eu não gosto de café."
"Me neither. I'd like a glass of water, please." | "Eu também não. Eu gostaria de um copo de água, por favor."
`,
    glossary: 'name=nome; lucas=Lucas (nome); ana=Ana (nome); amy=Amy (nome); sister=irmã; brother=irmão; fun=divertida; different=diferente; weekend=fim de semana; today=hoje; café=café (lugar); new=nova; friend=amiga; late=atrasada; arrives=chega; sorry=desculpa; so=então; listen=escuta; from=de; really=sério / muito; rock=rock; waiter=garçom; asks=pergunta; says=diz; please=por favor; blue=azul; tea=chá',
    questions: `
O que o Lucas prefere beber? | Café | *Chá | Suco
Quem gosta de dançar? | *A irmã do Lucas | A Amy | O irmão do Lucas
Qual é a cor favorita da Amy? | Preta | Vermelha | *Azul
O que o Lucas pede no final? | Um café | *Um copo de água | Um chá
`,
  }),

  week(8, 'Revisão dos fundamentos', 'A1', [
    'Apresentar-se do começo ao fim: nome, idade, origem e família',
    'Soletrar e trocar telefone',
    'Contar a rotina com frequência (usually, during the week)',
    'Juntar tudo numa conversa com um vizinho novo',
  ], `
Let me introduce myself. | Deixa eu me apresentar. | Let me=Deixa eu; introduce myself=me apresentar | introduce / introduces / produce
I'm thirty years old. | Eu tenho trinta anos. | I'm=Eu tenho (eu sou); thirty=trinta; years old=anos | years / year / ears | Idade usa "be": I am thirty. Errado: "I have thirty years".
I have one brother and two sisters. | Eu tenho um irmão e duas irmãs. | I have=Eu tenho; one brother=um irmão; and two sisters=e duas irmãs | sisters / sister / cousins
My mother is a teacher. | Minha mãe é professora. | My mother=Minha mãe; is=é; a teacher=professora | a / an / the | Profissão leva "a" ou "an": she is a teacher, he is an engineer.
We live in a small house. | Nós moramos em uma casa pequena. | We live=Nós moramos; in a small house=em uma casa pequena | live / lives / living
I get up early during the week. | Eu levanto cedo durante a semana. | I get up=Eu levanto; early=cedo; during the week=durante a semana | early / earlier / earth
I usually have lunch at work. | Eu geralmente almoço no trabalho. | I usually=Eu geralmente; have lunch=almoço; at work=no trabalho | usually / usual / use
On weekends, I see my family. | Nos fins de semana, eu vejo minha família. | On weekends=Nos fins de semana; I see=eu vejo; my family=minha família | weekends / weekend / weeks
What's your phone number? | Qual é o seu número de telefone? | What's=Qual é; your phone number=o seu número de telefone | number / numbers / name
Can you spell your name? | Você pode soletrar seu nome? | Can you=Você pode; spell=soletrar; your name=seu nome | spell / spill / spelled
How do you spell that? | Como se escreve isso? | How=Como; do you spell=se soletra; that=isso | spell / say / tell
Where are you from? | De onde você é? | Where=Onde; are you=você é; from=de | from / for / to | A preposição "from" vai no fim da pergunta.
I'm from Brazil. | Eu sou do Brasil. | I'm from=Eu sou de; Brazil=Brasil | from / of / in
How old is your brother? | Quantos anos tem seu irmão? | How old=Quantos anos; is your brother=tem seu irmão | old / age / older
He is younger than me. | Ele é mais novo que eu. | He is=Ele é; younger=mais novo; than me=que eu | younger / young / youngest | Adjetivo curto + "-er" + "than" = mais… que.
I'm not busy right now. | Não estou ocupado agora. | I'm not=Não estou; busy=ocupado; right now=agora | right / write / light
There is a park near my house. | Tem um parque perto da minha casa. | There is=Tem; a park=um parque; near my house=perto da minha casa | near / next / nearly
I'm tired, so I go to bed early. | Estou cansado, então vou dormir cedo. | I'm tired=Estou cansado; so=então; I go to bed=vou dormir; early=cedo | so / but / because
Nice to meet you too. | Prazer em te conhecer também. | Nice to meet you=Prazer em te conhecer; too=também | meet / meat / met
Let's keep in touch. | Vamos manter contato. | Let's=Vamos; keep in touch=manter contato | touch / touches / teach
`, {
    title: 'The New Neighbor',
    titlePt: 'A vizinha nova',
    sentences: `
"Hi! I'm Kate, your new neighbor." | "Oi! Eu sou a Kate, sua vizinha nova."
"Hi, Kate. Let me introduce myself. I'm Diego, and I'm thirty years old." | "Oi, Kate. Deixa eu me apresentar. Eu sou o Diego e tenho trinta anos."
"Where are you from?" "I'm from Brazil." | "De onde você é?" "Eu sou do Brasil."
"I have one brother and two sisters. My mother is a teacher." | "Eu tenho um irmão e duas irmãs. Minha mãe é professora."
"In Brazil, we live in a small house." | "No Brasil, nós moramos em uma casa pequena."
"How old is your brother?" "He is younger than me." | "Quantos anos tem seu irmão?" "Ele é mais novo que eu."
"Can you spell your name?" "D-I-E-G-O." | "Você pode soletrar seu nome?" "D-I-E-G-O."
"And your last name? How do you spell that?" | "E o seu sobrenome? Como se escreve isso?"
"I get up early during the week. I usually have lunch at work." | "Eu levanto cedo durante a semana. Geralmente almoço no trabalho."
"On weekends, I see my family on video." | "Nos fins de semana, eu vejo minha família por vídeo."
"There is a park near my house. Do you want to walk?" | "Tem um parque perto da minha casa. Você quer caminhar?"
"Sure, I'm not busy right now." | "Claro, não estou ocupado agora."
After the walk, Diego says: "I'm tired, so I go to bed early." | Depois da caminhada, o Diego diz: "Estou cansado, então vou dormir cedo."
"What's your phone number?" "Here it is. Let's keep in touch." | "Qual é o seu número de telefone?" "Aqui está. Vamos manter contato."
"Nice to meet you, Kate." "Nice to meet you too." | "Prazer em te conhecer, Kate." "Prazer em te conhecer também."
`,
    glossary: 'hi=oi; kate=Kate (nome); diego=Diego (nome); new=nova; neighbor=vizinha(o); last=último; walk=caminhar / caminhada; want=quer; sure=claro; after=depois de; says=diz; here=aqui; video=vídeo; and=e; mother=mãe; teacher=professora; park=parque',
    questions: `
De onde o Diego é? | *Do Brasil | Dos EUA | De Portugal
Quantos anos o Diego tem? | Vinte | *Trinta | Quarenta
O que tem perto da casa da Kate? | Uma escola | *Um parque | Um mercado
Quem é mais novo? | O Diego | *O irmão do Diego | A Kate
`,
  }),

  week(9, 'Comida e bebida', 'A1', [
    'Dizer que está com fome, sede ou satisfeito',
    'Falar do que come e bebe (a lot of, some)',
    'Comentar a comida: delicious, too salty',
    'Oferecer e recusar com educação',
  ], `
I'm hungry. | Estou com fome. | I'm hungry=Estou com fome | hungry / angry / hunger | Fome e sede usam "be": I'm hungry, I'm thirsty.
I'm thirsty. | Estou com sede. | I'm thirsty=Estou com sede | thirsty / thirty / dirty
I eat rice and beans every day. | Eu como arroz e feijão todo dia. | I eat=Eu como; rice and beans=arroz e feijão; every day=todo dia | eat / eats / ate
I drink a lot of water. | Eu bebo muita água. | I drink=Eu bebo; a lot of water=muita água | lot / lots / little
What's for dinner? | O que tem para o jantar? | What's=O que tem; for dinner=para o jantar | for / to / of
Chicken and salad. | Frango e salada. | Chicken=Frango; and salad=e salada | Chicken / Kitchen / Chickens
I'm on a diet. | Estou de dieta. | I'm on=Estou de; a diet=dieta | on / in / at
This is delicious! | Isto está delicioso! | This is=Isto está; delicious=delicioso | delicious / delicate / delight
It's too salty. | Está salgado demais. | It's=Está; too salty=salgado demais | too / to / two | "Too" = demais (um problema). "Very" = muito.
Can I have some more? | Posso pegar mais um pouco? | Can I have=Posso pegar; some more=mais um pouco | more / most / much
I don't eat meat. | Eu não como carne. | I don't eat=Eu não como; meat=carne | meat / meet / meal
I'm allergic to peanuts. | Sou alérgico a amendoim. | I'm allergic=Sou alérgico; to peanuts=a amendoim | to / of / with
Do you want some juice? | Você quer um pouco de suco? | Do you want=Você quer; some juice=um pouco de suco | some / any / many | Em ofertas e pedidos, use "some" mesmo na pergunta.
No, thanks. I'm full. | Não, obrigado. Estou satisfeito. | No, thanks=Não, obrigado; I'm full=Estou satisfeito | full / fill / fool
I usually skip breakfast. | Eu geralmente pulo o café da manhã. | I usually skip=Eu geralmente pulo; breakfast=o café da manhã | skip / ship / skips
Let's eat out tonight. | Vamos comer fora hoje à noite. | Let's eat out=Vamos comer fora; tonight=hoje à noite | out / off / up
I can cook pasta. | Eu sei fazer macarrão. | I can cook=Eu sei cozinhar; pasta=macarrão | can / could / am | "Can" = saber fazer ou conseguir.
The food is ready. | A comida está pronta. | The food=A comida; is ready=está pronta | ready / read / already
Enjoy your meal! | Bom apetite! | Enjoy=Aproveite; your meal=sua refeição | meal / meat / mail
How much sugar do you want? | Quanto açúcar você quer? | How much=Quanto; sugar=açúcar; do you want=você quer | much / many / more | "How much" para o que não se conta (sugar, water). "How many" para o que se conta.
`, {
    title: 'Dinner at Home',
    titlePt: 'Jantar em casa',
    sentences: `
It's seven o'clock. Paula comes home from work. | São sete horas. A Paula chega do trabalho.
"I'm hungry. What's for dinner?" | "Estou com fome. O que tem para o jantar?"
"Let's eat out tonight!" she says. | "Vamos comer fora hoje à noite!", ela diz.
Rob answers: "No. Chicken and salad. I'm on a diet." | O Rob responde: "Não. Frango e salada. Estou de dieta."
"OK. I'm thirsty too. I drink a lot of water." | "Tá bom. Estou com sede também. Eu bebo muita água."
"Do you want some juice? How much sugar do you want?" | "Você quer um pouco de suco? Quanto açúcar você quer?"
"No sugar, please." | "Sem açúcar, por favor."
"The food is ready. Enjoy your meal!" | "A comida está pronta. Bom apetite!"
"This is delicious! But it's too salty." | "Isto está delicioso! Mas está salgado demais."
"Sorry! Tomorrow I can cook pasta." | "Desculpa! Amanhã eu sei fazer macarrão."
"In Brazil, I eat rice and beans every day." | "No Brasil, eu como arroz e feijão todo dia."
Rob says: "My friend Mike always says: 'I don't eat meat, and I'm allergic to peanuts.'" | O Rob diz: "Meu amigo Mike sempre diz: 'Eu não como carne e sou alérgico a amendoim.'"
"Can I have some more?" "Sure." | "Posso pegar mais um pouco?" "Claro."
Ten minutes later: "No, thanks. I'm full." | Dez minutos depois: "Não, obrigada. Estou satisfeita."
"I usually skip breakfast, so I'm always hungry at night." | "Eu geralmente pulo o café da manhã, então sempre estou com fome à noite."
`,
    glossary: "paula=Paula (nome); rob=Rob (nome); mike=Mike (nome); comes=chega / vem; home=casa; from=de; work=trabalho; says=diz; answers=responde; ok=tá bom; too=também / demais; please=por favor; but=mas; sorry=desculpa; tomorrow=amanhã; brazil=Brasil; friend=amigo; always=sempre; sure=claro; minutes=minutos; later=depois; so=então; night=noite; seven=sete; o'clock=horas",
    questions: `
O que tem para o jantar? | Pizza | *Frango e salada | Arroz e feijão
Qual é o problema da comida? | Está fria | *Está salgada demais | Está doce
Quem é alérgico a amendoim? | *O Mike | A Paula | O Rob
Por que a Paula está com fome à noite? | Ela não almoça | *Ela pula o café da manhã | Ela está de dieta
`,
  }),

  week(10, 'No supermercado', 'A1', [
    'Encontrar produtos e perguntar o preço',
    'Usar some e any (Do you have any…?)',
    'Pagar: cash, card, bag, receipt',
    'Entender medidas dos EUA (dollars, pounds)',
  ], `
I need to go to the supermarket. | Preciso ir ao supermercado. | I need to=Preciso; go to the supermarket=ir ao supermercado | need / needs / knee
We need milk and eggs. | Precisamos de leite e ovos. | We need=Precisamos de; milk and eggs=leite e ovos | eggs / egg / legs
Where is the bread? | Onde fica o pão? | Where is=Onde fica; the bread=o pão | bread / breed / brad
It's in aisle five. | Fica no corredor cinco. | It's in=Fica no; aisle five=corredor cinco | aisle / isle / all | "Aisle" se pronuncia "ail": o s é mudo.
How much is this? | Quanto custa isto? | How much=Quanto; is this=custa isto | much / many / more
It's three dollars. | Custa três dólares. | It's=Custa (é); three dollars=três dólares | dollars / dollar / doors
That's cheap! | Que barato! | That's=Isso é / Que; cheap=barato | cheap / chip / chef
That's too expensive. | Isso é caro demais. | That's=Isso é; too expensive=caro demais | expensive / expensively / extensive
Do you have any apples? | Vocês têm maçãs? | Do you have=Vocês têm; any apples=maçãs (alguma) | any / some / many | Em perguntas comuns e em negativas, use "any".
We don't have any bananas. | Não temos bananas. | We don't have=Não temos; any bananas=nenhuma banana | any / some / no
I'll take two. | Vou levar dois. | I'll take=Vou levar; two=dois | take / takes / took
Can I pay by card? | Posso pagar com cartão? | Can I pay=Posso pagar; by card=com cartão | by / with / in
Cash or credit? | Dinheiro ou crédito? | Cash=Dinheiro; or credit=ou crédito | Cash / Catch / Cache
Do you need a bag? | Você precisa de sacola? | Do you need=Você precisa de; a bag=uma sacola | bag / back / big
Here is your receipt. | Aqui está seu recibo. | Here is=Aqui está; your receipt=seu recibo | receipt / recipe / receive | Em "receipt" o p é mudo: "ri-SIIT".
A bottle of water, please. | Uma garrafa de água, por favor. | A bottle of=Uma garrafa de; water=água; please=por favor | bottle / battle / bottom
Two pounds of tomatoes. | Duas libras de tomate (quase 1 kg). | Two pounds of=Duas libras de; tomatoes=tomates | pounds / points / pound | Nos EUA, peso é em libras: 1 pound ≈ 450 g.
Is it on sale? | Está em promoção? | Is it=Está; on sale=em promoção | sale / sell / sail
The line is long. | A fila está grande. | The line=A fila; is long=está grande | line / lime / lane | Americano: line. Britânico: queue.
I forgot my shopping list. | Esqueci minha lista de compras. | I forgot=Esqueci; my shopping list=minha lista de compras | forgot / forget / forgets
`, {
    title: 'At the Supermarket',
    titlePt: 'No supermercado',
    sentences: `
It's Saturday morning. "We need milk and eggs," says my roommate Jen. | É sábado de manhã. "Precisamos de leite e ovos", diz minha colega de apartamento Jen.
OK, I need to go to the supermarket. | Tá, preciso ir ao supermercado.
At the supermarket, I see a problem: I forgot my shopping list! | No supermercado, vejo um problema: esqueci minha lista de compras!
I ask an employee: "Excuse me, where is the bread?" "It's in aisle five." | Pergunto a um funcionário: "Com licença, onde fica o pão?" "Fica no corredor cinco."
In aisle five, there is olive oil. "How much is this?" "It's three dollars." "That's cheap!" | No corredor cinco, tem azeite. "Quanto custa isto?" "Custa três dólares." "Que barato!"
Then I see cheese for twelve dollars. That's too expensive. "Is it on sale?" "No, sorry." | Depois vejo um queijo de doze dólares. Isso é caro demais. "Está em promoção?" "Não, desculpe."
"Do you have any apples?" "Yes, here." "Great. I'll take two." | "Vocês têm maçãs?" "Sim, aqui." "Ótimo. Vou levar duas."
"And bananas?" "We don't have any bananas today." | "E bananas?" "Não temos bananas hoje."
I also buy two pounds of tomatoes. | Também compro duas libras de tomate.
The line is long, but I wait. | A fila está grande, mas eu espero.
"Cash or credit?" "Can I pay by card?" "Sure. Do you need a bag?" "Yes, please." | "Dinheiro ou crédito?" "Posso pagar com cartão?" "Claro. Você precisa de sacola?" "Sim, por favor."
"Oh, and a bottle of water, please." | "Ah, e uma garrafa de água, por favor."
"Here is your receipt. Have a nice day!" | "Aqui está seu recibo. Tenha um bom dia!"
`,
    glossary: "saturday=sábado; morning=manhã; says=diz; roommate=colega de apartamento; jen=Jen (nome); see=vejo; problem=problema; ask=pergunto; employee=funcionário; excuse=com licença (excuse me); there=lá (there is = tem); olive=oliva; oil=óleo (olive oil = azeite); then=depois; cheese=queijo; twelve=doze; sorry=desculpe; yes=sim; here=aqui; great=ótimo; today=hoje; also=também; buy=compro; wait=espero; sure=claro; oh=ah; have=tenha; nice=bom; day=dia",
    questions: `
O que a narradora esqueceu? | O cartão | *A lista de compras | A sacola
Onde fica o pão? | *No corredor cinco | No corredor três | Perto do caixa
Quanto custa o azeite? | *Três dólares | Doze dólares | Cinco dólares
Como ela paga? | Em dinheiro | *Com cartão | Não paga
`,
  }),

  week(11, 'Roupas e compras', 'A1', [
    'Experimentar roupas e pedir outro tamanho',
    'Usar "wear" para roupa (nunca "use")',
    'Perguntar preço, desconto, troca e devolução',
    'Elogiar: it looks good on you',
  ], `
I'm just looking, thanks. | Só estou olhando, obrigado. | I'm just looking=Só estou olhando; thanks=obrigado | looking / seeing / watching
Can I try this on? | Posso experimentar isto? | Can I=Posso; try this on=experimentar isto | on / in / at | "Try on" = experimentar roupa. O "on" vai no fim.
Where is the fitting room? | Onde fica o provador? | Where is=Onde fica; the fitting room=o provador | fitting / fighting / sitting
What size are you? | Qual é o seu tamanho? | What size=Qual tamanho; are you=você usa | size / side / sight
I'm a medium. | Eu uso M. | I'm=Eu uso (eu sou); a medium=médio (M) | medium / middle / media | Small (P), medium (M), large (G).
It's too small. | Está pequeno demais. | It's=Está; too small=pequeno demais | small / tall / smell
Do you have a bigger size? | Vocês têm um tamanho maior? | Do you have=Vocês têm; a bigger size=um tamanho maior | bigger / biggest / big
Do you have it in black? | Vocês têm em preto? | Do you have it=Vocês têm (isso); in black=em preto | in / on / at
These shoes are comfortable. | Estes sapatos são confortáveis. | These shoes=Estes sapatos; are comfortable=são confortáveis | comfortable / comfort / confortable
I'm wearing jeans today. | Estou usando calça jeans hoje. | I'm wearing=Estou usando (vestindo); jeans=calça jeans; today=hoje | wearing / using / carrying | Para roupa, use "wear", nunca "use".
This shirt looks good on you. | Esta camisa fica bem em você. | This shirt=Esta camisa; looks good=fica bem; on you=em você | looks / look / sees
I need a jacket for the winter. | Preciso de uma jaqueta para o inverno. | I need=Preciso de; a jacket=uma jaqueta; for the winter=para o inverno | jacket / jack / packet
How much are these? | Quanto custam estes? | How much=Quanto; are these=custam estes | are / is / am
There's a discount. | Tem desconto. | There's=Tem; a discount=um desconto | discount / count / account
It's fifty percent off. | Está com cinquenta por cento de desconto. | It's=Está com; fifty percent off=cinquenta por cento de desconto | off / of / on
I'll take it. | Vou levar. | I'll take=Vou levar; it=isso | take / takes / took
Can I return it? | Posso devolver? | Can I=Posso; return=devolver; it=isso | return / turn / returns
I want to exchange this. | Quero trocar isto. | I want to=Quero; exchange=trocar; this=isto | exchange / change / charge
The store opens at ten. | A loja abre às dez. | The store=A loja; opens=abre; at ten=às dez | opens / open / opened
I love shopping. | Eu adoro fazer compras. | I love=Eu adoro; shopping=fazer compras | shopping / shop / shipping
`, {
    title: 'A New Jacket',
    titlePt: 'Uma jaqueta nova',
    sentences: `
It's cold, and I need a jacket for the winter. | Está frio, e eu preciso de uma jaqueta para o inverno.
The store opens at ten. I'm the first customer! I love shopping. | A loja abre às dez. Sou o primeiro cliente! Eu adoro fazer compras.
"Can I help you?" "I'm just looking, thanks." | "Posso ajudar?" "Só estou olhando, obrigado."
Then I see a black jacket. "Can I try this on?" | Depois vejo uma jaqueta preta. "Posso experimentar isto?"
"Sure. What size are you?" "I'm a medium." | "Claro. Qual é o seu tamanho?" "Eu uso M."
"Where is the fitting room?" "Over there." | "Onde fica o provador?" "Ali."
It's too small. "Do you have a bigger size?" | Está pequeno demais. "Vocês têm um tamanho maior?"
The large is perfect. My friend Lia says: "Try this shirt too!" | O G fica perfeito. Minha amiga Lia diz: "Experimenta esta camisa também!"
"This shirt looks good on you." | "Esta camisa fica bem em você."
"How much are these?" "There's a discount. It's fifty percent off." | "Quanto custam estes?" "Tem desconto. Está com cinquenta por cento de desconto."
"I'll take it." I'm wearing jeans today, so the jacket is perfect. | "Vou levar." Estou usando calça jeans hoje, então a jaqueta fica perfeita.
"Can I return it?" "Yes, in thirty days." | "Posso devolver?" "Sim, em trinta dias."
Lia tries shoes. "These shoes are comfortable." | A Lia experimenta sapatos. "Estes sapatos são confortáveis."
Then she sees a red bag. "I like this bag. Do you have it in black?" | Depois ela vê uma bolsa vermelha. "Eu gosto desta bolsa. Vocês têm em preto?"
One week later, Lia comes back to the store: "I want to exchange this." | Uma semana depois, a Lia volta à loja: "Quero trocar isto."
`,
    glossary: 'cold=frio; first=primeiro; customer=cliente; help=ajudar; then=depois; see=vejo; sees=vê; black=preta; sure=claro; over=lá (over there = ali); there=lá; large=grande (G); perfect=perfeito; friend=amiga; lia=Lia (nome); says=diz; try=experimenta; tries=experimenta; too=também / demais; so=então; yes=sim; thirty=trinta; days=dias; red=vermelha; bag=bolsa; like=gosto; one=uma; week=semana; later=depois; comes=vem (comes back = volta); back=de volta',
    questions: `
Que horas a loja abre? | Às nove | *Às dez | Às onze
Qual tamanho fica bom na jaqueta? | Médio | Pequeno | *Grande
Qual é o desconto? | Dez por cento | *Cinquenta por cento | Não tem desconto
O que a Lia quer fazer uma semana depois? | Devolver os sapatos | *Trocar algo | Comprar uma jaqueta
`,
  }),

  week(12, 'Lugares na cidade', 'A1', [
    'Dizer o que tem na cidade (there is, there are)',
    'Localizar lugares: on the corner, across the street, downtown',
    'Perguntar se é perto ou longe',
    'Marcar um ponto de encontro',
  ], `
There is a bank on this street. | Tem um banco nesta rua. | There is=Tem; a bank=um banco; on this street=nesta rua | on / in / at | Rua usa "on": on Main Street.
Is there a pharmacy near here? | Tem uma farmácia aqui perto? | Is there=Tem; a pharmacy=uma farmácia; near here=aqui perto | near / next / nearly
The post office is closed. | Os correios estão fechados. | The post office=Os correios; is closed=estão fechados | closed / close / clothes
I'm going to the library. | Estou indo à biblioteca. | I'm going=Estou indo; to the library=à biblioteca | library / librarian / liberty | Library = biblioteca. Livraria é "bookstore".
The hospital is downtown. | O hospital fica no centro. | The hospital=O hospital; is downtown=fica no centro | downtown / town / down
Where can I park? | Onde posso estacionar? | Where=Onde; can I park=posso estacionar | park / pack / parks
The mall is very big. | O shopping é muito grande. | The mall=O shopping; is very big=é muito grande | mall / mail / malls | Nos EUA, shopping center é "mall".
Let's meet at the coffee shop. | Vamos nos encontrar na cafeteria. | Let's meet=Vamos nos encontrar; at the coffee shop=na cafeteria | at / in / on
My office is in this building. | Meu escritório fica neste prédio. | My office=Meu escritório; is in this building=fica neste prédio | building / build / billing
The school is across the street. | A escola fica do outro lado da rua. | The school=A escola; is across the street=fica do outro lado da rua | across / cross / above
There are many restaurants downtown. | Tem muitos restaurantes no centro. | There are=Tem; many restaurants=muitos restaurantes; downtown=no centro | many / much / more
I live in a quiet neighborhood. | Eu moro em um bairro tranquilo. | I live=Eu moro; in a quiet neighborhood=em um bairro tranquilo | neighborhood / neighbor / neighbors
The church is on the corner. | A igreja fica na esquina. | The church=A igreja; is on the corner=fica na esquina | corner / corn / cover
I go to church on Sundays. | Eu vou à igreja aos domingos. | I go to church=Eu vou à igreja; on Sundays=aos domingos | church / churches / chair | "Go to church" sem "the" quando é para o culto.
The gym opens at six. | A academia abre às seis. | The gym=A academia; opens=abre; at six=às seis | gym / jim / gyms
Is it far from here? | É longe daqui? | Is it=É; far from here=longe daqui | far / for / fat
No, it's very close. | Não, é bem perto. | No=Não; it's very close=é bem perto | close / clothes / closed | Aqui "close" (perto) tem som de "s": clôuss.
The city is beautiful at night. | A cidade é linda à noite. | The city=A cidade; is beautiful=é linda; at night=à noite | beautiful / beauty / beautifully
There is a lot of traffic. | Tem muito trânsito. | There is=Tem; a lot of traffic=muito trânsito | traffic / traffics / graphic
I love this city. | Eu amo esta cidade. | I love=Eu amo; this city=esta cidade | city / cities / site
`, {
    title: 'My City',
    titlePt: 'A minha cidade',
    sentences: `
My name is Rafael, and I live in Austin, Texas. I live in a quiet neighborhood. | Meu nome é Rafael e eu moro em Austin, no Texas. Eu moro em um bairro tranquilo.
There is a bank on this street, and the school is across the street. | Tem um banco nesta rua, e a escola fica do outro lado da rua.
Look at this photo. My office is in this building. | Olha esta foto. Meu escritório fica neste prédio.
There are many restaurants downtown. The mall is very big. | Tem muitos restaurantes no centro. O shopping é muito grande.
But there is a lot of traffic. | Mas tem muito trânsito.
The gym opens at six, and I go before work. | A academia abre às seis, e eu vou antes do trabalho.
The church is on the corner. I go to church on Sundays. | A igreja fica na esquina. Eu vou à igreja aos domingos.
The hospital is downtown too. | O hospital também fica no centro.
Today my friend Bia visits. She asks: "Is there a pharmacy near here?" | Hoje minha amiga Bia me visita. Ela pergunta: "Tem uma farmácia aqui perto?"
"Yes, on Oak Street." "Is it far from here?" "No, it's very close." | "Tem, na Oak Street." "É longe daqui?" "Não, é bem perto."
"I need to send a letter, but the post office is closed." | "Preciso mandar uma carta, mas os correios estão fechados."
"OK. I'm going to the library. Let's meet at the coffee shop at four." | "Tá. Estou indo à biblioteca. Vamos nos encontrar na cafeteria às quatro."
At four, Bia drives to the coffee shop. "Where can I park?" | Às quatro, a Bia dirige até a cafeteria. "Onde posso estacionar?"
At night, we walk downtown. The city is beautiful at night. I love this city. | À noite, caminhamos pelo centro. A cidade é linda à noite. Eu amo esta cidade.
`,
    glossary: 'name=nome; rafael=Rafael (nome); austin=Austin (cidade); texas=Texas (estado dos EUA); bia=Bia (nome); look=olha; photo=foto; but=mas; before=antes de; work=trabalho; too=também; today=hoje; friend=amiga; visits=visita; asks=pergunta; yes=sim; oak=carvalho (nome da rua); street=rua; need=preciso; send=mandar; letter=carta; four=quatro; drives=dirige; walk=caminhamos; we=nós',
    questions: `
Onde o Rafael mora? | Em um bairro barulhento | *Em um bairro tranquilo | No centro
O que fica na esquina? | O banco | *A igreja | A escola
Onde o Rafael e a Bia vão se encontrar? | Na biblioteca | *Na cafeteria | No shopping
O que está fechado? | A farmácia | A academia | *Os correios
`,
  }),
]
