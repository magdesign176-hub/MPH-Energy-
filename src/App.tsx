import { useEffect, useId, useRef, useState, useSyncExternalStore, type FormEvent, type ReactNode } from 'react'
import logoOnLight from './assets/logos/mph-energy-logo-2.png'
import logoOnDark from './assets/logos/mph-energy-logo-1.png'
import heroImage from './assets/energy/a-hero.jpg'
import ctaImage from './assets/energy/c-hero.jpg'
import { Icon } from './components/Icon'
import {
  about,
  brand,
  contact,
  login,
  nav,
  pageHeaders,
  process,
  projectSectors,
  projectTypes,
  sectors,
  services,
  teamRoles,
  values,
  type PageId,
} from './shared/content'

type Page = PageId

/* ---------- Routing (plain hash names, so shared links like #about work) ---------- */

function href(page: Page) {
  return `#${page}`
}

function readPage(): Page {
  const id = window.location.hash.replace(/^#\/?/, '')
  return id === 'login' || nav.some(p => p.id === id) ? (id as Page) : 'home'
}

function usePage() {
  const [page, setPage] = useState<Page>(readPage)
  useEffect(() => {
    const onHash = () => {
      setPage(readPage())
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return page
}

/* ---------- Light / dark mode ----------
   Stored as data-mode on <html> (the hosting preview reserves data-theme), set before first paint. */

type Mode = 'light' | 'dark'
const MODE_KEY = 'mph-opta-mode'
const modeListeners = new Set<() => void>()

function readMode(): Mode {
  return document.documentElement.dataset.mode === 'dark' ? 'dark' : 'light'
}

function setMode(mode: Mode) {
  document.documentElement.dataset.mode = mode
  try {
    localStorage.setItem(MODE_KEY, mode)
  } catch {
    // Storage can be unavailable (private windows, sandboxed previews); the switch still works for this visit.
  }
  modeListeners.forEach(fn => fn())
}

try {
  document.documentElement.dataset.mode = localStorage.getItem(MODE_KEY) === 'dark' ? 'dark' : 'light'
} catch {
  document.documentElement.dataset.mode = 'light'
}

function subscribeMode(fn: () => void) {
  modeListeners.add(fn)
  return () => {
    modeListeners.delete(fn)
  }
}

function useMode() {
  return useSyncExternalStore(subscribeMode, readMode)
}

// Opt into entrance animations before first paint, only when the user allows motion.
if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
  document.documentElement.classList.add('motion')
}

/* ---------- Building blocks ---------- */

function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <a className="logo" href={href('home')}>
      <img src={onDark ? logoOnDark : logoOnLight} alt="MPH Energy — home" width={1200} height={353} />
    </a>
  )
}

function ButtonLink({
  to,
  children,
  variant = 'primary',
}: {
  to: Page
  children: ReactNode
  variant?: 'primary' | 'light' | 'outline' | 'outline-light'
}) {
  return (
    <a className={`btn btn-${variant}`} href={href(to)}>
      <span>{children}</span>
      <Icon name="arrowUpRight" size={18} />
    </a>
  )
}

function Label({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`label${light ? ' label-light' : ''}`}>{children}</p>
}

/** Renders the clause after the last comma in the italic accent face: "Built on craft, *driven by purpose.*" */
function Title({ text }: { text: string }) {
  const cut = text.lastIndexOf(', ')
  if (cut < 0) return <>{text}</>
  return (
    <>
      {text.slice(0, cut + 1)} <em>{text.slice(cut + 2)}</em>
    </>
  )
}

function ModeToggle() {
  const mode = useMode()
  const next = mode === 'dark' ? 'light' : 'dark'
  return (
    <button className="mode-toggle" aria-label={`Switch to ${next} mode`} title={`Switch to ${next} mode`} onClick={() => setMode(next)}>
      <Icon name={mode === 'dark' ? 'sun' : 'moon'} size={18} />
    </button>
  )
}

type Art = 'rig' | 'turbine' | 'solar' | 'pylon'

/** Original line illustrations of energy assets, drawn inside the rings (600×600 canvas). */
const artwork: Record<Art, ReactNode> = {
  rig: (
    <>
      <path d="M140 430h320" />
      <path d="M232 430l14-100M368 430l-14-100M236 405l114-50M364 405l-114-50" />
      <rect x="218" y="310" width="164" height="20" />
      <rect x="326" y="288" width="44" height="22" />
      <path d="M258 310l42-142 42 142M270 270h60M283 228h34M265 290l52-60M335 290l-52-60" />
      <path d="M382 318l62-64" />
      <circle className="art-flame" cx="450" cy="246" r="7" />
    </>
  ),
  turbine: (
    <>
      <path d="M200 440h200" />
      <path d="M293 440l4-172h6l4 172" />
      <circle cx="300" cy="260" r="9" />
      <path d="M300 251l-6-112 12 0zM308 265l97 55-6 10zM292 265l-97 55 6 10z" />
      <path d="M380 440l2-80h3l2 80M383 356l-3-46M386 362l38 18M380 362l-38 18" />
    </>
  ),
  solar: (
    <>
      <circle className="art-sun" cx="392" cy="196" r="24" />
      <path d="M170 432h280" />
      <path d="M186 398l58-96h192l-58 96z" />
      <path d="M234 398l58-96M282 398l58-96M330 398l58-96M215 350h192" />
      <path d="M224 398v34M356 398v34" />
    </>
  ),
  pylon: (
    <>
      <path d="M150 440h300" />
      <path d="M254 440l32-232h28l32 232M286 208l14-38 14 38" />
      <path d="M226 250h148M242 300h116" />
      <path d="M262 400l72-70M338 400l-72-70M272 330l56-50M328 330l-56-50" />
      <path d="M226 250v12M374 250v12M242 300v12M358 300v12" />
      <path d="M226 262q-70 30-130 16M374 262q70 30 130 16M242 312q-80 34-150 22M358 312q80 34 150 22" />
    </>
  ),
}

/** Original artwork: concentric "energy rings" with a warm glow and an energy illustration. */
function Rings({ className = '', art }: { className?: string; art?: Art }) {
  const glow = useId()
  return (
    <svg className={`rings ${className}`} viewBox="0 0 600 600" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={glow} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#d2bc94" stopOpacity="0.5" />
          <stop offset="0.45" stopColor="#f26522" stopOpacity="0.14" />
          <stop offset="1" stopColor="#f26522" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="300" cy="300" r="300" fill={`url(#${CSS.escape(glow)})`} />
      {[70, 120, 170, 220, 270].map(r => (
        <circle key={r} className="ring" cx="300" cy="300" r={r} />
      ))}
      {art ? (
        <g className="art">{artwork[art]}</g>
      ) : (
        <circle className="ring-dot" cx="300" cy="300" r="7" />
      )}
      <circle className="ring-dot" cx="470" cy="300" r="4" />
      <circle className="ring-dot" cx="300" cy="80" r="3" />
    </svg>
  )
}

/* ---------- Layout ---------- */

function Header({ page }: { page: Page }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const dark = useMode() === 'dark'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [page])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.classList.add('no-scroll')
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.classList.remove('no-scroll')
    }
  }, [open])

  const solid = scrolled && !open
  return (
    <header className={`site-header${solid ? ' solid' : ''}${open ? ' menu-open' : ''}`}>
      <div className="shell header-inner">
        <Logo onDark={!solid || dark} />
        <nav id="site-nav" className="nav" aria-label="Main">
          <ul>
            {nav.map(({ id, label }) => (
              <li key={id}>
                <a href={href(id)} aria-current={page === id ? 'page' : undefined}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a className="nav-mobile-login" href={href('login')}>
            <Icon name="lock" size={16} /> Client login
          </a>
        </nav>
        <a className="header-login" href={href('login')}>
          <Icon name="lock" size={16} />
          Client login
        </a>
        <ModeToggle />
        <a className="header-cta" href={href('contact')}>
          Get in touch <Icon name="arrowUpRight" size={16} />
        </a>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(o => !o)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Logo onDark />
          <p>{brand.intro}</p>
        </div>
        <div>
          <h3>Company</h3>
          <ul>
            {nav.slice(1).map(({ id, label }) => (
              <li key={id}>
                <a href={href(id)}>{label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Contact</h3>
          <ul>
            <li>{contact.email}</li>
            <li>{contact.phone}</li>
            <li>{contact.address}</li>
          </ul>
        </div>
      </div>
      <p className="shell wordmark" aria-hidden="true">
        MPH Energy
      </p>
      <div className="shell footer-bottom">
        <p>{brand.tagline}</p>
        <a href={href('login')}>Client login</a>
      </div>
    </footer>
  )
}

const pageArt: Record<Exclude<Page, 'home' | 'login'>, Art> = {
  about: 'turbine',
  services: 'pylon',
  projects: 'solar',
  team: 'rig',
  contact: 'turbine',
}

function PageHero({ page }: { page: Exclude<Page, 'home' | 'login'> }) {
  const { title, intro } = pageHeaders[page]
  const label = nav.find(p => p.id === page)?.label
  return (
    <section className="page-hero">
      <Rings art={pageArt[page]} />
      <div className="shell page-hero-inner">
        <Label light>{label}</Label>
        <h1>
          <Title text={title} />
        </h1>
        <p>{intro}</p>
      </div>
    </section>
  )
}

/* ---------- Sections ---------- */

function HomeHero() {
  return (
    <section className="hero">
      <div className="shell hero-inner">
        <div className="hero-copy">
          <Label light>{brand.tagline}</Label>
          <h1>
            {brand.headline[0]} <em>{brand.headline[1]}</em>
          </h1>
          <p className="lead">{brand.intro}</p>
          <div className="actions">
            <ButtonLink to="services" variant="light">
              Our services
            </ButtonLink>
            <ButtonLink to="contact" variant="outline-light">
              Request a quote
            </ButtonLink>
          </div>
        </div>
        <img className="hero-art" src={heroImage} alt="Energy infrastructure at dusk" width={1800} height={1350} />
      </div>
    </section>
  )
}

function AboutBlock({ link = true }: { link?: boolean }) {
  return (
    <section className="section">
      <div className="shell split">
        <Label>About MPH</Label>
        <div>
          <h2 className="statement">{about.statement}</h2>
          <p className="muted body-lg">{about.body}</p>
          <ul className="checks">
            {about.points.map(p => (
              <li key={p}>
                <Icon name="check" size={16} />
                {p}
              </li>
            ))}
          </ul>
          {link && (
            <a className="text-link" href={href('about')}>
              More about us <Icon name="arrowRight" size={18} />
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

function ServicesGrid({ detailed = false }: { detailed?: boolean }) {
  return (
    <section className="section section-alt">
      <div className="shell">
        <div className="section-head">
          <div>
            <Label>What we do</Label>
            <h2>
              Integrated <em>engineering services.</em>
            </h2>
          </div>
          {!detailed && (
            <ButtonLink to="services" variant="outline">
              All services
            </ButtonLink>
          )}
        </div>
        <ul className="card-grid">
          {services.map(s => (
            <li className="card" key={s.title}>
              <span className="card-icon">
                <Icon name={s.icon} size={22} />
              </span>
              <h3>{s.title}</h3>
              <p className="card-meta">{s.summary}</p>
              {detailed && <p className="muted">{s.body}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Sectors() {
  return (
    <section className="section section-tight">
      <div className="shell sectors-wrap">
        <Label>Sectors we serve</Label>
        <ul className="sectors">
          {sectors.map(s => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section className="section">
      <div className="shell">
        <div className="section-head">
          <div>
            <Label>How we work</Label>
            <h2>
              A clear path from <em>idea to handover.</em>
            </h2>
          </div>
        </div>
        <ol className="steps">
          {process.map((s, i) => (
            <li key={s.title}>
              <span>0{i + 1}</span>
              <h3>{s.title}</h3>
              <p className="muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Values() {
  return (
    <section className="section section-alt">
      <div className="shell">
        <div className="section-head">
          <div>
            <Label>What you can expect</Label>
            <h2>
              Your requirements <em>come first.</em>
            </h2>
          </div>
        </div>
        <ul className="card-grid">
          {values.map(v => (
            <li className="card" key={v.title}>
              <span className="card-icon">
                <Icon name={v.icon} size={22} />
              </span>
              <h3>{v.title}</h3>
              <p className="muted">{v.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function ProjectTypes() {
  const [filter, setFilter] = useState<(typeof projectSectors)[number]>('All')
  const shown = projectTypes.filter(p => filter === 'All' || p.sector === filter)
  return (
    <section className="section">
      <div className="shell">
        <div className="filters" role="group" aria-label="Filter by sector">
          {projectSectors.map(c => (
            <button key={c} aria-pressed={filter === c} onClick={() => setFilter(c)}>
              {c}
            </button>
          ))}
        </div>
        <ul className="card-grid" aria-live="polite">
          {shown.map(p => (
            <li className="card" key={p.title}>
              <span className="card-icon">
                <Icon name={p.icon} size={22} />
              </span>
              <h3>{p.title}</h3>
              <p className="card-meta">{p.sector}</p>
              <p className="muted">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function TeamRoles() {
  return (
    <section className="section">
      <div className="shell">
        <ul className="card-grid">
          {teamRoles.map(r => (
            <li className="card" key={r.title}>
              <span className="card-icon">
                <Icon name={r.icon} size={22} />
              </span>
              <h3>{r.title}</h3>
              <p className="muted">{r.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function CtaBand() {
  return (
    <section className="cta-band">
      <img className="cta-art" src={ctaImage} alt="Energy infrastructure" width={1800} height={1350} />
      <div className="shell cta-inner">
        <h2>
          Ready to build <em>what’s next?</em>
        </h2>
        <ButtonLink to="contact" variant="light">
          Start a conversation
        </ButtonLink>
      </div>
    </section>
  )
}

function ContactSection() {
  const [sentTo, setSentTo] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const name = String(new FormData(e.currentTarget).get('name') ?? '').trim()
    setPending(true)
    window.setTimeout(() => {
      setPending(false)
      setSentTo(name.split(' ')[0] || 'there')
    }, 800)
  }

  const details = [
    { icon: 'mail', title: 'Email', value: contact.email },
    { icon: 'phone', title: 'Phone', value: contact.phone },
    { icon: 'pin', title: 'Office', value: contact.address },
    { icon: 'clock', title: 'Hours', value: contact.hours },
  ] as const

  return (
    <section className="section">
      <div className="shell contact">
        <div>
          <h2>
            Have a project in mind? <em>Let’s talk.</em>
          </h2>
          <ul className="details">
            {details.map(d => (
              <li key={d.title}>
                <Icon name={d.icon} size={20} />
                <div>
                  <small>{d.title}</small>
                  <span>{d.value}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="form-panel" aria-live="polite">
          {sentTo ? (
            <div className="form-success">
              <span>
                <Icon name="check" size={28} />
              </span>
              <h3>Thank you, {sentTo}.</h3>
              <p className="muted">Your request has been received. Our team will reply within one business day.</p>
              <button className="btn btn-outline" onClick={() => setSentTo(null)}>
                <span>Send another request</span>
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit}>
              <div className="form-grid">
                <label className="field">
                  <span>Full name</span>
                  <input id="contact-name" name="name" required autoComplete="name" placeholder="Jane Doe" />
                </label>
                <label className="field">
                  <span>Email address</span>
                  <input id="contact-email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" />
                </label>
                <label className="field field-full">
                  <span>Service</span>
                  <select id="contact-service" name="service" required defaultValue="">
                    <option value="" disabled>
                      Select a service
                    </option>
                    {services.map(s => (
                      <option key={s.title}>{s.title}</option>
                    ))}
                  </select>
                </label>
                <label className="field field-full">
                  <span>Project details</span>
                  <textarea id="contact-message" name="message" rows={4} placeholder="Scope, location and timeline" />
                </label>
              </div>
              <button className="btn btn-primary" type="submit" disabled={pending}>
                <span>{pending ? 'Sending…' : 'Send request'}</span>
                <Icon name="arrowUpRight" size={18} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

/* ---------- Client login ---------- */

function Login() {
  const [mode, setFormMode] = useState<'signin' | 'reset'>('signin')
  const [showPassword, setShowPassword] = useState(false)
  const [pending, setPending] = useState(false)
  const [done, setDone] = useState<string | null>(null)

  // A showcase: the request is simulated so the flow can be reviewed.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = String(new FormData(e.currentTarget).get('email') ?? '').trim()
    setPending(true)
    window.setTimeout(() => {
      setPending(false)
      setDone(email)
    }, 900)
  }

  const switchMode = (next: 'signin' | 'reset') => {
    setFormMode(next)
    setDone(null)
    setShowPassword(false)
  }

  return (
    <section className="auth">
      <div className="auth-aside">
        <Rings art="solar" />
        <Logo onDark />
        <div className="auth-aside-copy">
          <Label light>{login.eyebrow}</Label>
          <h2>
            <Title text={login.title} />
          </h2>
          <ul>
            {login.features.map(x => (
              <li key={x}>
                <Icon name="check" size={16} />
                {x}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="auth-main">
        <div className="auth-top">
          <a className="auth-back" href={href('home')}>
            <Icon name="arrowLeft" size={16} /> Back to website
          </a>
          <ModeToggle />
        </div>
        <div className="auth-panel" aria-live="polite">
          {done ? (
            <div className="form-success">
              <span>
                <Icon name="check" size={28} />
              </span>
              <h1>{mode === 'signin' ? 'Welcome back.' : 'Check your inbox.'}</h1>
              <p className="muted">
                {mode === 'signin' ? (
                  <>
                    You are signed in as <b>{done}</b>.
                  </>
                ) : (
                  <>
                    If an account exists for <b>{done}</b>, we have sent a link to reset your password.
                  </>
                )}
              </p>
              <button className="btn btn-outline" onClick={() => switchMode('signin')}>
                <span>{mode === 'signin' ? 'Sign out' : 'Back to sign in'}</span>
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} key={mode}>
              <h1>{mode === 'signin' ? 'Sign in' : 'Reset password'}</h1>
              <p className="muted form-note">
                {mode === 'signin'
                  ? 'Access your project dashboard, reports and documents.'
                  : 'Enter the email linked to your account and we will send you a reset link.'}
              </p>
              <div className="auth-fields">
                <label className="field">
                  <span>Email address</span>
                  <input id="login-email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" />
                </label>
                {mode === 'signin' && (
                  <label className="field">
                    <span>Password</span>
                    <div className="password">
                      <input
                        id="login-password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        minLength={8}
                        autoComplete="current-password"
                        placeholder="Minimum 8 characters"
                      />
                      <button
                        type="button"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        aria-pressed={showPassword}
                        onClick={() => setShowPassword(v => !v)}
                      >
                        <Icon name={showPassword ? 'eyeOff' : 'eye'} size={18} />
                      </button>
                    </div>
                  </label>
                )}
              </div>
              {mode === 'signin' && (
                <div className="auth-row">
                  <label className="checkbox">
                    <input id="login-remember" type="checkbox" name="remember" />
                    Keep me signed in
                  </label>
                  <button type="button" className="auth-link" onClick={() => switchMode('reset')}>
                    Forgot password?
                  </button>
                </div>
              )}
              <button className="btn btn-primary auth-submit" type="submit" disabled={pending}>
                <span>{pending ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Send reset link'}</span>
                <Icon name="arrowRight" size={18} />
              </button>
              <p className="auth-foot">
                {mode === 'signin' ? (
                  <>
                    Not a client yet? <a href={href('contact')}>Request access</a>
                  </>
                ) : (
                  <button type="button" className="auth-link" onClick={() => switchMode('signin')}>
                    <Icon name="arrowLeft" size={16} /> Back to sign in
                  </button>
                )}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

/* ---------- Pages ---------- */

function Home() {
  return (
    <>
      <HomeHero />
      <AboutBlock />
      <ServicesGrid />
      <Sectors />
      <CtaBand />
    </>
  )
}

function About() {
  return (
    <>
      <PageHero page="about" />
      <AboutBlock link={false} />
      <Process />
      <Values />
    </>
  )
}

function Services() {
  return (
    <>
      <PageHero page="services" />
      <ServicesGrid detailed />
      <Process />
      <CtaBand />
    </>
  )
}

function Projects() {
  return (
    <>
      <PageHero page="projects" />
      <ProjectTypes />
      <CtaBand />
    </>
  )
}

function Team() {
  return (
    <>
      <PageHero page="team" />
      <TeamRoles />
      <CtaBand />
    </>
  )
}

function Contact() {
  return (
    <>
      <PageHero page="contact" />
      <ContactSection />
    </>
  )
}

export default function App() {
  const page = usePage()
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const label = page === 'login' ? 'Client Login' : nav.find(p => p.id === page)?.label
    document.title = page === 'home' ? 'MPH Energy — Construction & Energy Services' : `${label} — MPH Energy`
  }, [page])

  return (
    <>
      <a
        className="skip-link"
        href="#main"
        onClick={e => {
          e.preventDefault()
          mainRef.current?.focus()
        }}
      >
        Skip to content
      </a>
      {page !== 'login' && <Header page={page} />}
      <main id="main" ref={mainRef} tabIndex={-1}>
        {page === 'home' && <Home />}
        {page === 'about' && <About />}
        {page === 'services' && <Services />}
        {page === 'projects' && <Projects />}
        {page === 'team' && <Team />}
        {page === 'contact' && <Contact />}
        {page === 'login' && <Login />}
      </main>
      {page !== 'login' && <Footer />}
    </>
  )
}
