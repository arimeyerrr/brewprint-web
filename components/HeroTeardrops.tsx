'use client'
import { motion } from 'framer-motion'

const drops = [
  { x: '64%', y: '10%', size: 130, opacity: 0.045, duration: 5.2, delay: 0 },
  { x: '80%', y: '32%', size: 78, opacity: 0.065, duration: 4.4, delay: 0.6 },
  { x: '72%', y: '56%', size: 190, opacity: 0.025, duration: 6.1, delay: 1.1 },
  { x: '89%', y: '20%', size: 56, opacity: 0.055, duration: 4.9, delay: 0.3 },
  { x: '57%', y: '74%', size: 100, opacity: 0.035, duration: 5.6, delay: 0.9 },
  { x: '93%', y: '62%', size: 150, opacity: 0.03, duration: 6.4, delay: 1.6 },
  { x: '76%', y: '82%', size: 68, opacity: 0.05, duration: 4.7, delay: 0.4 },
]

export default function HeroTeardrops() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {drops.map((d, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: d.x, top: d.y }}
          animate={{ y: [0, -14, 0] }}
          transition={{
            duration: d.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: d.delay,
          }}
        >
          <svg
            width={d.size}
            height={d.size * 1.3}
            viewBox="0 0 40 52"
            style={{ opacity: d.opacity }}
          >
            <path
              d="M20 3 C20 3, 37 23, 37 33 A17 17 0 0 1 3 33 C3 23, 20 3, 20 3 Z"
              fill="white"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}
