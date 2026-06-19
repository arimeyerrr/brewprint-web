import Image from 'next/image'
import AnimateInView from './AnimateInView'

const screens = [
  {
    src: '/screens/screen-1.svg',
    alt: 'Personalized match scores screen',
    caption: 'Personalized Match Scores',
    description: 'Your taste profile generates a unique score for every shop.',
    tilt: 'perspective(900px) rotateY(10deg) rotateX(2deg)',
  },
  {
    src: '/screens/screen-2.svg',
    alt: 'Interactive map discovery screen',
    caption: 'Interactive Map Discovery',
    description: 'Find quality coffee wherever you are.',
    tilt: '',
  },
  {
    src: '/screens/screen-3.svg',
    alt: 'Granular review scoring screen',
    caption: 'Granular Review Scoring',
    description: 'Review what actually matters — espresso, milk, ambiance, and more.',
    tilt: 'perspective(900px) rotateY(-10deg) rotateX(2deg)',
  },
]

export default function ProductShowcase() {
  return (
    <section className="bg-background py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <AnimateInView>
          <p className="text-amber text-[0.65rem] tracking-[0.45em] uppercase font-medium mb-4">
            The App
          </p>
        </AnimateInView>
        <AnimateInView delay={0.1}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 max-w-lg leading-tight">
            A new way to discover coffee.
          </h2>
        </AnimateInView>
        <AnimateInView delay={0.15}>
          <p className="text-white/50 text-lg mb-20 max-w-md leading-relaxed">
            Scroll, score, map, and review — all in one place.
          </p>
        </AnimateInView>

        {/* Phone mockup row */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-6 lg:gap-10">
          {screens.map((screen, i) => (
            <AnimateInView
              key={screen.caption}
              delay={0.1 + i * 0.12}
              className="flex flex-col items-center"
            >
              {/* Phone frame */}
              <div
                className="relative w-[195px] h-[408px] rounded-[2.75rem] bg-black overflow-hidden"
                style={{
                  transform: screen.tilt || undefined,
                  boxShadow:
                    '0 40px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.06), inset 0 0 0 1.5px rgba(255,255,255,0.04)',
                }}
              >
                {/* Dynamic island */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[58px] h-[17px] rounded-full bg-black z-10" />
                {/* Screen content */}
                <Image
                  src={screen.src}
                  alt={screen.alt}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>

              {/* Caption */}
              <div className="mt-6 text-center max-w-[200px]">
                <p className="text-white text-sm font-semibold mb-1.5">{screen.caption}</p>
                <p className="text-white/40 text-xs leading-relaxed">{screen.description}</p>
              </div>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  )
}
