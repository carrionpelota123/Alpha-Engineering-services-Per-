import { services, groupLabels } from '../data/services'
import { business } from '../config/business'
import { buscarSintoma, textoSintoma } from './diagnostico'

export type BotCta = 'form' | 'wa'

export type BotReply = {
  text: string
  chips: string[]
  cta?: BotCta
  reset?: boolean
}

type Intent = {
  id: string
  keywords: string[]
  reply: () => BotReply
}

/** Quita acentos y pasa a minuscula para comparar sin sorpresas. */
function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

const puntos = (grupo: 'tecnologia' | 'industrial') =>
  services
    .filter((s) => s.group === grupo)
    .map((s) => `• ${s.title}`)
    .join('\n')

const lista = (titulo: string) =>
  services.find((s) => s.title === titulo)?.details.map((d) => `• ${d}`).join('\n') ?? ''

const menuServicios = () =>
  [
    `📡 *${groupLabels.tecnologia}*`,
    puntos('tecnologia'),
    '',
    `🏭 *${groupLabels.industrial}*`,
    puntos('industrial'),
  ].join('\n')

const sinPrecio = `No publicamos tarifas: depende del trabajo y los materiales.\n\nTe lo cotiza el socio que lo ejecuta, con materiales y mano de obra desglosados.`

