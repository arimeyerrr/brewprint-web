import AnimateInView from './AnimateInView'

export default function FounderNote() {
  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <AnimateInView>
          <p className="text-white/20 text-[0.65rem] tracking-[0.4em] uppercase font-medium mb-12">
            a note from the founder
          </p>
        </AnimateInView>

        <AnimateInView delay={0.15}>
          <span
            className="block text-white/6 font-bold leading-none mb-6 select-none"
            style={{ fontSize: '5rem', lineHeight: 0.8 }}
          >
            &ldquo;
          </span>

          <blockquote className="text-white/65 text-xl md:text-2xl italic font-light leading-relaxed mb-10">
            Brewprint started from a simple frustration: I kept walking into beautiful coffee shops
            that just weren&apos;t right for my taste. I wanted to know, before I stepped through the
            door, whether a place would actually match what I loved. That&apos;s the problem
            we&apos;re solving — and I&apos;m building it in the open. If this sounds like something
            you want to exist in the world, I&apos;d love for you to be part of it from the start.
          </blockquote>
        </AnimateInView>

        <AnimateInView delay={0.25}>
          <div className="flex items-center justify-center gap-4">
            <div className="w-8 h-px bg-white/10" />
            <p className="text-white/25 text-sm tracking-wider">founder, brewprint</p>
            <div className="w-8 h-px bg-white/10" />
          </div>
        </AnimateInView>
      </div>
    </section>
  )
}
