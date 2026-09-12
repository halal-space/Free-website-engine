import type { Product } from './types';

export const products: Product[] = [
  {
    id: 'aura-pro',
    slug: 'aura-pro',
    name: 'Aura Pro Wireless Headphones',
    brand: 'AETHER',
    tagline: 'Immersive sound. Reimagined.',
    category: 'Acoustic Systems',
    categorySlug: 'audio',
    price: 699,
    originalPrice: 799,
    discountPercent: 12,
    rating: 4.95,
    reviewCount: 148,
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 24,
    description: 'Bespoke 45mm custom planar magnetic drivers, adaptive neural noise cancellation, and a forged titanium suspension headband wrapped in full-grain Scandinavian lambskin.',
    longDescription: 'Engineered for audio purists and industrial design connoisseurs, the Aura Pro combines bespoke 45mm planar magnetic transducers with a dual-chamber acoustic chamber. Real-time active calibration samples your ear geometry 48,000 times per second, ensuring effortless, distortion-free harmonic depth from 5Hz to 45kHz. Forged Grade 5 titanium pivot arms and memory foam earcups clad in breathable full-grain leather deliver weightless comfort during multi-hour listening sessions.',
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Matte Obsidian', hex: '#111115', image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Brushed Platinum', hex: '#CBD5E1', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Midnight Royal Blue', hex: '#1E293B', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=85' }
    ],
    variants: [
      { id: 'aura-std', name: 'Standard Edition', price: 699, originalPrice: 799, inStock: true, specsSummary: 'Lambskin Cushions + Braided Kevlar Cable' },
      { id: 'aura-studio', name: 'Studio Reference Edition', price: 849, originalPrice: 949, inStock: true, specsSummary: 'Includes Solid Titanium Stand & Balanced 4.4mm Cable' }
    ],
    specs: {
      'Transducer': '45mm Custom Planar Magnetic',
      'Frequency Response': '5Hz – 45,000Hz',
      'Battery Life': '42 Hours (ANC On)',
      'Connectivity': 'Bluetooth 5.4, Lossless USB-C Audio, 3.5mm Analog',
      'Weight': '320 grams',
      'Noise Cancellation': 'Quad-Core Neural ANC (-42dB attenuation)'
    },
    technicalSpecs: [
      {
        category: 'Acoustic Architecture',
        items: [
          { name: 'Driver Type', value: '45mm Planar Magnetic with Neodymium N52 Magnets' },
          { name: 'Total Harmonic Distortion (THD)', value: '< 0.03% @ 1kHz, 100dB SPL' },
          { name: 'Frequency Range', value: '5Hz - 45,000Hz' },
          { name: 'DAC / DSP', value: 'Custom 32-bit / 384kHz Quad-Channel Neural DSP' }
        ]
      },
      {
        category: 'Materials & Craftsmanship',
        items: [
          { name: 'Headband', value: 'Monolithic CNC Forged Grade 5 Titanium' },
          { name: 'Ear Cushions', value: 'Acoustic Memory Foam with Scandinavian Lambskin' },
          { name: 'Earcups', value: 'Anodized Aircraft Aluminum with Micro-Etched Grille' }
        ]
      },
      {
        category: 'Battery & Power',
        items: [
          { name: 'Listening Time', value: 'Up to 42 hours with Neural ANC enabled' },
          { name: 'Rapid Charge', value: '15 minutes charge provides 8 hours playback' },
          { name: 'Charging Interface', value: 'USB-C (Power Delivery 3.0)' }
        ]
      },
      {
        category: 'Connectivity',
        items: [
          { name: 'Bluetooth', value: 'Bluetooth 5.4 with LDAC, aptX Lossless, AAC' },
          { name: 'Multipoint', value: 'Simultaneous connection up to 3 devices' },
          { name: 'Wired Mode', value: 'Direct bit-perfect Lossless USB-C & 3.5mm' }
        ]
      }
    ],
    features: [
      {
        icon: 'Layers',
        title: 'Planar Magnetic Precision',
        description: 'Ultra-thin sub-micron diaphragm delivers transient speed and spatial localization previously limited to $4,000 reference monitors.'
      },
      {
        icon: 'Cpu',
        title: 'Neural Noise Cancellation',
        description: 'Dual neural processing engines continuously measure ambient acoustic reflection and eliminate distraction without altering harmonic timbre.'
      },
      {
        icon: 'Shield',
        title: 'Aerospace Grade 5 Titanium',
        description: 'CNC milled from solid blocks of titanium to provide exceptional structural rigidity while remaining remarkably featherweight.'
      },
      {
        icon: 'Zap',
        title: '42-Hour Uninterrupted Playback',
        description: 'High-density cobalt-lithium battery cells provide full-week playback on a single rapid charge.'
      }
    ],
    inTheBox: [
      'Aura Pro Wireless Headphones',
      'Hard Shell Magnetic Carrying Case with Alcantara Lining',
      '1.5m Braided Kevlar USB-C Lossless Audio Cable',
      '1.2m Braided 3.5mm to 3.5mm Gold-Plated Audio Cable',
      '6.35mm Gold-Plated Studio Adapter',
      'Certificate of Authenticity & 2-Year Concierge Warranty Card'
    ],
    reviews: [
      {
        id: 'rev-1',
        author: 'Alexander Sterling',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        date: '3 days ago',
        verified: true,
        title: 'The pinnacle of industrial design and acoustic clarity.',
        comment: 'I own the Sennheiser HE-1 and AirPods Max, but the Aura Pro has become my daily reference. The build quality in matte obsidian feels like fine Swiss watchmaking, and the planar separation is breathtaking.',
        helpfulCount: 34
      },
      {
        id: 'rev-2',
        author: 'Elena Rostova',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        date: '1 week ago',
        verified: true,
        title: 'Weightless luxury for 10-hour flights.',
        comment: 'The lambskin cushions feel like clouds, and the active noise cancellation completely silences jet engine rumble without the eerie cabin pressure feeling. Exquisite.',
        helpfulCount: 22
      },
      {
        id: 'rev-3',
        author: 'Marcus Vance',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        date: '2 weeks ago',
        verified: true,
        title: 'Truly lossless through USB-C.',
        comment: 'Plugging directly into my Mac Studio for Tidal Master audio produces details in orchestral recordings I had never heard before.',
        helpfulCount: 19
      }
    ],
    faqs: [
      {
        question: 'Can I listen in lossless high-resolution audio over cable?',
        answer: 'Yes. Connecting the Aura Pro via the included braided USB-C cable activates the internal 32-bit/384kHz DAC for pure bit-perfect bitstream playback from Mac, PC, iOS, and Android devices.'
      },
      {
        question: 'How do the touch and tactile controls function?',
        answer: 'The right ear cup features a precision knurled aluminum rotary dial for volume and physical tactile switches for track navigation and ANC mode toggling.'
      },
      {
        question: 'What does the 2-Year Concierge Warranty include?',
        answer: 'Our Concierge Warranty covers all manufacturing defects, battery health degradation below 80%, and offers complimentary courier exchange within 48 hours worldwide.'
      }
    ]
  },
  {
    id: 'nova-x-pro',
    slug: 'nova-x-pro',
    name: 'Nova X Pro Smartphone',
    brand: 'AETHER',
    tagline: 'Titanium. Photonic. Unbounded.',
    category: 'Flagship Mobile',
    categorySlug: 'smartphones',
    price: 1299,
    originalPrice: 1399,
    discountPercent: 7,
    rating: 4.92,
    reviewCount: 94,
    isNew: true,
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 18,
    description: 'Monolithic Grade 5 titanium unibody, 6.8-inch Ultra Retina XDR 120Hz ceramic display, and quad 50MP periscope photonic sensor array.',
    longDescription: 'The Nova X Pro is a masterclass in minimalist handheld architecture. Machined from a single billet of aerospace-grade titanium with an iridescent micro-vapor finish, it houses the revolutionary Neural 9X processor capable of 45 trillion operations per second. The edge-to-edge ceramic sapphire display delivers 3,000 nits of peak outdoor brightness with true 1-120Hz ProMotion variable refresh rates.',
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Raw Natural Titanium', hex: '#94A3B8', image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Obsidian Black', hex: '#0F172A', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Deep Royal Sapphire', hex: '#1D4ED8', image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=1200&q=85' }
    ],
    variants: [
      { id: 'nova-256', name: '256GB Storage', price: 1299, originalPrice: 1399, inStock: true, specsSummary: '16GB Unified LPDDR5X Memory' },
      { id: 'nova-512', name: '512GB Storage', price: 1499, originalPrice: 1599, inStock: true, specsSummary: '16GB Unified LPDDR5X Memory' },
      { id: 'nova-1tb', name: '1TB Ultra Edition', price: 1799, originalPrice: 1899, inStock: true, specsSummary: '24GB Unified LPDDR5X Memory + Titanium S-Pen' }
    ],
    specs: {
      'Display': '6.8" 120Hz LTPO Ceramic Sapphire AMOLED (3,000 Nits)',
      'Processor': 'AETHER Neural 9X Octa-Core (3nm)',
      'Camera': 'Quad 50MP Photonic Array with 10x Optical Periscope',
      'Battery': '5,400 mAh with 100W HyperCharge & 50W Wireless',
      'Chassis': 'Grade 5 Titanium & Ceramic Backplate (IP68)',
      'Security': 'Sub-Screen Ultrasonic Biometric & 3D Infrared LiDAR'
    },
    technicalSpecs: [
      {
        category: 'Display & Glass',
        items: [
          { name: 'Resolution', value: '3120 x 1440 at 516 ppi' },
          { name: 'Technology', value: 'Custom LTPO OLED with 1-120Hz dynamic refresh' },
          { name: 'Glass Protection', value: 'Ceramic Sapphire Crystal Shield (Mohs 8.5 hardness)' }
        ]
      },
      {
        category: 'Performance',
        items: [
          { name: 'Chipset', value: 'AETHER 9X Silicon (3nm TSMC Gen 2)' },
          { name: 'NPU Engine', value: '16-core Neural AI Engine (45 TOPS)' },
          { name: 'Vapor Chamber', value: 'Dual-Layer Liquid Metal Dissipation' }
        ]
      }
    ],
    features: [
      {
        icon: 'Camera',
        title: 'Quad 50MP Photonic Optics',
        description: 'Co-engineered with legendary optical artisans for cinematic colorimetry and 8K 60fps ProRes HDR recording.'
      },
      {
        icon: 'Cpu',
        title: '3nm Neural Silicon',
        description: 'Unmatched computational efficiency running on-device large generative models and real-time ray tracing.'
      },
      {
        icon: 'Zap',
        title: '100W Fast HyperCharge',
        description: 'Recharges from 0% to 80% in just 18 minutes via smart cryogenic power management.'
      }
    ],
    inTheBox: [
      'Nova X Pro Smartphone',
      'Braided 100W Kevlar USB-C Fast Charging Cable',
      'Precision Titanium SIM Ejector Tool',
      'Microfiber Polishing Cloth',
      '2-Year Worldwide Concierge Warranty'
    ],
    reviews: [
      {
        id: 'rev-nova-1',
        author: 'Julian Thorne',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        date: '5 days ago',
        verified: true,
        title: 'The best smartphone design in a decade.',
        comment: 'Holding this device feels unlike anything on the market. The natural titanium edges are seamlessly blended into the sapphire glass, and the 10x periscope camera produces genuine DSLR-level bokeh.',
        helpfulCount: 41
      }
    ],
    faqs: [
      {
        question: 'Does Nova X Pro support all international 5G networks?',
        answer: 'Yes, Nova X Pro includes global sub-6GHz and mmWave 5G frequency support with dual physical nano-SIM trays and quad eSIM profiles.'
      }
    ]
  },
  {
    id: 'chronos-ultra',
    slug: 'chronos-ultra',
    name: 'Chronos Ultra Timepiece',
    brand: 'AETHER',
    tagline: 'Horology meets biometric intelligence.',
    category: 'Precision Timepieces',
    categorySlug: 'smartwatches',
    price: 899,
    originalPrice: 999,
    discountPercent: 10,
    rating: 4.97,
    reviewCount: 76,
    isNew: true,
    isBestSeller: false,
    isFeatured: true,
    inStock: true,
    stockCount: 14,
    description: 'Sculpted from Grade 5 titanium with a fluted knurled crown, domed sapphire crystal, and medical-grade bio-impedance sensors.',
    longDescription: 'Chronos Ultra bridges high horology and future biometric intelligence. Encased in a 44mm brushed titanium chassis waterproof to 100 meters, it features a 2,500-nit always-on micro-LED dial designed with customizable mechanical watchfaces that mimic physical luminescence. Medical-grade ECG, continuous blood oxygen telemetry, and autonomous sleep stage tracking provide comprehensive holistic insights.',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Brushed Titanium & Black Leather', hex: '#334155', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Matte Obsidian & FKM Fluoroelastomer', hex: '#0F172A', image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1200&q=85' }
    ],
    variants: [
      { id: 'chronos-leather', name: 'Heritage Tuscan Leather Strap', price: 899, inStock: true, specsSummary: 'Includes Titanium Deployment Clasp' },
      { id: 'chronos-bracelet', name: 'Titanium Link Bracelet Edition', price: 1099, originalPrice: 1199, inStock: true, specsSummary: 'Full Grade 5 Titanium Link Bracelet + Silicone Sport Band' }
    ],
    specs: {
      'Case': '44mm Grade 5 Titanium with DLC Coating',
      'Glass': 'Domed Synthetic Sapphire Crystal (9 Mohs)',
      'Water Resistance': '10 ATM (100 meters / 330 feet)',
      'Battery Life': 'Up to 14 Days on Single Charge',
      'Sensors': 'Medical ECG, PPG Bio-Telemetry, SpO2, Skin Temp, Dual GNSS'
    },
    features: [
      {
        icon: 'Activity',
        title: 'Clinical Bio-Telemetry',
        description: 'Continuous heart rate variability, arterial stiffness indices, and sleep architecture analysis.'
      },
      {
        icon: 'Compass',
        title: 'Dual-Band High Precision GNSS',
        description: 'L1 + L5 satellite positioning for pinpoint navigation in dense urban canyons and alpine backcountry.'
      },
      {
        icon: 'Battery',
        title: '14-Day Power Reserve',
        description: 'Proprietary ultra-low power display driver enables up to two full weeks of battery life.'
      }
    ],
    inTheBox: [
      'Chronos Ultra Titanium Timepiece',
      'Primary Strap with Titanium Deployment Clasp',
      'Secondary Fluoroelastomer Sport Strap',
      'Magnetic Ceramic Charging Puck',
      'Luxury Wooden Presentation Box'
    ],
    reviews: [
      {
        id: 'rev-chr-1',
        author: 'Dr. Vincent Laurent',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        date: '3 weeks ago',
        verified: true,
        title: 'Finally a smartwatch that looks like an Audemars Piguet.',
        comment: 'The finishing on the titanium bezel and sapphire domed crystal is immaculate. Battery easily lasts 12-14 days. Worth every penny.',
        helpfulCount: 29
      }
    ],
    faqs: [
      {
        question: 'Is the watch compatible with both iOS and Android?',
        answer: 'Yes, the AETHER Health companion app provides full synchronized biometric telemetry and notifications on both iOS and Android devices.'
      }
    ]
  },
  {
    id: 'visionbook-pro',
    slug: 'visionbook-pro',
    name: 'VisionBook Pro 16',
    brand: 'AETHER',
    tagline: 'Extreme computation. Monolithic form.',
    category: 'Studio Computing',
    categorySlug: 'laptops',
    price: 2499,
    originalPrice: 2699,
    discountPercent: 8,
    rating: 4.96,
    reviewCount: 52,
    isNew: true,
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 8,
    description: 'Precision CNC aerospace unibody, 16.2" Nano-Texture 165Hz Mini-LED display, 24-core Neural silicon, and 128GB unified architecture.',
    longDescription: 'Crafted for architects, creative directors, and machine learning researchers, VisionBook Pro 16 sets a new benchmark in ultra-high-performance mobile computing. A zero-flex CNC aluminum unibody dissipates heat through liquid metal chamber cooling while operating in near-total silence. The 165Hz Mini-LED display reaches 1,600 nits sustained HDR brightness with factory-calibrated DCI-P3 and Adobe RGB accuracy.',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Space Obsidian', hex: '#1E293B', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Raw Aluminum Silver', hex: '#E2E8F0', image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1200&q=85' }
    ],
    variants: [
      { id: 'vb-32gb', name: '32GB RAM / 1TB SSD', price: 2499, originalPrice: 2699, inStock: true, specsSummary: '16-Core Neural Silicon' },
      { id: 'vb-64gb', name: '64GB RAM / 2TB SSD', price: 2999, originalPrice: 3299, inStock: true, specsSummary: '24-Core Neural Silicon' },
      { id: 'vb-128gb', name: '128GB RAM / 4TB SSD Studio Max', price: 3999, originalPrice: 4299, inStock: true, specsSummary: '32-Core Silicon + Nano-Texture Glass' }
    ],
    specs: {
      'Display': '16.2" Mini-LED Liquid Retina XDR (3456x2234, 165Hz, 1600 Nits)',
      'Silicon': 'AETHER HyperSilicon M9 Pro (24-Core CPU, 38-Core GPU)',
      'Memory': '32GB / 64GB / 128GB Unified 800GB/s Bandwidth',
      'Storage': '1TB - 4TB PCIe Gen 5 NVMe (14,000 MB/s)',
      'Battery': '99.9 Wh (Up to 22 Hours Web / 16 Hours Render)',
      'Weight': '1.98 kg'
    },
    features: [
      {
        icon: 'Cpu',
        title: '800GB/s Memory Bandwidth',
        description: 'Load 70B parameter LLMs locally in seconds with zero latency or thermal bottleneck.'
      },
      {
        icon: 'Monitor',
        title: 'Nano-Texture Anti-Reflective Glass',
        description: 'Microscopically etched glass scatters glare without reducing contrast or sharpness.'
      },
      {
        icon: 'Volume2',
        title: 'Six-Speaker Spatial Soundstage',
        description: 'Force-cancelling subwoofers produce studio-grade acoustic immersion.'
      }
    ],
    inTheBox: [
      'VisionBook Pro 16',
      '140W Gallium Nitride (GaN) Fast Charger',
      '2m Braided Magnetic Fast Charge Cable',
      'Velvet Protective Sleeve'
    ],
    reviews: [
      {
        id: 'rev-vb-1',
        author: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        date: '1 month ago',
        verified: true,
        title: 'Compiles Unreal Engine scenes in minutes, completely silent.',
        comment: 'The trackpad is by far the most responsive I have ever used. The nano-texture screen makes working in direct sunlight effortless.',
        helpfulCount: 38
      }
    ],
    faqs: [
      {
        question: 'Can VisionBook Pro drive multiple 6K external displays?',
        answer: 'Yes, the Thunderbolt 5 ports support up to three 6K 60Hz displays or two 8K 60Hz HDR monitors simultaneously.'
      }
    ]
  },
  {
    id: 'pulse-buds-pro',
    slug: 'pulse-buds-pro',
    name: 'Pulse Buds Pro',
    brand: 'AETHER',
    tagline: 'Lossless spatial audio in miniature.',
    category: 'Acoustic Systems',
    categorySlug: 'audio',
    price: 299,
    originalPrice: 349,
    discountPercent: 14,
    rating: 4.88,
    reviewCount: 112,
    isNew: true,
    isBestSeller: true,
    isFeatured: false,
    inStock: true,
    stockCount: 40,
    description: 'Beryllium acoustic drivers, ceramic touch stems, and custom adaptive transparency enclosed in a machined anodized aluminum charging case.',
    longDescription: 'Pulse Buds Pro pack reference-grade acoustic performance into a featherlight ergonomic form. Featuring 11mm custom beryllium drivers and quad acoustic microphones, they deliver active noise reduction that adapts 200 times per second while maintaining pure, uncolored mid-range and punchy sub-bass.',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Matte Obsidian', hex: '#111115', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Ceramic Ivory', hex: '#F8FAFC', image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=1200&q=85' }
    ],
    specs: {
      'Driver': '11mm Beryllium Dynamic Drivers',
      'Battery': '8 Hours Earbuds / 36 Hours with Aluminum Case',
      'Charging': 'Qi Wireless + USB-C Rapid Fast Charge',
      'Water Resistance': 'IP54 Water & Sweat Resistant'
    },
    features: [
      {
        icon: 'Zap',
        title: 'Adaptive Transparency',
        description: 'Hear conversations naturally while loud sudden noises are instantly dampened.'
      },
      {
        icon: 'Shield',
        title: 'Beryllium Transducers',
        description: 'Rigid, ultra-light drivers deliver crystal highs with zero distortion.'
      }
    ],
    inTheBox: [
      'Pulse Buds Pro (Left & Right)',
      'Anodized Aluminum Wireless Charging Case',
      '5 Pairs of Hypoallergenic Silicone & Foam Tips (XS, S, M, L, XL)',
      'Braided USB-C Charging Cable'
    ],
    reviews: [
      {
        id: 'rev-pb-1',
        author: 'David Kim',
        rating: 5,
        date: '2 weeks ago',
        verified: true,
        title: 'Best earbuds I have owned.',
        comment: 'The case closure has a satisfying magnetic click like a luxury lighter, and the soundstage is unbelievable for in-ears.',
        helpfulCount: 15
      }
    ],
    faqs: [
      {
        question: 'Are Pulse Buds Pro compatible with wireless charging pads?',
        answer: 'Yes, the charging case is compatible with any standard Qi-certified and MagSafe wireless charging pad.'
      }
    ]
  },
  {
    id: 'titan-controller',
    slug: 'titan-controller',
    name: 'Titan Tactile Controller',
    brand: 'AETHER',
    tagline: 'Hall-effect magnetic precision.',
    category: 'Tactile Gaming',
    categorySlug: 'gaming',
    price: 249,
    originalPrice: 279,
    discountPercent: 11,
    rating: 4.91,
    reviewCount: 64,
    isNew: false,
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    stockCount: 16,
    description: 'Carbon fiber faceplate, zero-drift contactless hall-effect joysticks, micro-switch mechanical d-pad, and low-latency 2.4GHz connection.',
    longDescription: 'Designed for competitive esports champions and discerning gamers, the Titan Controller eliminates stick drift forever with contactless magnetic hall-effect sensors. The swappable carbon fiber magnetic faceplate allows instant customization of thumbsticks, trigger stops, and paddle tension.',
    images: [
      'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Matte Carbon Black', hex: '#18181B', image: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Titanium Slate', hex: '#64748B', image: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=1200&q=85' }
    ],
    specs: {
      'Sensors': 'Hall-Effect Electromagnetic Sticks & Triggers (Zero Drift)',
      'Polling Rate': '1,000Hz (1ms response time over 2.4GHz & USB-C)',
      'Battery Life': '28 Hours Continuous Playback',
      'Weight': '285g with Balanced Internal Counterweights'
    },
    features: [
      {
        icon: 'Crosshair',
        title: 'Zero-Drift Hall Sensors',
        description: 'Magnetic contactless sensors guarantee perpetual 0.01% centering precision.'
      },
      {
        icon: 'Zap',
        title: '1,000Hz Ultra-Low Latency',
        description: 'Sub-millisecond transmission gives you an undisputed competitive advantage.'
      }
    ],
    inTheBox: [
      'Titan Tactile Controller',
      'Magnetic Carbon Fiber Faceplate',
      '4 Swappable Titanium Thumbstick Caps',
      '2.4GHz Low-Latency USB Wireless Transceiver',
      '3m Braided Kevlar USB-C Cable'
    ],
    reviews: [
      {
        id: 'rev-tc-1',
        author: 'Mateo Morales',
        rating: 5,
        date: '1 week ago',
        verified: true,
        title: 'Feels like an elite sports car steering wheel.',
        comment: 'The mechanical microswitch clicks on the D-Pad and face buttons are so crisp. Best controller on the market without question.',
        helpfulCount: 18
      }
    ],
    faqs: [
      {
        question: 'What platforms does Titan Controller support?',
        answer: 'It supports PC, Mac, iOS, Android, Steam Deck, PlayStation, and Xbox via Bluetooth, 2.4GHz wireless dongle, or wired USB-C.'
      }
    ]
  },
  {
    id: 'aero-soundbar',
    slug: 'aero-soundbar',
    name: 'Aero Architectural Soundbar',
    brand: 'AETHER',
    tagline: 'Sculptural acoustic centerpiece.',
    category: 'Acoustic Systems',
    categorySlug: 'audio',
    price: 1199,
    originalPrice: 1399,
    discountPercent: 14,
    rating: 4.93,
    reviewCount: 39,
    isNew: false,
    isBestSeller: false,
    isFeatured: false,
    inStock: true,
    stockCount: 11,
    description: 'Machined anodized aluminum bar, American dark walnut endcaps, 11 discrete amplifiers, and Dolby Atmos 7.1.4 spatial beamforming.',
    longDescription: 'The Aero Soundbar transforms living rooms into world-class private cinemas. Wrapped in acoustically transparent Gabriel wool fabric with solid walnut accents, it houses eleven discrete neodymium drivers that bounce spatial soundwaves off walls and ceilings for hyper-realistic immersion.',
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Dark Walnut & Obsidian', hex: '#27272A', image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=85' },
      { name: 'Natural Oak & Silver', hex: '#E4E4E7', image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=1200&q=85' }
    ],
    specs: {
      'Amplifiers': '11 Class-D Amplifiers (650W Total Output)',
      'Audio Formats': 'Dolby Atmos, DTS:X, Lossless 24-bit/192kHz',
      'Inputs': 'eARC HDMI 2.1, Optical Toslink, AirPlay 2, Spotify Connect, Roon'
    },
    features: [
      {
        icon: 'Volume2',
        title: 'Spatial Beamforming',
        description: 'Calibrates to your room geometry automatically to create an acoustic sphere.'
      }
    ],
    inTheBox: ['Aero Soundbar', 'Wall Mount Bracket', 'HDMI 2.1 Ultra High Speed Cable', 'Machined Metal Remote Control'],
    reviews: [],
    faqs: []
  },
  {
    id: 'sphere-home-hub',
    slug: 'sphere-home-hub',
    name: 'Sphere Ambient Home Gateway',
    brand: 'AETHER',
    tagline: 'Ambient holographic home intelligence.',
    category: 'Ambient Smart Home',
    categorySlug: 'smart-home',
    price: 449,
    rating: 4.89,
    reviewCount: 31,
    isNew: true,
    isBestSeller: false,
    isFeatured: false,
    inStock: true,
    stockCount: 15,
    description: 'Floating glass sphere housing an ambient micro-OLED display, Thread/Matter smart home controller, and far-field privacy mic array.',
    longDescription: 'Sculptural elegance meets futuristic home automation. Sphere floats visual widgets, weather patterns, and ambient clocks on an optical glass dome, while coordinating smart lighting, climate, and security with end-to-end local encryption.',
    images: [
      'https://images.unsplash.com/photo-1507499739999-097706ad8914?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Smoked Obsidian Glass', hex: '#18181B' },
      { name: 'Frosted Quartz', hex: '#F1F5F9' }
    ],
    specs: {
      'Display': '3.2" Spherical 3D Micro-OLED',
      'Protocols': 'Matter, Thread Border Router, Zigbee 3.0, Wi-Fi 7, Bluetooth 5.4',
      'Privacy': 'Hardware Mic & Sensor Physical Disconnect Switch'
    },
    features: [
      {
        icon: 'Wifi',
        title: 'Universal Matter Hub',
        description: 'Controls thousands of devices with zero vendor lock-in and zero internet dependencies.'
      }
    ],
    inTheBox: ['Sphere Home Hub', 'Braided Fabric Power Cable', 'Setup Guide'],
    reviews: [],
    faqs: []
  },
  {
    id: 'lumina-desk-lamp',
    slug: 'lumina-desk-lamp',
    name: 'Lumina Precision Desk Lamp',
    brand: 'AETHER',
    tagline: 'Circadian optical mastery.',
    category: 'Ambient Smart Home',
    categorySlug: 'smart-home',
    price: 379,
    rating: 4.94,
    reviewCount: 45,
    isNew: false,
    isBestSeller: false,
    isFeatured: false,
    inStock: true,
    stockCount: 19,
    description: 'Machined brass counterweight arm, 99 CRI full-spectrum circadian optical engine, and touchless proximity brightness dimming.',
    longDescription: 'Engineered to support biological circadian rhythms and reduce eye fatigue. Lumina delivers pure, flicker-free light with 99 CRI color rendering index, closely mimicking natural noon sunlight and transitioning to warm ember tones at sunset.',
    images: [
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Matte Obsidian & Brass', hex: '#27272A' },
      { name: 'Brushed Aluminum', hex: '#CBD5E1' }
    ],
    specs: {
      'CRI': '99 CRI Full-Spectrum Optical Engine',
      'Color Temperature': '1800K Warm Amber – 6500K Crisp Sunlight',
      'Lifespan': '60,000 Hours (Approx. 30 Years at 6 hours/day)'
    },
    features: [
      {
        icon: 'Sun',
        title: '99 CRI Full-Spectrum Engine',
        description: 'True daylight spectrum brings out rich natural colors and minimizes visual strain.'
      }
    ],
    inTheBox: ['Lumina Desk Lamp', 'Solid Counterweight Base', 'Power Adapter'],
    reviews: [],
    faqs: []
  },
  {
    id: 'veloce-keyboard',
    slug: 'veloce-keyboard',
    name: 'Veloce Custom Billet Keyboard',
    brand: 'AETHER',
    tagline: 'The acoustic tactile typing instrument.',
    category: 'Tactile Gaming',
    categorySlug: 'gaming',
    price: 349,
    rating: 4.98,
    reviewCount: 82,
    isNew: false,
    isBestSeller: true,
    isFeatured: false,
    inStock: true,
    stockCount: 22,
    description: 'Gasket-mounted monolithic aluminum chassis, custom pre-lubed POM switches, brass internal weight, and PBT dye-sublimated keycaps.',
    longDescription: 'Crafted from solid 6063 aerospace aluminum, the Veloce Keyboard features a 75% compact layout with an acoustic multi-layer Poron gasket mounting system. Every keypress produces a deep, refined marble-like acoustic pop with zero ping or hollow rattle.',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Space Charcoal', hex: '#1E293B' },
      { name: 'Lunar White', hex: '#F8FAFC' }
    ],
    specs: {
      'Switches': 'Custom Factory-Lubed AETHER Linear Silent Jade Switches (Hot-Swappable)',
      'Mounting': 'Multi-Layer Poron Gasket Structure with Brass Acoustic Weight',
      'Connectivity': 'Bluetooth 5.4, 2.4GHz Wireless Transceiver, USB-C'
    },
    features: [
      {
        icon: 'Keyboard',
        title: 'Bespoke Acoustic Tuning',
        description: 'Poron sound dampening layers give every keystroke a satisfying, deep acoustic response.'
      }
    ],
    inTheBox: ['Veloce Keyboard', 'Keycap & Switch Puller', 'Coiled Aviator Cable', 'Dust Cover'],
    reviews: [],
    faqs: []
  },
  {
    id: 'aura-charging-stand',
    slug: 'aura-charging-stand',
    name: 'Aura Solid Titanium Dock',
    brand: 'AETHER',
    tagline: 'Sculpted wireless acoustic charging.',
    category: 'Refined Accessories',
    categorySlug: 'accessories',
    price: 149,
    rating: 4.9,
    reviewCount: 57,
    isNew: false,
    isBestSeller: false,
    isFeatured: false,
    inStock: true,
    stockCount: 30,
    description: 'Machined from a solid 1kg billet of titanium with integrated Qi2 15W magnetic fast charging for smartphones and audio gear.',
    longDescription: 'The Aura Titanium Dock holds your headphones securely in an arched acoustic position to preserve headband memory foam while providing 15W magnetic Qi2 fast wireless charging at its heavy anti-tip base.',
    images: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Raw Machined Titanium', hex: '#94A3B8' },
      { name: 'Anodized Obsidian', hex: '#18181B' }
    ],
    specs: {
      'Material': 'Solid CNC Billet Grade 5 Titanium',
      'Charging': '15W Qi2 Fast Magnetic Base',
      'Weight': '1,120 grams (Anti-Tip Counterweighted)'
    },
    features: [
      {
        icon: 'Zap',
        title: 'Weighted One-Handed Release',
        description: 'Over 1.1kg of solid metal keeps the dock planted firmly when lifting your phone or headset.'
      }
    ],
    inTheBox: ['Aura Titanium Dock', 'Braided 2m USB-C Cable', 'Hex Tool'],
    reviews: [],
    faqs: []
  },
  {
    id: 'apex-drone-pro',
    slug: 'apex-drone-pro',
    name: 'Apex 8K Cinema Drone',
    brand: 'AETHER',
    tagline: 'Aerial cinematography. Perfected.',
    category: 'Studio Computing',
    categorySlug: 'laptops',
    price: 1599,
    originalPrice: 1799,
    discountPercent: 11,
    rating: 4.96,
    reviewCount: 28,
    isNew: true,
    isBestSeller: false,
    isFeatured: true,
    inStock: true,
    stockCount: 7,
    description: 'Full carbon fiber folding airframe, 1-inch 8K 60fps Hasselblad optical sensor, 360-degree LiDAR collision avoidance, and 45-minute flight time.',
    longDescription: 'The Apex Drone Pro brings Hollywood-level aerial photography to high-end filmmakers. Built with aerodynamic carbon fiber composite arms, it withstands 45 knot wind gusts while capturing 8K ProRes RAW video with 14 stops of dynamic range.',
    images: [
      'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Stealth Carbon Black', hex: '#18181B' }
    ],
    specs: {
      'Camera': '1-inch CMOS 8K/60fps ProRes RAW & 48MP Stills',
      'Flight Time': '45 Minutes per Battery Cell',
      'Transmission Range': '20 km with OcuLink 4K Low Latency Video',
      'Safety': 'Omnidirectional 360° LiDAR & Vision Sensors'
    },
    features: [
      {
        icon: 'Camera',
        title: '8K 60fps ProRes RAW',
        description: 'Uncompressed cinematic imagery with 14 stops of dynamic range and 10-bit D-Log.'
      },
      {
        icon: 'Navigation',
        title: '360° LiDAR Obstacle Avoidance',
        description: 'Flies through dense forest canopies and complex structures with autonomous safety.'
      }
    ],
    inTheBox: [
      'Apex Drone Pro',
      'Smart Controller with 7-inch 2,000 Nit Display',
      '3x Intelligent Flight Batteries',
      'Rapid GaN Charging Hub',
      'Hard Shell Pelican Carrying Case'
    ],
    reviews: [],
    faqs: []
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter(p => p.categorySlug === categorySlug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.isFeatured);
}

export function getBestSellers(): Product[] {
  return products.filter(p => p.isBestSeller);
}

export function getNewArrivals(): Product[] {
  return products.filter(p => p.isNew);
}
