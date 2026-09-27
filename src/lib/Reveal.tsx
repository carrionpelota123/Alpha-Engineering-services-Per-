import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { EASE } from './motion'

type RevealProps = {
  children: React.ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'ul' | 'li'
}

const variants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: d, duration: 0.6, ease: EASE },
  }),
}

export function Reveal({ children, delay = 0, className, as = 'div' }: RevealProps) {
  const Tag = motion[as]
  return (
    <Tag variants={variants} initial="hidden" animate="show" custom={delay} className={className}>
      {children}
    </Tag>
  )
}
