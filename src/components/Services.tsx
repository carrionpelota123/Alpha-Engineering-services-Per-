import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { services, groupLabels, groupHints } from '../data/services'
import type { ServiceGroup } from '../data/services'
import { ServiceCard } from './ServiceCard'
import { groupTone } from '../lib/groupTone'
import { fadeUp, fadeUpStagger } from '../lib/motion'

const groups = Object.keys(groupLabels) as ServiceGroup[]

export function Services() {
  const [active, setActive] = useState<ServiceGroup>('tecnologia')
  const [openTitle, setOpenTitle] = useState<string | null>(null)
  const visible = services.filter((s) => s.group === active)

  /** Al cambiar de categoría se cierra la tarjeta abierta */
  const selectGroup = (g: ServiceGroup) => {
    setActive(g)
    setOpenTitle(null)
  }

  /** Acordeón: abrir una tarjeta cierra la anterior */
  const toggleCard = (title: string) =>
    setOpenTitle((current) => (current === title ? null : title))

  return (
    <section id="servicios" className="relative overflow-hidden py-20 sm:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />
      <div className="shell relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Servicios</span>
          <h2 className="title mt-3">Dos áreas técnicas, un solo responsable</h2>
          <p className="lede mt-4 text-balance">
            Precio cerrado y un diagnóstico que se hace con criterio, no con una receta igual para todos.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3">
          <div
            role="tablist"
            aria-label="Categorías de servicios"
            className="flex w-full flex-wrap justify-center gap-2 sm:w-auto"
          >
            {groups.map((g) => (
              <button
                key={g}
                role="tab"
                type="button"
                aria-selected={active === g}
                onClick={() => selectGroup(g)}
                className={`rounded-full border px-4 py-2 text-[13.5px] font-medium transition ${
                  active === g
                    ? groupTone[g]
                    : 'border-edge/70 bg-white/[0.03] text-slate-400 hover:border-slate-500 hover:text-slate-200'
                }`}
              >
                {groupLabels[g]}
                <span className="ml-2 font-mono text-[11px] opacity-70">
                  {services.filter((s) => s.group === g).length}
                </span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={active}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="text-center text-[14px] text-slate-500"
            >
              {groupHints[active]}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.div
          key={active}
          variants={fadeUpStagger(0.05)}
          initial="hidden"
          animate="show"
          className="mt-8 grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visible.map((s) => (
            <motion.div key={s.title} variants={fadeUp} className="h-full">
              <ServiceCard
                service={s}
                open={openTitle === s.title}
                onToggle={() => toggleCard(s.title)}
              />
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-8 text-center text-[13.5px] text-slate-500">
          ¿No ves lo que buscas?{' '}
          <a href="#contacto" className="text-cyan underline-offset-4 hover:underline">
            Cuéntanos tu caso
          </a>{' '}
          y lo cotizamos a medida.
        </p>
      </div>
    </section>
  )
}
