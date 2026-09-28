/**
 * Diagnostico por sintoma.
 *
 * El bot de `chatbot.ts` contestaba "impresora" con la ficha comercial del
 * servicio. Eso no sirve cuando alguien escribe "no puedo imprimir": quiere que
 * le digan que hacer, no que le vendan. Aqui van los sintomas con las
 * comprobaciones que si puede hacer el mismo cliente, y solo al final se ofrece
 * la visita tecnica.
 *
 * Son comprobaciones seguras y de las que no rompen nada. Donde el problema si
 * es peligroso (electricidad, quemado, mojado) se dice primero que no abra ni
 * enchufe nada, porque una respuesta mal dada en un tablero puede|lastimar.
 *
 * Las palabras clave son las frases que escribe la gente, no los nombres
 * técnicos: por eso "no puedo imprimir" tiene que entrar y "impresora" a secas
 * no, que esa es una consulta comercial.
 */

export type Sintoma = {
  id: string
  titulo: string
  emoji: string
  /** Frases del cliente, en como las escribe. */
  keywords: string[]
  /** Comprobaciones, en orden. */
  pasos: string[]
  /** Cierre honesto: por que toca technician. */
  cierre: string
  /**
   * Palabras del contexto. Si aparecen, suben el puntaje del sintoma. Sirve
   * para desempatar: "el wifi esta lentisimo" dice "lentisimo", que encaja con
   * la PC y con el WiFi, pero como tambien dice "wifi" el de redes gana.
   */
  contexto?: string[]
  /** Si es cierto, va un aviso de seguridad antes de los pasos. */
  aviso?: string
}

