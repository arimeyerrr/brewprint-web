import AnimateInView from './AnimateInView'

const pillars = [
  {
    title: 'Dual-Score Algorithm',
    desc: 'Every shop gets an objective community score AND a Subjective Match Score specific to you — no more guessing from generic star ratings.',
  },
  {
    title: 'Granular Metadata',
    desc: '20–30 attributes per shop: brew methods, ambiance, workspace quality, dietary options. Precision filtering competitors can\'t match.',
  },
  {
    title: 'Social Layer',
    desc: 'A personal visit journal, social feed, friend discovery, and community groups. Your coffee life becomes a shared experience.',
  },
  {
    title: 'B2B Subscriptions',
    desc: 'Tiered shop subscriptions align platform growth with local business success — shops invest in their digital presence, you get better data.',
  },
]

export default function FounderStory() {
  return (
    <section id="story" className="bg-black py-28 md:py-40">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

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
            it started with a coffee journal<br />built in Canva.
          </h2>
        </AnimateInView>

        {/* Two-column: image + story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start mb-24">

          {/* App screenshot / founder visual */}
          <AnimateInView delay={0.12}>
            <div className="relative">
              {/* Phone frame */}
              <div
                className="relative mx-auto rounded-[2.5rem] overflow-hidden border border-white/10"
                style={{
                  maxWidth: 280,
                  aspectRatio: '9/19',
                  background: '#000',
                  boxShadow: '0 40px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)',
                }}
              >
                <img
                  src="/screens/onboarding.png"
                  alt="brewprint — pick your usual"
                  className="w-full h-full object-cover"
                  style={{ display: 'block' }}
                />
              </div>
              {/* Glow beneath phone */}
              <div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-40 h-16 rounded-full"
                style={{ background: 'radial-gradient(ellipse, rgba(217,142,74,0.15) 0%, transparent 70%)', filter: 'blur(12px)' }}
              />
            </div>
          </AnimateInView>

          {/* Story text */}
          <div className="space-y-7">
            <AnimateInView delay={0.15}>
              <p className="text-white/60 text-lg leading-relaxed">
                In the summer of 2024, Ari Meyerowitz was spending extended time in Gainesville, Florida — using the free time to explore local coffee shops. He designed a personal coffee review journal from scratch in Canva: a structured, repeatable way to document every visit, track what made each place worth returning to.
              </p>
            </AnimateInView>

            <AnimateInView delay={0.2}>
              <p className="text-white/60 text-lg leading-relaxed">
                He recognized immediately it was something any serious coffee lover would want. In January 2025, on a trip to Chicago, he walked into a coffee shop and found a book on the shelf: <em className="text-white/80">33 Cups of Coffee</em>. The analog version of the idea already existed. It took time to sit with that before the more important realization landed.
              </p>
            </AnimateInView>

            <AnimateInView delay={0.25}>
              <p className="text-white/60 text-lg leading-relaxed">
                The right version was never going to be a physical journal. It was a digital platform — capable of doing something no journal ever could: <em className="text-white/80">learning your preferences over time and using them to find the right place in any city.</em>
              </p>
            </AnimateInView>

            <AnimateInView delay={0.3}>
              <p className="text-white/60 text-lg leading-relaxed">
                By summer 2025, Ari committed fully to building that platform. The concept is analogous in category-defining ambition to OneBite for pizza and Untappd for craft beer. The coffee vertical is significantly larger — and has no equivalent at scale.
              </p>
            </AnimateInView>
          </div>
        </div>

        {/* Mission / Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          <AnimateInView delay={0.1}>
            <div className="bg-surface rounded-2xl p-8 md:p-10 border border-white/[0.04] h-full">
              <p className="text-white/20 text-xs tracking-[0.35em] uppercase mb-4">mission</p>
              <p className="text-white/65 text-base leading-relaxed">
                OneBrew serves as a liaison between coffee drinkers and their perfect location — pairing people with the right shop through data-driven personalization and providing a shared journey along the way.
              </p>
            </div>
          </AnimateInView>
          <AnimateInView delay={0.18}>
            <div className="bg-surface rounded-2xl p-8 md:p-10 border border-white/[0.04] h-full">
              <p className="text-white/20 text-xs tracking-[0.35em] uppercase mb-4">vision</p>
              <p className="text-white/65 text-base leading-relaxed">
                OneBrew will revolutionize the way Americans experience coffee — reviving the coffee shop as a destination, not just a transaction, and bringing to the United States the community and ritual that coffee culture embodies around the world.
              </p>
            </div>
          </AnimateInView>
        </div>

        {/* 4 pillars */}
        <AnimateInView delay={0.08}>
          <p className="text-white/20 text-xs tracking-[0.35em] uppercase font-medium mb-8 text-center">
            what makes it different
          </p>
        </AnimateInView>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-20">
          {pillars.map((p, i) => (
            <AnimateInView key={p.title} delay={0.08 + i * 0.07}>
              <div className="flex gap-5 p-6 rounded-xl bg-surface border border-white/[0.04]">
                <div className="w-px bg-white/10 flex-shrink-0 self-stretch" />
                <div>
                  <p className="text-white text-sm font-semibold mb-2">{p.title}</p>
                  <p className="text-white/40 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </AnimateInView>
          ))}
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
