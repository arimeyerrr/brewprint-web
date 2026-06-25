'use client'
import { useEffect, useState } from 'react'
import { motion, animate, useMotionValue, useTransform } from 'framer-motion'

export default function LogoPour({
  style,
  className,
}: {
  style?: React.CSSProperties
  className?: string
}) {
  const pct     = useMotionValue(0)   // 0 = empty, 100 = full
  const waveAmp = useMotionValue(0)   // surface glow intensity
  const [done, setDone] = useState(false)

  useEffect(() => {
    // Surface glow rises and fades as liquid pours and settles
    animate(waveAmp, [0, 1, 0.7, 0.3, 0], {
      duration: 4.6,
      delay: 0.8,
      ease: 'easeOut',
    })

    const pour = animate(pct, 100, {
      duration: 2.6,
      ease: [0.06, 0.9, 0.16, 1.0],
      delay: 0.8,
      onComplete: () => {
        // Slosh and settle
        animate(pct, [100, 96.5, 100, 98, 100], {
          duration: 1.6,
          ease: 'easeOut',
          onComplete: () => setDone(true),
        })
      },
    })

    return () => pour.stop()
  }, [pct, waveAmp])

  // Clip from bottom upward: inset(top% 0 0 0) where top starts at 100, goes to 0
  const clipPath    = useTransform(pct, v => `inset(${(100 - v).toFixed(2)}% 0 0 0)`)
  // Wave surface tracks the fill boundary
  const waveTop     = useTransform(pct, v => `${(100 - v).toFixed(2)}%`)
  const waveOpacity = useTransform(waveAmp, v => v)

  return (
    <div className={className} style={{ position: 'relative', ...style }}>
      {/* Ghost — faint silhouette that fades out after pour completes */}
      <motion.img
        src="/logo.png"
        alt="Brewprint"
        style={{ display: 'block', width: '100%', height: 'auto' }}
        animate={{ opacity: done ? 0 : 0.09 }}
        transition={{ duration: 0.9 }}
      />

      {/* Full-opacity logo revealed bottom→top by animated clip */}
      <motion.img
        src="/logo.png"
        aria-hidden
        alt=""
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          clipPath,
        }}
      />

      {/* Liquid surface glow — amber radial blur tracking the fill boundary */}
      {!done && (
        <motion.div
          aria-hidden
          style={{
            position: 'absolute',
            left: '-12%',
            right: '-12%',
            top: waveTop,
            height: 36,
            marginTop: -18,
            background:
              'radial-gradient(ellipse 80% 100% at 50% 50%, rgba(215,128,45,0.65), rgba(180,90,20,0.2) 60%, transparent)',
            filter: 'blur(10px)',
            pointerEvents: 'none',
            opacity: waveOpacity,
          }}
          animate={{ scaleX: [1, 1.08, 0.94, 1.05, 0.98, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </div>
  )
}
