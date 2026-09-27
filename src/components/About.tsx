import { motion } from 'framer-motion'
import { differentiators, stats } from '../data/differentiators'
import { DifferentiatorGlyph } from './Glyphs'
import { fadeUp, fadeUpStagger } from '../lib/motion'

const container = fadeUpStagger(0.08)
const item = fadeUp

export function About() {
  return (
    <section id="nosotros" className="relative overflow-hidden py-20 sm:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />
      <div className="shell relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-12">
          <div>
            <span className="eyebrow">Por qué elegirnos</span>
            <h2 className="title mt-3">Ingeniería real detrás de cada trabajo</h2>
            <p className="lede mt-4 max-w-xl text-balance">
              Resolvemos desde una computadora que no arranca hasta una máquina que se detiene, con la misma calidad que nos define  .
            </p>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-120px' }}
              className="mt-7 grid gap-3 sm:grid-cols-2"
            >
              {differentiators.map((d, i) => (
                <motion.div
                  key={d.title}
                  variants={item}
                  className="glass card-hover group relative flex items-start gap-4 overflow-hidden rounded-2xl p-5"
                >
                  <span
                    className="absolute inset-y-0 left-0 w-0.5 bg-gradient-to-b from-cyan to-volt opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden
                  />
                  <span
                    className="pointer-events-none absolute -right-1 -top-4 select-none font-mono text-[3.25rem] font-bold leading-none text-white/[0.045]"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan/30 bg-gradient-to-br from-cyan/20 to-volt/10 text-cyan shadow-[0_0_22px_-8px_rgba(34,211,238,0.65)]">
                    <DifferentiatorGlyph icon={d.icon} className="h-[18px] w-[18px]" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-base font-semibold leading-snug text-white">{d.title}</h3>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-400">{d.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="relative">
            <div className="glass relative overflow-hidden rounded-3xl p-6 sm:p-8">
              <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-cyan/10 blur-3xl" />
              <div className="absolute -bottom-10 -left-10 h-56 w-56 rounded-full bg-volt/10 blur-3xl" />

              <h3 className="text-lg font-semibold text-white">Misión</h3>
              <p className="mt-2 leading-relaxed text-slate-400">
                Que cualquier negocio, planta u hogar tenga tecnología que funcione y equipos que no se
                paren, con precios que se respetan.
              </p>

              <h3 className="mt-6 text-lg font-semibold text-white">Visión</h3>
              <p className="mt-2 leading-relaxed text-slate-400">
                Ser el socio técnico de confianza de la región: un solo proveedor para lo digital y lo
                industrial.
              </p>

              <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-2xl border border-edge/70 bg-white/[0.03] px-3 py-4 text-center">
                    <dt className="font-mono text-2xl font-bold tracking-tight text-white sm:text-3xl">{s.value}</dt>
                    <dd className="mt-1 text-[11px] uppercase tracking-[0.16em] text-slate-500">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
