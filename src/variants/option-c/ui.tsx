import { useEffect, useState, type ReactNode } from 'react'
import { Icon, type IconName } from '../../components/Icon'
import logo from '../../assets/logos/mph-energy-logo-1.png'
import logoDark from '../../assets/logos/mph-energy-logo-2.png'
import { brand, contact, nav, services, type PageId } from '../../shared/content'
import { setMode, useMode } from './mode'
import { href } from './routes'

/* ---------- Primitives ---------- */

export function Logo({ className = '' }: { className?: string }) {
  return (
    <a className={`c-logo ${className}`} href={href('home')}>
      <img className="logo-for-dark" src={logo} alt="MPH Energy home" width={1200} height={353} />
      <img className="logo-for-light" src={logoDark} alt="MPH Energy home" width={1200} height={353} />
    </a>
  )
}

export function Btn({
  to,
  children,
  variant = 'primary',
  icon = 'arrowUpRight',
}: {
  to: PageId
  children: ReactNode
  variant?: 'primary' | 'glass'
  icon?: IconName
}) {
  return (
    <a className={`c-btn c-btn-${variant}`} href={href(to)}>
      <span>{children}</span>
      <Icon name={icon} size={18} />
    </a>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="eyebrow">
      <i aria-hidden="true" />
      {children}
    </p>
  )
}

