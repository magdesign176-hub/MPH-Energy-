import { useState, type FormEvent } from 'react'
import heroImage from '../../assets/energy/c-hero.jpg'
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
  type PageId,
} from '../../shared/content'
import { href } from './routes'
import { Accent, Btn, Eyebrow, HorizonArt, SectionHead, Spinner } from './ui'

/* ---------- Home hero ---------- */

export function HomeHero() {
  return (
    <section className="hero">
      <img className="hero-image" src={heroImage} alt="Energy infrastructure" />
      <div className="hero-content wrap">
        <div className="rise">
          <Eyebrow>{brand.tagline}</Eyebrow>
        </div>
        <h1 className="hero-title rise rise-2">
          {brand.headline[0]} <span className="grad-text">{brand.headline[1]}</span>
        </h1>
        <p className="hero-lead rise rise-3">{brand.intro}</p>
        <div className="hero-ctas rise rise-4">
          <Btn to="services">Explore our services</Btn>
          <Btn to="contact" variant="glass">
            Get in touch
          </Btn>
        </div>
      </div>
    </section>
  )
}

/* ---------- Inner page header ---------- */

type InnerPage = keyof typeof pageHeaders

export function PageHeader({ page, label }: { page: InnerPage; label: string }) {
  const { title, intro } = pageHeaders[page]
  return (
    <section className="page-head">
      <div className="page-head-panel">
        <div className="aurora aurora-1" aria-hidden="true" />
        <div className="page-head-grid" aria-hidden="true" />
        <div className="page-head-copy">
          <nav aria-label="Breadcrumb" className="crumbs">
            <ol>
              <li>
                <a href={href('home')}>Home</a>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <a href={href(page as PageId)} aria-current="page">
                  {label}
                </a>
              </li>
            </ol>
          </nav>
          <h1 className="page-title rise">
            <Accent text={title} />
          </h1>
          <p className="page-intro rise rise-2">{intro}</p>
        </div>
      </div>
    </section>
  )
}

/* ---------- About ---------- */

