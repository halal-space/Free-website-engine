export type StoreKind = 'mothercare' | 'gadgets' | 'clothing';
export type ConceptId = 'm1' | 'm2' | 'm3' | 'g1' | 'g2' | 'g3' | 'c1' | 'c2' | 'c3';

export type Concept = {
  id: ConceptId;
  store: StoreKind;
  storeName: string;
  name: string;
  summary: string;
  desktop: string;
  mobile: string;
  eyebrow: string;
  headline: string;
  intro: string;
  cta: string;
  nav: string[];
};

export type DemoProduct = {
  id: string;
  store: StoreKind;
  category: string;
  name: string;
  price: number;
  image: string;
  description: string;
  detail: string;
  badge?: string;
  sizes?: string[];
};

const asset = (name: string) => `/prototypes/${name}.png`;

export const concepts: Concept[] = [
  { id: 'm1', store: 'mothercare', storeName: 'Sprout & Co.', name: 'The Caring Journal', summary: 'Warm editorial shopping, led by life stage.', desktop: asset('mothercare-1-editorial-desktop'), mobile: asset('mothercare-1-editorial-mobile'), eyebrow: 'The caring journal', headline: 'For every little beginning', intro: 'Thoughtful essentials and gentler guidance for every new chapter.', cta: 'Shop newborn essentials', nav: ['Newborn', 'Baby', 'Toddler', 'Nursery', 'Gifts'] },
  { id: 'm2', store: 'mothercare', storeName: 'Sprout & Co.', name: 'The Playroom Map', summary: 'Joyful discovery with age and gift paths.', desktop: asset('mothercare-2-playful-desktop'), mobile: asset('mothercare-2-playful-mobile'), eyebrow: 'Play grows here', headline: 'A little joy, every day', intro: 'Clothes, toys and everyday favorites for bright little lives.', cta: 'Shop new arrivals', nav: ['By age', 'Clothing', 'Play', 'Sleep', 'Gifts'] },
  { id: 'm3', store: 'mothercare', storeName: 'Sprout & Co.', name: "The Parent's Checklist", summary: 'Fast, reassuring shopping by stage and need.', desktop: asset('mothercare-3-utility-desktop'), mobile: asset('mothercare-3-utility-mobile'), eyebrow: "The parent's checklist", headline: 'Find the right essentials', intro: 'Start with their stage. Find exactly what your day calls for.', cta: 'Find essentials', nav: ['Shop', 'By stage', 'Sleep', 'Gifts'] },
  { id: 'g1', store: 'gadgets', storeName: 'Form & Function', name: 'Cinematic Object', summary: 'Product-led luxury with dramatic photography.', desktop: asset('gadgets-1-cinematic-desktop'), mobile: asset('gadgets-1-cinematic-mobile'), eyebrow: 'A higher standard', headline: 'Sound, without compromise', intro: 'Meticulous engineering. Enduring materials. A more human listening experience.', cta: 'Explore audio', nav: ['Audio', 'Computing', 'Cameras', 'Accessories', 'New'] },
  { id: 'g2', store: 'gadgets', storeName: 'Form & Function', name: 'The Product Lab', summary: 'Use cases, compatibility and comparison up front.', desktop: asset('gadgets-2-lab-desktop'), mobile: asset('gadgets-2-lab-mobile'), eyebrow: 'Tech for a more capable you', headline: 'Find tech that fits your life', intro: 'Compare. Check compatibility. Make it work together.', cta: 'Shop all products', nav: ['Shop by category', 'Audio', 'Computing', 'Compare'] },
  { id: 'g3', store: 'gadgets', storeName: 'Form & Function', name: 'Electric Culture', summary: 'A bold route for creators, gamers and explorers.', desktop: asset('gadgets-3-electric-desktop'), mobile: asset('gadgets-3-electric-mobile'), eyebrow: 'Better gear, brighter days', headline: 'MAKE MORE NOISE', intro: 'Tech for creators, gamers and everyday explorers.', cta: 'Shop the collection', nav: ['For creators', 'Gaming', 'Audio', 'Desk setup', 'All tech'] },
  { id: 'c1', store: 'clothing', storeName: 'Maison Lune', name: 'The Atelier', summary: 'Quiet luxury and a considered collection.', desktop: asset('clothing-1-atelier-desktop'), mobile: asset('clothing-1-atelier-mobile'), eyebrow: 'The atelier', headline: 'A study in modern dressing', intro: 'Refined pieces for a more considered wardrobe.', cta: 'Shop the new collection', nav: ['New', 'Clothing', 'Essentials', 'Accessories'] },
  { id: 'c2', store: 'clothing', storeName: 'Maison Lune', name: 'Fashion Issue', summary: 'Streetwear discovery through a bold magazine lens.', desktop: asset('clothing-2-fashion-issue-desktop'), mobile: asset('clothing-2-fashion-issue-mobile'), eyebrow: 'Fashion issue / 02', headline: 'WEAR WHAT MOVES YOU', intro: 'People, places and outfits for a brighter tomorrow.', cta: 'Explore the edit', nav: ['New in', 'Clothing', 'Denim', 'Accessories'] },
  { id: 'c3', store: 'clothing', storeName: 'Maison Lune', name: 'The Wardrobe Studio', summary: 'Complete looks chosen for your size and occasion.', desktop: asset('clothing-3-wardrobe-desktop'), mobile: asset('clothing-3-wardrobe-mobile'), eyebrow: 'The wardrobe studio', headline: 'Dress well, every day', intro: 'Outfit ideas for your life, in your size, with pieces that work together.', cta: 'Explore complete looks', nav: ['Clothing', 'Essentials', 'New arrivals', 'Accessories'] },
];

