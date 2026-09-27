import { useEffect, useRef } from 'react'

type Node = { x: number; y: number; vx: number; vy: number; r: number }

const COLORS = ['34,211,238', '163,230,53', '148,163,184']

export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let nodes: Node[] = []
    let w = 0
    let h = 0

    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const seed = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(70, Math.floor(w / 22))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.5 + 0.5,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        const c = COLORS[i % COLORS.length]

        ctx.beginPath()
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${c},0.55)`
        ctx.fill()

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < 15000) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(34,211,238,${(1 - d2 / 15000) * 0.14})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      if (!reduced) {
        for (const n of nodes) {
          n.x += n.vx
          n.y += n.vy
          if (n.x < 0 || n.x > w) n.vx *= -1
          if (n.y < 0 || n.y > h) n.vy *= -1
        }
      }

      raf = requestAnimationFrame(draw)
    }

    seed()
    draw()
    window.addEventListener('resize', seed)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', seed)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-void">
      <div className="absolute inset-0 grid-bg animate-grid-move opacity-[0.55]" />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(760px 520px at 14% 6%, rgba(34,211,238,0.17), transparent 62%), radial-gradient(680px 480px at 86% 24%, rgba(163,230,53,0.11), transparent 60%), radial-gradient(900px 620px at 50% 108%, rgba(14,116,144,0.2), transparent 65%)',
        }}
      />

      <canvas ref={canvasRef} className="absolute inset-0 opacity-70" />

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/60 to-transparent" />

      <div className="absolute inset-0 animate-scan-line">
        <div className="h-24 w-full bg-gradient-to-b from-transparent via-cyan/[0.055] to-transparent" />
      </div>
    </div>
  )
}
