import { useSyncExternalStore, type ReactNode } from 'react'
import logoOnLight from '../../assets/logos/mph-energy-logo-2.png'
import logoOnDark from '../../assets/logos/mph-energy-logo-1.png'
import { Icon } from '../../components/Icon'
import type { PageId } from '../../shared/content'
import { getMode, setMode, subscribeMode } from './mode'

export function href(page: PageId) {
  return `#${page}`
}

export function Logo() {
  return (
    <a className="b-logo" href={href('home')}>
      <img className="b-logo-light" src={logoOnLight} alt="MPH Energy, home" width={1200} height={353} />
      <img className="b-logo-dark" src={logoOnDark} alt="MPH Energy, home" width={1200} height={353} />
    </a>
  )
}

/** Square button rendered as a link to another page. */
export function Btn({
  to,
  children,
  variant = 'solid',
}: {
  to: PageId
  children: ReactNode
  variant?: 'solid' | 'outline' | 'signal'
}) {
  return (
    <a className={`b-btn b-btn-${variant}`} href={href(to)}>
      <span>{children}</span>
      <Icon name="arrowRight" size={16} />
    </a>
  )
}

/** Mono label with an orange square marker. */
export function Label({ children }: { children: ReactNode }) {
  return (
    <p className="b-label">
      <i className="b-sq" aria-hidden="true" />
      {children}
    </p>
  )
}

export function SectionHead({
  label,
  title,
  aside,
  action,
}: {
  label: string
  title: ReactNode
  aside?: ReactNode
  action?: ReactNode
}) {
  return (
    <div className="b-head">
      <div>
        <Label>{label}</Label>
        <h2 className="b-display b-h2">{title}</h2>
      </div>
      {(aside || action) && (
        <div className="b-head-side">
          {aside && <p className="b-muted">{aside}</p>}
          {action}
        </div>
      )}
    </div>
  )
}

/* ---------- Original line drawings (tokens only, so they follow light/dark) ---------- */

/** Hero: an abstract tower on a grid, with a dimension line and a survey mark. */
export function HeroDrawing() {
  const floors = [150, 210, 270, 330, 390]
  return (
    <svg className="b-draw" viewBox="0 0 480 520" role="img" aria-label="Line drawing of an abstract tower with a dimension line">
      <defs>
        <pattern id="b-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" className="d-grid" />
        </pattern>
      </defs>
      <rect width="480" height="520" fill="url(#b-grid)" />
      <line x1="40" y1="450" x2="440" y2="450" className="d-line" />
      <rect x="170" y="90" width="140" height="360" className="d-body" />
      <rect x="215" y="90" width="50" height="360" className="d-faint" />
      {floors.map(y => (
        <line key={y} x1="170" y1={y} x2="310" y2={y} className="d-faint" />
      ))}
      <line x1="240" y1="90" x2="240" y2="40" className="d-line" />
      <line x1="360" y1="90" x2="360" y2="450" className="d-dim" />
      <line x1="350" y1="90" x2="370" y2="90" className="d-dim" />
      <line x1="350" y1="450" x2="370" y2="450" className="d-dim" />
      <text x="378" y="274" className="d-text">
        H
      </text>
      <circle cx="240" cy="40" r="16" className="d-signal" />
      <line x1="216" y1="40" x2="264" y2="40" className="d-signal" />
      <line x1="240" y1="16" x2="240" y2="64" className="d-signal" />
      <rect x="234" y="444" width="12" height="12" className="d-mark" />
    </svg>
  )
}

export type MiniKind = 'about' | 'services' | 'projects' | 'team' | 'contact'

