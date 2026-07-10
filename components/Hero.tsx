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

/* ── Shared phone shell ── */
const PW = 230
const PH = 488

function PhoneShell({ children, bg = '#06090f' }: { children: React.ReactNode; bg?: string }) {
  return (
    <div style={{
      width: PW, height: PH, background: bg, borderRadius: 42,
      border: '1.5px solid rgba(255,255,255,0.13)',
      boxShadow: '0 50px 130px rgba(0,0,0,0.9), 0 16px 48px rgba(0,0,0,0.55), 0 0 0 0.5px rgba(255,255,255,0.04) inset',
      overflow: 'hidden', position: 'relative', flexShrink: 0,
    }}>
      {/* Dynamic island */}
      <div style={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', background: '#000', borderRadius: 18, padding: '4px 14px', minWidth: 78, zIndex: 30, display: 'flex', alignItems: 'center', gap: 5 }}>
        <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#181818' }} />
        <div style={{ flex: 1 }} />
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#181818' }} />
      </div>
      {/* Glass gloss */}
      <div style={{ position: 'absolute', inset: 0, borderRadius: 42, background: 'linear-gradient(145deg, rgba(255,255,255,0.055) 0%, transparent 40%)', pointerEvents: 'none', zIndex: 40 }} />
      {children}
    </div>
  )
}

/* ── Phone 1: Pick Your Usual ── */
function DrinkPhone() {
  return (
    <PhoneShell bg="#080808">
      {/* Starburst */}
      <div style={{ position: 'absolute', top: 34, left: '50%', transform: 'translateX(-50%)', width: 192, height: 192, zIndex: 1 }}>
        <svg viewBox="0 0 192 192" style={{ position: 'absolute', inset: 0, opacity: 0.13 }}>
          {Array.from({ length: 22 }).map((_, i) => {
            const a = (i / 22) * Math.PI * 2
            return <line key={i} x1={96 + Math.cos(a) * 9} y1={96 + Math.sin(a) * 9} x2={96 + Math.cos(a) * 94} y2={96 + Math.sin(a) * 94} stroke="#D98E4A" strokeWidth="1.2" />
          })}
        </svg>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(circle, rgba(190,90,20,0.2) 0%, transparent 65%)' }} />
        <div style={{ position: 'absolute', inset: 26, borderRadius: '50%', background: 'linear-gradient(135deg, #1a0a02, #0d0602)', border: '1.5px solid rgba(255,255,255,0.07)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="/drinks/latte.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 40% 30%, rgba(80,30,5,0.6), transparent)' }} />
        </div>
      </div>

      <div style={{ position: 'absolute', top: 34, left: 0, right: 0, textAlign: 'center', zIndex: 5 }}>
        <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: 7, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, margin: 0 }}>pick your usual</p>
      </div>

      <div style={{ position: 'absolute', bottom: 76, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, zIndex: 5 }}>
        <p style={{ color: 'white', fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em', margin: 0 }}>Latte</p>
        <div style={{ display: 'flex', gap: 5 }}>
          {['Creamy', 'Sweet', 'Smooth'].map(t => (
            <span key={t} style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.42)', background: 'rgba(255,255,255,0.06)', borderRadius: 20, padding: '3px 9px', border: '0.5px solid rgba(255,255,255,0.1)' }}>{t}</span>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 22, left: 20, right: 20, background: 'white', borderRadius: 26, padding: '10px 0', textAlign: 'center', fontSize: 9.5, fontWeight: 800, color: '#000', letterSpacing: '0.1em', zIndex: 5 }}>
        CONFIRM SELECTION
      </div>
    </PhoneShell>
  )
}

/* ── Phone 2: Refine Your Taste ── */
const PREF_PREVIEW = [
  { label: 'VIBE', tags: ['Quiet', 'Cozy', 'Good Lighting', 'Lively'] },
  { label: 'ROAST', tags: ['Light Roast', 'Medium Roast', 'Dark Roast'] },
  { label: 'FLAVOR', tags: ['Chocolatey', 'Fruity', 'Floral', 'Bold'] },
  { label: 'AMENITIES', tags: ['Fast Wifi', 'Outlets', 'Dog Friendly'] },
]
const PRESELECTED = new Set(['Cozy', 'Good Lighting', 'Medium Roast', 'Chocolatey', 'Fast Wifi'])

function PrefsPhone() {
  return (
    <PhoneShell>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #0a0e18, #060810)' }} />
      <div style={{ position: 'absolute', top: 34, left: 0, right: 0, textAlign: 'center', zIndex: 5 }}>
        <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: 7, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, margin: 0 }}>refine your taste</p>
      </div>
      <div style={{ position: 'absolute', top: 54, left: 0, right: 0, bottom: 52, padding: '6px 16px 0', zIndex: 5, display: 'flex', flexDirection: 'column', gap: 9, overflowY: 'hidden' }}>
        {PREF_PREVIEW.map(g => (
          <div key={g.label}>
            <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 6.5, letterSpacing: '0.14em', fontWeight: 700, margin: '0 0 4px' }}>{g.label}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {g.tags.map(t => {
                const sel = PRESELECTED.has(t)
                return (
                  <span key={t} style={{ fontSize: 8.5, color: sel ? '#D98E4A' : 'rgba(255,255,255,0.52)', background: sel ? 'rgba(217,142,74,0.11)' : 'rgba(255,255,255,0.05)', border: `0.5px solid ${sel ? 'rgba(217,142,74,0.38)' : 'rgba(255,255,255,0.1)'}`, borderRadius: 18, padding: '3.5px 9px' }}>{t}</span>
                )
              })}
            </div>
          </div>
        ))}
      </div>
      <div style={{ position: 'absolute', bottom: 18, left: 18, right: 18, background: 'linear-gradient(135deg, #A85A18, #D98E4A)', borderRadius: 26, padding: '10px 0', textAlign: 'center', fontSize: 9.5, fontWeight: 800, color: '#000', letterSpacing: '0.1em', zIndex: 5 }}>
        BUILD MY FEED
      </div>
    </PhoneShell>
  )
}

