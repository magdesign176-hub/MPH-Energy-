import type { ReactNode } from 'react'

const paths = {
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
  arrowUp: <path d="M12 19V5M6 11l6-6 6 6" />,
  phone: (
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" />
  ),
  mail: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="m22 7-10 6.5L2 7" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  check: <path d="M20 6 9 17l-5-5" />,
  menu: <path d="M4 7h16M4 12h16M4 17h10" />,
  close: <path d="M18 6 6 18M6 6l12 12" />,
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7Z" />,
  home: (
    <>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9v12h14V9M10 21v-6h4v6" />
    </>
  ),
  droplet: <path d="M12 2.7s6.5 6.6 6.5 11.6a6.5 6.5 0 0 1-13 0C5.5 9.3 12 2.7 12 2.7Z" />,
  roof: (
    <>
      <path d="M2.5 12.5 12 4.5l9.5 8M16 7.9V4.5h3v6" />
      <path d="M5 11v9.5h14V11M9.5 20.5V15h5v5.5" />
    </>
  ),
  building: (
    <>
      <rect x="4" y="2.5" width="16" height="19" rx="1" />
      <path d="M8.5 7h1.5M14 7h1.5M8.5 11h1.5M14 11h1.5M8.5 15h1.5M14 15h1.5M10 21.5v-3h4v3" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="4.5" r="2" />
      <path d="M11 6.5 5 21.5M13 6.5l6 15M7.5 15.5h9" />
    </>
  ),
  derrick: <path d="M12 2 6.5 21.5M12 2l5.5 19.5M8.3 15h7.4M9.9 9h4.2M4 21.5h16" />,
  users: (
    <>
      <circle cx="9" cy="7.5" r="3.5" />
      <path d="M2.5 21v-1.5A4.5 4.5 0 0 1 7 15h4a4.5 4.5 0 0 1 4.5 4.5V21M16 4.1a3.5 3.5 0 0 1 0 6.8M21.5 21v-1.5a4.5 4.5 0 0 0-3-4.2" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="8.5" r="6" />
      <path d="M8.3 13.3 7 22l5-3 5 3-1.3-8.7" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4.5" width="18" height="17" rx="2" />
      <path d="M16 2.5v4M8 2.5v4M3 10h18" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  bulb: <path d="M9 18h6M10 21.5h4M12 2.5a6.5 6.5 0 0 0-3.8 11.8c.5.4.8 1 .8 1.7V16h6v-.1c0-.6.3-1.2.8-1.6A6.5 6.5 0 0 0 12 2.5Z" />,
  message: <path d="M21 15a2 2 0 0 1-2 2H7.5L3 21V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />,
  target: (
    <>
      <circle cx="12" cy="12" r="9.5" />
      <circle cx="12" cy="12" r="5.5" />
      <circle cx="12" cy="12" r="1.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </>
  ),
  chart: <path d="M3 3v18h18M7 15l4-4 3 3 6-6" />,
  clipboard: (
    <>
      <rect x="5" y="4" width="14" height="18" rx="2" />
      <path d="M9 2.5h6v3H9zM9 11h6M9 15h4" />
    </>
  ),
  quote: (
    <path
      d="M3 20.5c3 0 7-1.4 7-8.5V4.5H3v7.5h4c0 4-2 5.5-4 5.5Zm11 0c3 0 7-1.4 7-8.5V4.5h-7v7.5h4c0 4-2 5.5-4 5.5Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  send: <path d="M22 2 11 13M22 2l-7 20-4-9-9-4Z" />,
  arrowLeft: <path d="M19 12H5M11 6l-6 6 6 6" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  moon: <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />,
  lock: (
    <>
      <rect x="4" y="10.5" width="16" height="11" rx="2" />
      <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  eyeOff: (
    <path d="M10.6 5.1A9.8 9.8 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-2.6 3.5M6.6 6.6C3.7 8.4 2 12 2 12s3.6 7 10 7a9.7 9.7 0 0 0 5.4-1.6M9.9 9.9a3 3 0 0 0 4.2 4.2M3 3l18 18" />
  ),
} satisfies Record<string, ReactNode>

export type IconName = keyof typeof paths

export function Icon({ name, size = 20, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  )
}

/** The three-pillar mark from the MPH Energy logo, used as a decorative brand motif. */
export function PillarMotif({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 260 353" aria-hidden="true" focusable="false">
      <path className="m-side" d="M0 12C30 22 55 38 75 52v250c-20-14-45-30-75-40Z" />
      <path className="m-core" d="M98 70q32 18 65 0v252q-33 18-65 0Z" />
      <path className="m-side" d="M260 12c-30 10-55 26-75 40v250c20-14 45-30 75-40Z" />
    </svg>
  )
}
