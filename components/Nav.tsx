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
        <a href="#" className="flex items-center text-white/60 text-sm font-semibold tracking-[0.12em]">
          brewprint
          <svg viewBox="0 0 44 60" fill="none" style={{ width: 9, height: 13, marginLeft: 1.5, marginTop: -4, display: 'inline-block' }}>
            <defs>
              <radialGradient id="navtg" cx="42%" cy="33%" r="62%">
                <stop offset="0%" stopColor="#C87A35" />
                <stop offset="50%" stopColor="#8B4513" />
                <stop offset="100%" stopColor="#3E1A07" />
              </radialGradient>
            </defs>
            <path d="M22 2C12.611 2 5 9.611 5 19C5 31.5 22 58 22 58C22 58 39 31.5 39 19C39 9.611 31.389 2 22 2Z"
              fill="url(#navtg)" stroke="rgba(200,120,50,0.4)" strokeWidth="1" />
            <circle cx="16" cy="13" r="3.5" fill="rgba(255,220,160,0.28)" />
          </svg>
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
