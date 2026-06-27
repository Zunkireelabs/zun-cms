import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

// Collections
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Ventures } from './collections/Ventures'
import { Brands } from './collections/Brands'
import { ProductDomains } from './collections/ProductDomains'
import { Sectors } from './collections/Sectors'
import { Projects } from './collections/Projects'
import { Leadership } from './collections/Leadership'
import { Testimonials } from './collections/Testimonials'
import { Events } from './collections/Events'
import { Certifications } from './collections/Certifications'
import { Milestones } from './collections/Milestones'
import { HeroSlides } from './collections/HeroSlides'
import { Jobs } from './collections/Jobs'
import { MapLocations } from './collections/MapLocations'

// Globals
import { SiteConfig } from './globals/SiteConfig'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    meta: { titleSuffix: '— CMS Group Admin' },
    components: {
      providers: ['/src/admin/PasswordEyeToggle'],
    },
  },
  editor: lexicalEditor({}),
  collections: [
    Users,
    Media,
    Ventures,
    Brands,
    ProductDomains,
    Sectors,
    Projects,
    Leadership,
    Testimonials,
    Events,
    Certifications,
    Milestones,
    HeroSlides,
    Jobs,
    MapLocations,
  ],
  globals: [SiteConfig],
  secret: (() => {
    const secret = process.env.PAYLOAD_SECRET
    if (!secret && process.env.NODE_ENV === 'production') {
      throw new Error('PAYLOAD_SECRET env var is required in production')
    }
    return secret ?? 'dev-secret-change-me'
  })(),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI ?? 'postgresql://postgres:postgres@localhost:5432/zun_cms',
    },
    push: false,
  }),
})
