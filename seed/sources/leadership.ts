export interface DirectorEntry {
  name: string
  title: string
  company: string
  order: number
  photo?: string
  summary?: string
  bio: string
}

export const CHAIRMAN: DirectorEntry = {
  name: 'Mr. Prashant Agarwal',
  title: 'Chairman',
  company: 'CMS Group',
  order: 0,
  photo: '/images/leadership/prashant-agarwal.jpg',
  summary:
    "Founded Construction Materials Group in 2002. Drives the group's expansion across trading, contracting, industrial development, and e-commerce.",
  bio: "It gives me great pleasure to introduce Construction Materials Group, a distinguished organization founded in 2002. We began as a construction trade firm and have since evolved and expanded our operations to include trading, contracting, industrial development, and e-commerce. We endeavor to meet the different needs of our esteemed clientele by emphasizing integration and complete solutions.\n\nAt Construction Materials Group, we pride ourselves on our commitment to sustainability and environmental stewardship. We actively engage in sourcing materials from sustainable and eco-friendly sources, aligning our operations with responsible practices. By doing so, we ensure that our clients receive not only superior services but also contribute to a greener future.\n\nOur continuous commitment is to provide great service and to set new standards in the Nepalese market. We cherish our consumers and put their satisfaction first and foremost. We strive to establish ourselves as an industry leader by continually exceeding expectations in all aspects of our business through our unwavering pursuit of excellence.\n\nWe gladly invite you to join us on this extraordinary adventure as we work to reinvent the construction business, one project at a time.",
}

export const DIRECTORS: DirectorEntry[] = [
  {
    name: 'Ms. Rima Lamichhane',
    title: 'Director',
    company: 'CMS Group',
    order: 1,
    photo: '/images/leadership/rima-lamichhane.jpg',
    summary:
      'Champions client satisfaction and personalised solutions through cutting-edge technologies and trusted, collaborative partnerships.',
    bio: "At Construction Materials Group, client satisfaction is our top priority. We are deeply committed to providing the best level of service, quality, and dependability. We personalize solutions to our clients' specific demands by obtaining superior materials and utilizing competent personnel. Our inventive approach embraces cutting-edge technologies, ensuring cutting-edge solutions. Our long-term success is driven by the development of trusting and collaborative partnerships.",
  },
  {
    name: 'Mr. Sandeep Goenka',
    title: 'Director',
    company: 'CMS Group',
    order: 2,
    photo: '/images/leadership/sandeep-goenka.jpg',
    summary:
      "Leads the group's product strategy that blends innovation and environmental sustainability with conventional building offerings.",
    bio: 'At Construction Materials Group, our aim is to offer a comprehensive range of products that blend innovation and environmental sustainability with conventional offerings, while keeping up with worldwide improvements. We are really appreciative of our respected clients and important stakeholders and their continuous support. Rest assured that we are totally committed to offering exceptional services and products of the highest quality. Our first goal is client happiness, and we constantly aim to surpass expectations while contributing to a more sustainable future.',
  },
  {
    name: 'Mr. Sumit Agarwal',
    title: 'Director',
    company: 'CMS Group',
    order: 3,
    photo: '/images/leadership/sumit-agarwal.jpg',
    summary:
      "Builds the group's competitive edge through state-of-the-art technologies and pioneering construction concepts.",
    bio: 'By offering a diverse range of products that incorporate state-of-the-art technologies and pioneering construction concepts, our company has effectively established a competitive edge in a dynamic market environment. This success can be attributed to the persistent commitment of our excellent team members and the priceless assistance of our prestigious international business partners. I sincerely thank all stakeholders for their confidence in us as we continue to rise and strive for excellence. This has allowed us to significantly contribute to the construction industry.',
  },
  {
    name: 'Mr. Sanjeev Goyal',
    title: 'Director',
    company: 'CMS Group',
    order: 4,
    photo: '/images/leadership/sanjeev-goyal.jpg',
    summary:
      "Two decades of pursuit of excellence — guides CMS Group's evolution from material supplier to a diversified materials & services business.",
    bio: 'Throughout the past two decades, CMS Group has earned a distinguished reputation within the construction industry through its tireless dedication and relentless pursuit of excellence. Our modest beginnings as construction material suppliers have evolved into a varied portfolio that now includes both the service and construction materials businesses. This growth demonstrates the steady development of CMS Group as we work to expand our reach and horizons while maintaining our everlasting commitment to providing unmatched quality and service.',
  },
  {
    name: 'Mr. Kumud Nepal',
    title: 'Director',
    company: 'CMS Group',
    order: 5,
    photo: '/images/leadership/kumud-nepal.jpg',
    summary:
      'Curates the comprehensive product portfolio that makes CMS the one-stop finishing solution for hotels, hospitals, malls, and government buildings.',
    bio: "CMS has been meticulously crafted to serve as a comprehensive supplier of reliable and high-quality branded products, offering a convenient one-stop solution. We efficiently save customers' time by streamlining the buying process and reducing the need for them to seek different locations. Our extensive product and solution offering has been carefully curated to meet a wide range of finishing requirements in a variety of building constructions, including hotels, resorts, hospitals, business complexes, shopping malls, government buildings, and a wide range of residential projects. We endeavor to address the different demands of our clients across the construction sector with our products.",
  },
  {
    name: 'Mr. Ram Dahal',
    title: 'Director',
    company: 'Techwood Pvt. Ltd.',
    order: 6,
    photo: '/images/leadership/ram-dahal.jpg',
    summary:
      'Director of Techwood Pvt. Ltd. — leads the modular furniture venture serving corporate offices and educational institutions across Nepal.',
    bio: 'Techwood Pvt. Ltd takes this opportunity to thank our valued customers for their continued patronage & confidence in our products, services and dedication. It inspires us to do and give more and improve more in our facilities. I, therefore, seek continued support & trust from our valued clients & their team. Lastly, I would like to express my cordial gratitude to all our well-wishers, and our hardworking team has always been the pillar of our strength to overcome the odds and shine bright.',
  },
]

export const LEADERSHIP: DirectorEntry[] = [CHAIRMAN, ...DIRECTORS]
