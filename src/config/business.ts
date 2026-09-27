export const business = {
  name: 'Alpha Engineering Services Perú',
  /** Versión corta para navbar y chat, donde el nombre completo no cabe */
  brandShort: 'Alpha Engineering',
  brandSub: 'SERVICES PERÚ',
  tagline: 'Donde la industria y la tecnología se unen para innovar.',
  description:
    'Soporte técnico, redes, cámaras, sistemas a medida, ingeniería industrial y servicios generales para negocios y hogares.',
  whatsapp: '51956071379',
  email: 'contacto@ejemplo.com',
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

/** Enlace de WhatsApp Web. Si no se pasa numero, usa el primero. */
export const waLink = (message: string, numero: WaNumber = primaryNumber) =>
  `https://web.whatsapp.com/send?phone=${numero.digits}&text=${encodeURIComponent(message)}`

/**
 * Abre el chat en una pestana nueva para que la web no se cierre.
 * Se llama directo desde el clic del visitante, que es lo que los
 * navegadores exigen para no bloquearla como ventana emergente.
 */
export const openWaChat = (message: string, numero: WaNumber) => {
  const pestana = window.open(waLink(message, numero), '_blank', 'noopener,noreferrer')
  // Si el navegador lo bloqueo, avisamos en vez de dejar que no pase nada
  if (!pestana) {
    window.alert('Permite las ventanas emergentes para abrir WhatsApp, o vuelve a presionar el botón.')
  }
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
