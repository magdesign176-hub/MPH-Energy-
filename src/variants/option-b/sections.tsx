import { useState, type FormEvent } from 'react'
import heroImage from '../../assets/energy/b-hero.jpg'
import { Icon, type IconName } from '../../components/Icon'
import {
  about,
  brand,
  contact,
  pageHeaders,
  process,
  projectSectors,
  projectTypes,
  sectors,
  services,
  teamRoles,
  values,
} from '../../shared/content'
import { Btn, HeroDrawing, Label, MiniDrawing, SectionHead, href, type MiniKind } from './ui'

const pad = (n: number) => String(n).padStart(2, '0')

/* ---------- Headers ---------- */

export function HomeHero() {
  return (
    <section className="b-hero">
      <div className="b-wrap b-hero-grid">
        <div className="b-hero-copy">
          <Label>{brand.tagline}</Label>
          <h1 className="b-display b-h1">
            {brand.headline[0]} {brand.headline[1].replace(/\.$/, '')}
            <span className="b-signal">.</span>
          </h1>
          <p className="b-lead">{brand.intro}</p>
          <div className="b-actions">
            <Btn to="services">Our services</Btn>
            <Btn to="contact" variant="outline">
              Request a quote
            </Btn>
          </div>
        </div>
        <div className="b-hero-art">
          <img src={heroImage} alt="Energy infrastructure" width={1800} height={1350} />
        </div>
      </div>
    </section>
  )
}

export function PageHeader({ page }: { page: MiniKind }) {
  const { title, intro } = pageHeaders[page]
  return (
    <section className="b-pagehead">
      <div className="b-wrap b-pagehead-grid">
        <div>
          <h1 className="b-display b-h1">{title}</h1>
          <p className="b-lead">{intro}</p>
        </div>
        <div className="b-pagehead-art">
          <MiniDrawing kind={page} />
        </div>
      </div>
    </section>
  )
}

/* ---------- Content sections ---------- */

