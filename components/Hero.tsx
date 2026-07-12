'use client'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0" style={{ background: '#000' }} />

      {/* Centered amber radial glow — sits where the logo floats */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 52% 42% at 50% 46%, rgba(155,70,12,0.30) 0%, rgba(80,30,4,0.12) 48%, transparent 72%)',
      }} />

      {/* Top + bottom vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 28%, transparent 68%, rgba(0,0,0,0.55) 100%)',
      }} />

      <div className="h-20 flex-shrink-0" />

      {/* Main */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center">

        {/* Stacked BREWPRINT + rising logo */}
        <div className="relative w-full select-none" style={{ isolation: 'isolate' }}>

          {/* Text rows — fading in from top and bottom */}
          <div style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
          }}>
            {[0, 1, 2, 3].map((i) => (
              <motion.div
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.0, delay: 0.1 + i * 0.07 }}
              >
                BREWPRINT
              </motion.div>
            ))}
          </div>

          {/* Logo rising up through the text */}
          <motion.div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
            }}
            initial={{ opacity: 0, scale: 0.78, y: 64 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.9, ease: [0.08, 0.94, 0.22, 1.0], delay: 0.65 }}
          >
            <motion.img
              src="/logo.png"
              alt="Brewprint"
              style={{
                width: 'clamp(190px, 27vw, 390px)',
                height: 'auto',
                filter: 'drop-shadow(0 0 90px rgba(200,120,40,0.92)) drop-shadow(0 0 36px rgba(255,160,50,0.55)) drop-shadow(0 0 10px rgba(255,210,120,0.3))',
              }}
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.3, delay: 2.6 }}
            />
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="flex flex-col items-center text-center"
          style={{ marginTop: 'clamp(22px, 3.8vw, 50px)' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 1.4 }}
        >
          <p
            className="text-white/45 font-medium leading-relaxed"
            style={{ fontSize: 'clamp(1rem, 1.4vw, 1.2rem)', marginBottom: 28, maxWidth: 340 }}
          >
            Find your perfect cup.<br />Discover the shop behind it.
          </p>

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
