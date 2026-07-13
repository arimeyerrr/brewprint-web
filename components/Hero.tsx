'use client'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      <div className="absolute inset-0" style={{ background: '#000' }} />

      {/* Ambient glow behind the logo */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 52% 42% at 50% 48%, rgba(155,70,12,0.28) 0%, rgba(80,30,4,0.10) 50%, transparent 72%)',
      }} />

      {/* Top + bottom vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 28%, transparent 68%, rgba(0,0,0,0.55) 100%)',
      }} />

      <div className="h-20 flex-shrink-0" />

      {/* Main — fills remaining height, centers block */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center">

        {/* Fixed-height container so text rows and logo share the same reference frame */}
        <div className="relative w-full" style={{ height: '68vh', isolation: 'isolate' }}>

          {/* Text rows — absolutely fill container, centered vertically */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-center select-none"
            style={{
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.1 }}
          >
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  fontSize: 'clamp(4.8rem, 17.5vw, 23rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.045em',
                  lineHeight: 0.87,
                  color: 'rgba(255,255,255,0.09)',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                BREWPRINT
              </div>
            ))}
          </motion.div>

          {/* Logo — absolutely centered in the same container */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 10 }}>
            <motion.img
              src="/logo.png"
              alt="Brewprint"
              style={{
                width: 'clamp(260px, 34vw, 500px)',
                height: 'auto',
              }}
              initial={{ opacity: 0, scale: 0.80, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.8, ease: [0.08, 0.94, 0.22, 1.0], delay: 0.6 }}
            />
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="flex flex-col items-center text-center"
          style={{ marginTop: 'clamp(20px, 3vw, 40px)' }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 1.4 }}
        >
          <a
            href="#waitlist"
            className="inline-block font-semibold text-white rounded-full transition-all duration-200 hover:scale-105 cursor-pointer"
            style={{
              fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)',
              padding: 'clamp(13px, 1.4vw, 17px) clamp(30px, 2.8vw, 46px)',
              background: 'linear-gradient(135deg, #A85A18 0%, #D98E4A 50%, #B86820 100%)',
              boxShadow: '0 10px 40px rgba(217,142,74,0.48), inset 0 1px 0 rgba(255,255,255,0.22)',
              letterSpacing: '-0.01em',
            }}
          >
            Join the Waitlist →
          </a>

          <p className="text-white/18 text-xs mt-4 tracking-widest uppercase">Coming fall 2026 · Early access guaranteed</p>
        </motion.div>
      </div>

      <div className="relative z-10 flex justify-center pb-6 opacity-25">
        <motion.div
          className="w-px h-7 bg-gradient-to-b from-transparent to-white"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </section>
  )
}
