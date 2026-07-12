'use client'
import { motion } from 'framer-motion'
import AnimateInView from './AnimateInView'

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
        background: 'rgba(8,12,22,0.92)',
        border: '1px solid rgba(217,142,74,0.22)',
        borderRadius: 16,
        padding: '16px 18px 14px',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
        minWidth: 220,
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <p style={{ color: 'rgba(217,142,74,0.65)', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, margin: 0 }}>Weekly Views</p>
        <span style={{ color: '#D98E4A', fontSize: 10, fontWeight: 600 }}>↑ 31%</span>
      </div>

      <div style={{ display: 'flex', gap: 7, alignItems: 'flex-end', height: 72 }}>
        {BARS.map((b, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <motion.div
              style={{
                width: '100%',
                background: (b as typeof b & { hi?: boolean }).hi ? '#D98E4A' : 'rgba(217,142,74,0.22)',
                borderRadius: '3px 3px 0 0',
                boxShadow: (b as typeof b & { hi?: boolean }).hi ? '0 0 10px rgba(217,142,74,0.55)' : 'none',
              }}
              initial={{ height: 0 }}
              whileInView={{ height: `${b.v * 64}px` }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.8 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            />
            <span style={{ color: 'rgba(255,255,255,0.22)', fontSize: 7.5 }}>{b.day}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 10, paddingTop: 10, borderTop: '0.5px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ color: 'rgba(255,255,255,0.38)', fontSize: 10 }}>47 views this week</span>
        <span style={{ color: 'rgba(217,142,74,0.55)', fontSize: 10, fontWeight: 600 }}>Peak: Fri–Sat</span>
      </div>
    </motion.div>
  )
}

/* ── Notification badge ── */
function NotifBadge({ msg, time, delay = 0 }: { msg: string; time: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: 'rgba(10,14,24,0.92)',
        border: '0.5px solid rgba(255,255,255,0.1)',
        borderRadius: 12,
        padding: '9px 12px',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#D98E4A', boxShadow: '0 0 8px rgba(217,142,74,0.8)', flexShrink: 0 }} />
      <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 11, margin: 0, flex: 1 }}>{msg}</p>
      <span style={{ color: 'rgba(255,255,255,0.22)', fontSize: 10, flexShrink: 0 }}>{time}</span>
    </motion.div>
  )
}

