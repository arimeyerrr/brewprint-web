'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import AnimateInView from './AnimateInView'

function CoffeePinLogo() {
  return (
    <svg viewBox="0 0 80 108" fill="none" style={{ width: 68, height: 92 }}>
      <defs>
        <radialGradient id="pinBody" cx="40%" cy="28%" r="68%">
          <stop offset="0%"   stopColor="#D4853C" />
          <stop offset="22%"  stopColor="#B56A25" />
          <stop offset="50%"  stopColor="#7E4212" />
          <stop offset="80%"  stopColor="#4C2208" />
          <stop offset="100%" stopColor="#2A1004" />
        </radialGradient>
        <radialGradient id="pinSwirl" cx="34%" cy="26%" r="44%">
          <stop offset="0%"   stopColor="rgba(220,155,75,0.55)" />
          <stop offset="55%"  stopColor="rgba(190,115,45,0.22)" />
          <stop offset="100%" stopColor="rgba(150,80,20,0)" />
        </radialGradient>
        <radialGradient id="pinShine" cx="30%" cy="20%" r="28%">
          <stop offset="0%"   stopColor="rgba(255,228,158,0.38)" />
          <stop offset="100%" stopColor="rgba(255,200,100,0)" />
        </radialGradient>
        <radialGradient id="innerDark" cx="50%" cy="45%" r="55%">
          <stop offset="0%"   stopColor="rgba(10,3,0,0.75)" />
          <stop offset="100%" stopColor="rgba(25,8,1,0.40)" />
        </radialGradient>
      </defs>
      <path d="M40 2C22.327 2 8 16.327 8 34C8 54.5 40 106 40 106C40 106 72 54.5 72 34C72 16.327 57.673 2 40 2Z" fill="url(#pinBody)" />
      <path d="M40 2C22.327 2 8 16.327 8 34C8 54.5 40 106 40 106C40 106 72 54.5 72 34C72 16.327 57.673 2 40 2Z" fill="url(#pinSwirl)" />
      <path d="M40 2C22.327 2 8 16.327 8 34C8 54.5 40 106 40 106C40 106 72 54.5 72 34C72 16.327 57.673 2 40 2Z" fill="url(#pinShine)" />
      <circle cx="40" cy="32" r="15" fill="url(#innerDark)" />
      <circle cx="40" cy="32" r="12" fill="rgba(12,3,0,0.5)" />
      <path d="M32 29C34 25.5 38.5 24.5 42 27C45 29 45.5 32.5 43 34.5" stroke="rgba(195,115,45,0.65)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M36 36C38 32.5 42.5 31.5 45 33.5" stroke="rgba(195,115,45,0.42)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <ellipse cx="35" cy="25" rx="5.5" ry="6.5" fill="rgba(255,205,105,0.17)" />
      <circle cx="33" cy="22" r="2.2" fill="rgba(255,232,160,0.26)" />
    </svg>
  )
}

const STEAM_WISPS = [
  { x: '18%', delay: 0,    duration: 4.2, drift:  6 },
  { x: '28%', delay: 0.9,  duration: 3.8, drift: -5 },
  { x: '38%', delay: 1.7,  duration: 5.0, drift:  8 },
  { x: '50%', delay: 0.4,  duration: 4.5, drift: -7 },
  { x: '60%', delay: 2.1,  duration: 3.6, drift:  5 },
  { x: '70%', delay: 1.2,  duration: 4.8, drift: -6 },
  { x: '80%', delay: 0.7,  duration: 4.0, drift:  7 },
]

