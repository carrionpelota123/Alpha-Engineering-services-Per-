import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Send, Sparkles, RotateCcw, FileText } from 'lucide-react'
import { business, startWaChat } from '../config/business'
import { responder, menuInicio } from '../lib/chatbot'
import type { BotCta } from '../lib/chatbot'
import { WhatsappLogo } from './WhatsappLogo'

type Msg = {
  from: 'bot' | 'user'
  text: string
  chips?: string[]
  cta?: BotCta
}

/** Convierte el marcado de WhatsApp en negritas reales. */
function formatear(texto: string) {
  return texto.split('\n').map((linea, i) => {
    const partes = linea.split(/(\*[^*]+\*)/g).filter(Boolean)
    return (
      <span key={i} className="block">
        {partes.map((p, j) =>
          p.startsWith('*') && p.endsWith('*') && p.length > 2 ? (
            <strong key={j} className="font-semibold text-white">
              {p.slice(1, -1)}
            </strong>
          ) : p.startsWith('_') && p.endsWith('_') && p.length > 2 ? (
            <em key={j}>{p.slice(1, -1)}</em>
          ) : (
            <span key={j}>{p}</span>
          ),
        )}
      </span>
    )
  })
}

export function ChatWidget() {
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([{ from: 'bot', ...menuInicio }])
  const [draft, setDraft] = useState('')
  const [pensando, setPensando] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 240)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const t = window.setTimeout(() => inputRef.current?.focus(), 280)
    return () => {
      document.removeEventListener('keydown', onKey)
      window.clearTimeout(t)
    }
  }, [open])

  /** Baja al final del chat cada vez que hay algo nuevo */
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [msgs, pensando])

  const preguntar = (texto: string) => {
    const limpio = texto.trim()
    if (!limpio || pensando) return

    setDraft('')
    setMsgs((m) => [...m, { from: 'user', text: limpio }])
    setPensando(true)

    // Pausa corta para que se sienta que está escribiendo
    window.setTimeout(
      () => {
        const r = responder(limpio, msgs.length <= 1)
        setMsgs((m) => [...m, { from: 'bot', text: r.text, chips: r.chips, cta: r.cta }])
        setPensando(false)
        if (r.reset) setMsgs([{ from: 'bot', ...menuInicio }])
      },
      520 + (limpio.length % 6) * 80,
    )
  }

  const reiniciar = () => {
    setMsgs([{ from: 'bot', ...menuInicio }])
    setDraft('')
  }

  const ctaClick = (cta: BotCta) => {
    if (cta === 'form') {
      document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
      setOpen(false)
    } else {
      startWaChat((owner) => {
        const nombre = owner.trim()
        return `Hola${nombre ? ` ${nombre}` : ''}, ${business.name} aquí. El cliente pidió hablar con un socio desde el chat de la web.`
      })
    }
  }

  const ultimoBot = [...msgs].reverse().find((m) => m.from === 'bot')

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6"
        >
          <AnimatePresence>
            {open && (
              <motion.div
                ref={panelRef}
                role="dialog"
                aria-label={`Asistente de ${business.name}`}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="glass flex max-h-[min(620px,80vh)] w-[calc(100vw-2.5rem)] max-w-[370px] origin-bottom-right flex-col overflow-hidden rounded-2xl shadow-[0_20px_70px_-20px_rgba(0,0,0,0.9)]"
              >
                <div className="flex items-center gap-3 border-b border-edge/70 bg-emerald-600/15 p-4">
                  <span className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full bg-void">
                    <picture>
                      <source srcSet="/logo-320.webp" type="image/webp" />
                      <img
                        src="/logo-320.png"
                        alt=""
                        width={320}
                        height={261}
                        className="h-8 w-auto object-contain"
                      />
                    </picture>
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-panel bg-emerald-400" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[15px] font-semibold text-white">{business.brandShort}</p>
                    <p className="flex items-center gap-1 text-[12px] text-emerald-300">
                      <Sparkles className="h-3 w-3" />
                      Responde al instante
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={reiniciar}
                    aria-label="Reiniciar conversación"
                    title="Reiniciar conversación"
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Cerrar chat"
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div ref={scrollRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
                  {msgs.map((m, i) =>
                    m.from === 'bot' ? (
                      <div key={i} className="flex flex-col gap-2">
                        <div className="max-w-[88%] self-start rounded-2xl rounded-bl-sm border border-edge/60 bg-white/[0.04] px-3.5 py-2.5 text-[14px] leading-relaxed text-slate-200">
                          {formatear(m.text)}
                        </div>
                        {i === msgs.length - 1 && m.cta && (
                          <button
                            type="button"
                            onClick={() => ctaClick(m.cta!)}
                            className="flex max-w-[88%] items-center justify-center gap-2 self-start rounded-xl bg-emerald-500 px-3.5 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-emerald-400"
                          >
                            {m.cta === 'form' ? (
                              <>
                                <FileText className="h-4 w-4" />
                                Cotizar ahora
                              </>
                            ) : (
                              <>
                                <WhatsappLogo className="h-4 w-4" />
                                Hablar con un socio
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    ) : (
                      <div
                        key={i}
                        className="max-w-[88%] self-end rounded-2xl rounded-br-sm bg-emerald-600/25 px-3.5 py-2.5 text-[14px] leading-relaxed text-white"
                      >
                        {m.text}
                      </div>
                    ),
                  )}

                  {pensando && (
                    <div className="flex max-w-[88%] items-center gap-1.5 self-start rounded-2xl rounded-bl-sm border border-edge/60 bg-white/[0.04] px-4 py-3">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="h-1.5 w-1.5 rounded-full bg-slate-400"
                          animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
                          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {!pensando && ultimoBot?.chips && ultimoBot.chips.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 border-t border-edge/60 px-3.5 py-3">
                    {ultimoBot.chips.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => preguntar(c)}
                        className="rounded-full border border-emerald-500/30 bg-emerald-500/[0.07] px-3 py-1.5 text-[12.5px] leading-tight text-emerald-100 transition-colors hover:border-emerald-400/60 hover:bg-emerald-500/[0.16]"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}

                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    preguntar(draft)
                  }}
                  className="flex items-center gap-2 border-t border-edge/70 p-3"
                >
                  <input
                    ref={inputRef}
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="Escribe tu pregunta..."
                    aria-label="Mensaje"
                    className="min-w-0 flex-1 rounded-lg border border-edge bg-white/[0.04] px-3 py-2.5 text-[14px] text-white placeholder:text-slate-500 outline-none transition-colors focus:border-emerald-500/60"
                  />
                  <button
                    type="submit"
                    aria-label="Enviar"
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-emerald-500 text-white transition-colors hover:bg-emerald-400"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>

                <p className="border-t border-edge/40 bg-white/[0.02] px-4 py-2 text-center text-[10.5px] leading-relaxed text-slate-500">
                  Bot de atención inmediata. {business.hours} para hablar con un socio.                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Cerrar chat' : 'Abrir chat'}
            className="group relative grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-white shadow-[0_10px_50px_-12px_rgba(16,185,129,0.95)] transition-all hover:scale-105 hover:bg-emerald-400"
          >
            <span className="absolute inset-0 animate-pulse-glow rounded-full bg-emerald-400/50 blur-lg" />
            <span className="relative grid place-items-center">
              {open ? (
                <X className="h-6 w-6" />
              ) : (
                <>
                  <WhatsappLogo className="h-7 w-7" />
                  <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-void bg-volt" />
                </>
              )}
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
