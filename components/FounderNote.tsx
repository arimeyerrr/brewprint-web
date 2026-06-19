import AnimateInView from './AnimateInView'

export default function FounderNote() {
  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <AnimateInView>
          <p className="text-amber text-[0.65rem] tracking-[0.45em] uppercase font-medium mb-12">
            A Note from the Founder
          </p>
        </AnimateInView>

        <AnimateInView delay={0.15}>
          {/* Opening quote mark */}
          <span
            className="block text-amber/20 font-bold leading-none mb-6 select-none"
            style={{ fontSize: '5rem', lineHeight: 0.8 }}
          >
            &ldquo;
          </span>

          <blockquote className="text-white/75 text-xl md:text-2xl italic font-light leading-relaxed mb-10">
            Brewprint started from a simple frustration: I kept walking into beautiful coffee shops
            that just weren&apos;t right for my taste. I wanted to know, before I stepped through the
            door, whether a place would actually match what I loved. That&apos;s the problem
            we&apos;re solving — and I&apos;m building it in the open. If this sounds like something
            you want to exist in the world, I&apos;d love for you to be part of it from the start.
          </blockquote>
        </AnimateInView>

        <AnimateInView delay={0.25}>
          <div className="flex items-center justify-center gap-4">
            <div className="w-8 h-px bg-amber/40" />
            <p className="text-white/35 text-sm tracking-wider">Founder, Brewprint</p>
            <div className="w-8 h-px bg-amber/40" />
          </div>
        </AnimateInView>
      </div>
    </section>
  )
}
