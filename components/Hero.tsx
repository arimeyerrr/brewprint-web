import AnimateInView from './AnimateInView'

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col overflow-hidden">
      {/* Warm background glow */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 65% 38%, #2E1604 0%, #0D0400 50%, #000000 100%)',
          }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

      {/* Top bar */}
      <div className="relative z-10 flex justify-between items-center px-6 md:px-12 pt-8">
        <AnimateInView>
          <span className="text-white/25 text-[0.65rem] tracking-[0.4em] uppercase">
            coming soon
          </span>
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

      {/* Centered main content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-6">
        <AnimateInView delay={0.15}>
          <h1
            className="font-bold text-white leading-[0.85] mb-8"
            style={{ fontSize: 'clamp(5rem, 18vw, 15rem)', letterSpacing: '-0.03em' }}
          >
            brewprint
          </h1>
        </AnimateInView>

        <AnimateInView delay={0.25}>
          <p className="text-white/45 text-lg md:text-xl max-w-sm mb-10 font-light leading-relaxed">
            Personalized match scores for every coffee shop — based on your exact taste.
          </p>
        </AnimateInView>

        <AnimateInView delay={0.35}>
          <a
            href="#waitlist"
            className="inline-block bg-white text-black font-semibold px-10 py-4 rounded-full text-sm md:text-base tracking-wide hover:bg-white/90 transition-all duration-200"
          >
            join the waitlist
          </a>
        </AnimateInView>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 opacity-20">
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-white" />
      </div>
    </section>
  )
}
