import { JournalPost, HeroContent, EditorialContent, FeaturedCollectionContent, Ingredient, RitualStep, Testimonial, ManifestoContent, AboutContent } from "../types";

const img = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

/* ---------- Hero ---------- */
export const HERO = {
  eyebrow: "New — The Nocturne Collection",
  title: ["Rituals for", "Radiant Skin."],
  text: "Considered skincare distilled to its purest form. Clinically proven actives, botanical intelligence, and the quiet luxury of a ritual that belongs entirely to you.",
  image: img("1540555700478-4be289fbecef", 1600),
  imageAlt:
    "A woman wrapped in soft linen, skin luminous in natural morning light",
  secondaryImage: img("1601049676869-702ea24cfd58", 800),
  secondaryImageAlt: "An artful arrangement of premium skincare vessels on ivory stone",
};

/* ---------- Editorial section ---------- */
export const EDITORIAL = {
  eyebrow: "Our Philosophy",
  title: "Beauty, distilled to its essentials.",
  paragraphs: [
    "We believe skincare should be an act of intention, not accumulation. Every SOLENNE formula begins with a single question — what does skin truly need? — and ends only when the answer is inevitable.",
    "No noise, no filler, no fifty-step confusion. Just carefully selected actives at meaningful concentrations, suspended in formulas you will feel working from the first touch.",
  ],
  imageMain: img("1531746020798-e6953c6e8e04", 1100),
  imageMainAlt: "Editorial beauty portrait with sculptural lighting",
  imageSecondary: img("1601049676869-702ea24cfd58", 800),
  imageSecondaryAlt: "Cream texture swatched across stone",
};

/* ---------- Featured collection ---------- */
export const FEATURED_COLLECTION = {
  eyebrow: "Featured Collection",
  title: "The Nocturne Edit",
  text: "Evening is when skin does its deepest work. This tightly edited collection pairs our encapsulated retinol elixir with barrier-restoring companions — a complete night ritual for renewal without compromise.",
  imageWide: img("1573461160327-b450ce3d8e7f", 1600),
  imageWideAlt: "Marbled bathroom shelf styled with amber glass skincare",
  slugs: ["nocturne-retinol-elixir", "creme-de-lune", "golden-hour-face-oil"],
};

/* ---------- Ingredient philosophy ---------- */
export const INGREDIENTS = [
  {
    name: "Hyaluronic Acid",
    origin: "Bio-fermented",
    role: "Hydration",
    text: "Five molecular weights reach every layer of the epidermis, holding up to 1,000× their weight in water for plumpness you can feel by lunchtime.",
  },
  {
    name: "Niacinamide",
    origin: "Vitamin B3",
    role: "Balance",
    text: "The quiet multitasker — refining pores, evening tone and strengthening the barrier in concentrations calibrated to efficacy, not marketing.",
  },
  {
    name: "Vitamin C",
    origin: "Kakadu Plum, Australia",
    role: "Radiance",
    text: "Sourced from the world's richest natural reservoir and stabilized with ferulic acid for potency that survives the bottle and thrives on skin.",
  },
  {
    name: "Retinol",
    origin: "Encapsulated, time-released",
    role: "Renewal",
    text: "Gold-standard renewal delivered gradually through the night — all of the results, none of the reckoning.",
  },
  {
    name: "Peptides",
    origin: "Nine-signal complex",
    role: "Firmness",
    text: "Micro-proteins that whisper to skin to produce more of what youth is made of — collagen, elastin, resilience.",
  },
  {
    name: "Botanical Extracts",
    origin: "Single-origin farms",
    role: "Calming",
    text: "Centella from Madagascar, chamomile from the Nile Delta, damask rose from Isparta — traceable botanicals with clinical manners.",
  },
];

/* ---------- Ritual steps ---------- */
export const RITUAL = [
  {
    step: "01",
    name: "Cleanse",
    title: "Dissolve the day",
    text: "Melt away makeup, SPF and city air with a balm or gel that respects your barrier.",
    productSlug: "velour-cleansing-balm",
    image: img("1526758097130-bab247274f58", 1000),
  },
  {
    step: "02",
    name: "Treat",
    title: "Deliver the actives",
    text: "Concentrated serums carry vitamin C, retinol and peptides where they matter most.",
    productSlug: "lumiere-vitamin-c-serum",
    image: img("1573461160327-b450ce3d8e7f", 1000),
  },
  {
    step: "03",
    name: "Hydrate",
    title: "Seal in comfort",
    text: "Layer moisture deep and lock it in with essences, creams and precious oils.",
    productSlug: "hydra-veil-essence",
    image: img("1631729371254-42c2892f0e6e", 1000),
  },
  {
    step: "04",
    name: "Protect",
    title: "Face the light",
    text: "Invisible daily defense keeps every gain intact beneath sun, screens and city life.",
    productSlug: "featherlight-day-cream",
    image: img("1540555700478-4be289fbecef", 1000),
  },
];

