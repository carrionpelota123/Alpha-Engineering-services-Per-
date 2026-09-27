import { motion } from 'framer-motion'
import { MapPin, Navigation, Clock, Building2, Truck } from 'lucide-react'
import { business, mapEmbedUrl, mapDirectionsUrl } from '../config/business'

const zones = ['Piura Centro', 'Castilla', 'Paita', 'Sullana', 'catacaos', 'La unión']

const items = [
  { icon: Building2, label: 'Cobertura', value: business.coverage },
  { icon: Truck, label: 'Traslado', value: 'Sujeto a evaluzación' },
  { icon: Clock, label: 'Atención', value: business.hours },
]

export function Coverage() {
  return (
    <section id="cobertura" className="relative overflow-hidden py-14 sm:py-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />
      <div className="shell relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Cobertura</span>
          <h2 className="title mt-3">Damos servicio en toda la zona</h2>
          <p className="lede mt-4 text-balance">
            Cubrimos todo Piura sin costo de traslado. Si estás fuera de la ciudad, cotizamos los viáticos
            antes de salir y te lo confirmamos.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            <div className="glass overflow-hidden rounded-3xl p-2">
              <iframe
                title="Zona de cobertura de Alpha Engineering"
                src={mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[300px] w-full rounded-2xl sm:h-[380px]"
                style={{ border: 0, filter: 'grayscale(0.35) invert(0.92) hue-rotate(180deg) saturate(0.7) brightness(1.05)' }}
              />
              <div className="flex flex-col items-center justify-between gap-3 px-3 py-3 sm:flex-row">
                <p className="flex items-center gap-2 text-sm text-slate-400">
                  <MapPin className="h-4 w-4 text-cyan" />
                  {business.coverage}
                </p>
                <a
                  href={mapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost px-4 py-2.5 text-[13px]"
                >
                  <Navigation className="h-3.5 w-3.5" />
                  Abrir en Google Maps
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4 lg:col-span-2"
          >
            <ul className="glass flex flex-col divide-y divide-edge/60 rounded-3xl">
              {items.map(({ icon: Icon, label, value }) => (
                <li key={label} className="flex items-start gap-3 p-5">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-cyan/40 bg-cyan/10 text-cyan">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[15px] font-medium text-white">{label}</p>
                    <p className="mt-0.5 text-sm text-slate-400">{value}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="glass flex-1 rounded-3xl p-5">
              <h3 className="text-[15px] font-medium text-white">Distritos y zonas frecuentes</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {zones.map((z) => (
                  <span
                    key={z}
                    className="rounded-lg border border-edge bg-white/[0.03] px-3 py-1.5 text-[13px] text-slate-300"
                  >
                    {z}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-[13px] leading-relaxed text-slate-500">
                ¿Estas en otra ciudad o distrito? Escríbenos igual, Piura es el punto de partida pero
                llegamos a donde estés.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
