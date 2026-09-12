import type { Product, CurrencyConfig, CurrencyCode } from './types';

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', rate: 1.0, label: 'USD ($)' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92, label: 'EUR (€)' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79, label: 'GBP (£)' },
  JPY: { code: 'JPY', symbol: '¥', rate: 154.0, label: 'JPY (¥)' },
};

export const PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    slug: 'the-monolith-double-breasted-cashmere-coat',
    name: 'The Monolith Double-Breasted Coat',
    subtitle: '100% Mongolian Cashmere · Structured Peak Lapels',
    category: 'outerwear',
    categoryLabel: 'Outerwear',
    collection: 'The 2026 Archive',
    price: 3450,
    isNew: true,
    isLimited: true,
    editionNumber: '08 / 50',
    badge: 'Limited Archive',
    description: 'Masterfully tailored from 100% double-faced Mongolian cashmere sourced directly from sustainable pastoral cooperatives. The Monolith Coat features architectural drop shoulders, razor-sharp peak lapels, and hand-finished pick-stitching along the interior facing. Displayed on our signature couture tailor stand.',
    editorialQuote: '“An imposing yet weightless silhouette that redefines modern architectural tailoring.” — Vogue Runway',
    composition: '100% Loro Piana Mongolian Cashmere; Cupro lining',
    origin: 'Handcrafted in Biella, Italy',
    details: [
      'Double-faced 750gsm virgin cashmere',
      'Hand-sewn horn buttons engraved with Atelier insignia',
      'Two interior jetted ticket pockets and concealed chest pocket',
      'Full floating canvas construction for natural drape',
      'Includes bespoke wooden hanger and breathable garment travel shroud'
    ],
    careInstructions: [
      'Specialist dry clean only',
      'Store on provided contoured cedar hanger in a temperature-regulated environment',
      'Steam lightly from 15cm distance; avoid direct iron contact'
    ],
    specs: [
      { label: 'Weight', value: '750 gsm Heavyweight Drape' },
      { label: 'Closure', value: 'Double-Breasted 6-Button' },
      { label: 'Lining', value: '100% Bemberg Cupro' },
      { label: 'Fit', value: 'Relaxed Architectural Silhouette' }
    ],
    colors: [
      { name: 'Obsidian Noir', hex: '#0C0C0D', imageIndex: 0 },
      { name: 'Alabaster Stone', hex: '#E2DDD5', imageIndex: 1 },
      { name: 'Espresso Melange', hex: '#2B231F', imageIndex: 2 }
    ],
    sizes: [
      { name: '36 FR (XS)', inStock: true, stockCount: 2 },
      { name: '38 FR (S)', inStock: true, stockCount: 4 },
      { name: '40 FR (M)', inStock: true, stockCount: 3 },
      { name: '42 FR (L)', inStock: true, stockCount: 1 },
      { name: '44 FR (XL)', inStock: false, stockCount: 0 }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop',
        alt: 'The Monolith Coat displayed on an artisan tailor mannequin in studio lighting',
        type: 'mannequin',
        label: 'Tailor Mannequin View'
      },
      {
        url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1200&auto=format&fit=crop',
        alt: 'The Monolith Coat flat-lay composition on limestone slab',
        type: 'flatlay',
        label: 'Studio Flat Lay'
      },
      {
        url: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1200&auto=format&fit=crop',
        alt: 'Close-up macro detail of cashmere fabric weave and hand pick-stitching',
        type: 'macro',
        label: 'Fabric Macro Zoom'
      }
    ],
    rating: 5.0,
    reviewCount: 14,
    completeTheLookIds: ['prod-05', 'prod-10', 'prod-12']
  },
  {
    id: 'prod-02',
    slug: 'the-sculpted-peak-lapel-blazer',
    name: 'The Sculpted Peak-Lapel Blazer',
    subtitle: 'High-Twist Fresco Wool · Hourglass Silhouette',
    category: 'tailoring',
    categoryLabel: 'Tailoring',
    collection: 'The 2026 Archive',
    price: 2150,
    isNew: true,
    badge: 'New Arrival',
    description: 'Precision-tailored from high-twist fresco wool sourced from centuries-old Biellese mills. The Sculpted Blazer achieves an arresting hourglass proportion through high-armscye cut and reinforced roped shoulders. Balanced between sartorial rigor and modern fluidity.',
    editorialQuote: '“Sculptural mastery captured through crisp lines and architectural restraint.” — Wallpaper*',
    composition: '100% Super 150s Fresco Wool; 100% Silk lining',
    origin: 'Tailored in Milan, Italy',
    details: [
      'Hand-padded canvas chest piece that softens to the wearer',
      'Exaggerated high peak lapels with milanese buttonhole',
      'Deep dual back vents for graceful movement',
      'Genuine mother-of-pearl buttons with counter-button support'
    ],
    careInstructions: [
      'Professional gentle dry clean',
      'Brush with natural horsehair garment brush after each wear',
      'Hang on contoured suit hanger'
    ],
    specs: [
      { label: 'Fabric Grade', value: 'Super 150s High-Twist Wool' },
      { label: 'Shoulder', value: 'Roped Pagoda Shoulder' },
      { label: 'Vents', value: 'Dual Side Vents' },
      { label: 'Buttoning', value: 'Single Button Stance' }
    ],
    colors: [
      { name: 'Noir Matte', hex: '#111112', imageIndex: 0 },
      { name: 'Chalk White', hex: '#F4F2EC', imageIndex: 1 },
      { name: 'Slate Taupe', hex: '#4A4643', imageIndex: 2 }
    ],
    sizes: [
      { name: '34 FR (XXS)', inStock: true, stockCount: 1 },
      { name: '36 FR (XS)', inStock: true, stockCount: 5 },
      { name: '38 FR (S)', inStock: true, stockCount: 6 },
      { name: '40 FR (M)', inStock: true, stockCount: 2 },
      { name: '42 FR (L)', inStock: true, stockCount: 2 }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1200&auto=format&fit=crop',
        alt: 'The Sculpted Peak-Lapel Blazer on professional tailor stand in studio lighting',
        type: 'mannequin',
        label: 'Front Mannequin View'
      },
      {
        url: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?q=80&w=1200&auto=format&fit=crop',
        alt: 'Flat lay arrangement of the tailored blazer with brass details',
        type: 'flatlay',
        label: 'Flat Lay View'
      },
      {
        url: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=1200&auto=format&fit=crop',
        alt: 'Close-up macro of fresco wool fabric and interior silk piping',
        type: 'macro',
        label: 'Macro Fabric & Stitching'
      }
    ],
    rating: 4.9,
    reviewCount: 21,
    completeTheLookIds: ['prod-03', 'prod-06', 'prod-12']
  },
  {
    id: 'prod-03',
    slug: 'wide-leg-pleated-wool-trouser',
    name: 'Wide-Leg Pleated Wool Trouser',
    subtitle: 'Deep Double Pleats · Extended Tab Waistband',
    category: 'tailoring',
    categoryLabel: 'Tailoring',
    collection: 'The 2026 Archive',
    price: 1150,
    isNew: false,
    badge: 'Atelier Essential',
    description: 'An expansive silhouette cut with generous deep forward pleats that cascade down to a wide pooling hem. Engineered with an extended hidden-tab waistband and interior curtain waistband construction for an immaculate, seamless contour.',
    editorialQuote: '“The ultimate fluid trouser — dramatic volume grounded by bespoke tailoring discipline.”',
    composition: '100% Virgin Tropical Wool',
    origin: 'Crafted in Florence, Italy',
    details: [
      'Double forward pleats with razor-pressed center crease',
      'Extended tab closure with concealed sliding clasp',
      'Unfinished hem allowing customized bespoke tailoring',
      'Viscose-lined to the knee for effortless glide'
    ],
    careInstructions: ['Dry clean only', 'Press with damp pressing cloth'],
    specs: [
      { label: 'Rise', value: 'High-Rise (32cm)' },
      { label: 'Leg Opening', value: '31cm Wide Hem' },
      { label: 'Waistband', value: 'Internal Sartorial Curtain' }
    ],
    colors: [
      { name: 'Noir Matte', hex: '#111112', imageIndex: 0 },
      { name: 'Oatmeal Sand', hex: '#D8D1C5', imageIndex: 1 }
    ],
    sizes: [
      { name: '36 FR', inStock: true, stockCount: 4 },
      { name: '38 FR', inStock: true, stockCount: 7 },
      { name: '40 FR', inStock: true, stockCount: 5 },
      { name: '42 FR', inStock: true, stockCount: 3 }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1200&auto=format&fit=crop',
        alt: 'Tailored pleated trousers flat lay on studio limestone',
        type: 'flatlay',
        label: 'Studio Flat Lay'
      },
      {
        url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200&auto=format&fit=crop',
        alt: 'Fabric close up showing tropical wool texture and sartorial chalk lines',
        type: 'macro',
        label: 'Tailor Bench Detail'
      }
    ],
    rating: 4.8,
    reviewCount: 19,
    completeTheLookIds: ['prod-02', 'prod-06', 'prod-11']
  },
  {
    id: 'prod-04',
    slug: 'the-column-silk-satin-evening-gown',
    name: 'The Column Silk Satin Gown',
    subtitle: 'Heavyweight Mulberry Silk Charmeuse on Atelier Stand',
    category: 'dresses',
    categoryLabel: 'Dresses & Gowns',
    collection: 'Sculptural Eveningwear',
    price: 3890,
    isNew: true,
    isLimited: true,
    editionNumber: '04 / 25',
    badge: 'Couture Piece',
    description: 'Displayed upon our signature matte black couturier mannequin: The Column Gown is sculpted from a singular bolt of 40-momme heavy silk satin. Features a deep architectural cowl neckline, precision diagonal bias cut that hugs and releases the silhouette, and a delicate trailing sweep train.',
    editorialQuote: '“Liquid silk frozen into monolithic form. Pure sartorial drama without a single superfluous seam.”',
    composition: '100% Mulberry Silk Charmeuse (40 momme)',
    origin: 'Hand-sewn in Paris Haute Couture Salon',
    details: [
      'Sculpted bias construction for effortless drape on tailor form',
      'Concealed French hand-rolled seams throughout',
      'Weighted hem with invisible chain weight for poised movement',
      'Concealed side zip with hook-and-eye closure',
      'Arrives in custom archival cedar preservation box'
    ],
    careInstructions: [
      'Specialist luxury couture dry clean only',
      'Do not hang by shoulder straps; store flat in provided archival box',
      'Steaming only via indirect professional boiler'
    ],
    specs: [
      { label: 'Silk Momme', value: '40 Momme Ultra-Luxe Grade' },
      { label: 'Train', value: '45cm Sculpted Sweep Train' },
      { label: 'Neckline', value: 'Architectural Asymmetric Cowl' }
    ],
    colors: [
      { name: 'Onyx Black', hex: '#0A0A0A', imageIndex: 0 },
      { name: 'Pearl Champagne', hex: '#EDE6D8', imageIndex: 1 },
      { name: 'Burnished Bronze', hex: '#634B35', imageIndex: 2 }
    ],
    sizes: [
      { name: '34 FR', inStock: true, stockCount: 1 },
      { name: '36 FR', inStock: true, stockCount: 2 },
      { name: '38 FR', inStock: true, stockCount: 2 },
      { name: '40 FR', inStock: false, stockCount: 0 }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1200&auto=format&fit=crop',
        alt: 'The Column Silk Gown displayed on an elegant couture tailor mannequin with dramatic studio shadows',
        type: 'mannequin',
        label: 'Couture Mannequin View'
      },
      {
        url: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=1200&auto=format&fit=crop',
        alt: 'Ultra close-up macro of heavyweight silk charmeuse fabric lustre',
        type: 'macro',
        label: 'Silk Charmeuse Macro'
      },
      {
        url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop',
        alt: 'Silk evening gown garment flat-lay with sculptural brass accessories',
        type: 'flatlay',
        label: 'Editorial Flat Lay'
      }
    ],
    rating: 5.0,
    reviewCount: 8,
    completeTheLookIds: ['prod-11', 'prod-10', 'prod-12']
  },
  {
    id: 'prod-05',
    slug: 'chunky-7-gauge-mongolian-cashmere-turtleneck',
    name: '7-Gauge Cashmere Turtleneck',
    subtitle: 'Un-Dyed Pure Mongolian Cashmere · Chunky Fisherman Rib',
    category: 'knitwear',
    categoryLabel: 'Knitwear',
    collection: 'Tactile Cashmere Series',
    price: 1480,
    isNew: true,
    badge: 'Bestseller',
    description: 'Spun from the finest un-dyed Mongolian white cashmere fibers with an average micron count of 14.5µm. Knitted on a 7-gauge heavy flatbed machine with a generous enveloping high collar and exaggerated ribbed cuffs that puddle gracefully over the hands.',
    editorialQuote: '“Sensory perfection in knitwear. An intimate cocoon of un-dyed pure luxury.”',
    composition: '100% Grade-A Mongolian Cashmere (14.5 Micron)',
    origin: 'Spun and hand-loomed in Umbria, Italy',
    details: [
      'Knitted from 6-ply twisted long-staple cashmere yarn',
      'Seamless fully-fashioned raglan shoulder construction',
      'Hand-linked ribbed collar that maintains structural height',
      'Naturally hypoallergenic and temperature regulating'
    ],
    careInstructions: [
      'Hand wash in cold water using luxury cashmere shampoo',
      'Dry flat on towel away from direct sunlight',
      'Use natural cedar blocks for storage'
    ],
    specs: [
      { label: 'Gauge', value: '7-Gauge Heavyweight' },
      { label: 'Yarn Ply', value: '6-Ply Long-Staple' },
      { label: 'Micron Count', value: '14.5 µm Superfine' }
    ],
    colors: [
      { name: 'Raw Ecru', hex: '#EBE5D8', imageIndex: 0 },
      { name: 'Deep Espresso', hex: '#261F1D', imageIndex: 1 },
      { name: 'Charcoal Smoke', hex: '#38383A', imageIndex: 2 }
    ],
    sizes: [
      { name: 'XS / S', inStock: true, stockCount: 5 },
      { name: 'M / L', inStock: true, stockCount: 6 },
      { name: 'XL', inStock: true, stockCount: 2 }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1200&auto=format&fit=crop',
        alt: 'Folded cashmere knitwear flat-lay exhibiting heavy ribbed textures on limestone slab',
        type: 'flatlay',
        label: 'Folded Texture'
      },
      {
        url: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1200&auto=format&fit=crop',
        alt: 'Macro zoom of un-dyed 7-gauge cashmere rib stitches',
        type: 'macro',
        label: 'Knit Macro Zoom'
      }
    ],
    rating: 4.9,
    reviewCount: 34,
    completeTheLookIds: ['prod-01', 'prod-03', 'prod-10']
  },
  {
    id: 'prod-06',
    slug: 'the-architectural-poplin-shirt',
    name: 'The Architectural Poplin Shirt',
    subtitle: 'Egyptian Giza 87 Cotton · Dramatic High Collar',
    category: 'tailoring',
    categoryLabel: 'Tailoring',
    collection: 'The 2026 Archive',
    price: 680,
    isNew: false,
    badge: 'Signature',
    description: 'Crafted from crisp 200/2 Egyptian Giza 87 cotton poplin with a paper-like, sculptural hand feel. Designed with a clean concealed placket, elongated 3-button cuffs, and a dramatic standing wing collar that frames the neck with geometric elegance.',
    editorialQuote: '“The definitive white shirt, elevated through architectural cut and surgical proportions.”',
    composition: '100% Giza 87 Extra-Long Staple Cotton Poplin',
    origin: 'Crafted in Lake Como, Italy',
    details: [
      '200/2 double-twisted compact yarn with natural silky sheen',
      'Mother-of-pearl Australian buttons concealed behind clean fly',
      'Twin back pleats for generous volume',
      'Curved high-low hem with side gusset reinforcement'
    ],
    careInstructions: ['Machine wash delicate in mesh bag', 'Press while damp on high heat'],
    specs: [
      { label: 'Yarn Count', value: '200/2 Compact Double Twist' },
      { label: 'Placket', value: 'Concealed Fly Front' },
      { label: 'Collar', value: '7cm Stand-Point Collar' }
    ],
    colors: [
      { name: 'Optic White', hex: '#FFFFFF', imageIndex: 0 },
      { name: 'Sky Stripe', hex: '#D8E2EC', imageIndex: 1 },
      { name: 'Sable Noir', hex: '#161616', imageIndex: 2 }
    ],
    sizes: [
      { name: '36 FR', inStock: true, stockCount: 8 },
      { name: '38 FR', inStock: true, stockCount: 12 },
      { name: '40 FR', inStock: true, stockCount: 9 },
      { name: '42 FR', inStock: true, stockCount: 4 }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1200&auto=format&fit=crop',
        alt: 'Architectural poplin shirts displayed on minimalist studio wooden surface',
        type: 'flatlay',
        label: 'Studio Composition'
      },
      {
        url: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1200&auto=format&fit=crop',
        alt: 'Close-up of Giza cotton poplin texture and clean concealed placket stitching',
        type: 'macro',
        label: 'Poplin Weave Macro'
      }
    ],
    rating: 4.8,
    reviewCount: 42,
    completeTheLookIds: ['prod-02', 'prod-03', 'prod-11']
  },
  {
    id: 'prod-07',
    slug: 'the-sculpted-trench-in-water-repellent-cotton-silk',
    name: 'The Sculpted Storm Trench',
    subtitle: 'Water-Repellent Cotton-Silk Gabardine · Storm Shield',
    category: 'outerwear',
    categoryLabel: 'Outerwear',
    collection: 'The 2026 Archive',
    price: 2890,
    isNew: true,
    badge: 'Archive Highlight',
    description: 'An expansive transformation of the classic trench coat, rendered in dense Japanese cotton-silk gabardine with natural water repellency. Features an exaggerated storm flap, raglan sleeve volume, and a wide buckled belt with brushed palladium hardware.',
    editorialQuote: '“A shield of quiet armor against the elements. Utilitarian roots elevated to high fashion art.”',
    composition: '65% Organic Giza Cotton, 35% Mulberry Silk Gabardine',
    origin: 'Tailored in Okayama & Milan',
    details: [
      'Dense 480gsm Japanese gabardine weave with fluorocarbon-free water repellency',
      'Brushed palladium buckle and D-ring accoutrements',
      'Detachable storm throat latch with hidden storage under collar',
      'Signature inverted box pleat at rear with button tab'
    ],
    careInstructions: ['Dry clean with petroleum solvent only', 'Steam to refresh form'],
    specs: [
      { label: 'Length', value: '130cm Maxi Floor Line' },
      { label: 'Hardware', value: 'Palladium Brushed Solid Brass' },
      { label: 'Weather', value: 'High Water & Wind Repellent' }
    ],
    colors: [
      { name: 'Warm Khaki Stone', hex: '#A89F8D', imageIndex: 0 },
      { name: 'Obsidian Noir', hex: '#0D0D0E', imageIndex: 1 }
    ],
    sizes: [
      { name: '36 FR', inStock: true, stockCount: 3 },
      { name: '38 FR', inStock: true, stockCount: 5 },
      { name: '40 FR', inStock: true, stockCount: 4 },
      { name: '42 FR', inStock: true, stockCount: 1 }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop',
        alt: 'The Sculpted Storm Trench displayed on an architectural fashion mannequin in minimal studio',
        type: 'mannequin',
        label: 'Full Mannequin View'
      },
      {
        url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1200&auto=format&fit=crop',
        alt: 'Macro texture of water-repellent cotton silk gabardine weave',
        type: 'macro',
        label: 'Gabardine Macro'
      }
    ],
    rating: 5.0,
    reviewCount: 16,
    completeTheLookIds: ['prod-06', 'prod-03', 'prod-10']
  },
  {
    id: 'prod-08',
    slug: 'draped-bias-cut-silk-slip-dress',
    name: 'Draped Bias-Cut Silk Slip',
    subtitle: 'Heavy Silk Georgette on Sculptural Tailor Stand',
    category: 'dresses',
    categoryLabel: 'Dresses & Gowns',
    collection: 'Sculptural Eveningwear',
    price: 1850,
    isNew: false,
    badge: 'Iconic Silhouettes',
    description: 'Constructed on a 45-degree true bias to naturally trace and accentuate contours. Showcased on our bespoke linen tailor stand: features micro-thin silk rouleau straps, a scooped low back with cross-tie anchor, and a floor-sweeping fluid silhouette.',
    editorialQuote: '“Effortless sensuality distilled into mathematical bias-cut purity.”',
    composition: '100% Sandwashed Silk Crepe de Chine',
    origin: 'Hand-sewn in Lyon, France',
    details: [
      'Full diagonal true-bias grainline cut',
      'Double-faced self-lined bodice for modesty and structure',
      'Micro-tubular silk hand-turned rouleau straps',
      'Hand-stitched baby hem throughout'
    ],
    careInstructions: ['Dry clean only', 'Store flat; do not hang'],
    specs: [
      { label: 'Cut', value: '45-Degree True Bias' },
      { label: 'Straps', value: '2mm Hand-Rolled Rouleau' },
      { label: 'Finish', value: 'Sandwashed Velvet Hand' }
    ],
    colors: [
      { name: 'Bronze Ochre', hex: '#8C6843', imageIndex: 0 },
      { name: 'Midnight Obsidian', hex: '#0B0B0C', imageIndex: 1 },
      { name: 'Ivory Cream', hex: '#F3EFE6', imageIndex: 2 }
    ],
    sizes: [
      { name: '34 FR', inStock: true, stockCount: 2 },
      { name: '36 FR', inStock: true, stockCount: 4 },
      { name: '38 FR', inStock: true, stockCount: 3 },
      { name: '40 FR', inStock: true, stockCount: 1 }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1200&auto=format&fit=crop',
        alt: 'Draped silk slip dress displayed on a sculpted dressmaker form with soft lighting',
        type: 'mannequin',
        label: 'Dressmaker Stand View'
      },
      {
        url: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=1200&auto=format&fit=crop',
        alt: 'Close-up macro of sandwashed silk crepe texture',
        type: 'macro',
        label: 'Sandwashed Silk Macro'
      },
      {
        url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop',
        alt: 'Draped silk garment flat-lay composition on stone',
        type: 'flatlay',
        label: 'Flat Lay Composition'
      }
    ],
    rating: 4.9,
    reviewCount: 27,
    completeTheLookIds: ['prod-01', 'prod-11', 'prod-10']
  },
  {
    id: 'prod-09',
    slug: 'brushed-alpaca-oversized-knit-sweater',
    name: 'Brushed Alpaca Cocoon Knit',
    subtitle: 'Royal Baby Alpaca & Silk · Hand-Brushed Cloud Feel',
    category: 'knitwear',
    categoryLabel: 'Knitwear',
    collection: 'Tactile Cashmere Series',
    price: 1220,
    isNew: true,
    badge: 'New Arrival',
    description: 'An ethereal cocoon of warmth, hand-loomed from 70% Royal Baby Alpaca and 30% Mulberry Silk. Each garment is hand-brushed with natural teasel heads to release a subtle halo of softness that captures ambient light.',
    editorialQuote: '“Weightless tactile luxury that feels like wearing condensed morning mist.”',
    composition: '70% Royal Baby Alpaca, 30% Mulberry Silk',
    origin: 'Hand-loomed in Arequipa, Peru & Finished in Milan',
    details: [
      'Hand-brushed with natural thistle for softest cloud halo',
      'Dropped shoulder silhouette with gentle volume at the hem',
      'Ribbed neckline and tubular knit cuffs',
      'Featherlight 280g total weight with immense thermal retention'
    ],
    careInstructions: ['Dry clean or gentle hand wash cold', 'Dry flat on mesh screen'],
    specs: [
      { label: 'Fiber', value: '18 Micron Royal Baby Alpaca' },
      { label: 'Weight', value: '280g Ultra-Light Cloud' },
      { label: 'Technique', value: 'Natural Teasel Hand-Brushing' }
    ],
    colors: [
      { name: 'Oatmeal Mist', hex: '#DDD6C9', imageIndex: 0 },
      { name: 'Charcoal Slate', hex: '#2A2A2E', imageIndex: 1 }
    ],
    sizes: [
      { name: 'XS / S', inStock: true, stockCount: 6 },
      { name: 'M / L', inStock: true, stockCount: 5 }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1200&auto=format&fit=crop',
        alt: 'Folded brushed alpaca knit flat-lay showing halo texture',
        type: 'flatlay',
        label: 'Tactile Flat Lay'
      },
      {
        url: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1200&auto=format&fit=crop',
        alt: 'Macro close-up of brushed alpaca fibers and silk core yarn',
        type: 'macro',
        label: 'Fiber Macro Close-up'
      }
    ],
    rating: 5.0,
    reviewCount: 18,
    completeTheLookIds: ['prod-03', 'prod-10', 'prod-12']
  },
  {
    id: 'prod-10',
    slug: 'the-sculptural-calfskin-tote-no-1',
    name: 'The Sculptural Calfskin Tote No. 1',
    subtitle: 'Full-Grain Box Calf Leather · Solid Brass Clasp',
    category: 'leather-accessories',
    categoryLabel: 'Leather & Accessories',
    collection: 'Leather Archives',
    price: 2450,
    isNew: true,
    isLimited: true,
    editionNumber: '19 / 40',
    badge: 'Limited Archive',
    description: 'Sculpted from a single hide of French full-grain box calf leather with hand-painted raw edge beveling. Features an architectural trapezoidal silhouette, reinforced structured base, and custom solid brass kinetic lock mechanism.',
    editorialQuote: '“A masterpiece of reductive leather craftsmanship. Unyielding architecture in supple hide.”',
    composition: '100% French Full-Grain Box Calfskin; Nappa Leather interior',
    origin: 'Handmade by Master Artisans in Florence, Italy',
    details: [
      'Hand-beveled and edge-painted with 5 coats of matte varnish',
      'Solid brass clasp with brushed pale-champagne finish',
      'Removable interior zip pouch in matching calfskin',
      'Reinforced base with 5 protective brass feet'
    ],
    careInstructions: [
      'Treat with natural beeswax leather balm once yearly',
      'Store in provided unbleached cotton dust cover with padding'
    ],
    specs: [
      { label: 'Dimensions', value: '42cm W x 31cm H x 18cm D' },
      { label: 'Handle Drop', value: '24cm Shoulder Clearance' },
      { label: 'Hardware', value: 'Solid Brass Palladium Plate' }
    ],
    colors: [
      { name: 'Noir Ébène', hex: '#0B0B0C', imageIndex: 0 },
      { name: 'Cuir Caramel', hex: '#7A4A28', imageIndex: 1 },
      { name: 'Craie Blanc', hex: '#EBE7DF', imageIndex: 2 }
    ],
    sizes: [
      { name: 'One Size', inStock: true, stockCount: 4 }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop',
        alt: 'The Sculptural Calfskin Tote on polished travertine plinth in dramatic studio lighting',
        type: 'flatlay',
        label: 'Studio Plinth View'
      },
      {
        url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1200&auto=format&fit=crop',
        alt: 'Macro zoom of full-grain box calf leather pore structure and brass lock',
        type: 'macro',
        label: 'Leather & Lock Macro'
      }
    ],
    rating: 5.0,
    reviewCount: 31,
    completeTheLookIds: ['prod-01', 'prod-02', 'prod-12']
  },
  {
    id: 'prod-11',
    slug: 'solid-brass-kinetic-ear-cuff',
    name: 'Solid Brass Kinetic Ear Sculpt',
    subtitle: 'Hand-Carved Lost-Wax Cast · 24K Pale Gold Vermeil',
    category: 'leather-accessories',
    categoryLabel: 'Leather & Accessories',
    collection: 'Jewelry Archive',
    price: 490,
    isNew: true,
    badge: 'Artisan Object',
    description: 'Sculpted via centuries-old lost-wax casting technique. The Kinetic Ear Sculpt clips securely over the cartilage with no piercing required, catching light with every turn through hand-hammered planar facets.',
    editorialQuote: '“Wearable architectural sculpture that commands the room in silence.”',
    composition: 'Solid Brass with 5-Micron 24K Pale Gold Vermeil',
    origin: 'Cast and hand-polished in Arezzo, Italy',
    details: [
      'Non-pierced tension-fit design with adjustable interior curve',
      'Mirror-polished planar facets with satin brushed edges',
      'Hypoallergenic palladium barrier layer',
      'Stamped with individual artisan registry mark'
    ],
    careInstructions: ['Buff gently with included microfiber polishing cloth', 'Keep away from moisture and perfume'],
    specs: [
      { label: 'Weight', value: '18.4 Grams Balanced' },
      { label: 'Plating', value: '5-Micron 24K Pale Gold' },
      { label: 'Fit', value: 'Comfort-Engineered Tension Clip' }
    ],
    colors: [
      { name: 'Pale Gold Vermeil', hex: '#C5A880', imageIndex: 0 },
      { name: 'Sterling Rhodium', hex: '#D6D8DC', imageIndex: 1 }
    ],
    sizes: [
      { name: 'Universal Clip', inStock: true, stockCount: 9 }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop',
        alt: 'Kinetic ear sculpture displayed on volcanic basalt stone stand',
        type: 'flatlay',
        label: 'Basalt Plinth Display'
      },
      {
        url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop',
        alt: 'Macro of lost-wax cast gold vermeil surface texture and facet reflections',
        type: 'macro',
        label: 'Cast Facet Macro'
      }
    ],
    rating: 4.9,
    reviewCount: 15,
    completeTheLookIds: ['prod-04', 'prod-08', 'prod-10']
  },
  {
    id: 'prod-12',
    slug: 'handcrafted-leather-chelsea-boot',
    name: 'The Monolith Leather Chelsea Boot',
    subtitle: 'Vachetta Calfskin · Goodyear Welted Leather Sole',
    category: 'leather-accessories',
    categoryLabel: 'Leather & Accessories',
    collection: 'Footwear Archive',
    price: 1290,
    isNew: false,
    badge: 'Permanent Collection',
    description: 'An austere, elongated chisel-toe Chelsea boot hand-welted in Northamptonshire using full-grain Tuscan vegetable-tanned vachetta. Built upon a stacked leather sole with flush brass toe taps for permanent structural integrity.',
    editorialQuote: '“The definitive luxury boot: immaculate balance between brutalist lines and artisanal comfort.”',
    composition: '100% Tuscan Vegetable-Tanned Vachetta Calfskin',
    origin: 'Handmade in Northamptonshire, England',
    details: [
      '270-degree Goodyear welt construction with channeled sole stitch',
      'Solid brass toe taps embedded flush into oak-bark tanned leather sole',
      'Heavyweight Japanese elastic side gussets for effortless entry',
      'Full calfskin lining with cushioned cork footbed that molds to foot'
    ],
    careInstructions: ['Condition with neutral beeswax cream', 'Insert cedar boot trees after each wear'],
    specs: [
      { label: 'Welt', value: 'Goodyear Welted 270°' },
      { label: 'Sole', value: 'Oak-Bark Tanned Leather + Brass Tap' },
      { label: 'Last', value: 'Chisel-Toe Elongated Last 04' }
    ],
    colors: [
      { name: 'Noir Polished', hex: '#0E0E0F', imageIndex: 0 },
      { name: 'Dark Havane', hex: '#312117', imageIndex: 1 }
    ],
    sizes: [
      { name: '39 EU', inStock: true, stockCount: 2 },
      { name: '40 EU', inStock: true, stockCount: 4 },
      { name: '41 EU', inStock: true, stockCount: 6 },
      { name: '42 EU', inStock: true, stockCount: 5 },
      { name: '43 EU', inStock: true, stockCount: 3 },
      { name: '44 EU', inStock: true, stockCount: 2 }
    ],
    images: [
      {
        url: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=1200&auto=format&fit=crop',
        alt: 'Handcrafted leather boots on polished concrete studio floor',
        type: 'flatlay',
        label: 'Studio Floor View'
      },
      {
        url: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1200&auto=format&fit=crop',
        alt: 'Close-up of Goodyear welt stitch and vachetta leather grain',
        type: 'macro',
        label: 'Welt Stitch Macro'
      }
    ],
    rating: 5.0,
    reviewCount: 38,
    completeTheLookIds: ['prod-01', 'prod-02', 'prod-03']
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getFeaturedProducts(limit = 4): Product[] {
  return PRODUCTS.slice(0, limit);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'all') return PRODUCTS;
  return PRODUCTS.filter((p) => p.category === category);
}
