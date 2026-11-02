import { useEffect, useRef, useState } from 'react'
import { Icon } from '../../components/Icon'
import { brand, contact, nav, type PageId } from '../../shared/content'
import Login from './Login'
import {
  AboutBlock,
  ContactSection,
  CtaBand,
  HomeHero,
  PageHeader,
  Process,
  ProjectTypes,
  Sectors,
  ServicesGrid,
  TeamRoles,
  Values,
} from './sections'
import { Logo, ModeToggle, href } from './ui'

/* ---------- Routing: plain hash names (#about, #login …) ---------- */

function readPage(): PageId {
  const id = window.location.hash.replace(/^#/, '')
  return id === 'login' || nav.some(n => n.id === id) ? (id as PageId) : 'home'
}

function usePage() {
  const [page, setPage] = useState<PageId>(readPage)
  useEffect(() => {
    const onHash = () => {
      setPage(readPage())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return page
}

const titles: Record<PageId, string> = {
  home: 'MPH Energy | Construction & Energy Services',
  about: 'About | MPH Energy',
  services: 'Services | MPH Energy',
  projects: 'Projects | MPH Energy',
  team: 'Our Team | MPH Energy',
  contact: 'Contact | MPH Energy',
  login: 'Client Login | MPH Energy',
}

/* ---------- Layout ---------- */

function Header({ page }: { page: PageId }) {
  const [open, setOpen] = useState(false)

  useEffect(() => setOpen(false), [page])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const mq = window.matchMedia('(min-width: 1101px)')
    const onMq = () => mq.matches && setOpen(false)
    document.addEventListener('keydown', onKey)
    mq.addEventListener('change', onMq)
    document.body.classList.add('b-noscroll')
    return () => {
      document.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onMq)
      document.body.classList.remove('b-noscroll')
    }
  }, [open])

  return (
    <header className={`b-header${open ? ' open' : ''}`}>
      <div className="b-wrap b-header-bar">
        <Logo />
        <nav id="b-nav" className="b-nav" aria-label="Main">
          <ul>
            {nav.map(n => (
              <li key={n.id}>
                <a href={href(n.id)} aria-current={page === n.id ? 'page' : undefined}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="b-nav-extra">
            <ModeToggle block />
            <a className="b-btn b-btn-outline b-btn-block" href={href('login')}>
              <span>Client login</span>
              <Icon name="lock" size={16} />
            </a>
            <a className="b-btn b-btn-solid b-btn-block" href={href('contact')}>
              <span>Get in touch</span>
              <Icon name="arrowRight" size={16} />
            </a>
          </div>
        </nav>
        <div className="b-header-actions">
          <ModeToggle />
          <a className="b-login-link" href={href('login')}>
            <Icon name="lock" size={15} />
            Client login
          </a>
          <a className="b-btn b-btn-solid b-btn-sm" href={href('contact')}>
            <span>Get in touch</span>
            <Icon name="arrowRight" size={15} />
          </a>
        </div>
        <button
          type="button"
          className="b-menu-btn"
          aria-expanded={open}
          aria-controls="b-nav"
          onClick={() => setOpen(o => !o)}
        >
          <span className="b-mono">{open ? 'Close' : 'Menu'}</span>
          <Icon name={open ? 'close' : 'menu'} size={20} />
        </button>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="b-footer">
      <div className="b-wrap">
        <div className="b-footer-grid">
          <div className="b-footer-brand">
            <Logo />
            <p className="b-mono b-muted">{brand.tagline}</p>
          </div>
          <ul className="b-footer-links">
            {nav.slice(1).map(n => (
              <li key={n.id}>
                <a href={href(n.id)}>{n.label}</a>
              </li>
            ))}
            <li>
              <a href={href('login')}>Client login</a>
            </li>
          </ul>
          <ul className="b-footer-contact">
            <li>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
            <li>{contact.phone}</li>
            <li>{contact.hours}</li>
          </ul>
        </div>
        <div className="b-footer-base">
          <button type="button" className="b-mono b-totop" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Back to top <Icon name="arrowUp" size={14} />
          </button>
        </div>
      </div>
    </footer>
  )
}

/* ---------- Pages ---------- */

function Page({ page }: { page: PageId }) {
  switch (page) {
    case 'about':
      return (
        <>
          <PageHeader page="about" />
          <AboutBlock />
          <Process />
          <Values />
        </>
      )
    case 'services':
      return (
        <>
          <PageHeader page="services" />
          <ServicesGrid detailed />
          <Process />
        </>
      )
    case 'projects':
      return (
        <>
          <PageHeader page="projects" />
          <ProjectTypes />
          <CtaBand />
        </>
      )
    case 'team':
      return (
        <>
          <PageHeader page="team" />
          <TeamRoles />
          <CtaBand />
        </>
      )
    case 'contact':
      return (
        <>
          <PageHeader page="contact" />
          <ContactSection />
        </>
      )
    case 'login':
      return <Login />
    default:
      return (
        <>
          <HomeHero />
          <AboutBlock showLink />
          <ServicesGrid />
          <Sectors />
          <CtaBand />
        </>
      )
  }
}

export default function App() {
  const page = usePage()
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    document.title = titles[page]
  }, [page])

  return (
    <div className="b-root">
      <a
        className="b-skip"
        href="#main"
        onClick={e => {
          e.preventDefault()
          mainRef.current?.focus()
        }}
      >
        Skip to content
      </a>
      {page !== 'login' && <Header page={page} />}
      <main id="main" ref={mainRef} tabIndex={-1} key={page} className="b-main">
        <Page page={page} />
      </main>
      {page !== 'login' && <Footer />}
    </div>
  )
}
