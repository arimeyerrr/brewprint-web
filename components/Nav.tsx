'use client'
import { useState, useEffect } from 'react'

const links = [
  { label: 'how it works', href: '#how-it-works' },
  { label: 'for shops', href: '#for-shops' },
  { label: 'our story', href: '#story' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/5' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <a href="#" className="text-white/60 text-sm font-semibold tracking-[0.15em]">
          brewprint
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-white/35 hover:text-white text-xs tracking-[0.3em] uppercase transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#waitlist"
            className="bg-white text-black text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-white/90 transition-colors tracking-wide"
          >
            Ready to Sip?
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white/50 hover:text-white transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="menu"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
            {open ? (
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
                <line x1="3" y1="12" x2="21" y2="12" strokeLinecap="round" />
                <line x1="3" y1="18" x2="21" y2="18" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/5 px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-white/50 text-sm tracking-[0.3em] uppercase"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#waitlist"
            onClick={() => setOpen(false)}
            className="bg-white text-black text-sm font-semibold px-6 py-3 rounded-full text-center"
          >
            Ready to Sip?
          </a>
        </div>
      )}
    </nav>
  )
}