export const SINTOMAS: Sintoma[] = [
  {
    id: 'impresora',
    titulo: 'La impresora',
    emoji: '🖨️',
    keywords: [
      'no puedo imprimir',
      'no puede imprimir',
      'no me imprime',
      'no imprime nada',
      'no imprime',
      'imprimir no',
      'no sale al imprimir',
      'imprime en blanco',
      'sale en blanco',
      'saca en blanco',
      'salen en blanco',
      'papel atascado',
      'impresora atascada',
      'se atoró',
      'atascó el papel',
      'no escanea',
      'no puedo escanear',
    ],
    pasos: [
      'Apaga la impresora, espera 10 segundos y vuelve a encenderla.',
      'Revisa que el cable de datos o de red esté bien conectado en los dos extremos, y que la impresora tenga papel.',
      'En la computadora reinicia la cola de impresión: Configuración → Impresoras → esa impresora → "Imprimir documento de prueba".',
      'Si tiene tóner o tinta, revisa el nivel antes de seguir.',
    ],
    contexto: ['impresora', 'impresor', 'escaner', 'escanea'],
    cierre: 'Si con eso sigue igual, el problema suele ser el driver o la placa de la impresora. Te la revisamos y te decimos si conviene repararla o cambiarla.',
  },
  {
    id: 'pc_lenta',
    titulo: 'La computadora va lenta',
    emoji: '🐢',
    keywords: [
      'va lenta',
      'va muy lenta',
      'esta lenta',
      'esta muy lenta',
      'muy lenta',
      'se cuelga',
      'se cuelga mucho',
      'tarda mucho',
      'tarda en abrir',
      'no abre bien',
      'muy lento',
      'va lento',
      'lentisimo',
      'lentísima',
    ],
    contexto: ['computadora', 'pc', 'notebook', 'laptop', 'equipo', 'maquina'],
    pasos: [
      'Cierra lo que no estés usando y reinicia la máquina.',
      'Revisa cuánto queda del disco: si está casi lleno, se nota mucho.',
      'Desconecta lo que tengas enchufado (impresora, discos, luces) y prueba sin eso.',
      'Si es de hace más de 4 años, casi siempre gana cambiarle el disco por uno SSD antes que cualquier reparación.',
    ],
    cierre: 'Si después de reiniciar y liberar espacio sigue igual, pásala al taller: la revisamos y te decimos qué compensa antes de cobrarte nada.',
  },
  {
    id: 'pc_no_prende',
    titulo: 'El equipo no prende',
    emoji: '🔌',
    keywords: [
      'no prende',
      'no prende la computadora',
      'no enciende',
      'no enciende la computadora',
      'no arranca',
      'no inicia',
      'pantalla negra',
      'se apago de golpe',
      'se apagó de golpe',
    ],
    pasos: [
      'Revisa que la regleta o el cargador tenga luz, y que el cable esté bien metido en los dos extremos.',
      'Si es de escritorio, mira que el interruptor de la fuente de poder esté en ON.',
      'Desconecta todo menos el monitor y prueba así: a veces un periférico traba el arranque.',
    ],
    contexto: ['computadora', 'pc', 'notebook', 'laptop', 'equipo', 'monitor'],
    cierre: 'Si hace "clac" al prender o no da señal, puede ser la fuente o la memoria mal puesta. No lo sigas forzar: trae el equipo y lo vemos en el taller.',
  },
  {
    id: 'wifi',
    titulo: 'El internet o el WiFi',
    emoji: '📶',
    keywords: [
      'no hay internet',
      'sin internet',
      'no tengo internet',
      'internet lento',
      'internet lenta',
      'internet va lento',
      'wifi lento',
      'wifi lenta',
      'wi fi lento',
      'wi fi lenta',
      'wifi lentisimo',
      'net lento',
      'va muy lento',
      'lentisimo',
      'lentísima',
      'wifi no funciona',
      'no me funciona el wifi',
      'no me llega el internet',
      'se cae el internet',
      'se desconecta',
      'se desconecta el wifi',
      'sin senal',
      'no conecta',
    ],
    pasos: [
      'Reinicia el router: apágalo de la corriente 30 segundos, enciéndelo y espera 2 minutos sin tocarlo.',
      'Acércate al router o pruébalo por cable. Si por cable va bien, es cobertura.',
      'Revisa si alguien más está descargando o usando cámaras: eso se come todo el ancho de banda.',
      'Prueba con otro celular u otra computadora. Si todos van lentos, el problema es el router o el operador, no tu equipo.',
    ],
    contexto: ['wifi', 'wi fi', 'internet', 'red', 'router', 'conexion', 'senal'],
    cierre: 'Si el router es de hace más de 4 años, casi siempre la solución es cambiarlo y no cobrarte visitas. Lo cotizamos cerrado.',
  },
  {
    id: 'cctv',
    titulo: 'Las cámaras no graban',
    emoji: '📹',
    keywords: [
      'no graban',
      'no graba',
      'no esta grabando',
      'no estan grabando',
      'no hay grabacion',
      'sin grabacion',
      'no veo las camaras',
      'no se ve la camara',
      'camara no funciona',
      'no hay imagen',
      'perdieron las imagenes',
      'se borro el dvr',
    ],
    pasos: [
      'Revisa que el disco duro del DVR/NVR esté conectado y que le quede espacio: cuando se llena, el equipo deja de grabar.',
      'Comprueba que el DVR tenga bien la fecha y la hora.',
      'Revisa la fuente de poder de las cámaras: se caen con los picos de voltaje de la red.',
      'Limpia los lentes y mira que la carcasa no esté tapada por hojas o con humedad.',
    ],
    contexto: ['camara', 'camaras', 'dvr', 'nvr', 'cctv', 'vigilancia', 'graba'],
    cierre: 'Si una sola cámara sale sin imagen, casi siempre es esa fuente o su cable. Si salen todas, es el DVR. Lo revisamos en sitio.',
  },
  {
    id: 'sistema',
    titulo: 'El sistema da error',
    emoji: '💻',
    keywords: [
      'error al abrir',
      'me da error',
      'da error',
      'marca error',
      'tira error',
      'saca error',
      'error en el sistema',
      'error de sistema',
      'no abre el sistema',
      'no me abre el sistema',
      'no entra al sistema',
      'no me deja entrar',
      'se cae el sistema',
      'se traba',
      'se bloquea',
      'no puedo facturar',
      'no imprime las facturas',
      'el sistema no',
    ],
    pasos: [
      'Reinicia una vez, cuidando cerrar todo lo que tengas abierto.',
      'Anota el nombre exacto del programa o del archivo que falló: con eso encontramos el error rápido.',
      'Si manejas facturación o inventario, revisa que tengas el respaldo del día anterior.',
    ],
    contexto: ['sistema', 'programa', 'software', 'base de datos', 'facturacion', 'equipo'],
    cierre: 'No formatees ni reinstales todavía, que se pierde la información. Avísanos y lo vemos con el respaldo de por medio.',
  },
  {
    id: 'industrial',
    titulo: 'La máquina se para',
    emoji: '⚙️',
    keywords: [
      'maquina se para',
      'la maquina se para',
      'se para la maquina',
      'se detiene la maquina',
      'la maquina se detiene',
      'hace ruido',
      'esta vibrando',
      'vibra mucho',
      'se quemo el motor',
      'la bomba no trabaja',
      'bomba no prende',
      'compresora',
      'se paro de golpe',
      'se traba',
      'se trabo',
    ],
    pasos: [
      '¿Se para en vacío o solo cuando está trabajando? Esa diferencia dice mucho.',
      'Revisa los niveles: aceite, refrigerante, y la banda o correa si tiene.',
      'Anota en qué momento exacto se para: al arrancar, a la mitad o al final del ciclo.',
      'Revisa que no se haya disparado alguna protección o un fusible.',
    ],
    contexto: ['maquina', 'motor', 'bomba', 'compresora', 'cinta', 'linea', 'equipo'],
    aviso: 'Si huele a quemado, vee chispas o sale humo, **no la vuelvas a arrancar**. Déjala apagada y llámanos.',
    cierre: 'Con esos datos el técnico llega sabiendo qué llevar. La parada no programada es la cara; el preventivo sale siempre más barato.',
  },
  {
    id: 'electrico',
    titulo: 'Problema eléctrico',
    emoji: '⚡',
    keywords: [
      'no hay luz',
      'se fue la luz',
      'me fue la luz',
      'salta la luz',
      'salta el diferencial',
      'salta el interruptor',
      'sin luz en',
      'toma quemado',
      'enchufe quemado',
      'cortocircuito',
      'tablero',
      'tableros',
    ],
    pasos: [
      'Si salta un diferencial, ve desconectando aparatos de a uno hasta dar con el que lo dispara, y no lo vuelvas a usar.',
      'Revisa si hay enchufes o tomacorrientes quemados, con la marca negra o el olor: esos no se usan.',
      'Revisa cuántos aparatos tienes en la misma regleta o extensión.',
    ],
    contexto: ['luz', 'electrico', 'electrica', 'tomacorriente', 'enchufe', 'diferencial', 'casa'],
    aviso:
      'No abras el tablero ni toques los cables interiores. Eso lo mide un electricista habilitado, y abrirlo sin medida es peligroso.',
    cierre: 'Te lo revisamos con medición y te dejamos el tablero en condiciones. Si algo está quemado, se cambia: no se arregla con cinta.',
  },
  {
    id: 'peligro',
    titulo: 'Equipo mojado o quemado',
    emoji: '🧯',
    keywords: [
      'se mojo',
      'se mojó',
      'se cayo agua',
      'se cayó agua',
      'le cayo agua',
      'se quemo',
      'se quemó',
      'olor a quemado',
      'huele a quemado',
      'huele a quemado',
      'chispa',
      'chispas',
      'salio humo',
      'salió humo',
    ],
    pasos: [
      'Desconecta de la corriente. Si está mojado, no lo vuelvas a enchufar aunque parezca seco por fuera.',
      'No lo seques con calor ni con arroz: la batería se calienta y es peor.',
      'Aleja papel, tela y cualquier material inflamable de cerca.',
    ],
    contexto: ['equipo', 'computadora', 'laptop', 'celular', 'telefono', 'bateria', 'cargador'],
    aviso:
      'Esto ya no es cosa de probar nada. Desconecta y vente al taller; si hubo chispas o humo, la revisión es antes de volverlo a usar.',
    cierre: 'Lo revisamos antes de energizarlo. Si la placa o la batería se damaged, te lo decimos con el equipo delante.',
  },
]

