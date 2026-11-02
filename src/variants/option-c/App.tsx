import { useEffect, useRef, useState } from 'react'
import { nav, type PageId } from '../../shared/content'
import { readPage } from './routes'
import {
  AboutIntro,
  ContactSection,
  HomeHero,
  PageHeader,
  ProcessSection,
  ProjectTypes,
  Sectors,
  ServicesSection,
  TeamRoles,
  Values,
} from './sections'
import { Footer, Nav } from './ui'
import { Login } from './Login'

function usePage() {
  const [page, setPage] = useState<PageId>(readPage)
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

const label = (page: PageId) => nav.find(n => n.id === page)?.label ?? 'Client Login'

export default function App() {
  const page = usePage()
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    document.title = page === 'home' ? 'MPH Energy | Energy, Construction & Engineering' : `${label(page)} | MPH Energy`
  }, [page])

  return (
    <div className="optc">
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
      {page !== 'login' && <Nav page={page} />}
      <main id="main" ref={mainRef} tabIndex={-1} aria-label={label(page)} key={page}>
        {page === 'home' && (
          <>
            <HomeHero />
            <AboutIntro />
            <ServicesSection />
            <Sectors />
          </>
        )}
        {page === 'about' && (
          <>
            <PageHeader page="about" label={label('about')} />
            <AboutIntro full />
            <ProcessSection />
            <Values />
          </>
        )}
        {page === 'services' && (
          <>
            <PageHeader page="services" label={label('services')} />
            <ServicesSection head={false} />
            <ProcessSection />
          </>
        )}
        {page === 'projects' && (
          <>
            <PageHeader page="projects" label={label('projects')} />
            <ProjectTypes />
          </>
        )}
        {page === 'team' && (
          <>
            <PageHeader page="team" label={label('team')} />
            <TeamRoles />
          </>
        )}
        {page === 'contact' && (
          <>
            <PageHeader page="contact" label={label('contact')} />
            <ContactSection />
          </>
        )}
        {page === 'login' && <Login />}
      </main>
      {page !== 'login' && <Footer page={page} />}
    </div>
  )
}
