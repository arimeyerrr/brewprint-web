'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import AnimateInView from './AnimateInView'

type Shop = {
  id: number
  name: string
  score: number
  x: number
  y: number
}

const shops: Shop[] = [
  { id: 0, name: 'Onyx Coffee Lab', score: 9.2, x: 22, y: 42 },
  { id: 1, name: 'Blue Bottle Coffee', score: 8.7, x: 51, y: 18 },
  { id: 2, name: 'Intelligentsia', score: 7.9, x: 74, y: 55 },
  { id: 3, name: 'Stumptown Coffee', score: 8.4, x: 13, y: 67 },
  { id: 4, name: 'Verve Coffee Roasters', score: 6.8, x: 85, y: 30 },
  { id: 5, name: 'Ritual Coffee', score: 9.0, x: 44, y: 73 },
  { id: 6, name: 'Heart Coffee', score: 8.1, x: 65, y: 40 },
  { id: 7, name: 'Sightglass Coffee', score: 7.5, x: 35, y: 28 },
]

function Pin({ score, active }: { score: number; active: boolean }) {
  const bg = active ? '#ffffff' : '#D98E4A'
  const fg = active ? '#000000' : '#ffffff'
  return (
    <div className="flex flex-col items-center cursor-pointer select-none">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-transform duration-150"
        style={{ backgroundColor: bg, color: fg, transform: active ? 'scale(1.15)' : 'scale(1)' }}
      >
        {score}
      </div>
      <div
        className="w-0 h-0 transition-all duration-150"
        style={{
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent',
          borderTop: `7px solid ${bg}`,
        }}
      />
    </div>
  )
}

export default function InteractiveMap() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section className="bg-background py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
          <AnimateInView>
            <h2
              className="font-bold text-white leading-tight"
              style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)' }}
            >
              your city,<br />rescored.
            </h2>
          </AnimateInView>
          <AnimateInView delay={0.1}>
            <p className="text-white/35 text-base md:text-lg max-w-xs leading-relaxed">
              Every pin reflects your taste — not a crowd average. A 9.2 for you might be a 6.1 for
              someone else.
            </p>
          </AnimateInView>
        </div>

        <AnimateInView delay={0.15}>
          <div
            className="relative w-full overflow-hidden rounded-2xl border border-white/5"
            style={{ height: '500px' }}
          >
            {/* Dot-grid map background */}
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: '#070707',
                backgroundImage:
                  'radial-gradient(circle, rgba(255,255,255,0.09) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />

            {/* Warm center glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 55% 70% at 48% 52%, rgba(61,31,8,0.38) 0%, transparent 70%)',
              }}
            />

            {/* Simulated road lines */}
            <svg
              className="absolute inset-0 w-full h-full opacity-[0.06]"
              preserveAspectRatio="none"
            >
              <line x1="0" y1="38%" x2="100%" y2="38%" stroke="white" strokeWidth="1" />
              <line x1="0" y1="62%" x2="100%" y2="62%" stroke="white" strokeWidth="1" />
              <line x1="30%" y1="0" x2="30%" y2="100%" stroke="white" strokeWidth="1" />
              <line x1="60%" y1="0" x2="60%" y2="100%" stroke="white" strokeWidth="1" />
              <line x1="0" y1="20%" x2="40%" y2="45%" stroke="white" strokeWidth="0.5" />
              <line x1="55%" y1="10%" x2="100%" y2="50%" stroke="white" strokeWidth="0.5" />
            </svg>

            {/* Search bar UI */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 w-60 md:w-72 bg-black/70 backdrop-blur-md border border-white/8 rounded-full px-5 py-3 flex items-center gap-3">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 text-white/30 flex-shrink-0"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" strokeLinecap="round" />
              </svg>
              <span className="text-white/25 text-sm">search near you...</span>
            </div>

            {/* Pins */}
            {shops.map((shop, i) => (
              <motion.div
                key={shop.id}
                className="absolute z-20"
                style={{
                  left: `${shop.x}%`,
                  top: `${shop.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{ y: [0, -9, 0] }}
                transition={{
                  duration: 3.4 + i * 0.45,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.28,
                }}
                onHoverStart={() => setActive(shop.id)}
                onHoverEnd={() => setActive(null)}
              >
                {active === shop.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30 whitespace-nowrap bg-white text-black text-xs font-semibold px-3 py-1.5 rounded-full pointer-events-none"
                  >
                    {shop.name}
                  </motion.div>
                )}
                <Pin score={shop.score} active={active === shop.id} />
              </motion.div>
            ))}

            {/* Bottom fade */}
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black to-transparent pointer-events-none" />
          </div>
        </AnimateInView>
      </div>
    </section>
  )
}
