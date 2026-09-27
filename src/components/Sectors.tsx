import { motion } from 'framer-motion'
import { sectors } from '../data/sectors'
import { SectorGlyph } from './Glyphs'
import { fadeUp, fadeUpStagger } from '../lib/motion'
import { Reveal } from '../lib/Reveal'

const container = fadeUpStagger(0.07)
const item = fadeUp

export function Sectors() {
  return (
    <section id="sectores" className="relative overflow-hidden py-14 sm:py-16">
      <div className="shell relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Sectores</span>
          <h2 className="title mt-3">Para negocios que no conocen el freno</h2>
          <p className="lede mt-4 text-balance">
            Cada sector tiene sus exigencias. Por eso el diagnóstico se hace con criterio técnico.
          </p>
        </Reveal>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {sectors.map((s) => (
            <motion.div
              key={s.title}
              variants={item}
              className="glass card-hover rounded-2xl p-5"
            >
              <div className="flex items-start gap-3.5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-cyan/40 bg-cyan/10 text-cyan">
                  <SectorGlyph icon={s.icon} className="h-[18px] w-[18px]" />
                </span>
                <div>
                  <h3 className="text-[15.5px] font-semibold text-white">{s.title}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-400">{s.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
