'use client'
import { motion } from 'framer-motion'
import AnimateInView from './AnimateInView'

function Teardrop() {
  return (
    <svg viewBox="0 0 22 30" fill="none" className="w-7 h-9">
      <path
        d="M11 1C6.306 1 2.5 4.806 2.5 9.5C2.5 16.5 11 29 11 29C11 29 19.5 16.5 19.5 9.5C19.5 4.806 15.694 1 11 1Z"
        fill="rgba(217,142,74,0.15)"
        stroke="rgba(217,142,74,0.6)"
        strokeWidth="1.2"
      />
      <circle cx="11" cy="9.5" r="3.5" fill="rgba(217,142,74,0.45)" />
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

      {/* Coffee liquid fill */}
      <motion.div
        className="absolute inset-x-0 bottom-0"
        style={{ height: '100%' }}
        initial={{ y: '100%' }}
        animate={{ y: '40%' }}
        transition={{ duration: 8.5, ease: [0.08, 0.94, 0.22, 1.0], delay: 1.0 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(5,1,0,1) 0%, rgba(12,4,0,1) 18%, rgba(24,8,1,0.98) 42%, rgba(42,15,2,0.92) 65%, rgba(60,22,4,0.6) 83%, rgba(78,28,6,0.22) 94%, transparent 100%)',
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
          <div className="mb-4">
            <Teardrop />
          </div>
        </AnimateInView>

        {/* Wordmark with liquid letter-fill */}
        <AnimateInView delay={0.25}>
          <div className="relative mb-7">
            {/* Empty state — dim white */}
            <h1
              className="font-bold text-white/12 leading-[0.85] select-none"
              style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)', letterSpacing: '-0.05em' }}
            >
              brewprint
            </h1>
            {/* Filled state — reveals bottom-to-top with liquid timing */}
            <motion.div
              className="absolute inset-0 overflow-hidden"
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              animate={{ clipPath: 'inset(35% 0 0 0)' }}
              transition={{ duration: 8.5, ease: [0.08, 0.94, 0.22, 1.0], delay: 1.0 }}
            >
              <h1
                className="font-bold leading-[0.85]"
                style={{
                  fontSize: 'clamp(3.5rem, 12vw, 9rem)',
                  letterSpacing: '-0.05em',
                  color: 'rgba(200, 110, 45, 0.9)',
                }}
              >
                brewprint
              </h1>
            </motion.div>
            {/* Full white on top — appears after fill */}
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
              </h1>
            </motion.div>
          </div>
        </AnimateInView>

        <AnimateInView delay={0.45}>
          <p className="text-white/42 text-base md:text-lg max-w-xs md:max-w-sm mb-10 font-light leading-relaxed">
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
