
export default function Footer() {
  return (
    <footer className="relative pt-16 pb-12" style={{ background: 'transparent' }}>
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)' }}
      />
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center gap-7">
        {/* Wordmark */}
        <a href="/" aria-label="Brewprint home" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Brewprint" className="w-8 h-8 object-contain opacity-80" />
          <span
            className="font-bold text-white/70"
            style={{ fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', letterSpacing: '-0.03em' }}
          >
            brewprint
          </span>
        </a>

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
          &copy; {new Date().getFullYear()} Brewprint. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
