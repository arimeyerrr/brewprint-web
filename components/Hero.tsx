import AnimateInView from './AnimateInView'
import HeroTeardrops from './HeroTeardrops'

function TeardropMark() {
  return (
    <svg width="22" height="28" viewBox="0 0 40 52" className="opacity-50">
      <path
        d="M20 3 C20 3, 37 23, 37 33 A17 17 0 0 1 3 33 C3 23, 20 3, 20 3 Z"
        fill="white"
      />
    </svg>
  )
}

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col overflow-hidden">
      {/* Warm atmospheric glow — right side */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full"
          style={{
            background:
              'radial-gradient(ellipse 85% 65% at 72% 32%, #2E1604 0%, #0E0400 48%, #000000 100%)',
          }}
        />
      </div>

      {/* Left legibility overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/25 to-transparent" />

      {/* Bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      {/* Floating teardrop decorations */}
      <HeroTeardrops />

      {/* Top bar */}
      <div className="relative z-10 flex justify-between items-center px-6 md:px-12 pt-8">
        <AnimateInView>
          <div className="flex items-center gap-2.5">
            <TeardropMark />
            <span className="text-white/30 text-[0.65rem] tracking-[0.4em] uppercase">
              coming soon
            </span>
          </div>
        </AnimateInView>
        <AnimateInView delay={0.1}>
          <a
            href="#waitlist"
            className="text-white/40 hover:text-white text-sm transition-colors tracking-wide"
          >
            join waitlist →
          </a>
        </AnimateInView>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col justify-end flex-1 px-6 md:px-12 pb-20 md:pb-28">
        <AnimateInView delay={0.15}>
          <p className="text-white/20 text-xs tracking-[0.35em] uppercase mb-5">brewprint</p>
        </AnimateInView>

        <AnimateInView delay={0.22}>
          <h1
            className="font-bold text-white leading-[0.88] mb-9"
            style={{ fontSize: 'clamp(3.2rem, 12vw, 9.5rem)', letterSpacing: '-0.025em' }}
          >
            coffee,<br />matched<br />to you.
          </h1>
        </AnimateInView>

        <AnimateInView delay={0.32}>
          <p className="text-white/45 text-lg md:text-xl max-w-xs mb-10 font-light leading-relaxed">
            Personalized match scores for every coffee shop — based on your exact taste profile.
          </p>
        </AnimateInView>

        <AnimateInView delay={0.42}>
          <a
            href="#waitlist"
            className="inline-block bg-white text-black font-semibold px-10 py-4 rounded-full text-sm md:text-base tracking-wide hover:bg-white/90 transition-all duration-200"
          >
            join the waitlist
          </a>
        </AnimateInView>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 opacity-25">
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-white" />
      </div>
    </section>
  )
}
