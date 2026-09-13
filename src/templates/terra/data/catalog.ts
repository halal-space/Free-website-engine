export type Category = {
  slug: string;
  name: string;
  blurb: string;
  badge: string;
  image: string;
};

export type TastingAxis = { label: string; value: number }; // 0-100

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  compareAt?: number;
  origin: string;
  volume: string;
  badges: string[];
  rating: number;
  reviews: number;
  image: string;
  lifestyle: string;
  alt: string;
  description: string;
  tasting: TastingAxis[];
  batch: string;
  stock: number;
  producer: string;
  region: string;
  harvest: string;
  shelfLife: string;
  storage: string;
  ingredients: string;
  allergens: string;
  bestseller?: boolean;
};

const u = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const FREE_SHIPPING_THRESHOLD = 65;
export const BUTTER_GIFT_THRESHOLD_GAP = 14;

export const categories: Category[] = [
  {
    slug: "oils-vinegars",
    name: "Oils & Vinegars",
    blurb: "Cold-pressed within 6 hours of harvest.",
    badge: "Single-Estate",
    image: u("photo-1474979266404-7eaacbcd87c5"),
  },
  {
    slug: "tinned-delicacies",
    name: "Tinned Delicacies",
    blurb: "Line-caught, hand-packed, aged in tin.",
    badge: "Line-Caught",
    image: u("photo-1535399831218-d5bd36d1a6b3"),
  },
  {
    slug: "heritage-grains",
    name: "Heritage Grains",
    blurb: "Stone-milled landrace wheats & rices.",
    badge: "Stone-Milled",
    image: u("photo-1586201375761-83865001e31c"),
  },
  {
    slug: "spices-pastes",
    name: "Spices & Pastes",
    blurb: "Small-lot ferments & fresh grinds.",
    badge: "Cold-Pressed",
    image: u("photo-1596040033229-a9821ebd058d"),
  },
  {
    slug: "ready-to-eat",
    name: "Ready-to-Eat",
    blurb: "Pantry dinners in under 10 minutes.",
    badge: "Small-Batch",
    image: u("photo-1547592180-85f173990554"),
  },
];

