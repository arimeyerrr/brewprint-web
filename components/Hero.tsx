'use client'
import { motion } from 'framer-motion'
import AnimateInView from './AnimateInView'

function WaveLayer({ duration, delay, opacity }: { duration: number; delay: number; opacity: number }) {
  return (
    <motion.div
      className="absolute inset-x-0"
      style={{ top: -34, opacity }}
      animate={{ x: ['0%', '-8%', '0%'] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <svg
        viewBox="0 0 1440 70"
        preserveAspectRatio="none"
        style={{ width: '130%', marginLeft: '-15%', display: 'block' }}
      >
        <path
          d="M0,35 C120,60 240,10 360,35 C480,60 600,10 720,35 C840,60 960,10 1080,35 C1200,60 1320,10 1440,35 L1440,70 L0,70 Z"
          fill="rgba(16,6,1,0.92)"
        />
      </svg>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col overflow-hidden">
      {/* Static warm glow */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full"
          style={{
            background:
              'radial-gradient(ellipse 85% 65% at 62% 35%, #2E1604 0%, #0D0400 52%, #000000 100%)',
          }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/25" />

      {/* Coffee liquid fill — rises from bottom to ~60% */}
      <motion.div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: '100%',
          background:
            'linear-gradient(to top, rgba(14,5,1,0.97) 0%, rgba(35,14,3,0.75) 45%, rgba(58,26,6,0.2) 80%, transparent 100%)',
        }}
        initial={{ y: '100%' }}
        animate={{ y: '40%' }}
        transition={{ duration: 3.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      >
        <WaveLayer duration={6} delay={0} opacity={1} />
        <WaveLayer duration={8} delay={1.2} opacity={0.45} />
        <WaveLayer duration={10} delay={2.4} opacity={0.2} />
      </motion.div>

      {/* Nav spacing */}
      <div className="h-16 flex-shrink-0" />

      {/* Centered main content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-6">
        <AnimateInView delay={0.2}>
          <h1
            className="font-bold text-white leading-[0.85] mb-7"
            style={{ fontSize: 'clamp(4rem, 15vw, 12rem)', letterSpacing: '-0.03em' }}
          >
            brewprint
          </h1>
        </AnimateInView>

        <AnimateInView delay={0.32}>
          <p className="text-white/45 text-base md:text-lg max-w-xs md:max-w-sm mb-10 font-light leading-relaxed">
            Connecting every coffee shop to its perfect customer — and every coffee lover to their perfect cup.
          </p>
        </AnimateInView>

        <AnimateInView delay={0.44}>
          <a
            href="#waitlist"
            className="inline-block bg-white text-black font-semibold px-10 py-4 rounded-full text-sm md:text-base tracking-wide hover:bg-white/90 transition-all duration-200"
          >
            join the waitlist
          </a>
        </AnimateInView>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 flex justify-center pb-8 opacity-25">
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-transparent to-white"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </section>
  )
}
