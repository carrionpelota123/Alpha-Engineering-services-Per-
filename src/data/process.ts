export type Step = {
  step: string
  title: string
  desc: string
}

export const processSteps: Step[] = [
  {
    step: '01',
    title: 'Diagnóstico',
    desc: 'Nos describes el problema. Identificamos el área y el rango de inversión.',
  },
  {
    step: '02',
    title: 'Cotización cerrada',
    desc: 'Inspección en sitio. Precio cerrado de materiales y mano de obra, por separado.',
  },
  {
    step: '03',
    title: 'Ejecución',
    desc: 'Trabaja el especialista de la especialidad, con materiales normalizados.',
  },
  {
    step: '04',
    title: 'Entrega y garantía',
    desc: 'Trabajo probado y documentado, con garantía por escrito.',
  },
]
