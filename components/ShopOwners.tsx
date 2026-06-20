'use client'
import { motion } from 'framer-motion'
import AnimateInView from './AnimateInView'

const STACK_NOTIFICATIONS = [
  { shop: "Joe's Coffee",       msg: '14 new customers matched this week',       time: '2m ago',  icon: '☕' },
  { shop: 'Morning Light Café', msg: 'Match score updated: 9.1 ↑',               time: '5m ago',  icon: '⭐' },
  { shop: "Joe's Coffee",       msg: '@SarahSips left a 9.4 review',             time: '12m ago', icon: '🔔' },
  { shop: 'The Press',          msg: '3 drinks discovered via brewprint today',   time: '18m ago', icon: '📊' },
  { shop: 'Morning Light Café', msg: 'Profile viewed 47 times today',            time: '1h ago',  icon: '👁' },
]

// Floating notifications — positions + drift anchors
const FLOATERS = [
  { shop: "Joe's Coffee",       msg: 'BOGO espresso today, 1–3 PM only.',                     time: 'now',    top: '6%',  left: '2%',   drift: [14, -18, 8, -12, 0],  cycle: 14 },
  { shop: 'Morning Light Café', msg: 'Matcha lattes 50% off until 4 PM.',                     time: '2m ago', top: '10%', left: '55%',  drift: [-12, -22, -6, -16, 0], cycle: 17 },
  { shop: 'The Press',          msg: 'Ethiopia Yirgacheffe just landed.',                      time: '6m ago', top: '40%', left: '68%',  drift: [10, -14, 18, -8, 0],  cycle: 13 },
  { shop: 'Copper Cup',         msg: '2-for-1 cold brew — all day today.',                    time: '9m ago', top: '62%', left: '0%',   drift: [16, -10, 12, -18, 0], cycle: 16 },
  { shop: "Joe's Coffee",       msg: 'New cardamom cortado on the menu.',                     time: '14m ago',top: '72%', left: '62%',  drift: [-8, -20, -14, -6, 0], cycle: 15 },
  { shop: 'Morning Light Café', msg: '50 profile views this week. Keep momentum.', time: '22m ago',top: '30%', left: '-2%', drift: [12, -16, 6, -20, 0], cycle: 18 },
]

function IOSNotification({ shop, msg, time }: { shop: string; msg: string; time: string }) {
  return (
    <div
      style={{
        width: 284,
        background: 'rgba(22,22,24,0.90)',
        backdropFilter: 'blur(22px) saturate(180%)',
        WebkitBackdropFilter: 'blur(22px) saturate(180%)',
        borderRadius: 14,
        border: '0.5px solid rgba(255,255,255,0.13)',
        boxShadow: '0 8px 28px rgba(0,0,0,0.55), 0 2px 6px rgba(0,0,0,0.3)',
        padding: '11px 14px 13px',
      }}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <div className="flex items-center justify-center flex-shrink-0"
          style={{ width: 18, height: 18, borderRadius: 5, background: 'linear-gradient(145deg, #C87A35, #5A2808)' }}>
          <svg viewBox="0 0 44 60" fill="none" width={10} height={14}>
            <path d="M22 2C12.611 2 5 9.611 5 19C5 31.5 22 58 22 58C22 58 39 31.5 39 19C39 9.611 31.389 2 22 2Z" fill="rgba(255,220,160,0.7)" />
          </svg>
        </div>
        <span className="text-white/40 text-[10px] font-semibold tracking-widest uppercase">brewprint</span>
        <span className="ml-auto text-white/25 text-[10px]">{time}</span>
      </div>
      <p className="text-white text-[13px] font-semibold leading-tight">{shop}</p>
      <p className="text-white/55 text-[12px] leading-snug mt-0.5">{msg}</p>
    </div>
  )
}

export default function ShopOwners() {
  return (
    <section id="for-shops" className="relative bg-background overflow-hidden py-24 md:py-36">

      {/* Floating iOS notifications in background */}
      <div className="absolute inset-0 pointer-events-none">
        {FLOATERS.map((f, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ top: f.top, left: f.left }}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: [0, 0.72, 0.72, 0.72, 0.72, 0.72, 0],
              y: f.drift,
              x: [0, 6, -4, 8, -2, 4, 0],
              rotate: [0, 0.8, -0.5, 1, -0.8, 0.4, 0],
            }}
            transition={{
              duration: f.cycle,
              delay: i * 2.2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: 'easeInOut',
            }}
          >
            <IOSNotification shop={f.shop} msg={f.msg} time={f.time} />
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Left: text */}
          <div>
            <AnimateInView>
              <p className="text-white/25 text-[0.65rem] tracking-[0.15em] uppercase font-medium mb-5">
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
                <a href="#waitlist-owner"
                  className="inline-block bg-white text-black font-semibold px-8 py-4 rounded-full text-sm tracking-wide hover:bg-white/90 transition-all duration-200">
                  Claim Your Storefront →
                </a>
                <a href="#waitlist-owner"
                  className="inline-block border border-white/15 text-white/60 font-medium px-8 py-4 rounded-full text-sm tracking-wide hover:bg-white hover:text-black transition-all duration-200">
                  Learn more
                </a>
              </div>
            </AnimateInView>
          </div>

          {/* Right: static notification stack */}
          <AnimateInView delay={0.2}>
            <div className="space-y-3">
              {STACK_NOTIFICATIONS.map((n, i) => (
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
