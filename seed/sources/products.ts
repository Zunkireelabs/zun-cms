interface ProductDomainMeta {
  id: string
  slug: string
  title: string
  description: string
  image: string
  imagePosition?: 'object-center' | 'object-top' | 'object-bottom'
  projectKeywords?: string[]
}

export const PRODUCT_DOMAIN_META: ProductDomainMeta[] = [
  {
    id: 'roofing',
    slug: 'roofing',
    title: 'Roofing Systems',
    description:
      'IKO roofing systems offer a reliable and high-performance solution for both residential and commercial buildings in Nepal. Manufactured in Canada and now available locally, IKO specializes in durable asphalt shingles designed to withstand diverse weather conditions, from heavy rainfall to intense sunlight. These shingles combine strong waterproofing, long-lasting protection, and modern aesthetic appeal — making them an ideal choice for projects that prioritise quality, efficiency, and visual finish, whether for new construction or renovation.',
    image: 'https://www.iko.com/na/wp-content/uploads/2024/05/RGB-0186_IKO_NRDC_SHGL_HOME_FRGY_DJI_0186.webp',
    projectKeywords: ['Roofing', 'IKO', 'Kalzip', 'Slate', 'Shingle'],
  },
  {
    id: 'facade',
    slug: 'facade-solutions',
    title: 'Facade Solutions',
    description:
      'Hunter Douglas façade solutions are now available in Nepal, bringing globally trusted design and engineering to modern building exteriors. Known for innovative architectural systems, Hunter Douglas offers high-performance façades that enhance aesthetics while improving energy efficiency, ventilation, and sun control. Designed for both commercial and residential projects, these systems combine durability with sleek, contemporary finishes — ideal for visually striking and functional building envelopes.',
    image: 'https://www.hunterdouglasgroup.com/wp-content/uploads/2015/01/architecture-thumb-320x321-copy-320x321.jpg',
    projectKeywords: ['Facade', 'Façade', 'Hunter Douglas', 'Cladding'],
  },
  {
    id: 'ceiling',
    slug: 'ceiling-systems',
    title: 'Ceiling Systems',
    description:
      'Commercial and acoustic ceiling solutions including metal, mineral fiber, wood, and stretch ceilings — engineered for offices, hotels, hospitals, and airports.',
    image: 'https://ap.hunterdouglas.asia/cms/imgs/approduct/wood-ceiling.jpg',
    projectKeywords: ['Ceiling', 'Armstrong'],
  },
  {
    id: 'aluminum',
    slug: 'aluminum-doors-windows',
    title: 'Aluminium Doors and Windows',
    description:
      'Premium aluminium doors and windows crafted for strength, durability, and modern design. Built with high-quality materials and long-lasting performance, they are perfect for residential and commercial spaces — providing excellent functionality, low maintenance, and a sleek architectural finish.',
    image: 'https://image-apac.archify.com/catalog/supplier_updates/l/52_6yagx6g7.jpg',
    projectKeywords: ['Tostem', 'Aluminium', 'Aluminum', 'Windows', 'Door'],
  },
  {
    id: 'coating',
    slug: 'wood-glass-metal-coating',
    title: 'Wood, Glass, and Metal Coating',
    description:
      'ICA Pidilite wood coatings bring premium Italian technology to Nepal, offering advanced surface finishing solutions for wood, metal, and glass. Known for durability and refined aesthetics, ICA coatings enhance the natural look of wood while providing strong protection against wear, moisture, and environmental damage. Their expanding services in Nepal now include high-performance metal and glass coatings, ensuring a consistent, long-lasting finish across different materials for both residential and commercial applications.',
    image: 'https://i.pinimg.com/1200x/d7/05/d9/d705d9c2fbc5645f050e05b3424cb0d6.jpg',
    projectKeywords: ['ICA', 'Coating'],
  },
  {
    id: 'hardware',
    slug: 'door-hardware',
    title: 'Access Control Solutions',
    description:
      'A complete range of solutions including door hardware, access control systems, movable walls, glass partitions, and digital security solutions designed to enhance functionality, safety, and modern aesthetics. Our products are ideal for residential, commercial, and institutional spaces, providing seamless integration of security, flexibility, and contemporary design.',
    image: 'https://dormakaba-res.cloudinary.com/image/upload/t_prod-category-teasers/f_auto,q_auto/v1745406094/dormakaba-prod/1674040054-rt-plus-lh--2--jpgedit.jpg',
    projectKeywords: ['Dormakaba', 'Hardware', 'Onity', 'Movable', 'Sensor', 'RFID'],
  },
  {
    id: 'railings',
    slug: 'architectural-railings',
    title: 'Architectural Railings',
    description:
      'Zolon is a modern architectural solutions brand known for premium railing systems, glass fittings, and hardware used in residential and commercial spaces. Originating from Rajkot, Zolon focuses on combining durability, safety, and sleek contemporary design using stainless steel and glass. Now available in Nepal, Zolon brings internationally styled railing solutions — from balcony and stair railings to façade systems — to local projects.',
    image: 'https://betterhomeapp.com/cdn/shop/files/GLRA0002-Zolon-Glass-Staircase-Balcony-Railing-Better-Home-2_grande.jpg?v=1713608644',
    projectKeywords: ['Railing', 'Zolon', 'Handrail', 'Balustrade'],
  },
  {
    id: 'waterproofing',
    slug: 'waterproofing',
    title: 'Waterproofing Systems',
    description:
      'Premium waterproofing solutions using high-quality chemicals designed to deliver long-lasting protection for decades. Our systems are ideal for residential, commercial, and industrial structures — ensuring durability, leak prevention, and enhanced structural life in all weather conditions.',
    image: '/images/products/product-waterproofing.jpg',
    projectKeywords: ['Waterproof', 'Schomburg', 'Ardex'],
  },
  {
    id: 'wastewater',
    slug: 'wastewater-management',
    title: 'Wastewater Management',
    description:
      'Wastewater management — the systematic collection, treatment, and safe disposal or reuse of used water from households, industries, and commercial activities to protect public health and the environment. We deliver Sewage Treatment Plants (STP) for domestic wastewater and Effluent Treatment Plants (ETP) for industrial discharge, removing harmful chemicals, solids, and pollutants before release or reuse. Our systems also enable recycling, resource recovery, and sustainable practices that reduce water scarcity and pollution.',
    image: '/images/products/product-wastewater.jpg',
    projectKeywords: ['STP', 'ETP', 'Sintex', 'Sewage', 'Effluent', 'Storage Tank', 'Water Tank'],
  },
  {
    id: 'sanitaryware',
    slug: 'sanitaryware',
    title: 'Sanitaryware and Bathroom Solutions',
    description:
      'Premium sanitary ware solutions designed for durability, hygiene, and modern aesthetics — ideal for hotels, hospitals, residential, and commercial spaces. Our range combines high-quality materials with innovative designs to ensure reliability, easy maintenance, and a refined finish that enhances both functionality and overall space appeal.',
    image: 'https://danubetoilet.com/wp-content/uploads/2024/10/What-Is-Sanitary-Ware.png',
    projectKeywords: ['Sanitary', 'Grohe', 'American Standard', 'Bathroom', 'CP Fitting'],
  },
  {
    id: 'office-furnitures',
    slug: 'office-furnitures',
    title: 'Office Furnitures',
    description:
      'Premium office furniture solutions designed for modern workspaces — from executive offices to open-plan environments. SOS office furniture combines ergonomic design, durability, and contemporary aesthetics to create productive and visually refined work environments for commercial and institutional projects.',
    image: '/images/products/product-office-furniture.jpg',
    projectKeywords: ['Office Furniture', 'SOS', 'Furniture', 'Workstation'],
  },
  {
    id: 'flooring',
    slug: 'flooring',
    title: 'Flooring',
    description:
      'A wide range of premium flooring options including wooden flooring, parquet, and other modern finishes. Designed for durability and style, our solutions enhance both residential and commercial spaces with a perfect blend of elegance, comfort, and long-lasting performance.',
    image: '/images/products/product-flooring.jpg',
    projectKeywords: ['Flooring', 'Tarkett', 'BKB', 'Welspun', 'Parquet', 'Vinyl', 'SPC'],
  },
  {
    id: 'tiles',
    slug: 'tiles',
    title: 'Tiles',
    description:
      'A wide range of premium tiles featuring diverse design patterns, from transitional to modern styles, offering every type of finish and texture. Our collection is crafted to suit residential and commercial spaces, combining durability with elegant aesthetics to enhance any interior or exterior.',
    image: '/images/products/product-flooring.jpg',
    projectKeywords: ['Tiles', 'Ceramic', 'Prime Tiles'],
  },
  {
    id: 'fire-rated-doors',
    slug: 'fire-rated-doors',
    title: 'Fire Rated Doors',
    description:
      'High-performance fire rated doors engineered to contain fire and smoke, protecting lives and property across commercial, industrial, and residential projects. Navair fire rated doors meet international safety standards and are available in steel, wooden, acoustic, and glass variants — suitable for emergency exits, stairwells, corridors, and shaft openings.',
    image: 'https://images.jdmagicbox.com/quickquotes/images_main/rectangular-wooden-modular-office-furniture-2220097149-f7jqlnv5.jpg',
    projectKeywords: ['Fire Door', 'Navair', 'Fire Rated', 'Emergency Exit'],
  },
]