function Steam() {
  return (
    <div className="absolute inset-x-0 pointer-events-none overflow-visible" style={{ bottom: '57%', height: 180 }}>
      {STEAM_WISPS.map((w, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0"
          style={{
            left: w.x,
            width: 3,
            height: 50 + i * 5,
            background: 'linear-gradient(to top, rgba(200,140,80,0.18), rgba(255,255,255,0.06), transparent)',
            borderRadius: 4,
            filter: 'blur(4px)',
          }}
          animate={{
            y:      [0, -(90 + i * 12)],
            x:      [0, w.drift, w.drift * 0.4, w.drift * 1.2, 0],
            opacity:[0, 0.55, 0.4, 0.2, 0],
            scaleX: [1, 1.8, 2.5, 3.5, 4],
          }}
          transition={{
            duration: w.duration,
            delay:    w.delay,
            repeat:   Infinity,
            ease:     'easeOut',
          }}
        />
      ))}
    </div>
  )
}

function WaveLayer({ duration, delay, opacity, color, path, yRange }: {
  duration: number; delay: number; opacity: number; color: string; path?: string; yRange?: number
}) {
  const d = path || 'M0,44 C200,12 400,76 600,44 C800,12 1000,76 1200,44 C1320,22 1400,58 1440,44 L1440,80 L0,80 Z'
  const yr = yRange || 0
  return (
    <motion.div
      className="absolute inset-x-0"
      style={{ top: -64, opacity }}
      animate={{
        x: ['0%', '-13%', '4%', '-8%', '2%', '0%'],
        y: yr ? [0, -yr, yr * 0.7, -yr * 0.5, yr * 0.3, 0] : undefined,
      }}
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
      animate={
        phase === 'pour'
          ? { y: '32%' }
          : { y: ['32%', '30.5%', '33.5%', '31.2%', '33%', '32%'] }
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
        {/* Gradient body */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(4,1,0,1) 0%, rgba(10,3,0,1) 12%, rgba(22,7,0,1) 30%, rgba(40,14,1,0.97) 52%, rgba(60,22,4,0.82) 72%, rgba(78,28,6,0.38) 88%, transparent 100%)',
          }}
        />

        {/* Wave 1 — deep, slow */}
        <WaveLayer duration={7} delay={0} opacity={1} yRange={8}
          color="rgba(14,4,0,1)"
          path="M0,32 C150,4 320,66 500,32 C680,0 860,68 1040,34 C1220,2 1360,54 1440,32 L1440,90 L0,90 Z" />
        {/* Wave 2 — mid */}
        <WaveLayer duration={11} delay={1.2} opacity={0.88} yRange={12}
          color="rgba(28,10,1,0.96)"
          path="M0,46 C200,14 400,74 600,46 C800,18 1000,74 1200,46 C1320,30 1400,62 1440,46 L1440,90 L0,90 Z" />
        {/* Wave 3 — lighter */}
        <WaveLayer duration={15} delay={3.5} opacity={0.65} yRange={16}
          color="rgba(50,18,3,0.72)"
          path="M0,54 C130,36 260,68 390,54 C520,38 650,68 780,54 C910,38 1040,66 1170,54 C1300,40 1390,62 1440,54 L1440,90 L0,90 Z" />
        {/* Wave 4 — surface shimmer */}
        <WaveLayer duration={5.5} delay={1.8} opacity={0.35} yRange={6}
          color="rgba(90,35,8,0.55)"
          path="M0,60 C90,54 180,66 270,60 C360,54 450,66 540,60 C630,54 720,66 810,60 C900,54 990,66 1080,60 C1170,54 1300,64 1440,60 L1440,90 L0,90 Z" />

        {/* Steam above the liquid surface */}
        <Steam />
      </LiquidContainer>

      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-transparent" />
      <div className="h-16 flex-shrink-0" />

      <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-6">
        <AnimateInView delay={0.1}>
          <div className="mb-5">
            <CoffeePinLogo />
          </div>
        </AnimateInView>

        <AnimateInView delay={0.25}>
          <div className="mb-7">
            <motion.h1
              className="font-bold text-white leading-[0.85]"
              style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)', letterSpacing: '-0.06em' }}
              initial={{ opacity: 0.08 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 7, ease: 'easeInOut', delay: 1.2 }}
            >
              brewprint
            </motion.h1>
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
