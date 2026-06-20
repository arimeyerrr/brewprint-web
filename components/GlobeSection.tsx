'use client'
import dynamic from 'next/dynamic'
import AnimateInView from './AnimateInView'

const USMapInner = dynamic(() => import('./USMapInner'), {
  ssr: false,
  loading: () => (
    <div className="w-full flex items-center justify-center" style={{ paddingTop: 200, paddingBottom: 200 }}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-6 h-6 rounded-full border-2 border-amber/30 border-t-amber animate-spin" />
        <p className="text-white/20 text-xs tracking-widest uppercase">Loading map</p>
      </div>
    </div>
  ),
})

export default function GlobeSection() {
  return (
    <section id="globe" className="relative overflow-hidden bg-black" style={{ minHeight: '100vh' }}>
      <div className="absolute inset-0" style={{ background: '#07101e' }} />

      <div className="absolute top-0 inset-x-0 z-10 pt-20 text-center px-6">
        <AnimateInView>
          <h2 className="font-bold text-white leading-tight mb-3" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
            Every Shop. Your Score.
          </h2>
        </AnimateInView>
        <AnimateInView delay={0.1}>
          <p className="text-white/30 text-sm max-w-sm mx-auto">
            Click any city to see your personal match score.
          </p>
        </AnimateInView>
      </div>

      <USMapInner />
    </section>
  )
}
