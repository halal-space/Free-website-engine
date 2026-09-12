export function u(
  id: string,
  opts: { w?: number; h?: number; q?: number; fit?: 'crop' | 'clip' } = {},
): string {
  const params = new URLSearchParams({
    auto: 'format',
    q: String(opts.q ?? 82),
  });
  if (opts.w) params.set('w', String(opts.w));
  if (opts.h) params.set('h', String(opts.h));
  params.set('fit', opts.fit ?? 'crop');
  return `https://images.unsplash.com/${id}?${params.toString()}`;
}

export interface AureliaCategory {
  slug: string;
  name: string;
  description: string;
  image: string;
  count: number;
}

export interface AureliaProductSpec {
  label: string;
  value: string;
}

export interface AureliaProductColor {
  id: string;
  name: string;
  hex: string;
}

export interface AureliaProduct {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  tagline: string;
  description: string;
  price: number;
  compareAt?: number;
  rating: number;
  ratingCount: number;
  badges: ('editor' | 'new' | 'best-seller')[];
  availability: 'in-stock' | 'low-stock' | 'pre-order' | 'sold-out';
  stock?: number;
  colors?: AureliaProductColor[];
  image: string;
  gallery: { src: string; alt: string }[];
  specs: AureliaProductSpec[];
}

export const aureliaCategories: AureliaCategory[] = [
  {
    slug: 'smartphones',
    name: 'Smartphones',
    description: 'Flagship phones engineered around the camera, the display, and the hand.',
    image: u('photo-1511707171634-5f897ff02aa9', { w: 900, h: 1100 }),
    count: 5,
  },
  {
    slug: 'audio',
    name: 'Audio',
    description: 'Headphones and speakers tuned to reveal what your music was hiding.',
    image: u('photo-1583394838336-acd977736f90', { w: 900, h: 1100 }),
    count: 5,
  },
  {
    slug: 'smartwatches',
    name: 'Smartwatches',
    description: 'Precision timepieces that carry your whole day on your wrist.',
    image: u('photo-1546868871-7041f2a55e12', { w: 900, h: 1100 }),
    count: 4,
  },
  {
    slug: 'laptops',
    name: 'Laptops',
    description: 'Thin, silent, and absurdly fast machines built for serious work.',
    image: u('photo-1496181133206-80ce9b88a853', { w: 900, h: 1100 }),
    count: 4,
  },
  {
    slug: 'gaming',
    name: 'Gaming',
    description: 'Immersive hardware with the latency, power, and silence of a flagship.',
    image: u('photo-1587202372775-e229f172b9d7', { w: 900, h: 1100 }),
    count: 4,
  },
  {
    slug: 'accessories',
    name: 'Accessories',
    description: 'Everyday tools finished to the same standard as our flagship devices.',
    image: u('photo-1587829741301-dc798b83add3', { w: 900, h: 1100 }),
    count: 4,
  },
  {
    slug: 'smart-home',
    name: 'Smart Home',
    description: 'Quiet intelligence for the spaces where you actually live.',
    image: u('photo-1558002038-1055907df827', { w: 900, h: 1100 }),
    count: 4,
  },
];

const colors = {
  obsidian: { id: 'obsidian', name: 'Obsidian Black', hex: '#0b0b0d' },
  silver: { id: 'silver', name: 'Titanium Silver', hex: '#c9cbd1' },
  royal: { id: 'royal', name: 'Royal Blue', hex: '#2e4bf3' },
  graphite: { id: 'graphite', name: 'Graphite', hex: '#3a3a40' },
  espresso: { id: 'espresso', name: 'Espresso', hex: '#3b2b23' },
};

