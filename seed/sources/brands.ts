export type VentureSlug =
  | 'bath-n-room'
  | 'baba-muktinath'
  | '4r-technologies'
  | 'techwood'
  | 'prime-ceramics'

export interface BrandEntry {
  name: string
  slug: string
  country: string
  founded?: number
  segments: string[]
  description: string
  venture: VentureSlug
  tradingDomains?: string[]
  website?: string
  logoUrl?: string
}

export const BRANDS: BrandEntry[] = [
  // 4R Technologies
  {
    name: 'Sintex',
    slug: 'sintex',
    country: 'Japan',
    founded: 1931,
    segments: ['Sewage Treatment Plant'],
    description:
      'A trusted name in wastewater management, Sintex delivers advanced sewage treatment plant solutions for residential, commercial, and industrial projects, ensuring clean and compliant water disposal.',
    venture: '4r-technologies',
    tradingDomains: ['wastewater-management'],
    website: 'https://www.sintexonline.com',
    logoUrl: '/images/brands/sintex.png',
  },

  // Bath n Room — Sanitaryware
  {
    name: 'American Standard',
    slug: 'american-standard',
    country: 'USA',
    founded: 1929,
    segments: ['Sanitary Fixtures'],
    description:
      'A globally recognised leader in bathroom and kitchen products, American Standard delivers premium sanitary fixtures combining durability, hygiene, and modern design for residential and commercial spaces.',
    venture: 'bath-n-room',
    tradingDomains: ['sanitaryware'],
    website: 'https://www.americanstandard-us.com',
    logoUrl: '/images/brands/american-standard.png',
  },
  {
    name: 'Grohe',
    slug: 'grohe',
    country: 'Germany',
    founded: 1936,
    segments: ['Sanitary Fixtures'],
    description:
      'German engineering meets refined design — Grohe offers world-class faucets, showers, and bathroom systems built for precision, longevity, and an elevated user experience.',
    venture: 'bath-n-room',
    tradingDomains: ['sanitaryware'],
    website: 'https://www.grohe.com/en-GB',
    logoUrl: '/images/brands/grohe.png',
  },

  // Baba Muktinath — Roofing
  {
    name: 'Stone Coated Metal Roofing',
    slug: 'gerard',
    country: 'New Zealand',
    founded: 1957,
    segments: ['Stone Coated Metal Roofing'],
    description:
      'Gerard is a New Zealand manufacturer of premium stone-coated steel roofing tiles — combining the beauty of traditional roof tiles with the strength and longevity of steel, trusted for residential and commercial buildings worldwide.',
    venture: 'baba-muktinath',
    tradingDomains: ['roofing'],
    website: 'https://www.sangobuild.com/stone-coated-roof/',
    logoUrl: '/images/brands/sangobuild.png',
  },
  {
    name: 'IKO',
    slug: 'iko',
    country: 'Canada',
    founded: 1951,
    segments: ['Asphalt Roofing'],
    description:
      'IKO is a leading manufacturer of high-performance asphalt roofing shingles, engineered for superior weather resistance and long-lasting protection across residential and commercial buildings.',
    venture: 'baba-muktinath',
    tradingDomains: ['roofing'],
    website: 'https://www.iko.com',
    logoUrl: '/images/brands/iko.png',
  },
  {
    name: 'Kalzip',
    slug: 'kalzip',
    country: 'Germany',
    founded: 1968,
    segments: ['Metal Roofing'],
    description:
      'Kalzip specialises in premium standing seam metal roofing and facade systems, widely used on large-scale commercial, industrial, and landmark architectural projects worldwide.',
    venture: 'baba-muktinath',
    tradingDomains: ['roofing'],
    website: 'https://www.kalzip.com/us/products/roof-systems/',
    logoUrl: '/images/brands/kalzip.png',
  },

  // Baba Muktinath — Ceilings & Facade
  {
    name: 'Armstrong',
    slug: 'armstrong',
    country: 'USA',
    founded: 1891,
    segments: ['False Ceiling and Wall Panel'],
    description:
      "The world's leading ceiling manufacturer, Armstrong offers an extensive range of mineral fiber, metal, and wood ceiling solutions trusted in offices, hospitals, airports, and hotels globally.",
    venture: 'baba-muktinath',
    tradingDomains: ['ceiling-systems'],
    website: 'https://www.armstrongceilings.com/commercial/en/',
    logoUrl: '/images/brands/armstrong.png',
  },
  {
    name: 'Rucca Wood',
    slug: 'rucca-wood',
    country: 'China',
    founded: 2016,
    segments: ['WPC Ceiling Panels', 'PVC Wall Panels', 'WPC Decking & Cladding'],
    description:
      'Rucca Wood is a Chinese specialist in wood-plastic composite building materials — producing waterproof, flame-retardant ceiling panels, wall panels, and decking with a 20–30 year service life and full eco-certifications.',
    venture: 'baba-muktinath',
    tradingDomains: ['ceiling-systems'],
    website: 'https://www.ruccawood.com/product/ceiling-panels-design/',
    logoUrl: '/images/brands/rucca-wood.webp',
  },
  {
    name: 'Hunter Douglas',
    slug: 'hunter-douglas',
    country: 'Germany',
    founded: 1919,
    segments: ['False Ceiling and Wall Panel', 'Facade', 'Window Blinds'],
    description:
      'A global innovator in architectural products, Hunter Douglas delivers high-performance ceiling systems, facade solutions, and solar shading trusted on landmark commercial and residential projects worldwide.',
    venture: 'baba-muktinath',
    tradingDomains: ['facade-solutions', 'ceiling-systems'],
    website: 'https://www.hunterdouglas.com',
    logoUrl: '/images/brands/hunter-douglas.png',
  },
  {
    name: 'NedZink',
    slug: 'nedzink',
    country: 'Netherlands',
    founded: 1895,
    segments: ['Titanium Zinc Facade Cladding', 'Metal Roofing', 'Rainwater Systems'],
    description:
      'A Dutch pioneer in rolled titanium zinc, NedZink supplies premium zinc cladding, roofing, and rainwater systems to architectural projects worldwide — valued for exceptional longevity, sustainability, and full recyclability.',
    venture: 'baba-muktinath',
    tradingDomains: ['facade-solutions'],
    website: 'https://www.nedzink.com/en/',
    logoUrl: '/images/brands/nedzink.svg',
  },
  {
    name: 'Greenlam Clads',
    slug: 'greenlam-clads',
    country: 'India',
    segments: ['Exterior Facade Cladding', 'Interior Wall Cladding', 'High-Pressure Compact Laminates'],
    description:
      'Greenlam Clads delivers high-performance exterior and interior cladding panels featuring advanced UV resistance, fire retardancy, and 10–12 year warranties — engineered for demanding modern architectural facades.',
    venture: 'baba-muktinath',
    tradingDomains: ['facade-solutions'],
    website: 'https://greenlamclads.com/',
    logoUrl: '/images/brands/greenlam-clads.svg',
  },

  // Baba Muktinath — Doors, Windows, Coatings, Hardware
  {
    name: 'Tostem',
    slug: 'tostem',
    country: 'Japan',
    founded: 1967,
    segments: ['Pre-Engineered Aluminium Windows, Doors, Facade, Levers'],
    description:
      "Japan's premier manufacturer of precision-engineered aluminium doors, windows, and facade systems — Tostem combines cutting-edge technology with sleek design for residential and commercial construction.",
    venture: 'baba-muktinath',
    tradingDomains: ['aluminum-doors-windows'],
    website: 'https://www.tostem.com/en/',
    logoUrl: '/images/brands/tostem.png',
  },
  {
    name: 'Navair',
    slug: 'navair',
    country: 'India',
    founded: 1982,
    segments: ['Wooden / Acoustic / Metal Fire Doors'],
    description:
      'Navair is a specialist manufacturer of fire rated doors — available in steel, wooden, acoustic, and glass variants — meeting international fire safety standards for emergency exits, stairwells, and corridors.',
    venture: 'baba-muktinath',
    tradingDomains: ['fire-rated-doors'],
    website: 'https://navairindia.com/',
    logoUrl: '/images/brands/navair.png',
  },
  {
    name: 'ICA Pidilite',
    slug: 'ica',
    country: 'Italy',
    founded: 1971,
    segments: ['Wood Coating'],
    description:
      'An Italian leader in surface finishing, ICA Pidilite brings over 50 years of expertise in wood, glass, and metal coating systems — delivering durable, high-quality finishes for residential and commercial applications.',
    venture: 'baba-muktinath',
    tradingDomains: ['wood-glass-metal-coating'],
    website: 'https://www.icapidilite.com',
    logoUrl: '/images/brands/ica.png',
  },
  {
    name: 'Zolon',
    slug: 'zolon',
    country: 'India',
    founded: 2015,
    segments: ['Glass Railing', 'Stainless Steel Railing Systems'],
    description:
      'Zolon offers premium stainless steel and glass railing systems that combine structural safety with contemporary aesthetics — ideal for balconies, staircases, and facade applications.',
    venture: 'baba-muktinath',
    tradingDomains: ['architectural-railings'],
    website: 'https://zolonhardware.com',
    logoUrl: '/images/brands/zolon.png',
  },
  {
    name: 'Dormakaba',
    slug: 'dormakaba',
    country: 'Germany',
    founded: 1862,
    segments: [
      'Digital and RFID Locks',
      'Acoustic Movable Walls',
      'Architectural Hardware',
      'Automatic Sensor Sliding / Revolving Doors',
      'Glass Facade / Canopy / Skylite',
      'Internal Acoustic Glass Partitions',
      'Glass Shower Cubicles',
    ],
    description:
      'A global leader in access and security solutions, Dormakaba provides digital locks, movable walls, automatic doors, and architectural hardware — trusted across hotels, hospitals, offices, and institutions worldwide.',
    venture: 'baba-muktinath',
    tradingDomains: ['door-hardware'],
    website: 'https://www.dormakabagroup.com/en',
    logoUrl: '/images/brands/dormakaba.png',
  },

  // Baba Muktinath — Waterproofing
  {
    name: 'Schomburg',
    slug: 'schomburg',
    country: 'Germany',
    founded: 1966,
    segments: ['Waterproofing, Epoxy, Construction Chemicals'],
    description:
      'Schomburg is a German manufacturer of professional waterproofing, epoxy, and construction chemical systems — providing long-lasting structural protection for basements, terraces, wet areas, and facades.',
    venture: 'baba-muktinath',
    tradingDomains: ['waterproofing'],
    website: 'https://www.schomburg.com/de/en',
    logoUrl: '/images/brands/schomburg.png',
  },

  // Techwood — Flooring & Furniture
  {
    name: 'AGT',
    slug: 'agt',
    country: 'Turkey',
    founded: 1984,
    segments: ['Wooden Flooring', 'Engineered Wood'],
    description:
      'AGT is a leading Turkish manufacturer of premium laminate and engineered wood flooring, combining European technology with stylish finishes suited for both residential and high-traffic commercial spaces.',
    venture: 'techwood',
    tradingDomains: ['flooring'],
    website: 'https://www.agtwood.com',
    logoUrl: '/images/brands/agt.jpg',
  },
  {
    name: 'Tarkett',
    slug: 'tarkett',
    country: 'France',
    founded: 1997,
    segments: ['Vinyl Flooring', 'Commercial Flooring'],
    description:
      'A French flooring innovator, Tarkett offers a wide range of commercial vinyl and luxury flooring solutions designed for durability, aesthetics, and sustainability in high-traffic environments.',
    venture: 'techwood',
    tradingDomains: ['flooring'],
    website: 'https://commercial.tarkett.com',
    logoUrl: '/images/brands/tarkett.png',
  },
  {
    name: 'Argil',
    slug: 'argil',
    country: 'India',
    segments: ['Wide Plank Flooring'],
    description:
      'Argil specialises in wide plank flooring, delivering natural hardwood and engineered wood floors with a distinctive architectural aesthetic for premium residential and commercial interiors.',
    venture: 'techwood',
    tradingDomains: ['flooring'],
    website: 'https://argiltiles.com/',
    logoUrl: '/images/brands/argil.png',
  },
  {
    name: 'KLK Hardwood Flooring',
    slug: 'klk-hardwood',
    country: 'Malaysia',
    segments: ['Engineered Hardwood Flooring'],
    description:
      'KLK produces certified engineered hardwood flooring crafted from sustainably sourced timber — offering natural beauty, structural stability, and long-lasting performance for commercial and residential spaces.',
    venture: 'techwood',
    tradingDomains: ['flooring'],
    website: 'https://klkflooring.com',
    logoUrl: '/images/brands/klk-hardwood.svg',
  },
  {
    name: 'Welspun',
    slug: 'welspun',
    country: 'India',
    founded: 1985,
    segments: ['Flooring'],
    description:
      "Welspun is one of India's leading flooring brands, offering a diverse range of carpet tiles, rugs, and specialty flooring solutions for residential, hospitality, and commercial projects.",
    venture: 'techwood',
    tradingDomains: ['flooring'],
    website: 'https://welspunflooring.com',
    logoUrl: '/images/brands/welspun.png',
  },
  {
    name: 'SOS',
    slug: 'sos',
    country: 'India',
    segments: ['Office Furniture'],
    description:
      'SOS provides ergonomic, modular office furniture solutions designed for modern corporate environments — from executive workstations to collaborative open-plan setups, combining functionality with contemporary design.',
    venture: 'techwood',
    tradingDomains: ['office-furnitures'],
    website: 'https://www.sosoffice.in/products/',
    logoUrl: '/images/brands/sos.png',
  },
  // Prime Ceramics — Tiles
  {
    name: 'Prime Tiles',
    slug: 'prime-tiles',
    country: 'Nepal',
    segments: ['Tiles & Ceramics'],
    description:
      'Prime Tiles offers a wide range of premium tiles featuring diverse design patterns, from transitional to modern styles, with every type of finish and texture. Their collection combines durability with elegant aesthetics to enhance any interior or exterior.',
    venture: 'prime-ceramics',
    tradingDomains: ['tiles'],
    website: 'https://primeceramics.com.np/',
    logoUrl: '/images/brands/prime-tiles.png',
  },
]
