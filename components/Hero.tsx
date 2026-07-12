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

/* ── Animated mug ── */
function AnimatedMug() {
  return (
    <motion.div
      style={{ position: 'relative', width: '100%' }}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
    >
      {/* Ambient glow behind mug */}
      <div style={{ position: 'absolute', top: '20%', left: '5%', right: '15%', height: '55%', background: 'radial-gradient(ellipse, rgba(175,78,16,0.55) 0%, rgba(100,40,8,0.25) 50%, transparent 78%)', filter: 'blur(48px)', pointerEvents: 'none' }} />

      <svg viewBox="0 0 500 500" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
        <defs>
          {/* Clip to mug interior */}
          <clipPath id="mugInterior">
            <path d="M 54,58 L 374,58 L 382,434 Q 382,450 366,450 L 62,450 Q 46,450 46,434 Z" />
          </clipPath>

          {/* Coffee gradient — rich and dark */}
          <linearGradient id="coffeeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C05A14" />
            <stop offset="35%" stopColor="#8C3C0A" />
            <stop offset="100%" stopColor="#4A1A04" />
          </linearGradient>

          {/* Crema gradient */}
          <linearGradient id="cremaGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(195,112,38,0.92)" />
            <stop offset="40%" stopColor="rgba(238,162,58,1)" />
            <stop offset="100%" stopColor="rgba(190,105,34,0.92)" />
          </linearGradient>

          {/* Side gloss */}
          <linearGradient id="glossGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0.07)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        {/* ── Mug body (dark fill) ── */}
        <path
          d="M 42,46 L 386,46 Q 400,46 400,60 L 392,440 Q 392,460 372,460 L 56,460 Q 36,460 36,440 L 28,60 Q 28,46 42,46 Z"
          fill="rgba(4,7,14,0.98)"
        />

        {/* Handle background (dark) */}
        <path
          d="M 392,158 Q 470,158 470,278 Q 470,396 392,396"
          fill="none"
          stroke="rgba(4,7,14,0.98)"
          strokeWidth="40"
          strokeLinecap="round"
        />

        {/* ── Coffee fill (rises from bottom) ── */}
        <g clipPath="url(#mugInterior)">
          <motion.rect
            x={40} width={338}
            fill="url(#coffeeGrad)"
            initial={{ y: 448, height: 2 }}
            animate={{ y: 70, height: 380 }}
            transition={{ duration: 3.4, ease: [0.04, 0.82, 0.16, 1.0], delay: 1.0 }}
          />

          {/* Crema layer */}
          <motion.rect
            x={40} width={338} height={18} rx={5}
            fill="url(#cremaGrad)"
            initial={{ y: 450, opacity: 0 }}
            animate={{ y: 66, opacity: 1 }}
            transition={{
              y: { duration: 3.4, ease: [0.04, 0.82, 0.16, 1.0], delay: 1.0 },
              opacity: { duration: 0.6, delay: 4.0 },
            }}
          />

          {/* Coffee surface shine */}
          <motion.ellipse
            cx={214} cy={72} rx={110} ry={7}
            fill="rgba(240,155,50,0.18)"
            animate={{ opacity: [0.1, 0.28, 0.1], ry: [5, 9, 5] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 4.8 }}
          />
        </g>

        {/* ── Liquid surface wave ── */}
        <g clipPath="url(#mugInterior)">
          <motion.path
            fill="rgba(210,110,30,0.28)"
            animate={{
              d: [
                'M 40,72 Q 120,60 214,72 Q 300,84 378,72 L 378,94 Q 300,106 214,94 Q 120,82 40,94 Z',
                'M 40,72 Q 120,84 214,72 Q 300,60 378,72 L 378,94 Q 300,82 214,94 Q 120,106 40,94 Z',
              ]
            }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 4.6, repeatType: 'mirror' }}
          />
        </g>

        {/* ── Mug outline (draw-in animation) ── */}
        <motion.path
          d="M 42,46 L 386,46 Q 400,46 400,60 L 392,440 Q 392,460 372,460 L 56,460 Q 36,460 36,440 L 28,60 Q 28,46 42,46 Z"
          fill="none"
          stroke="rgba(217,142,74,0.7)"
          strokeWidth="2.5"
          strokeDasharray="2000 2000"
          initial={{ strokeDashoffset: 2000 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1], delay: 0.5 }}
        />

        {/* Handle outline */}
        <motion.path
          d="M 392,158 Q 470,158 470,278 Q 470,396 392,396"
          fill="none"
          stroke="rgba(217,142,74,0.7)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="400 400"
          initial={{ strokeDashoffset: 400 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 1.8 }}
        />

        {/* Handle inner arc */}
        <motion.path
          d="M 392,200 Q 432,200 432,278 Q 432,356 392,356"
          fill="none"
          stroke="rgba(217,142,74,0.22)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.6 }}
        />

        {/* Rim top highlight */}
        <motion.path
          d="M 28,60 Q 28,46 42,46 L 386,46 Q 400,46 400,60"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
        />

        {/* Inner rim line */}
        <motion.line
          x1={54} y1={62} x2={374} y2={62}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        />

        {/* Left-side gloss streak */}
        <motion.path
          d="M 42,88 Q 58,80 74,88 L 70,240 Q 54,248 38,240 Z"
          fill="url(#glossGrad)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.2 }}
        />

        {/* ── Steam wisps (appear after fill) ── */}
        {[
          { x: 130, dx: 16, delay: 4.6 },
          { x: 214, dx: -14, delay: 5.1 },
          { x: 298, dx: 12, delay: 4.9 },
        ].map((s, i) => (
          <motion.path
            key={i}
            d={`M ${s.x},48 Q ${s.x + s.dx},18 ${s.x},-10 Q ${s.x - s.dx},-38 ${s.x + s.dx * 0.6},-64`}
            fill="none"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="2.2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.5, 0.35, 0], y: [0, -8, -18, -28] }}
            transition={{ duration: 3.0, delay: s.delay, repeat: Infinity, repeatDelay: 1.0, ease: 'easeInOut' }}
          />
        ))}

        {/* Bottom shadow line */}
        <motion.ellipse
          cx={214} cy={472} rx={170} ry={8}
          fill="rgba(0,0,0,0.5)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        />
      </svg>
    </motion.div>
  )
}

/* ── Hero ── */
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

      {/* ── Main two-column layout ── */}
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
            <motion.img
              src="/logo.png"
              alt="Brewprint"
              style={{
                height: 'clamp(4rem, 7vw, 8rem)',
                width: 'auto',
                marginBottom: 20,
                filter: 'drop-shadow(0 0 30px rgba(200,120,40,0.7)) drop-shadow(0 0 10px rgba(255,180,60,0.35))',
              }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.0 }}
            />

            <h1
              className="font-bold text-white"
              style={{ fontSize: 'clamp(3.5rem, 5.8vw, 7.5rem)', letterSpacing: '-0.058em', lineHeight: 0.88, marginBottom: 22 }}
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

          {/* RIGHT: animated mug */}
          <div className="flex items-center justify-center lg:justify-end">
            <div style={{ width: '100%', maxWidth: 480 }}>
              <AnimatedMug />
            </div>
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
