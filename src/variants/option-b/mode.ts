export type Mode = 'light' | 'dark'

export const MODE_KEY = 'mph-optb-mode'
const EVENT = 'mph-optb-mode'

export function readStoredMode(): Mode {
  try {
    return window.localStorage.getItem(MODE_KEY) === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

/** Runs before React renders so the page never flashes the wrong mode. */
export function initMode() {
  let mode = readStoredMode()
  // `?mode=dark|light` previews a mode without storing it (handy for screenshots).
  try {
    const q = new URLSearchParams(window.location.search).get('mode')
    if (q === 'dark' || q === 'light') mode = q
  } catch {
    /* ignore */
  }
  document.documentElement.setAttribute('data-mode', mode)
}

export function getMode(): Mode {
  return document.documentElement.getAttribute('data-mode') === 'dark' ? 'dark' : 'light'
}

let animTimer = 0

export function setMode(mode: Mode) {
  const root = document.documentElement
  root.classList.add('b-mode-anim')
  window.clearTimeout(animTimer)
  animTimer = window.setTimeout(() => root.classList.remove('b-mode-anim'), 320)
  root.setAttribute('data-mode', mode)
  try {
    window.localStorage.setItem(MODE_KEY, mode)
  } catch {
    /* storage unavailable: the choice lasts for this page view */
  }
  window.dispatchEvent(new Event(EVENT))
}

export function subscribeMode(cb: () => void) {
  window.addEventListener(EVENT, cb)
  return () => window.removeEventListener(EVENT, cb)
}
