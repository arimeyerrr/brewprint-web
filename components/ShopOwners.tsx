'use client'
import { motion, AnimatePresence } from 'framer-motion'
import AnimateInView from './AnimateInView'

const NOTIFICATIONS = [
  { shop: "Joe's Coffee",       msg: '14 new customers matched this week',       time: '2m ago',  icon: '☕' },
  { shop: 'Morning Light Café', msg: 'Match score updated: 9.1 ↑',               time: '5m ago',  icon: '⭐' },
  { shop: "Joe's Coffee",       msg: '@SarahSips left a 9.4 review',             time: '12m ago', icon: '🔔' },
  { shop: 'The Press',          msg: '3 drinks discovered via brewprint today',  time: '18m ago', icon: '📊' },
  { shop: 'Morning Light Café', msg: 'Profile viewed 47 times today',            time: '1h ago',  icon: '👁' },
]

// iOS-style blast notifications — slow conveyor belt
const BLASTS = [
  { shop: "Joe's Coffee",       msg: 'Come in 1–3 PM today for BOGO espresso. New seasonal latte just dropped.',    time: 'now'    },
  { shop: 'Morning Light Café', msg: 'Happy Hour alert: all matcha drinks 50% off until 4 PM. Walk-ins welcome.',  time: '2m ago' },
  { shop: 'The Press',          msg: 'Limited batch: Ethiopia Yirgacheffe just landed. Come try a pour-over.',     time: '5m ago' },
  { shop: 'Copper Cup',         msg: 'Weekend special: 2-for-1 cold brew all day. Bring a friend.',               time: '8m ago' },
  { shop: "Joe's Coffee",       msg: 'New drink on the menu: cardamom cortado. Only available this week.',        time: '11m ago'},
  { shop: 'Morning Light Café', msg: 'Your storefront just hit 50 profile views this week. Momentum is building.',time: '15m ago'},
]

// Duplicate for seamless loop
const BLAST_LOOP = [...BLASTS, ...BLASTS]

function IOSNotification({ shop, msg, time }: { shop: string; msg: string; time: string }) {
  return (
    <div
      className="flex-shrink-0 mx-3"
      style={{
        width: 300,
        background: 'rgba(22,22,24,0.92)',
        backdropFilter: 'blur(22px) saturate(180%)',
        WebkitBackdropFilter: 'blur(22px) saturate(180%)',
        borderRadius: 14,
        border: '0.5px solid rgba(255,255,255,0.13)',
        boxShadow: '0 8px 28px rgba(0,0,0,0.55), 0 2px 6px rgba(0,0,0,0.3)',
        padding: '11px 14px 13px',
      }}
    >
      {/* iOS notification header */}
      <div className="flex items-center gap-2 mb-1.5">
        {/* App icon — tiny teardrop */}
        <div
          className="flex items-center justify-center flex-shrink-0"
          style={{
            width: 18, height: 18,
            borderRadius: 5,
            background: 'linear-gradient(145deg, #C87A35, #5A2808)',
          }}
        >
          <svg viewBox="0 0 44 60" fill="none" width={10} height={14}>
            <path d="M22 2C12.611 2 5 9.611 5 19C5 31.5 22 58 22 58C22 58 39 31.5 39 19C39 9.611 31.389 2 22 2Z" fill="rgba(255,220,160,0.7)" />
          </svg>
        </div>
        <span className="text-white/40 text-[10px] font-semibold tracking-widest uppercase">brewprint</span>
        <span className="ml-auto text-white/25 text-[10px]">{time}</span>
      </div>
      {/* Title */}
      <p className="text-white text-[13px] font-semibold leading-tight">{shop}</p>
      {/* Message */}
      <p className="text-white/55 text-[12px] leading-snug mt-0.5">{msg}</p>
    </div>
  )
}

export default function ShopOwners() {
  const trackWidth = BLASTS.length * (300 + 24) // card width + margin×2

  return (
    <section id="for-shops" className="relative bg-background overflow-hidden py-24 md:py-36">

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

          {/* Right: static notification stack */}
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
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0 mt-1"
                    style={{ background: '#D98E4A', boxShadow: '0 0 8px rgba(217,142,74,0.9)' }}
                  />
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

      {/* iOS notification blast belt — slow conveyor, dedicated strip below main content */}
      <div className="mt-20 pb-2">
        <div className="overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}>
          <motion.div
            className="flex items-center py-3"
            animate={{ x: [0, -trackWidth] }}
            transition={{ duration: 55, ease: 'linear', repeat: Infinity }}
            style={{ width: trackWidth * 2 }}
          >
            {BLAST_LOOP.map((b, i) => (
              <IOSNotification key={i} shop={b.shop} msg={b.msg} time={b.time} />
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  )
}
