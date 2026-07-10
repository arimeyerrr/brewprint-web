'use client'
import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function TiltWrapper({ children, maxTilt = 7 }: { children: React.ReactNode; maxTilt?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width - 0.5) * 2
    const y = ((e.clientY - r.top) / r.height - 0.5) * 2
    el.style.transform = `perspective(900px) rotateX(${-y * maxTilt * 0.6}deg) rotateY(${x * maxTilt}deg)`
  }, [maxTilt])
  const onLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transition = 'transform 0.55s cubic-bezier(0.23, 1, 0.32, 1)'
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)'
    setTimeout(() => { if (el) el.style.transition = '' }, 550)
  }, [])
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ display: 'inline-block', transformStyle: 'preserve-3d' }}>
      {children}
    </div>
  )
}

const COFFEES = [
  { name: 'Drip Coffee',  tags: ['Clean', 'Rich', 'Classic'],      file: '/drinks/drip.png',      glow: 'rgba(100,50,8,0.28)' },
  { name: 'Matcha Latte', tags: ['Earthy', 'Sweet', 'Vibrant'],    file: '/drinks/matcha.png',    glow: 'rgba(55,110,35,0.22)' },
  { name: 'Latte',        tags: ['Creamy', 'Sweet', 'Smooth'],     file: '/drinks/latte.png',     glow: 'rgba(140,75,18,0.28)' },
  { name: 'Cold Brew',    tags: ['Smooth', 'Bold', 'Refreshing'],  file: '/drinks/cold-brew.png', glow: 'rgba(160,85,12,0.28)' },
  { name: 'Espresso',     tags: ['Bold', 'Intense', 'Short'],      file: '/drinks/espresso.png',  glow: 'rgba(175,95,15,0.28)' },
]

const STEPS = [
  {
    num: '01',
    eyebrow: 'Step one',
    title: 'Pick Your Usual.',
    desc: 'Start with what you already love. Your go-to drink and roast style become the baseline for your personalized taste profile.',
  },
  {
    num: '02',
    eyebrow: 'Step two',
    title: 'Set Your Preferences.',
    desc: 'Rate flavor notes, intensity, and vibe. The algorithm maps your palate into a profile no other app can build.',
  },
  {
    num: '03',
    eyebrow: 'Step three',
    title: 'Get Your Brewprint.',
    desc: 'Every nearby shop gets scored specifically for you. Browse by match, explore the map, and discover your next perfect cup.',
  },
]

function DrinkCarousel({ onConfirm }: { onConfirm: () => void }) {
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState(1)
  function goNext() { setDir(1); setIdx((idx + 1) % COFFEES.length) }
  function goPrev() { setDir(-1); setIdx((idx - 1 + COFFEES.length) % COFFEES.length) }
  function goTo(i: number) {
    if (i === idx) return
    setDir(i > idx ? 1 : -1)
    setIdx(i)
  }
  const c = COFFEES[idx]
  return (
    <div className="relative flex flex-col items-center" style={{ width: 300 }}>
      <AnimatePresence mode="wait">
        <motion.div key={idx} className="absolute pointer-events-none"
          style={{ inset: '-60px', borderRadius: '50%', background: c.glow, filter: 'blur(60px)', zIndex: 0 }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }} />
      </AnimatePresence>
      <div className="relative overflow-hidden w-full"
        style={{ aspectRatio: '4/5', borderRadius: 28, zIndex: 1, background: '#000' }}>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div key={idx} custom={dir} className="absolute inset-0"
            variants={{
              enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
              center: { x: '0%', opacity: 1 },
              exit: (d: number) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
            }}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.4, ease: 'easeOut' }}>
            <img src={c.file} alt={c.name} className="w-full h-full object-contain" />
          </motion.div>
        </AnimatePresence>
        <button onClick={goPrev} className="absolute left-0 inset-y-0 w-2/5 cursor-pointer" aria-label="previous" />
        <button onClick={goNext} className="absolute right-0 inset-y-0 w-2/5 cursor-pointer" aria-label="next" />
      </div>
      <div className="mt-5 text-center" style={{ zIndex: 1, minHeight: 48 }}>
        <AnimatePresence mode="wait">
          <motion.div key={idx} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}>
            <p className="text-white font-bold text-xl" style={{ letterSpacing: '-0.015em' }}>{c.name}</p>
            <p className="text-white/35 text-sm mt-1">{c.tags.join(' · ')}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex items-center gap-2 mt-4" style={{ zIndex: 1 }}>
        {COFFEES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} aria-label={COFFEES[i].name} className="cursor-pointer">
            <motion.div className="rounded-full" style={{ height: 3 }}
              animate={{ width: i === idx ? 22 : 8, background: i === idx ? '#D98E4A' : 'rgba(255,255,255,0.15)' }}
              transition={{ duration: 0.3 }} />
          </button>
        ))}
      </div>

      {/* Confirm selection — matches real app */}
      <motion.button
        onClick={onConfirm}
        className="w-full mt-7 font-semibold text-black text-sm tracking-widest uppercase rounded-full cursor-pointer"
        style={{ padding: '14px 0', background: 'white', border: 'none', letterSpacing: '0.06em' }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.15 }}
      >
        Confirm Selection
      </motion.button>
    </div>
  )
}

