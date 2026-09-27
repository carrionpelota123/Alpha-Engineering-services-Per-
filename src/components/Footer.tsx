import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { business } from '../config/business'
import { PrivacyModal } from './PrivacyModal'

export function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false)
  return (
    <footer className="relative overflow-hidden border-t border-edge/70 bg-void/95 py-12">
      <div className="shell flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <a href="#top" className="flex flex-col leading-none">
            <picture>
              <source srcSet="/logo-320.webp" type="image/webp" />
              <img
                src="/logo-320.png"
                alt={business.name}
                width={320}
                height={261}
                className="mb-4 h-14 w-auto"
              />
            </picture>
            <span className="sr-only">{business.name}</span>
            <span className="text-lg font-bold tracking-tight text-white">{business.brandShort}</span>
            <span className="mt-1.5 text-[9.5px] font-semibold uppercase tracking-[0.22em] text-cyan">
              {business.brandSub}
            </span>
          </a>
          <p className="mt-3 text-sm italic leading-relaxed text-slate-300">{business.tagline}</p>
          <p className="mt-2.5 text-sm leading-relaxed text-slate-400">{business.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
          <div className="flex flex-col gap-3">
            <h3 className="font-medium text-white">Secciones</h3>
            <a href="#servicios" className="text-slate-400 transition-colors hover:text-cyan">
              Servicios
            </a>
            <a href="#nosotros" className="text-slate-400 transition-colors hover:text-cyan">
              Nosotros
            </a>
            <a href="#proceso" className="text-slate-400 transition-colors hover:text-cyan">
              Proceso
            </a>
            <a href="#cobertura" className="text-slate-400 transition-colors hover:text-cyan">
              Cobertura
            </a>
            <a href="#contacto" className="text-slate-400 transition-colors hover:text-cyan">
              Contacto
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-medium text-white">Legal</h3>
            <button
              type="button"
              onClick={() => setPrivacyOpen(true)}
              className="text-left text-slate-400 transition-colors hover:text-cyan"
            >
              Aviso de privacidad
            </button>
            <a href={`mailto:${business.email}`} className="text-slate-400 transition-colors hover:text-cyan">
              Quejas y sugerencias
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-medium text-white">Contacto</h3>
            <a href={`mailto:${business.email}`} className="text-slate-400 transition-colors hover:text-cyan">
              {business.email}
            </a>
            <p className="text-slate-400">{business.hours}</p>
            <p className="text-slate-400">{business.coverage}</p>
          </div>
        </div>
      </div>

      <div className="shell mt-10 flex flex-col items-start justify-between gap-4 border-t border-edge/40 pt-8 sm:flex-row sm:items-center">
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} {business.name}. Todos los derechos reservados.
        </p>
        <a
          href="#top"
          className="inline-flex items-center gap-1.5 rounded-lg border border-edge bg-white/[0.03] px-3 py-2 text-xs font-medium text-slate-300 transition-colors hover:border-cyan/50 hover:text-cyan"
        >
          Volver arriba
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>

      <PrivacyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </footer>
  )
}
