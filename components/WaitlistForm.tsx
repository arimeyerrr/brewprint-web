'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type AudienceType = 'lover' | 'owner'

function AmbientBlob({
  x, y, size, color, duration, delay,
}: {
  x: string; y: string; size: number; color: string; duration: number; delay: number
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none select-none"
      style={{
        left: x, top: y,
        width: size, height: size,
        background: color,
        filter: `blur(${Math.round(size * 0.42)}px)`,
        transform: 'translate(-50%, -50%)',
      }}
      animate={{
        x: [0, 38, -22, 16, 0],
        y: [0, -32, 24, -14, 0],
        scale: [1, 1.18, 0.9, 1.1, 1],
      }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  )
}

export default function WaitlistForm() {
  const [type, setType] = useState<AudienceType>('lover')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sync = () => {
      const h = window.location.hash
      if (h.includes('owner')) setType('owner')
      else if (h.includes('lover')) setType('lover')
    }
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width - 0.5) * 2
    const y = ((e.clientY - r.top) / r.height - 0.5) * 2
    el.style.transform = `perspective(1200px) rotateX(${-y * 2.5}deg) rotateY(${x * 2.5}deg)`
  }, [])

  const onMouseLeave = useCallback(() => {
    const el = cardRef.current
    if (!el) return
    el.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
    el.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)'
    setTimeout(() => { if (el) el.style.transition = '' }, 600)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section
      className="relative overflow-hidden bg-black py-28 md:py-40"
      style={{ isolation: 'isolate' }}
    >
      {/* Hidden hash anchors */}
      <span id="waitlist-lover" className="absolute -top-20" aria-hidden="true" />
      <span id="waitlist-owner" className="absolute -top-20" aria-hidden="true" />
      <span id="waitlist" className="absolute -top-20" aria-hidden="true" />

      {/* Ambient liquid background */}
      <AmbientBlob x="15%" y="25%" size={520} color="rgba(110,48,8,0.32)" duration={20} delay={0} />
      <AmbientBlob x="80%" y="65%" size={440} color="rgba(70,28,4,0.38)" duration={17} delay={3} />
      <AmbientBlob x="55%" y="15%" size={300} color="rgba(160,80,16,0.18)" duration={22} delay={6} />
      <AmbientBlob x="28%" y="78%" size={260} color="rgba(90,36,6,0.28)" duration={19} delay={9} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-5 md:px-8">

        {/* Above-card header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="text-[10px] tracking-[0.35em] uppercase font-medium mb-5"
            style={{ color: 'rgba(217,142,74,0.55)' }}>
            waitlist
          </p>
          <h2
            className="font-bold text-white leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', letterSpacing: '-0.025em' }}
          >
            Join the Experience.
          </h2>
          <p className="mt-4 text-white/40 text-lg leading-relaxed max-w-sm mx-auto">
            We&apos;re launching soon. Be first to find your perfect cup.
          </p>
        </motion.div>

        {/* Glass card */}
        <motion.div
          className="w-full max-w-lg"
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
        >
          {/* Gradient border wrapper */}
          <div
            style={{
              background: 'linear-gradient(145deg, rgba(217,142,74,0.28) 0%, rgba(255,255,255,0.05) 45%, rgba(100,44,8,0.22) 100%)',
              borderRadius: 34,
              padding: '1px',
              boxShadow: '0 40px 120px rgba(0,0,0,0.75), 0 0 80px rgba(110,48,8,0.18)',
            }}
          >
            <div
              ref={cardRef}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
              style={{
                background: 'rgba(6, 3, 1, 0.88)',
                backdropFilter: 'blur(80px) saturate(180%)',
                WebkitBackdropFilter: 'blur(80px) saturate(180%)',
                borderRadius: 33,
                padding: 'clamp(40px, 6vw, 64px) clamp(32px, 5vw, 56px)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.4)',
              }}
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    className="text-center py-8"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  >
                    <div className="mb-8 mx-auto w-14 h-14 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(217,142,74,0.12)', border: '1px solid rgba(217,142,74,0.25)' }}>
                      <svg viewBox="0 0 20 20" fill="none" width={20}>
                        <path d="M4 10l4.5 4.5L16 6" stroke="#D98E4A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <p className="text-[10px] tracking-[0.35em] uppercase font-medium mb-5"
                      style={{ color: 'rgba(217,142,74,0.55)' }}>
                      you&apos;re on the list
                    </p>
                    <h3 className="font-bold text-white text-3xl md:text-4xl mb-4" style={{ letterSpacing: '-0.02em' }}>
                      we&apos;ll be in touch.
                    </h3>
                    <p className="text-white/40 text-base leading-relaxed">
                      Thanks for joining the Brewprint waitlist. We&apos;ll email you when we launch.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Audience toggle */}
                    <div className="flex justify-center mb-8">
                      <div
                        className="inline-flex p-1 rounded-full"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.08)',
                        }}
                      >
                        {(['lover', 'owner'] as const).map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setType(t)}
                            className="relative px-7 py-3 rounded-full text-sm font-medium transition-colors duration-200"
                            style={{ color: type === t ? '#000' : 'rgba(255,255,255,0.4)', zIndex: 1 }}
                          >
                            {type === t && (
                              <motion.div
                                layoutId="toggle-pill"
                                className="absolute inset-0 rounded-full"
                                style={{ background: 'rgba(255,255,255,0.94)' }}
                                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                              />
                            )}
                            <span className="relative z-10">
                              {t === 'lover' ? 'coffee lover' : 'shop owner'}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      <div className="relative">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onFocus={() => setFocused(true)}
                          onBlur={() => setFocused(false)}
                          placeholder="your@email.com"
                          required
                          className="w-full text-white placeholder-white/20 text-base"
                          style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: `1px solid ${focused ? 'rgba(217,142,74,0.45)' : 'rgba(255,255,255,0.09)'}`,
                            boxShadow: focused ? '0 0 0 3px rgba(217,142,74,0.08)' : 'none',
                            borderRadius: 16,
                            padding: '20px 26px',
                            letterSpacing: '-0.01em',
                            outline: 'none',
                            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                          }}
                        />
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.015 }}
                        whileTap={{ scale: 0.985 }}
                        className="w-full font-semibold text-white text-base"
                        style={{
                          background: 'linear-gradient(135deg, #A85A18 0%, #D98E4A 50%, #B86820 100%)',
                          borderRadius: 16,
                          padding: '20px 44px',
                          letterSpacing: '-0.01em',
                          boxShadow: '0 8px 36px rgba(217,142,74,0.32), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.25)',
                          border: 'none',
                          cursor: 'pointer',
                        }}
                      >
                        Join the Waitlist →
                      </motion.button>
                    </form>

                    <p className="text-center text-[11px] mt-5" style={{ color: 'rgba(255,255,255,0.18)' }}>
                      no spam, ever. unsubscribe anytime.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
