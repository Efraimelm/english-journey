// Plus para o trabalho: o inglês de quem trabalha com SAP SD/MM e as respostas de entrevista.
// Frases curtas, no nível A2, para decorar e falar em voz alta. Inglês americano.
import type { PlusPattern, PlusWord } from './plus'

const p = (form: string, pt: string, lines: string): PlusPattern => ({
  form,
  pt,
  ex: lines.trim().split('\n').map((l) => {
    const [en, pt] = l.split('|')
    return { en: en.trim(), pt: pt.trim() }
  }),
})
const w = (id: string, en: string, pt: string, patterns: PlusPattern[], tip?: string): PlusWord => ({ id, en, pt, patterns, tip })

// ---------------- Inglês do SAP ----------------

export const SAP_WORK: PlusWord[] = [
  w('sap-create', 'Create', 'Criar', [
    p('I created + documento + in + transação', 'Contar o que você fez no sistema', `
I created a sales order in VA01. | Eu criei uma ordem de venda na VA01.
I created the delivery in VL01N. | Eu criei a remessa na VL01N.
I created a new condition type. | Eu criei um novo tipo de condição.`),
    p('Can you create…?', 'Pedir para alguém criar', `
Can you create a test customer? | Você pode criar um cliente de teste?
Can you create the invoice for this order? | Você pode criar a fatura desta ordem?`),
  ], 'Documentos do SD em inglês: sales order (ordem de venda), delivery (remessa), invoice / billing document (fatura).'),

  w('sap-check', 'Check', 'Verificar / Conferir', [
    p('Let me check + …', 'Ganhar tempo numa reunião ou chamada', `
Let me check the document flow. | Deixa eu verificar o fluxo de documentos.
Let me check the pricing. | Deixa eu conferir o preço.
Let me check and get back to you. | Deixa eu verificar e te retorno.`),
    p('I checked + … and …', 'Explicar o que você já investigou', `
I checked the table and the data is correct. | Eu conferi a tabela e os dados estão certos.
I checked the stock in MMBE. | Eu verifiquei o estoque na MMBE.`),
  ], '"Get back to you" = te dar um retorno. Muito usado com clientes e no suporte.'),

  w('sap-blocked', 'Blocked', 'Bloqueado(a)', [
    p('The + documento + is blocked for + …', 'Descrever um bloqueio', `
The order is blocked for delivery. | A ordem está bloqueada para remessa.
The order is blocked for billing. | A ordem está bloqueada para faturamento.
The customer is blocked because of credit. | O cliente está bloqueado por crédito.`),
    p('remove / release the block', 'Liberar', `
I removed the billing block. | Eu tirei o bloqueio de faturamento.
The credit team released the order. | O time de crédito liberou a ordem.`),
  ]),

  w('sap-issue', 'Issue', 'Problema / Chamado', [
    p('There is an issue with + …', 'Abrir ou relatar um problema', `
There is an issue with the delivery. | Tem um problema com a remessa.
The user reported an issue in production. | O usuário relatou um problema em produção.
What is the issue? | Qual é o problema?`),
    p('The issue is + fixed / solved', 'Fechar o chamado', `
The issue is fixed. | O problema está corrigido.
I'm working on the ticket now. | Estou trabalhando no chamado agora.
I closed the ticket this morning. | Eu fechei o chamado hoje de manhã.`),
  ], 'No suporte (AMS), "issue" e "ticket" aparecem o dia inteiro.'),

  w('sap-because', 'Because', 'Porque (a causa)', [
    p('… was not + verbo + because …', 'Explicar a causa raiz de um erro', `
The delivery was not created because there is no stock. | A remessa não foi criada porque não tem estoque.
The price is zero because the condition record is missing. | O preço está zerado porque falta o registro de condição.
The invoice was not posted because the period is closed. | A fatura não foi lançada porque o período está fechado.`),
  ], 'Esta estrutura resolve metade das conversas de suporte: o que aconteceu + because + a causa.'),

  w('sap-price', 'Price', 'Preço', [
    p('The price comes from + …', 'Explicar a determinação de preço', `
The price comes from the condition record. | O preço vem do registro de condição.
The discount comes from condition type K005. | O desconto vem do tipo de condição K005.
The pricing procedure is RVAA01. | O esquema de cálculo é o RVAA01.`),
  ], 'Pricing procedure = esquema de cálculo · condition type = tipo de condição · access sequence = sequência de acesso.'),

  w('sap-post', 'Post', 'Lançar / Contabilizar', [
    p('… was posted', 'Movimento de estoque e contabilidade', `
The goods issue was posted. | A saída de mercadoria foi lançada.
The goods receipt was posted in MIGO. | A entrada de mercadoria foi lançada na MIGO.
The invoice is posted to accounting. | A fatura é lançada na contabilidade.`),
  ], 'Goods issue = saída de mercadoria · goods receipt = entrada de mercadoria.'),

  w('sap-test', 'Test', 'Testar', [
    p('I tested + … in + ambiente', 'Falar de testes', `
I tested the scenario in QAS. | Eu testei o cenário em QAS.
It works in QAS, but not in production. | Funciona em QAS, mas não em produção.
Can you test it again, please? | Você pode testar de novo, por favor?`),
  ]),

  w('sap-process', 'Process', 'Processo', [
    p('The process starts with + … and ends with + …', 'Explicar um processo de ponta a ponta', `
The order-to-cash process starts with the sales order. | O processo order-to-cash começa com a ordem de venda.
Then we create the delivery and post the goods issue. | Depois criamos a remessa e lançamos a saída de mercadoria.
It ends with the invoice and the payment. | Termina com a fatura e o pagamento.`),
  ], 'Treine estas três frases juntas: é o Order-to-Cash em 15 segundos.'),

  w('sap-meeting', 'Meeting', 'Reunião', [
    p('Frases para sobreviver a uma reunião', 'Quando você não entendeu ou precisa de tempo', `
Could you repeat that, please? | Você poderia repetir, por favor?
Could you speak more slowly, please? | Você poderia falar mais devagar, por favor?
Let me share my screen. | Deixa eu compartilhar minha tela.
I will send you an email with the details. | Vou te mandar um e-mail com os detalhes.`),
  ], 'Pedir para repetir é normal e profissional. Ficar calado é pior.'),
]

