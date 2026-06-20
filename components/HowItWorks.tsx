'use client'
import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'

const STEPS = [
  {
    num: '01',
    title: 'Pick Your Usual.',
    desc: 'Tell Brewprint how you take your coffee. Espresso, pour-over, oat milk latte — your go-to becomes the baseline.',
  },
  {
    num: '02',
    title: 'Set Your Preferences.',
    desc: 'Rate flavor notes, roast levels, and vibe. The algorithm maps your palate into a profile no other app can build.',
  },
  {
    num: '03',
    title: 'Get Your Brewprint.',
    desc: 'Every nearby shop gets scored specifically for you. Browse by match, explore the map, and discover your next perfect cup.',
  },
]

function Screen1() {
  return (
    <div className="h-full p-5 flex flex-col gap-3 overflow-hidden">
      <p className="text-white/30 text-[9px] tracking-widest uppercase">your go-to</p>
      <p className="text-white text-[13px] font-semibold leading-tight">How do you take your coffee?</p>
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: 'Espresso', sel: false },
          { label: 'Latte', sel: true },
          { label: 'Pour Over', sel: false },
          { label: 'Cold Brew', sel: false },
        ].map(({ label, sel }) => (
          <div key={label}
            className="py-3 rounded-xl text-center text-[11px] font-medium"
            style={{
              background: sel ? 'rgba(217,142,74,0.15)' : 'rgba(255,255,255,0.04)',
              border: sel ? '1px solid rgba(217,142,74,0.45)' : '1px solid rgba(255,255,255,0.07)',
              color: sel ? '#D98E4A' : 'rgba(255,255,255,0.4)',
            }}
          >{label}</div>
        ))}
      </div>
      <div className="border-t border-white/[0.06] pt-3 mt-1">
        <p className="text-white/25 text-[9px] tracking-widest uppercase mb-2">flavor notes</p>
        <div className="flex flex-wrap gap-1.5">
          {[
            { label: 'Chocolate', sel: true },
            { label: 'Nutty', sel: true },
            { label: 'Citrus', sel: false },
            { label: 'Floral', sel: false },
            { label: 'Bold', sel: true },
          ].map(({ label, sel }) => (
            <span key={label}
              className="px-2 py-1 rounded-full text-[9px]"
              style={{
                background: sel ? 'rgba(217,142,74,0.12)' : 'rgba(255,255,255,0.04)',
                color: sel ? 'rgba(217,142,74,0.9)' : 'rgba(255,255,255,0.28)',
                border: sel ? '1px solid rgba(217,142,74,0.28)' : '1px solid rgba(255,255,255,0.05)',
              }}
            >{sel ? `✓ ${label}` : label}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function Screen2() {
  const traits = [
    { label: 'Bold',   pct: 85 },
    { label: 'Nutty',  pct: 72 },
    { label: 'Smooth', pct: 65 },
    { label: 'Sweet',  pct: 54 },
    { label: 'Floral', pct: 38 },
    { label: 'Acidic', pct: 22 },
  ]
  return (
    <div className="h-full p-5 flex flex-col gap-3 overflow-hidden">
      <p className="text-white/30 text-[9px] tracking-widest uppercase">taste profile</p>
      <p className="text-white text-[13px] font-semibold leading-tight">Your Flavor DNA</p>
      <div className="flex flex-col gap-2.5 mt-1">
        {traits.map((t, i) => (
          <div key={t.label} className="flex items-center gap-2">
            <span className="text-white/30 text-[9px] w-11 text-right flex-shrink-0">{t.label}</span>
            <div className="flex-1 h-[3px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: `rgba(217,142,74,${0.35 + t.pct / 160})` }}
                initial={{ width: 0 }}
                animate={{ width: `${t.pct}%` }}
                transition={{ duration: 0.9, delay: i * 0.08, ease: 'easeOut' }}
              />
            </div>
            <span className="text-white/20 text-[9px] w-6 flex-shrink-0">{t.pct}%</span>
          </div>
        ))}
      </div>
      <div className="mt-auto pt-3 border-t border-white/[0.06]">
        <div className="flex items-center justify-between">
          <span className="text-white/25 text-[10px]">Brewprint match score</span>
          <motion.span
            className="font-black text-base"
            style={{ color: '#D98E4A' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >9.4</motion.span>
        </div>
      </div>
    </div>
  )
}

function Screen3() {
  const shops = [
    { name: 'Opus Coffee',        score: 9.7, tag: 'Top match' },
    { name: 'Volta Coffee',       score: 9.1, tag: 'Strong match' },
    { name: 'East End Roasters',  score: 8.8, tag: 'Great match' },
  ]
  const dots: [number, number, boolean][] = [
    [28, 58, false], [42, 38, false], [62, 52, true],
    [48, 72, false], [74, 44, false], [82, 66, false],
    [18, 44, false], [58, 78, false],
  ]
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-none h-[38%] relative overflow-hidden"
        style={{ background: 'linear-gradient(140deg, #080e18 0%, #051018 100%)' }}>
        {dots.map(([x, y, active], i) => (
          <div key={i} className="absolute rounded-full"
            style={{
              left: `${x}%`, top: `${y}%`,
              width: active ? 8 : 5,
              height: active ? 8 : 5,
              background: active ? '#D98E4A' : 'rgba(217,142,74,0.28)',
              boxShadow: active ? '0 0 10px rgba(217,142,74,0.7)' : undefined,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
        <div className="absolute inset-x-0 bottom-0 h-8"
          style={{ background: 'linear-gradient(to top, #050505, transparent)' }} />
        <div className="absolute bottom-2 left-3 text-[8px] text-white/20 tracking-widest uppercase">
          matches near you
        </div>
      </div>
      <div className="flex-1 p-3 flex flex-col gap-2">
        {shops.map((s) => (
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

const SCREENS = [<Screen1 />, <Screen2 />, <Screen3 />]

function PhoneMockup({ step }: { step: number }) {
  return (
    <div className="relative mx-auto" style={{
      width: 220,
      height: 440,
      background: '#040404',
      borderRadius: 36,
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
      {/* Screen content */}
      <div className="absolute inset-0 pt-14 overflow-hidden" style={{ background: '#050505' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            className="h-full"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.38, ease: 'easeOut' }}
          >
            {SCREENS[step]}
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Gloss overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          borderRadius: 34,
          background: 'linear-gradient(140deg, rgba(255,255,255,0.05) 0%, transparent 55%)',
        }}
      />
      {/* Home indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-[3px] rounded-full"
        style={{ background: 'rgba(255,255,255,0.12)' }} />
    </div>
  )
}

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActiveStep(v < 0.38 ? 0 : v < 0.72 ? 1 : 2)
  })

  const step = STEPS[activeStep]

  return (
    <div ref={containerRef} id="how-it-works" style={{ height: '290vh' }} className="relative bg-surface">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">

        {/* Top label */}
        <div className="flex-shrink-0 pt-16 pb-4 text-center px-6">
          <p className="text-white/20 text-[10px] tracking-[0.25em] uppercase font-medium">
            how it works
          </p>
        </div>

        {/* Main content */}
        <div className="flex-1 flex items-center justify-center px-6 md:px-16 lg:px-24 pb-16">
          <div className="w-full max-w-5xl flex flex-col md:flex-row items-center gap-10 md:gap-16 lg:gap-24">

            {/* Left: text */}
            <div className="flex-1 min-w-0 text-center md:text-left">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.42, ease: 'easeOut' }}
                >
                  <span
                    className="font-bold text-white/[0.05] block leading-none select-none"
                    style={{ fontSize: 'clamp(5rem, 11vw, 9rem)' }}
                  >
                    {step.num}
                  </span>
                  <h2
                    className="font-bold text-white leading-tight"
                    style={{ fontSize: 'clamp(1.9rem, 4vw, 3.2rem)', marginTop: '-0.75rem' }}
                  >
                    {step.title}
                  </h2>
                  <p className="text-white/40 text-base md:text-lg leading-relaxed mt-4 max-w-md mx-auto md:mx-0">
                    {step.desc}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Step dots */}
              <div className="flex gap-2 mt-10 justify-center md:justify-start">
                {STEPS.map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-[3px] rounded-full"
                    animate={{
                      width: i === activeStep ? 32 : 14,
                      background: i === activeStep ? '#D98E4A' : 'rgba(255,255,255,0.12)',
                    }}
                    transition={{ duration: 0.4 }}
                  />
                ))}
              </div>
            </div>

            {/* Right: phone mockup */}
            <div className="flex-shrink-0 hidden md:block">
              <motion.div
                animate={{
                  y: [0, -6, 0],
                  rotateZ: activeStep === 1 ? 1.5 : activeStep === 2 ? -1.5 : 0,
                }}
                transition={{
                  y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                  rotateZ: { duration: 0.6, ease: 'easeInOut' },
                }}
                style={{ transformStyle: 'preserve-3d', perspective: 800 }}
              >
                <PhoneMockup step={activeStep} />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-20 pointer-events-none">
          <p className="text-white text-[9px] tracking-[0.25em] uppercase">scroll</p>
          <motion.div
            className="w-px h-5"
            style={{ background: 'linear-gradient(to bottom, white, transparent)' }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>
    </div>
  )
}
