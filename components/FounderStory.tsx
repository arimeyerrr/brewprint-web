import AnimateInView from './AnimateInView'

export default function FounderStory() {
  return (
    <section id="story" className="bg-black py-28 md:py-40">
      <div className="max-w-5xl mx-auto px-6 md:px-12">

        <AnimateInView>
          <p className="text-white/20 text-xs tracking-[0.45em] uppercase font-medium mb-10 text-center">
            the story
          </p>
        </AnimateInView>

        <AnimateInView delay={0.08}>
          <h2
            className="font-bold text-white leading-tight mb-20 text-center"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)' }}
          >
            built because the tool<br />didn&apos;t exist.
          </h2>
        </AnimateInView>

        {/* Image + story columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start mb-24">

          <AnimateInView delay={0.12}>
            <div className="relative">
              <div
                className="w-full rounded-2xl overflow-hidden border border-white/[0.05]"
                style={{
                  aspectRatio: '4/5',
                  background: 'linear-gradient(145deg, #0e0602 0%, #1c0a02 60%, #080300 100%)',
                  boxShadow: '0 32px 64px rgba(0,0,0,0.6)',
                }}
              >
                <img
                  src="/founder.jpg"
                  alt="Ari Meyerowitz"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white font-semibold">Ari Meyerowitz</p>
                  <p className="text-white/40 text-sm">Founder, brewprint</p>
                </div>
              </div>
            </div>
          </AnimateInView>

          <div className="space-y-7">
            <AnimateInView delay={0.15}>
              <p className="text-white/60 text-lg leading-relaxed">
                Ari has always built things because he wanted them to exist. Whether it&apos;s design systems, creative projects, or businesses — his instinct is to start from scratch when nothing on the market is quite right.
              </p>
            </AnimateInView>

            <AnimateInView delay={0.2}>
              <p className="text-white/60 text-lg leading-relaxed">
                The idea for brewprint came from a simple frustration: every new city, every unknown neighborhood — finding the right coffee shop for <em className="text-white/80">him</em> was still a matter of luck. He started keeping structured notes on every visit. Then the system got more detailed. Then he realized — this is the product.
              </p>
            </AnimateInView>

            <AnimateInView delay={0.25}>
              <p className="text-white/60 text-lg leading-relaxed">
                By early 2025, on a trip to Chicago, he found a physical version of the concept sitting on a coffee shop shelf. The analog form existed. That realization clarified everything: <em className="text-white/80">the right version was digital, personalized, and scalable across every city.</em>
              </p>
            </AnimateInView>

            <AnimateInView delay={0.3}>
              <p className="text-white/60 text-lg leading-relaxed">
                Today Ari is building brewprint from Gainesville, Florida — talking to shop owners, mapping the metadata that powers the algorithm, and designing a product the next generation of coffee drinkers actually deserves.
              </p>
            </AnimateInView>
          </div>
        </div>

        {/* Mission / Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <AnimateInView delay={0.08}>
            <div className="bg-surface rounded-2xl p-8 md:p-10 border border-white/[0.04] h-full">
              <p className="text-white/20 text-xs tracking-[0.35em] uppercase mb-4">mission</p>
              <p className="text-white/65 text-base leading-relaxed">
                brewprint serves as a liaison between coffee drinkers and their perfect location — pairing people with the right shop through data-driven personalization and providing a shared journey along the way.
              </p>
            </div>
          </AnimateInView>
          <AnimateInView delay={0.16}>
            <div className="bg-surface rounded-2xl p-8 md:p-10 border border-white/[0.04] h-full">
              <p className="text-white/20 text-xs tracking-[0.35em] uppercase mb-4">vision</p>
              <p className="text-white/65 text-base leading-relaxed">
                brewprint will revolutionize the way Americans experience coffee — reviving the coffee shop as a destination, not just a transaction, and bringing to the United States the community and ritual that coffee culture embodies around the world.
              </p>
            </div>
          </AnimateInView>
        </div>

        {/* Sign-off */}
        <AnimateInView delay={0.3}>
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex items-center gap-5">
              <div className="w-12 h-px bg-white/10" />
              <p className="text-white/25 text-sm tracking-wider">— Ari Meyerowitz, founder of brewprint</p>
              <div className="w-12 h-px bg-white/10" />
            </div>
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