const intents: Intent[] = [
  {
    id: 'saludo',
    keywords: ['hola', 'buenas', 'buenos dias', 'buenas tardes', 'buenas noches', 'hey', 'que tal', 'ola', 'saludos'],
    reply: () => ({
      text: `Hola 👋 Soy el asistente de *${business.brandShort}*. Respondo al instante.`,
      chips: ['¿Qué servicios manejan?', '¿Cuánto cuesta?', 'Zona de cobertura', 'Horario'],
    }),
  },
  {
    id: 'cotizar',
    keywords: [
      'quiero cotizar',
      'necesito cotizar',
      'cotizar',
      'cotizacion',
      'presupuesto',
      'quiero contratar',
      'me interesa contratar',
      'como hago para cotizar',
    ],
    reply: () => ({
      text: `Te cotizamos sin compromiso.\n\nElige el servicio y deja tu zona: te responde el socio de esa especialidad.`,
      chips: [
        'Soporte técnico',
        'Videovigilancia',
        'Mantenimiento industrial',
        'Instalaciones eléctricas',
      ],
      cta: 'form',
    }),
  },
  {
    id: 'precios',
    keywords: ['precio', 'precios', 'costo', 'costos', 'cuanto', 'cuanto cuesta', 'valor', 'tarifa', 'tarifas', 'caro', 'barato', 'cuanto cobrar', 'cuanto vale'],
    reply: () => ({
      text: sinPrecio,
      chips: ['Soporte técnico', 'Videovigilancia', 'Mantenimiento industrial'],
      cta: 'form',
    }),
  },
  {
    id: 'horarios',
    keywords: ['horario', 'horarios', 'hora', 'horas', 'abren', 'cierran', 'atienden', 'domingo', 'sabado', 'sabados', 'disponibilidad'],
    reply: () => ({
      text: `*${business.hours}*\n\nFuera de horario, deja tu consulta y te respondemos a primera hora del día hábil siguiente.`,
      chips: ['¿Qué servicios manejan?', 'Urgencias'],
    }),
  },
  {
    id: 'cobertura',
    keywords: ['donde', 'donde estan', 'ubicacion', 'ubiquen', 'ubicas', 'zona', 'cobertura', 'domicilio', 'llegan', 'piura', 'local', 'sucursal', 'atencion a domicilio'],
    reply: () => ({
      text: `Atención en *${business.coverage}*.\n\nCámaras, cableado, tableros y señalética se resuelven en tu local.`,
      chips: ['Soporte técnico', 'Videovigilancia', 'Instalaciones eléctricas'],
      cta: 'form',
    }),
  },
  {
    id: 'servicios',
    keywords: ['servicios', 'que hacen', 'que manejan', 'ofrecen', 'trabajan en', 'catalogo', 'opciones', 'menu', 'que tienen', 'lista'],
    reply: () => ({
      text: `Esto hacemos:\n\n${menuServicios()}`,
      chips: ['Soporte técnico', 'Redes y WiFi', 'Mantenimiento industrial'],
      cta: 'form',
    }),
  },
  {
    id: 'soporte',
    keywords: ['soporte', 'computadora', 'laptop', 'pc', 'no prende', 'lenta', 'lento', 'virus', 'formateo', 'formatear', 'windows', 'cambiar disco', 'ram', 'bateria', 'pantalla', 'se cuelga'],
    reply: () => ({
      text: `*Soporte técnico* 🖥️\n\n${lista('Soporte técnico')}\n\nEn escritorio conviene traerlo al taller.`,
      chips: ['¿Cuánto cuesta?', 'Redes y WiFi'],
      cta: 'form',
    }),
  },
  {
    id: 'redes',
    keywords: ['wifi', 'wi fi', 'internet', 'red', 'redes', 'router', 'switch', 'cableado', 'senal', 'slow', 'cayo', 'acceso'],
    reply: () => ({
      text: `*Redes y WiFi* 📶\n\n${lista('Redes y WiFi')}\n\nCasi siempre el problema es el router viejo, no el operador.`,
      chips: ['¿Cuánto cuesta?', 'Videovigilancia'],
      cta: 'form',
    }),
  },
  {
    id: 'cctv',
    keywords: ['camara', 'camaras', 'cctv', 'videovigilancia', 'grabar', 'grabacion', 'dvr', 'nube', 'vigilar', 'perro', 'auto', 'sucursal'],
    reply: () => ({
      text: `*Videovigilancia* 📹\n\n${lista('Videovigilancia')}\n\nEl precio depende de cuántas cámaras y si quieres nube o DVR.`,
      chips: ['¿Cuánto cuesta?', 'Instalaciones eléctricas'],
      cta: 'form',
    }),
  },
  {
    id: 'impresoras',
    keywords: ['impresora', 'impresoras', 'escaner', 'multifuncional', 'toner', 'cartucho', 'atasco', 'imprimir', 'escaneo', 'impresion'],
    reply: () => ({
      text: `*Impresoras y escáneres* 🖨️\n\n${lista('Impresoras y escáneres')}\n\nSi ya tienes equipo, mantenerlo sale menos que cambiarlo.`,
      chips: ['¿Cuánto cuesta?', 'Redes y WiFi'],
      cta: 'form',
    }),
  },
  {
    id: 'sistemas',
    keywords: ['pagina web', 'pagina', 'web', 'sistema', 'software', 'inventario', 'punto de venta', 'facturacion', 'base de datos', 'aplicacion', 'app', 'tienda en linea', 'automatizar'],
    reply: () => ({
      text: `*Sistemas a medida* 💻\n\n${lista('Sistemas a medida')}\n\nSe cotiza por módulo, para ver cada parte por separado.`,
      chips: ['¿Cuánto cuesta?', 'Mantenimiento industrial'],
      cta: 'form',
    }),
  },
  {
    id: 'ciberseguridad',
    keywords: ['ransomware', 'hackearon', 'hackeo', 'hackeada', 'respaldo', 'backup', 'cifrado', 'contrasenas', 'auditoria', 'antivirus', 'perdí archivos', 'me robaron datos'],
    reply: () => ({
      text: `*Ciberseguridad* 🛡️\n\n${lista('Ciberseguridad')}\n\nSi perdiste archivos por cifrado, dilo rápido: mientras no se sobrescriba el disco hay más opciones.`,
      chips: ['¿Cuánto cuesta?', 'Soporte técnico'],
      cta: 'form',
    }),
  },
  {
    id: 'industrial',
    keywords: ['maquina', 'maquinas', 'motor', 'motores', 'bomba', 'bombas', 'compresora', 'reductor', 'planta', 'taller', 'industrial', 'que se detiene', 'se para', 'ruido', 'preventivo', 'correctivo', 'repuestos', 'rodamiento', 'correa'],
    reply: () => ({
      text: `*Mantenimiento industrial* ⚙️\n\n${lista('Mantenimiento industrial')}\n\nEl plan preventivo sale menos que una parada no programada.`,
      chips: ['¿Cuánto cuesta?', 'Instalaciones eléctricas'],
      cta: 'form',
    }),
  },
  {
    id: 'electrico',
    keywords: ['electrico', 'electrica', 'electricos', 'electricas', 'tablero', 'tableros', 'potencia', 'iluminacion', 'led', 'tomacorriente', 'enchufe', 'tierra', 'descarga', 'cortocircuito', 'luminarias'],
    reply: () => ({
      text: `*Instalaciones eléctricas* ⚡\n\n${lista('Instalaciones eléctricas')}\n\nPersonal habilitado y materiales normalizados. La puesta a tierra es lo que más problemas evita.`,
      chips: ['¿Cuánto cuesta?', 'Seguridad industrial'],
      cta: 'form',
    }),
  },
  {
    id: 'seguridad_industrial',
    keywords: ['senalizacion', 'senaletica', 'señalizacion', 'señaletica', 'extintor', 'extintores', 'epp', 'epis', 'casco', 'demarcacion', 'punto de reunion', 'evacuacion', 'seguridad industrial', 'capacitacion'],
    reply: () => ({
      text: `*Seguridad industrial* 🦺\n\n${lista('Seguridad industrial')}\n\nAsesoramos en EPP y capacitamos al personal, no solo colocación.`,
      chips: ['¿Cuánto cuesta?', 'Instalaciones eléctricas'],
      cta: 'form',
    }),
  },
  {
    id: 'proyectos',
    keywords: ['proyecto', 'proyectos', 'plano', 'planos', 'memoria', 'permiso', 'permisos', 'expediente', 'levantamiento', 'medicion', 'diseño', 'ingenieria'],
    reply: () => ({
      text: `*Proyectos y planos* 📐\n\n${lista('Proyectos y planos')}\n\nProyecto completo: levantamiento, planos, memoria y cotización cerrada.`,
      chips: ['¿Cuánto cuesta?', 'Mantenimiento industrial'],
      cta: 'form',
    }),
  },
  {
    id: 'metalmecanica',
    keywords: ['metalmecanica', 'metalmecánica', 'soldadura', 'soldar', 'estructura', 'estructuras', 'metal', 'metales', 'pieza', 'piezas', 'soporte', 'soportes', 'fabricacion', 'fabricación', 'marco', 'marcos', 'portico', 'pórtico', 'estructura metalica', 'estructuras metalicas', 'reparacion metalica', 'reparaciones metalmecanicas'],
    reply: () => ({
      text: `*Servicios de metalmecánica, soldadura* 🔧\n\n${lista('Servicios de metalmecánica, soldadura')}\n\nDibujo la pieza o la estructura, la fabricamos y la montamos en sitio.`,
      chips: ['Zona de cobertura', '¿Cuánto cuesta?'],
      cta: 'form',
    }),
  },
  {
    id: 'garantia',
    keywords: ['garantia', 'garantias', 'garantizado', 'respaldan', 'si falla otra vez'],
    reply: () => ({
      text: `La garantía te la confirma el socio en la cotización, por escrito y según el trabajo. No la publicamos como política fija porque depende del tipo de servicio.`,
      chips: ['Zona de cobertura', 'Mantenimiento industrial'],
      cta: 'form',
    }),
  },
  {
    id: 'pago',
    keywords: ['pago', 'pagar', 'forma de pago', 'formas de pago', 'factura', 'boleta', 'transferencia', 'tarjeta', 'credito', 'cuotas', 'financiamiento', 'anticipo'],
    reply: () => ({
      text: `Las formas de pago y el anticipo te los define el socio al cotizar. Lo dejamos por escrito junto con el precio.`,
      chips: ['¿Cuánto cuesta?'],
      cta: 'form',
    }),
  },
  {
    id: 'empresas',
    keywords: ['empresa', 'empresarial', 'contrato', 'mensualidad', 'mensual', 'plan mensual', 'recurrente', 'negocio', 'tienda', 'restaurante', 'clinica', 'oficina', 'sucursal', 'negocios'],
    reply: () => ({
      text: `Sí, trabajamos con empresas. Lo habitual es un *plan mensual* con visitas programadas: sale bastante menos que atender cada falla por separado.`,
      chips: ['Plan mensual de mantenimiento', 'Ciberseguridad'],
      cta: 'form',
    }),
  },
  {
    id: 'urgencia',
    keywords: ['urgencia', 'urgente', 'urgencias', 'emergencia', 'ahora mismo', 'hoy mismo', 'lo mas rapido', 'inmediato', 'critico', 'sistema caido', 'sin internet', 'se cayo'],
    reply: () => ({
      text: `Atendemos *${business.hours}*.\n\nSi se te paró hoy mismo, márcalo en el formulario y lo priorizamos.`,
      chips: ['Zona de cobertura', '¿Qué servicios manejan?'],
      cta: 'form',
    }),
  },
  {
    id: 'contacto',
    keywords: [
      'numero',
      'numeros',
      'telefono',
      'celular',
      'whatsapp',
      'contacto',
      'contactar',
      'hablar con alguien',
      'un socio',
      'un ingeniero',
      'agente',
      'persona real',
    ],
    reply: () => ({
      text: `Aquí los números no los publicamos, justamente por eso. 🙂\n\nEnvía tu solicitud y el sistema te asigna con un socio.`,
      chips: ['¿Qué servicios manejan?', '¿Cuánto cuesta?'],
      cta: 'wa',
    }),
  },
  {
    id: 'falla_comun',
    keywords: [
      'tengo una falla',
      'tengo un problema',
      'tengo una averia',
      'tengo un desperfecto',
      'no se que hacer',
      'que puedo hacer',
      'que me recomiendas',
      'falla comun',
    ],
    reply: () => ({
      text: `Dime qué falla y te doy los pasos para revisarlo tú mismo antes de que vaya un técnico:\n\n• No puedo imprimir\n• El internet va lento o no conecta\n• Las cámaras no graban\n• La computadora va lenta o no prende\n• El sistema me da error\n• La máquina se para\n• Salta la luz o hay un enchufe quemado\n• Se mojó o se quemó un equipo`,
      chips: [
        'No puedo imprimir',
        'Las cámaras no graban',
        'Salta la luz',
        'Ver servicios',
      ],
    }),
  },
  {
    id: 'gracias',
    keywords: ['gracias', 'genial', 'perfecto', 'excelente', 'buenisimo', 'okey', 'vale'],
    reply: () => ({
      text: `Con gusto. ¿Algo más?`,
      chips: ['¿Qué servicios manejan?', 'Zona de cobertura', 'Nada más, gracias'],
    }),
  },
  {
    id: 'despedida',
    keywords: ['adios', 'chao', 'hasta luego', 'nos vemos', 'bye', 'me voy', 'nada mas nada gracias', 'nada mas gracias', 'listo gracias'],
    reply: () => ({
      text: `Gracias por escribir. Aquí estamos. 👋`,
      chips: ['Ver servicios otra vez'],
      reset: true,
    }),
  },
]

