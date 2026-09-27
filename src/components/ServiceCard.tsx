import { useEffect, useId, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, Check, Send } from 'lucide-react'
import type { Service } from '../data/services'
import { startWaChat } from '../config/business'
import { buildWaQuickQuote } from '../lib/waMessage'
import { ServiceGlyph } from './Glyphs'
import { groupTone } from '../lib/groupTone'

type ServiceCardProps = {
  service: Service
  open: boolean
  onToggle: () => void
}

const EASE = [0.22, 1, 0.36, 1] as const
const DURATION = 0.28
/** Espera a que termine laExpansion antes de medir la tarjeta */
const SETTLE_MS = 300

export function ServiceCard({ service, open, onToggle }: ServiceCardProps) {
  const panelId = useId()
  const articleRef = useRef<HTMLElement>(null)

  /**
   * Al expandirse, la tarjeta crece hacia abajo. Si queda cortada por el borde
   * inferior de la ventana, la desplazamos just lo necesario para que el detalle
   * que el usuario acaba de abrir quede entero a la vista.
   */
  useEffect(() => {
    if (!open) return
    const timer = window.setTimeout(() => {
      const el = articleRef.current
      if (!el) return
      const HEADER = 76
      const rect = el.getBoundingClientRect()
      const overflowBottom = rect.bottom - (window.innerHeight - 16)
      if (overflowBottom > 0) {
        window.scrollBy({ top: overflowBottom, behavior: 'smooth' })
      } else if (rect.top < HEADER) {
        window.scrollBy({ top: rect.top - HEADER, behavior: 'smooth' })
      }
    }, SETTLE_MS)
    return () => window.clearTimeout(timer)
  }, [open])

  return (
    <motion.article
      ref={articleRef}
      layout
      transition={{ layout: { duration: DURATION, ease: EASE } }}
      className={`group glass card-hover flex h-full flex-col rounded-2xl transition-colors ${
        open ? 'border-cyan/45' : ''
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full flex-1 items-start gap-3.5 rounded-2xl p-5 text-left"
      >
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${groupTone[service.group]}`}
        >
          <ServiceGlyph icon={service.icon} className="h-5 w-5" />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-[15.5px] font-semibold leading-snug text-white">{service.title}</h3>
            <span
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-edge/70 bg-white/[0.04] text-slate-400 transition group-hover:border-cyan/40 group-hover:text-cyan"
              aria-hidden
            >
              <Plus className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? 'rotate-45' : ''}`} />
            </span>
          </div>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-slate-400">{service.desc}</p>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: DURATION, ease: EASE }}
            className="overflow-hidden"
          >
            <ul className="space-y-2 border-t border-edge/60 px-5 pb-4 pt-3.5">
              {service.details.map((d) => (
                <li key={d} className="flex items-start gap-2.5 text-[13.5px] leading-snug text-slate-300">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-volt" />
                  {d}
                </li>
              ))}
            </ul>

            <div className="px-5 pb-5">
              <button
                type="button"
                onClick={() => startWaChat((owner) => buildWaQuickQuote(owner, service.title))}
                className="btn-ghost w-full justify-center py-2.5 text-[13px]"
              >
                <Send className="h-[15px] w-[15px]" />
                Cotizar este servicio
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}
