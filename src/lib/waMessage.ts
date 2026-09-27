import { business } from '../config/business'

export type Cotizacion = {
  nombre?: string
  telefono?: string
  servicio?: string
  zona?: string
  mensaje?: string
  momento?: string
}

function saludoPorHora(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Buenos días'
  if (h < 19) return 'Buenas tardes'
  return 'Buenas noches'
}

/**
 * Destinatatario del saludo. Se usa el nombre completo para que el socio se
 * identifique de un vistazo, con o sin apellido. Mientras el dueño del numero
 * no tenga nombre puesto, no se saluda a nadie en particular, para no mandar un
 * "Buenos dias, Nombre" a un socio de verdad.
 */
function saludoDestinatario(owner: string): string {
  const limpio = owner.trim()
  if (!limpio || /^nombre$/i.test(limpio)) return ''
  return `, ${limpio}`
}

/** Cuadricula saltos de linea y corta si el cliente se pasó de largo. */
function limpiar(texto: string, max = 900): string {
  const limpio = texto.replace(/\r/g, '').replace(/\n{3,}/g, '\n\n').trim()
  return limpio.length > max ? `${limpio.slice(0, max).trim()}…` : limpio
}

/**
 * Texto que llega al WhatsApp del socio que toco en el turno. Va dirigido a el
 * por nombre, y el nombre del cliente aparece como dato para que sepa a quien
 * devolverle la llamada.
 *
 * Pensado para leerse de un vistazo en el celular: saludo corto, datos en lista
 * con vinetas y una sola peticion al final. El asterisco es el negrita y el
 * guion bajo la cursiva de WhatsApp.
 */
export function buildWaMessage(c: Cotizacion, owner: string): string {
  const items: string[] = []

  if (c.nombre?.trim()) items.push(`*Nombre:*  ${limpiar(c.nombre.trim(), 80)}`)
  if (c.servicio?.trim()) items.push(`*Servicio:*  ${c.servicio.trim()}`)
  if (c.zona?.trim()) items.push(`*Zona:*  ${c.zona.trim()}`)
  if (c.momento?.trim()) items.push(`*Contacto preferido:*  ${c.momento.trim()}`)
  if (c.telefono?.trim()) items.push(`*Teléfono:*  ${c.telefono.trim()}`)

  const partes: string[] = [
    `${saludoPorHora()}${saludoDestinatario(owner)} 👋`,
    '',
    `Solicito una cotización con *${business.name}*`,
    items.length > 0 ? '\n' + items.map((i) => `• ${i}`).join('\n') : '',
  ]

  const detalle = c.mensaje?.trim()
  if (detalle) partes.push('', '*Detalle de mi pedido:*', limpiar(detalle))

  partes.push('', '_¿Me confirman disponibilidad y me pasan la cotización?_')

  return partes.join('\n')
}