/* ── Step 2: Preference tag selector — matches real app screenshot ── */

const PREF_GROUPS = [
  {
    label: 'VIBE & ATMOSPHERE',
    tags: ['Quiet', 'Lively', 'Good Lighting', 'Greenery', 'Outdoor Seating', 'Modern'],
  },
  {
    label: 'AESTHETIC',
    tags: ['Latte Art', 'Interior Design', 'Instagrammable'],
  },
  {
    label: 'COMFORT & AMENITIES',
    tags: ['Fast Wifi', 'Outlets', 'Parking', 'Dog Friendly'],
  },
]

function PreferencesScreen({ onNext }: { onNext: () => void }) {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  function toggle(t: string) {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(t) ? next.delete(t) : next.add(t)
      return next
    })
  }
  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ background: '#000' }}>
      {/* Header */}
      <div style={{ padding: '12px 14px 8px', flexShrink: 0 }}>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 2 }}>
          REFINE YOUR TASTE
        </p>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 9.5, fontWeight: 600 }}>
          {selected.size} SELECTED
        </p>
      </div>

      {/* Tag groups */}
      <div style={{ flex: 1, overflow: 'hidden', padding: '4px 12px 8px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {PREF_GROUPS.map(group => (
          <div key={group.label}>
            <p style={{ color: 'rgba(255,255,255,0.22)', fontSize: 7.5, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 7, textAlign: 'center' }}>
              {group.label}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 5, justifyContent: 'center' }}>
              {group.tags.map(tag => {
                const on = selected.has(tag)
                return (
                  <motion.button
                    key={tag}
                    onClick={() => toggle(tag)}
                    style={{
                      padding: '5px 10px', borderRadius: 20, fontSize: 8.5, fontWeight: 500, cursor: 'pointer',
                      background: on ? 'rgba(217,142,74,0.15)' : 'rgba(255,255,255,0.04)',
                      border: `0.5px solid ${on ? 'rgba(217,142,74,0.5)' : 'rgba(255,255,255,0.12)'}`,
                      color: on ? '#D98E4A' : 'rgba(255,255,255,0.6)',
                    }}
                    whileTap={{ scale: 0.94 }}
                    transition={{ duration: 0.12 }}
                  >
                    {tag}
                  </motion.button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* CTA — clicking advances to next step */}
      <div style={{ padding: '10px 14px 14px', flexShrink: 0 }}>
        <motion.button
          onClick={onNext}
          style={{
            width: '100%', background: 'white', borderRadius: 22, padding: '9px 0',
            textAlign: 'center', fontSize: 10, fontWeight: 700, color: '#000',
            letterSpacing: '0.04em', cursor: 'pointer', border: 'none', display: 'block',
          }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.1 }}
        >
          BUILD MY FEED
        </motion.button>
      </div>
    </div>
  )
}