const menuInicio: BotReply = {
  text: `Hola 👋 Soy el asistente de *${business.brandShort}*. ¿Sobre qué quieres saber?`,
  chips: [
    '¿Qué servicios manejan?',
    '¿Cuánto cuesta?',
    'Tengo una falla',
    'Zona de cobertura',
    'Horario',
    'Necesito soporte técnico',
    'Cotizar un proyecto',
  ],
}

// Se normalizan al primer uso y se guardan, para no repetir el trabajo en
// cada mensaje. Es perezoso a proposito: asi el orden en que se declaran los
// arrays de intents no importa.
const keywordsNormalizadas = new Map<string, string[]>()

function normKeywords(intencion: Intent): string[] {
  let listo = keywordsNormalizadas.get(intencion.id)
  if (!listo) {
    listo = intencion.keywords.map(norm)
    keywordsNormalizadas.set(intencion.id, listo)
  }
  return listo
}

function puntuar(intencion: Intent, texto: string): number {
  let total = 0
  // Las palabras clave se normalizan igual que el mensaje, para que
  // "señaletica" y "señalética" sirvan las dos.
  for (const k of normKeywords(intencion)) {
    if (!texto.includes(k)) continue
    total += k.includes(' ') ? 4 : Math.min(k.length, 4)
  }
  return total
}

