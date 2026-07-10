'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

/* ---------- Liquid animation (unchanged) ---------- */

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
          ? { y: '52%' }
          : { y: ['52%', '50.5%', '53.5%', '51.2%', '53%', '52%'] }
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

/* ---------- App phone mockup ---------- */

const MAP_PINS = [
  { x: 28, y: 42, score: 9.7, active: true,  name: 'Opus Coffee' },
  { x: 56, y: 62, score: 9.1, active: false, name: 'Volta' },
  { x: 72, y: 30, score: 8.8, active: false, name: 'East End' },
  { x: 18, y: 66, score: 8.5, active: false },
  { x: 82, y: 55, score: 7.9, active: false },
  { x: 46, y: 20, score: 9.2, active: false },
]

function MapPin({ pin }: { pin: typeof MAP_PINS[0] }) {
  return (
    <div style={{ position: 'absolute', left: `${pin.x}%`, top: `${pin.y}%`, transform: 'translate(-50%, -100%)', zIndex: 2 }}>
      {pin.active && (
        <div style={{
          position: 'absolute', bottom: '115%', left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(8,10,20,0.92)', border: '1px solid rgba(217,142,74,0.45)',
          borderRadius: 8, padding: '4px 9px', fontSize: 9, fontWeight: 700,
          color: '#D98E4A', whiteSpace: 'nowrap', backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.6)',
        }}>
          {pin.name} · {pin.score}
        </div>
      )}
      <div style={{
        width: pin.active ? 18 : 11,
        height: pin.active ? 18 : 11,
        background: pin.active ? '#D98E4A' : 'rgba(217,142,74,0.45)',
        borderRadius: '50% 50% 50% 0',
        transform: 'rotate(-45deg)',
        boxShadow: pin.active ? '0 0 18px rgba(217,142,74,0.9), 0 0 6px rgba(217,142,74,0.6)' : undefined,
        border: pin.active ? '1.5px solid rgba(255,220,140,0.5)' : undefined,
      }} />
    </div>
  )
}

