import React from 'react'
import AnimateInView from './AnimateInView'

const steps = [
  {
    number: '01',
    title: 'build your taste profile',
    body: "Tell us how you take your coffee — espresso strength, milk preferences, flavour notes you love, and whether you need great wifi or want a quiet corner. Takes two minutes.",
  },
  {
    number: '02',
    title: 'we tag every shop',
    body: "Brewprint maps each coffee shop's brewing methods, bean origins, roast levels, ambiance, and community reviews against your profile. No guesswork.",
  },
  {
    number: '03',
    title: 'get your score, out of 10',
    body: "Every shop gets a personalized match score — just for you. A 9.4 for one person might be a 6.1 for another. Find your perfect cup, not someone else's.",
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <AnimateInView>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-20 max-w-xl leading-tight">
            your taste. scored.
          </h2>
        </AnimateInView>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {steps.map((step, i) => (
            <AnimateInView key={step.number} delay={0.08 + i * 0.1}>
              <div className="flex flex-col h-full">
                <span
                  className="font-bold mb-8 block leading-none text-white/8 select-none"
                  style={{ fontSize: 'clamp(3.5rem, 7vw, 5.5rem)', letterSpacing: '-0.03em' }}
                >
                  {step.number}
                </span>

                <div className="w-6 h-px bg-white/15 mb-6" />

                <h3 className="text-white font-semibold text-lg mb-4 leading-snug">
                  {step.title}
                </h3>
                <p className="text-white/40 text-base leading-relaxed">{step.body}</p>
              </div>
            </AnimateInView>
          ))}
        </div>

        {/* Flow diagram */}
        <AnimateInView delay={0.38}>
          <div className="mt-20 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
            {['taste profile', 'shop tags', 'personalized score / 10'].map((label, i, arr) => (
              <React.Fragment key={label}>
                <div className="px-6 py-3 rounded-full border border-white/8 text-white/35 text-sm tracking-wide">
                  {label}
                </div>
                {i < arr.length - 1 && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-4 h-4 text-white/20 rotate-90 md:rotate-0 flex-shrink-0"
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
