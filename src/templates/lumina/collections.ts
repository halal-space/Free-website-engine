import type { CollectionItem } from './types';

export const COLLECTIONS: CollectionItem[] = [
  {
    id: 'the-2026-archive',
    slug: 'the-2026-archive',
    title: 'The 2026 Archive',
    tagline: 'Silhouettes in Monochrome & Architectural Discipline',
    season: 'Autumn / Winter',
    year: '2026',
    description: 'A study in form, proportion, and quiet volume. The 2026 Archive eliminates the ornamental in pursuit of structural purity. Heavyweight Mongolian cashmere, high-twist fresco wool, and razor-sharp peak lapels compose an austere uniform for the modern vanguard.',
    heroImage: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1600&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1200&auto=format&fit=crop',
    curatorNote: '“We began with monolithic architectural forms: brutalist concrete lines rendered soft through 750gsm double-faced cashmere and unyielding French tailoring.”',
    featuredProductIds: ['prod-01', 'prod-02', 'prod-03', 'prod-06', 'prod-07']
  },
  {
    id: 'sculptural-eveningwear',
    slug: 'sculptural-eveningwear',
    title: 'Sculptural Eveningwear',
    tagline: 'Liquid Silk Gowns & Bias-Cut Georgette on Couturier Stands',
    season: 'Spring / Summer Nocturne',
    year: '2026',
    description: 'Fluidity mastered through mathematical precision. Heavy 40-momme mulberry silk charmeuse and sandwashed crepes draped on bespoke couture stands to capture nocturnal glamour with zero superfluous ornamentation.',
    heroImage: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1600&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=1200&auto=format&fit=crop',
    curatorNote: '“Eveningwear stripped of all distraction. Pure drape, weighted hemlines, and liquid movement that speaks with quiet authority.”',
    featuredProductIds: ['prod-04', 'prod-08', 'prod-11', 'prod-10']
  },
  {
    id: 'tactile-cashmere-series',
    slug: 'tactile-cashmere-series',
    title: 'Tactile Cashmere Series',
    tagline: 'Un-Dyed Mongolian Fibers & Royal Baby Alpaca Cocoon Knits',
    season: 'Permanent Capsule',
    year: '2026',
    description: 'An exploration of sensory tactile luxury. Knitted in Umbria from 14.5µm un-dyed pure cashmere and hand-brushed Peruvian royal baby alpaca, celebrating the honest, raw beauty of unbleached natural fibers.',
    heroImage: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1600&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1200&auto=format&fit=crop',
    curatorNote: '“We chose to preserve the virgin shade of the herd. Each garment carries the earthy nuance of the high Mongolian plateau.”',
    featuredProductIds: ['prod-05', 'prod-09', 'prod-01', 'prod-10']
  },
  {
    id: 'leather-archives',
    slug: 'leather-archives',
    title: 'The Leather & Footwear Archive',
    tagline: 'Full-Grain Box Calf & Goodyear-Welted Chisel-Toe Silhouettes',
    season: 'Permanent Collection',
    year: '2026',
    description: 'Hand-beveled box calfskin and Tuscan vegetable-tanned vachetta crafted by generational artisans in Florence and Northamptonshire. Sculptural, timeless objects engineered for lifetime endurance.',
    heroImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1600&auto=format&fit=crop',
    secondaryImage: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=1200&auto=format&fit=crop',
    curatorNote: '“Uncompromising structural integrity. Box calfskin hand-finished with five layers of edge paint and solid pale-gold hardware.”',
    featuredProductIds: ['prod-10', 'prod-12', 'prod-11']
  }
];

export function getCollectionBySlug(slug: string): CollectionItem | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}
