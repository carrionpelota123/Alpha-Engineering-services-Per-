import { motion } from 'framer-motion'
import { processSteps } from '../data/process'
import { fadeUp, fadeUpStagger } from '../lib/motion'

const container = fadeUpStagger(0.08)
const item = fadeUp

export function Process() {
  return (
    <section
      id="proceso"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden py-20 sm:py-24"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />
      <div className="shell relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Cómo trabajamos</span>
          <h2 className="title mt-3">Un proceso en cuatro pasos</h2>
          <p className="lede mt-4 text-balance">
            Sin vueltas. Te cotizamos precio cerrado, lo aprobamos y lo resolvemos.
          </p>
        </div>

        <motion.ol
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-120px' }}
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {processSteps.map((p) => (
            <motion.li key={p.step} variants={item} className="glass card-hover relative flex flex-col gap-3 rounded-2xl p-6">
              <div className="font-mono text-xs tracking-[0.2em] text-cyan">{p.step}</div>
              <h3 className="text-lg font-semibold text-white">{p.title}</h3>
              <p className="text-[14.5px] leading-relaxed text-slate-400">{p.desc}</p>
              <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-cyan/5 blur-xl" />
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}
