import { useSyncExternalStore } from 'react'

export type Mode = 'dark' | 'light'

const KEY = 'mph-optc-mode'
const root = () => document.documentElement

function readStored(): Mode | null {
  try {
    const v = window.localStorage.getItem(KEY)
    return v === 'light' || v === 'dark' ? v : null
  } catch {
    return null
  }
}

function store(mode: Mode) {
  try {
    window.localStorage.setItem(KEY, mode)
  } catch {
    /* storage unavailable: the choice just won't persist */
  }
}

function apply(mode: Mode) {
  root().setAttribute('data-mode', mode)
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', mode === 'light' ? '#f4f6f9' : '#0a0e13')
}

/** Runs before React renders so the page never flashes the wrong mode. `?mode=light|dark` previews without storing. */
export function initMode() {
  let preview: string | null = null
  try {
    preview = new URLSearchParams(window.location.search).get('mode')
  } catch {
    preview = null
  }
  apply(preview === 'light' || preview === 'dark' ? preview : (readStored() ?? 'dark'))
}

export function getMode(): Mode {
  return root().getAttribute('data-mode') === 'light' ? 'light' : 'dark'
}

let animTimer = 0
export function setMode(mode: Mode) {
  const el = root()
  el.classList.add('mode-anim')
  window.clearTimeout(animTimer)
  animTimer = window.setTimeout(() => el.classList.remove('mode-anim'), 450)
  apply(mode)
  store(mode)
}

function subscribe(onChange: () => void) {
  const mo = new MutationObserver(onChange)
  mo.observe(root(), { attributes: true, attributeFilter: ['data-mode'] })
  return () => mo.disconnect()
}

export function useMode() {
  return useSyncExternalStore(subscribe, getMode, () => 'dark' as Mode)
}