export function AboutIntro({ full = false }: { full?: boolean }) {
  return (
    <section className="sec">
      <div className="wrap about-grid">
        <div>
          <Eyebrow>About MPH</Eyebrow>
          <h2 className="h2">
            <Accent text={about.statement} phrase="safe, reliable assets" />
          </h2>
        </div>
        <div className="about-side">
          <p className="lead-muted">{about.body}</p>
          {full ? (
            <ul className="points">
              {about.points.map(p => (
                <li key={p}>
                  <span className="check-ico">
                    <Icon name="check" size={14} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          ) : (
            <a className="text-link" href={href('about')}>
              More about us <Icon name="arrowRight" size={18} />
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

/* ---------- Icon cards (services, project types, roles, values) ---------- */

function IconCard({ icon, kicker, title, body }: { icon: IconName; kicker?: string; title: string; body?: string }) {
  return (
    <li className="card">
      <span className="card-icon">
        <Icon name={icon} size={22} />
      </span>
      {kicker && <span className="card-kicker">{kicker}</span>}
      <h3>{title}</h3>
      {body && <p>{body}</p>}
    </li>
  )
}

export function ServicesSection({ head = true }: { head?: boolean }) {
  return (
    <section className="sec">
      <div className="wrap">
        {head && (
          <SectionHead
            eyebrow="What we do"
            title={
              <>
                Integrated <span className="grad-text">engineering services.</span>
              </>
            }
          />
        )}
        <ul className="cards cards-3">
          {services.map(s => (
            <IconCard key={s.title} icon={s.icon} kicker={s.summary} title={s.title} body={s.body} />
          ))}
        </ul>
      </div>
    </section>
  )
}

export function Sectors() {
  return (
    <section className="sec sec-tight">
      <div className="wrap sectors">
        <p className="sectors-title">Sectors we serve</p>
        <ul>
          {sectors.map(s => (
            <li key={s}>
              <span aria-hidden="true" />
              {s}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function ProcessSection() {
  return (
    <section className="sec">
      <div className="wrap">
        <SectionHead
          eyebrow="How we work"
          title={
            <>
              A clear path from <span className="grad-text">brief to handover.</span>
            </>
          }
        />
        <ol className="steps">
          {process.map((p, i) => (
            <li key={p.title} className="step">
              <span className="step-num">0{i + 1}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function Values() {
  return (
    <section className="sec">
      <div className="wrap">
        <SectionHead
          eyebrow="What you can expect"
          title={
            <>
              Your requirements <span className="grad-text">come first.</span>
            </>
          }
        />
        <ul className="cards cards-3">
          {values.map(v => (
            <IconCard key={v.title} icon={v.icon} title={v.title} body={v.body} />
          ))}
        </ul>
      </div>
    </section>
  )
}

export function ProjectTypes() {
  const [filter, setFilter] = useState<(typeof projectSectors)[number]>('All')
  const list = projectTypes.filter(p => filter === 'All' || p.sector === filter)
  return (
    <section className="sec">
      <div className="wrap">
        <div className="chips" role="group" aria-label="Filter by sector">
          {projectSectors.map(s => (
            <button key={s} type="button" className="chip" aria-pressed={filter === s} onClick={() => setFilter(s)}>
              {s}
            </button>
          ))}
        </div>
        <ul className="cards cards-3" aria-live="polite">
          {list.map(p => (
            <IconCard key={p.title} icon={p.icon} kicker={p.sector} title={p.title} body={p.body} />
          ))}
        </ul>
      </div>
    </section>
  )
}

export function TeamRoles() {
  return (
    <section className="sec">
      <div className="wrap">
        <ul className="cards cards-3">
          {teamRoles.map(r => (
            <IconCard key={r.title} icon={r.icon} title={r.title} body={r.body} />
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ---------- Contact ---------- */

export function ContactSection() {
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle')
  const [name, setName] = useState('')

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const n = String(new FormData(e.currentTarget).get('name') ?? '').trim()
    setName(n.split(' ')[0] || 'there')
    setState('sending')
    window.setTimeout(() => setState('done'), 1200)
  }

  const details: { icon: IconName; title: string; value: string; link?: string }[] = [
    { icon: 'mail', title: 'Email', value: contact.email, link: `mailto:${contact.email}` },
    { icon: 'phone', title: 'Phone', value: contact.phone },
    { icon: 'pin', title: 'Office', value: contact.address },
    { icon: 'clock', title: 'Hours', value: contact.hours },
  ]

  return (
    <section className="sec contact-sec">
      <div className="contact-glow" aria-hidden="true" />
      <div className="wrap contact-grid">
        <div className="contact-copy">
          <h2 className="h2">
            Tell us about <span className="grad-text">your project.</span>
          </h2>
          <ul className="contact-details">
            {details.map(d => (
              <li key={d.title}>
                <span className="contact-ico">
                  <Icon name={d.icon} size={18} />
                </span>
                <span>
                  <small>{d.title}</small>
                  {d.link ? <a href={d.link}>{d.value}</a> : <span>{d.value}</span>}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="form-panel glass" aria-live="polite">
          {state === 'done' ? (
            <div className="success">
              <span className="success-ico">
                <Icon name="check" size={30} />
              </span>
              <h3>Thank you, {name}.</h3>
              <p>Your message has been received. Our team will respond within one business day.</p>
              <button type="button" className="c-btn c-btn-glass" onClick={() => setState('idle')}>
                <span>Send another message</span>
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit}>
              <fieldset className="form-grid" disabled={state === 'sending'}>
                <label className="field">
                  <span>Full name *</span>
                  <input name="name" required autoComplete="name" placeholder="Jane Doe" />
                </label>
                <label className="field">
                  <span>Email address *</span>
                  <input name="email" type="email" required autoComplete="email" placeholder="you@company.com" />
                </label>
                <label className="field field-full">
                  <span>Service</span>
                  <select name="service" defaultValue="">
                    <option value="">Select a service</option>
                    {services.map(s => (
                      <option key={s.title}>{s.title}</option>
                    ))}
                  </select>
                </label>
                <label className="field field-full">
                  <span>Project details</span>
                  <textarea name="message" rows={4} placeholder="Scope, location and timeline" />
                </label>
              </fieldset>
              <button className="c-btn c-btn-primary c-btn-block" type="submit" disabled={state === 'sending'}>
                {state === 'sending' ? (
                  <>
                    <Spinner />
                    <span>Sending…</span>
                  </>
                ) : (
                  <>
                    <span>Send message</span>
                    <Icon name="send" size={18} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
