'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
    title: 'Pick Your Usual.',
    desc: 'Start with what you already love. Your go-to drink and roast style become the baseline for your personalized taste profile.',
  },
  {
    num: '02',
    title: 'Set Your Preferences.',
    desc: 'Rate flavor notes, intensity, and vibe. The algorithm maps your palate into a profile no other app can build.',
  },
  {
    num: '03',
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
      {/* Ambient glow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          className="absolute pointer-events-none"
          style={{
            inset: '-60px',
            borderRadius: '50%',
            background: c.glow,
            filter: 'blur(60px)',
            zIndex: 0,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        />
      </AnimatePresence>

      {/* Image container */}
      <div
        className="relative overflow-hidden w-full"
        style={{ aspectRatio: '4/5', borderRadius: 28, zIndex: 1, background: '#000' }}
      >
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={idx}
            custom={dir}
            className="absolute inset-0"
            variants={{
              enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
              center: { x: '0%', opacity: 1 },
              exit: (d: number) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <img
              src={c.file}
              alt={c.name}
              className="w-full h-full object-contain"
            />
          </motion.div>
        </AnimatePresence>

        {/* Click zones */}
        <button onClick={goPrev} className="absolute left-0 inset-y-0 w-2/5" aria-label="previous" />
        <button onClick={goNext} className="absolute right-0 inset-y-0 w-2/5" aria-label="next" />
      </div>

      {/* Label */}
      <div className="mt-5 text-center" style={{ zIndex: 1, minHeight: 48 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            <p className="text-white font-bold text-xl" style={{ letterSpacing: '-0.015em' }}>{c.name}</p>
            <p className="text-white/35 text-sm mt-1">{c.tags.join(' · ')}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex items-center gap-2 mt-4" style={{ zIndex: 1 }}>
        {COFFEES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} aria-label={COFFEES[i].name}>
            <motion.div
              className="rounded-full"
              style={{ height: 3 }}
              animate={{
                width: i === idx ? 22 : 8,
                background: i === idx ? '#D98E4A' : 'rgba(255,255,255,0.15)',
              }}
              transition={{ duration: 0.3 }}
            />
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
              <motion.div
                className="h-full rounded-full"
                style={{ background: `rgba(217,142,74,${0.35 + t.pct / 160})` }}
                initial={{ width: 0 }}
                animate={{ width: `${t.pct}%` }}
                transition={{ duration: 0.8, delay: i * 0.07, ease: 'easeOut' }}
              />
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
      width: 220, height: 440, background: '#040404', borderRadius: 36,
      border: '1.5px solid rgba(255,255,255,0.11)',
      boxShadow: '0 60px 120px rgba(0,0,0,0.85), 0 0 0 0.5px rgba(255,255,255,0.04) inset, 0 0 80px rgba(217,142,74,0.04)',
      overflow: 'hidden',
    }}>
      {/* Dynamic island */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full"
        style={{ background: '#000', minWidth: 86 }}>
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#181818' }} />
        <div className="flex-1" />
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#181818' }} />
      </div>
      {/* Screen */}
      <div className="absolute inset-0 pt-14 overflow-hidden" style={{ background: '#050505' }}>
        <AnimatePresence mode="wait" custom={slideDir}>
          <motion.div
            key={step}
            custom={slideDir}
            variants={{
              enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
              center: { x: '0%', opacity: 1 },
              exit: (d: number) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.38, ease: 'easeOut' }}
            className="h-full"
          >
            {PHONE_SCREENS[step - 1]}
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Gloss */}
      <div className="absolute inset-0 pointer-events-none" style={{ borderRadius: 34, background: 'linear-gradient(140deg, rgba(255,255,255,0.05) 0%, transparent 55%)' }} />
      {/* Home bar */}
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
    <section id="how-it-works" className="bg-surface py-20 md:py-32">
      <div className="max-w-5xl mx-auto px-6 md:px-12">

        {/* Eyebrow + heading */}
        <div className="text-center mb-16">
          <p className="text-white/20 text-[10px] tracking-[0.25em] uppercase font-medium mb-4">how it works</p>
          <h2 className="font-bold text-white leading-tight" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}>
            How It Works.
          </h2>
        </div>

        {/* Content: text + visual */}
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16 lg:gap-24 mb-14">

          {/* Left: step text */}
          <div className="flex-1 min-w-0 text-center md:text-left order-2 md:order-1">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={step}
                custom={dir}
                variants={{
                  enter: (d: number) => ({ x: d > 0 ? 40 : -40, opacity: 0 }),
                  center: { x: 0, opacity: 1 },
                  exit: (d: number) => ({ x: d > 0 ? -40 : 40, opacity: 0 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <span className="font-bold block leading-none select-none mb-1"
                  style={{ fontSize: 'clamp(5rem, 10vw, 8.5rem)', color: 'rgba(255,255,255,0.04)' }}>
                  {s.num}
                </span>
                <h3 className="font-bold text-white leading-tight"
                  style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', marginTop: '-0.7rem' }}>
                  {s.title}
                </h3>
                <p className="text-white/40 text-base md:text-lg leading-relaxed mt-4 max-w-md mx-auto md:mx-0">
                  {s.desc}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center gap-4 mt-10 justify-center md:justify-start">
              <button
                onClick={() => goStep(step - 1)}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                style={{
                  background: step === 0 ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  opacity: step === 0 ? 0.35 : 1,
                }}
              >
                <svg viewBox="0 0 12 12" fill="none" width={11} height={11}>
                  <path d="M8 2L4 6L8 10" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className="flex gap-2 items-center">
                {STEPS.map((_, i) => (
                  <button key={i} onClick={() => goStep(i)}>
                    <motion.div
                      className="h-[3px] rounded-full"
                      animate={{
                        width: i === step ? 28 : 12,
                        background: i === step ? '#D98E4A' : 'rgba(255,255,255,0.12)',
                      }}
                      transition={{ duration: 0.35 }}
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={() => goStep(step + 1)}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                style={{
                  background: step === 2 ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  opacity: step === 2 ? 0.35 : 1,
                }}
              >
                <svg viewBox="0 0 12 12" fill="none" width={11} height={11}>
                  <path d="M4 2L8 6L4 10" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right: step 0 = drink carousel, steps 1-2 = phone */}
          <div className="flex-shrink-0 order-1 md:order-2">
            <AnimatePresence mode="wait">
              {step === 0 ? (
                <motion.div
                  key="carousel"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <DrinkCarousel />
                </motion.div>
              ) : (
                <motion.div
                  key="phone"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  style={{ y: step === 1 ? -4 : 4 }}
                >
                  <PhoneMockup step={step} slideDir={dir} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  )
}
