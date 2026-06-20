import AnimateInView from './AnimateInView'

const steps = [
  { number: '01', text: 'pick your usual.' },
  { number: '02', text: 'pick your preferences.' },
  { number: '03', text: 'get your brewprint.' },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-surface py-24 md:py-36">
      <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
        <AnimateInView>
          <h2
            className="font-bold text-white mb-20 leading-tight"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
          >
            how it works.
          </h2>
        </AnimateInView>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
          {steps.map((step, i) => (
            <AnimateInView key={step.number} delay={0.08 + i * 0.1}>
              <div className="flex flex-col items-center gap-4">
                <span
                  className="font-bold text-white/5 select-none block leading-none"
                  style={{ fontSize: 'clamp(6rem, 12vw, 10rem)' }}
                >
                  {step.number}
                </span>
                <p className="text-white text-xl md:text-2xl font-medium -mt-4">
                  {step.text}
                </p>
              </div>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  )
}
