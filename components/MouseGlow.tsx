'use client'
import { useEffect, useRef } from 'react'

export default function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX - 400}px, ${e.clientY - 400}px)`
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      ref={ref}
      className="fixed pointer-events-none"
      style={{
        top: 0,
        left: 0,
        width: 800,
        height: 800,
        borderRadius: '50%',
        background: 'radial-gradient(circle at center, rgba(110,48,8,0.065) 0%, rgba(75,30,4,0.04) 45%, transparent 72%)',
        zIndex: 1,
        willChange: 'transform',
      }}
    />
  )
}
