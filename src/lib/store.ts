// Estado do aluno: salvo no aparelho a cada alteração e (com login) sincronizado na nuvem.
import { useSyncExternalStore } from 'react'
import type { AppState } from '../types'

const KEY = 'english-journey:v1'

export function emptyState(): AppState {
  return {
    version: 1,
    updatedAt: 0,
    name: '',
    days: {},
    phrases: {},
    texts: {},
    tests: {},
    favorites: [],
    activity: {},
    xp: 0,
    achievements: {},
    theme: 'system',
  }
}

function load(): AppState {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return { ...emptyState(), ...JSON.parse(raw) }
  } catch {
    /* armazenamento indisponível: começa vazio */
  }
  return emptyState()
}

let state: AppState = load()
const listeners = new Set<() => void>()
const changeHooks = new Set<(s: AppState) => void>()

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* sem espaço ou modo privado */
  }
}

export function getState(): AppState {
  return state
}

/** Altera o estado (imutável), salva no aparelho e avisa a tela e a sincronização. */
export function update(fn: (s: AppState) => AppState) {
  state = { ...fn(state), updatedAt: Date.now() }
  persist()
  listeners.forEach((l) => l())
  changeHooks.forEach((h) => h(state))
}

/** Substitui o estado inteiro (usado ao baixar da nuvem) sem disparar novo envio. */
export function replaceState(next: AppState) {
  state = { ...emptyState(), ...next }
  persist()
  listeners.forEach((l) => l())
}

export function onChange(hook: (s: AppState) => void) {
  changeHooks.add(hook)
  return () => changeHooks.delete(hook)
}

export function useStore(): AppState {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => state,
  )
}

// Se outra aba alterar o progresso, recarrega.
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === KEY) {
      state = load()
      listeners.forEach((l) => l())
    }
  })
}
