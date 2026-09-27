import {
  Monitor,
  Network,
  Cctv,
  Printer,
  Code,
  Shield,
  Wrench,
  Sparkles,
  Users,
  Badge,
  Gauge,
  ShieldCheck,
  Cog,
  Zap,
  HardHat,
  DraftingCompass,
  Hammer,
  Building2,
  Store,
  Factory,
  House,
  Stethoscope,
  Truck,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ServiceIcon } from '../data/services'
import type { SectorIcon } from '../data/sectors'
import type { DifferentiatorIcon } from '../data/differentiators'

const serviceIcons: Record<ServiceIcon, LucideIcon> = {
  monitor: Monitor,
  network: Network,
  cctv: Cctv,
  printer: Printer,
  code: Code,
  shield: Shield,
  wrench: Wrench,
  sparkles: Sparkles,
  cog: Cog,
  zap: Zap,
  'hard-hat': HardHat,
  compass: DraftingCompass,
  hammer: Hammer,
}

const differentiatorIcons: Record<DifferentiatorIcon, LucideIcon> = {
  users: Users,
  badge: Badge,
  gauge: Gauge,
  'shield-check': ShieldCheck,
}

export function ServiceGlyph({ icon, ...rest }: { icon: ServiceIcon } & React.SVGProps<SVGSVGElement>) {
  const Glyph = serviceIcons[icon]
  return <Glyph {...rest} />
}

export function DifferentiatorGlyph({
  icon,
  ...rest
}: { icon: DifferentiatorIcon } & React.SVGProps<SVGSVGElement>) {
  const Glyph = differentiatorIcons[icon]
  return <Glyph {...rest} />
}

const sectorIcons: Record<SectorIcon, LucideIcon> = {
  building: Building2,
  store: Store,
  factory: Factory,
  home: House,
  hospital: Stethoscope,
  truck: Truck,
}

export function SectorGlyph({ icon, ...rest }: { icon: SectorIcon } & React.SVGProps<SVGSVGElement>) {
  const Glyph = sectorIcons[icon]
  return <Glyph {...rest} />
}
