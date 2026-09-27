export type DifferentiatorIcon = 'users' | 'badge' | 'gauge' | 'shield-check'

export type Differentiator = {
  icon: DifferentiatorIcon
  title: string
  desc: string
}

export const differentiators: Differentiator[] = [
  {
    icon: 'users',
    title: 'Ingenieros de la especialidad',
    desc: 'Tu caso lo revisa quien corresponde, no un centro de llamadas.',
  },
  {
    icon: 'badge',
    title: 'Cotizaciones',
    desc: 'Precios acorde al mercado.',
  },
  {
    icon: 'gauge',
    title: 'Diagnóstico documentado',
    desc: 'Te entregamos el análisis escrito y el costo de cada alternativa.',
  },
  {
    icon: 'shield-check',
    title: 'Garantía por escrito',
    desc: 'El alcance y la garantía quedan en la cotización.',
  },
]

export type Stat = {
  value: string
  label: string
}

/**
 * Cifras verificables en el codigo: 2 grupos de servicios, 12 servicios en
 * total, un solo equipo y la respuesta que ya se promete en los chips del hero.
 * No se inventan metricas de antiguedad, clientes ni porcentajes.
 */
export const stats: Stat[] = [
  { value: '<24h', label: 'Respuesta' },
  { value: '2', label: 'Áreas' },
  { value: '12', label: 'Servicios' },
  { value: '1', label: 'Equipo' },
]