/**
 * Respuestas de escalamiento. Van aparte de los intents porque se revisan antes
 * que los sintomas: si alguien ya dice "ya apagué y lo revisé", repetirle los
 * pasos seria una falta de respeto.
 */
const escalamiento: Intent[] = [
  {
    id: 'pedir_tecnico',
    keywords: [
      'que venga un tecnico',
      'quiero que venga un tecnico',
      'que venga alguien',
      'quiero que venga alguien',
      'envia un tecnico',
      'envie un tecnico',
      'llama a un tecnico',
      'quiero que lo revisen',
      'revisen el equipo',
      'que lo reparen',
      'quiero que lo reparen',
    ],
    reply: () => ({
      text: `Perfecto. Cuéntale al técnico qué equipo es y qué le pasa, con eso llega sabiendo qué llevar.\n\nEscríbenos por WhatsApp y te lo coordinamos. Atendemos *${business.hours}* en *${business.coverage}*.`,
      chips: ['Zona de cobertura', '¿Cuánto cuesta?'],
      cta: 'wa',
    }),
  },
  {
    id: 'ya_revisado',
    keywords: [
      'ya intente',
      'ya intente apagar',
      'ya la apague',
      'ya lo apague',
      'ya apague y prendi',
      'ya revise el cable',
      'ya revise los cables',
      'ya revise',
      'ya probamos',
      'ya lo hice',
      'ya le hice',
      'ya hice eso',
      'ya hice todo eso',
      'ya hice todo',
      'no funciono',
      'no funcionó',
      'sigue igual',
      'sigue igual de',
      'sigue sin',
      'no sirvio',
      'no sirvió',
      'no me sirvio',
      'ya no funciona',
      'ya no prende',
    ],
    reply: () => ({
      text: `Si ya revisaste eso y sigue igual, se acabó lo que se podía hacer a distancia: **hace falta que un técnico lo vea**. Cada intento remoto ya no te va a quitar el problema.\n\nEscríbenos y lo coordinamos. Si la falla es urgente y estás en ${business.coverage}, márcalo en el mensaje y lo priorizamos.`,
      chips: ['Ver servicios', 'Zona de cobertura'],
      cta: 'wa',
    }),
  },
]