/**
 * Palabras de venta. Si el mensaje las trae, no se busca sintoma: alguien que
 * pregunta "cuanto cuesta una impresora" quiere precio, no un tutorial.
 */
const VENTAS = [
  'cotizar',
  'cotizacion',
  'presupuesto',
  'contratar',
  'cuanto',
  'cuanto cuesta',
  'precio',
  'precios',
  'costo',
  'costos',
  'tarifa',
  'tarifas',
  'plan mensual',
  'mensualidad',
  'contrato',
  'valor',
]

type Norm = (s: string) => string

/**
 * Busca el sintoma mas probable. Devuelve null si el mensaje es una consulta
 * comercial o si no encaja con ninguno, para que siga el flujo normal del bot.
 */
export function buscarSintoma(texto: string, norm: Norm): Sintoma | null {
  if (VENTAS.some((v) => texto.includes(norm(v)))) return null

  let mejor: Sintoma | null = null
  let mejorPuntaje = 0

  for (const s of SINTOMAS) {
    let puntos = 0
    for (const k of s.keywords) {
      const nk = norm(k)
      if (!texto.includes(nk)) continue
      // Las frases largas pesan mas que una palabra suelta, como en el resto del bot
      puntos += nk.includes(' ') ? 5 : Math.min(nk.length, 4)
    }
    // Sin un sintoma real no hay diagnostico que dar. El contexto solo desempata,
    // nunca crea uno: si no, "necesito una impresora nueva" caeria aqui.
    if (puntos === 0) continue

    // Que nombre el aparato vale mas que el sintoma generico
    const ctx = (s.contexto ?? []).map(norm).filter((c) => texto.includes(c))
    // "impresora" y "impresor" salen las dos en la misma palabra, y solo cuenta una
    const unicas = ctx.filter((c, i) => !ctx.some((o, j) => j !== i && o.includes(c)))
    puntos += Math.min(unicas.length, 2) * 2

    if (puntos > mejorPuntaje) {
      mejorPuntaje = puntos
      mejor = s
    }
  }

  return mejorPuntaje >= 4 ? mejor : null
}

/** Arma el texto de la respuesta con los pasos numerados. */
export function textoSintoma(s: Sintoma): string {
  const partes: string[] = [`*${s.titulo}* ${s.emoji}`]

  if (s.aviso) partes.push(s.aviso, '')
  partes.push('Prueba esto, en este orden:')
  s.pasos.forEach((p, i) => partes.push(`${i + 1}. ${p}`))
  partes.push('', s.cierre)

  return partes.join('\n')
}
