import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Send } from 'lucide-react'
import { business, startWaChat } from '../config/business'
import { buildWaQuickQuote } from '../lib/waMessage'

const links = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#proceso', label: 'Proceso' },
  { href: '#cobertura', label: 'Cobertura' },
  { href: '#contacto', label: 'Contacto' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'border-b border-edge/70 bg-void/85 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <nav className="shell flex h-[68px] items-center justify-between">
        <a href="#top" className="group flex items-center gap-2.5">
          <picture>
            <source srcSet="/logo-320.webp" type="image/webp" />
            <img
              src="/logo-320.png"
              alt={business.name}
              width={320}
              height={261}
              className="h-10 w-auto shrink-0 sm:h-11"
            />
          </picture>
          <span className="flex flex-col leading-none">
            <span className="text-[17px] font-bold tracking-tight text-white">{business.brandShort}</span>
            <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-cyan">
              {business.brandSub}
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-white/[0.04] hover:text-cyan"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => startWaChat((owner) => buildWaQuickQuote(owner))}
            className="hidden items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-emerald-400 hover:shadow-[0_0_28px_-6px_rgba(16,185,129,0.8)] sm:inline-flex"
          >
            <Send className="h-4 w-4" />
            Cotizar
          </button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-lg border border-edge bg-white/[0.03] text-slate-300 transition-colors hover:border-cyan/50 hover:text-cyan md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="overflow-hidden border-t border-edge/70 bg-void/97 backdrop-blur-xl md:hidden"
          >
            <ul className="shell flex flex-col gap-1 py-4">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-[15px] font-medium text-slate-300 transition-colors hover:bg-cyan/[0.08] hover:text-cyan"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-2 sm:hidden">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    startWaChat((owner) => buildWaQuickQuote(owner))
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-3 text-sm font-semibold text-white"
                >
                  <Send className="h-4 w-4" />
                  Cotizar ahora
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
