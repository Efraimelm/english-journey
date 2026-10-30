import { useState } from 'react'
import { emptyState, replaceState, update, useStore } from '../lib/store'
import { cloudEnabled, supabase, useSyncStatus } from '../lib/sync'
import type { Session as AuthSession } from '@supabase/supabase-js'
import { Icon } from '../ui/Icon'
import { Button, Card, PageHeader } from '../ui/kit'
import { go } from './actions'

const STATUS = {
  local: 'Progresso salvo neste aparelho',
  syncing: 'Sincronizando…',
  synced: 'Sincronizado na nuvem',
  offline: 'Sem conexão — salvo no aparelho, sincroniza quando voltar',
  error: 'Erro ao sincronizar — salvo no aparelho',
}

export function Account({ auth }: { auth: AuthSession | null }) {
  const s = useStore()
  const status = useSyncStatus()
  return (
    <div className="space-y-5">
      <button onClick={() => go('#/progresso')} className="inline-flex h-10 items-center gap-1.5 rounded-full border border-line bg-surface pr-4 pl-3 text-sm font-semibold active:scale-95">
        <Icon name="back" size={16} /> Meu progresso
      </button>
      <PageHeader eyebrow="Ajustes" title="Conta" />

      <Card>
        <label className="mb-2 block font-semibold" htmlFor="name">Como quer ser chamado?</label>
        <input
          id="name"
          value={s.name}
          onChange={(e) => update((st) => ({ ...st, name: e.target.value.slice(0, 30) }))}
          placeholder="Seu nome"
          className="w-full rounded-2xl border border-line bg-bg px-4 py-3 outline-none focus:border-accent"
        />
      </Card>

      <Card>
        <div className="mb-3 font-semibold">Aparência</div>
        <div className="grid grid-cols-3 gap-2">
          {([['system', 'Automático', 'clock'], ['light', 'Warm Ivory', 'sun'], ['dark', 'Dark Forest', 'moon']] as const).map(([k, label, icon]) => (
            <button
              key={k}
              onClick={() => update((st) => ({ ...st, theme: k }))}
              className={`flex flex-col items-center gap-1.5 rounded-2xl border-2 p-3 text-sm font-semibold ${s.theme === k ? 'border-accent bg-accent-soft' : 'border-line'}`}
            >
              <Icon name={icon} /> {label}
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <div className="mb-1 flex items-center gap-2 font-semibold"><Icon name="cloud" size={18} /> Sincronização</div>
        <p className="mb-4 text-sm text-muted">{STATUS[status]}</p>
        {!cloudEnabled ? (
          <p className="text-sm text-muted">A conta na nuvem ainda não foi configurada neste aplicativo. Seu progresso fica salvo neste navegador.</p>
        ) : auth ? (
          <div>
            <p className="mb-4 text-sm">Conectado como <b>{auth.user.email}</b>. Use o mesmo e-mail no celular e no computador para continuar de onde parou.</p>
            <Button variant="secondary" icon="logout" onClick={() => supabase!.auth.signOut()}>Sair da conta</Button>
          </div>
        ) : (
          <AuthForm />
        )}
      </Card>

      <Card>
        <div className="mb-1 font-semibold">Recomeçar do zero</div>
        <p className="mb-4 text-sm text-muted">Apaga todo o progresso deste aparelho{auth ? ' e da nuvem' : ''}. Não pode ser desfeito.</p>
        <Button
          variant="danger"
          onClick={() => {
            if (confirm('Tem certeza? Todo o seu progresso será apagado.')) {
              replaceState({ ...emptyState(), theme: s.theme, name: s.name })
              update((st) => st) // envia o estado zerado para a nuvem
              go('#/')
            }
          }}
        >
          Apagar progresso
        </Button>
      </Card>
    </div>
  )
}

export function AuthForm() {
  const [mode, setMode] = useState<'login' | 'signup' | 'reset'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!supabase) return
    setBusy(true)
    setMsg(null)
    const redirect = window.location.origin
    const r =
      mode === 'login' ? await supabase.auth.signInWithPassword({ email, password })
      : mode === 'signup' ? await supabase.auth.signUp({ email, password, options: { emailRedirectTo: redirect } })
      : await supabase.auth.resetPasswordForEmail(email, { redirectTo: redirect + '/#/conta' })
    setBusy(false)
    if (r.error) {
      const t = r.error.message
      setMsg({
        ok: false,
        text: /invalid login/i.test(t) ? 'E-mail ou senha incorretos.'
          : /not confirmed/i.test(t) ? 'Confirme seu e-mail pelo link que enviamos antes de entrar.'
          : /at least 6/i.test(t) ? 'A senha precisa ter pelo menos 6 caracteres.'
          : /already registered/i.test(t) ? 'Este e-mail já tem conta. Use "Entrar".'
          : t,
      })
    } else if (mode === 'signup') {
      setMsg({ ok: true, text: 'Conta criada! Se pedirmos confirmação, abra o link enviado ao seu e-mail.' })
    } else if (mode === 'reset') {
      setMsg({ ok: true, text: 'Enviamos um link para redefinir sua senha.' })
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="flex gap-1 rounded-2xl bg-surface-2 p-1">
        {([['login', 'Entrar'], ['signup', 'Criar conta']] as const).map(([k, l]) => (
          <button type="button" key={k} onClick={() => setMode(k)} className={`flex-1 rounded-xl py-2 text-sm font-semibold ${mode === k ? 'bg-surface shadow-sm' : 'text-muted'}`}>
            {l}
          </button>
        ))}
      </div>
      <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" autoComplete="email"
        className="w-full rounded-2xl border border-line bg-bg px-4 py-3 outline-none focus:border-accent" />
      {mode !== 'reset' && (
        <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha (mín. 6 caracteres)"
          autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          className="w-full rounded-2xl border border-line bg-bg px-4 py-3 outline-none focus:border-accent" />
      )}
      {msg && <p className={`text-sm ${msg.ok ? 'text-accent' : 'text-danger'}`}>{msg.text}</p>}
      <Button type="submit" className="w-full" disabled={busy}>
        {busy ? 'Aguarde…' : mode === 'login' ? 'Entrar' : mode === 'signup' ? 'Criar conta' : 'Enviar link'}
      </Button>
      <button type="button" onClick={() => setMode(mode === 'reset' ? 'login' : 'reset')} className="w-full text-center text-sm text-muted hover:text-ink">
        {mode === 'reset' ? 'Voltar para o login' : 'Esqueci minha senha'}
      </button>
    </form>
  )
}
