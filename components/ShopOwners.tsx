'use client'
import { motion } from 'framer-motion'
import AnimateInView from './AnimateInView'

/* ── Floating iOS-style notifications — positioned in top/bottom padding only ── */
const FLOATERS = [
  { title: 'New match!', msg: "Joe's Coffee scores 9.4 for you.", time: 'now', top: '3%', left: '3%', drift: [0, -10, 5, -7, 0], cycle: 14 },
  { title: '14 new customers', msg: 'discovered your shop this week.', time: '3m ago', top: '3%', left: '55%', drift: [-6, -15, -3, -10, 0], cycle: 17 },
  { title: 'Profile trending', msg: '47 views today — up 31% this week.', time: '16m ago', top: '87%', left: '4%', drift: [8, -6, 6, -11, 0], cycle: 16 },
  { title: 'Match score updated', msg: 'Your avg customer match is now 9.1 ↑', time: '31m ago', top: '87%', left: '54%', drift: [6, -10, 3, -13, 0], cycle: 18 },
]

function IOSNotif({ title, msg, time }: { title: string; msg: string; time: string }) {
  return (
    <div style={{
      width: 248,
      background: 'rgba(28,28,30,0.92)',
      backdropFilter: 'blur(28px) saturate(180%)',
      WebkitBackdropFilter: 'blur(28px) saturate(180%)',
      borderRadius: 14,
      border: '0.5px solid rgba(255,255,255,0.10)',
      boxShadow: '0 8px 28px rgba(0,0,0,0.75), 0 2px 6px rgba(0,0,0,0.4)',
      padding: '10px 12px 11px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 7,
          background: '#000',
          border: '0.5px solid rgba(217,142,74,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 2px 6px rgba(0,0,0,0.6)',
        }}>
          <img src="/logo.png" alt="" style={{ width: 18, height: 18, objectFit: 'contain' }} />
        </div>
        <span style={{ color: 'rgba(255,255,255,0.38)', fontSize: 10.5, fontWeight: 600, letterSpacing: '0.01em' }}>Brewprint</span>
        <span style={{ color: 'rgba(255,255,255,0.22)', fontSize: 10.5, marginLeft: 'auto' }}>{time}</span>
      </div>
      <p style={{ color: 'rgba(255,255,255,0.94)', fontSize: 12.5, fontWeight: 600, margin: '0 0 2px', lineHeight: 1.35 }}>{title}</p>
      <p style={{ color: 'rgba(255,255,255,0.44)', fontSize: 11.5, margin: 0, lineHeight: 1.4 }}>{msg}</p>
    </div>
  )
}

/* ── Analytics bar chart ── */
const BARS = [
  { day: 'M', v: 0.42 }, { day: 'T', v: 0.58 }, { day: 'W', v: 0.50 },
  { day: 'T', v: 0.74 }, { day: 'F', v: 0.92, hi: true },
  { day: 'S', v: 0.85, hi: true }, { day: 'S', v: 0.66 },
]

function AnalyticsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.6, duration: 0.7 }}
      style={{
        background: '#000',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 14,
        padding: '18px 20px 16px',
        boxShadow: '0 32px 64px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.04)',
        minWidth: 220,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 18 }}>
        <div>
          <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600, margin: '0 0 5px' }}>Profile Views</p>
          <p style={{ color: '#fff', fontSize: 28, fontWeight: 800, lineHeight: 1, margin: 0, letterSpacing: '-0.03em' }}>47</p>
        </div>
        <div style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.18)', borderRadius: 6, padding: '4px 9px', marginBottom: 3 }}>
          <span style={{ color: 'rgba(74,222,128,0.85)', fontSize: 10.5, fontWeight: 700 }}>↑ 31%</span>
        </div>
      </div>

      {/* Chart */}
      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 72 }}>
          {BARS.map((b, i) => (
            <div key={i} style={{ flex: 1 }}>
              <motion.div
                style={{
                  width: '100%',
                  background: (b as typeof b & { hi?: boolean }).hi
                    ? 'linear-gradient(to top, rgba(217,142,74,0.35) 0%, #D98E4A 100%)'
                    : 'rgba(255,255,255,0.07)',
                  borderRadius: '2px 2px 0 0',
                  boxShadow: (b as typeof b & { hi?: boolean }).hi ? '0 -3px 16px rgba(217,142,74,0.3)' : 'none',
                }}
                initial={{ height: 0 }}
                whileInView={{ height: `${b.v * 68}px` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.9 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          ))}
        </div>
        {/* Baseline */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 6 }} />
        {/* Day labels */}
        <div style={{ display: 'flex', gap: 4 }}>
          {BARS.map((b, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center' }}>
              <span style={{ color: (b as typeof b & { hi?: boolean }).hi ? 'rgba(217,142,74,0.65)' : 'rgba(255,255,255,0.18)', fontSize: 8, fontWeight: (b as typeof b & { hi?: boolean }).hi ? 700 : 400 }}>{b.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: 'rgba(255,255,255,0.22)', fontSize: 9.5 }}>This week</span>
        <span style={{ color: 'rgba(217,142,74,0.5)', fontSize: 9.5, fontWeight: 600 }}>Peak: Fri – Sat</span>
      </div>
    </motion.div>
  )
}

/* ── Blueprint storefront SVG ── */
function Storefront() {
  const strokeColor = 'rgba(217,142,74,0.65)'
  const dimStroke = 'rgba(217,142,74,0.22)'
  const sw = 1.8
  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} style={{ position: 'relative', width: '100%' }}>
      <svg viewBox="0 0 480 340" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
        <motion.line x1="0" y1="320" x2="480" y2="320" stroke={dimStroke} strokeWidth="1" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 1.8 }} />
        <motion.line x1="0" y1="328" x2="480" y2="328" stroke={dimStroke} strokeWidth="0.5" strokeDasharray="4 8" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 1.9 }} />
        <motion.rect x="28" y="80" width="424" height="240" fill="none" stroke={strokeColor} strokeWidth={sw} strokeDasharray="1400 1400" initial={{ strokeDashoffset: 1400 }} whileInView={{ strokeDashoffset: 0 }} viewport={{ once: true }} transition={{ duration: 1.4, delay: 0.3, ease: [0.4, 0, 0.2, 1] }} />
        <motion.path d="M 14,80 L 466,80 L 446,46 L 34,46 Z" fill="none" stroke={strokeColor} strokeWidth={sw} strokeDasharray="1000 1000" initial={{ strokeDashoffset: 1000 }} whileInView={{ strokeDashoffset: 0 }} viewport={{ once: true }} transition={{ duration: 1.0, delay: 0.8, ease: [0.4, 0, 0.2, 1] }} />
        {[64, 100, 136, 172, 210, 248, 286, 322, 358, 394].map((x, i) => (
          <motion.line key={i} x1={x} y1="46" x2={x - 6} y2="80" stroke={dimStroke} strokeWidth="1" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.5 + i * 0.04 }} />
        ))}
        <motion.rect x="166" y="12" width="148" height="36" rx="5" fill="none" stroke={strokeColor} strokeWidth={sw} strokeDasharray="400 400" initial={{ strokeDashoffset: 400 }} whileInView={{ strokeDashoffset: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 1.6 }} />
        <motion.text x="240" y="34" textAnchor="middle" fill={strokeColor} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', fontFamily: 'inherit' }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.1 }}>BREWPRINT</motion.text>
        {[170, 310].map((x, i) => (
          <motion.line key={i} x1={x} y1="80" x2={x} y2="320" stroke={dimStroke} strokeWidth="1" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ delay: 1.1, duration: 0.5 }} />
        ))}
        <motion.path d="M 48,120 L 48,220 L 152,220 L 152,120 Q 152,96 100,96 Q 48,96 48,120 Z" fill="none" stroke={strokeColor} strokeWidth={sw} strokeDasharray="600 600" initial={{ strokeDashoffset: 600 }} whileInView={{ strokeDashoffset: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 1.2 }} />
        <motion.line x1="100" y1="96" x2="100" y2="220" stroke={dimStroke} strokeWidth="1" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.9 }} />
        <motion.line x1="48" y1="162" x2="152" y2="162" stroke={dimStroke} strokeWidth="1" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.0 }} />
        <motion.rect x="52" y="100" width="96" height="116" rx="3" fill="rgba(217,142,74,0.04)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.2 }} />
        <motion.path d="M 328,120 L 328,220 L 432,220 L 432,120 Q 432,96 380,96 Q 328,96 328,120 Z" fill="none" stroke={strokeColor} strokeWidth={sw} strokeDasharray="600 600" initial={{ strokeDashoffset: 600 }} whileInView={{ strokeDashoffset: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 1.3 }} />
        <motion.line x1="380" y1="96" x2="380" y2="220" stroke={dimStroke} strokeWidth="1" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.9 }} />
        <motion.line x1="328" y1="162" x2="432" y2="162" stroke={dimStroke} strokeWidth="1" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.0 }} />
        <motion.rect x="332" y="100" width="96" height="116" rx="3" fill="rgba(217,142,74,0.04)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.2 }} />
        <motion.path d="M 186,200 L 186,320 L 294,320 L 294,200 Q 294,170 240,170 Q 186,170 186,200 Z" fill="none" stroke={strokeColor} strokeWidth={sw} strokeDasharray="600 600" initial={{ strokeDashoffset: 600 }} whileInView={{ strokeDashoffset: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 1.4 }} />
        <motion.line x1="240" y1="170" x2="240" y2="320" stroke={dimStroke} strokeWidth="1" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.1 }} />
        <motion.circle cx={228} cy={262} r={3} fill="none" stroke={strokeColor} strokeWidth="1.5" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.3 }} />
        <motion.circle cx={252} cy={262} r={3} fill="none" stroke={strokeColor} strokeWidth="1.5" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.3 }} />
        <motion.rect x="190" y="174" width="100" height="142" rx="3" fill="rgba(217,142,74,0.03)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.2 }} />
        {[90, 390].map((x, i) => (
          <g key={i}>
            <motion.line x1={x} y1="46" x2={x} y2="72" stroke={dimStroke} strokeWidth="1" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.0 + i * 0.1 }} />
            <motion.circle cx={x} cy={80} r={8} fill="none" stroke={strokeColor} strokeWidth="1.5" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.1 + i * 0.1 }} />
            <motion.circle cx={x} cy={80} r={3} fill="rgba(217,142,74,0.4)" animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }} />
          </g>
        ))}
        {([[28, 80], [452, 80], [28, 320], [452, 320]] as [number, number][]).map(([x, y], i) => (
          <g key={i}>
            <motion.line x1={x - 10} y1={y} x2={x + 10} y2={y} stroke="rgba(217,142,74,0.4)" strokeWidth="1" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.4 }} />
            <motion.line x1={x} y1={y - 10} x2={x} y2={y + 10} stroke="rgba(217,142,74,0.4)" strokeWidth="1" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.4 }} />
          </g>
        ))}
      </svg>
    </motion.div>
  )
}

