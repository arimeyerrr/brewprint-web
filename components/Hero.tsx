'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

/* ── Liquid animation ── */

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
          ? { y: '55%' }
          : { y: ['55%', '53.5%', '56.5%', '54.2%', '56%', '55%'] }
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

/* ── App phone: replicates the real map view from the app ── */

const SHOP_PINS = [
  { x: 24, y: 26, score: '9.4', photo: true,  c1: '#2d4228', c2: '#1e2d1a' },
  { x: 57, y: 20, score: '7.6', photo: true,  c1: '#4a2e1a', c2: '#321e0e' },
  { x: 73, y: 36, score: '8.8', photo: true,  c1: '#1a2d4a', c2: '#101d32' },
  { x: 38, y: 52, score: '7.4', photo: true,  c1: '#38203c', c2: '#261428' },
  { x: 80, y: 55, score: '6.4', photo: false, c1: '', c2: '' },
  { x: 18, y: 60, score: '5.3', photo: false, c1: '', c2: '' },
  { x: 63, y: 65, score: '9.1', photo: true,  c1: '#2a3820', c2: '#1a2414' },
]

function AppPhone() {
  return (
    <div style={{
      width: 260, height: 520,
      background: '#08111e',
      borderRadius: 42,
      border: '1.5px solid rgba(255,255,255,0.13)',
      boxShadow: '0 60px 140px rgba(0,0,0,0.95), 0 0 0 0.5px rgba(255,255,255,0.05) inset',
      overflow: 'hidden',
      position: 'relative',
      flexShrink: 0,
    }}>
      {/* Dynamic island */}
      <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', background: '#000', borderRadius: 20, padding: '5px 16px', minWidth: 96, zIndex: 20, display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#181818' }} />
        <div style={{ flex: 1 }} />
        <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#181818' }} />
      </div>

      {/* Status bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 52, zIndex: 15, background: 'linear-gradient(to bottom, rgba(8,17,30,1) 60%, transparent)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '13px 18px 0' }}>
        <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 10, fontWeight: 600 }}>9:41</span>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <svg viewBox="0 0 15 10" fill="rgba(255,255,255,0.75)" width={12}><rect x="0" y="5" width="2.5" height="5"/><rect x="4" y="3" width="2.5" height="7"/><rect x="8" y="1" width="2.5" height="9"/><rect x="12" y="0" width="2.5" height="10"/></svg>
        </div>
      </div>

      {/* Map base */}
      <div style={{ position: 'absolute', inset: 0, background: '#0d1825' }}>
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          {/* Block fills */}
          <rect x="0%" y="0%" width="14%" height="22%" fill="#101e2c" />
          <rect x="56%" y="46%" width="19%" height="16%" rx="1" fill="#0e1d14" /> {/* park */}
          <rect x="28%" y="62%" width="22%" height="16%" fill="#101e2c" />
          <rect x="72%" y="20%" width="28%" height="24%" fill="#0f1c28" />
          {/* Horizontal roads */}
          {[20, 32, 46, 60, 72, 84].map(y => (
            <line key={`h${y}`} x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`} stroke="#16273d" strokeWidth="2" />
          ))}
          {/* Vertical roads */}
          {[14, 28, 42, 56, 70, 84].map(x => (
            <line key={`v${x}`} x1={`${x}%`} y1="0" x2={`${x}%`} y2="100%" stroke="#16273d" strokeWidth="2" />
          ))}
          {/* Diagonal ave */}
          <line x1="0" y1="38%" x2="100%" y2="8%" stroke="#1c2f46" strokeWidth="3" />
          <line x1="12%" y1="100%" x2="88%" y2="44%" stroke="#1c2f46" strokeWidth="2.5" />
          {/* Minor streets — fine grid */}
          {[8, 26, 39, 53, 66, 78].map(y => (
            <line key={`mh${y}`} x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`} stroke="#13202e" strokeWidth="1" />
          ))}
          {[7, 21, 35, 49, 63, 77, 91].map(x => (
            <line key={`mv${x}`} x1={`${x}%`} y1="0" x2={`${x}%`} y2="100%" stroke="#13202e" strokeWidth="1" />
          ))}
        </svg>

        {/* Neighbourhood labels */}
        <div style={{ position: 'absolute', top: '16%', right: '6%', fontSize: 7, fontWeight: 700, color: 'rgba(255,255,255,0.12)', letterSpacing: '0.12em', textTransform: 'uppercase', lineHeight: 1.3 }}>
          OAKVIEW
        </div>
        <div style={{ position: 'absolute', bottom: '22%', left: '30%', fontSize: 6.5, fontWeight: 700, color: 'rgba(255,255,255,0.1)', letterSpacing: '0.1em', textTransform: 'uppercase', lineHeight: 1.3, textAlign: 'center' }}>
          UNIVERSITY<br/>HEIGHTS
        </div>

        {/* User location */}
        <div style={{ position: 'absolute', left: '46%', top: '44%', transform: 'translate(-50%,-50%)', zIndex: 3 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#4B8FEA', border: '1.5px solid white', boxShadow: '0 0 0 7px rgba(75,143,234,0.18)' }} />
        </div>

        {/* Shop pins */}
        {SHOP_PINS.map((pin, i) => (
          <div key={i} style={{ position: 'absolute', left: `${pin.x}%`, top: `${pin.y}%`, transform: 'translate(-50%,-50%)', zIndex: 4 }}>
            {pin.photo ? (
              /* Circular photo pin */
              <div style={{ position: 'relative', width: 36, height: 36 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${pin.c1}, ${pin.c2})`,
                  border: '2px solid rgba(0,0,0,0.85)',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.7)',
                }} />
                <div style={{
                  position: 'absolute', bottom: -4, right: -5,
                  background: '#080c12', borderRadius: 5,
                  padding: '1.5px 4px', fontSize: 7.5, fontWeight: 800,
                  color: parseFloat(pin.score) >= 9 ? '#D98E4A' : 'rgba(255,255,255,0.82)',
                  border: '0.5px solid rgba(255,255,255,0.12)',
                  lineHeight: 1.4,
                }}>
                  {pin.score}
                </div>
              </div>
            ) : (
              /* Score-only pin */
              <div style={{
                background: 'rgba(8,12,22,0.88)', backdropFilter: 'blur(8px)',
                border: '0.5px solid rgba(255,255,255,0.14)', borderRadius: 8,
                padding: '2px 6px', fontSize: 8, fontWeight: 800,
                color: 'rgba(255,255,255,0.7)',
              }}>
                {pin.score}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Search + filters overlay */}
      <div style={{ position: 'absolute', top: 50, left: 0, right: 0, zIndex: 10, padding: '6px 10px 4px' }}>
        <div style={{
          background: 'rgba(6,10,18,0.85)', backdropFilter: 'blur(20px)',
          border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: 22,
          padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6,
        }}>
          <svg viewBox="0 0 16 16" fill="none" width={10}>
            <circle cx="7" cy="7" r="4.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.3"/>
            <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="rgba(255,255,255,0.3)" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          <span style={{ color: 'rgba(255,255,255,0.28)', fontSize: 8.5 }}>Search coffee shops...</span>
          <div style={{ marginLeft: 'auto', width: 14, height: 14, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(217,142,74,0.6)' }} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 5 }}>
          {[{ l: 'My Usual ▾', active: true }, { l: 'cozy', active: false }, { l: 'wifi', active: false }].map(f => (
            <div key={f.l} style={{
              background: f.active ? 'rgba(217,142,74,0.14)' : 'rgba(6,10,18,0.8)',
              backdropFilter: 'blur(12px)',
              border: `0.5px solid ${f.active ? 'rgba(217,142,74,0.45)' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: 20, padding: '4px 9px', fontSize: 8, fontWeight: 600,
              color: f.active ? '#D98E4A' : 'rgba(255,255,255,0.55)',
              whiteSpace: 'nowrap' as const,
            }}>{f.l}</div>
          ))}
        </div>
      </div>

      {/* Bottom tab bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10,
        background: 'rgba(6,10,16,0.94)', backdropFilter: 'blur(20px)',
        borderTop: '0.5px solid rgba(255,255,255,0.07)',
        padding: '10px 0 22px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-around',
      }}>
        <svg viewBox="0 0 24 24" fill="none" width={18}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/></svg>
        <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(217,142,74,0.14)', border: '1px solid rgba(217,142,74,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 24 24" fill="none" width={15}><circle cx="12" cy="12" r="9" stroke="#D98E4A" strokeWidth="1.5"/><path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" stroke="#D98E4A" strokeWidth="1.4"/></svg>
        </div>
        <svg viewBox="0 0 24 24" fill="none" width={18}><rect x="3" y="3" width="7" height="7" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/><rect x="14" y="3" width="7" height="7" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/><rect x="3" y="14" width="7" height="7" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/><rect x="14" y="14" width="7" height="7" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/></svg>
        <svg viewBox="0 0 24 24" fill="none" width={18}><circle cx="12" cy="8" r="4" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/></svg>
      </div>

      {/* Glass gloss */}
      <div style={{ position: 'absolute', inset: 0, borderRadius: 42, background: 'linear-gradient(145deg, rgba(255,255,255,0.055) 0%, transparent 40%)', pointerEvents: 'none', zIndex: 26 }} />
    </div>
  )
}

/* ── Hero ── */

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Deep background */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 90% 60% at 50% 20%, #1c0900 0%, #080200 55%, #000000 100%)' }} />

      {/* Liquid coffee */}
      <LiquidContainer>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(4,1,0,1) 0%, rgba(14,5,0,1) 10%, rgba(38,12,1,1) 25%, rgba(72,26,4,0.98) 42%, rgba(118,50,10,0.88) 58%, rgba(160,78,20,0.65) 74%, rgba(195,110,38,0.32) 88%, transparent 100%)' }} />
        <WaveLayer duration={7}   delay={0}   opacity={1}    yRange={8}  color="rgba(18,5,0,1)"         path="M0,32 C150,4 320,66 500,32 C680,0 860,68 1040,34 C1220,2 1360,54 1440,32 L1440,90 L0,90 Z" />
        <WaveLayer duration={11}  delay={1.2} opacity={0.92} yRange={12} color="rgba(58,20,3,0.97)"     path="M0,46 C200,14 400,74 600,46 C800,18 1000,74 1200,46 C1320,30 1400,62 1440,46 L1440,90 L0,90 Z" />
        <WaveLayer duration={15}  delay={3.5} opacity={0.78} yRange={16} color="rgba(105,42,8,0.82)"    path="M0,54 C130,36 260,68 390,54 C520,38 650,68 780,54 C910,38 1040,66 1170,54 C1300,40 1390,62 1440,54 L1440,90 L0,90 Z" />
        <WaveLayer duration={9}   delay={2.6} opacity={0.60} yRange={10} color="rgba(158,68,16,0.70)"   path="M0,58 C180,44 360,70 540,58 C720,44 900,70 1080,58 C1260,44 1380,66 1440,58 L1440,90 L0,90 Z" />
        <WaveLayer duration={6.5} delay={0.9} opacity={0.42} yRange={8}  color="rgba(205,108,30,0.55)"  path="M0,62 C120,56 240,68 360,62 C480,56 600,68 720,62 C840,56 960,68 1080,62 C1200,56 1340,66 1440,62 L1440,90 L0,90 Z" />
      </LiquidContainer>

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent pointer-events-none" />
      <div className="h-20 flex-shrink-0" />

      {/* ── Content: mobile = column, desktop = two-column split ── */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row items-center lg:items-center gap-10 lg:gap-0 px-8 lg:px-20 pb-10 pt-6">

        {/* LEFT — text (desktop), top (mobile) */}
        <motion.div
          className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left order-1"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <motion.img
            src="/logo.png"
            alt="Brewprint"
            style={{
              width: 'clamp(80px, 10vw, 130px)',
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 18px rgba(200,120,40,0.55))',
              marginBottom: 18,
            }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.2 }}
          />

          <h1
            className="font-bold text-white"
            style={{ fontSize: 'clamp(3.2rem, 7vw, 6.5rem)', letterSpacing: '-0.055em', lineHeight: 0.9, marginBottom: 20 }}
          >
            brewprint
          </h1>

          <p
            className="text-white/45 font-medium leading-snug max-w-xs lg:max-w-sm"
            style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)', marginBottom: 32 }}
          >
            Find your perfect cup.<br className="hidden lg:block" /> Discover the shop behind it.
          </p>

          <a
            href="#waitlist"
            className="inline-block font-semibold text-white rounded-full transition-all duration-200 hover:scale-105"
            style={{
              fontSize: 'clamp(0.85rem, 1.2vw, 1rem)',
              padding: '14px 36px',
              background: 'linear-gradient(135deg, #A85A18 0%, #D98E4A 50%, #B86820 100%)',
              boxShadow: '0 8px 36px rgba(217,142,74,0.42), inset 0 1px 0 rgba(255,255,255,0.2)',
              letterSpacing: '-0.01em',
              cursor: 'pointer',
            }}
          >
            Join the Waitlist →
          </a>

          <p className="text-white/22 text-xs mt-4 tracking-wide">
            Launching soon. Early access guaranteed.
          </p>
        </motion.div>

        {/* RIGHT — phone (desktop), below text (mobile) */}
        <div className="flex-1 flex items-center justify-center lg:justify-end order-2">
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          >
            {/* Ambient glow */}
            <div style={{
              position: 'absolute', inset: '-70px',
              background: 'radial-gradient(ellipse 70% 55% at 50% 55%, rgba(150,65,10,0.38) 0%, rgba(90,35,6,0.18) 50%, transparent 80%)',
              filter: 'blur(40px)',
              pointerEvents: 'none',
            }} />

            {/* Floating match badge — desktop only */}
            <motion.div
              className="hidden lg:block"
              style={{
                position: 'absolute', top: 70, left: -88, zIndex: 30,
                background: 'rgba(8,12,22,0.9)', border: '1px solid rgba(217,142,74,0.35)',
                borderRadius: 14, padding: '10px 14px',
                backdropFilter: 'blur(16px)', boxShadow: '0 8px 28px rgba(0,0,0,0.5)',
              }}
              animate={{ y: [0, -6, 0], x: [0, 2, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <p style={{ color: 'rgba(217,142,74,0.6)', fontSize: 7.5, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 3 }}>your match</p>
              <p style={{ color: '#D98E4A', fontSize: 22, fontWeight: 900, lineHeight: 1 }}>9.4</p>
            </motion.div>

            {/* Floating nearby badge — desktop only */}
            <motion.div
              className="hidden lg:block"
              style={{
                position: 'absolute', top: 110, right: -78, zIndex: 30,
                background: 'rgba(8,12,22,0.9)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 14, padding: '9px 12px',
                backdropFilter: 'blur(16px)', boxShadow: '0 8px 28px rgba(0,0,0,0.5)',
              }}
              animate={{ y: [0, 5, 0], x: [0, -2, 0] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#D98E4A', boxShadow: '0 0 8px rgba(217,142,74,0.8)' }} />
                <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: 9, fontWeight: 600 }}>3 shops near you</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            >
              <AppPhone />
            </motion.div>
          </motion.div>
        </div>
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