/* ── Phone 3: Map Results ── */
const SHOP_PINS = [
  { x: 24, y: 22, score: '9.4', photo: true,  c1: '#2d4228', c2: '#1e2d1a' },
  { x: 57, y: 18, score: '7.6', photo: true,  c1: '#4a2e1a', c2: '#321e0e' },
  { x: 73, y: 33, score: '8.8', photo: true,  c1: '#1a2d4a', c2: '#101d32' },
  { x: 80, y: 52, score: '6.4', photo: false, c1: '', c2: '' },
  { x: 18, y: 56, score: '5.3', photo: false, c1: '', c2: '' },
  { x: 63, y: 60, score: '9.1', photo: true,  c1: '#2a3820', c2: '#1a2414' },
]

function MapPhone() {
  return (
    <PhoneShell>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 42, zIndex: 20, background: 'linear-gradient(to bottom, rgba(8,17,30,1) 55%, transparent)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '11px 15px 0' }}>
        <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 9, fontWeight: 600 }}>9:41</span>
        <svg viewBox="0 0 15 10" fill="rgba(255,255,255,0.75)" width={11}><rect x="0" y="5" width="2.5" height="5"/><rect x="4" y="3" width="2.5" height="7"/><rect x="8" y="1" width="2.5" height="9"/><rect x="12" y="0" width="2.5" height="10"/></svg>
      </div>

      {/* Map */}
      <div style={{ position: 'absolute', inset: 0, background: '#0d1825' }}>
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <rect x="0%" y="0%" width="14%" height="22%" fill="#101e2c" />
          <rect x="56%" y="42%" width="19%" height="16%" rx="1" fill="#0e1d14" />
          <rect x="28%" y="60%" width="22%" height="14%" fill="#101e2c" />
          <rect x="72%" y="20%" width="28%" height="22%" fill="#0f1c28" />
          {[18,30,43,56,68].map(y => <line key={`h${y}`} x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`} stroke="#16273d" strokeWidth="2" />)}
          {[14,28,42,56,70,84].map(x => <line key={`v${x}`} x1={`${x}%`} y1="0" x2={`${x}%`} y2="100%" stroke="#16273d" strokeWidth="2" />)}
          <line x1="0" y1="36%" x2="100%" y2="6%" stroke="#1c2f46" strokeWidth="3" />
          <line x1="12%" y1="100%" x2="88%" y2="40%" stroke="#1c2f46" strokeWidth="2.5" />
          {[8,24,37,50,62].map(y => <line key={`mh${y}`} x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`} stroke="#13202e" strokeWidth="1" />)}
          {[7,21,35,49,63,77,91].map(x => <line key={`mv${x}`} x1={`${x}%`} y1="0" x2={`${x}%`} y2="100%" stroke="#13202e" strokeWidth="1" />)}
        </svg>
        <div style={{ position: 'absolute', left: '45%', top: '40%', transform: 'translate(-50%,-50%)', zIndex: 3 }}>
          <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#4B8FEA', border: '1.5px solid white', boxShadow: '0 0 0 6px rgba(75,143,234,0.18)' }} />
        </div>
        {SHOP_PINS.map((pin, i) => (
          <div key={i} style={{ position: 'absolute', left: `${pin.x}%`, top: `${pin.y}%`, transform: 'translate(-50%,-50%)', zIndex: 4 }}>
            {pin.photo ? (
              <div style={{ position: 'relative', width: 28, height: 28 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: `linear-gradient(135deg, ${pin.c1}, ${pin.c2})`, border: '1.5px solid rgba(0,0,0,0.8)', boxShadow: '0 2px 8px rgba(0,0,0,0.7)' }} />
                <div style={{ position: 'absolute', bottom: -3, right: -4, background: '#080c12', borderRadius: 4, padding: '1px 3px', fontSize: 6, fontWeight: 800, color: parseFloat(pin.score) >= 9 ? '#D98E4A' : 'rgba(255,255,255,0.82)', border: '0.5px solid rgba(255,255,255,0.12)' }}>{pin.score}</div>
              </div>
            ) : (
              <div style={{ background: 'rgba(8,12,22,0.88)', backdropFilter: 'blur(8px)', border: '0.5px solid rgba(255,255,255,0.14)', borderRadius: 6, padding: '1.5px 4.5px', fontSize: 6.5, fontWeight: 800, color: 'rgba(255,255,255,0.7)' }}>{pin.score}</div>
            )}
          </div>
        ))}
      </div>

      {/* Search + filters */}
      <div style={{ position: 'absolute', top: 40, left: 0, right: 0, zIndex: 15, padding: '5px 8px 4px' }}>
        <div style={{ background: 'rgba(6,10,18,0.85)', backdropFilter: 'blur(20px)', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5 }}>
          <svg viewBox="0 0 16 16" fill="none" width={8}><circle cx="7" cy="7" r="4.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.3"/><line x1="10.5" y1="10.5" x2="14" y2="14" stroke="rgba(255,255,255,0.3)" strokeWidth="1.3" strokeLinecap="round"/></svg>
          <span style={{ color: 'rgba(255,255,255,0.28)', fontSize: 7 }}>Search coffee shops...</span>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {[{ l: 'My Usual ▾', a: true }, { l: 'cozy', a: false }, { l: 'wifi', a: false }].map(f => (
            <div key={f.l} style={{ background: f.a ? 'rgba(217,142,74,0.14)' : 'rgba(6,10,18,0.8)', backdropFilter: 'blur(12px)', border: `0.5px solid ${f.a ? 'rgba(217,142,74,0.45)' : 'rgba(255,255,255,0.1)'}`, borderRadius: 18, padding: '3px 7px', fontSize: 6.5, fontWeight: 600, color: f.a ? '#D98E4A' : 'rgba(255,255,255,0.55)', whiteSpace: 'nowrap' as const }}>{f.l}</div>
          ))}
        </div>
      </div>

      {/* Bottom sheet */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 20, background: '#080c12', borderTopLeftRadius: 16, borderTopRightRadius: 16, border: '0.5px solid rgba(255,255,255,0.09)', paddingBottom: 20 }}>
        <div style={{ padding: '6px 0 4px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 22, height: 2.5, borderRadius: 2, background: 'rgba(255,255,255,0.15)' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', padding: '0 12px 5px' }}>
          <div style={{ background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: 4, padding: '1.5px 5px', fontSize: 6, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>FOR YOU</div>
          <span style={{ color: '#D98E4A', fontSize: 12, fontWeight: 900, marginLeft: 'auto' }}>9.4</span>
        </div>
        <div style={{ margin: '0 10px 5px', borderRadius: 7, overflow: 'hidden', height: 52, position: 'relative' }}>
          <img src="https://images.unsplash.com/photo-1501959915551-4e8d30928317?w=400&q=80&auto=format&fit=crop" alt="Meyerbrews" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)' }} />
          <p style={{ position: 'absolute', bottom: 5, left: 8, color: 'white', fontSize: 10, fontWeight: 700, margin: 0 }}>Meyerbrews</p>
        </div>
        <div style={{ display: 'flex', gap: 4, padding: '0 10px 5px' }}>
          {['Specialty Coffee', 'Cozy Vibe', 'Good WiFi'].map(tag => (
            <div key={tag} style={{ fontSize: 5.5, color: 'rgba(255,255,255,0.45)', padding: '2px 5px', borderRadius: 14, border: '0.5px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)' }}>{tag}</div>
          ))}
        </div>
        <div style={{ margin: '0 10px', background: 'white', borderRadius: 18, padding: '7px 0', textAlign: 'center', fontSize: 8.5, fontWeight: 700, color: '#000', letterSpacing: '0.04em' }}>
          Rate This Shop
        </div>
      </div>
    </PhoneShell>
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

      {/* Main layout */}
      <div className="relative z-10 flex-1 flex items-center py-6">
        <div className="w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-12 px-8 lg:px-14">

          {/* Left: compact text block */}
          <motion.div
            className="flex-shrink-0 flex flex-col items-center lg:items-start text-center lg:text-left"
            style={{ width: 'clamp(200px, 20vw, 260px)' }}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <motion.img
              src="/logo.png"
              alt="Brewprint"
              style={{ height: 'clamp(3rem, 4.5vw, 5rem)', width: 'auto', marginBottom: 14, filter: 'drop-shadow(0 0 24px rgba(200,120,40,0.65)) drop-shadow(0 0 8px rgba(255,180,60,0.3))' }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.2 }}
            />
            <h1
              className="font-bold text-white"
              style={{ fontSize: 'clamp(2rem, 3.2vw, 3.4rem)', letterSpacing: '-0.055em', lineHeight: 0.9, marginBottom: 14 }}
            >
              Brewprint
            </h1>
            <p
              className="text-white/45 font-medium leading-snug"
              style={{ fontSize: 'clamp(0.85rem, 1.1vw, 1rem)', marginBottom: 28 }}
            >
              Find your perfect cup.<br />Discover the shop behind it.
            </p>
            <a
              href="#waitlist"
              className="inline-block font-semibold text-white rounded-full transition-all duration-200 hover:scale-105 cursor-pointer"
              style={{ fontSize: '0.88rem', padding: '13px 30px', background: 'linear-gradient(135deg, #A85A18 0%, #D98E4A 50%, #B86820 100%)', boxShadow: '0 8px 32px rgba(217,142,74,0.42), inset 0 1px 0 rgba(255,255,255,0.2)', letterSpacing: '-0.01em' }}
            >
              Join the Waitlist →
            </a>
            <p className="text-white/20 text-xs mt-3 tracking-wide">Coming fall 2026. Early access guaranteed.</p>
          </motion.div>

          {/* Right: 3 staggered phones */}
          <div className="flex-1 flex items-center justify-center gap-3 lg:gap-5" style={{ overflow: 'visible' }}>

            <motion.div
              style={{ rotate: -6 }}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: -24 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              <motion.div animate={{ y: [0, 9, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}>
                <DrinkPhone />
              </motion.div>
            </motion.div>

            <motion.div
              style={{ rotate: 1.5 }}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 28 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
            >
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}>
                <PrefsPhone />
              </motion.div>
            </motion.div>

            <motion.div
              style={{ rotate: 5 }}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: -10 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            >
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}>
                <MapPhone />
              </motion.div>
            </motion.div>

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
