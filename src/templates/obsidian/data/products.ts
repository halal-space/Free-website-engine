import { Product, ProductType } from '../types';

export const TYPE_LABELS: Record<ProductType, string> = {
  panel: 'Solar Panel',
  battery: 'Battery Storage',
  inverter: 'Inverter',
  ev: 'EV Charger',
};

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const products: Product[] = [
  {
    slug: 'obsidian-440-mono',
    name: 'Obsidian 440 Mono',
    brand: 'Obsidian',
    type: 'panel',
    tagline: 'High-density residential panel',
    specLine: '440W · Mono PERC · 21.3% efficiency',
    specs: ['440W output', '21.3% efficiency', '1722 × 1134 × 30 mm', '25-year performance warranty'],
    price: 289,
    unit: 'per panel',
    wattage: 440,
    warranty: '25 years',
    image: img('photo-1509391366360-2e959784a276'),
    badge: 'Best seller',
    description:
      'Our standard residential panel. All-black frame, high output per square metre, built for architecturally sensitive roofs. Performs in low light and high heat without compromise.',
  },
  {
    slug: 'obsidian-550-bifacial',
    name: 'Obsidian 550 Bifacial',
    brand: 'Obsidian',
    type: 'panel',
    tagline: 'Dual-face commercial output',
    specLine: '550W · Bifacial · 22.1% efficiency',
    specs: ['550W front + up to 15% rear gain', '22.1% efficiency', 'Dual glass, frameless option', '30-year performance warranty'],
    price: 389,
    unit: 'per panel',
    wattage: 550,
    warranty: '30 years',
    image: img('photo-1521618755572-156ae0cdd74d'),
    badge: 'Commercial',
    description:
      'For flat roofs and ground arrays where reflected light can be harvested. Dual-glass construction rated for 30 years. Specified on most of our commercial installs.',
  },
  {
    slug: 'helios-410-architect',
    name: 'Helios 410 Architect',
    brand: 'Helios',
    type: 'panel',
    tagline: 'Low-profile design panel',
    specLine: '410W · Full-black · 20.8% efficiency',
    specs: ['410W output', 'Full-black aesthetic', '35 mm low profile', '25-year warranty'],
    price: 329,
    unit: 'per panel',
    wattage: 410,
    warranty: '25 years',
    image: img('photo-1613666210365-783b3eafbd82'),
    description:
      'Designed with architects. Fully black cells, backsheet and frame disappear against slate and standing-seam metal. Slightly lower wattage, materially better appearance.',
  },
  {
    slug: 'vault-13-battery',
    name: 'Vault 13.5 Battery',
    brand: 'Obsidian',
    type: 'battery',
    tagline: 'Whole-home backup unit',
    specLine: '13.5 kWh · LFP · 10 kW peak',
    specs: ['13.5 kWh LFP chemistry', '10 kW peak output', 'Stackable to 4 units', '15-year warranty'],
    price: 8900,
    unit: 'installed',
    capacityKwh: 13.5,
    warranty: '15 years',
    image: img('photo-1621905251189-08b45d6a269e'),
    badge: 'Most installed',
    description:
      'Lithium iron phosphate storage for overnight use and outage protection. Wall-mounted, silent, monitored. Most homes add one unit. Larger homes stack two.',
  },
  {
    slug: 'vault-27-stack',
    name: 'Vault 27 Stack',
    brand: 'Obsidian',
    type: 'battery',
    tagline: 'Dual-unit independence package',
    specLine: '27 kWh · Dual LFP · Off-grid capable',
    specs: ['27 kWh combined', 'Off-grid capable with islanding', 'Load-shedding controls', '15-year warranty'],
    price: 16500,
    unit: 'installed',
    capacityKwh: 27,
    warranty: '15 years',
    image: img('photo-1581092160562-40aa08e78837'),
    description:
      'Two Vault units paired with automatic islanding. Runs critical loads through multi-day outages. Sized for homes targeting genuine independence.',
  },
  {
    slug: 'current-8-hybrid-inverter',
    name: 'Current 8 Hybrid',
    brand: 'Voltaic',
    type: 'inverter',
    tagline: 'Solar + battery hybrid',
    specLine: '8 kW · Hybrid · 97.6% efficiency',
    specs: ['8 kW continuous', '97.6% CEC efficiency', 'Battery-ready', '12-year warranty, extendable'],
    price: 2450,
    unit: 'installed',
    wattage: 8000,
    warranty: '12 years',
    image: img('photo-1504307651254-35680f356dfd'),
    description:
      'The control unit for solar-plus-storage systems. Manages panels, battery and grid in milliseconds. Quiet, compact, monitored remotely by our service team.',
  },
  {
    slug: 'current-12-commercial',
    name: 'Current 12 Commercial',
    brand: 'Voltaic',
    type: 'inverter',
    tagline: 'Three-phase commercial',
    specLine: '12 kW · 3-phase · 98.1% efficiency',
    specs: ['12 kW three-phase', '98.1% efficiency', 'AFCI + rapid shutdown', '15-year warranty'],
    price: 3900,
    unit: 'installed',
    wattage: 12000,
    warranty: '15 years',
    image: img('photo-1486406146926-c627a92ad1ab'),
    description:
      'Three-phase string inverter for commercial roofs. Arc-fault protection and module-level shutdown as standard. Commissioned and monitored by our engineers.',
  },
  {
    slug: 'charge-22-ev',
    name: 'Charge 22 EV',
    brand: 'Voltaic',
    type: 'ev',
    tagline: '22 kW home charging',
    specLine: '22 kW · Type 2 · Solar-matched',
    specs: ['22 kW three-phase', 'Solar excess matching', 'Load balancing', '5-year warranty'],
    price: 1290,
    unit: 'installed',
    warranty: '5 years',
    image: img('photo-1593941707882-a5bba14938c7'),
    badge: 'New',
    description:
      'Charges your car from excess solar before exporting to the grid. Load balancing protects your main fuse. Installed alongside any of our systems.',
  },
  {
    slug: 'charge-7-compact',
    name: 'Charge 7 Compact',
    brand: 'Voltaic',
    type: 'ev',
    tagline: 'Single-phase discreet charger',
    specLine: '7.4 kW · Type 2 · App control',
    specs: ['7.4 kW single-phase', 'Scheduled + app control', 'Indoor/outdoor rated', '5-year warranty'],
    price: 890,
    unit: 'installed',
    warranty: '5 years',
    image: img('photo-1617704548623-340376564e68'),
    description:
      'Compact single-phase charger for apartments and smaller supplies. Same solar-matching software as the 22 kW unit in a smaller enclosure.',
  },
  {
    slug: 'helios-505-premium',
    name: 'Helios 505 Premium',
    brand: 'Helios',
    type: 'panel',
    tagline: 'Flagship high-output panel',
    specLine: '505W · N-Type · 22.8% efficiency',
    specs: ['505W N-type cells', '22.8% efficiency', '-0.24%/°C temp coefficient', '30-year warranty'],
    price: 449,
    unit: 'per panel',
    wattage: 505,
    warranty: '30 years',
    image: img('photo-1548337138-e87d889cc369'),
    badge: 'Flagship',
    description:
      'Our highest-output residential panel. N-type cells hold output in heat. Fewer panels for the same array size. Specified where roof space is constrained.',
  },
];

export const brands = ['Obsidian', 'Helios', 'Voltaic'];

export function formatPrice(n: number): string {
  return n.toLocaleString('en-US');
}