/** Small header drawing for inner pages: a few lines on a grid. */
export function MiniDrawing({ kind }: { kind: MiniKind }) {
  let art: ReactNode
  if (kind === 'about')
    art = (
      <>
        <rect x="50" y="40" width="60" height="100" className="d-body" />
        <rect x="110" y="80" width="60" height="60" className="d-body" />
        <line x1="20" y1="140" x2="200" y2="140" className="d-line" />
        <rect x="104" y="134" width="12" height="12" className="d-mark" />
      </>
    )
  else if (kind === 'services')
    art = (
      <>
        <circle cx="110" cy="90" r="48" className="d-body" />
        <circle cx="110" cy="90" r="20" className="d-faint" />
        <line x1="40" y1="90" x2="180" y2="90" className="d-faint" />
        <line x1="110" y1="20" x2="110" y2="160" className="d-faint" />
        <rect x="104" y="84" width="12" height="12" className="d-mark" />
      </>
    )
  else if (kind === 'projects')
    art = (
      <>
        <rect x="40" y="80" width="36" height="60" className="d-body" />
        <rect x="92" y="30" width="36" height="110" className="d-body" />
        <rect x="144" y="60" width="36" height="80" className="d-body" />
        <line x1="20" y1="140" x2="200" y2="140" className="d-line" />
        <rect x="104" y="24" width="12" height="12" className="d-mark" />
      </>
    )
  else if (kind === 'team')
    art = (
      <>
        <line x1="60" y1="120" x2="110" y2="50" className="d-faint" />
        <line x1="110" y1="50" x2="160" y2="120" className="d-faint" />
        <line x1="60" y1="120" x2="160" y2="120" className="d-faint" />
        <circle cx="60" cy="120" r="16" className="d-body" />
        <circle cx="160" cy="120" r="16" className="d-body" />
        <circle cx="110" cy="50" r="16" className="d-body" />
        <rect x="104" y="44" width="12" height="12" className="d-mark" />
      </>
    )
  else
    art = (
      <>
        <rect x="50" y="40" width="120" height="90" className="d-body" />
        <line x1="50" y1="40" x2="110" y2="90" className="d-faint" />
        <line x1="170" y1="40" x2="110" y2="90" className="d-faint" />
        <line x1="50" y1="150" x2="170" y2="150" className="d-dim" />
        <line x1="50" y1="144" x2="50" y2="156" className="d-dim" />
        <line x1="170" y1="144" x2="170" y2="156" className="d-dim" />
        <rect x="104" y="84" width="12" height="12" className="d-mark" />
      </>
    )
  return (
    <svg className="b-draw b-draw-mini" viewBox="0 0 220 180" aria-hidden="true" focusable="false">
      <defs>
        <pattern id={`b-mgrid-${kind}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" className="d-grid" />
        </pattern>
      </defs>
      <rect width="220" height="180" fill={`url(#b-mgrid-${kind})`} />
      {art}
    </svg>
  )
}

/* ---------- Light / dark switch ---------- */

function SunIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden="true" focusable="false">
      <rect x="5" y="5" width="6" height="6" />
      <path d="M8 0.8v2M8 13.2v2M0.8 8h2M13.2 8h2M2.9 2.9l1.4 1.4M11.7 11.7l1.4 1.4M2.9 13.1l1.4-1.4M11.7 4.3l1.4-1.4" strokeLinecap="square" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden="true" focusable="false">
      <path d="M13.5 10.2A6 6 0 0 1 5.8 2.5a6 6 0 1 0 7.7 7.7Z" strokeLinejoin="miter" />
    </svg>
  )
}

/** Square light/dark switch. The label names the mode it switches to. */
export function ModeToggle({ block = false }: { block?: boolean }) {
  const mode = useSyncExternalStore(subscribeMode, getMode, () => 'light' as const)
  const next = mode === 'dark' ? 'light' : 'dark'
  return (
    <button
      type="button"
      className={`b-mode${block ? ' b-mode-block' : ''}`}
      aria-label={`Switch to ${next} mode`}
      onClick={() => setMode(next)}
    >
      {next === 'dark' ? <MoonIcon /> : <SunIcon />}
      <span>{block ? `${next} mode` : next}</span>
    </button>
  )
}
