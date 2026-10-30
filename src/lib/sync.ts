// Conta e sincronização entre aparelhos (Supabase).
// Sem as variáveis VITE_SUPABASE_* o app funciona em "modo local" (progresso só neste aparelho).
import { createClient, type Session as AuthSession } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import type { AppState } from '../types'
import { getState, onChange, replaceState } from './store'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const supabase = url && key ? createClient(url, key) : null
export const cloudEnabled = !!supabase

const TABLE = 'english_journey'

export type SyncStatus = 'local' | 'syncing' | 'synced' | 'offline' | 'error'
let status: SyncStatus = cloudEnabled ? 'offline' : 'local'
const statusListeners = new Set<(s: SyncStatus) => void>()
function setStatus(s: SyncStatus) {
  status = s
  statusListeners.forEach((l) => l(s))
}

export function useSyncStatus() {
  const [s, set] = useState(status)
  useEffect(() => {
    statusListeners.add(set)
    return () => void statusListeners.delete(set)
  }, [])
  return s
}

let userId: string | null = null
let timer: ReturnType<typeof setTimeout> | undefined

async function push(state: AppState) {
  if (!supabase || !userId) return
  setStatus('syncing')
  const { error } = await supabase
    .from(TABLE)
    .upsert({ user_id: userId, data: state, updated_at: new Date(state.updatedAt).toISOString() })
  setStatus(error ? (navigator.onLine ? 'error' : 'offline') : 'synced')
}

/** Ao entrar: o progresso mais recente vence (nuvem ou aparelho). */
async function pull() {
  if (!supabase || !userId) return
  setStatus('syncing')
  const { data, error } = await supabase.from(TABLE).select('data, updated_at').eq('user_id', userId).maybeSingle()
  if (error) return setStatus(navigator.onLine ? 'error' : 'offline')
  const local = getState()
  const remote = data?.data as AppState | undefined
  if (remote && (remote.updatedAt ?? 0) > local.updatedAt) {
    replaceState(remote)
    setStatus('synced')
  } else {
    await push(local)
  }
}

if (supabase) {
  onChange((s) => {
    if (!userId) return
    clearTimeout(timer)
    timer = setTimeout(() => push(s), 1500)
  })
  window.addEventListener('online', () => pull())
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') pull()
    else if (userId) push(getState()) // salva ao sair/minimizar
  })
}

export function useAuth() {
  const [session, setSession] = useState<AuthSession | null>(null)
  const [ready, setReady] = useState(!supabase)
  useEffect(() => {
    if (!supabase) return
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setReady(true)
    })
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => data.subscription.unsubscribe()
  }, [])
  useEffect(() => {
    userId = session?.user.id ?? null
    if (userId) pull()
    else setStatus(cloudEnabled ? 'offline' : 'local')
  }, [session?.user.id])
  return { session, ready }
}
