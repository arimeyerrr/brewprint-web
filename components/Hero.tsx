'use client'
import { motion } from 'framer-motion'
import AnimateInView from './AnimateInView'

function WaveLayer({
  duration,
  delay,
  opacity,
  color,
  path,
}: {
  duration: number
  delay: number
  opacity: number
  color: string
  path?: string
}) {
  const d =
    path ||
    'M0,44 C200,12 400,76 600,44 C800,12 1000,76 1200,44 C1320,22 1400,58 1440,44 L1440,80 L0,80 Z'
  return (
    <motion.div
      className="absolute inset-x-0"
      style={{ top: -50, opacity }}
      animate={{ x: ['0%', '-9%', '3%', '-5%', '0%'] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay, repeatType: 'loop' }}
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        style={{ width: '140%', marginLeft: '-20%', display: 'block' }}
      >
        <path d={d} fill={color} />
      </svg>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col overflow-hidden">
      {/* Background — deep warm darkness */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 55% at 50% 28%, #1c0900 0%, #080200 55%, #000000 100%)',
        }}
      />

      {/* Coffee liquid fill — slow viscous pour, rises to ~60% */}
      <motion.div
        className="absolute inset-x-0 bottom-0"
        style={{ height: '100%' }}
        initial={{ y: '100%' }}
        animate={{ y: '40%' }}
        transition={{ duration: 8.5, ease: [0.08, 0.94, 0.22, 1.0], delay: 1.0 }}
      >
        {/* Liquid body — very dark coffee */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(6,2,0,1) 0%, rgba(14,5,1,1) 20%, rgba(26,9,1,0.98) 45%, rgba(44,16,3,0.92) 68%, rgba(62,23,5,0.65) 84%, rgba(80,30,7,0.25) 94%, transparent 100%)',
          }}
        />

        {/* Primary wave — darkest, most opaque */}
        <WaveLayer
          duration={9}
          delay={0}
          opacity={1}
          color="rgba(20,7,1,0.99)"
          path="M0,44 C180,10 360,76 540,44 C720,10 900,76 1080,44 C1260,10 1380,60 1440,44 L1440,80 L0,80 Z"
        />
        {/* Secondary wave — slightly lighter, slower */}
        <WaveLayer
          duration={13}
          delay={2.5}
          opacity={0.75}
          color="rgba(38,14,3,0.88)"
          path="M0,50 C240,20 480,72 720,50 C960,28 1200,68 1440,50 L1440,80 L0,80 Z"
        />
        {/* Crema/foam edge — amber-tinted, lightest */}
        <WaveLayer
          duration={17}
          delay={5}
          opacity={0.45}
          color="rgba(68,26,6,0.55)"
          path="M0,54 C160,36 320,64 480,52 C640,38 800,68 960,54 C1120,38 1300,66 1440,54 L1440,80 L0,80 Z"
        />
      </motion.div>

      {/* Subtle top vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-transparent" />

      {/* Nav spacing */}
      <div className="h-16 flex-shrink-0" />

      {/* Centered content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-6">
        <AnimateInView delay={0.3}>
          <h1
            className="font-bold text-white leading-[0.85] mb-7"
            style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)', letterSpacing: '-0.03em' }}
          >
            brewprint
          </h1>
        </AnimateInView>

        <AnimateInView delay={0.45}>
          <p className="text-white/42 text-base md:text-lg max-w-xs md:max-w-sm mb-10 font-light leading-relaxed">
            Find your perfect cup. Discover the shop behind it.
          </p>
        </AnimateInView>

        <AnimateInView delay={0.58}>
          <a
            href="#waitlist"
            className="inline-block bg-white text-black font-semibold px-10 py-4 rounded-full text-sm md:text-base tracking-wide hover:bg-white/90 transition-all duration-200"
          >
            ready to sip?
          </a>
        </AnimateInView>
      </div>

      {/* Scroll indicator */}
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
