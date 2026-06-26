export interface MilestoneEntry {
  year: number
  venture: string
  title: string
  description: string
  icon: string
  brands: string[]
}

export const MILESTONES: MilestoneEntry[] = [
  {
    year: 2002,
    venture: 'Kantipur',
    title: 'T&C Division Established',
    description:
      'CMS Group founded as a construction trade firm. Trading & Contracting Division commences operations in Nepal.',
    icon: 'Sparkles',
    brands: [],
  },
  {
    year: 2003,
    venture: 'Bath N Room Trade Concern Pvt. Ltd.',
    title: 'First Brand Collaborations',
    description:
      'First authorised partnerships with global sanitaryware and bathroom solution leaders.',
    icon: 'Bath',
    brands: ['American Standard', 'Grohe'],
  },
  {
    year: 2010,
    venture: 'Baba Muktinath Fabricators Pvt. Ltd.',
    title: 'Major Brand Expansion',
    description:
      'Onboarding world-class roofing, ceiling, facade, hardware, and waterproofing brands.',
    icon: 'Wrench',
    brands: ['IKO', 'Kalzip', 'Armstrong', 'Hunter Douglas', 'Tostem', 'Dormakaba', 'ICA', 'Zolon', 'Navair', 'Schomburg'],
  },
  {
    year: 2015,
    venture: '4R Technologies Pvt. Ltd.',
    title: 'Sustainability & Water Management',
    description:
      'Expanding into ecologically friendly wastewater management and treatment solutions.',
    icon: 'Recycle',
    brands: ['Sintex'],
  },
  {
    year: 2018,
    venture: 'Cubic Meter Pvt. Ltd.',
    title: 'Interior Contracting Launched',
    description: 'Interior finishing and contracting work brought in-house.',
    icon: 'Briefcase',
    brands: [],
  },
  {
    year: 2019,
    venture: 'Techwood Pvt. Ltd.',
    title: 'Flooring & Furniture Portfolio',
    description:
      'Adding premium flooring and modular office furniture brands to the T&C Division portfolio.',
    icon: 'Armchair',
    brands: ['AGT', 'Tarkett', 'Argil', 'KLK', 'Welspun', 'SOS'],
  },
  {
    year: 2021,
    venture: 'Prime Ceramics Pvt. Ltd.',
    title: 'Ceramic Manufacturing in Nepal',
    description:
      'Ceramic tile manufacturing in Nepal — joint venture with Fortune Ventures Pvt. Ltd.',
    icon: 'Building2',
    brands: [],
  },
]
