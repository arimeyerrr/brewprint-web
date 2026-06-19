import AnimateInView from './AnimateInView'

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col overflow-hidden">
      {/* Atmospheric background — swap the inner div for <Image fill> once you have your hero photo */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full"
          style={{
            background:
              'radial-gradient(ellipse 90% 70% at 65% 35%, #3D1F08 0%, #1C0A02 45%, #000000 100%)',
          }}
        />
      </div>

      {/* Left-side gradient for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />

      {/* Bottom fade to seamless section transition */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      {/* Top bar */}
      <div className="relative z-10 flex justify-between items-center px-6 md:px-12 pt-8">
        <AnimateInView>
          <span className="text-amber text-[0.65rem] tracking-[0.45em] uppercase font-medium">
            Coming Soon
          </span>
        </AnimateInView>
        <AnimateInView delay={0.1}>
          <a
            href="#waitlist"
            className="text-white/60 hover:text-white text-sm transition-colors tracking-wide"
          >
            Join Waitlist
          </a>
        </AnimateInView>
      </div>

      {/* Main content — anchored to the bottom */}
      <div className="relative z-10 flex flex-col justify-end flex-1 px-6 md:px-12 pb-20 md:pb-28">
        <AnimateInView delay={0.15}>
          <h1 className="font-bold uppercase text-white leading-[0.87] mb-7 md:mb-9">
            <span
              className="block"
              style={{ fontSize: 'clamp(4rem, 14vw, 11.5rem)', letterSpacing: '0.06em' }}
            >
              Brew
            </span>
            <span
              className="block"
              style={{ fontSize: 'clamp(4rem, 14vw, 11.5rem)', letterSpacing: '0.06em' }}
            >
              print
            </span>
          </h1>
        </AnimateInView>

        <AnimateInView delay={0.25}>
          <p className="text-white/65 text-lg md:text-2xl max-w-md mb-10 font-light leading-relaxed">
            Discover coffee shops that match your exact taste — scored, mapped, and curated just for you.
          </p>
        </AnimateInView>

        <AnimateInView delay={0.35}>
          <a
            href="#waitlist"
            className="inline-block bg-amber text-black font-semibold px-10 py-4 rounded-full text-sm md:text-base tracking-wide hover:bg-amber/90 transition-all duration-200"
          >
            Join the Waitlist
          </a>
        </AnimateInView>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 opacity-40">
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-amber" />
      </div>
    </section>
  )
}
