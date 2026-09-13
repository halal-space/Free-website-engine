import { Category, Product, CategoryItem } from "../types";

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

export const CATEGORIES: { id: Category; label: string; blurb: string; image: string }[] = [
  { id: "cleansers", label: "Cleansers", blurb: "Melt away the day", image: img("1631729371254-42c2892f0e6e", 900) },
  { id: "serums", label: "Serums", blurb: "Concentrated renewal", image: img("1617897903246-719242758050", 900) },
  { id: "moisturizers", label: "Moisturizers", blurb: "Lasting hydration", image: img("1601049676869-702ea24cfd58", 900) },
  { id: "face-oils", label: "Face Oils", blurb: "Liquid luminosity", image: img("1573461160327-b450ce3d8e7f", 900) },
  { id: "masks", label: "Masks", blurb: "Weekly restoration", image: img("1585652757141-8837d676fac8", 900) },
  { id: "body-care", label: "Body Care", blurb: "Rituals beyond the face", image: img("1526758097130-bab247274f58", 900) },
];

export const PRODUCTS: Product[] = [
  {
    slug: "velour-cleansing-balm",
    name: "Velour Cleansing Balm",
    tagline: "A melting balm-to-milk cleanser that dissolves the day without stripping skin.",
    category: "cleansers",
    price: 54,
    rating: 4.9,
    reviewCount: 412,
    sizes: [
      { label: "50 ml", modifier: 0 },
      { label: "100 ml", modifier: 22 },
    ],
    badge: "Best Seller",
    description:
      "An opulent sorbet balm that transforms into a silky milk on contact with water, lifting away makeup, SPF and city residue while preserving the skin's delicate moisture barrier. Camellia and rice bran oils leave skin cushioned, calm and never tight.",
    benefits: [
      "Dissolves stubborn makeup and SPF completely",
      "Rinses clean without film or tightness",
      "Respects and reinforces the moisture barrier",
      "Melts into a milk with warm water — no cloth required",
    ],
    howToUse:
      "Warm a pearl-sized amount between dry fingertips. Massage over dry skin in slow circular motions, then emulsify with lukewarm water and rinse. Follow with a water-based cleanse if wearing heavy makeup.",
    heroIngredients: ["Camellia Oil", "Rice Bran Wax", "Oat Lipids"],
    inci:
      "Ethylhexyl Palmitate, Caprylic/Capric Triglyceride, PEG-20 Glyceryl Triisostearate, Synthetic Wax, Camellia Japonica Seed Oil, Oryza Sativa (Rice) Bran Wax, Avena Sativa (Oat) Kernel Oil, Tocopherol, Helianthus Annuus (Sunflower) Seed Oil, Parfum*.",
    skinTypes: ["Dry", "Normal", "Combination", "Sensitive"],
    concern: "Barrier health",
    images: [img("1631729371254-42c2892f0e6e"), img("1585652757141-8837d676fac8")],
  },
  {
    slug: "botanica-gel-cleanser",
    name: "Botanica Gel Cleanser",
    tagline: "A weightless gel that purifies with botanicals, never harshness.",
    category: "cleansers",
    price: 42,
    rating: 4.7,
    reviewCount: 286,
    sizes: [
      { label: "150 ml", modifier: 0 },
      { label: "250 ml", modifier: 18 },
    ],
    description:
      "A crystal-clear gel infused with chamomile water and gentle sugar-derived surfactants. It sweeps away impurity and excess oil while keeping the acid mantle undisturbed — skin feels freshly laundered, never squeaky.",
    benefits: [
      "Removes impurities and excess sebum",
      "Sulfate-free, pH-balanced formula",
      "Calms redness with chamomile and centella",
      "Preps skin to fully absorb actives",
    ],
    howToUse:
      "Morning and evening, massage one pump over damp skin for thirty seconds. Rinse thoroughly and pat dry. Avoid direct eye area.",
    heroIngredients: ["Chamomile Water", "Centella Asiatica", "Sugar Surfactants"],
    inci:
      "Aqua, Chamomilla Recutita Flower Water, Glycerin, Coco-Glucoside, Sodium Cocoyl Glutamate, Centella Asiatica Extract, Panthenol, Allantoin, Sodium Hyaluronate, Citric Acid, Sodium Benzoate, Potassium Sorbate.",
    skinTypes: ["Oily", "Combination", "Normal", "Sensitive"],
    concern: "Clarity",
    images: [img("1611930022073-b7a4ba5fcccd"), img("1601049676869-702ea24cfd58")],
  },
  {
    slug: "lumiere-vitamin-c-serum",
    name: "Lumière Vitamin C Serum",
    tagline: "15% stabilized vitamin C for visible radiance in fourteen days.",
    category: "serums",
    price: 88,
    rating: 4.8,
    reviewCount: 693,
    sizes: [
      { label: "30 ml", modifier: 0 },
      { label: "50 ml", modifier: 32 },
    ],
    badge: "Best Seller",
    description:
      "Our signature radiance serum pairs 15% ethylated L-ascorbic acid with ferulic acid and kakadu plum — the world's richest source of vitamin C — to visibly brighten, even tone and defend against environmental stress. Weightless, fast-absorbing, quietly addictive.",
    benefits: [
      "Brightens dullness and evens skin tone",
      "Softens the look of dark spots over time",
      "Antioxidant shield against pollution and UV stress",
      "Boosts collagen for firmer-looking skin",
    ],
    howToUse:
      "Each morning after cleansing, apply 4–5 drops to face and neck before moisturizer. Layer under SPF. Introduce every other day if new to vitamin C.",
    heroIngredients: ["15% Vitamin C", "Ferulic Acid", "Kakadu Plum"],
    inci:
      "Propanediol, Ascorbic Acid, Ethoxydiglycol, Terminalia Ferdinandiana (Kakadu Plum) Extract, Ferulic Acid, Sodium Hyaluronate, Glycerin, Tocopherol, Vitis Vinifera (Grape) Seed Extract, Xanthan Gum, Phenoxyethanol, Ethylhexylglycerin.",
    skinTypes: ["All skin types"],
    concern: "Radiance",
    images: [img("1617897903246-719242758050"), img("1505944270255-72b8c68c6a70")],
  },
  {
    slug: "nocturne-retinol-elixir",
    name: "Nocturne Retinol Elixir",
    tagline: "Encapsulated 0.5% retinol, buffered with bakuchiol for graceful renewal.",
    category: "serums",
    price: 112,
    rating: 4.9,
    reviewCount: 358,
    sizes: [{ label: "30 ml", modifier: 0 }],
    badge: "New",
    description:
      "A midnight-blue night elixir where time-released retinol meets soothing bakuchiol, squalane and ceramides. Renewal without the reckoning — fine lines soften, texture refines, and mornings begin with glass-like skin.",
    benefits: [
      "Visibly smooths fine lines and refined pores",
      "Time-release encapsulation minimizes irritation",
      "Bakuchiol amplifies results, buffers sensitivity",
      "Ceramide complex restores overnight",
    ],
    howToUse:
      "Two to three evenings per week, apply a pea-sized amount to dry skin after cleansing, before moisturizer. Always pair with morning SPF. Build frequency gradually.",
    heroIngredients: ["0.5% Encapsulated Retinol", "Bakuchiol", "Ceramide NP"],
    inci:
      "Caprylic/Capric Triglyceride, Squalane, Dimethyl Isosorbide, Hydroxypinacolone Retinoate, Bakuchiol, Ceramide NP, Cholesterol, Phytosphingosine, Bisabolol, Tocopherol, Simmondsia Chinensis (Jojoba) Seed Oil.",
    skinTypes: ["Normal", "Combination", "Dry", "Mature"],
    concern: "Fine lines",
    images: [img("1631730359585-38a4935cbec4"), img("1612817288484-6f916006741a")],
  },
  {
    slug: "hydra-veil-essence",
    name: "Hydra Veil Essence",
    tagline: "Five molecular weights of hyaluronic acid in a dewy, plumping veil.",
    category: "serums",
    price: 76,
    rating: 4.8,
    reviewCount: 501,
    sizes: [
      { label: "30 ml", modifier: 0 },
      { label: "50 ml", modifier: 26 },
    ],
    description:
      "A featherlight essence that floods skin with five weights of hyaluronic acid, polyglutamic acid and snow mushroom. Surface lines soften within minutes; deep reserves of moisture carry through the day.",
    benefits: [
      "Instantly plumps and smooths dehydrated skin",
      "Multi-depth hydration that lasts 24 hours",
      "Creates a dewy canvas for makeup",
      "Fragrance-free and barrier-safe",
    ],
    howToUse:
      "Morning and night, press 2–3 drops into damp skin after cleansing. Layer beneath serums and creams; reapply midday over makeup with fingertips if needed.",
    heroIngredients: ["5× Hyaluronic Acid", "Polyglutamic Acid", "Snow Mushroom"],
    inci:
      "Aqua, Glycerin, Sodium Hyaluronate, Hydrolyzed Hyaluronic Acid, Sodium Acetylated Hyaluronate, Hydrolyzed Sodium Hyaluronate, Tremella Fuciformis Sporocarp Extract, Polyglutamic Acid, Panthenol, Beta-Glucan, 1,2-Hexanediol, Ethylhexylglycerin.",
    skinTypes: ["All skin types", "Dehydrated"],
    concern: "Hydration",
    images: [img("1608571423902-eed4a5ad8108"), img("1631729371254-42c2892f0e6e")],
  },
  {
    slug: "creme-de-lune",
    name: "Crème de Lune",
    tagline: "A moonlit moisturizer rich in peptides and cold-pressed oils.",
    category: "moisturizers",
    price: 94,
    rating: 4.9,
    reviewCount: 574,
    sizes: [
      { label: "50 ml", modifier: 0 },
      { label: "75 ml", modifier: 28 },
    ],
    badge: "Best Seller",
    description:
      "Our most-loved cream: whipped, cloud-soft and quietly powerful. Nine signal peptides stimulate firmness while murumuru and evening primrose oils seal in overnight repair. Skin wakes rested, sculpted, luminous.",
    benefits: [
      "Firms and smooths with 9-peptide complex",
      "Deeply nourishes without congestion",
      "Supports natural overnight repair",
      "Rich texture that absorbs beautifully",
    ],
    howToUse:
      "Evenings, warm a small scoop between palms and press upward over face and neck. For very dry skin, layer over Hydra Veil Essence.",
    heroIngredients: ["9 Signal Peptides", "Murumuru Butter", "Evening Primrose"],
    inci:
      "Aqua, Glycerin, Caprylic/Capric Triglyceride, Astrocaryum Murumuru Seed Butter, Oenothera Biennis (Evening Primrose) Oil, Palmitoyl Tripeptide-1, Palmitoyl Tetrapeptide-7, Acetyl Hexapeptide-8, Squalane, Niacinamide, Cetearyl Alcohol, Tocopherol, Sodium Benzoate.",
    skinTypes: ["Dry", "Normal", "Mature"],
    concern: "Firmness",
    images: [img("1567721913486-6585f069b332"), img("1540555700478-4be289fbecef")],
  },
  {
    slug: "featherlight-day-cream",
    name: "Featherlight Day Cream",
    tagline: "Weightless daily hydration with mineral SPF 30 and an airbrush finish.",
    category: "moisturizers",
    price: 68,
    rating: 4.6,
    reviewCount: 339,
    sizes: [{ label: "50 ml", modifier: 0 }],
    description:
      "A breathable daily cream with non-nano zinc and blue-light-filtering antioxidants. It vanishes on application — no white cast, no pilling — leaving a soft-focus satin finish that plays beautifully under makeup or alone.",
    benefits: [
      "Broad-spectrum SPF 30, invisible finish",
      "Blue-light defense for screen-bound days",
      "Mattifies without drying",
      "Layers cleanly under concealer",
    ],
    howToUse:
      "Each morning as the final step, apply generously and evenly. Reapply every two hours of direct sun exposure.",
    heroIngredients: ["Non-Nano Zinc", "Niacinamide", "Green Tea Polyphenols"],
    inci:
      "Zinc Oxide (Non-Nano), Aqua, Caprylic/Capric Triglyceride, Glycerin, Niacinamide, Camellia Sinensis Leaf Extract, Silica, Squalane, Tocopheryl Acetate, Bisabolol, Iron Oxides (CI 77492), Polyhydroxystearic Acid.",
    skinTypes: ["Oily", "Combination", "Normal"],
    concern: "Daily protection",
    images: [img("1601049676869-702ea24cfd58"), img("1631729371254-42c2892f0e6e")],
  },
  {
    slug: "golden-hour-face-oil",
    name: "Golden Hour Face Oil",
    tagline: "Thirteen precious oils pressed at their peak for lit-from-within glow.",
    category: "face-oils",
    price: 86,
    rating: 4.9,
    reviewCount: 447,
    sizes: [
      { label: "30 ml", modifier: 0 },
      { label: "50 ml", modifier: 24 },
    ],
    badge: "Best Seller",
    description:
      "Amber-toned and weightless, this cult oil blends sea buckthorn, rosehip, marula and 24k-gold mica for a finish that catches candlelight. It melts in completely — glow without grease, comfort without residue.",
    benefits: [
      "Instant luminosity, never greasy",
      "Strengthens a stressed moisture barrier",
      "Softens the appearance of fine lines",
      "Doubles as a cuticle and hair-end elixir",
    ],
    howToUse:
      "Warm 3–4 drops between palms and press over damp skin as the final step of your ritual, morning or night. Sweep excess over cheekbones for highlight.",
    heroIngredients: ["Sea Buckthorn", "Marula Oil", "Rosehip CO₂"],
    inci:
      "Simmondsia Chinensis (Jojoba) Seed Oil, Sclerocarya Birrea (Marula) Kernel Oil, Rosa Canina Fruit Oil, Hippophae Rhamnoides Oil, Oenothera Biennis Oil, Argania Spinosa Kernel Oil, Mica, Tocopherol, Bisabolol, Parfum* (*natural).",
    skinTypes: ["Dry", "Normal", "Mature", "Combination"],
    concern: "Glow",
    images: [img("1573461160327-b450ce3d8e7f"), img("1608571423902-eed4a5ad8108")],
  },
  {
    slug: "neroli-nectar-facial-oil",
    name: "Neroli Nectar Facial Oil",
    tagline: "Aromatherapeutic neroli and squalane for serene, supple skin.",
    category: "face-oils",
    price: 72,
    rating: 4.7,
    reviewCount: 218,
    sizes: [{ label: "30 ml", modifier: 0 }],
    description:
      "Built on olive-derived squalane — skin's own lipid twin — and graced with steam-distilled neroli from Tunisian bitter orange. A nightly exhale for reactive skin: calm, cushioned, faintly scented of an orchard at dusk.",
    benefits: [
      "Identical-to-skin squalane absorbs instantly",
      "Neroli calms visible redness and tension",
      "Non-comedogenic, suitable for oily skin",
      "Aromatic ritual that lowers the day's volume",
    ],
    howToUse:
      "Inhale deeply, then press 3 drops over face and neck each evening. Pair with a facial massage using upward strokes.",
    heroIngredients: ["Olive Squalane", "Neroli Absolute", "Blue Tansy"],
    inci:
      "Squalane, Caprylic/Capric Triglyceride, Citrus Aurantium Amara (Neroli) Flower Oil, Tanacetum Annuum Flower Oil, Rosa Damascena Flower Oil, Tocopherol, Limonene†, Linalool† (†naturally occurring in essential oils).",
    skinTypes: ["Sensitive", "Normal", "Oily", "Dry"],
    concern: "Calm",
    images: [img("1600428877878-1a0fd85beda8"), img("1531746020798-e6953c6e8e04")],
  },
  {
    slug: "rose-clay-renewal-mask",
    name: "Rose Clay Renewal Mask",
    tagline: "Ten minutes to refined pores and a petal-soft complexion.",
    category: "masks",
    price: 58,
    rating: 4.8,
    reviewCount: 296,
    sizes: [{ label: "75 ml", modifier: 0 }],
    badge: "New",
    description:
      "French pink clay draws out congestion while fruit AHAs dissolve dull surface cells and damask rose soothes. The rare mask that detoxifies without dehydrating — rinse to reveal skin polished like porcelain.",
    benefits: [
      "Purifies pores without stripping",
      "Gentle AHA resurfacing, no downtime",
      "Skin looks immediately smoother, brighter",
      "Doubling as an overnight spot treatment",
    ],
    howToUse:
      "Once or twice weekly, apply an even layer to clean, damp skin. Rest for ten minutes — never let it crack — then massage off in circles with lukewarm water.",
    heroIngredients: ["French Pink Clay", "Fruit AHAs", "Damask Rose"],
    inci:
      "Kaolin, Aqua, Glycerin, Illite, Rosa Damascena Flower Water, Vaccinium Myrtillus Fruit Extract, Saccharum Officinarum Extract, Citrus Aurantium Dulcis Fruit Extract, Acer Saccharum Extract, Panthenol, Allantoin, Xanthan Gum, Benzyl Alcohol.",
    skinTypes: ["Combination", "Oily", "Normal"],
    concern: "Pores",
    images: [img("1616394584738-fc6e612e71b9"), img("1585652757141-8837d676fac8")],
  },
  {
    slug: "silk-body-elixir",
    name: "Silk Body Élixir",
    tagline: "A satin body oil that leaves limbs luminous and cashmere-soft.",
    category: "body-care",
    price: 64,
    rating: 4.8,
    reviewCount: 187,
    sizes: [
      { label: "100 ml", modifier: 0 },
      { label: "200 ml", modifier: 30 },
    ],
    description:
      "Fast-drying camellia, baobab and sweet almond oils in a pump you'll reach for daily. Absorbs in seconds, dresses over instantly, and leaves a subtle sheen like light through silk.",
    benefits: [
      "Absorbs in seconds — no transfer to clothing",
      "48-hour measured hydration",
      "Silk proteins smooth rough areas",
      "Subtle fig and cedar signature scent",
    ],
    howToUse:
      "On slightly damp skin post-shower, pump into palms and sweep over body in long strokes. Focus on shins, elbows and any dryness.",
    heroIngredients: ["Camellia Oil", "Baobab Oil", "Silk Proteins"],
    inci:
      "Caprylic/Capric Triglyceride, Camellia Oleifera Seed Oil, Adansonia Digitata (Baobab) Seed Oil, Prunus Amygdalus Dulcis Oil, Sericin, Tocopherol, Parfum*, Linalool†, Limonene† (*natural, †from essential oils).",
    skinTypes: ["All skin types"],
    concern: "Body hydration",
    images: [img("1526758097130-bab247274f58"), img("1612817288484-6f916006741a")],
  },
  {
    slug: "amber-body-polish",
    name: "Amber Body Polish",
    tagline: "Sugar and salt crystals suspended in warming amber oils.",
    category: "body-care",
    price: 56,
    rating: 4.7,
    reviewCount: 154,
    sizes: [{ label: "250 g", modifier: 0 }],
    description:
      "A spoon-worthy polish of fine cane sugar, Himalayan salt and coconut oil that melts into a milky lotion as you work it over skin. Rinses clean, leaves zero slip in the shower, and wraps you in amber, vanilla and tonka.",
    benefits: [
      "Dual-exfoliation: physical polish + oil melt",
      "Leaves shower floors non-slip",
      "Immediate smoothness that lasts days",
      "Warming amber-vanilla aroma",
    ],
    howToUse:
      "Twice weekly on damp skin, massage in circular motions from ankles upward. Rinse; follow with Silk Body Élixir on damp skin.",
    heroIngredients: ["Cane Sugar", "Himalayan Salt", "Coconut Cream Oil"],
    inci:
      "Sucrose, Maris Sal, Cocos Nucifera Oil, Butyrospermum Parkii Butter, Caprylic/Capric Triglyceride, Tocopherol, Parfum*, Benzyl Benzoate†, Coumarin† (*natural, †from essential oils).",
    skinTypes: ["All skin types"],
    concern: "Texture",
    images: [img("1519824145371-296894a0daa9"), img("1631729371254-42c2892f0e6e")],
  },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const getCategoryLabel = (id: Category) =>
  CATEGORIES.find((c) => c.id === id)?.label ?? id;

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);

export const productPrice = (p: Product, sizeIndex = 0) => p.price + p.sizes[sizeIndex].modifier;

export const FREE_SHIPPING_THRESHOLD = 100;

export const PROMOS: Record<string, number> = {
  RADIANT10: 0.1,
  SOLENNE15: 0.15,
};