export const aureliaProducts: AureliaProduct[] = [
  {
    id: 'nova-x-pro',
    slug: 'nova-x-pro',
    name: 'Nova X Pro',
    brand: 'AURELIA',
    category: 'smartphones',
    tagline: 'The most refined phone ever made.',
    description: 'A titanium-frame flagship with a 6.8" LTPO display, a pro-camera system built around a 1-inch sensor, and three days of intelligent battery life.',
    price: 1299,
    compareAt: 1399,
    rating: 4.9,
    ratingCount: 2481,
    badges: ['editor', 'new'],
    availability: 'in-stock',
    colors: [colors.obsidian, colors.silver, colors.royal],
    image: u('photo-1592750475338-74b7b21085ab', { w: 800, h: 900 }),
    gallery: [{ src: u('photo-1592750475338-74b7b21085ab', { w: 800, h: 900 }), alt: 'Nova X Pro' }],
    specs: [
      { label: 'Display', value: '6.8" LTPO OLED, 3,000 nits' },
      { label: 'Chip', value: 'A18 Neural Engine' },
      { label: 'Camera', value: '1" main, periscope telephoto' },
      { label: 'Battery', value: '5,400 mAh, 3-day typical' },
      { label: 'Frame', value: 'Grade-5 titanium' },
      { label: 'Charging', value: '80W wired, 50W wireless' },
    ],
  },
  {
    id: 'aura-pro',
    slug: 'aura-pro',
    name: 'Aura Pro',
    brand: 'AURELIA',
    category: 'audio',
    tagline: 'Immersive sound. Reimagined.',
    description: 'Planar magnetic drivers meet custom adaptive noise cancellation. Finished in aerospace aluminum and full-grain leather.',
    price: 449,
    compareAt: 499,
    rating: 4.9,
    ratingCount: 1892,
    badges: ['editor', 'best-seller'],
    availability: 'in-stock',
    colors: [colors.obsidian, colors.silver, colors.espresso],
    image: u('photo-1583394838336-acd977736f90', { w: 800, h: 900 }),
    gallery: [{ src: u('photo-1583394838336-acd977736f90', { w: 800, h: 900 }), alt: 'Aura Pro' }],
    specs: [
      { label: 'Frequency', value: '5 Hz – 48,000 Hz' },
      { label: 'Drivers', value: '45mm custom planar magnetic' },
      { label: 'Battery', value: '42 hours (ANC on)' },
      { label: 'Codecs', value: 'LDAC, aptX Adaptive, AAC' },
    ],
  },
  {
    id: 'chronos-ultra',
    slug: 'chronos-ultra',
    name: 'Chronos Ultra',
    brand: 'AURELIA',
    category: 'smartwatches',
    tagline: 'Sapphire glass. 100m water resistance.',
    description: 'A precision smartwatch built from grade-5 titanium with dual-frequency GPS, offline topo maps, and 14-day battery life.',
    price: 899,
    rating: 4.8,
    ratingCount: 1120,
    badges: ['new'],
    availability: 'in-stock',
    colors: [colors.obsidian, colors.silver],
    image: u('photo-1546868871-7041f2a55e12', { w: 800, h: 900 }),
    gallery: [{ src: u('photo-1546868871-7041f2a55e12', { w: 800, h: 900 }), alt: 'Chronos Ultra' }],
    specs: [
      { label: 'Case', value: '49mm titanium' },
      { label: 'Display', value: 'Sapphire crystal, 2,500 nits' },
      { label: 'Water', value: '100m / 10 ATM' },
      { label: 'Battery', value: 'Up to 14 days' },
    ],
  },
  {
    id: 'visionbook-pro',
    slug: 'visionbook-pro',
    name: 'VisionBook Pro 16',
    brand: 'AURELIA',
    category: 'laptops',
    tagline: 'Pure performance. Zero compromises.',
    description: 'Powered by the M4 Max architecture with a Mini-LED Liquid Retina display, 128GB unified memory, and 22-hour battery.',
    price: 2499,
    compareAt: 2699,
    rating: 4.9,
    ratingCount: 845,
    badges: ['editor'],
    availability: 'in-stock',
    colors: [colors.silver, colors.graphite],
    image: u('photo-1496181133206-80ce9b88a853', { w: 800, h: 900 }),
    gallery: [{ src: u('photo-1496181133206-80ce9b88a853', { w: 800, h: 900 }), alt: 'VisionBook Pro' }],
    specs: [
      { label: 'Display', value: '16.2" Mini-LED, 120Hz' },
      { label: 'Processor', value: '16-core CPU, 40-core GPU' },
      { label: 'Memory', value: 'Up to 128GB unified' },
      { label: 'Battery', value: '22 hours video playback' },
    ],
  },
  {
    id: 'pulse-buds-pro',
    slug: 'pulse-buds-pro',
    name: 'Pulse Buds Pro',
    brand: 'AURELIA',
    category: 'audio',
    tagline: 'Studio-grade acoustics in your pocket.',
    description: 'Dual-driver coaxial design with spatial audio and dynamic head tracking. 8 hours listening on a single charge.',
    price: 279,
    rating: 4.7,
    ratingCount: 3210,
    badges: ['best-seller'],
    availability: 'in-stock',
    colors: [colors.obsidian, colors.silver],
    image: u('photo-1593305841991-05c297ba4575', { w: 800, h: 900 }),
    gallery: [{ src: u('photo-1593305841991-05c297ba4575', { w: 800, h: 900 }), alt: 'Pulse Buds Pro' }],
    specs: [
      { label: 'Drivers', value: '11mm woofer + 6mm planar tweeter' },
      { label: 'Noise Cancelling', value: 'Active ANC up to 48dB' },
      { label: 'Battery', value: '8h buds, 32h case' },
    ],
  },
  {
    id: 'titan-controller',
    slug: 'titan-controller',
    name: 'Titan Pro Controller',
    brand: 'AURELIA',
    category: 'gaming',
    tagline: 'Precision mechanical switches. Zero drift.',
    description: 'Hall effect magnetic joysticks, mechanical tactile switches, and customizable back paddles with micro-second response time.',
    price: 199,
    rating: 4.8,
    ratingCount: 950,
    badges: [],
    availability: 'in-stock',
    colors: [colors.obsidian, colors.silver],
    image: u('photo-1587202372775-e229f172b9d7', { w: 800, h: 900 }),
    gallery: [{ src: u('photo-1587202372775-e229f172b9d7', { w: 800, h: 900 }), alt: 'Titan Controller' }],
    specs: [
      { label: 'Sensors', value: 'Hall Effect magnetic' },
      { label: 'Latency', value: '0.8ms wireless' },
      { label: 'Switches', value: 'Tactile mechanical' },
    ],
  },
  {
    id: 'halo-speaker',
    slug: 'halo-speaker',
    name: 'Halo Spatial Speaker',
    brand: 'AURELIA',
    category: 'audio',
    tagline: 'Room-filling 360° architectural sound.',
    description: 'Solid aluminum enclosure with eight custom transducers delivering immersive high-resolution spatial audio with room calibration.',
    price: 399,
    compareAt: 449,
    rating: 4.6,
    ratingCount: 640,
    badges: [],
    availability: 'in-stock',
    colors: [colors.obsidian, colors.silver],
    image: u('photo-1558002038-1055907df827', { w: 800, h: 900 }),
    gallery: [{ src: u('photo-1558002038-1055907df827', { w: 800, h: 900 }), alt: 'Halo Speaker' }],
    specs: [
      { label: 'Output', value: '120W RMS' },
      { label: 'Transducers', value: '8 custom arranged drivers' },
      { label: 'Connectivity', value: 'Wi-Fi 6E, AirPlay 2, Bluetooth 5.4' },
    ],
  },
  {
    id: 'aura-fold',
    slug: 'aura-fold',
    name: 'Aura Fold',
    brand: 'AURELIA',
    category: 'smartphones',
    tagline: 'Zero crease. Boundless canvas.',
    description: 'An ultra-slim foldable with a seamless 8.02" inner flexible OLED display, titanium hinge mechanism, and pro triple-lens camera.',
    price: 1799,
    compareAt: 1899,
    rating: 4.8,
    ratingCount: 430,
    badges: ['new'],
    availability: 'low-stock',
    stock: 4,
    colors: [colors.obsidian, colors.silver],
    image: u('photo-1512941937669-90a1b58e7e9c', { w: 800, h: 900 }),
    gallery: [{ src: u('photo-1512941937669-90a1b58e7e9c', { w: 800, h: 900 }), alt: 'Aura Fold' }],
    specs: [
      { label: 'Inner Display', value: '8.02" LTPO Foldable OLED' },
      { label: 'Outer Display', value: '6.56" AMOLED' },
      { label: 'Hinge', value: 'Zero-gap titanium droplet' },
      { label: 'Thickness', value: '4.8mm unfolded' },
    ],
  },
];

