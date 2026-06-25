'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
const WAITLIST_FN = 'https://tftaftmbadjfntmqdjle.supabase.co/functions/v1/waitlist-signup'

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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(WAITLIST_FN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, audience_type: type }),
      })
      const data = await res.json()
      if (res.ok) {
        setSubmitted(true)
      } else if (data.error === 'already_registered') {
        setError("You're already on the list!")
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      className="relative overflow-hidden bg-black py-28 md:py-36"
      style={{ isolation: 'isolate' }}
    >
      {/* Hidden hash anchors */}
      <span id="waitlist-lover" className="absolute -top-20" aria-hidden="true" />
      <span id="waitlist-owner" className="absolute -top-20" aria-hidden="true" />
      <span id="waitlist" className="absolute -top-20" aria-hidden="true" />

      {/* Ambient liquid background */}
      <AmbientBlob x="8%"  y="30%" size={560} color="rgba(110,48,8,0.28)"  duration={20} delay={0} />
      <AmbientBlob x="90%" y="60%" size={480} color="rgba(70,28,4,0.35)"   duration={17} delay={3} />
      <AmbientBlob x="50%" y="10%" size={320} color="rgba(160,80,16,0.15)" duration={22} delay={6} />
      <AmbientBlob x="25%" y="85%" size={280} color="rgba(90,36,6,0.25)"   duration={19} delay={9} />

      {/* Full-width two-column layout */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: heading */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <p
              className="text-[10px] tracking-[0.35em] uppercase font-medium mb-6"
              style={{ color: 'rgba(217,142,74,0.55)' }}
            >
              waitlist
            </p>
            <h2
              className="font-bold text-white leading-none mb-6"
              style={{ fontSize: 'clamp(2.8rem, 5.5vw, 5rem)', letterSpacing: '-0.03em' }}
            >
              Join the<br />Experience.
            </h2>
            <p className="text-white/38 text-xl leading-relaxed mb-8 max-w-sm mx-auto lg:mx-0">
              We&apos;re launching soon. Be among the first to find your perfect cup.
            </p>
            <p
              className="text-base font-medium"
              style={{ color: 'rgba(217,142,74,0.65)' }}
            >
              Early access guaranteed. →
            </p>
          </motion.div>

          {/* Right: glass card form */}
          <motion.div
            initial={{ opacity: 0, x: 28, scale: 0.97 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          >
            {/* Gradient border wrapper */}
            <div
              style={{
                background: 'linear-gradient(145deg, rgba(217,142,74,0.28) 0%, rgba(255,255,255,0.05) 45%, rgba(100,44,8,0.22) 100%)',
                borderRadius: 34,
                padding: '1px',
                boxShadow: '0 40px 120px rgba(0,0,0,0.7), 0 0 80px rgba(110,48,8,0.15)',
              }}
            >
              <div
                ref={cardRef}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                style={{
                  background: 'rgba(6, 3, 1, 0.9)',
                  backdropFilter: 'blur(80px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(80px) saturate(180%)',
                  borderRadius: 33,
                  padding: 'clamp(36px, 5vw, 56px) clamp(28px, 4vw, 48px)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.4)',
                }}
              >
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      className="text-center py-6"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    >
                      <div className="mb-7 mx-auto w-14 h-14 rounded-full flex items-center justify-center"
                        style={{ background: 'rgba(217,142,74,0.12)', border: '1px solid rgba(217,142,74,0.25)' }}>
                        <svg viewBox="0 0 20 20" fill="none" width={20}>
                          <path d="M4 10l4.5 4.5L16 6" stroke="#D98E4A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <p className="text-[10px] tracking-[0.35em] uppercase font-medium mb-5"
                        style={{ color: 'rgba(217,142,74,0.55)' }}>
                        You&apos;re on the List
                      </p>
                      <h3 className="font-bold text-white text-3xl md:text-4xl mb-4" style={{ letterSpacing: '-0.02em' }}>
                        We&apos;ll Be in Touch.
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
                              style={{ color: type === t ? '#000' : 'rgba(255,255,255,0.4)' }}
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
                                {t === 'lover' ? 'Coffee Lover' : 'Shop Owner'}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

                        <motion.button
                          type="submit"
                          disabled={loading}
                          whileHover={loading ? {} : { scale: 1.015 }}
                          whileTap={loading ? {} : { scale: 0.985 }}
                          className="w-full font-semibold text-white text-base"
                          style={{
                            background: 'linear-gradient(135deg, #A85A18 0%, #D98E4A 50%, #B86820 100%)',
                            borderRadius: 16,
                            padding: '20px 44px',
                            letterSpacing: '-0.01em',
                            boxShadow: '0 8px 36px rgba(217,142,74,0.32), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.25)',
                            border: 'none',
                            cursor: loading ? 'default' : 'pointer',
                            opacity: loading ? 0.7 : 1,
                          }}
                        >
                          {loading ? 'Joining…' : 'Join the Waitlist →'}
                        </motion.button>
                      </form>

                      {error && (
                        <p className="text-center text-[12px] mt-4" style={{ color: 'rgba(217,142,74,0.85)' }}>
                          {error}
                        </p>
                      )}

                      <p className="text-center text-[11px] mt-5" style={{ color: 'rgba(255,255,255,0.18)' }}>
                        No spam, ever. Unsubscribe anytime.{' '}
                        <a href="/privacy" className="underline hover:text-white/40 transition-colors" style={{ textUnderlineOffset: '2px' }}>Privacy</a>
                        {' · '}
                        <a href="/terms" className="underline hover:text-white/40 transition-colors" style={{ textUnderlineOffset: '2px' }}>Terms</a>
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
