import AnimateInView from './AnimateInView'

export default function FounderStory() {
  return (
    <section id="story" className="bg-black py-28 md:py-40">
      <div className="max-w-5xl mx-auto px-6 md:px-12">

        <AnimateInView>
          <p className="text-white/20 text-xs tracking-[0.3em] uppercase font-medium mb-10 text-center">
            The Story
          </p>
        </AnimateInView>

        <AnimateInView delay={0.08}>
          <h2
            className="font-bold text-white leading-tight mb-20 text-center"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)' }}
          >
            Built Because the Tool Didn&apos;t Exist.
          </h2>
        </AnimateInView>

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
                  <p className="text-white/40 text-sm">Founder, Brewprint</p>
                </div>
              </div>
            </div>
          </AnimateInView>

          <div className="space-y-7">
            <AnimateInView delay={0.15}>
              <p className="text-white/60 text-lg leading-relaxed">
                Ari is a developer and product designer from Gainesville, Florida with a background in business. He has spent most of his twenties building creative products, tools, and systems, usually because nothing on the market was quite right.
              </p>
            </AnimateInView>

            <AnimateInView delay={0.2}>
              <p className="text-white/60 text-lg leading-relaxed">
                Coffee became a constant in that work. Over years of visiting new cities and discovering new shops, he kept detailed notes on every visit: the roast, the brew method, the espresso pull, the atmosphere. The notes eventually became a structured system. Then the system became an obvious product.
              </p>
            </AnimateInView>

            <AnimateInView delay={0.25}>
              <p className="text-white/60 text-lg leading-relaxed">
                He started building Brewprint in Gainesville in the summer of 2024.
              </p>
            </AnimateInView>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <AnimateInView delay={0.08}>
            <div className="bg-surface rounded-2xl p-8 md:p-10 border border-white/[0.04] h-full">
              <p className="text-white/20 text-xs tracking-[0.3em] uppercase mb-4">Mission</p>
              <p className="text-white/65 text-base leading-relaxed">
                Brewprint serves as a liaison between coffee drinkers and their perfect location, pairing people with the right shop through data-driven personalization and providing a shared journey along the way.
              </p>
            </div>
          </AnimateInView>
          <AnimateInView delay={0.16}>
            <div className="bg-surface rounded-2xl p-8 md:p-10 border border-white/[0.04] h-full">
              <p className="text-white/20 text-xs tracking-[0.3em] uppercase mb-4">Vision</p>
              <p className="text-white/65 text-base leading-relaxed">
                Brewprint will revolutionize the way Americans experience coffee, reviving the coffee shop as a destination rather than a transaction and bringing to the United States the community and ritual that coffee culture embodies around the world.
              </p>
            </div>
          </AnimateInView>
        </div>

        <AnimateInView delay={0.3}>
          <div className="flex flex-col items-center gap-6 text-center">
            <p className="text-white/25 text-sm tracking-wide">Ari Meyerowitz, founder</p>
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
