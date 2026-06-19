'use client'

import { useState, useEffect } from 'react'

type AudienceType = 'lover' | 'owner'

export default function WaitlistForm() {
  const [type, setType] = useState<AudienceType>('lover')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const syncType = () => {
      const hash = window.location.hash
      if (hash.includes('owner')) setType('owner')
      else if (hash.includes('lover')) setType('lover')
    }
    syncType()
    window.addEventListener('hashchange', syncType)
    return () => window.removeEventListener('hashchange', syncType)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="relative bg-background py-24 md:py-32">
      {/* Hidden anchors for hash-based pre-fill */}
      <span id="waitlist-lover" className="absolute -top-20" aria-hidden="true" />
      <span id="waitlist-owner" className="absolute -top-20" aria-hidden="true" />

      <div id="waitlist" className="max-w-xl mx-auto px-6 text-center">
        {submitted ? (
          <div>
            <p className="text-white/25 text-[0.65rem] tracking-[0.4em] uppercase font-medium mb-6">
              you&apos;re on the list
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">we&apos;ll be in touch.</h2>
            <p className="text-white/45 text-lg leading-relaxed">
              Thanks for joining the brewprint waitlist. We&apos;ll email you when we launch.
            </p>
          </div>
        ) : (
          <>
            <p className="text-white/25 text-[0.65rem] tracking-[0.4em] uppercase font-medium mb-5">
              waitlist
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              be first to know.
            </h2>
            <p className="text-white/45 text-lg md:text-xl leading-relaxed mb-12">
              we&apos;re launching soon. join the waitlist and get early access.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Audience toggle */}
              <div className="inline-flex self-center rounded-full bg-surface p-1 border border-white/8">
                <button
                  type="button"
                  onClick={() => setType('lover')}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    type === 'lover'
                      ? 'bg-white text-black'
                      : 'text-white/40 hover:text-white'
                  }`}
                >
                  coffee lover
                </button>
                <button
                  type="button"
                  onClick={() => setType('owner')}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    type === 'owner'
                      ? 'bg-white text-black'
                      : 'text-white/40 hover:text-white'
                  }`}
                >
                  shop owner
                </button>
              </div>

              {/* Email row */}
              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 bg-surface border border-white/8 text-white placeholder-white/20 px-6 py-4 rounded-full focus:outline-none focus:border-white/25 transition-colors text-base"
                />
                <button
                  type="submit"
                  className="bg-white text-black font-semibold px-8 py-4 rounded-full hover:bg-white/90 transition-colors text-base whitespace-nowrap"
                >
                  join waitlist
                </button>
              </div>

              <p className="text-white/20 text-xs mt-1">no spam, ever. unsubscribe anytime.</p>
            </form>
          </>
        )}
      </div>
    </section>
  )
}
