import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ShieldCheck, Mail } from 'lucide-react'
import { business } from '../config/business'
import { privacy } from '../data/privacy'

type Props = {
  open: boolean
  onClose: () => void
}

export function PrivacyModal({ open, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    closeRef.current?.focus()

    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-6"
        >
          <button
            type="button"
            aria-label="Cerrar aviso de privacidad"
            onClick={onClose}
            className="absolute inset-0 bg-void/85 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="privacy-title"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="glass relative flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl sm:rounded-3xl"
          >
            <div className="flex items-start justify-between gap-4 border-b border-edge/70 p-6">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-cyan/40 bg-cyan/10 text-cyan">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <div>
                  <h2 id="privacy-title" className="text-lg font-semibold text-white">
                    Aviso de privacidad
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-500">Última actualización: {privacy.lastUpdated}</p>
                </div>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Cerrar"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-edge text-slate-400 transition-colors hover:border-cyan/50 hover:text-cyan"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <p className="text-[15px] leading-relaxed text-slate-300">{privacy.intro}</p>

              <div className="mt-6 space-y-5">
                {privacy.sections.map((s) => (
                  <section key={s.heading}>
                    <h3 className="text-[15px] font-semibold text-white">{s.heading}</h3>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-slate-400">{s.body}</p>
                  </section>
                ))}
              </div>

              <div className="mt-7 rounded-2xl border border-cyan/25 bg-cyan/[0.05] p-5">
                <h3 className="text-[15px] font-semibold text-white">Ejercicio de derechos</h3>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-slate-400">
                  Para acceder, rectificar, cancelar u oponerte al tratamiento de tus datos, escríbenos a:
                </p>
                <a
                  href={`mailto:${business.email}`}
                  className="mt-3 inline-flex items-center gap-2 text-[15px] font-medium text-cyan hover:underline"
                >
                  <Mail className="h-4 w-4" />
                  {business.email}
                </a>
              </div>
            </div>

            <div className="border-t border-edge/70 p-6">
              <button type="button" onClick={onClose} className="btn-primary w-full justify-center">
                Entendido
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