export const products: Product[] = [
  {
    id: "p1",
    slug: "koroneiki-early-harvest-olive-oil",
    name: "Koroneiki Early-Harvest Olive Oil",
    category: "Oils & Vinegars",
    price: 28,
    compareAt: 32,
    origin: "Kalamata, Greece",
    volume: "500ml",
    badges: ["Vegan", "Non-GMO", "Gluten-Free"],
    rating: 4.9,
    reviews: 2314,
    image: u("photo-1474979266404-7eaacbcd87c5"),
    lifestyle: u("photo-1466637574441-749b8f19452f"),
    alt: "Bottle of early-harvest olive oil with fresh olives",
    description:
      "Peppery, grassy, unfiltered. Crushed within six hours from the Liakopoulos family grove — the bottle that built TERRA & CRU.",
    tasting: [
      { label: "Peppery", value: 92 },
      { label: "Grassy", value: 84 },
      { label: "Golden", value: 70 },
      { label: "Briny", value: 45 },
      { label: "Floral", value: 38 },
    ],
    batch: "Batch No. 04",
    stock: 18,
    producer: "Liakopoulos Cooperative",
    region: "Kalamata, Peloponnese",
    harvest: "October 2026",
    shelfLife: "18 months from press",
    storage: "Cool, dark cupboard. Use within 8 weeks of opening.",
    ingredients: "100% Koroneiki olives, cold-pressed.",
    allergens: "None. Bottled in a nut-free facility.",
    bestseller: true,
  },
  {
    id: "p2",
    slug: "smoked-trout-tinned",
    name: "Smoked Trout in Olive Oil",
    category: "Tinned Delicacies",
    price: 14,
    origin: "Asturias, Spain",
    volume: "120g",
    badges: ["High-Protein", "Gluten-Free"],
    rating: 4.8,
    reviews: 1102,
    image: u("photo-1535399831218-d5bd36d1a6b3"),
    lifestyle: u("photo-1504674900247-0877df9cc836"),
    alt: "Tinned smoked trout on ceramic plate",
    description:
      "Hot-smoked over oak, hand-packed in our own early-harvest oil. Buttery, clean smoke, flaky.",
    tasting: [
      { label: "Smoky", value: 88 },
      { label: "Briny", value: 76 },
      { label: "Buttery", value: 82 },
      { label: "Citrus", value: 30 },
      { label: "Peppery", value: 25 },
    ],
    batch: "Batch No. 11",
    stock: 42,
    producer: "Conservas del Norte",
    region: "Asturias, Spain",
    harvest: "Tinned March 2026, aged 6 months",
    shelfLife: "3 years sealed",
    storage: "Pantry. Chill 20 min before serving.",
    ingredients: "Trout, olive oil, sea salt.",
    allergens: "Contains fish.",
    bestseller: true,
  },
  {
    id: "p3",
    slug: "heritage-farro",
    name: "Emmer Farro, Stone-Milled",
    category: "Heritage Grains",
    price: 12,
    origin: "Tuscany, Italy",
    volume: "750g",
    badges: ["Vegan", "High-Fibre"],
    rating: 4.9,
    reviews: 864,
    image: u("photo-1586201375761-83865001e31c"),
    lifestyle: u("photo-1490645935967-10de6ba17061"),
    alt: "Bowl of cooked heritage farro grains",
    description:
      "Nutty, chewy landrace emmer. Cooks in 25 minutes, holds its bite in salads and soups.",
    tasting: [
      { label: "Nutty", value: 90 },
      { label: "Chewy", value: 85 },
      { label: "Earthy", value: 78 },
      { label: "Sweet", value: 40 },
      { label: "Floral", value: 20 },
    ],
    batch: "Batch No. 07",
    stock: 64,
    producer: "Podere San Giuseppe",
    region: "Val d'Orcia, Italy",
    harvest: "July 2026",
    shelfLife: "24 months dry",
    storage: "Airtight jar, cool pantry.",
    ingredients: "100% whole emmer wheat.",
    allergens: "Contains gluten (wheat).",
    bestseller: true,
  },
  {
    id: "p4",
    slug: "chilli-crisp",
    name: "Crispy Chilli & Shallot Oil",
    category: "Spices & Pastes",
    price: 13,
    origin: "Sichuan / California",
    volume: "190g",
    badges: ["Vegan", "Small-Batch"],
    rating: 4.9,
    reviews: 3411,
    image: u("photo-1587049352846-4a222e784d38"),
    lifestyle: u("photo-1455619452474-d2be8b1e70cd"),
    alt: "Jar of chilli crisp with fried shallots",
    description:
      "Six chillies, fried shallot, fermented black bean. The 10-minute spaghetti jar.",
    tasting: [
      { label: "Heat", value: 78 },
      { label: "Crunch", value: 95 },
      { label: "Umami", value: 88 },
      { label: "Sweet", value: 45 },
      { label: "Citrus", value: 22 },
    ],
    batch: "Batch No. 19",
    stock: 27,
    producer: "TERRA & CRU Fermentary",
    region: "Ojai, California",
    harvest: "Fermented 30 days",
    shelfLife: "12 months sealed",
    storage: "Pantry. Refrigerate after opening.",
    ingredients: "Chillies, shallot, garlic, black bean, oil, salt.",
    allergens: "Contains soy.",
    bestseller: true,
  },
  {
    id: "p5",
    slug: "aged-balsamic-modena",
    name: "12-Year Aged Balsamic",
    category: "Oils & Vinegars",
    price: 34,
    origin: "Modena, Italy",
    volume: "250ml",
    badges: ["Vegan", "Non-GMO"],
    rating: 4.9,
    reviews: 692,
    image: u("photo-1474979266404-7eaacbcd87c5", 800),
    lifestyle: u("photo-1498837167922-ddd27525d352"),
    alt: "Aged balsamic vinegar being poured",
    description:
      "Trebbiano must aged in oak, cherry and juniper. Syrupy, no caramel added.",
    tasting: [
      { label: "Woody", value: 85 },
      { label: "Sweet", value: 80 },
      { label: "Acidic", value: 55 },
      { label: "Fruity", value: 68 },
      { label: "Peppery", value: 20 },
    ],
    batch: "Batch No. 02",
    stock: 15,
    producer: "Acetaia Malagoli",
    region: "Modena, Italy",
    harvest: "Barrelled 2014",
    shelfLife: "Indefinite sealed",
    storage: "Pantry, upright.",
    ingredients: "Cooked grape must.",
    allergens: "None. Naturally contains sulfites.",
  },
  {
    id: "p6",
    slug: "sardines-lemon",
    name: "Sardines with Lemon & Sea Salt",
    category: "Tinned Delicacies",
    price: 9,
    origin: "Lisbon, Portugal",
    volume: "120g",
    badges: ["Omega-3", "Gluten-Free"],
    rating: 4.7,
    reviews: 1580,
    image: u("photo-1535399831218-d5bd36d1a6b3", 800),
    lifestyle: u("photo-1512058564366-18510be2db19"),
    alt: "Sardines with lemon on toast",
    description:
      "Day-boat sardines, preserved lemon, flaky sea salt. Bright, firm, snackable.",
    tasting: [
      { label: "Briny", value: 82 },
      { label: "Citrus", value: 74 },
      { label: "Buttery", value: 60 },
      { label: "Smoky", value: 18 },
      { label: "Peppery", value: 30 },
    ],
    batch: "Batch No. 08",
    stock: 88,
    producer: "Conservas Lisboa",
    region: "Lisbon, Portugal",
    harvest: "Tinned April 2026",
    shelfLife: "4 years sealed",
    storage: "Pantry.",
    ingredients: "Sardines, olive oil, lemon, sea salt.",
    allergens: "Contains fish.",
  },
  {
    id: "p7",
    slug: "bomba-rice",
    name: "Bomba Rice, Albufera",
    category: "Heritage Grains",
    price: 11,
    origin: "Valencia, Spain",
    volume: "1kg",
    badges: ["Vegan", "Gluten-Free"],
    rating: 4.8,
    reviews: 743,
    image: u("photo-1586201375761-83865001e31c", 800),
    lifestyle: u("photo-1512058564366-18510be2db19"),
    alt: "Paella pan with bomba rice",
    description:
      "Short-grain bomba that absorbs 3x broth without bursting. Paella-grade.",
    tasting: [
      { label: "Nutty", value: 55 },
      { label: "Chewy", value: 70 },
      { label: "Earthy", value: 50 },
      { label: "Sweet", value: 48 },
      { label: "Floral", value: 25 },
    ],
    batch: "Batch No. 05",
    stock: 51,
    producer: "Coop. Albufera",
    region: "Valencia, Spain",
    harvest: "September 2026",
    shelfLife: "24 months dry",
    storage: "Dry pantry.",
    ingredients: "100% bomba rice.",
    allergens: "None.",
  },
  {
    id: "p8",
    slug: "harissa-paste",
    name: "Rose Harissa Paste",
    category: "Spices & Pastes",
    price: 12,
    origin: "Tunis, Tunisia",
    volume: "180g",
    badges: ["Vegan", "Non-GMO"],
    rating: 4.8,
    reviews: 921,
    image: u("photo-1596040033229-a9821ebd058d", 800),
    lifestyle: u("photo-1476224203421-9ac39bcb3327"),
    alt: "Rose harissa paste in small bowl",
    description:
      "Smoked baklouti peppers, rose petal, caraway. Floral heat for grains and roast veg.",
    tasting: [
      { label: "Heat", value: 72 },
      { label: "Floral", value: 68 },
      { label: "Smoky", value: 64 },
      { label: "Sweet", value: 52 },
      { label: "Citrus", value: 35 },
    ],
    batch: "Batch No. 13",
    stock: 33,
    producer: "Domaine Fendri",
    region: "Cap Bon, Tunisia",
    harvest: "Ground October 2026",
    shelfLife: "18 months sealed",
    storage: "Refrigerate after opening.",
    ingredients: "Peppers, rose, caraway, garlic, oil, salt.",
    allergens: "None.",
    bestseller: true,
  },
  {
    id: "p9",
    slug: "cacio-pepe-kit",
    name: "Cacio e Pepe Kit",
    category: "Ready-to-Eat",
    price: 18,
    origin: "Lazio, Italy",
    volume: "420g",
    badges: ["Vegetarian", "10-Min"],
    rating: 4.7,
    reviews: 654,
    image: u("photo-1547592180-85f173990554", 800),
    lifestyle: u("photo-1473093295043-cdd812d0e601"),
    alt: "Cacio e pepe pasta in pan",
    description:
      "Bronze-cut tonnarelli, aged pecorino cream, cracked Tellicherry. Dinner in 10.",
    tasting: [
      { label: "Cheesy", value: 90 },
      { label: "Peppery", value: 80 },
      { label: "Buttery", value: 75 },
      { label: "Salty", value: 70 },
      { label: "Citrus", value: 10 },
    ],
    batch: "Batch No. 21",
    stock: 29,
    producer: "Pastificio Gentile",
    region: "Gragnano, Italy",
    harvest: "Made weekly",
    shelfLife: "9 months dry",
    storage: "Pantry.",
    ingredients: "Pasta, pecorino, pepper, salt.",
    allergens: "Contains gluten, milk.",
  },
  {
    id: "p10",
    slug: "cracked-sea-salt",
    name: "Flaky Sea Salt, Cracked",
    category: "Spices & Pastes",
    price: 8,
    origin: "Cornwall, UK",
    volume: "250g",
    badges: ["Vegan", "Non-GMO"],
    rating: 4.9,
    reviews: 1876,
    image: u("photo-1596040033229-a9821ebd058d", 800),
    lifestyle: u("photo-1506368249639-73a05d6f6488"),
    alt: "Flaky sea salt macro texture",
    description:
      "Hand-raked flakes, cracked for crunch. The finishing salt chefs rebuy.",
    tasting: [
      { label: "Salty", value: 95 },
      { label: "Mineral", value: 70 },
      { label: "Crunch", value: 88 },
      { label: "Sweet", value: 15 },
      { label: "Briny", value: 60 },
    ],
    batch: "Batch No. 30",
    stock: 120,
    producer: "Cornish Salt Co.",
    region: "Cornwall, UK",
    harvest: "Harvested monthly",
    shelfLife: "Indefinite",
    storage: "Dry, with wooden spoon.",
    ingredients: "Sea salt.",
    allergens: "None.",
  },
  {
    id: "p11",
    slug: "white-beans-tomato",
    name: "Cannellini in Tomato & Basil",
    category: "Ready-to-Eat",
    price: 7,
    origin: "Puglia, Italy",
    volume: "400g",
    badges: ["Vegan", "High-Fibre"],
    rating: 4.6,
    reviews: 432,
    image: u("photo-1547592180-85f173990554", 800),
    lifestyle: u("photo-1490645935967-10de6ba17061"),
    alt: "White beans in tomato sauce",
    description: "Creamy cannellini, San Marzano tomato, basil oil. Spoon over toast.",
    tasting: [
      { label: "Herby", value: 72 },
      { label: "Sweet", value: 60 },
      { label: "Earthy", value: 55 },
      { label: "Acidic", value: 48 },
      { label: "Peppery", value: 28 },
    ],
    batch: "Batch No. 16",
    stock: 76,
    producer: "Masseria Conte",
    region: "Puglia, Italy",
    harvest: "Packed August 2026",
    shelfLife: "3 years sealed",
    storage: "Pantry.",
    ingredients: "Beans, tomato, basil, oil, salt.",
    allergens: "None.",
  },
  {
    id: "p12",
    slug: "pistachio-cream",
    name: "Sicilian Pistachio Cream",
    category: "Ready-to-Eat",
    price: 19,
    origin: "Bronte, Sicily",
    volume: "200g",
    badges: ["Vegetarian", "Small-Batch"],
    rating: 4.9,
    reviews: 987,
    image: u("photo-1547592180-85f173990554", 800),
    lifestyle: u("photo-1488477181946-6428a0291777"),
    alt: "Pistachio cream jar with spoon",
    description: "62% Bronte pistachio, cold-stone ground. For toast, gelato, spoons.",
    tasting: [
      { label: "Nutty", value: 96 },
      { label: "Sweet", value: 70 },
      { label: "Buttery", value: 85 },
      { label: "Floral", value: 30 },
      { label: "Salty", value: 25 },
    ],
    batch: "Batch No. 09",
    stock: 22,
    producer: "Azienda Scilio",
    region: "Bronte, Sicily",
    harvest: "Ground September 2026",
    shelfLife: "12 months sealed",
    storage: "Pantry. Stir before use.",
    ingredients: "Pistachio, sugar, milk powder, oil.",
    allergens: "Contains tree nuts, milk.",
    bestseller: true,
  },
];

