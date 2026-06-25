function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.37a8.16 8.16 0 004.77 1.52V7.45a4.86 4.86 0 01-1-.76z" />
    </svg>
  )
}

function TeardropMark() {
  return (
    <svg width="16" height="20" viewBox="0 0 40 52" className="opacity-30">
      <path
        d="M20 3 C20 3, 37 23, 37 33 A17 17 0 0 1 3 33 C3 23, 20 3, 20 3 Z"
        fill="white"
      />
    </svg>
  )
}

const socials = [
  { label: 'Instagram', icon: <InstagramIcon />, href: '#' },
  { label: 'X', icon: <XIcon />, href: '#' },
  { label: 'TikTok', icon: <TikTokIcon />, href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-white/[0.04] py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center gap-8">
        {/* Wordmark */}
        <a href="/" aria-label="Brewprint home" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Brewprint" className="w-8 h-8 object-contain opacity-80" />
          <span
            className="font-semibold text-white/60 tracking-[0.12em]"
            style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)' }}
          >
            brewprint
          </span>
        </a>

        {/* Social icons */}
        <div className="flex items-center gap-6">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="text-white/20 hover:text-white/60 transition-colors duration-200"
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* Legal links */}
        <div className="flex items-center gap-3">
          <a
            href="/privacy"
            className="text-white/40 hover:text-white/70 text-xs font-medium px-4 py-2 rounded-full transition-colors duration-200"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
          >
            Privacy Policy
          </a>
          <a
            href="/terms"
            className="text-white/40 hover:text-white/70 text-xs font-medium px-4 py-2 rounded-full transition-colors duration-200"
            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
          >
            Terms of Service
          </a>
        </div>

        {/* Copyright */}
        <p className="text-white/15 text-xs tracking-wide">
          &copy; {new Date().getFullYear()} brewprint. all rights reserved.
        </p>
      </div>
    </footer>
  )
}
