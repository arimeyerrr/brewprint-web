'use client'
import dynamic from 'next/dynamic'
import AnimateInView from './AnimateInView'

const GlobeInner = dynamic(() => import('./GlobeInner'), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
})

const CITIES = [
  'New York', 'Los Angeles', 'Chicago', 'San Francisco', 'Miami',
  'Austin', 'Seattle', 'Denver', 'Nashville', 'Boston', 'Atlanta',
  'Portland', 'Dallas', 'Washington D.C.', 'New Orleans', 'Las Vegas', 'San Diego',
]

export default function GlobeSection() {
  return (
    <section className="bg-black py-24 md:py-40 overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 md:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">

          {/* Text */}
          <div className="flex-1 min-w-0 text-center lg:text-left">
            <AnimateInView>
              <p className="text-[10px] tracking-[0.32em] uppercase font-medium mb-5"
                style={{ color: 'rgba(217,142,74,0.55)' }}>
                coming soon
              </p>
            </AnimateInView>
            <AnimateInView delay={0.08}>
              <h2
                className="font-bold text-white leading-tight mb-6"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', letterSpacing: '-0.025em' }}
              >
                Coming to<br />Your City.
              </h2>
            </AnimateInView>
            <AnimateInView delay={0.14}>
              <p className="text-white/40 text-lg leading-relaxed mb-10 max-w-sm mx-auto lg:mx-0">
                Brewprint is rolling out across the country. Find your perfect cup wherever you are — drag the globe to explore.
              </p>
            </AnimateInView>
            <AnimateInView delay={0.2}>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {CITIES.map((city) => (
                  <span
                    key={city}
                    className="text-[11px] px-3 py-1.5 rounded-full"
                    style={{
                      background: 'rgba(217,142,74,0.07)',
                      border: '1px solid rgba(217,142,74,0.18)',
                      color: 'rgba(255,255,255,0.45)',
                    }}
                  >
                    {city}
                  </span>
                ))}
              </div>
            </AnimateInView>
          </div>

          {/* Globe */}
          <AnimateInView delay={0.1} className="flex-shrink-0 w-full lg:w-auto">
            <div
              className="mx-auto"
              style={{ width: '100%', maxWidth: 480, aspectRatio: '1 / 1' }}
            >
              <GlobeInner />
            </div>
          </AnimateInView>

        </div>
      </div>
    </section>
  )
}