/* ── Blueprint storefront SVG ── */
function Storefront() {
  const strokeColor = 'rgba(217,142,74,0.65)'
  const dimStroke = 'rgba(217,142,74,0.22)'
  const sw = 1.8

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      style={{ position: 'relative', width: '100%' }}
    >
      <svg viewBox="0 0 480 340" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>

        {/* ── Ground / sidewalk ── */}
        <motion.line x1="0" y1="320" x2="480" y2="320" stroke={dimStroke} strokeWidth="1"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.8 }} />
        <motion.line x1="0" y1="328" x2="480" y2="328" stroke={dimStroke} strokeWidth="0.5" strokeDasharray="4 8"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.9 }} />

        {/* ── Main building shell ── */}
        <motion.rect x="28" y="80" width="424" height="240" fill="none" stroke={strokeColor} strokeWidth={sw}
          strokeDasharray="1400 1400"
          initial={{ strokeDashoffset: 1400 }} whileInView={{ strokeDashoffset: 0 }} viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.4, 0, 0.2, 1] }} />

        {/* ── Awning ── */}
        <motion.path d="M 14,80 L 466,80 L 446,46 L 34,46 Z" fill="none" stroke={strokeColor} strokeWidth={sw}
          strokeDasharray="1000 1000"
          initial={{ strokeDashoffset: 1000 }} whileInView={{ strokeDashoffset: 0 }} viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.8, ease: [0.4, 0, 0.2, 1] }} />

        {/* Awning stripes */}
        {[64, 100, 136, 172, 210, 248, 286, 322, 358, 394].map((x, i) => (
          <motion.line key={i} x1={x} y1="46" x2={x - 6} y2="80" stroke={dimStroke} strokeWidth="1"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 1.5 + i * 0.04 }} />
        ))}

        {/* ── Sign above awning ── */}
        <motion.rect x="166" y="12" width="148" height="36" rx="5" fill="none" stroke={strokeColor} strokeWidth={sw}
          strokeDasharray="400 400"
          initial={{ strokeDashoffset: 400 }} whileInView={{ strokeDashoffset: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.6 }} />
        <motion.text x="240" y="34" textAnchor="middle" fill={strokeColor}
          style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', fontFamily: 'inherit' }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 2.1 }}>
          BREWPRINT
        </motion.text>

        {/* Sign poles */}
        <motion.line x1="200" y1="46" x2="200" y2="48" stroke={strokeColor} strokeWidth="1.5"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.7 }} />
        <motion.line x1="280" y1="46" x2="280" y2="48" stroke={strokeColor} strokeWidth="1.5"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.7 }} />

        {/* ── Vertical column dividers ── */}
        {[170, 310].map((x, i) => (
          <motion.line key={i} x1={x} y1="80" x2={x} y2="320" stroke={dimStroke} strokeWidth="1"
            initial={{ scaleY: 0, originY: '0%' }} whileInView={{ scaleY: 1 }} viewport={{ once: true }}
            transition={{ delay: 1.1, duration: 0.5 }} />
        ))}

        {/* ── Left window (arched) ── */}
        <motion.path d="M 48,120 L 48,220 L 152,220 L 152,120 Q 152,96 100,96 Q 48,96 48,120 Z"
          fill="none" stroke={strokeColor} strokeWidth={sw}
          strokeDasharray="600 600"
          initial={{ strokeDashoffset: 600 }} whileInView={{ strokeDashoffset: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.2 }} />
        <motion.line x1="100" y1="96" x2="100" y2="220" stroke={dimStroke} strokeWidth="1"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.9 }} />
        <motion.line x1="48" y1="162" x2="152" y2="162" stroke={dimStroke} strokeWidth="1"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.0 }} />
        {/* Window glow */}
        <motion.rect x="52" y="100" width="96" height="116" rx="3"
          fill="rgba(217,142,74,0.04)"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.2 }} />

        {/* ── Right window (arched) ── */}
        <motion.path d="M 328,120 L 328,220 L 432,220 L 432,120 Q 432,96 380,96 Q 328,96 328,120 Z"
          fill="none" stroke={strokeColor} strokeWidth={sw}
          strokeDasharray="600 600"
          initial={{ strokeDashoffset: 600 }} whileInView={{ strokeDashoffset: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.3 }} />
        <motion.line x1="380" y1="96" x2="380" y2="220" stroke={dimStroke} strokeWidth="1"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.9 }} />
        <motion.line x1="328" y1="162" x2="432" y2="162" stroke={dimStroke} strokeWidth="1"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.0 }} />
        <motion.rect x="332" y="100" width="96" height="116" rx="3"
          fill="rgba(217,142,74,0.04)"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.2 }} />

        {/* ── Center door (arched) ── */}
        <motion.path d="M 186,200 L 186,320 L 294,320 L 294,200 Q 294,170 240,170 Q 186,170 186,200 Z"
          fill="none" stroke={strokeColor} strokeWidth={sw}
          strokeDasharray="600 600"
          initial={{ strokeDashoffset: 600 }} whileInView={{ strokeDashoffset: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.4 }} />
        {/* Door center line */}
        <motion.line x1="240" y1="170" x2="240" y2="320" stroke={dimStroke} strokeWidth="1"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.1 }} />
        {/* Door handles */}
        <motion.circle cx={228} cy={262} r={3} fill="none" stroke={strokeColor} strokeWidth="1.5"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.3 }} />
        <motion.circle cx={252} cy={262} r={3} fill="none" stroke={strokeColor} strokeWidth="1.5"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.3 }} />
        <motion.rect x="190" y="174" width="100" height="142" rx="3"
          fill="rgba(217,142,74,0.03)"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.2 }} />

        {/* ── Hanging lanterns ── */}
        {[90, 390].map((x, i) => (
          <g key={i}>
            <motion.line x1={x} y1="46" x2={x} y2="72" stroke={dimStroke} strokeWidth="1"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.0 + i * 0.1 }} />
            <motion.circle cx={x} cy={80} r={8} fill="none" stroke={strokeColor} strokeWidth="1.5"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.1 + i * 0.1 }} />
            <motion.circle cx={x} cy={80} r={3} fill="rgba(217,142,74,0.4)"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }} />
          </g>
        ))}

        {/* Corner accent marks (blueprint style) */}
        {[[28, 80], [452, 80], [28, 320], [452, 320]].map(([x, y], i) => (
          <g key={i}>
            <motion.line x1={x - 10} y1={y} x2={x + 10} y2={y} stroke="rgba(217,142,74,0.4)" strokeWidth="1"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.4 }} />
            <motion.line x1={x} y1={y - 10} x2={x} y2={y + 10} stroke="rgba(217,142,74,0.4)" strokeWidth="1"
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 2.4 }} />
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
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(217,142,74,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(217,142,74,0.025) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* LEFT: text + analytics */}
          <div>
            <AnimateInView>
              <p className="text-white/25 text-[0.65rem] tracking-[0.2em] uppercase font-semibold mb-4"
                style={{ color: 'rgba(217,142,74,0.55)' }}>
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

            {/* Feature bullets */}
            <AnimateInView delay={0.25}>
              <div className="space-y-3 mb-10">
                {[
                  { icon: '📊', label: 'Live analytics', desc: "See who's viewing, matching, and discovering your shop." },
                  { icon: '🎯', label: 'Smart matching', desc: 'Reach customers filtered by taste profile, not just location.' },
                  { icon: '🏪', label: 'Full storefront', desc: 'Tag your roasts, brews, and vibe. Your shop, in full detail.' },
                ].map((f, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  >
                    <span className="text-base mt-0.5 flex-shrink-0">{f.icon}</span>
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

            {/* Notifications */}
            <AnimateInView delay={0.45}>
              <div className="mt-4 space-y-2">
                <NotifBadge msg="14 new customers matched this week" time="2m ago" delay={0.5} />
                <NotifBadge msg="Match score updated: 9.1 ↑" time="18m ago" delay={0.6} />
              </div>
            </AnimateInView>

            {/* CTA */}
            <AnimateInView delay={0.5}>
              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <a href="#waitlist-owner"
                  className="inline-block bg-white text-black font-semibold px-8 py-4 rounded-full text-sm tracking-wide hover:bg-white/90 transition-all duration-200">
                  Claim Your Storefront →
                </a>
                <a href="#waitlist-owner"
                  className="inline-block border border-white/15 text-white/55 font-medium px-8 py-4 rounded-full text-sm tracking-wide hover:bg-white hover:text-black transition-all duration-200">
                  Learn more
                </a>
              </div>
            </AnimateInView>

            <AnimateInView delay={0.55}>
              <p className="text-white/18 text-sm italic mt-6">
                No pricing yet — early shop owners get priority listing.
              </p>
            </AnimateInView>
          </div>

          {/* RIGHT: blueprint storefront */}
          <div className="relative">
            <Storefront />

            {/* Floating match score badge */}
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

            {/* Floating "3 shops near you" style badge */}
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
