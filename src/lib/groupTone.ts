import type { ServiceGroup } from '../data/services'

/** Color asociado a cada categoría de servicio */
export const groupTone: Record<ServiceGroup, string> = {
  tecnologia: 'border-cyan/40 bg-cyan/10 text-cyan',
  industrial: 'border-amber-400/40 bg-amber-400/10 text-amber-300',
}