/* ── Step 3: Map view + shop bottom sheet — matches real app screenshots ── */

const MAP_PINS_HIW = [
  { x: 22, y: 24, score: '9.4', photo: true,  c1: '#2d4228', c2: '#1e2d1a' },
  { x: 54, y: 18, score: '7.6', photo: true,  c1: '#4a2e1a', c2: '#321e0e' },
  { x: 70, y: 34, score: '8.8', photo: true,  c1: '#1a2d4a', c2: '#101d32' },
  { x: 36, y: 48, score: '7.4', photo: true,  c1: '#38203c', c2: '#261428' },
  { x: 78, y: 52, score: '6.4', photo: false, c1: '', c2: '' },
  { x: 16, y: 58, score: '5.3', photo: false, c1: '', c2: '' },
  { x: 62, y: 62, score: '9.1', photo: true,  c1: '#2a3820', c2: '#1a2414' },
]

function ResultsScreen() {
  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ background: '#0d1825' }}>

      {/* Map area */}
      <div style={{ position: 'relative', flex: 1 }}>
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <rect x="0%" y="0%" width="14%" height="22%" fill="#101e2c" />
          <rect x="54%" y="44%" width="18%" height="16%" rx="1" fill="#0e1d14" />
          {[20, 32, 46, 60, 72].map(y => (
            <line key={`h${y}`} x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`} stroke="#16273d" strokeWidth="2" />
          ))}
          {[14, 28, 42, 56, 70, 84].map(x => (
            <line key={`v${x}`} x1={`${x}%`} y1="0" x2={`${x}%`} y2="100%" stroke="#16273d" strokeWidth="2" />
          ))}
          <line x1="0" y1="36%" x2="100%" y2="6%" stroke="#1c2f46" strokeWidth="3" />
          <line x1="10%" y1="100%" x2="88%" y2="44%" stroke="#1c2f46" strokeWidth="2.5" />
          {[8, 26, 39, 53, 66].map(y => (
            <line key={`mh${y}`} x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`} stroke="#13202e" strokeWidth="1" />
          ))}
          {[7, 21, 35, 49, 63, 77].map(x => (
            <line key={`mv${x}`} x1={`${x}%`} y1="0" x2={`${x}%`} y2="100%" stroke="#13202e" strokeWidth="1" />
          ))}
        </svg>

        {/* Neighbourhood label */}
        <div style={{ position: 'absolute', top: '12%', right: '5%', fontSize: 6.5, fontWeight: 700, color: 'rgba(255,255,255,0.11)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          OAKVIEW
        </div>

        {/* User location */}
        <div style={{ position: 'absolute', left: '44%', top: '42%', transform: 'translate(-50%,-50%)', zIndex: 3 }}>
          <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#4B8FEA', border: '1.5px solid white', boxShadow: '0 0 0 6px rgba(75,143,234,0.18)' }} />
        </div>

        {/* Shop pins */}
        {MAP_PINS_HIW.map((pin, i) => (
          <div key={i} style={{ position: 'absolute', left: `${pin.x}%`, top: `${pin.y}%`, transform: 'translate(-50%,-50%)', zIndex: 4 }}>
            {pin.photo ? (
              <div style={{ position: 'relative', width: 32, height: 32 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${pin.c1}, ${pin.c2})`,
                  border: '2px solid rgba(0,0,0,0.8)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.7)',
                }} />
                <div style={{
                  position: 'absolute', bottom: -4, right: -5,
                  background: '#080c12', borderRadius: 5,
                  padding: '1px 3.5px', fontSize: 7, fontWeight: 800,
                  color: parseFloat(pin.score) >= 9 ? '#D98E4A' : 'rgba(255,255,255,0.82)',
                  border: '0.5px solid rgba(255,255,255,0.12)',
                  lineHeight: 1.4,
                }}>
                  {pin.score}
                </div>
              </div>
            ) : (
              <div style={{
                background: 'rgba(6,10,18,0.9)', backdropFilter: 'blur(8px)',
                border: '0.5px solid rgba(255,255,255,0.14)', borderRadius: 7,
                padding: '2px 5px', fontSize: 7.5, fontWeight: 800,
                color: 'rgba(255,255,255,0.7)',
              }}>
                {pin.score}
              </div>
            )}
          </div>
        ))}

        {/* Filter pills overlay */}
        <div style={{ position: 'absolute', top: 6, left: 8, right: 8, zIndex: 5 }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {[{ l: 'My Usual ▾', a: true }, { l: 'cozy', a: false }, { l: 'wifi', a: false }].map(f => (
              <div key={f.l} style={{
                background: f.a ? 'rgba(217,142,74,0.14)' : 'rgba(6,10,18,0.82)',
                backdropFilter: 'blur(12px)',
                border: `0.5px solid ${f.a ? 'rgba(217,142,74,0.45)' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: 18, padding: '3.5px 8px', fontSize: 7.5, fontWeight: 600,
                color: f.a ? '#D98E4A' : 'rgba(255,255,255,0.55)',
                whiteSpace: 'nowrap' as const,
              }}>{f.l}</div>
            ))}
          </div>
        </div>

        {/* Bottom gradient */}
        <div style={{ position: 'absolute', inset: '60% 0 0 0', background: 'linear-gradient(to top, rgba(8,12,18,0.95), transparent)', zIndex: 2 }} />
      </div>

      {/* Bottom sheet */}
      <div style={{ background: '#080c12', borderTop: '0.5px solid rgba(255,255,255,0.08)', padding: '8px 12px 10px', flexShrink: 0 }}>
        {/* Drag handle */}
        <div style={{ width: 26, height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.14)', margin: '0 auto 9px' }} />

        {/* FOR YOU badge + score */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
          <div style={{
            background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.1)',
            borderRadius: 6, padding: '2px 6px', fontSize: 7.5, fontWeight: 600, color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.08em',
          }}>FOR YOU</div>
          <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 8 }}>5.0</span>
          <span style={{ color: '#D98E4A', fontSize: 14, fontWeight: 900, marginLeft: 'auto' }}>9.4</span>
        </div>

        {/* Shop photo — latte art image */}
        <div style={{ height: 58, borderRadius: 8, marginBottom: 7, overflow: 'hidden', position: 'relative' }}>
          <img
            src="https://images.unsplash.com/photo-1501959915551-4e8d30928317?w=500&q=80&auto=format&fit=crop"
            alt="Meyerbrews"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.08) 60%, transparent 100%)' }} />
          <p style={{ position: 'absolute', bottom: 6, left: 10, color: 'white', fontSize: 12, fontWeight: 700 }}>Meyerbrews</p>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
          {['Specialty Coffee', 'Cozy Vibe', 'Good WiFi'].map(tag => (
            <div key={tag} style={{
              fontSize: 7, color: 'rgba(255,255,255,0.45)',
              padding: '2px 6px', borderRadius: 18,
              border: '0.5px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.04)',
            }}>{tag}</div>
          ))}
        </div>

        {/* Rate CTA */}
        <div style={{
          background: 'white', borderRadius: 22, padding: '7px 0',
          textAlign: 'center', fontSize: 9.5, fontWeight: 700, color: '#000',
          letterSpacing: '0.04em',
        }}>
          Rate This Shop
        </div>
      </div>
    </div>
  )
}

