// Custom SVG icons matching the Boldo presentation style
// No default emoji — all hand-crafted or presentation-derived

export function IconAPI({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6h16M4 12h16M4 18h10" />
      <circle cx="20" cy="18" r="2" />
      <path d="M18 18h-4" />
    </svg>
  )
}

export function IconRegression({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9" />
      <polyline points="3 3 3 12 12 12" />
    </svg>
  )
}

export function IconTestCase({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10l2 2 4-4" />
      <path d="M8 16h8" />
    </svg>
  )
}

export function IconMultiPlatform({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <rect x="15" y="8" width="7" height="12" rx="1.5" strokeWidth="1.5" />
      <path d="M18.5 17.5h0" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function IconE2E({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
    </svg>
  )
}

export function IconMobile({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="3" />
      <path d="M12 18h.01" strokeWidth="2" />
      <path d="M9 2v1a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V2" />
    </svg>
  )
}

// Slide 7 advantage icons

export function IconBudget({ className = "w-7 h-7" }) {
  return (
    <svg className={className} viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="14" cy="14" r="11" />
      <path d="M14 7v14" />
      <path d="M10 10.5c0-1.38 1.79-2.5 4-2.5s4 1.12 4 2.5-1.79 2.5-4 2.5-4 1.12-4 2.5 1.79 2.5 4 2.5 4-1.12 4-2.5" />
    </svg>
  )
}

export function IconScale({ className = "w-7 h-7" }) {
  return (
    <svg className={className} viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 22l5-12L6 6" />
      <path d="M22 22l-5-12 5-4" />
      <path d="M6 22h16" />
      <rect x="10" y="10" width="8" height="8" rx="1" />
      <path d="M13 13h2v2h-2z" fill="currentColor" />
    </svg>
  )
}

export function IconPartnership({ className = "w-7 h-7" }) {
  return (
    <svg className={className} viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 14l-3-3-6 6" />
      <path d="M11 14l-3-3" />
      <path d="M20 11l-3 3" />
      <path d="M4 17l4 4 2-2" />
      <path d="M24 11l-4-4-8 8" />
      <path d="M4 11l4-4" />
      <path d="M24 17l-4 4" />
    </svg>
  )
}

export function IconShield({ className = "w-7 h-7" }) {
  return (
    <svg className={className} viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 3L4 7v6c0 5.55 4.27 10.74 10 12 5.73-1.26 10-6.45 10-12V7L14 3z" />
      <path d="M10 14l2.5 2.5L18 11" />
    </svg>
  )
}

// Who We Are section icons

export function IconLock({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      <circle cx="12" cy="16" r="1.5" fill="currentColor" />
    </svg>
  )
}

export function IconBug({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2l1.88 1.88M14.12 3.88L16 2" />
      <path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" />
      <path d="M12 20c-3.3 0-6-2.7-6-6v-3a6 6 0 0 1 12 0v3c0 3.3-2.7 6-6 6Z" />
      <path d="M12 20v-9" />
      <path d="M6.53 9C4.6 8.8 3 7.1 3 5" />
      <path d="M6 13H2" />
      <path d="M3 21c0-2.1 1.7-3.9 3.8-4" />
      <path d="M20.97 5c0 2.1-1.6 3.8-3.5 4" />
      <path d="M22 13h-4" />
      <path d="M17.2 17c2.1.1 3.8 1.9 3.8 4" />
    </svg>
  )
}

export function IconChecklist({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7h16M4 12h16M4 17h10" />
      <path d="M3 7l1.5-1.5L6 7" />
      <path d="M3 12l1.5-1.5L6 12" />
      <path d="M3 17l1.5-1.5L6 17" />
    </svg>
  )
}

export function IconArrowRight({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 10h12M12 6l4 4-4 4" />
    </svg>
  )
}