export function responder(mensaje: string, menuAbierto: boolean): BotReply {
  const texto = norm(mensaje)
  if (!texto) return menuInicio

  // 1. Escalamiento: "ya lo hice" y "que venga alguien" se ganan todo.
  for (const e of escalamiento) {
    if (puntuar(e, texto) >= 4) return e.reply()
  }

  // 2. Sintomas: si describe una falla, primero el diagnostico y despues la
  //    ficha comercial. Sin esto, "no puedo imprimir" caia en el catalogo.
  const sintoma = buscarSintoma(texto, norm)
  if (sintoma) {
    return {
      text: textoSintoma(sintoma),
      chips: [
        'Ya hice eso y no funcionó',
        'Que venga un técnico',
        '¿Cuánto cuesta?',
      ],
      cta: 'wa',
    }
  }

  let mejor: Intent | null = null
  let mejorPuntaje = 0
  for (const i of intents) {
    const p = puntuar(i, texto)
    if (p > mejorPuntaje) {
      mejorPuntaje = p
      mejor = i
    }
  }

  if (mejor) return mejor.reply()
  if (menuAbierto) return menuInicio

  return {
    text: `No te entendí. 🙂`,
    chips: [
      '¿Qué servicios manejan?',
      'Mi equipo está lento',
      'Necesito cámaras',
      'Mi máquina se para',
    ],
  }
}

export { menuInicio }