export const makers = [
  {
    slug: "liakopoulos-cooperative",
    name: "Liakopoulos Cooperative",
    region: "Kalamata, Greece",
    image: u("photo-1500382017468-9049fed747ef"),
    certs: ["Regenerative Organic", "PDO Kalamata"],
    metric: "6-hr press · 42 families · 0 irrigation",
    harvest: "Oct 2026",
    story:
      "Forty-two families farming the same Koroneiki terraces for four generations. Olives are crushed within six hours of picking at the cooperative mill — no irrigation, no blends, night-harvested in October.",
    practices: ["Night harvest to preserve polyphenols", "Prunings composted back to groves", "Mill powered by olive-pit biomass"],
  },
  {
    slug: "conservas-del-norte",
    name: "Conservas del Norte",
    region: "Asturias, Spain",
    image: u("photo-1466637574441-749b8f19452f", 800),
    certs: ["MSC Line-Caught", "Carbon-Neutral Tin"],
    metric: "Day-boat · hand-packed · aged 6 mo",
    harvest: "Mar 2026",
    story:
      "A third-generation conservera buying only day-boat catch from MSC-certified skiffs. Every tin is hand-packed in our early-harvest oil and aged six months before it earns a batch number.",
    practices: ["Day-boat only, never trawled", "Plastic-neutral, carbon-neutral tins", "Above-market dock prices, 10-yr contracts"],
  },
  {
    slug: "podere-san-giuseppe",
    name: "Podere San Giuseppe",
    region: "Tuscany, Italy",
    image: u("photo-1625246333195-78d9c38ad449"),
    certs: ["Heritage Seed Bank", "Stone-Milled"],
    metric: "Landrace emmer · 1 farm · stone mill",
    harvest: "Jul 2026",
    story:
      "One farm, one landrace emmer variety, one granite stone mill turning at 90rpm so the germ never heats. The San Giuseppe family has saved their own seed since 1962.",
    practices: ["Own-seed landrace emmer since 1962", "Slow stone mill, germ intact", "Field margins left wild for pollinators"],
  },
];

