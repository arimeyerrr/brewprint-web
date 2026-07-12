'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

function WaveLayer({ duration, delay, opacity, color, path, yRange }: {
  duration: number; delay: number; opacity: number; color: string; path?: string; yRange?: number
}) {
  const d = path || 'M0,44 C200,12 400,76 600,44 C800,12 1000,76 1200,44 C1320,22 1400,58 1440,44 L1440,80 L0,80 Z'
  const yr = yRange || 0
  return (
    <motion.div
      className="absolute inset-x-0"
      style={{ top: -64, opacity }}
      animate={{ x: ['0%', '-13%', '4%', '-8%', '2%', '0%'], y: yr ? [0, -yr, yr * 0.7, -yr * 0.5, yr * 0.3, 0] : undefined }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay, repeatType: 'mirror' }}
    >
      <svg viewBox="0 0 1440 90" preserveAspectRatio="none" style={{ width: '150%', marginLeft: '-25%', display: 'block' }}>
        <path d={d} fill={color} />
      </svg>
    </motion.div>
  )
}

function LiquidContainer({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<'pour' | 'breathe'>('pour')
  return (
    <motion.div
      className="absolute inset-x-0 bottom-0"
      style={{ height: '100%' }}
      initial={{ y: '100%' }}
      animate={phase === 'pour' ? { y: '55%' } : { y: ['55%', '53.5%', '56.5%', '54.2%', '56%', '55%'] }}
      transition={phase === 'pour'
        ? { duration: 8.5, ease: [0.08, 0.94, 0.22, 1.0], delay: 1.0 }
        : { duration: 9, repeat: Infinity, ease: 'easeInOut', times: [0, 0.2, 0.45, 0.65, 0.85, 1] }}
      onAnimationComplete={() => { if (phase === 'pour') setPhase('breathe') }}
    >
      {children}
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 90% 60% at 50% 20%, #1c0900 0%, #080200 55%, #000000 100%)' }} />

      <LiquidContainer>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(4,1,0,1) 0%, rgba(14,5,0,1) 10%, rgba(38,12,1,1) 25%, rgba(72,26,4,0.98) 42%, rgba(118,50,10,0.88) 58%, rgba(160,78,20,0.65) 74%, rgba(195,110,38,0.32) 88%, transparent 100%)' }} />
        <WaveLayer duration={7}   delay={0}   opacity={1}    yRange={8}  color="rgba(18,5,0,1)"        path="M0,32 C150,4 320,66 500,32 C680,0 860,68 1040,34 C1220,2 1360,54 1440,32 L1440,90 L0,90 Z" />
        <WaveLayer duration={11}  delay={1.2} opacity={0.92} yRange={12} color="rgba(58,20,3,0.97)"    path="M0,46 C200,14 400,74 600,46 C800,18 1000,74 1200,46 C1320,30 1400,62 1440,46 L1440,90 L0,90 Z" />
        <WaveLayer duration={15}  delay={3.5} opacity={0.78} yRange={16} color="rgba(105,42,8,0.82)"   path="M0,54 C130,36 260,68 390,54 C520,38 650,68 780,54 C910,38 1040,66 1170,54 C1300,40 1390,62 1440,54 L1440,90 L0,90 Z" />
        <WaveLayer duration={9}   delay={2.6} opacity={0.60} yRange={10} color="rgba(158,68,16,0.70)"  path="M0,58 C180,44 360,70 540,58 C720,44 900,70 1080,58 C1260,44 1380,66 1440,58 L1440,90 L0,90 Z" />
        <WaveLayer duration={6.5} delay={0.9} opacity={0.42} yRange={8}  color="rgba(205,108,30,0.55)" path="M0,62 C120,56 240,68 360,62 C480,56 600,68 720,62 C840,56 960,68 1080,62 C1200,56 1340,66 1440,62 L1440,90 L0,90 Z" />
      </LiquidContainer>

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent pointer-events-none" />
      <div className="h-20 flex-shrink-0" />

      {/* ── Two-column layout ── */}
      <div className="relative z-10 flex-1 flex items-center py-8">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16 px-10 lg:px-16">

          {/* LEFT: text */}
          <motion.div
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
            style={{ minWidth: 0 }}
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <h1
              className="font-bold text-white"
              style={{ fontSize: 'clamp(3.5rem, 5.8vw, 7.5rem)', letterSpacing: '-0.058em', lineHeight: 0.88, marginBottom: 24 }}
            >
              Brewprint
            </h1>

            <p
              className="text-white/50 font-medium leading-relaxed"
              style={{ fontSize: 'clamp(1rem, 1.5vw, 1.3rem)', marginBottom: 36, maxWidth: 360 }}
            >
              Find your perfect cup.<br />Discover the shop behind it.
            </p>

            <a
              href="#waitlist"
              className="inline-block font-semibold text-white rounded-full transition-all duration-200 hover:scale-105 cursor-pointer"
              style={{
                fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
                padding: 'clamp(14px, 1.5vw, 18px) clamp(32px, 3vw, 48px)',
                background: 'linear-gradient(135deg, #A85A18 0%, #D98E4A 50%, #B86820 100%)',
                boxShadow: '0 10px 40px rgba(217,142,74,0.48), inset 0 1px 0 rgba(255,255,255,0.22)',
                letterSpacing: '-0.01em',
              }}
            >
              Join the Waitlist →
            </a>

            <p className="text-white/20 text-sm mt-4 tracking-wide">Coming fall 2026. Early access guaranteed.</p>
          </motion.div>

          {/* RIGHT: large logo */}
          <div className="flex items-center justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            >
              <motion.img
                src="/logo.png"
                alt="Brewprint"
                style={{
                  width: 'clamp(220px, 38vw, 480px)',
                  height: 'auto',
                  filter: 'drop-shadow(0 0 80px rgba(200,120,40,0.9)) drop-shadow(0 0 32px rgba(255,160,50,0.55)) drop-shadow(0 0 8px rgba(255,210,120,0.3))',
                }}
                animate={{ y: [0, -18, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.3 }}
              />
            </motion.div>
          </div>

        </div>
      </div>

      <div className="relative z-10 flex justify-center pb-5 opacity-25">
        <motion.div
          className="w-px h-7 bg-gradient-to-b from-transparent to-white"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </section>
  )
}