export const conceptById = Object.fromEntries(concepts.map(concept => [concept.id, concept])) as Record<ConceptId, Concept>;

const photo = (id: string) => `https://images.unsplash.com/${id}?w=900&q=85`;

export const products: DemoProduct[] = [
  { id: 'swaddle', store: 'mothercare', category: 'Newborn', name: 'Soft cotton swaddle set', price: 34, image: photo('photo-1515488042361-ee00e0ddd4e4'), description: 'Soft layers for the earliest days.', detail: 'Designed for easy everyday use. Check the care label and product details before purchase.', badge: 'Newborn' },
  { id: 'cardigan', store: 'mothercare', category: 'Clothing', name: 'Little knit cardigan', price: 58, image: photo('photo-1519689680058-324335c77eba'), description: 'A cozy layer for little adventures.', detail: 'A comfortable layer that pairs with everyday outfits.', sizes: ['0–3m', '3–6m', '6–12m', '1–2y'] },
  { id: 'blocks', store: 'mothercare', category: 'Play', name: 'Woodland building blocks', price: 42, image: photo('photo-1558060370-d644479cb6f7'), description: 'A playful way to build and imagine.', detail: 'A toy for open-ended play. Review age guidance on the actual product listing before use.', badge: 'For play' },
  { id: 'lamp', store: 'mothercare', category: 'Nursery', name: 'Little cloud nursery lamp', price: 36, image: photo('photo-1540574163026-643ea20ade25'), description: 'A gentle glow for sleepy evenings.', detail: 'A small accent for a calmer nursery space.' },
  { id: 'stroller', store: 'mothercare', category: 'On the go', name: 'Everyday travel stroller', price: 259, image: photo('photo-1503454537195-1dcabb73ffb9'), description: 'Ready for the daily journey.', detail: 'Explore the full specification, dimensions and age guidance before deciding.', badge: 'Popular' },
  { id: 'gift-set', store: 'mothercare', category: 'Gifts', name: 'Welcome baby gift set', price: 72, image: photo('photo-1512909006721-3d6018887383'), description: 'A thoughtful welcome for a new arrival.', detail: 'A curated gift idea for a new family.' },
  { id: 'headphones', store: 'gadgets', category: 'Audio', name: 'Apex wireless headphones', price: 399, image: photo('photo-1505740420928-5e560c06d30e'), description: 'A focused, immersive listening experience.', detail: 'Over-ear design · Wireless audio · Up to 40 hours of listening in this concept.', badge: 'Featured' },
  { id: 'earbuds', store: 'gadgets', category: 'Audio', name: 'Pivot wireless earbuds', price: 179, image: photo('photo-1606220588913-b3aacb4d2f46'), description: 'Small form, big sound.', detail: 'Compact charging case · Wireless connectivity · Travel-ready design.' },
  { id: 'speaker', store: 'gadgets', category: 'Audio', name: 'Beacon portable speaker', price: 249, image: photo('photo-1608043152269-423dbba4e7e1'), description: 'Bring the soundtrack with you.', detail: 'Portable speaker · Bluetooth connectivity · Compact footprint.' },
  { id: 'camera', store: 'gadgets', category: 'Cameras', name: 'Summit compact camera', price: 749, image: photo('photo-1516035069371-29a1b244cc32'), description: 'A remarkable point of view.', detail: 'Compact mirrorless body · Creative controls · Interchangeable lens system.' },
  { id: 'laptop', store: 'gadgets', category: 'Computing', name: 'AeroBook 14', price: 1299, image: photo('photo-1498050108023-c5249f4df085'), description: 'Portable power for work and ideas.', detail: '14-inch display · Lightweight build · All-day workflow.' },
  { id: 'keyboard', store: 'gadgets', category: 'Accessories', name: 'Block mechanical keyboard', price: 149, image: photo('photo-1587829741301-dc798b83add3'), description: 'A tactile desk essential.', detail: 'Mechanical switches · Wired connection · Compact layout.' },
  { id: 'blazer', store: 'clothing', category: 'Clothing', name: 'The tailored blazer', price: 320, image: photo('photo-1539533018447-63fcce2678e3'), description: 'Structure with a softer point of view.', detail: 'A versatile layer for work and weekends. Fit information is illustrative.', sizes: ['XS', 'S', 'M', 'L', 'XL'], badge: 'The edit' },
  { id: 'shirt', store: 'clothing', category: 'Essentials', name: 'Cotton poplin shirt', price: 128, image: photo('photo-1598032895397-b9472444bf93'), description: 'A crisp wardrobe essential.', detail: 'Made for everyday styling. Check measurements before purchase.', sizes: ['XS', 'S', 'M', 'L', 'XL'] },
  { id: 'tote', store: 'clothing', category: 'Accessories', name: 'Everyday leather tote', price: 218, image: photo('photo-1548036328-c9fa89d128fa'), description: 'A considered finishing touch.', detail: 'A spacious bag for daily essentials.' },
  { id: 'trousers', store: 'clothing', category: 'Clothing', name: 'Fluid wide-leg trouser', price: 154, image: photo('photo-1509631179647-0177331693ae'), description: 'Easy movement and elegant drape.', detail: 'A relaxed silhouette that pairs with the tailored blazer.', sizes: ['XS', 'S', 'M', 'L', 'XL'] },
  { id: 'denim', store: 'clothing', category: 'Denim', name: 'Oversized denim jacket', price: 149, image: photo('photo-1483985988355-763728e1935b'), description: 'A casual layer with presence.', detail: 'Relaxed fit. Size down for a closer fit.', sizes: ['XS', 'S', 'M', 'L', 'XL'], badge: 'Bestseller' },
  { id: 'dress', store: 'clothing', category: 'Clothing', name: 'Evening column dress', price: 275, image: photo('photo-1539109136881-3be0616acf4b'), description: 'A simple line for memorable moments.', detail: 'A refined occasion piece with a fluid silhouette.', sizes: ['XS', 'S', 'M', 'L', 'XL'] },
];

export function storeProducts(store: StoreKind): DemoProduct[] {
  return products.filter(product => product.store === store);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
}
