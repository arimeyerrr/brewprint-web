'use client'
import { motion } from 'framer-motion'
import AnimateInView from './AnimateInView'

const NOTIFICATIONS = [
  { shop: "Joe's Coffee",       msg: '14 new customers matched this week',  time: '2m ago',  icon: '☕' },
  { shop: 'Morning Light Café', msg: 'Match score updated: 9.1 ↑',          time: '5m ago',  icon: '⭐' },
  { shop: "Joe's Coffee",       msg: '@SarahSips left a 9.4 review',        time: '12m ago', icon: '🔔' },
  { shop: 'The Press',          msg: '3 drinks ordered via brewprint today', time: '18m ago', icon: '📊' },
  { shop: 'Morning Light Café', msg: 'Profile viewed 47 times today',       time: '1h ago',  icon: '👁' },
]

const BLASTS = [
  { shop: "Joe's Coffee",       msg: 'NEW DRINK DROP — come in 1–3 PM for BOGO espresso.',           color: '#D98E4A', top: '15%' },
  { shop: 'Morning Light Café', msg: 'HAPPY HOUR BLAST — matcha lattes 50% off until 4 PM.',         color: '#7BBCA0', top: '38%' },
  { shop: 'The Press',          msg: 'LIMITED DROP — Ethiopia Yirgacheffe just landed.',              color: '#C4A07B', top: '60%' },
  { shop: 'Copper Cup',         msg: 'WEEKEND BLAST — 2-for-1 cold brew all day. Today only.',       color: '#B08ED4', top: '80%' },
]

export default function ShopOwners() {
  return (
    <section id="for-shops" className="relative bg-background overflow-hidden py-24 md:py-36">

      {/* BLAST notifications flying across */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {BLASTS.map((b, i) => (
          <motion.div
            key={i}
            className="absolute flex items-center gap-3 px-5 py-2.5 rounded-full"
            style={{
              top: b.top,
              whiteSpace: 'nowrap',
              background: `rgba(${hexToRgb(b.color)},0.08)`,
              border: `1px solid rgba(${hexToRgb(b.color)},0.22)`,
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
            initial={{ x: '105vw' }}
            animate={{ x: '-105vw' }}
            transition={{
              duration: 11,
              delay: i * 3.5,
              repeat: Infinity,
              repeatDelay: BLASTS.length * 3.5 - 2,
              ease: 'linear',
            }}
          >
            <span className="text-[10px] font-black tracking-[0.18em] uppercase"
              style={{ color: b.color }}>
              BLAST
            </span>
            <span className="w-px h-3 opacity-30" style={{ background: b.color }} />
            <span className="font-bold text-xs" style={{ color: b.color }}>{b.shop}</span>
            <span className="text-white/55 text-xs">{b.msg}</span>
            <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3 flex-shrink-0" style={{ color: b.color }}>
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Left: text */}
          <div>
            <AnimateInView>
              <p className="text-white/25 text-[0.65rem] tracking-[0.2em] uppercase font-medium mb-5">
                For Shop Owners
              </p>
            </AnimateInView>
            <AnimateInView delay={0.1}>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Your Shop, Perfectly Positioned.
              </h2>
            </AnimateInView>
            <AnimateInView delay={0.2}>
              <p className="text-white/50 text-lg md:text-xl leading-relaxed mb-8">
                Manage your presence, tag your roast profiles and brewing methods, and reach the customers who are already looking for exactly what you offer.
              </p>
            </AnimateInView>
            <AnimateInView delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#waitlist-owner"
                  className="inline-block bg-white text-black font-semibold px-8 py-4 rounded-full text-sm tracking-wide hover:bg-white/90 transition-all duration-200"
                >
                  Claim Your Storefront →
                </a>
                <a
                  href="#waitlist-owner"
                  className="inline-block border border-white/15 text-white/60 font-medium px-8 py-4 rounded-full text-sm tracking-wide hover:bg-white hover:text-black transition-all duration-200"
                >
                  Learn more
                </a>
              </div>
            </AnimateInView>
          </div>

          {/* Right: notification stack */}
          <AnimateInView delay={0.2}>
            <div className="space-y-3">
              {NOTIFICATIONS.map((n, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3 px-4 py-3.5 rounded-xl border border-white/[0.07]"
                  style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.12, duration: 0.5 }}
                >
                  <span className="text-lg flex-shrink-0">{n.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className="text-white text-sm font-semibold">{n.shop}</span>
                      <span className="text-white/25 text-[11px] flex-shrink-0">{n.time}</span>
                    </div>
                    <p className="text-white/50 text-sm leading-snug">{n.msg}</p>
                  </div>
                  <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1"
                    style={{ background: '#D98E4A', boxShadow: '0 0 8px rgba(217,142,74,0.9)' }} />
                </motion.div>
              ))}

              <div className="mt-6 pt-5 border-t border-white/[0.05]">
                <p className="text-white/20 text-sm italic">
                  No pricing yet. Early shop owners get priority listing and help shape the product.
                </p>
              </div>
            </div>
          </AnimateInView>

        </div>
      </div>
    </section>
  )
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r},${g},${b}`
}
