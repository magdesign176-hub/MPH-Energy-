/*
  Shared, legally safe content for all three MPH Energy design options.
  - Original copy only; no third-party images, named people, testimonials or unverifiable figures.
  - Contact details are placeholders (reserved .example domain) until the client supplies real ones.
*/
import type { IconName } from '../components/Icon'

export type PageId = 'home' | 'about' | 'services' | 'projects' | 'team' | 'contact' | 'login'

export const brand = {
  name: 'MPH Energy',
  tagline: 'Energy · Construction · Engineering',
  headline: ['Infrastructure', 'that powers progress.'] as const,
  intro:
    'MPH Energy delivers construction and engineering services for energy, commercial and residential clients: safely, on programme and to specification.',
}

export const nav: { id: Exclude<PageId, 'login'>; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'team', label: 'Our Team' },
  { id: 'contact', label: 'Contact' },
]

/** Title and one-line intro for each inner page's header. */
export const pageHeaders: Record<Exclude<PageId, 'home' | 'login'>, { title: string; intro: string }> = {
  about: {
    title: 'Built on craft, driven by purpose.',
    intro: 'An engineering and construction partner that takes ownership of every detail, from first study to final handover.',
  },
  services: {
    title: 'Integrated services, one partner.',
    intro: 'Six disciplines delivered by one accountable team, so nothing falls between the gaps.',
  },
  projects: {
    title: 'The work we deliver.',
    intro: 'The types of projects we plan, build and hand over across energy, commercial and residential sectors.',
  },
  team: {
    title: 'The people behind the work.',
    intro: 'Multidisciplinary teams that plan, build and commission, with one point of contact for every client.',
  },
  contact: {
    title: 'Let’s start a conversation.',
    intro: 'Tell us about your project and our team will respond within one business day.',
  },
}

export const about = {
  statement: 'An engineering and construction partner for industry, delivering safe, reliable assets for our clients.',
  body: 'Every engagement is led by specialists who own the outcome, backed by rigorous quality control and an uncompromising approach to safety.',
  points: ['Feasibility and planning', 'Engineering and design', 'Construction and installation', 'Commissioning and handover'],
}

export const services: { title: string; summary: string; body: string; icon: IconName }[] = [
  {
    title: 'Interior Fit-Out',
    summary: 'Commercial and residential',
    body: 'Complete interior fit-out with precise detailing, specified materials and minimal disruption.',
    icon: 'home',
  },
  {
    title: 'Plumbing & Piping',
    summary: 'Water, drainage and process',
    body: 'Pipework and water systems designed, installed and tested for performance and long service life.',
    icon: 'droplet',
  },
  {
    title: 'Roofing & Envelope',
    summary: 'Weatherproofing and insulation',
    body: 'Roofing and building-envelope systems specified for demanding climates.',
    icon: 'roof',
  },
  {
    title: 'Residential Development',
    summary: 'Design and build',
    body: 'Residential schemes planned and delivered end to end, on programme and on budget.',
    icon: 'building',
  },
  {
    title: 'Mechanical & MEP',
    summary: 'Install and commission',
    body: 'Mechanical, electrical and plumbing installations built and commissioned by engineering teams.',
    icon: 'gear',
  },
  {
    title: 'Architecture & Construction',
    summary: 'Concept to handover',
    body: 'Architectural design and main-contractor delivery under one accountable team.',
    icon: 'compass',
  },
]

/** A real sequence, so numbering it is meaningful. */
export const process: { title: string; body: string }[] = [
  { title: 'Understand', body: 'We study the site, the brief and the constraints before anything is drawn.' },
  { title: 'Design', body: 'Concepts are developed with you and tested against budget and programme.' },
  { title: 'Build', body: 'Safe, precise delivery with clear reporting at every stage.' },
  { title: 'Hand over', body: 'Testing, commissioning and a clean, documented handover.' },
]

export const values: { title: string; body: string; icon: IconName }[] = [
  { title: 'Safety first', body: 'Site-specific safety plans and daily supervision on every project.', icon: 'shield' },
  { title: 'Clear reporting', body: 'Regular progress, cost and risk updates you can act on.', icon: 'chart' },
  { title: 'One point of contact', body: 'A dedicated lead from first brief through to handover.', icon: 'message' },
]

export const sectors = ['Oil & Gas', 'Power', 'Petrochemical', 'Infrastructure', 'Commercial', 'Residential']

/** Project types, not named case studies: nothing here claims a specific past job. */
export const projectTypes: { title: string; sector: string; body: string; icon: IconName }[] = [
  { title: 'Industrial facilities', sector: 'Energy', body: 'Plant buildings, process areas and supporting infrastructure.', icon: 'derrick' },
  { title: 'Commercial buildings', sector: 'Commercial', body: 'Offices and mixed-use buildings from shell to fit-out.', icon: 'building' },
  { title: 'Residential schemes', sector: 'Residential', body: 'Apartments and townhouses delivered design and build.', icon: 'home' },
  { title: 'Interior fit-outs', sector: 'Commercial', body: 'Workplaces and interiors finished to specification.', icon: 'compass' },
  { title: 'MEP installations', sector: 'Energy', body: 'Mechanical, electrical and plumbing systems, installed and commissioned.', icon: 'gear' },
  { title: 'Roofing & envelope', sector: 'Residential', body: 'New roofs, replacements and building-envelope upgrades.', icon: 'roof' },
]

export const projectSectors = ['All', 'Energy', 'Commercial', 'Residential'] as const

/** Roles, not named people. */
export const teamRoles: { title: string; body: string; icon: IconName }[] = [
  { title: 'Leadership', body: 'Sets direction and stays accountable for every client relationship.', icon: 'target' },
  { title: 'Engineering', body: 'Designs and checks the systems behind every project.', icon: 'gear' },
  { title: 'Project delivery', body: 'Plans the programme and runs each site day to day.', icon: 'calendar' },
  { title: 'Health, safety & quality', body: 'Keeps people safe and work to specification.', icon: 'shield' },
  { title: 'Design & architecture', body: 'Shapes layouts, materials and details with clients.', icon: 'compass' },
  { title: 'Client services', body: 'Your single point of contact from brief to handover.', icon: 'users' },
]

/** Placeholders: replace with the client's real details. The .example domain is reserved and cannot belong to anyone. */
export const contact = {
  email: 'hello@mphenergy.example',
  phone: '+000 0000 0000',
  address: 'Head office address',
  hours: 'Monday – Friday, 09:00 – 17:00',
}

export const login = {
  eyebrow: 'Client portal',
  title: 'Your projects, in one place.',
  features: ['Programme and milestone tracking', 'Progress reports', 'Documents and approvals'],
}
