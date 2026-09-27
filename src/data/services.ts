export type ServiceIcon =
  | 'monitor'
  | 'network'
  | 'cctv'
  | 'printer'
  | 'code'
  | 'shield'
  | 'wrench'
  | 'sparkles'
  | 'cog'
  | 'zap'
  | 'hard-hat'
  | 'compass'
  | 'hammer'

export type ServiceGroup = 'tecnologia' | 'industrial'

export type Service = {
  icon: ServiceIcon
  title: string
  desc: string
  details: string[]
  group: ServiceGroup
}

export const groupLabels: Record<ServiceGroup, string> = {
  tecnologia: 'Tecnología y sistemas',
  industrial: 'Ingeniería industrial y servicios generales',
}

export const groupHints: Record<ServiceGroup, string> = {
  tecnologia: 'Todo lo que mantiene tu equipo y tu red funcionando.',
  industrial: 'Lo que hace que tu planta, taller, casa o negocio funcione y sea seguro.',
}

export const services: Service[] = [
  {
    group: 'tecnologia',
    icon: 'monitor',
    title: 'Soporte técnico',
    desc: 'Reparación y optimización de computadoras y laptops.',
    details: [
      'Reparación en taller o a domicilio',
      'Formateo con Windows y drivers',
      'Cambio de disco, RAM y batería',
      'Eliminación de virus y malware',
    ],
  },
  {
    group: 'tecnologia',
    icon: 'network',
    title: 'Redes y WiFi',
    desc: 'Routers, switches y cableado estructurado.',
    details: [
      'Cobertura WiFi en casa, local u oficina',
      'Cableado estructurado y access points',
      'Configuración de routers y switches',
      'Red separada para invitados y empresa',
    ],
  },
  {
    group: 'tecnologia',
    icon: 'cctv',
    title: 'Videovigilancia',
    desc: 'Cámaras CCTV vistas desde tu celular.',
    details: [
      'Cámaras para interior, exterior y garaje',
      'Grabación en DVR o en la nube',
      'Acceso desde el celular, en varias cámaras a la vez',
      'Mantenimiento y limpieza periódica',
    ],
  },
  {
    group: 'tecnologia',
    icon: 'printer',
    title: 'Impresoras y escáneres',
    desc: 'Venta, instalación y reparación.',
    details: [
      'Equipos nuevos y seminuevos',
      'Instalación en red o por USB',
      'Desatasco y mantenimiento preventivo',
      'Suministro de consumibles originales y compatibles',
    ],
  },
  {
    group: 'tecnologia',
    icon: 'code',
    title: 'Sistemas a medida',
    desc: 'Webs, inventario y facturación para tu negocio.',
    details: [
      'Páginas web y tiendas en línea',
      'Inventario, ventas y facturación',
      'Punto de venta para tiendas y restaurantes',
      'Integración con WhatsApp y medios de pago',
    ],
  },
  {
    group: 'tecnologia',
    icon: 'shield',
    title: 'Ciberseguridad',
    desc: 'Respaldos y recuperación de información.',
    details: [
      'Respaldo automático de archivos y servidores',
      'Recuperación de archivos cifrados',
      'Protección contra ransomware',
      'Auditoría de contraseñas y accesos',
    ],
  },
  {
    group: 'tecnologia',
    icon: 'wrench',
    title: 'Mantenimiento preventivo',
    desc: 'Planes mensuales para que nada se falle.',
    details: [
      'Limpieza interna y actualización',
      'Monitoreo de temperatura y disco',
      'Visitas programadas cada mes',
      'Reporte de lo encontrado y corregido',
    ],
  },
  {
    group: 'industrial',
    icon: 'cog',
    title: 'Mantenimiento industrial',
    desc: 'Preventivo y correctivo de máquinas y equipos.',
    details: [
      'Motores, bombas, compresores y reductores',
      'Plan preventivo para evitar paradas',
      'Rodamientos, correas, aceites y filtros',
      'Reparación en sitio de tu planta o taller',
    ],
  },
  {
    group: 'industrial',
    icon: 'zap',
    title: 'Instalaciones eléctricas',
    desc: 'Tableros, potencia e iluminación industrial.',
    details: [
      'Instalación y upgrade de tableros',
      'Cableado de potencia y canalización',
      'Iluminación LED para nave, local o patio',
      'Puesta a tierra y protección',
    ],
  },
  {
    group: 'industrial',
    icon: 'hard-hat',
    title: 'Seguridad industrial',
    desc: 'Señalización y elementos de seguridad.',
    details: [
      'Señalización y rutas de evacuación',
      'Señalética de empresa y demarcación de pisos',
      'Extintores y puntos de reunión',
      'Asesoría de EPP',
    ],
  },
  {
    group: 'industrial',
    icon: 'compass',
    title: 'Proyectos y planos',
    desc: 'Planos, memoria y cotización cerrada.',
    details: [
      'Levantamiento y medición en sitio',
      'Planos de instalación y memoria',
      'Cotización cerrada de materiales y mano de obra',
      'Acompañamiento durante la ejecución',
    ],
  },
  {
    group: 'industrial',
    icon: 'hammer',
    title: 'Servicios de metalmecánica, soldadura',
    desc: 'Estructuras, piezas y soldadura a medida.',
    details: [
      'Diseño, fabricación y montaje de estructuras metálicas',
      'Soldadura, mantenimiento y reparaciones',
      'Fabricación de piezas, soportes y estructuras en metal',
    
    ],
  },
]