function PhoneMockup({ step, slideDir, onNextStep }: { step: number; slideDir: number; onNextStep: () => void }) {
  const screens = [
    <PreferencesScreen key="prefs" onNext={onNextStep} />,
    <ResultsScreen key="results" />,
  ]
  return (
    <div className="relative mx-auto" style={{
      width: 260, height: 520, background: '#040404', borderRadius: 40,
      border: '1.5px solid rgba(255,255,255,0.11)',
      boxShadow: '0 60px 140px rgba(0,0,0,0.9), 0 0 0 0.5px rgba(255,255,255,0.04) inset, 0 0 100px rgba(217,142,74,0.06)',
      overflow: 'hidden',
    }}>
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full"
        style={{ background: '#000', minWidth: 86 }}>
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#181818' }} />
        <div className="flex-1" />
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#181818' }} />
      </div>
      <div className="absolute inset-0 pt-14 overflow-hidden" style={{ background: '#050505' }}>
        <AnimatePresence mode="wait" custom={slideDir}>
          <motion.div key={step} custom={slideDir}
            variants={{
              enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
              center: { x: '0%', opacity: 1 },
              exit: (d: number) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
            }}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.38, ease: 'easeOut' }}
            className="h-full">
            {screens[step - 1]}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ borderRadius: 38, background: 'linear-gradient(140deg, rgba(255,255,255,0.05) 0%, transparent 55%)' }} />
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-[3px] rounded-full" style={{ background: 'rgba(255,255,255,0.12)' }} />
    </div>
  )
}

