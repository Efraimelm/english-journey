// Cria o projeto Supabase exclusivo do English Journey e configura tudo:
// banco (tabela + RLS), URL do site no login e o arquivo .env.
// Uso: defina SUPABASE_TOKEN (token pessoal em supabase.com/dashboard/account/tokens) e rode:
//   node scripts/setup-supabase.mjs
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { randomBytes } from 'node:crypto'

const TOKEN = process.env.SUPABASE_TOKEN?.trim()
const SITE = process.env.SITE_URL ?? 'https://english-journey.expo.app'
const NAME = 'english-journey'
if (!TOKEN) throw new Error('Defina SUPABASE_TOKEN')

const api = async (path, init = {}) => {
  const r = await fetch('https://api.supabase.com/v1' + path, {
    ...init,
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json', ...init.headers },
  })
  const text = await r.text()
  if (!r.ok) throw new Error(`${init.method ?? 'GET'} ${path} → ${r.status}: ${text}`)
  return text ? JSON.parse(text) : null
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// 1. Projeto (reaproveita se já existir com esse nome)
let project = (await api('/projects')).find((p) => p.name === NAME)
if (!project) {
  const orgs = await api('/organizations')
  const org = orgs.find((o) => /pessoal/i.test(o.name)) ?? orgs[0]
  const dbPass = randomBytes(18).toString('base64url')
  writeFileSync('db-senha.txt', dbPass + '\n')
  console.log(`Criando projeto "${NAME}" na organização "${org.name}" (São Paulo)…`)
  project = await api('/projects', {
    method: 'POST',
    body: JSON.stringify({ name: NAME, organization_id: org.id, region: 'sa-east-1', db_pass: dbPass }),
  })
} else console.log(`Projeto "${NAME}" já existe (${project.id}).`)
const ref = project.id ?? project.ref

// 2. Espera ficar pronto
for (let i = 0; ; i++) {
  const p = await api(`/projects/${ref}`)
  if (p.status === 'ACTIVE_HEALTHY') break
  if (i > 60) throw new Error('Projeto demorou demais para ficar pronto: ' + p.status)
  process.stdout.write(`  aguardando (${p.status})…\r`)
  await sleep(10000)
}
await sleep(5000)
console.log('\nProjeto pronto.')

// 3. Tabela + RLS
const schema = readFileSync('supabase/schema.sql', 'utf8')
  .replace(/create policy "([^"]+)"/g, 'drop policy if exists "$1" on public.english_journey;\ncreate policy "$1"')
await api(`/projects/${ref}/database/query`, { method: 'POST', body: JSON.stringify({ query: schema }) })
console.log('Tabela e regras de segurança criadas.')

// 4. Login: endereço do site para os links de confirmação e de nova senha
await api(`/projects/${ref}/config/auth`, {
  method: 'PATCH',
  body: JSON.stringify({ site_url: SITE, uri_allow_list: `${SITE}/**,http://localhost:5173/**,http://localhost:5391/**` }),
})
console.log('Login configurado para', SITE)

// 5. .env com a chave pública
const keys = await api(`/projects/${ref}/api-keys`)
const anon = keys.find((k) => k.name === 'anon')?.api_key
if (!anon) throw new Error('Chave anon não encontrada')
writeFileSync('.env', `VITE_SUPABASE_URL=https://${ref}.supabase.co\nVITE_SUPABASE_ANON_KEY=${anon}\n`)
console.log('.env criado. Pronto!', existsSync('db-senha.txt') ? '(senha do banco em db-senha.txt)' : '')