/* ---------- Testimonials ---------- */
export const TESTIMONIALS = [
  {
    quote:
      "Six weeks with Lumière and strangers ask about my skin. Not my makeup — my skin. That has never happened in my life.",
    name: "Amara Chen",
    rating: 5,
    product: "Lumière Vitamin C Serum",
  },
  {
    quote:
      "Retinol always punished me. Nocturne is the first that gives me results and lets me keep my dignity. My texture has completely changed.",
    name: "Isabelle Moreau",
    rating: 5,
    product: "Nocturne Retinol Elixir",
  },
  {
    quote:
      "The Velour balm removes everything and my skin never feels robbed afterward. It has replaced three products on my shelf.",
    name: "Priya Natarajan",
    rating: 5,
    product: "Velour Cleansing Balm",
  },
  {
    quote:
      "Crème de Lune feels like cashmere and works like a treatment. I have repurchased four times and converted my mother.",
    name: "Sofia Lindqvist",
    rating: 4,
    product: "Crème de Lune",
  },
];

/* ---------- Brand manifesto ---------- */
export const MANIFESTO = {
  eyebrow: "Our Commitment",
  title: "Clean beauty, consciously composed.",
  points: [
    {
      title: "Clean, proven formulation",
      text: "Over 1,800 questionable ingredients never cross our threshold — and nothing earns its place without clinical substantiation.",
    },
    {
      title: "Conscious sourcing",
      text: "Single-origin botanicals from named farms, wild-harvested with consent, traceable to the field.",
    },
    {
      title: "Thoughtful packaging",
      text: "Glass over plastic, refills over landfill, and mono-materials designed to be recycled in practice, not just in theory.",
    },
    {
      title: "Modern self-care",
      text: "Rituals measured in minutes, not obligations — because care that feels like choreography gets practiced.",
    },
  ],
  image: img("1567721913486-6585f069b332", 1800),
  imageAlt: "A minimal luxury bathroom bathed in warm neutral light",
};

/* ---------- Journal ---------- */


export const JOURNAL: JournalPost[] = [
  {
    slug: "art-of-simple-ritual",
    title: "The Art of a Simple Skincare Ritual",
    category: "Rituals",
    excerpt:
      "Why three considered steps outperform ten distracted ones — and how to build a routine you will actually keep.",
    readTime: "4 min read",
    date: "August 2026",
    image: img("1519824145371-296894a0daa9", 1200),
    imageAlt: "A quiet bathroom scene with warm candlelight",
  },
  {
    slug: "understanding-skin-barrier",
    title: "Understanding Your Skin Barrier",
    category: "Science",
    excerpt:
      "The lipid wall that decides whether your skin glows or protests — what weakens it, and the ingredients that rebuild it.",
    readTime: "6 min read",
    date: "July 2026",
    image: img("1616394584738-fc6e612e71b9", 1200),
    imageAlt: "Close-up of luminous, healthy skin",
  },
  {
    slug: "ingredients-worth-knowing",
    title: "The Ingredients Worth Knowing",
    category: "Ingredients",
    excerpt:
      "A field guide to the molecules with real evidence behind them — from hyaluronic acid's five weights to bakuchiol's gentle power.",
    readTime: "8 min read",
    date: "June 2026",
    image: img("1608571423902-eed4a5ad8108", 1200),
    imageAlt: "Serum droplets suspended above glass",
  },
];

/* ---------- About page ---------- */
export const ABOUT = {
  heroTitle: "Skincare as it should be.",
  intro:
    "SOLENNE was born in a small Lyon laboratory in 2024, where our founder — a cosmetic chemist tired of choosing between elegance and efficacy — set out to prove you never had to.",
  story: [
    "We formulate the way perfumers compose: few notes, exceptional quality, nothing accidental. Each formula spends an average of fourteen months in development and is tested on more than two hundred volunteers before it earns the name.",
    "Our ingredients are traced to single origins — centella from Madagascar, rose from Isparta, kakadu plum harvested with Australia's Indigenous communities. Our packaging is glass and mono-material, designed for refill rather than replacement.",
    "And our promise is simple: fewer products, made better, priced honestly. Luxury measured not by markup but by what goes into the bottle.",
  ],
  values: [
    { title: "Efficacy First", text: "Every active earns its place with peer-reviewed evidence at meaningful concentration." },
    { title: "Radical Transparency", text: "Full ingredient disclosure, honest percentages, published supplier standards." },
    { title: "Quiet Sustainability", text: "Refill systems, ocean-bound plastic recovery and carbon-neutral shipping since day one." },
    { title: "Sensorial Craft", text: "Textures developed with French perfumers and sommeliers — luxury you feel, not just see." },
  ],
  images: {
    portrait: img("1505944270255-72b8c68c6a70", 1000),
    lab: img("1611930022073-b7a4ba5fcccd", 900),
    wide: img("1573461160327-b450ce3d8e7f", 1800),
  },
};
