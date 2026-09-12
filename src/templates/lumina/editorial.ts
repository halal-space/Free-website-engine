import type { LookbookItem, PressQuote, EditorialArticle } from './types';

export const LOOKBOOK_ITEMS: LookbookItem[] = [
  {
    id: 'look-01',
    lookNumber: 'LOOK 01',
    title: 'The Monolith Uniform: Double-Breasted Cashmere & Pleated Wool',
    season: '2026 Archive',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1600&auto=format&fit=crop',
    description: 'An arresting presentation of the 750gsm double-breasted cashmere overcoat styled with deep double-pleat tropical wool trousers and the sculptural calfskin tote on marble plinth.',
    hotspots: [
      { x: 48, y: 35, productId: 'prod-01' },
      { x: 50, y: 70, productId: 'prod-03' },
      { x: 75, y: 65, productId: 'prod-10' }
    ]
  },
  {
    id: 'look-02',
    lookNumber: 'LOOK 02',
    title: 'Sartorial Rigor: The Sculpted Peak Blazer & Giza Poplin Stand',
    season: '2026 Archive',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1600&auto=format&fit=crop',
    description: 'Architectural hour-glass tailoring rendered in high-twist fresco wool over crisp standing-collar Egyptian Giza 87 poplin.',
    hotspots: [
      { x: 50, y: 40, productId: 'prod-02' },
      { x: 45, y: 25, productId: 'prod-06' },
      { x: 68, y: 55, productId: 'prod-11' }
    ]
  },
  {
    id: 'look-03',
    lookNumber: 'LOOK 03',
    title: 'Nocturnal Drape: 40-Momme Silk Satin Column on Couture Stand',
    season: 'Sculptural Eveningwear',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1600&auto=format&fit=crop',
    description: 'Liquid midnight silk charmeuse draped on bespoke couture mannequin, highlighted by the lost-wax solid brass kinetic ear sculpt.',
    hotspots: [
      { x: 52, y: 45, productId: 'prod-04' },
      { x: 42, y: 22, productId: 'prod-11' }
    ]
  },
  {
    id: 'look-04',
    lookNumber: 'LOOK 04',
    title: 'Tactile Equilibrium: 7-Gauge Un-Dyed Cashmere & Sculpted Box Calf',
    season: 'Tactile Cashmere Series',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1600&auto=format&fit=crop',
    description: 'Pure 14.5µm un-dyed Mongolian turtleneck paired with the sculpted box calfskin tote and Goodyear-welted chisel boots.',
    hotspots: [
      { x: 48, y: 38, productId: 'prod-05' },
      { x: 70, y: 58, productId: 'prod-10' },
      { x: 40, y: 85, productId: 'prod-12' }
    ]
  }
];

export const PRESS_QUOTES: PressQuote[] = [
  {
    publication: 'VOGUE RUNWAY',
    quote: '“Atelier Vélène’s 2026 Archive is a definitive masterclass in silent luxury. Every garment exudes a weightless monolithic authority.”',
    issue: 'Autumn 2026 Haute Couture Review',
    author: 'Sarah Mower'
  },
  {
    publication: 'WALLPAPER*',
    quote: '“Where architectural precision meets sensory cashmere tactility. Redefining modern European wardrobe purity.”',
    issue: 'Design & Fashion Awards Issue',
    author: 'Jack Moss'
  },
  {
    publication: 'FINANCIAL TIMES HTSI',
    quote: '“Impeccable cut, unyielding ethical provenance, and zero ostentation. The most compelling luxury house of the decade.”',
    issue: 'How To Spend It Luxury Report',
    author: 'Lucia van der Post'
  },
  {
    publication: 'THE BUSINESS OF FASHION',
    quote: '“A uncompromising vision of timeless permanence in an era of ephemeral micro-trends.”',
    issue: 'State of Luxury Index',
    author: 'Tim Blanks'
  }
];

export const EDITORIAL_ARTICLES: EditorialArticle[] = [
  {
    id: 'art-01',
    title: 'The Architecture of the Un-Dyed Fiber',
    subtitle: 'Tracing the 14.5 Micron Cashmere from Mongolian Pastures to Biella',
    category: 'Materiality & Heritage',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1200&auto=format&fit=crop',
    date: 'Autumn 2026',
    quote: '“True luxury begins with respect for raw unbleached fiber in its primordial state.”',
    summary: 'An intimate journey through our sustainable pastoral cooperatives in the Mongolian highlands, documenting how virgin fleece is gently gathered during spring molting and spun in century-old Italian mills without industrial chemical bleaching.',
    shoppableProductIds: ['prod-01', 'prod-05', 'prod-09']
  },
  {
    id: 'art-02',
    title: 'The Anatomy of the Pagoda Shoulder',
    subtitle: 'Deconstructing the Canvas & Floating Core of Atelier Tailoring',
    category: 'Sartorial Craft',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=1200&auto=format&fit=crop',
    date: 'Autumn 2026',
    quote: '“A suit jacket is not merely a garment; it is an architectural scaffold that gives shape to intention.”',
    summary: 'A deep-dive into our floating canvas construction, hand-padded horsehair chest pieces, and the signature concave roped shoulder that requires over 36 hours of hand manipulation per blazer.',
    shoppableProductIds: ['prod-02', 'prod-03', 'prod-06']
  },
  {
    id: 'art-03',
    title: 'Lost-Wax Bronze & The Kinetic Curve',
    subtitle: 'Sculpting Wearable Objects in the Ancient Foundry of Arezzo',
    category: 'Metals & Sculpture',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop',
    date: 'Winter 2026',
    quote: '“Treating jewelry as monumental architectural form scaled to the human contour.”',
    summary: 'How Master Goldsmiths in Tuscany hand-carve bees-wax prototypes before encasing them in ceramic plaster and pouring molten brass at 1,000°C to achieve mirror-polished geometric perfection.',
    shoppableProductIds: ['prod-11', 'prod-10']
  }
];
