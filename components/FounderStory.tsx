import AnimateInView from './AnimateInView'

export default function FounderStory() {
  return (
    <section id="story" className="bg-black py-28 md:py-40">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <AnimateInView>
          <p className="text-white/20 text-xs tracking-[0.45em] uppercase font-medium mb-10 text-center">
            the story
          </p>
        </AnimateInView>

        <AnimateInView delay={0.1}>
          <h2
            className="font-bold text-white leading-tight mb-16 text-center"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)' }}
          >
            built out of too many<br />bad coffee shop gambles.
          </h2>
        </AnimateInView>

        <div className="space-y-8">
          <AnimateInView delay={0.15}>
            <p className="text-white/60 text-lg leading-relaxed">
              I&apos;m Ari. I&apos;ve ordered hundreds of coffees I didn&apos;t love — not because the shops were bad, but because there was no way to know if they were right for <em>me</em> before walking through the door.
            </p>
          </AnimateInView>

          <AnimateInView delay={0.2}>
            <p className="text-white/60 text-lg leading-relaxed">
              One day I wrote a note in my phone: <em>"why isn&apos;t there a Spotify for coffee shops?"</em> Something that learns your taste, maps it to places, and tells you — with a real number — whether this shop is going to hit for you today. That note became Brewprint.
            </p>
          </AnimateInView>

          <AnimateInView delay={0.25}>
            <p className="text-white/60 text-lg leading-relaxed">
              I&apos;m building this because specialty coffee deserves better discovery. The shops doing exceptional work deserve to find the customers who will actually appreciate it. And the people looking for their perfect cup deserve more than Yelp stars and luck.
            </p>
          </AnimateInView>

          <AnimateInView delay={0.3}>
            <p className="text-white/60 text-lg leading-relaxed">
              Brewprint is being built in the open — which means the people who join now help shape exactly what it becomes. If any part of this resonates with you, I&apos;d love for you to be part of it from the very beginning.
            </p>
          </AnimateInView>
        </div>

        <AnimateInView delay={0.38}>
          <div className="flex items-center gap-4 mt-14">
            <div className="w-10 h-px bg-white/10" />
            <p className="text-white/25 text-sm tracking-wider">— Ari, founder of brewprint</p>
          </div>
        </AnimateInView>

        <AnimateInView delay={0.44}>
          <div className="mt-12 text-center">
            <a
              href="#waitlist"
              className="inline-block border border-white/15 text-white/70 font-medium px-8 py-3.5 rounded-full text-sm tracking-wide hover:bg-white hover:text-black transition-all duration-200"
            >
              be part of it →
            </a>
          </div>
        </AnimateInView>
      </div>
    </section>
  )
}
