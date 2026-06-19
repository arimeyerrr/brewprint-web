import AnimateInView from './AnimateInView'

const highlights = [
  "Manage your shop's presence",
  'Tag your brewing methods & bean origins',
  'Reach customers already looking for you',
  'Early access — no cost to join',
]

export default function ShopOwners() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div>
            <AnimateInView>
              <p className="text-amber text-[0.65rem] tracking-[0.45em] uppercase font-medium mb-4">
                For Shop Owners
              </p>
            </AnimateInView>
            <AnimateInView delay={0.1}>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Your shop, perfectly positioned.
              </h2>
            </AnimateInView>
            <AnimateInView delay={0.2}>
              <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-10">
                Manage your shop&apos;s presence, tag your roast profiles and brewing methods, and
                reach the customers who are already looking for exactly what you offer.
              </p>
            </AnimateInView>
            <AnimateInView delay={0.3}>
              <a
                href="#waitlist-owner"
                className="inline-block bg-amber text-black font-semibold px-10 py-4 rounded-full text-sm md:text-base tracking-wide hover:bg-amber/90 transition-all duration-200"
              >
                Join the Waitlist for Shops
              </a>
            </AnimateInView>
          </div>

          {/* Right: feature highlights */}
          <AnimateInView delay={0.2}>
            <div className="bg-surface rounded-2xl p-8 md:p-10 border border-white/5">
              <p className="text-white/30 text-xs tracking-[0.35em] uppercase mb-8">
                What you get
              </p>
              <ul className="space-y-6">
                {highlights.map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <div className="w-1 h-1 rounded-full bg-amber mt-2.5 flex-shrink-0" />
                    <span className="text-white/70 text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 pt-8 border-t border-white/5">
                <p className="text-white/30 text-sm italic">
                  No pricing yet. Early shop owners get priority listing and help shape the product.
                </p>
              </div>
            </div>
          </AnimateInView>
        </div>
      </div>
    </section>
  )
}
