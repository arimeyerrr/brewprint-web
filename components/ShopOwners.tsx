'use client'
import { motion } from 'framer-motion'
import AnimateInView from './AnimateInView'

const NOTIFICATIONS = [
  { shop: "Joe's Coffee", msg: '14 new customers matched this week', time: '2m ago', icon: '☕' },
  { shop: 'Morning Light Café', msg: 'Match score updated: 9.1 ↑', time: '5m ago', icon: '⭐' },
  { shop: "Joe's Coffee", msg: '@SarahSips left a 9.4 review', time: '12m ago', icon: '🔔' },
  { shop: 'The Press', msg: '3 drinks ordered through brewprint today', time: '18m ago', icon: '📊' },
  { shop: 'Morning Light Café', msg: 'Profile viewed 47 times today', time: '1h ago', icon: '👁' },
  { shop: "Joe's Coffee", msg: 'Trending in your neighborhood', time: '2h ago', icon: '🔥' },
]

function Toast({ n, delay }: { n: typeof NOTIFICATIONS[0]; delay: number }) {
  return (
    <motion.div
      className="flex items-start gap-3 px-4 py-3 rounded-xl border border-white/[0.06]"
      style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', maxWidth: 300 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: [0, 0.9, 0.9, 0] }}
      transition={{ duration: 4, delay, repeat: Infinity, repeatDelay: NOTIFICATIONS.length * 1.5, ease: 'easeInOut' }}
    >
      <span className="text-base flex-shrink-0 mt-0.5">{n.icon}</span>
      <div className="min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-white text-xs font-semibold truncate">{n.shop}</span>
          <span className="text-white/25 text-[10px] flex-shrink-0">{n.time}</span>
        </div>
        <p className="text-white/50 text-xs leading-snug">{n.msg}</p>
      </div>
      <div className="w-1.5 h-1.5 rounded-full bg-amber flex-shrink-0 mt-1" style={{ boxShadow: '0 0 6px rgba(217,142,74,0.8)' }} />
    </motion.div>
  )
}

export default function ShopOwners() {
  return (
    <section id="for-shops" className="relative bg-background overflow-hidden py-24 md:py-36">

      {/* Background notifications — rising */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-end gap-4 px-8 pb-24 opacity-60">
        {NOTIFICATIONS.map((n, i) => (
          <div key={i} className="flex justify-end">
            <Toast n={n} delay={i * 1.5} />
          </div>
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

          {/* Right: mock notification stack */}
          <AnimateInView delay={0.2}>
            <div className="relative">
              {/* Mock notification stack */}
              <div className="space-y-3">
                {NOTIFICATIONS.slice(0, 4).map((n, i) => (
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
                    <div className="w-2 h-2 rounded-full bg-amber flex-shrink-0 mt-1"
                      style={{ boxShadow: '0 0 8px rgba(217,142,74,0.9)' }} />
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/[0.05]">
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
