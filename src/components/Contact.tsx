import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Clock, Mail, Send, CheckCircle2, Loader2, MessageCircle, ShieldCheck } from 'lucide-react'
import { business, startWaChat } from '../config/business'
import { services, groupLabels } from '../data/services'
import type { ServiceGroup } from '../data/services'
import { WhatsappLogo } from './WhatsappLogo'
import { buildWaMessage } from '../lib/waMessage'

/** Servicios agrupados, para el selector del formulario */
const serviceOptions: string[] = (Object.keys(groupLabels) as ServiceGroup[]).flatMap(
  (g) => services.filter((s) => s.group === g).map((s) => s.title),
)

type Status = 'idle' | 'sending' | 'sent' | 'error'

type Fields = {
  nombre: string
  servicio: string
}

export function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const hasEmailRoute = business.formspreeId.length > 0

  /** El sistema asigna el numero por orden y abre el chat en esta misma pestana. */
  const enviar = (f: Fields) => startWaChat((owner) => buildWaMessage(f, owner))

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    const fields: Fields = {
      nombre: String(data.get('nombre') ?? '').trim(),
      servicio: String(data.get('servicio') ?? '').trim(),
    }

    // Sin correo configurado: se abre el chat con el mensaje ya escrito
    if (!hasEmailRoute) {
      enviar(fields)
      return
    }

    setStatus('sending')
    setError('')

    // Asunto del correo, para que se identifique la cotizacion de un vistazo
    data.set('_subject', `Nueva cotizacion: ${fields.servicio || 'consulta'} - ${fields.nombre}`)

    try {
      const res = await fetch(`https://formspree.io/f/${business.formspreeId}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
      setError('No pudimos enviar el correo. Te llevamos al chat para que no te quedes sin respuesta.')
      enviar(fields)
    }
  }

  return (
    <section id="contacto" className="relative overflow-hidden py-14 sm:py-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />
      <div className="shell relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Contacto</span>
          <h2 className="title mt-3">Listos para resolver tu problema hoy mismo</h2>
          <p className="lede mt-4 text-balance">
            {hasEmailRoute
              ? 'Envíanos el formulario y te respondemos el mismo día hábil, o escríbenos directo por WhatsApp.'
              : 'Escríbenos por WhatsApp o llena el formulario y te respondemos el mismo día hábil.'}
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="glass flex h-full flex-col gap-5 rounded-3xl p-6 sm:p-8">
              <div>
                <h3 className="text-lg font-semibold text-white">Datos de contacto</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  Atención técnica directa en {business.coverage}.
                </p>
              </div>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-9 w-9 place-items-center rounded-lg border border-cyan/40 bg-cyan/10 text-cyan">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[15px] font-medium text-white">Cobertura</p>
                    <p className="text-sm text-slate-400">{business.coverage}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-9 w-9 place-items-center rounded-lg border border-cyan/40 bg-cyan/10 text-cyan">
                    <Clock className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[15px] font-medium text-white">Horarios</p>
                    <p className="text-sm text-slate-400">{business.hours}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-9 w-9 place-items-center rounded-lg border border-emerald-400/40 bg-emerald-400/10 text-emerald-400">
                    <MessageCircle className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[15px] font-medium text-white">WhatsApp</p>
                    <p className="text-sm leading-relaxed text-slate-400">
                      Envía tu solicitud y te llevamos directo al chat con el mensaje ya escrito. Nuestro
                      número no se muestra en la web.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-9 w-9 place-items-center rounded-lg border border-cyan/40 bg-cyan/10 text-cyan">
                    <Mail className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[15px] font-medium text-white">Correo</p>
                    <a href={`mailto:${business.email}`} className="text-sm break-all text-cyan hover:underline">
                      {business.email}
                    </a>
                  </div>
                </li>
              </ul>

              <div className="mt-auto flex flex-col gap-2 pt-2">
                <a href={`mailto:${business.email}`} className="btn-ghost w-full justify-center">
                  <Mail className="h-4 w-4" />
                  Mandar correo
                </a>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="glass flex flex-col gap-5 rounded-3xl p-6 sm:p-8"
            >
              {status === 'sent' && (
                <div className="flex items-start gap-3 rounded-xl border border-volt/30 bg-volt/[0.07] p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-volt" />
                  <p className="text-[14.5px] leading-relaxed text-slate-300">
                    Recibimos tu mensaje. Te respondemos el mismo día hábil. Si es urgente, escríbenos por
                    WhatsApp.
                  </p>
                </div>
              )}

              {status === 'error' && (
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/[0.07] p-4 text-[14.5px] leading-relaxed text-amber-200">
                  {error}
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label htmlFor="nombre" className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                  Tu nombre
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  required
                  autoComplete="name"
                  placeholder="Escribe tu nombre"
                  className="w-full rounded-xl border border-edge bg-white/[0.03] px-4 py-3 text-[15px] text-white placeholder:text-slate-500 outline-none transition-colors focus:border-cyan/60 focus:bg-white/[0.06]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="servicio" className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                  ¿Qué necesitas?
                </label>
                <select
                  id="servicio"
                  name="servicio"
                  required
                  defaultValue=""
                  className="w-full appearance-none rounded-xl border border-edge bg-white/[0.03] px-4 py-3 text-[15px] text-white outline-none transition-colors focus:border-cyan/60 focus:bg-white/[0.06]"
                >
                  <option value="" className="bg-panel">
                    Elige un área
                  </option>
                  {serviceOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-panel">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary mt-1 w-full justify-center disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="h-[18px] w-[18px] animate-spin" />
                    Enviando
                  </>
                ) : hasEmailRoute ? (
                  <>
                    <Send className="h-[18px] w-[18px]" />
                    Cotizar
                  </>
                ) : (
                  <>
                    <WhatsappLogo className="h-[18px] w-[18px]" />
                    Cotizar
                  </>
                )}
              </button>

              <p className="text-center text-[13px] leading-relaxed text-slate-500">
                Sin registros ni llamadas. Te escribimos por WhatsApp con la cotización.
              </p>

              <p className="flex items-start gap-2 text-[12px] leading-relaxed text-slate-500">
                <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                {hasEmailRoute
                  ? 'Usamos tus datos solo para responderte. No los compartimos con terceros. Consulta el aviso de privacidad en el pie de página.'
                  : 'Te llevamos al chat de WhatsApp con tu mensaje ya escrito. No mostramos nuestros números ni guardamos tu consulta en ningún servidor.'}
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
