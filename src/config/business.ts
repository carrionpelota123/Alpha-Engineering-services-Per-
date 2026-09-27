export const business = {
  name: 'Alpha Engineering Services Perú',
  /** Versión corta para navbar y chat, donde el nombre completo no cabe */
  brandShort: 'Alpha Engineering',
  brandSub: 'SERVICES PERÚ',
  tagline: 'Donde la industria y la tecnología se unen para innovar.',
  description:
    'Soporte técnico, redes, cámaras, sistemas a medida, ingeniería industrial y servicios generales para negocios y hogares.',
  whatsapp: '51956071379',
  email: 'alphaengineeringservicesperu@gmail.com',
  city: 'Piura',
  coverage: 'Todo Piura',
  mapQuery: 'Piura, Perú',
  region: 'Piura, Perú',
  countryCode: 'PE',
  phoneHint: '956 071 379',
  hours: 'Lun a Sáb, 9:00 - 19:00',
  currency: 'S/',
  formspreeId: '',
  legalName: 'Alpha Engineering Services Perú',
  social: {
    facebook: '',
    instagram: '',
  },
} as const

export type WaNumber = {
  /** Con prefijo de pais, para el enlace de WhatsApp */
  digits: string
  /** Como se muestra en pantalla */
  display: string
  /**
   * Dueño del numero. El mensaje se dirige a el por nombre, para que sepa de
   * entrada que la consulta es suya y no de otro socio. Poner "Nombre" para
   * dejar el saludo sin destinatario hasta que se complete.
   */
  owner: string
}

/** Los 3 numeros de WhatsApp. Ninguno se muestra en la web. */
export const whatsappNumbers: WaNumber[] = [
  { digits: '51956071379', display: '956 071 379', owner: 'Erick Carrion' },
  { digits: '51904352270', display: '904 352 270', owner: 'Gustavo Florian' },
  { digits: '51990361978', display: '990 361 978', owner: 'Daniel Zapata' },
]

export const primaryNumber = whatsappNumbers[0]

const TURNO_KEY = 'alpha-engineering:wa-turno'

/**
 * Reparte las consultas entre los 3 numeros por orden, sin mostrarlos nunca.
 * La primera va al primero, la segunda al segundo, la tercera al tercero y
 * vuelve a empezar. El turno se guarda en el navegador para que una misma
 * persona nosiempre caiga en el mismo socio.
 */
export function nextWaNumber(): WaNumber {
  let i = 0
  try {
    const guardado = Number(localStorage.getItem(TURNO_KEY))
    if (Number.isFinite(guardado) && guardado >= 0) {
      i = Math.trunc(guardado) % whatsappNumbers.length
    }
  } catch {
    /* modo privado o sin storage: siempre el primero */
  }

  const elegido = whatsappNumbers[i]

  try {
    localStorage.setItem(TURNO_KEY, String((i + 1) % whatsappNumbers.length))
  } catch {
    /* sin storage no se recuerda el turno */
  }

  return elegido
}

/**
 * Enlace universal de WhatsApp. Abre la app si esta instalada y, si no, cae a
 * la version web. Si no se pasa numero, usa el primero.
 */
export const waLink = (message: string, numero: WaNumber = primaryNumber) =>
  `https://wa.me/${numero.digits.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`

/**
 * Esquema propio de la app. Es el unico que abre WhatsApp de verdad; los
 * enlaces https siempre terminan en el navegador.
 */
const waAppLink = (message: string, numero: WaNumber) =>
  `whatsapp://send?phone=${numero.digits.replace(/\D/g, '')}&text=${encodeURIComponent(message)}`

/**
 * Abre la app de WhatsApp con el mensaje ya escrito, en el celular y en la
 * computadora. Primero intenta el esquema de la app; si en 2 segundos no se
 * logro salir de la pagina, es que no hay app instalada y se cae al enlace
 * universal en una pestana nueva, para no perder lo que el visitor ya escribio.
 */
export const openWaChat = (message: string, numero: WaNumber) => {
  let salioDeLaPagina = false
  const marcarSalida = () => {
    salioDeLaPagina = true
  }

  document.addEventListener('visibilitychange', marcarSalida, { once: true })
  window.addEventListener('pagehide', marcarSalida, { once: true })

  window.location.href = waAppLink(message, numero)

  window.setTimeout(() => {
    document.removeEventListener('visibilitychange', marcarSalida)
    window.removeEventListener('pagehide', marcarSalida)
    if (salioDeLaPagina || document.hidden) return

    const pestana = window.open(waLink(message, numero), '_blank', 'noopener,noreferrer')
    if (!pestana) {
      window.location.href = waLink(message, numero)
    }
  }, 2000)
}

/**
 * Asigna el turno, arma el mensaje con el nombre del dueño de ese numero y
 * abre el chat. El mensaje se recibe como función para que cada quien arme el
 * suyo sabiendo a quien va dirigido.
 */
export function startWaChat(armarMensaje: (owner: string) => string): void {
  const numero = nextWaNumber()
  openWaChat(armarMensaje(numero.owner), numero)
}


export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(business.mapQuery)}&output=embed`
export const mapDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.mapQuery)}`
