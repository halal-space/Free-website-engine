import type { Category, CuratedCollection } from '../types';

export const categories: Category[] = [
  {
    id: 'cat-1',
    name: 'Baby Essentials',
    slug: 'baby-essentials',
    description: 'Cloud-soft organic swaddles, quilts, changing organizers, and daily wellness essentials.',
    itemCount: 24,
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    id: 'cat-2',
    name: 'Baby Accessories',
    slug: 'baby-accessories',
    description: 'Handmade braided pacifier clips, ribbed top-knot beanies, booties, and organic teethers.',
    itemCount: 18,
    image: 'https://images.unsplash.com/photo-1505377059067-e285a7bac49b?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    id: 'cat-3',
    name: 'Nursery & Feeding',
    slug: 'nursery-feeding',
    description: 'Pure platinum silicone suction dinnerware, European flax bed linens, and serene decor.',
    itemCount: 20,
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    id: 'cat-4',
    name: 'Toys & Play',
    slug: 'toys-play',
    description: 'Heirloom solid beechwood puzzles, Montessori sensory abacuses, and gentle linen companions.',
    itemCount: 16,
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    id: 'cat-5',
    name: "Kids' Clothing",
    slug: 'kids-clothing',
    description: 'Washed French linen rompers, extrafine merino cardigans, and organic cotton lounge sets.',
    itemCount: 22,
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80',
    featured: true,
  },
  {
    id: 'cat-6',
    name: 'School Essentials',
    slug: 'school-essentials',
    description: 'Ergonomic recycled backpacks, leakproof stainless bento lunchboxes, and thermal bottles.',
    itemCount: 15,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    featured: true,
  }
];

export const curatedCollections: CuratedCollection[] = [
  {
    id: 'col-1',
    title: 'Newborn Must-Haves',
    subtitle: 'Gentle Beginnings',
    description: 'Featherweight swaddles, organic first knits, and soothing essentials for tender earliest weeks.',
    image: 'https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=1200&q=85',
    slug: 'baby-essentials',
    itemCount: 14,
    tag: 'Curated Capsule'
  },
  {
    id: 'col-2',
    title: 'Everyday Baby Essentials',
    subtitle: 'Practical Luxury',
    description: 'Thoughtfully engineered tableware, changing caddies, and calming nursery accents.',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=1200&q=85',
    slug: 'nursery-feeding',
    itemCount: 18,
    tag: 'Daily Rituals'
  },
  {
    id: 'col-3',
    title: 'Back to School',
    subtitle: 'Little Explorers',
    description: 'Heavyweight canvas backpacks, double-wall stainless thermal flasks, and compartmentalized bentos.',
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=900&q=80',
    slug: 'school-essentials',
    itemCount: 12,
    tag: 'Autumn Term'
  },
  {
    id: 'col-4',
    title: 'Gifts for Little Ones',
    subtitle: 'Heirloom Treasures',
    description: 'Hand-sanded wooden puzzles, pure merino knits, and keepsake gift boxes wrapped in linen ribbon.',
    image: 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=900&q=80',
    slug: 'toys-play',
    itemCount: 16,
    tag: 'Bespoke Gifting'
  },
  {
    id: 'col-5',
    title: 'Playtime Favorites',
    subtitle: 'Montessori & Wonder',
    description: 'Natural wooden balance sets, tactile counting frames, and open-ended developmental wonders.',
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=900&q=80',
    slug: 'toys-play',
    itemCount: 15,
    tag: 'Natural Play'
  }
];
