import { nav, type PageId } from '../../shared/content'

/* Plain hash names: #home, #about, … (never #/path). */
export function href(page: PageId) {
  return `#${page}`
}

export function readPage(): PageId {
  const id = window.location.hash.replace(/^#\/?/, '')
  return id === 'login' || nav.some(n => n.id === id) ? (id as PageId) : 'home'
}
