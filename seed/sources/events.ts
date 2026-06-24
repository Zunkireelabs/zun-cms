export type EventCategory =
  | 'training'
  | 'partnership'
  | 'csr'
  | 'trade-show'
  | 'internal'
  | 'milestone'

export interface CMSEvent {
  id: string
  title: string
  month: string
  year: number
  date: string
  category: EventCategory
  description: string
  image?: string
  featured?: boolean
}

export const EVENTS: CMSEvent[] = [
  {
    id: 'prime-launch-2023',
    image: '/images/events/prime-launch-2023.jpg',
    title: 'Prime Ceramics Launch Event',
    month: 'Jun',
    year: 2023,
    date: 'June 2023',
    category: 'milestone',
    description:
      'Grand launch of Prime Tiles — the CMS Group × Fortune Ventures joint-venture ceramic-tile manufacturing brand. Attended by Mr. Paolo Mongardi (President), Mr. Rakesh Garg (Chairman, Prime Tiles), and Mr. Prashant Agarwal (Managing Director, CMS Group).',
    featured: true,
  },
  {
    id: 'prime-factory-2023',
    image: '/images/events/prime-factory-2023.jpg',
    title: 'Prime Ceramics Factory Operational',
    month: 'Jun',
    year: 2023,
    date: 'June 2023',
    category: 'milestone',
    description:
      'Prime Ceramics tile-manufacturing factory enters operation in Nepal — kiln line, body-press line, and packaging line all live. First locally manufactured vitrified and ceramic tiles using cutting-edge European technology.',
  },
  {
    id: 'tostem-buildcon-2023',
    image: '/images/events/tostem-buildcon-2023.jpg',
    title: 'Tostem at Buildcon Exhibition',
    month: 'Jun',
    year: 2023,
    date: 'June 2023',
    category: 'trade-show',
    description:
      'CMS Group & Baba Muktinath Fabricators exhibited the full TOSTEM aluminium door & window range at Buildcon Nepal — featuring the latest TOSTEM ALU+ premium living systems.',
  },
  {
    id: 'tostem-showroom-2023',
    image: '/images/events/tostem-showroom-2023.jpg',
    title: 'TOSTEM Studio Showroom Opening',
    month: 'Jun',
    year: 2023,
    date: 'June 2023',
    category: 'milestone',
    description:
      "Opening of the TOSTEM Studio dedicated showroom in Kathmandu — Nepal's first experiential studio for TOSTEM aluminium window and door systems, where architects and homeowners can specify with real product walls.",
  },
  {
    id: 'blood-donation-2023',
    image: '/images/events/blood-donation-2023.jpg',
    title: 'Blood Donation Camp 2023',
    month: 'Jun',
    year: 2023,
    date: 'June 2023',
    category: 'csr',
    description:
      'Fourth annual CMS Group Blood Donation Camp — a continuing CSR commitment, "A Gift of Blood is Gift of Life."',
  },
  {
    id: 'tostem-launch-lixil-2023',
    image: '/images/events/tostem-launch-lixil-2023.jpg',
    title: 'LIXIL — TOSTEM Premium Product Launch',
    month: 'Apr',
    year: 2023,
    date: 'April 2023',
    category: 'partnership',
    description:
      'Official LIXIL TOSTEM premium product launch event in Kathmandu — introducing the next-generation TOSTEM aluminium systems to architects, contractors, and trade partners.',
  },
  {
    id: 'ica-designers-meet-2023',
    image: '/images/events/ica-designers-meet-2023.jpg',
    title: "ICA Designers' Meet",
    month: 'Dec',
    year: 2023,
    date: 'December 2023',
    category: 'training',
    description:
      'Designer-focused meet showcasing the ICA Italian wood-coatings range — colour-effect samples, finish technical sessions, and one-on-one consultation for interior designers and architects.',
  },
  {
    id: 'structural-engineer-meet-2022',
    image: '/images/events/structural-engineer-meet-2022.jpg',
    title: 'Structural Engineers Meet',
    month: 'Nov',
    year: 2022,
    date: 'November 2022',
    category: 'training',
    description:
      "Technical engagement with Nepal's structural engineering community — material specification, code-compliant detailing, and product-system Q&A across CMS portfolios.",
  },
  {
    id: 'marketing-meet-nov-2022',
    title: 'Marketing Meet — November',
    month: 'Nov',
    year: 2022,
    date: 'November 2022',
    category: 'internal',
    description:
      'Cycle marketing meet aligning the CMS Group sales and BD teams across ventures on the upcoming Q-cycle vision and account targets.',
  },
  {
    id: 'fabricators-meet-2022',
    image: '/images/events/fabricators-meet-2022.jpg',
    title: "Fabricators' Meet",
    month: 'Nov',
    year: 2022,
    date: 'November 2022',
    category: 'training',
    description:
      "Trade engagement with Nepal's fabricator community — installation standards, technical Q&A, and partner certification for downstream fabrication of CMS-supplied building systems.",
  },
  {
    id: 'plumbers-meet-2022',
    image: '/images/events/plumbers-meet-2022.jpg',
    title: "Plumbers' Meet — October",
    month: 'Oct',
    year: 2022,
    date: 'October 2022',
    category: 'training',
    description:
      "Second edition of the CMS Plumbers' Meet — installation training and product walkthrough for the plumbing trade across Bath N Room's sanitary and CP fittings range.",
  },
  {
    id: 'engineers-meet-2022',
    image: '/images/events/engineers-meet-2022.jpg',
    title: "Engineer's Meet",
    month: 'Sep',
    year: 2022,
    date: 'September 2022',
    category: 'training',
    description:
      'Engineering community engagement bringing together project, civil, and MEP engineers — product orientation, project case studies, and Q&A on building-system specifications.',
  },
  {
    id: 'public-works-presentation-2022',
    image: '/images/events/public-works-presentation-2022.jpg',
    title: 'Public Works Department Presentation',
    month: 'Aug',
    year: 2022,
    date: 'August 2022',
    category: 'partnership',
    description:
      "CMS Group presentation to Nepal's Public Works Department — showcasing the full distribution catalogue and contracting capabilities for federal infrastructure projects.",
  },
  {
    id: 'tostem-thailand-2022',
    title: 'Tostem Thailand Factory Visit',
    month: 'Jul',
    year: 2022,
    date: 'July 2022',
    category: 'partnership',
    description:
      'CMS team visited the Tostem manufacturing facility in Thailand to deepen technical understanding of pre-engineered aluminium window and door systems.',
  },
  {
    id: 'marketing-vision-quest-2022',
    image: '/images/events/marketing-vision-quest-2022.jpg',
    title: 'Marketing Meet & Vision Quest',
    month: 'Jul',
    year: 2022,
    date: 'July 2022',
    category: 'internal',
    description:
      'Group-wide marketing strategy meet aligning the sales and BD teams across all CMS Group ventures on the next-cycle vision.',
  },
  {
    id: 'technician-meet-2022',
    image: '/images/events/technician-meet-2022.jpg',
    title: "Technician's Meet",
    month: 'Jun',
    year: 2022,
    date: 'June 2022',
    category: 'training',
    description:
      'Hands-on technician training session at Bath N Room facility — focused on installation standards for partner brand product lines.',
  },
  {
    id: 'annual-day-2022',
    image: '/images/events/annual-day-2022.jpg',
    title: 'CMS Group Annual Day',
    month: 'Jun',
    year: 2022,
    date: 'June 2022',
    category: 'internal',
    description:
      'Annual celebration bringing the entire CMS Group team together — recognition, team activities, and the year-ahead announcements.',
  },
  {
    id: 'blood-donation-2022',
    image: '/images/events/blood-donation-2022.jpg',
    title: 'Blood Donation Campaign',
    month: 'Jun',
    year: 2022,
    date: 'June 2022',
    category: 'csr',
    description:
      "Annual CSR initiative — CMS Group team donates blood as part of the 'Gift of Blood is Gift of Life' campaign.",
  },
  {
    id: 'womens-day-2022',
    title: "International Women's Day",
    month: 'Mar',
    year: 2022,
    date: 'March 2022',
    category: 'internal',
    description:
      'Group-wide celebration honouring the women across CMS Group ventures who power our daily operations and client relationships.',
  },
  {
    id: 'christmas-new-year-2019',
    image: '/images/events/christmas-new-year-2019.jpg',
    title: 'Christmas & New Year Celebration',
    month: 'Dec',
    year: 2019,
    date: 'December 2019',
    category: 'internal',
    description:
      'End-of-year celebration with the CMS team marking another successful year and welcoming the year ahead.',
  },
  {
    id: 'blood-donation-2019',
    image: '/images/events/blood-donation-2019.jpg',
    title: 'Blood Donation Camp 2019',
    month: 'Dec',
    year: 2019,
    date: 'December 2019',
    category: 'csr',
    description:
      'CMS Group Blood Donation Camp — community contribution by employees and partners.',
  },
  {
    id: 'buildcon-2019',
    image: '/images/events/buildcon-2019.jpg',
    title: '5th Buildcon Exhibition',
    month: 'Feb',
    year: 2019,
    date: 'February 2019',
    category: 'trade-show',
    description:
      "CMS Group exhibited at the 5th Buildcon — Nepal's leading construction and building materials trade exhibition. One-Stop Solutions for Construction Finishing Materials.",
  },
  {
    id: 'blood-donation-2018',
    image: '/images/events/blood-donation-2018.jpg',
    title: 'Blood Donation Camp 2018',
    month: 'Dec',
    year: 2018,
    date: 'December 2018',
    category: 'csr',
    description:
      "Inaugural CMS Group Blood Donation Camp — 'Save a life, Give blood.' Held at Signature Apartment Hall.",
  },
  {
    id: 'plumbers-meet-2018',
    image: '/images/events/plumbers-meet-2018.jpg',
    title: "Plumbers' Meet",
    month: 'Aug',
    year: 2018,
    date: 'August 2018',
    category: 'training',
    description:
      "Technical meet for plumbing partners — product walkthrough and Q&A on Bath N Room's sanitary fixture range.",
  },
  {
    id: 'iko-launch-2018',
    image: '/images/events/iko-launch-2018.jpg',
    title: 'IKO Roofing Product Launch',
    month: 'Aug',
    year: 2018,
    date: 'August 2018',
    category: 'partnership',
    description:
      'Official launch of IKO premium roofing systems for the Nepali market at Hotel Soaltee Crowne Plaza, Kathmandu — bringing world-class asphalt roofing to local projects.',
  },
  {
    id: 'armstrong-seminar-2017',
    image: '/images/events/armstrong-seminar-2017.jpg',
    title: 'Armstrong Ceiling Solutions Seminar',
    month: 'Jun',
    year: 2017,
    date: 'June 2017',
    category: 'training',
    description:
      'Industry seminar on Armstrong ceiling systems hosted at Hotel Annapurna, Kathmandu — bringing together architects, contractors, and consultants.',
  },
]
