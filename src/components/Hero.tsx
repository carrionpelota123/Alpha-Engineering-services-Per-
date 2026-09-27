import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react'
import { business, startWaChat } from '../config/business'
import { Reveal } from '../lib/Reveal'
import { buildWaQuickQuote } from '../lib/waMessage'

const issues = [
  'tu computadora va lenta',
  'el wifi no llega al taller',
  'las cámaras no graban',
  'la máquina se detiene en producción',
  'el tablero eléctrico sin protección',
]

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[86svh] items-start overflow-hidden pt-[68px]">
      <div className="shell w-full py-10 sm:py-14">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal delay={0} className="flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/[0.07] px-3.5 py-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan" />
              </span>
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-cyan">
                Atención técnica profesional
              </span>
            </span>
          </Reveal>

          <Reveal
            as="h1"
            delay={0.08}
            className="mx-auto mt-7 max-w-4xl text-3xl font-bold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            Donde la industria
            <br />
            y la tecnología
            <br />
            <span className="glow-text">se unen para innovar.</span>
          </Reveal>

          <Reveal as="p" delay={0.16} className="lede mx-auto mt-6 max-w-2xl text-balance">
            Soporte técnico, redes, videovigilancia, sistemas a medida e ingeniería industrial.{' '}
            <span className="text-cyan">Un solo equipo, una sola llamada.</span>
          </Reveal>

          <Reveal delay={0.24} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => startWaChat((owner) => buildWaQuickQuote(owner))}
              className="btn-primary w-full sm:w-auto"
            >
              <MessageSquare className="h-[18px] w-[18px]" />
              Cotizar ahora
            </button>
            <a href="#servicios" className="btn-ghost w-full sm:w-auto">
              Ver servicios
            </a>
          </Reveal>

          <Reveal as="ul" delay={0.32} className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {[
              { icon: ShieldCheck, text: 'Precio cerrado' },
              { icon: Sparkles, text: 'Garantía escrita' },
              { icon: MessageCircle, text: 'Respuesta menor a 24h' },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-1.5 text-[13px] text-slate-400">
                <Icon className="h-3.5 w-3.5 text-cyan" />
                {text}
              </li>
            ))}
          </Reveal>
        </div>

        <TerminalCard />
      </div>
    </section>
  )
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

function useTypewriter(words: string[]) {
  const reduced = usePrefersReducedMotion()
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduced) return

    const word = words[index % words.length]
    let alive = true
    let char = 0
    let deleting = false
    let timer: number

    const tick = () => {
      if (!alive) return
      char += deleting ? -1 : 1
      setText(word.slice(0, char))

      let delay = deleting ? 28 : 52
      if (!deleting && char === word.length) {
        delay = 1500
        deleting = true
      } else if (deleting && char === 0) {
        deleting = false
        setIndex((i) => (i + 1) % words.length)
        delay = 400
      }
      timer = window.setTimeout(tick, delay)
    }

    timer = window.setTimeout(tick, 350)
    return () => {
      alive = false
      window.clearTimeout(timer)
    }
  }, [index, words, reduced])

  if (reduced) return words[0]
  return text
}

function TerminalCard() {
  const typed = useTypewriter(issues)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto mt-14 w-full max-w-2xl"
    >
      <div className="glass overflow-hidden rounded-2xl shadow-[0_0_70px_-25px_rgba(34,211,238,0.5)]">
        <div className="flex items-center gap-2 border-b border-edge/70 bg-white/[0.02] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
          <span className="ml-2 font-mono text-[11px] text-slate-500">alpha-engineering / diagnostico</span>
        </div>

        <div className="space-y-2 p-5 font-mono text-[12.5px] leading-relaxed sm:p-6 sm:text-[13px]">
          <motion.p
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.4 }}
            className="text-slate-400"
          >
            <span className="text-cyan">$</span> alpha-engineering --diagnostico
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.25, duration: 0.4 }}
            className="text-cyan"
          >
            <span className="text-slate-600">&gt;</span> {typed}
            <span className="ml-0.5 inline-block h-[1.05em] w-[0.5em] translate-y-[0.15em] bg-cyan animate-blink" />
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.5 }}
            className="text-volt"
          >
            <span className="text-slate-600">&gt;</span> listo · presupuesto a medida
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.5 }}
            className="text-volt"
          >
            <span className="text-slate-600">&gt;</span> respuesta {business.hours.toLowerCase()}
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
}
