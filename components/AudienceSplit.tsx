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
      className="w-8 h-8 text-amber"
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
      className="w-8 h-8 text-amber"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function Check() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className="w-4 h-4 text-amber flex-shrink-0 mt-0.5"
    >
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
    label: 'Coffee Lovers',
    pitch:
      'Stop guessing. Get a personalized match score for every coffee shop based on your actual taste profile — before you walk in the door.',
    features: [
      'Build your taste profile once',
      'TikTok-style discovery feed',
      'Personalized scores out of 10',
      'Find the right cup, every time',
    ],
    href: '#waitlist-lover',
    cta: 'Join as a Coffee Lover',
  },
  {
    icon: <ShopIcon />,
    label: 'Shop Owners',
    pitch:
      "Reach customers who are already looking for exactly what you offer. Tag your brewing methods, beans, and ambiance — and let the algorithm do the matching.",
    features: [
      'Manage your shop profile',
      'Attract your ideal customer',
      'Showcase what makes you unique',
      'Early access & priority listing',
    ],
    href: '#waitlist-owner',
    cta: 'Join as a Shop Owner',
  },
]

export default function AudienceSplit() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <AnimateInView>
          <p className="text-amber text-[0.65rem] tracking-[0.45em] uppercase font-medium mb-4">
            Who It&apos;s For
          </p>
        </AnimateInView>
        <AnimateInView delay={0.1}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 max-w-xl leading-tight">
            Built for both sides of the cup.
          </h2>
        </AnimateInView>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, i) => (
            <AnimateInView key={card.label} delay={0.1 + i * 0.12}>
              <div className="group flex flex-col h-full bg-surface rounded-2xl p-8 md:p-10 border border-white/5 hover:border-amber/20 transition-colors duration-300">
                <div className="mb-6">{card.icon}</div>
                <p className="text-amber text-xs tracking-[0.35em] uppercase font-medium mb-3">
                  {card.label}
                </p>
                <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8">
                  {card.pitch}
                </p>
                <ul className="space-y-3 mb-10">
                  {card.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check />
                      <span className="text-white/50 text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <a
                    href={card.href}
                    className="inline-block bg-amber/10 text-amber border border-amber/30 font-medium px-8 py-3.5 rounded-full text-sm tracking-wide hover:bg-amber hover:text-black transition-all duration-200"
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
