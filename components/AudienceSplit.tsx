import AnimateInView from './AnimateInView'

function CoffeeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-7 h-7 text-white/40"
    >
      <path d="M17 8h1a4 4 0 010 8h-1" />
      <path d="M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8z" />
      <line x1="6" y1="2" x2="6" y2="4" />
      <line x1="10" y1="2" x2="10" y2="4" />
      <line x1="14" y1="2" x2="14" y2="4" />
    </svg>
  )
}

function ShopIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-7 h-7 text-white/40"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 text-white/50 flex-shrink-0 mt-0.5">
      <path
        d="M2.5 8L6.5 12L13.5 4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const cards = [
  {
    icon: <CoffeeIcon />,
    label: 'for coffee lovers',
    pitch:
      'Stop guessing. Get a personalized match score for every coffee shop based on your actual taste profile — before you walk in the door.',
    features: [
      'Build your taste profile once',
      'TikTok-style discovery feed',
      'Personalized scores out of 10',
      'Find the right cup, every time',
    ],
    href: '#waitlist-lover',
    cta: 'join as a coffee lover',
  },
  {
    icon: <ShopIcon />,
    label: 'for shop owners',
    pitch:
      "Reach customers who are already looking for exactly what you offer. Tag your brewing methods, beans, and ambiance — and let the algorithm do the matching.",
    features: [
      'Manage your shop profile',
      'Attract your ideal customer',
      'Showcase what makes you unique',
      'Early access & priority listing',
    ],
    href: '#waitlist-owner',
    cta: 'join as a shop owner',
  },
]

export default function AudienceSplit() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <AnimateInView>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 leading-tight text-center">
            built for both sides of the cup.
          </h2>
        </AnimateInView>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {cards.map((card, i) => (
            <AnimateInView key={card.label} delay={0.08 + i * 0.1}>
              <div className="group flex flex-col items-center text-center h-full bg-surface rounded-2xl p-8 md:p-10 border border-white/[0.04] hover:border-white/10 transition-colors duration-300">
                <div className="mb-5">{card.icon}</div>
                <p className="text-white/30 text-[0.65rem] tracking-[0.35em] uppercase font-medium mb-3">
                  {card.label}
                </p>
                <p className="text-white/60 text-base md:text-lg leading-relaxed mb-8">
                  {card.pitch}
                </p>
                <ul className="space-y-3 mb-10 w-full">
                  {card.features.map((f) => (
                    <li key={f} className="flex items-center justify-center gap-3">
                      <Check />
                      <span className="text-white/40 text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <a
                    href={card.href}
                    className="inline-block bg-white/5 text-white/70 border border-white/10 font-medium px-8 py-3.5 rounded-full text-sm tracking-wide hover:bg-white hover:text-black transition-all duration-200"
                  >
                    {card.cta}
                  </a>
                </div>
              </div>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  )
}
