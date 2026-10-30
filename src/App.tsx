import { useEffect, useState } from 'react'
import { addStudyTime } from './lib/progress'
import { useStore } from './lib/store'
import { cloudEnabled, useAuth } from './lib/sync'

const guestKey = 'english-journey:guest'
const isGuest = () => {
  try { return localStorage.getItem(guestKey) === '1' } catch { return false }
}
import { Account, AuthForm } from './screens/Account'
import { go } from './screens/actions'
import { Home } from './screens/Home'
import { Journey, WeekDetail } from './screens/Journey'
import { Library, TextPage } from './screens/Library'
import { Progress } from './screens/Progress'
import { Review } from './screens/Review'
import { SessionRunner } from './study/SessionRunner'
import { Icon, type IconName } from './ui/Icon'
import { Button } from './ui/kit'

function useHash() {
  const [hash, setHash] = useState(window.location.hash || '#/')
  useEffect(() => {
    const on = () => {
      setHash(window.location.hash || '#/')
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return hash
}

function useTheme(theme: 'system' | 'light' | 'dark') {
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const apply = () => {
      const light = theme === 'light' || (theme === 'system' && mq.matches)
      document.documentElement.dataset.theme = light ? 'light' : 'dark'
      document.querySelector('meta[name=theme-color]')?.setAttribute('content', light ? '#F5F4EF' : '#14251F')
    }
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [theme])
}

/** Conta o tempo de estudo enquanto uma sessão está aberta e visível. */
function useStudyTimer(active: boolean) {
  useEffect(() => {
    if (!active) return
    const id = setInterval(() => {
      if (document.visibilityState === 'visible') addStudyTime(15)
    }, 15000)
    return () => clearInterval(id)
  }, [active])
}

const TABS: { to: string; label: string; icon: IconName }[] = [
  { to: '#/', label: 'Início', icon: 'home' },
  { to: '#/jornada', label: 'Jornada', icon: 'path' },
  { to: '#/biblioteca', label: 'Biblioteca', icon: 'book' },
  { to: '#/revisao', label: 'Revisão', icon: 'repeat' },
  { to: '#/progresso', label: 'Progresso', icon: 'chart' },
]

export default function App() {
  const s = useStore()
  const hash = useHash()
  const { session: auth, ready } = useAuth()
  useTheme(s.theme)
  const inSession = hash.startsWith('#/sessao')
  useStudyTimer(inSession)

  if (!ready) return <div className="min-h-dvh" />

  // Com a nuvem configurada, é preciso entrar (ou seguir sem conta neste aparelho).
  if (cloudEnabled && !auth && !isGuest()) {
    return <Welcome />
  }

  if (inSession) return <SessionRunner onExit={() => go('#/')} onNavigate={go} />

  const route = hash.replace(/^#\/?/, '').split('/')
  const active = '#/' + (route[0] === 'semana' ? 'jornada' : route[0] === 'texto' ? 'biblioteca' : route[0] === 'conta' ? 'progresso' : route[0])

  let page
  switch (route[0]) {
    case '': page = <Home />; break
    case 'jornada': page = <Journey />; break
    case 'semana': page = <WeekDetail n={Number(route[1])} />; break
    case 'biblioteca': page = <Library />; break
    case 'texto': page = <TextPage n={Number(route[1])} />; break
    case 'revisao': page = <Review />; break
    case 'progresso': page = <Progress />; break
    case 'conta': page = <Account auth={auth} />; break
    default: page = <Home />
  }

  return (
    <div className="min-h-dvh md:flex">
      {/* Barra lateral (computador) */}
      <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r border-line px-4 py-6 md:flex">
        <a href="#/" className="mb-8 flex items-center gap-3 px-3">
          <img src="/icon.svg" alt="" className="h-9 w-9 rounded-xl" />
          <span className="text-[17px] leading-tight font-bold tracking-tight">English<br />Journey.</span>
        </a>
        <nav className="space-y-1">
          {TABS.map((t) => (
            <a
              key={t.to}
              href={t.to}
              className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 font-semibold transition ${active === t.to ? 'bg-surface text-ink' : 'text-muted hover:text-ink'}`}
            >
              <Icon name={t.icon} /> {t.label}
            </a>
          ))}
        </nav>
        <div className="mt-auto px-3 text-xs text-muted">Learn English. Every single day.</div>
      </aside>

      <main className="mx-auto w-full max-w-3xl px-4 pt-5 pb-28 md:px-8 md:pt-10 md:pb-12">{page}</main>

      {/* Barra de abas (celular) */}
      <nav className="safe-bottom fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg/85 backdrop-blur-xl md:hidden">
        <div className="mx-auto flex max-w-lg">
          {TABS.map((t) => (
            <a key={t.to} href={t.to} className={`flex flex-1 flex-col items-center gap-1 pt-2.5 pb-2 text-[11px] font-semibold ${active === t.to ? 'text-accent' : 'text-muted'}`}>
              <Icon name={t.icon} size={22} />
              {t.label}
            </a>
          ))}
        </div>
      </nav>
    </div>
  )
}

function Welcome() {
  const [, force] = useState(0)
  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-6 py-12">
      <img src="/icon.svg" alt="" className="mb-8 h-14 w-14 rounded-2xl" />
      <h1 className="text-[40px] leading-[1.05] font-bold tracking-tight">English<br />Journey.</h1>
      <p className="mt-3 mb-8 text-lg text-muted">Learn English. Every single day.<br />Uma frase de cada vez. Uma semana de cada vez.</p>
      <AuthForm />
      <Button
        variant="ghost"
        className="mt-2 w-full"
        onClick={() => {
          try { localStorage.setItem(guestKey, '1') } catch { /* modo privado */ }
          force((n) => n + 1)
        }}
      >
        Continuar sem conta (só neste aparelho)
      </Button>
    </div>
  )
}
