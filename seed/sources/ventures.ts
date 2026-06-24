export interface VentureEntry {
  name: string
  shortName: string
  slug: string
  founded: number
  tagline?: string
  description: string
  products: { name: string; image?: string }[]
  brands: []
}

export const VENTURES: VentureEntry[] = [
  {
    name: 'Bath N Room Trade Concern Pvt. Ltd.',
    shortName: 'Bath N Room',
    slug: 'bath-n-room',
    founded: 2003,
    tagline: 'One-stop solution for building finishing products',
    description:
      'Bath N Room Trade was founded in 2003 with a single vision: to be the one-stop solution for building finishing items in the Nepalese market. We specialize in a wide variety of imported tiles, sanitary wares, bath fittings, kitchen sinks, hubs, chimneys, whirlpool solutions (steams, sauna, bathtub & jacuzzi), pipes and fittings, stone, marble and granite, doors and parquet, as well as prefabricated swimming pool solutions and other various construction finishing products. Our core focus is to bring elegance to every living space.',
    products: [
      { name: 'Indoor Tiles' },
      { name: 'Mosaic Tiles' },
      { name: 'Sanitary Wares' },
      { name: 'Pre-post Flush & Drainage System' },
      { name: 'Marble & Granite' },
      { name: 'Toilet Cubicle & Partition' },
      { name: 'CPVC – PVC Pipes & Fitting' },
      { name: 'Bathroom Sensor System' },
      { name: 'Kitchen Sinks & Sink Mixer' },
      { name: 'Handicapped Toilets' },
      { name: 'Vanities' },
      { name: 'Water Filter & Solar' },
      { name: 'Chimneys, Hub & Accessories' },
      { name: 'CP Bathroom Fittings & Accessories' },
      { name: 'Decorative Tiles & Pencil' },
      { name: 'RAK Outdoor Tiles & Pavement' },
      { name: 'Stone Cladding & Stone Veneer' },
      { name: 'Tiles Adhesive & Grouting' },
      { name: 'Water Coolers & Drinking Fountains' },
      { name: 'Whirlpool & Bathtub Solutions' },
    ],
    brands: [],
  },
  {
    name: 'Baba Muktinath Fabricators Pvt. Ltd.',
    shortName: 'Baba Muktinath',
    slug: 'baba-muktinath',
    founded: 2010,
    tagline: 'World-class building finishing systems for Nepal',
    description:
      'Established in 2010, Baba Muktinath Fabricators stands as a prominent player in the industry, renowned for its expertise in trading, distributing, and manufacturing. Our continuous dedication to quality leads us to deliver world-class solutions across a wide range of product areas — wood coatings, door fittings, glass hardware, automatic sensor doors, false ceilings, façade roofing, waterproofing solutions, movable partitions, toilet cubicles, PVC roofs and gutters, parking elevators, and much more.',
    products: [
      { name: 'Tarkett Floors' },
      { name: 'Wöhr Parking Lifts' },
      { name: 'Armstrong Ceiling' },
      { name: 'IKO Asphalt Roofing Shingles' },
      { name: 'Gunnebo Security Products' },
      { name: 'TOSTEM Aluminium Doors & Windows' },
      { name: 'Dormakaba Revolving Doors' },
      { name: 'Rucca Wood Plastic Composite Material' },
      { name: 'SCG Smart Board, Smart Wood & Roofing Tiles' },
      { name: 'Coffor India Formwork' },
      { name: 'ICA Italian Wood Coatings' },
      { name: 'Stone Coated Roofing, PVC Roofing & Gutters' },
      { name: 'Linear Metal Ceiling, Aluminium Façade & Window Blinds' },
      { name: 'Stylam Toilet Cubicles' },
      { name: 'Geo Textiles' },
      { name: 'Laminated Flooring & Engineered Wood' },
      { name: 'Balusters & Railings' },
      { name: 'Raised Access Flooring' },
      { name: 'Saint-Gobain Glass' },
      { name: 'Eurolux Stretch Ceiling' },
      { name: 'Kalzip Metal Roofing' },
    ],
    brands: [],
  },
  {
    name: '4R Technologies Pvt. Ltd.',
    shortName: '4R Technologies',
    slug: '4r-technologies',
    founded: 2015,
    tagline: 'Refuse · Reduce · Reuse · Recycle — green products for Nepal',
    description:
      '4R Technologies was founded in 2015 with a clear objective of promoting ecologically friendly and recyclable products. Our knowledge includes waste treatment solutions such as Sewage Treatment Plants (STP) and Effluent Treatment Plants (ETP). We also specialize in designing stunning water features such as fountains and waterfalls. Our product line includes a diverse range of solutions designed to maximize resource utilization while minimizing environmental impact — SMC panel tanks, Zinc Aluminum Bulk Tanks, Fuel Tanks, and more.',
    products: [
      { name: 'Architectural Fountains' },
      { name: 'Bulk Water Storage Plants', image: '/images/ventures/4r-technologies/bulk-water-storage.jpg' },
      { name: 'Swimming Pool Solutions', image: '/images/ventures/4r-technologies/swimming-pool.jpg' },
      { name: 'Aerobic Sewage Treatment', image: '/images/ventures/4r-technologies/aerobic-sewage.jpg' },
      { name: 'Aerobic Sewage Treatment Plants' },
      { name: 'Effluent Treatment Plants' },
    ],
    brands: [],
  },
  {
    name: 'Cubic Meter Pvt. Ltd.',
    shortName: 'Cubic Meter',
    slug: 'cubic-meter',
    founded: 2018,
    tagline: 'Comprehensive interior contracting and finishing',
    description:
      'Cubic Meter is a distinguished name in the interior contracting market, a leading, professional, and trusted provider of top-notch interior solutions. We specialize in delivering innovative items, utilizing cutting-edge equipment, and employing globally educated installers with an unrelenting dedication to perfection. Our expertise lies in understanding the unique requirements and aspirations of our clients and translating them into tangible, remarkable spaces.',
    products: [],
    brands: [],
  },
  {
    name: 'Techwood Pvt. Ltd.',
    shortName: 'Techwood',
    slug: 'techwood',
    founded: 2019,
    tagline: 'Modular furniture solutions for corporate offices',
    description:
      'Techwood Pvt Ltd is committed to offering high-quality modular furniture solutions for business offices in Nepal. Our complete services include a large selection of modular office furniture from well-known companies, catering to the needs of both offices and schools. Our experienced staff combines expertise and creativity to develop customized solutions that maximize functionality, aesthetics, and comfort in corporate office spaces.',
    products: [
      { name: 'Workstations' },
      { name: 'Office Partitions' },
      { name: 'Executive Tables' },
      { name: 'Carpet' },
      { name: 'SPC Flooring' },
      { name: 'School Furniture' },
    ],
    brands: [],
  },
  {
    name: 'Prime Ceramics Pvt. Ltd.',
    shortName: 'Prime Ceramics',
    slug: 'prime-ceramics',
    founded: 2021,
    tagline: 'Tiles with style — ceramic tile manufacturing in Nepal',
    description:
      'Prime Ceramics Private Limited (PCPL) is a distinguished private limited company established in 2021 with a specific focus on ceramic tile manufacturing in Nepal. PCPL is the result of a strategic joint venture between CMS and Fortune Ventures Pvt Ltd Nepal. We produce a wide variety of tiles, including vitrified tiles and ceramic tiles, using cutting-edge European technology — for floors, walls, rooms, kitchens, bathrooms, living rooms, and outdoor spaces.',
    products: [
      { name: 'Floor — Plaster Fade Grey Decor' },
      { name: 'Floor — Zeal Dotted Grey' },
      { name: 'Wall — Floral Brown' },
      { name: 'Floor — Classic Curves' },
      { name: 'Floor — Cachemira Avorio' },
      { name: 'Floor — White Carrara' },
      { name: 'Floor — ATOM' },
      { name: 'Ridge Petals Blue' },
      { name: 'Zeal Dotted' },
      { name: 'Pierra Blanche' },
      { name: 'Teak Brown' },
      { name: 'Alphino Teca' },
      { name: 'Mystery White Waves' },
      { name: 'Nordique Glance' },
    ],
    brands: [],
  },
]