// ---------------- Entrevista ----------------

export const INTERVIEW: PlusWord[] = [
  w('int-about', 'Tell me about yourself', 'Fale sobre você', [
    p('Seu pitch em 4 frases', 'A primeira pergunta de quase toda entrevista', `
My name is Efraim, and I live in Campinas, Brazil. | Meu nome é Efraim e eu moro em Campinas, no Brasil.
I am studying to become an SAP SD consultant. | Estou estudando para me tornar consultor SAP SD.
I practice every day with real scenarios, like pricing and billing. | Eu pratico todo dia com cenários reais, como preço e faturamento.
I am looking for my first opportunity as a consultant. | Estou procurando minha primeira oportunidade como consultor.`),
  ], 'Decore estas 4 frases. Depois troque os detalhes pelos seus, sem mudar a estrutura.'),

  w('int-experience', 'Experience', 'Experiência', [
    p('I have experience with + …', 'O que você já sabe fazer', `
I have experience with the order-to-cash process. | Tenho experiência com o processo order-to-cash.
I have experience with pricing configuration. | Tenho experiência com configuração de preço.
I built a portfolio with my SAP projects. | Montei um portfólio com meus projetos de SAP.`),
  ]),

  w('int-example', 'For example', 'Por exemplo (seu caso)', [
    p('Situação → ação → resultado', 'Responder com um caso real (formato STAR)', `
In one project, the price was zero in the sales order. | Em um projeto, o preço estava zerado na ordem de venda.
I checked the condition records and found the problem. | Eu conferi os registros de condição e encontrei o problema.
I created the missing record, and the order worked. | Eu criei o registro que faltava e a ordem funcionou.`),
  ], 'Toda resposta de "Tell me about a time…" segue esta ordem: o problema, o que você fez, o resultado.'),

  w('int-why', 'Why', 'Por que (motivação)', [
    p('I want to + … because …', 'Por que esta vaga / esta área', `
I want to work with SAP because I like business processes. | Quero trabalhar com SAP porque gosto de processos de negócio.
I want to grow as a consultant in your company. | Quero crescer como consultor na sua empresa.`),
  ]),

  w('int-strength', 'Strength', 'Ponto forte', [
    p('My strength is + … / I am working on + …', 'Pontos fortes e pontos a melhorar', `
My main strength is that I learn fast. | Meu principal ponto forte é que eu aprendo rápido.
I am organized, and I study every day. | Sou organizado e estudo todos os dias.
I am working on my English, and it improves every week. | Estou trabalhando meu inglês, e ele melhora toda semana.`),
  ], 'Fale do ponto fraco junto com o que você já faz para melhorar.'),

  w('int-questions', 'Any questions?', 'Alguma pergunta?', [
    p('Perguntas para fazer no final', 'Sempre tenha duas prontas', `
What does a typical day look like in this role? | Como é um dia normal nesta função?
What are the next steps in the process? | Quais são os próximos passos do processo?
Thank you for your time. | Obrigado pelo seu tempo.`),
  ]),
]
