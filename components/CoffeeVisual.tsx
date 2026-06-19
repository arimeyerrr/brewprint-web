export default function CoffeeVisual() {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: '75vh' }}>
      <img
        src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=2400&q=85&auto=format&fit=crop"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: 'center 60%' }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55" />
      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
      {/* Top fade */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black to-transparent" />

      {/* Centered text */}
      <div className="absolute inset-0 flex items-center justify-center text-center px-6">
        <div>
          <p className="text-white/30 text-xs tracking-[0.45em] uppercase mb-5">the experience</p>
          <h2
            className="text-white font-bold leading-tight"
            style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}
          >
            specialty coffee,<br />finally personal.
          </h2>
        </div>
      </div>
    </section>
  )
}