export const recipes = [
  {
    slug: "chilli-crisp-spaghetti",
    title: "10-Minute Chilli Crisp Spaghetti",
    time: "10 min",
    servings: "Serves 2",
    image: u("photo-1473093295043-cdd812d0e601"),
    productIds: ["p4", "p3", "p1"],
    blurb: "Glossy, crunchy, pantry-fast.",
    intro:
      "The jar that earns its shelf space. Hot pasta, cold-pressed oil and a spoon of crunch — dinner faster than delivery.",
    steps: [
      "Boil salted water; cook 200g spaghetti 1 minute shy of the pack time. Save a mug of pasta water.",
      "Warm 3 tbsp chilli crisp in a wide pan until the shallots sizzle and smell nutty, about 60 seconds.",
      "Toss in the pasta with a splash of pasta water until glossy. Finish with olive oil and torn basil if you have it.",
      "Serve straight from the pan with extra crisp on top.",
    ],
  },
  {
    slug: "sardine-toast-lemon-salt",
    title: "Sardine Toast, Lemon Salt",
    time: "5 min",
    servings: "Serves 1",
    image: u("photo-1504674900247-0877df9cc836", 800),
    productIds: ["p6", "p10", "p1"],
    blurb: "Briny, bright, no-cook lunch.",
    intro:
      "No-cook, high-protein, wildly good. Thick toast, good tins, lemon and flaky salt — the bodega lunch upgraded.",
    steps: [
      "Toast thick sourdough until deeply golden; rub with olive oil while hot.",
      "Lay over sardines with their lemon oil, then shower with cracked sea salt.",
      "Finish with herbs or chilli flakes. Eat immediately.",
    ],
  },
  {
    slug: "harissa-farro-bowls",
    title: "Harissa Farro Bowls",
    time: "25 min",
    servings: "Serves 2",
    image: u("photo-1490645935967-10de6ba17061", 800),
    productIds: ["p8", "p3", "p1"],
    blurb: "Smoky grains, charred veg.",
    intro:
      "Chewy farro, caramelised vegetables and a rose-harissa dressing that ties it all together. Meal-prep friendly.",
    steps: [
      "Simmer farro 25 minutes until chewy-tender; drain and season with salt and olive oil.",
      "Char seasonal veg in a hot pan. Whisk 2 tbsp harissa with 3 tbsp olive oil and lemon juice.",
      "Toss grains with half the dressing, top with veg, spoon over the rest.",
      "Keeps 3 days refrigerated — dress fresh to serve.",
    ],
  },
];

export const addOns = [
  { id: "a1", name: "Olive Oil Pour Spout", price: 6, image: u("photo-1474979266404-7eaacbcd87c5", 400) },
  { id: "a2", name: "Olivewood Spice Spoon", price: 9, image: u("photo-1506368249639-73a05d6f6488", 400) },
  { id: "a3", name: "Kraft Pantry Label Set", price: 5, image: u("photo-1584589167171-541ce45f1eea", 400) },
];

export const trendingSearches = [
  "chilli crisp",
  "early-harvest olive oil",
  "tinned fish",
  "bomba rice",
  "harissa",
  "pistachio cream",
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const bestsellers = products.filter((p) => p.bestseller);
export const money = (n: number) =>
  `$${n.toFixed(n % 1 === 0 ? 0 : 2)}`;
