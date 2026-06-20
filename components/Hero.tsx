'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import AnimateInView from './AnimateInView'

function WaveLayer({ duration, delay, opacity, color, path, yRange }: {
  duration: number; delay: number; opacity: number; color: string; path?: string; yRange?: number
}) {
  const d = path || 'M0,44 C200,12 400,76 600,44 C800,12 1000,76 1200,44 C1320,22 1400,58 1440,44 L1440,80 L0,80 Z'
  const yr = yRange || 0
  return (
    <motion.div
      className="absolute inset-x-0"
      style={{ top: -52, opacity }}
      animate={{
        x: ['0%', '-11%', '3%', '-7%', '2%', '0%'],
        y: yr ? [0, -yr, yr * 0.6, -yr * 0.4, yr * 0.2, 0] : undefined,
      }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay, repeatType: 'mirror' }}
    >
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width: '148%', marginLeft: '-24%', display: 'block' }}>
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
      animate={
        phase === 'pour'
          ? { y: '40%' }
          : { y: ['40%', '38.8%', '41.2%', '39.4%', '40.6%', '40%'] }
      }
      transition={
        phase === 'pour'
          ? { duration: 8.5, ease: [0.08, 0.94, 0.22, 1.0], delay: 1.0 }
          : { duration: 9, repeat: Infinity, ease: 'easeInOut', times: [0, 0.2, 0.45, 0.65, 0.85, 1] }
      }
      onAnimationComplete={() => { if (phase === 'pour') setPhase('breathe') }}
    >
      {children}
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 55% at 50% 28%, #1c0900 0%, #080200 55%, #000000 100%)' }}
      />

      <LiquidContainer>
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(5,1,0,1) 0%, rgba(14,5,0,1) 20%, rgba(26,9,1,0.98) 44%, rgba(44,16,2,0.90) 68%, rgba(62,23,4,0.52) 84%, rgba(78,28,6,0.18) 94%, transparent 100%)',
          }}
        />
        {/* Primary wave — darkest, most prominent */}
        <WaveLayer
          duration={8}
          delay={0}
          opacity={1}
          yRange={6}
          color="rgba(16,5,1,0.99)"
          path="M0,38 C160,6 340,72 520,38 C700,6 880,74 1060,40 C1240,8 1360,58 1440,38 L1440,80 L0,80 Z"
        />
        {/* Secondary — slightly lighter, different phase */}
        <WaveLayer
          duration={12}
          delay={1.5}
          opacity={0.75}
          yRange={10}
          color="rgba(32,11,2,0.88)"
          path="M0,50 C220,18 440,74 660,50 C880,26 1100,72 1320,50 C1380,42 1420,58 1440,50 L1440,80 L0,80 Z"
        />
        {/* Tertiary — lightest, ripple effect */}
        <WaveLayer
          duration={16}
          delay={4}
          opacity={0.45}
          yRange={14}
          color="rgba(58,22,5,0.55)"
          path="M0,58 C140,42 280,68 420,56 C560,42 700,68 840,58 C980,44 1120,66 1260,58 C1340,52 1400,64 1440,58 L1440,80 L0,80 Z"
        />
        {/* Surface shimmer */}
        <WaveLayer
          duration={6}
          delay={2}
          opacity={0.22}
          yRange={5}
          color="rgba(90,35,8,0.5)"
          path="M0,62 C100,56 200,68 300,62 C400,56 500,68 600,62 C700,56 800,68 900,62 C1000,56 1100,68 1200,62 C1300,56 1380,66 1440,62 L1440,80 L0,80 Z"
        />
      </LiquidContainer>

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
      <div className="h-16 flex-shrink-0" />

      <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-6">

        {/* Wordmark with liquid letter-fill (bottom-to-top) */}
        <AnimateInView delay={0.25}>
          <div className="relative mb-7">
            {/* Empty state — dim base */}
            <h1
              className="font-bold text-white/10 leading-[0.85] select-none"
              style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)', letterSpacing: '-0.06em' }}
            >
              brewprint
            </h1>

            {/* Coffee fill — reveals bottom-to-top */}
            <motion.div
              className="absolute inset-0 overflow-hidden"
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              animate={{ clipPath: 'inset(45% 0 0 0)' }}
              transition={{ duration: 8.5, ease: [0.08, 0.94, 0.22, 1.0], delay: 1.0 }}
            >
              <h1
                className="font-bold leading-[0.85]"
                style={{
                  fontSize: 'clamp(3.5rem, 12vw, 9rem)',
                  letterSpacing: '-0.06em',
                  color: 'rgba(88, 42, 8, 0.90)',
                }}
              >
                brewprint
              </h1>
            </motion.div>

            {/* Full white — fades in after fill */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.8, delay: 9.0 }}
            >
              <h1
                className="font-bold leading-[0.85] text-white"
                style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)', letterSpacing: '-0.06em' }}
              >
                brewprint
              </h1>
            </motion.div>
          </div>
        </AnimateInView>

        <AnimateInView delay={0.45}>
          <p className="text-white/40 text-base md:text-lg max-w-xs md:max-w-sm mb-10 font-bold leading-snug tracking-tight">
            Find your perfect cup. Discover the shop behind it.
          </p>
        </AnimateInView>

        <AnimateInView delay={0.58}>
          <a
            href="#waitlist"
            className="inline-block bg-white text-black font-semibold px-10 py-4 rounded-full text-sm md:text-base hover:bg-white/90 transition-all duration-200"
          >
            Ready to Sip?
          </a>
        </AnimateInView>
      </div>

      <div className="relative z-10 flex justify-center pb-8 opacity-20">
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-transparent to-white"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </section>
  )
}