/* ── Main section ── */
export default function ShopOwners() {
  return (
    <section id="for-shops" className="relative bg-background overflow-hidden py-24 md:py-36">

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(217,142,74,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(217,142,74,0.025) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

      {/* Floating iOS notifications — desktop only */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        {FLOATERS.map((f, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ top: f.top, left: f.left }}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: [0, 0.78, 0.78, 0.78, 0.78, 0.78, 0],
              y: f.drift,
              x: [0, 5, -3, 7, -2, 4, 0],
              rotate: [0, 0.5, -0.3, 0.7, -0.5, 0.2, 0],
            }}
            transition={{
              duration: f.cycle,
              delay: i * 2.4,
              repeat: Infinity,
              repeatDelay: 3.5,
              ease: 'easeInOut',
            }}
          >
            <IOSNotif title={f.title} msg={f.msg} time={f.time} />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* LEFT: text + analytics */}
          <div>
            <AnimateInView>
              <p style={{ color: 'rgba(217,142,74,0.55)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 16 }}>
                For Coffee Shop Owners
              </p>
            </AnimateInView>

            <AnimateInView delay={0.1}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" style={{ letterSpacing: '-0.04em' }}>
                Get Discovered<br />By the Right<br />Customers.
              </h2>
            </AnimateInView>

            <AnimateInView delay={0.2}>
              <p className="text-white/50 text-lg leading-relaxed mb-8" style={{ maxWidth: 420 }}>
                Brewprint matches your shop to coffee lovers who actually care about what makes you unique — your roast profile, your vibe, your craft.
              </p>
            </AnimateInView>

            {/* Feature bullets — no emojis */}
            <AnimateInView delay={0.25}>
              <div className="space-y-3 mb-10">
                {[
                  { label: 'Live analytics', desc: "See who's viewing, matching, and discovering your shop." },
                  { label: 'Smart matching', desc: 'Reach customers filtered by taste profile, not just location.' },
                  { label: 'Full storefront', desc: 'Tag your roasts, brews, and vibe. Your shop, in full detail.' },
                ].map((f, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  >
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(217,142,74,0.65)', marginTop: 8, flexShrink: 0 }} />
                    <div>
                      <span className="text-white/80 text-sm font-semibold">{f.label}</span>
                      <span className="text-white/40 text-sm"> — {f.desc}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimateInView>

            {/* Analytics card */}
            <AnimateInView delay={0.35}>
              <AnalyticsCard />
            </AnimateInView>

            {/* CTA */}
            <AnimateInView delay={0.45}>
              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <a href="#waitlist-owner" className="inline-block bg-white text-black font-semibold px-8 py-4 rounded-full text-sm tracking-wide hover:bg-white/90 transition-all duration-200">
                  Claim Your Storefront →
                </a>
                <a href="#waitlist-owner" className="inline-block border border-white/15 text-white/55 font-medium px-8 py-4 rounded-full text-sm tracking-wide hover:bg-white hover:text-black transition-all duration-200">
                  Learn more
                </a>
              </div>
            </AnimateInView>

            <AnimateInView delay={0.5}>
              <p className="text-white/18 text-sm italic mt-6">No pricing yet — early shop owners get priority listing.</p>
            </AnimateInView>
          </div>

          {/* RIGHT: blueprint storefront */}
          <div className="relative">
            <Storefront />

            {/* Floating match score */}
            <motion.div
              className="absolute"
              style={{ top: '8%', right: '-4%' }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 2.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              animate={{ y: [0, -5, 0] }}
            >
              <div style={{ background: 'rgba(8,12,22,0.92)', border: '1px solid rgba(217,142,74,0.35)', borderRadius: 12, padding: '10px 14px', backdropFilter: 'blur(16px)' }}>
                <p style={{ color: 'rgba(217,142,74,0.6)', fontSize: 7.5, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, margin: '0 0 3px' }}>Avg Match</p>
                <p style={{ color: '#D98E4A', fontSize: 24, fontWeight: 900, lineHeight: 1, margin: 0 }}>9.1</p>
              </div>
            </motion.div>

            {/* Floating views badge */}
            <motion.div
              className="absolute"
              style={{ bottom: '22%', left: '-4%' }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 2.7, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              animate={{ y: [0, 5, 0] }}
            >
              <div style={{ background: 'rgba(8,12,22,0.92)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '9px 14px', backdropFilter: 'blur(16px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#D98E4A', boxShadow: '0 0 8px rgba(217,142,74,0.9)' }} />
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 10, fontWeight: 600 }}>47 profile views today</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