export function SectionHead({
  eyebrow,
  title,
  intro,
  center = false,
}: {
  eyebrow: string
  title: ReactNode
  intro?: string
  center?: boolean
}) {
  return (
    <div className={`sec-head${center ? ' sec-head-center' : ''}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="h2">{title}</h2>
      {intro && <p className="sec-intro">{intro}</p>}
    </div>
  )
}

/** Splits a sentence so its last words get the orange → amber highlight. */
export function Accent({ text, words = 2, phrase }: { text: string; words?: number; phrase?: string }) {
  const at = phrase ? text.indexOf(phrase) : -1
  if (phrase && at >= 0) {
    return (
      <>
        {text.slice(0, at)}
        <span className="grad-text">{phrase}</span>
        {text.slice(at + phrase.length)}
      </>
    )
  }
  const parts = text.split(' ')
  const head = parts.slice(0, -words).join(' ')
  return (
    <>
      {head} <span className="grad-text">{parts.slice(-words).join(' ')}</span>
    </>
  )
}

export function Spinner() {
  return <span className="spinner" aria-hidden="true" />
}

/* ---------- Light / dark switch ---------- */

export function ModeToggle() {
  const mode = useMode()
  const next = mode === 'dark' ? 'light' : 'dark'
  return (
    <button
      type="button"
      className="mode-btn"
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      onClick={() => setMode(next)}
    >
      <svg className="ico-sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
      </svg>
      <svg className="ico-moon" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" />
      </svg>
    </button>
  )
}

/* ---------- Original artwork (no photography) ---------- */

/** A rising sun on a glowing horizon over a perspective grid: the "night operations" motif. */
export function HorizonArt({ className = '' }: { className?: string }) {
  const verticals = Array.from({ length: 19 }, (_, k) => 720 + (k - 9) * 190)
  const horizontals = [306, 314, 326, 344, 370, 408, 460]
  return (
    <div className={`horizon ${className}`} aria-hidden="true">
      <div className="aurora aurora-1" />
      <div className="aurora aurora-2" />
      <svg viewBox="0 0 1440 480" preserveAspectRatio="xMidYMax slice" focusable="false">
        <defs>
          <linearGradient id="c-sun" x1="0" y1="0" x2="0" y2="1">
            <stop className="sun-a" offset="0" />
            <stop className="sun-b" offset="1" />
          </linearGradient>
          <linearGradient id="c-floor" x1="0" y1="0" x2="0" y2="1">
            <stop className="floor-a" offset="0" />
            <stop className="floor-b" offset="1" />
          </linearGradient>
          <clipPath id="c-sky">
            <rect x="0" y="0" width="1440" height="300" />
          </clipPath>
          <mask id="c-sun-cut">
            <rect x="0" y="0" width="1440" height="300" fill="#fff" />
            <rect x="0" y="236" width="1440" height="5" fill="#000" />
            <rect x="0" y="258" width="1440" height="7" fill="#000" />
            <rect x="0" y="279" width="1440" height="9" fill="#000" />
          </mask>
        </defs>
        <circle className="sun" cx="720" cy="300" r="210" fill="url(#c-sun)" clipPath="url(#c-sky)" mask="url(#c-sun-cut)" />
        <rect x="0" y="300" width="1440" height="180" fill="url(#c-floor)" />
        <g className="grid-lines" fill="none" strokeWidth="1">
          {verticals.map(x => (
            <line key={x} x1="720" y1="300" x2={x} y2="480" />
          ))}
          {horizontals.map(y => (
            <line key={y} x1="0" y1={y} x2="1440" y2={y} />
          ))}
        </g>
        <line className="horizon-line" x1="0" y1="300" x2="1440" y2="300" strokeWidth="1.5" />
      </svg>
    </div>
  )
}

/* ---------- Navigation ---------- */

export function Nav({ page }: { page: PageId }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const mode = useMode()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [page])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth > 1100 && setOpen(false)
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    <header className={`nav-wrap${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="nav glass">
        <Logo className="nav-logo" />
        <nav className="nav-links" aria-label="Main">
          <ul>
            {nav.map(n => (
              <li key={n.id}>
                <a href={href(n.id)} aria-current={page === n.id ? 'page' : undefined}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav-actions">
          <ModeToggle />
          <a className="nav-login" href={href('login')}>
            <Icon name="lock" size={16} />
            <span>Client login</span>
          </a>
          <a className="c-btn c-btn-primary c-btn-sm nav-cta" href={href('contact')}>
            <span>Get in touch</span>
            <Icon name="arrowUpRight" size={16} />
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="c-mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(o => !o)}
          >
            <Icon name={open ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </div>

      <div id="c-mobile-menu" className="nav-mobile glass" hidden={!open}>
        <nav aria-label="Mobile">
          <ul>
            {nav.map(n => (
              <li key={n.id}>
                <a href={href(n.id)} aria-current={page === n.id ? 'page' : undefined}>
                  {n.label}
                  <Icon name="arrowRight" size={18} />
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav-mobile-actions">
          <a className="c-btn c-btn-glass" href={href('login')}>
            <Icon name="lock" size={16} />
            <span>Client login</span>
          </a>
          <a className="c-btn c-btn-primary" href={href('contact')}>
            <span>Get in touch</span>
            <Icon name="arrowUpRight" size={16} />
          </a>
        </div>
        <div className="mode-row">
          <span>{mode === 'dark' ? 'Dark mode' : 'Light mode'}</span>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

/* ---------- Footer ---------- */

export function Footer({ page }: { page: PageId }) {
  return (
    <footer className="footer">
      <div className="wrap">
        {page !== 'contact' && (
          <div className="footer-cta">
            <div className="footer-cta-glow" aria-hidden="true" />
            <h2 className="h2">
              Have a project in mind? <span className="grad-text">Let’s talk.</span>
            </h2>
            <Btn to="contact">Get in touch</Btn>
          </div>
        )}

        <div className="footer-grid">
          <div className="footer-brand">
            <Logo />
            <p>{brand.tagline}</p>
          </div>
          <div className="footer-col">
            <h3>Company</h3>
            <ul>
              {nav.slice(1).map(n => (
                <li key={n.id}>
                  <a href={href(n.id)}>{n.label}</a>
                </li>
              ))}
              <li>
                <a href={href('login')}>Client login</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Services</h3>
            <ul>
              {services.map(s => (
                <li key={s.title}>
                  <a href={href('services')}>{s.title}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h3>Contact</h3>
            <ul>
              <li>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
              <li>{contact.phone}</li>
              <li>{contact.address}</li>
              <li>{contact.hours}</li>
            </ul>
          </div>
        </div>

        <div className="footer-base">
          <p>
            <span className="live-dot" aria-hidden="true" /> {brand.name}
          </p>
          <button type="button" className="footer-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Back to top <Icon name="arrowUp" size={16} />
          </button>
        </div>
      </div>
    </footer>
  )
}
