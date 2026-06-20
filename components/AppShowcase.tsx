import AnimateInView from './AnimateInView'

const screens = [
  { file: '/screens/onboarding.png', label: 'pick your usual.' },
  { file: '/screens/map.png', label: 'discover near you.' },
  { file: '/screens/feed.png', label: 'share the sip.' },
]

function PhoneFrame({ src, label, tilt = 0 }: { src: string; label: string; tilt?: number }) {
  return (
    <div
      className="relative flex-shrink-0"
      style={{ transform: `rotate(${tilt}deg)`, transition: 'transform 0.4s ease' }}
    >
      <div
        className="relative rounded-[2.2rem] overflow-hidden border border-white/10"
        style={{
          width: 200,
          height: 432,
          background: '#050505',
          boxShadow: '0 32px 64px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04), inset 0 0 0 1px rgba(255,255,255,0.04)',
        }}
      >
        {/* Notch */}
        <div
          className="absolute top-3 left-1/2 -translate-x-1/2 z-10 rounded-full bg-black"
          style={{ width: 60, height: 18 }}
        />
        <img
          src={src}
          alt={label}
          className="w-full h-full object-cover object-top"
        />
      </div>
      <p className="text-white/30 text-xs tracking-wider text-center mt-4">{label}</p>
    </div>
  )
}

export default function AppShowcase() {
  return (
    <section className="bg-black py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <AnimateInView>
          <p className="text-white/20 text-xs tracking-[0.45em] uppercase font-medium mb-6 text-center">
            the app
          </p>
        </AnimateInView>
        <AnimateInView delay={0.08}>
          <h2
            className="font-bold text-white leading-tight mb-5 text-center"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            built for how you actually<br />experience coffee.
          </h2>
        </AnimateInView>
        <AnimateInView delay={0.14}>
          <p className="text-white/35 text-base text-center max-w-md mx-auto mb-16">
            Onboard in 60 seconds. Your taste profile works in every city, every shop, every cup.
          </p>
        </AnimateInView>

        {/* Phone frames — staggered */}
        <AnimateInView delay={0.2}>
          <div className="flex items-end justify-center gap-6 md:gap-10">
            <PhoneFrame src={screens[0].file} label={screens[0].label} tilt={-4} />
            <PhoneFrame src={screens[1].file} label={screens[1].label} tilt={0} />
            <PhoneFrame src={screens[2].file} label={screens[2].label} tilt={4} />
          </div>
        </AnimateInView>

        {/* Feature chips */}
        <AnimateInView delay={0.28}>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-14">
            {[
              'Dual-Score Algorithm',
              'Discovery Map',
              'Personal Journal',
              'Blend Mode',
              'Social Feed',
              'Verified Reviewers',
            ].map((chip) => (
              <span
                key={chip}
                className="text-white/40 text-xs border border-white/10 rounded-full px-4 py-1.5 tracking-wide"
              >
                {chip}
              </span>
            ))}
          </div>
        </AnimateInView>

      </div>
    </section>
  )
}