export default function HowItWorks() {
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)

  function goStep(next: number) {
    if (next === step || next < 0 || next > 2) return
    setDir(next > step ? 1 : -1)
    setStep(next)
  }

  const s = STEPS[step]

  return (
    <section id="how-it-works" className="relative overflow-hidden" style={{ background: '#0a0a0a' }}>

      {/* Subtle top gradient from hero */}
      <div className="absolute inset-x-0 top-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,1), transparent)' }} />

      {/* Amber glow behind section */}
      <div className="absolute pointer-events-none"
        style={{
          inset: 0,
          background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(160,70,12,0.12) 0%, transparent 70%)',
        }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-28 md:py-44">

        {/* Section header */}
        <div className="text-center mb-20 md:mb-28">
          <motion.p
            className="font-medium mb-5"
            style={{ color: 'rgba(217,142,74,0.55)', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase' }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            how it works
          </motion.p>
          <motion.h2
            className="font-bold text-white leading-none"
            style={{ fontSize: 'clamp(2.8rem, 6vw, 5.5rem)', letterSpacing: '-0.05em' }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Three steps to your<br />
            <span style={{ color: 'rgba(217,142,74,0.85)' }}>perfect cup.</span>
          </motion.h2>
        </div>

        {/* Step progress bar */}
        <div className="flex items-center justify-center gap-0 mb-16 md:mb-20">
          {STEPS.map((st, i) => (
            <div key={i} className="flex items-center">
              <button
                onClick={() => goStep(i)}
                className="relative flex flex-col items-center gap-2 cursor-pointer group"
                style={{ padding: '0 20px' }}
              >
                <motion.div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs"
                  animate={{
                    background: i === step ? 'rgba(217,142,74,0.15)' : 'rgba(255,255,255,0.04)',
                    borderColor: i === step ? 'rgba(217,142,74,0.6)' : i < step ? 'rgba(217,142,74,0.25)' : 'rgba(255,255,255,0.1)',
                    color: i === step ? '#D98E4A' : i < step ? 'rgba(217,142,74,0.45)' : 'rgba(255,255,255,0.25)',
                  }}
                  style={{ border: '1px solid', transition: 'all 0.3s ease' }}
                >
                  {i < step ? '✓' : st.num}
                </motion.div>
                <span className="text-[10px] font-medium hidden md:block" style={{ color: i === step ? 'rgba(217,142,74,0.7)' : 'rgba(255,255,255,0.2)' }}>
                  {st.eyebrow}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <div className="w-16 md:w-24 h-px" style={{ background: 'rgba(255,255,255,0.07)' }}>
                  <motion.div
                    className="h-full"
                    style={{ background: 'rgba(217,142,74,0.4)', transformOrigin: 'left' }}
                    animate={{ scaleX: step > i ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Main content: text left + visual right */}
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-24">

          {/* Left: step text */}
          <div className="flex-1 min-w-0 text-center lg:text-left order-2 lg:order-1">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={step}
                custom={dir}
                variants={{
                  enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
                  center: { x: 0, opacity: 1 },
                  exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
                }}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.45, ease: 'easeOut' }}
              >
                {/* Big decorative step number */}
                <span
                  className="block leading-none select-none font-black"
                  style={{
                    fontSize: 'clamp(7rem, 14vw, 13rem)',
                    color: 'rgba(255,255,255,0.03)',
                    letterSpacing: '-0.06em',
                    marginBottom: '-0.6em',
                    lineHeight: 0.85,
                  }}
                >
                  {s.num}
                </span>

                <h3
                  className="font-bold text-white leading-tight"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.035em', marginBottom: 20 }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-white/45 leading-relaxed max-w-md mx-auto lg:mx-0"
                  style={{ fontSize: 'clamp(1rem, 1.8vw, 1.2rem)' }}
                >
                  {s.desc}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex items-center gap-4 mt-12 justify-center lg:justify-start">
              <button
                onClick={() => goStep(step - 1)}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-105"
                style={{
                  background: step === 0 ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  opacity: step === 0 ? 0.3 : 1,
                }}
              >
                <svg viewBox="0 0 12 12" fill="none" width={12} height={12}>
                  <path d="M8 2L4 6L8 10" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className="flex gap-2 items-center">
                {STEPS.map((_, i) => (
                  <button key={i} onClick={() => goStep(i)} className="cursor-pointer">
                    <motion.div
                      className="h-[3px] rounded-full"
                      animate={{
                        width: i === step ? 32 : 12,
                        background: i === step ? '#D98E4A' : 'rgba(255,255,255,0.12)',
                      }}
                      transition={{ duration: 0.35 }}
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={() => goStep(step + 1)}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer hover:scale-105"
                style={{
                  background: step === 2 ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  opacity: step === 2 ? 0.3 : 1,
                }}
              >
                <svg viewBox="0 0 12 12" fill="none" width={12} height={12}>
                  <path d="M4 2L8 6L4 10" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Skip to waitlist */}
            {step === 2 && (
              <motion.div
                className="mt-10 text-center lg:text-left"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <a
                  href="#waitlist"
                  className="inline-block font-semibold text-sm px-8 py-3.5 rounded-full transition-all duration-200 hover:scale-105 cursor-pointer"
                  style={{
                    background: 'linear-gradient(135deg, #A85A18 0%, #D98E4A 50%, #B86820 100%)',
                    color: 'white',
                    boxShadow: '0 6px 28px rgba(217,142,74,0.35), inset 0 1px 0 rgba(255,255,255,0.18)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  Get Early Access →
                </a>
              </motion.div>
            )}
          </div>

          {/* Right: visual */}
          <div className="flex-shrink-0 order-1 lg:order-2">
            {/* Glow behind visual */}
            <div className="relative">
              <div style={{
                position: 'absolute', inset: '-80px',
                background: 'radial-gradient(ellipse 60% 55% at 50% 50%, rgba(160,72,12,0.18) 0%, transparent 70%)',
                filter: 'blur(30px)',
                pointerEvents: 'none',
              }} />
              <AnimatePresence mode="wait">
                {step === 0 ? (
                  <motion.div key="carousel"
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4, ease: 'easeOut' }}>
                    <TiltWrapper maxTilt={6}><DrinkCarousel onConfirm={() => goStep(1)} /></TiltWrapper>
                  </motion.div>
                ) : (
                  <motion.div key="phone"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      opacity: { duration: 0.4, ease: 'easeOut' },
                      scale: { duration: 0.4, ease: 'easeOut' },
                      y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 },
                    }}>
                    <TiltWrapper maxTilt={9}><PhoneMockup step={step} slideDir={dir} onNextStep={() => goStep(step + 1)} /></TiltWrapper>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }} />
    </section>
  )
}