function AppPhone() {
  return (
    <div style={{
      width: 260, height: 520,
      background: '#06080e',
      borderRadius: 42,
      border: '1.5px solid rgba(255,255,255,0.13)',
      boxShadow: '0 60px 140px rgba(0,0,0,0.95), 0 0 0 0.5px rgba(255,255,255,0.05) inset',
      overflow: 'hidden',
      position: 'relative',
      flexShrink: 0,
    }}>
      {/* Dynamic island */}
      <div style={{
        position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
        background: '#000', borderRadius: 20, padding: '5px 16px',
        minWidth: 96, zIndex: 20, display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#181818' }} />
        <div style={{ flex: 1 }} />
        <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#181818' }} />
      </div>

      {/* Status bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 52, zIndex: 15,
        background: 'linear-gradient(to bottom, rgba(6,8,14,1) 40%, transparent)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        padding: '13px 18px 0',
      }}>
        <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 10, fontWeight: 600 }}>9:41</span>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <svg viewBox="0 0 15 10" fill="rgba(255,255,255,0.55)" width={12}>
            <rect x="0" y="5" width="2.5" height="5" /><rect x="4" y="3" width="2.5" height="7" />
            <rect x="8" y="1" width="2.5" height="9" /><rect x="12" y="0" width="2.5" height="10" />
          </svg>
        </div>
      </div>

      {/* Map area */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(155deg, #060c18 0%, #07101e 50%, #060a14 100%)' }}>
        {/* Map grid lines */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 34} y1="0" x2={i * 34} y2="100%" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
          ))}
          {Array.from({ length: 16 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 36} x2="100%" y2={i * 36} stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
          ))}
          {/* Subtle road lines */}
          <line x1="0" y1="195" x2="180" y2="95" stroke="rgba(255,255,255,0.09)" strokeWidth="1.5" />
          <line x1="140" y1="0" x2="260" y2="240" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" />
          <line x1="0" y1="330" x2="260" y2="400" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        </svg>

        {/* User dot */}
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#4B8FEA', border: '1.5px solid white', boxShadow: '0 0 0 7px rgba(75,143,234,0.18)' }} />
        </div>

        {/* Location pins */}
        {MAP_PINS.map((pin, i) => <MapPin key={i} pin={pin} />)}
      </div>

      {/* Bottom UI panel */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '18px 16px 36px',
        background: 'linear-gradient(to top, rgba(6,8,14,1) 60%, rgba(6,8,14,0.96) 80%, transparent)',
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.055)', border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: 14, padding: '12px 14px', marginBottom: 8,
          backdropFilter: 'blur(24px)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
            <span style={{ color: 'rgba(217,142,74,0.6)', fontSize: 7.5, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>
              top match near you
            </span>
            <span style={{ color: '#D98E4A', fontSize: 17, fontWeight: 900, lineHeight: 1 }}>9.7</span>
          </div>
          <p style={{ color: 'white', fontSize: 13, fontWeight: 700, marginBottom: 1 }}>Opus Coffee</p>
          <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: 10 }}>0.3 mi · Bold · Nutty · Single Origin</p>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {[{ name: 'Volta', score: '9.1' }, { name: 'East End', score: '8.8' }].map(s => (
            <div key={s.name} style={{
              flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 11, padding: '7px 10px',
            }}>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 10, fontWeight: 600 }}>{s.name}</p>
              <p style={{ color: '#D98E4A', fontSize: 11, fontWeight: 800, marginTop: 1 }}>{s.score}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Home bar */}
      <div style={{ position: 'absolute', bottom: 9, left: '50%', transform: 'translateX(-50%)', width: 90, height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.15)', zIndex: 20 }} />

      {/* Glass gloss */}
      <div style={{ position: 'absolute', inset: 0, borderRadius: 42, background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, transparent 40%)', pointerEvents: 'none', zIndex: 25 }} />
    </div>
  )
}

/* ---------- Hero ---------- */

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Deep background */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 90% 60% at 50% 20%, #1c0900 0%, #080200 55%, #000000 100%)' }}
      />

      {/* Liquid coffee at bottom */}
      <LiquidContainer>
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to top, rgba(4,1,0,1) 0%, rgba(14,5,0,1) 10%, rgba(38,12,1,1) 25%, rgba(72,26,4,0.98) 42%, rgba(118,50,10,0.88) 58%, rgba(160,78,20,0.65) 74%, rgba(195,110,38,0.32) 88%, transparent 100%)',
        }} />
        <WaveLayer duration={7}  delay={0}   opacity={1}    yRange={8}  color="rgba(18,5,0,1)"
          path="M0,32 C150,4 320,66 500,32 C680,0 860,68 1040,34 C1220,2 1360,54 1440,32 L1440,90 L0,90 Z" />
        <WaveLayer duration={11} delay={1.2} opacity={0.92} yRange={12} color="rgba(58,20,3,0.97)"
          path="M0,46 C200,14 400,74 600,46 C800,18 1000,74 1200,46 C1320,30 1400,62 1440,46 L1440,90 L0,90 Z" />
        <WaveLayer duration={15} delay={3.5} opacity={0.78} yRange={16} color="rgba(105,42,8,0.82)"
          path="M0,54 C130,36 260,68 390,54 C520,38 650,68 780,54 C910,38 1040,66 1170,54 C1300,40 1390,62 1440,54 L1440,90 L0,90 Z" />
        <WaveLayer duration={9}  delay={2.6} opacity={0.60} yRange={10} color="rgba(158,68,16,0.70)"
          path="M0,58 C180,44 360,70 540,58 C720,44 900,70 1080,58 C1260,44 1380,66 1440,58 L1440,90 L0,90 Z" />
        <WaveLayer duration={6.5} delay={0.9} opacity={0.42} yRange={8}  color="rgba(205,108,30,0.55)"
          path="M0,62 C120,56 240,68 360,62 C480,56 600,68 720,62 C840,56 960,68 1080,62 C1200,56 1340,66 1440,62 L1440,90 L0,90 Z" />
      </LiquidContainer>

      {/* Top vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent pointer-events-none" />

      {/* Spacer for nav */}
      <div className="h-20 flex-shrink-0" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center flex-1 px-6 pb-12 pt-4">

        {/* Eyebrow + tagline */}
        <motion.div
          className="text-center mb-8 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          <motion.img
            src="/logo.png"
            alt="Brewprint"
            style={{ width: 'clamp(120px, 16vw, 180px)', objectFit: 'contain', filter: 'drop-shadow(0 0 20px rgba(200,120,40,0.5))', display: 'block', margin: '0 auto 16px' }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
          />
          <h1 className="font-bold text-white" style={{ fontSize: 'clamp(2.8rem, 8vw, 6rem)', letterSpacing: '-0.055em', lineHeight: 0.92, marginBottom: 16 }}>
            brewprint
          </h1>
          <p className="text-white/40 text-sm md:text-base font-medium tracking-wide max-w-xs mx-auto">
            find your perfect cup — discover the shop behind it
          </p>
        </motion.div>

        {/* Phone frame — the hero centerpiece */}
        <motion.div
          className="relative flex-shrink-0"
          initial={{ opacity: 0, y: 40, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        >
          {/* Ambient glow behind phone */}
          <div style={{
            position: 'absolute', inset: '-60px',
            background: 'radial-gradient(ellipse 70% 55% at 50% 60%, rgba(160,72,14,0.35) 0%, rgba(100,40,8,0.18) 50%, transparent 80%)',
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }} />

          {/* Floating score badge — top left of phone, desktop only */}
          <motion.div
            className="hidden sm:block"
            style={{
              position: 'absolute', top: 60, left: -80, zIndex: 30,
              background: 'rgba(10,12,22,0.88)', border: '1px solid rgba(217,142,74,0.35)',
              borderRadius: 12, padding: '8px 12px',
              backdropFilter: 'blur(16px)', boxShadow: '0 8px 28px rgba(0,0,0,0.5)',
            }}
            animate={{ y: [0, -6, 0], x: [0, 3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <p style={{ color: 'rgba(217,142,74,0.65)', fontSize: 7.5, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 2 }}>your match</p>
            <p style={{ color: '#D98E4A', fontSize: 20, fontWeight: 900, lineHeight: 1 }}>9.7</p>
          </motion.div>

          {/* Floating "near you" badge — top right, desktop only */}
          <motion.div
            className="hidden sm:block"
            style={{
              position: 'absolute', top: 100, right: -72, zIndex: 30,
              background: 'rgba(10,12,22,0.88)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 12, padding: '7px 11px',
              backdropFilter: 'blur(16px)', boxShadow: '0 8px 28px rgba(0,0,0,0.5)',
            }}
            animate={{ y: [0, 5, 0], x: [0, -3, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#D98E4A', boxShadow: '0 0 8px rgba(217,142,74,0.8)' }} />
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 9, fontWeight: 600 }}>3 shops near you</span>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          >
            <AppPhone />
          </motion.div>
        </motion.div>

        {/* CTA below phone */}
        <motion.div
          className="text-center mt-8 md:mt-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.9 }}
        >
          <a
            href="#waitlist"
            className="inline-block font-semibold text-white text-sm md:text-base px-10 py-4 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #A85A18 0%, #D98E4A 50%, #B86820 100%)',
              boxShadow: '0 8px 36px rgba(217,142,74,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
              letterSpacing: '-0.01em',
              cursor: 'pointer',
            }}
          >
            Join the Waitlist →
          </a>
          <p className="text-white/25 text-xs mt-3 tracking-wide">Launching soon. Early access guaranteed.</p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 flex justify-center pb-6 opacity-25">
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-transparent to-white"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </section>
  )
}
