import React from 'react'
import AnimateInView from './AnimateInView'

const steps = [
  {
    number: '01',
    title: 'Build Your Taste Profile',
    body: "Tell us how you take your coffee — espresso strength, milk preferences, flavour notes you love, and whether you need great wifi or want a quiet corner. Takes two minutes.",
  },
  {
    number: '02',
    title: 'We Tag Every Shop',
    body: "Brewprint maps each coffee shop's brewing methods, bean origins, roast levels, ambiance, and community reviews against your profile. No guesswork.",
  },
  {
    number: '03',
    title: 'Get Your Score, Out of 10',
    body: "Every shop gets a personalized match score — just for you. A 9.4 for one person might be a 6.1 for another. Find your perfect cup, not someone else's.",
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <AnimateInView>
          <p className="text-amber text-[0.65rem] tracking-[0.45em] uppercase font-medium mb-4">
            Match Score System
          </p>
        </AnimateInView>
        <AnimateInView delay={0.1}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-20 max-w-xl leading-tight">
            Your taste. Scored.
          </h2>
        </AnimateInView>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {steps.map((step, i) => (
            <AnimateInView key={step.number} delay={0.1 + i * 0.1}>
              <div className="flex flex-col h-full">
                <span
                  className="text-amber font-bold mb-8 block leading-none"
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.02em' }}
                >
                  {step.number}
                </span>

                {/* Divider */}
                <div className="w-8 h-px bg-amber/40 mb-6" />

                <h3 className="text-white font-semibold text-xl mb-4 leading-snug">
                  {step.title}
                </h3>
                <p className="text-white/50 text-base leading-relaxed">{step.body}</p>
              </div>
            </AnimateInView>
          ))}
        </div>

        {/* Flow diagram — simple text-based */}
        <AnimateInView delay={0.45}>
          <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
            {['Taste Profile', 'Shop Tags', 'Personalized Score / 10'].map((label, i, arr) => (
              <React.Fragment key={label}>
                <div className="px-6 py-3 rounded-full border border-white/10 text-white/60 text-sm tracking-wide">
                  {label}
                </div>
                {i < arr.length - 1 && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-5 h-5 text-amber/40 rotate-90 md:rotate-0 flex-shrink-0"
                  >
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </React.Fragment>
            ))}
          </div>
        </AnimateInView>
      </div>
    </section>
  )
}
