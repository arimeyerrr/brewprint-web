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

function DrinkCarousel() {
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
    </div>
  )
}

const PROFILE_TRAITS = [
  { label: 'Bold',   pct: 85 },
  { label: 'Nutty',  pct: 72 },
  { label: 'Smooth', pct: 65 },
  { label: 'Sweet',  pct: 54 },
  { label: 'Floral', pct: 38 },
  { label: 'Acidic', pct: 22 },
]

function ProfileScreen() {
  return (
    <div className="h-full p-5 flex flex-col gap-3 overflow-hidden">
      <p className="text-white/30 text-[9px] tracking-widest uppercase">taste profile</p>
      <p className="text-white text-[13px] font-semibold">Your Flavor DNA</p>
      <div className="flex flex-col gap-2.5 mt-1 flex-1">
        {PROFILE_TRAITS.map((t, i) => (
          <div key={t.label} className="flex items-center gap-2">
            <span className="text-white/30 text-[9px] w-11 text-right flex-shrink-0">{t.label}</span>
            <div className="flex-1 h-[3px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <motion.div className="h-full rounded-full"
                style={{ background: `rgba(217,142,74,${0.35 + t.pct / 160})` }}
                initial={{ width: 0 }} animate={{ width: `${t.pct}%` }}
                transition={{ duration: 0.8, delay: i * 0.07, ease: 'easeOut' }} />
            </div>
            <span className="text-white/20 text-[9px] w-6 flex-shrink-0">{t.pct}%</span>
          </div>
        ))}
      </div>
      <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
        <span className="text-white/25 text-[10px]">Your match score</span>
        <motion.span className="font-black text-[15px]" style={{ color: '#D98E4A' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          9.4
        </motion.span>
      </div>
    </div>
  )
}

const NEARBY_DOTS: [number, number, boolean][] = [
  [28, 60, false], [44, 38, false], [62, 52, true],
  [50, 72, false], [75, 44, false], [83, 65, false],
  [18, 42, false], [60, 78, false],
]

function ResultsScreen() {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-none relative overflow-hidden" style={{ height: '42%', background: 'linear-gradient(135deg, #070e18, #05101a)' }}>
        {/* Map grid in results */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          {Array.from({ length: 7 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="100%" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 30} x2="100%" y2={i * 30} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
          ))}
        </svg>
        {NEARBY_DOTS.map(([x, y, active], i) => (
          <div key={i} className="absolute rounded-full"
            style={{
              left: `${x}%`, top: `${y}%`,
              width: active ? 9 : 5, height: active ? 9 : 5,
              background: active ? '#D98E4A' : 'rgba(217,142,74,0.3)',
              boxShadow: active ? '0 0 10px rgba(217,142,74,0.8)' : undefined,
              transform: 'translate(-50%,-50%)',
            }} />
        ))}
        <div className="absolute inset-x-0 bottom-0 h-8" style={{ background: 'linear-gradient(to top, #050505, transparent)' }} />
        <div className="absolute bottom-1.5 left-3 text-[8px] text-white/20 tracking-widest uppercase">matches near you</div>
      </div>
      <div className="flex-1 p-3 flex flex-col gap-2">
        {[
          { name: 'Opus Coffee', score: 9.7, tag: 'Top match' },
          { name: 'Volta Coffee', score: 9.1, tag: 'Strong match' },
          { name: 'East End Roasters', score: 8.8, tag: 'Great match' },
        ].map(s => (
          <div key={s.name} className="flex items-center justify-between px-3 py-2.5 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div>
              <p className="text-white text-[11px] font-semibold">{s.name}</p>
              <p className="text-white/25 text-[9px] mt-0.5">{s.tag}</p>
            </div>
            <span className="font-black text-[13px]" style={{ color: '#D98E4A' }}>{s.score}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const PHONE_SCREENS = [<ProfileScreen key="profile" />, <ResultsScreen key="results" />]

function PhoneMockup({ step, slideDir }: { step: number; slideDir: number }) {
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
            {PHONE_SCREENS[step - 1]}
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
                    <TiltWrapper maxTilt={6}><DrinkCarousel /></TiltWrapper>
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
                    <TiltWrapper maxTilt={9}><PhoneMockup step={step} slideDir={dir} /></TiltWrapper>
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
