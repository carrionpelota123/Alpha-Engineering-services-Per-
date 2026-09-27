export type SectorIcon = 'building' | 'store' | 'factory' | 'home' | 'hospital' | 'truck'

export type Sector = {
  icon: SectorIcon
  title: string
  desc: string
}

/** Sectores a los que atendemos. Aportan seriedad sin inventar cifras. */
export const sectors: Sector[] = [
  {
    icon: 'factory',
    title: 'Industrias y plantas',
    desc: 'Máquinas, tableros, potencia y seguridad industrial.',
  },
  {
    icon: 'store',
    title: 'Comercios',
    desc: 'Punto de venta, inventario, cámaras y redes.',
  },
  {
    icon: 'building',
    title: 'Oficinas y empresas',
    desc: 'Mantenimiento preventivo, respaldos y ciberseguridad.',
  },
  {
    icon: 'home',
    title: 'Hogares',
    desc: 'Computadoras, WiFi, videovigilancia y seguridad.',
  },
  {
    icon: 'hospital',
    title: 'Salud y servicios',
    desc: 'Equipos que no pueden parar.',
  },
  {
    icon: 'truck',
    title: 'Logística y transporte',
    desc: 'Flotas, señalización y tableros.',
  },
]
