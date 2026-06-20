'use client'
import { motion } from 'framer-motion'
import AnimateInView from './AnimateInView'

function Teardrop({ size = 52 }: { size?: number }) {
  const id = 'tg'
  return (
    <svg viewBox="0 0 44 60" fill="none" style={{ width: size, height: size * 1.36 }}>
      <defs>
        <radialGradient id={`${id}-fill`} cx="42%" cy="33%" r="62%">
          <stop offset="0%" stopColor="#C87A35" />
          <stop offset="30%" stopColor="#8B4513" />
          <stop offset="68%" stopColor="#5A2808" />
          <stop offset="100%" stopColor="#2E1204" />
        </radialGradient>
        <radialGradient id={`${id}-shine`} cx="36%" cy="28%" r="40%">
          <stop offset="0%" stopColor="rgba(255,200,110,0.38)" />
          <stop offset="100%" stopColor="rgba(255,200,110,0)" />
        </radialGradient>
      </defs>
      <path
        d="M22 2C12.611 2 5 9.611 5 19C5 31.5 22 58 22 58C22 58 39 31.5 39 19C39 9.611 31.389 2 22 2Z"
        fill={`url(#${id}-fill)`}
        stroke="rgba(200,120,50,0.35)"
        strokeWidth="0.7"
      />
      <ellipse cx="18" cy="17" rx="7" ry="8.5" fill={`url(#${id}-shine)`} />
      <circle cx="16" cy="13" r="2.8" fill="rgba(255,220,160,0.18)" />
      <circle cx="15" cy="12" r="1.2" fill="rgba(255,240,200,0.32)" />
    </svg>
  )
}

function SmallTeardrop() {
  return (
    <svg viewBox="0 0 44 60" fill="none" style={{ width: 11, height: 15, display: 'inline-block', marginLeft: 1, verticalAlign: 'middle', marginTop: -4 }}>
      <defs>
        <radialGradient id="ntg" cx="42%" cy="33%" r="62%">
          <stop offset="0%" stopColor="#C87A35" />
          <stop offset="50%" stopColor="#8B4513" />
          <stop offset="100%" stopColor="#3E1A07" />
        </radialGradient>
      </defs>
      <path d="M22 2C12.611 2 5 9.611 5 19C5 31.5 22 58 22 58C22 58 39 31.5 39 19C39 9.611 31.389 2 22 2Z"
        fill="url(#ntg)" stroke="rgba(200,120,50,0.4)" strokeWidth="1" />
      <circle cx="16" cy="13" r="3" fill="rgba(255,220,160,0.3)" />
    </svg>
  )
}

function WaveLayer({ duration, delay, opacity, color, path }: {
  duration: number; delay: number; opacity: number; color: string; path?: string
}) {
  const d = path || 'M0,44 C200,12 400,76 600,44 C800,12 1000,76 1200,44 C1320,22 1400,58 1440,44 L1440,80 L0,80 Z'
  return (
    <motion.div
      className="absolute inset-x-0"
      style={{ top: -52, opacity }}
      animate={{ x: ['0%', '-11%', '3%', '-6%', '0%'] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay, repeatType: 'loop' }}
    >
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width: '145%', marginLeft: '-22%', display: 'block' }}>
        <path d={d} fill={color} />
      </svg>
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

      {/* Coffee liquid pours in from top */}
      <motion.div
        className="absolute inset-x-0 top-0"
        style={{ height: '100%' }}
        initial={{ y: '-100%' }}
        animate={{ y: '-52%' }}
        transition={{ duration: 8.5, ease: [0.08, 0.94, 0.22, 1.0], delay: 1.0 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(5,1,0,1) 0%, rgba(12,4,0,1) 18%, rgba(24,8,1,0.98) 42%, rgba(42,15,2,0.92) 65%, rgba(60,22,4,0.55) 83%, rgba(78,28,6,0.18) 94%, transparent 100%)',
          }}
        />
        <WaveLayer duration={9} delay={0} opacity={1} color="rgba(18,6,1,0.99)"
          path="M0,44 C180,10 360,78 540,44 C720,10 900,78 1080,44 C1260,10 1380,62 1440,44 L1440,80 L0,80 Z" />
        <WaveLayer duration={13} delay={2.5} opacity={0.7} color="rgba(36,13,2,0.88)"
          path="M0,50 C240,20 480,72 720,50 C960,28 1200,68 1440,50 L1440,80 L0,80 Z" />
        <WaveLayer duration={17} delay={5} opacity={0.4} color="rgba(62,24,5,0.5)"
          path="M0,56 C160,38 320,66 480,54 C640,40 800,68 960,56 C1120,40 1300,66 1440,56 L1440,80 L0,80 Z" />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-transparent" />
      <div className="h-16 flex-shrink-0" />

      <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-6">
        {/* Teardrop icon */}
        <AnimateInView delay={0.15}>
          <div className="mb-5">
            <Teardrop size={52} />
          </div>
        </AnimateInView>

        {/* Wordmark with liquid letter-fill (poured in top-down) */}
        <AnimateInView delay={0.25}>
          <div className="relative mb-6">
            {/* Empty state — dim white base */}
            <h1
              className="font-bold text-white/10 leading-[0.85] select-none"
              style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)', letterSpacing: '-0.05em' }}
            >
              brewprint
              <SmallTeardrop />
            </h1>

            {/* Coffee color pours DOWN from top */}
            <motion.div
              className="absolute inset-0 overflow-hidden"
              initial={{ clipPath: 'inset(0 0 100% 0)' }}
              animate={{ clipPath: 'inset(0 0 58% 0)' }}
              transition={{ duration: 8.5, ease: [0.08, 0.94, 0.22, 1.0], delay: 1.0 }}
            >
              <h1
                className="font-bold leading-[0.85]"
                style={{
                  fontSize: 'clamp(3.5rem, 12vw, 9rem)',
                  letterSpacing: '-0.05em',
                  color: 'rgba(100, 48, 10, 0.88)',
                }}
              >
                brewprint
                <SmallTeardrop />
              </h1>
            </motion.div>

            {/* Full white fades in after pour */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.8, delay: 9.0 }}
            >
              <h1
                className="font-bold leading-[0.85] text-white"
                style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)', letterSpacing: '-0.05em' }}
              >
                brewprint
                <SmallTeardrop />
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