export function AboutBlock({ showLink = false }: { showLink?: boolean }) {
  return (
    <section className="b-section">
      <div className="b-wrap b-about">
        <div>
          <Label>About MPH</Label>
          <p className="b-statement">{about.statement}</p>
        </div>
        <div className="b-about-side">
          <p className="b-muted">{about.body}</p>
          <ul className="b-points">
            {about.points.map(p => (
              <li key={p}>
                <Icon name="check" size={16} />
                {p}
              </li>
            ))}
          </ul>
          {showLink && (
            <a className="b-textlink" href={href('about')}>
              More about us <Icon name="arrowRight" size={16} />
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

export function ServicesGrid({ detailed = false }: { detailed?: boolean }) {
  return (
    <section className="b-section">
      <div className="b-wrap">
        <SectionHead
          label="Services"
          title="What we do"
          action={
            detailed ? undefined : (
              <Btn to="services" variant="outline">
                All services
              </Btn>
            )
          }
        />
        <ul className="b-cards">
          {services.map(s => (
            <li key={s.title} className="b-card">
              <Icon name={s.icon} size={24} />
              <h3 className="b-display b-h3">{s.title}</h3>
              <p className="b-mono b-card-tag">{s.summary}</p>
              {detailed && <p className="b-card-body">{s.body}</p>}
              {detailed && (
                <a className="b-card-link" href={href('contact')}>
                  Enquire <span className="b-sr">about {s.title}</span>
                  <Icon name="arrowRight" size={16} />
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function Process() {
  return (
    <section className="b-section">
      <div className="b-wrap">
        <SectionHead label="Process" title="From brief to handover" />
        <ol className="b-process">
          {process.map((s, i) => (
            <li key={s.title}>
              <span className="b-mono">{pad(i + 1)}</span>
              <h3 className="b-display b-h3">{s.title}</h3>
              <p className="b-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function IconCards({ items }: { items: { title: string; body: string; icon: IconName }[] }) {
  return (
    <ul className="b-cards">
      {items.map(v => (
        <li key={v.title} className="b-card">
          <Icon name={v.icon} size={24} />
          <h3 className="b-display b-h3">{v.title}</h3>
          <p className="b-card-body">{v.body}</p>
        </li>
      ))}
    </ul>
  )
}

export function Values() {
  return (
    <section className="b-section">
      <div className="b-wrap">
        <SectionHead label="Values" title="How we work" />
        <IconCards items={values} />
      </div>
    </section>
  )
}

export function TeamRoles() {
  return (
    <section className="b-section">
      <div className="b-wrap">
        <SectionHead label="Our team" title="Six disciplines, one team" />
        <IconCards items={teamRoles} />
      </div>
    </section>
  )
}

export function Sectors() {
  return (
    <section className="b-section b-section-tight">
      <div className="b-wrap b-sectors">
        <Label>Sectors</Label>
        <ul>
          {sectors.map(s => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function ProjectTypes() {
  const [filter, setFilter] = useState<(typeof projectSectors)[number]>('All')
  const shown = projectTypes.filter(p => filter === 'All' || p.sector === filter)
  return (
    <section className="b-section">
      <div className="b-wrap">
        <div className="b-seg" role="group" aria-label="Filter by sector">
          {projectSectors.map(s => (
            <button key={s} type="button" aria-pressed={filter === s} onClick={() => setFilter(s)}>
              {s}
            </button>
          ))}
        </div>
        <ul className="b-cards" aria-live="polite">
          {shown.map(p => (
            <li key={p.title} className="b-card">
              <div className="b-card-top">
                <Icon name={p.icon} size={24} />
                <span className="b-mono b-card-tag">{p.sector}</span>
              </div>
              <h3 className="b-display b-h3">{p.title}</h3>
              <p className="b-card-body">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function CtaBand() {
  return (
    <section className="b-section">
      <div className="b-wrap">
        <div className="b-cta">
          <h2 className="b-display b-h2">Have a project in mind?</h2>
          <Btn to="contact" variant="signal">
            Request a quote
          </Btn>
        </div>
      </div>
    </section>
  )
}

/* ---------- Contact ---------- */

export function ContactSection() {
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [name, setName] = useState('')

  // No backend: simulate the request so the flow can be reviewed.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const n = String(new FormData(e.currentTarget).get('name') ?? '').trim()
    setName(n.split(' ')[0] || 'there')
    setState('sending')
    window.setTimeout(() => setState('sent'), 1100)
  }

  const details: { icon: IconName; title: string; value: string; link?: string }[] = [
    { icon: 'mail', title: 'Email', value: contact.email, link: `mailto:${contact.email}` },
    { icon: 'phone', title: 'Phone', value: contact.phone },
    { icon: 'pin', title: 'Office', value: contact.address },
    { icon: 'clock', title: 'Hours', value: contact.hours },
  ]

  return (
    <section className="b-section">
      <div className="b-wrap b-contact">
        <div className="b-form-panel" aria-live="polite">
          {state === 'sent' ? (
            <div className="b-success">
              <span className="b-success-mark">
                <Icon name="check" size={24} />
              </span>
              <h2 className="b-display b-h3">Thank you, {name}.</h2>
              <p className="b-muted">Your request has been received. We will be in touch within one business day.</p>
              <button type="button" className="b-btn b-btn-outline" onClick={() => setState('idle')}>
                <span>Send another request</span>
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="b-form">
              <h2 className="b-display b-h3">Request a quote</h2>
              <div className="b-form-grid">
                <label className="b-field">
                  <span>Name *</span>
                  <input name="name" required autoComplete="name" />
                </label>
                <label className="b-field">
                  <span>Email *</span>
                  <input name="email" type="email" required autoComplete="email" />
                </label>
                <label className="b-field b-field-full">
                  <span>Service</span>
                  <select name="service" defaultValue="">
                    <option value="">Select a service</option>
                    {services.map(s => (
                      <option key={s.title}>{s.title}</option>
                    ))}
                  </select>
                </label>
                <label className="b-field b-field-full">
                  <span>Message</span>
                  <textarea name="message" rows={4} />
                </label>
              </div>
              <div className="b-form-foot">
                <button className="b-btn b-btn-signal" type="submit" disabled={state === 'sending'}>
                  <span>{state === 'sending' ? 'Sending…' : 'Send request'}</span>
                  <Icon name="arrowRight" size={16} />
                </button>
                {state === 'sending' && <span className="b-progress" aria-hidden="true" />}
              </div>
            </form>
          )}
        </div>
        <dl className="b-details">
          {details.map(d => (
            <div key={d.title}>
              <dt>
                <Icon name={d.icon} size={16} />
                {d.title}
              </dt>
              <dd>{d.link ? <a href={d.link}>{d.value}</a> : d.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
