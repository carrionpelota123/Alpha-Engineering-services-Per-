import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { services, groupLabels, groupHints, groupTabs } from '../data/services'
import type { ServiceGroup } from '../data/services'
import { ServiceCard } from './ServiceCard'
import { startWaChat } from '../config/business'
import { buildWaQuickQuote } from '../lib/waMessage'
import { groupTone } from '../lib/groupTone'
import { fadeUp, fadeUpStagger } from '../lib/motion'

const groups = Object.keys(groupLabels) as ServiceGroup[]

export function Services() {
  /** null = solo se ven los botones, sin servicios a la vista. */
  const [active, setActive] = useState<ServiceGroup | null>(null)
  const [openTitle, setOpenTitle] = useState<string | null>(null)
  const visible = active ? services.filter((s) => s.group === active) : []

  /** Presionar el area ya abierta la vuelve a cerrar. Al cambiar, se cierra la tarjeta abierta. */
  const toggleGroup = (g: ServiceGroup) => {
    setActive((current) => (current === g ? null : g))
    setOpenTitle(null)
  }

  /** Acordeón: abrir una tarjeta cierra la anterior */
  const toggleCard = (title: string) =>
    setOpenTitle((current) => (current === title ? null : title))

  return (
    <section id="servicios" className="relative overflow-hidden py-14 sm:py-16">
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
                aria-expanded={active === g}
                aria-selected={active === g}
                onClick={() => toggleGroup(g)}
                className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-[13.5px] font-medium transition ${
                  active === g
                    ? groupTone[g]
                    : 'border-edge/70 bg-white/[0.03] text-slate-400 hover:border-slate-500 hover:text-slate-200'
                }`}
              >
                {groupTabs[g]}
                <span className="font-mono text-[11px] opacity-70">
                  {services.filter((s) => s.group === g).length}
                </span>
                {active === g ? (
                  <ChevronUp className="h-3.5 w-3.5 opacity-80" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {active === null ? (
              <motion.p
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-center text-[14px] text-slate-500"
              >
                Elige un área para ver los servicios.
              </motion.p>
            ) : (
              <motion.div
                key={active}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="w-full overflow-hidden"
              >
                <p className="text-center text-[14px] text-slate-500">{groupHints[active]}</p>

                <motion.div
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="mt-8 text-center text-[13.5px] text-slate-500">
          ¿No ves lo que buscas?{' '}
          <button
            type="button"
            onClick={() => startWaChat((owner) => buildWaQuickQuote(owner))}
            className="text-cyan underline-offset-4 hover:underline"
          >
            Cuéntanos tu caso
          </button>{' '}
          y lo cotizamos a medida.
        </p>
      </div>
    </section>
  )
}