export const newArrivalsProducts = aureliaProducts.filter((p) => p.badges.includes('new') || p.id === 'pulse-buds-pro' || p.id === 'titan-controller');
export const bestSellersProducts = [aureliaProducts[1], aureliaProducts[0], aureliaProducts[4], aureliaProducts[2], aureliaProducts[3], aureliaProducts[5]];

export const aureliaSiteMeta = {
  name: 'AURELIA',
  tagline: 'Technology, Refined.',
  description: 'Precision-engineered gadgets designed for people who expect more from technology.',
  url: 'https://aurelia.tech',
  contact: {
    email: 'care@aurelia.tech',
    phone: '+1 (888) 555-0184',
    hours: 'Mon – Fri, 9am – 6pm ET',
  },
  socials: [
    { name: 'Instagram', href: 'https://instagram.com' },
    { name: 'X', href: 'https://x.com' },
    { name: 'YouTube', href: 'https://youtube.com' },
    { name: 'TikTok', href: 'https://tiktok.com' },
  ],
  footerLinks: {
    shop: [
      { label: 'All Products', href: '#products' },
      { label: 'New Arrivals', href: '#new-arrivals' },
      { label: 'Best Sellers', href: '#best-sellers' },
      { label: 'Deals', href: '#showcase' },
      { label: 'Gift Cards', href: '#categories' },
    ],
    categories: [
      { label: 'Smartphones', href: '#categories' },
      { label: 'Audio', href: '#categories' },
      { label: 'Smartwatches', href: '#categories' },
      { label: 'Laptops', href: '#categories' },
      { label: 'Gaming', href: '#categories' },
    ],
    support: [
      { label: 'Contact Us', href: '#footer' },
      { label: 'Shipping & Returns', href: '#footer' },
      { label: 'Warranty Policy', href: '#footer' },
      { label: 'Help & FAQ', href: '#footer' },
    ],
    company: [
      { label: 'About AURELIA', href: '#story' },
      { label: 'Customer Account', href: '#' },
      { label: 'Saved Wishlist', href: '#' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
    ],
  },
  trustBadges: [
    'Free 2-day shipping over $499',
    '30-day free returns',
    '2-year warranty',
    'Secure checkout',
  ],
};
