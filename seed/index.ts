import { getPayload } from 'payload'
import config from '@payload-config'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'
import 'dotenv/config'

// Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Source data
import { VENTURES } from './sources/ventures.js'
import { SECTORS } from './sources/sectors.js'
import { BRANDS } from './sources/brands.js'
import { PRODUCT_DOMAIN_META } from './sources/products.js'
import { PROJECTS } from './sources/projects.js'
import { LEADERSHIP } from './sources/leadership.js'
import { TESTIMONIALS } from './sources/testimonials.js'
import { EVENTS } from './sources/events.js'
import { CERTIFICATIONS } from './sources/certifications.js'
import { MILESTONES } from './sources/milestones.js'

const IMAGES_DIR = path.resolve(__dirname, 'sources/images')

// ─── Helpers ────────────────────────────────────────────────────────────────

function walkDir(dir: string): string[] {
  if (!fs.existsSync(dir)) return []
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const files: string[] = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...walkDir(full))
    else if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(entry.name)) files.push(full)
  }
  return files
}

function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase()
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg'
  if (ext === '.png') return 'image/png'
  if (ext === '.gif') return 'image/gif'
  if (ext === '.webp') return 'image/webp'
  if (ext === '.svg') return 'image/svg+xml'
  return 'image/jpeg'
}

// Track errors across all phases
let errorCount = 0

async function uploadMedia(
  payload: Awaited<ReturnType<typeof getPayload>>,
  imagePath: string, // e.g. '/images/projects/bir-hospital.jpg'
  alt: string,
): Promise<number | null> {
  const fullPath = path.join(IMAGES_DIR, imagePath.replace('/images/', ''))
  if (!fs.existsSync(fullPath)) {
    console.log(`  [skip] Image not found: ${fullPath}`)
    return null
  }

  const filename = path.basename(fullPath)

  // Check if already uploaded
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
  })
  if (existing.docs.length > 0) {
    return existing.docs[0].id as number
  }

  const buffer = fs.readFileSync(fullPath)
  const mimeType = getMimeType(fullPath)

  try {
    const doc = await payload.create({
      collection: 'media',
      data: { alt },
      file: {
        data: buffer,
        mimetype: mimeType,
        name: filename,
        size: buffer.length,
      },
    })
    return doc.id as number
  } catch (err) {
    console.error(`  [error] Failed to upload ${filename}:`, err)
    errorCount++
    return null
  }
}

// ─── Step 1: Admin user ─────────────────────────────────────────────────────

async function seedAdminUser(payload: Awaited<ReturnType<typeof getPayload>>) {
  console.log('\nSeeding admin user...')
  try {
    const existing = await payload.find({ collection: 'users', limit: 1 })
    if (existing.docs.length > 0) {
      console.log('  [skip] Admin user already exists')
      return
    }
    const email = process.env.SEED_ADMIN_EMAIL
    const password = process.env.SEED_ADMIN_PASSWORD
    if (!email || !password) {
      throw new Error('SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD env vars are required to seed the admin user')
    }
    await payload.create({
      collection: 'users',
      data: { email, password },
    })
    console.log(`  Created admin user: ${email}`)
  } catch (err) {
    console.error('  [error] Failed to create admin user:', err)
    errorCount++
  }
}

// ─── Step 2: Media upload ───────────────────────────────────────────────────

async function seedMedia(
  payload: Awaited<ReturnType<typeof getPayload>>,
): Promise<Map<string, number>> {
  console.log('\nUploading media files...')
  const map = new Map<string, number>()
  const imageFiles = walkDir(IMAGES_DIR)

  if (imageFiles.length === 0) {
    console.log('  [warn] No images found in', IMAGES_DIR)
    return map
  }

  console.log(`  Found ${imageFiles.length} image files`)

  for (const fullPath of imageFiles) {
    const relPath = '/images/' + path.relative(IMAGES_DIR, fullPath)
    const altName = path.basename(fullPath, path.extname(fullPath))
    const mediaId = await uploadMedia(payload, relPath, altName)
    if (mediaId !== null) {
      map.set(relPath, mediaId)
    }
  }

  console.log(`  Uploaded/found ${map.size} media documents`)
  return map
}

// ─── Step 3: Ventures ───────────────────────────────────────────────────────

async function seedVentures(
  payload: Awaited<ReturnType<typeof getPayload>>,
  mediaMap: Map<string, number>,
): Promise<Map<string, number>> {
  console.log('\nSeeding ventures...')
  const ventureMap = new Map<string, number>()
  let created = 0
  let skipped = 0

  for (const venture of VENTURES) {
    try {
      const existing = await payload.find({
        collection: 'ventures',
        where: { slug: { equals: venture.slug } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log(`  [skip] ${venture.slug}`)
        ventureMap.set(venture.slug, existing.docs[0].id as number)
        skipped++
        continue
      }

      // Resolve products with images
      const products = venture.products.map((p) => {
        const result: { name: string; image?: number } = { name: p.name }
        if (p.image) {
          const mediaId = mediaMap.get(p.image)
          if (mediaId !== undefined) result.image = mediaId
        }
        return result
      })

      const doc = await payload.create({
        collection: 'ventures',
        data: {
          name: venture.name,
          shortName: venture.shortName,
          slug: venture.slug,
          founded: venture.founded,
          tagline: venture.tagline,
          description: venture.description,
          products,
        },
      })

      ventureMap.set(venture.slug, doc.id as number)
      console.log(`  Created venture: ${venture.name}`)
      created++
    } catch (err) {
      console.error(`  [error] Failed to create venture ${venture.slug}:`, err)
      errorCount++
    }
  }

  console.log(`  ✓ ventures: ${created} created, ${skipped} skipped`)
  return ventureMap
}

// ─── Step 4: Product Domains ────────────────────────────────────────────────

async function seedProductDomains(
  payload: Awaited<ReturnType<typeof getPayload>>,
  mediaMap: Map<string, number>,
): Promise<Map<string, number>> {
  console.log('\nSeeding product domains...')
  const domainMap = new Map<string, number>()
  let created = 0
  let skipped = 0

  for (const domain of PRODUCT_DOMAIN_META) {
    try {
      const existing = await payload.find({
        collection: 'product-domains',
        where: { slug: { equals: domain.slug } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log(`  [skip] ${domain.slug}`)
        domainMap.set(domain.slug, existing.docs[0].id as number)
        skipped++
        continue
      }

      // Resolve image
      let imageId: number | undefined = undefined
      let externalImageUrl: string | undefined = undefined

      if (domain.image.startsWith('http')) {
        externalImageUrl = domain.image
      } else {
        const mediaId = mediaMap.get(domain.image)
        if (mediaId !== undefined) imageId = mediaId
      }

      const projectKeywords = domain.projectKeywords
        ? domain.projectKeywords.map((kw) => ({ value: kw }))
        : undefined

      const doc = await payload.create({
        collection: 'product-domains',
        data: {
          slug: domain.slug,
          title: domain.title,
          description: domain.description,
          ...(imageId !== undefined ? { image: imageId } : {}),
          ...(externalImageUrl ? { externalImageUrl } : {}),
          ...(domain.imagePosition ? { imagePosition: domain.imagePosition } : {}),
          ...(projectKeywords ? { projectKeywords } : {}),
        },
      })

      domainMap.set(domain.slug, doc.id as number)
      console.log(`  Created domain: ${domain.title}`)
      created++
    } catch (err) {
      console.error(`  [error] Failed to create domain ${domain.slug}:`, err)
      errorCount++
    }
  }

  console.log(`  ✓ product-domains: ${created} created, ${skipped} skipped`)
  return domainMap
}

// ─── Step 5: Sectors ────────────────────────────────────────────────────────

async function seedSectors(payload: Awaited<ReturnType<typeof getPayload>>) {
  console.log('\nSeeding sectors...')
  let created = 0
  let skipped = 0

  for (const sector of SECTORS) {
    try {
      const existing = await payload.find({
        collection: 'sectors',
        where: { slug: { equals: sector.slug } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log(`  [skip] ${sector.slug}`)
        skipped++
        continue
      }

      await payload.create({
        collection: 'sectors',
        data: {
          name: sector.name,
          slug: sector.slug,
          icon: sector.icon,
          summary: sector.summary,
          description: sector.description,
        },
      })
      console.log(`  Created sector: ${sector.name}`)
      created++
    } catch (err) {
      console.error(`  [error] Failed to create sector ${sector.slug}:`, err)
      errorCount++
    }
  }

  console.log(`  ✓ sectors: ${created} created, ${skipped} skipped`)
}

// ─── Step 6: Leadership ─────────────────────────────────────────────────────

async function seedLeadership(
  payload: Awaited<ReturnType<typeof getPayload>>,
  mediaMap: Map<string, number>,
) {
  console.log('\nSeeding leadership...')
  let created = 0
  let skipped = 0

  for (const person of LEADERSHIP) {
    try {
      // Check by name (unique natural key)
      const existing = await payload.find({
        collection: 'leadership',
        where: { name: { equals: person.name } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log(`  [skip] ${person.name}`)
        skipped++
        continue
      }

      let photoId: number | undefined = undefined
      if (person.photo) {
        const mediaId = mediaMap.get(person.photo)
        if (mediaId !== undefined) photoId = mediaId
      }

      await payload.create({
        collection: 'leadership',
        data: {
          name: person.name,
          title: person.title,
          company: person.company,
          bio: person.bio,
          summary: person.summary,
          order: person.order,
          ...(photoId !== undefined ? { photo: photoId } : {}),
        },
      })
      console.log(`  Created leader: ${person.name}`)
      created++
    } catch (err) {
      console.error(`  [error] Failed to create leader ${person.name}:`, err)
      errorCount++
    }
  }

  console.log(`  ✓ leadership: ${created} created, ${skipped} skipped`)
}

// ─── Step 7: Events ─────────────────────────────────────────────────────────

async function seedEvents(
  payload: Awaited<ReturnType<typeof getPayload>>,
  mediaMap: Map<string, number>,
) {
  console.log('\nSeeding events...')
  let created = 0
  let skipped = 0

  for (const event of EVENTS) {
    try {
      const existing = await payload.find({
        collection: 'events',
        where: { slug: { equals: event.id } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log(`  [skip] ${event.id}`)
        skipped++
        continue
      }

      let imageId: number | undefined = undefined
      if (event.image) {
        const mediaId = mediaMap.get(event.image)
        if (mediaId !== undefined) imageId = mediaId
      }

      await payload.create({
        collection: 'events',
        data: {
          title: event.title,
          slug: event.id,
          month: event.month,
          year: event.year,
          date: event.date,
          category: event.category,
          description: event.description,
          featured: event.featured ?? false,
          ...(imageId !== undefined ? { image: imageId } : {}),
        },
      })
      console.log(`  Created event: ${event.title}`)
      created++
    } catch (err) {
      console.error(`  [error] Failed to create event ${event.id}:`, err)
      errorCount++
    }
  }

  console.log(`  ✓ events: ${created} created, ${skipped} skipped`)
}

// ─── Step 8: Certifications ─────────────────────────────────────────────────

async function seedCertifications(
  payload: Awaited<ReturnType<typeof getPayload>>,
  mediaMap: Map<string, number>,
) {
  console.log('\nSeeding certifications...')
  let created = 0
  let skipped = 0

  for (const cert of CERTIFICATIONS) {
    try {
      // Check by brand+type as unique key
      const existing = await payload.find({
        collection: 'certifications',
        where: {
          and: [
            { brand: { equals: cert.brand } },
            { type: { equals: cert.type } },
          ],
        },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log(`  [skip] ${cert.brand} — ${cert.type}`)
        skipped++
        continue
      }

      let scanImageId: number | undefined = undefined
      if (cert.scanImage) {
        const mediaId = mediaMap.get(cert.scanImage)
        if (mediaId !== undefined) scanImageId = mediaId
      }

      await payload.create({
        collection: 'certifications',
        data: {
          brand: cert.brand,
          type: cert.type,
          holder: cert.holder,
          holderVenture: cert.holderVenture,
          scope: cert.scope,
          country: cert.country,
          issued: cert.issued,
          validFrom: cert.validFrom,
          validUntil: cert.validUntil,
          ...(scanImageId !== undefined ? { scanImage: scanImageId } : {}),
        },
      })
      console.log(`  Created cert: ${cert.brand}`)
      created++
    } catch (err) {
      console.error(`  [error] Failed to create cert ${cert.id}:`, err)
      errorCount++
    }
  }

  console.log(`  ✓ certifications: ${created} created, ${skipped} skipped`)
}

// ─── Step 9: Milestones ─────────────────────────────────────────────────────

async function seedMilestones(payload: Awaited<ReturnType<typeof getPayload>>) {
  console.log('\nSeeding milestones...')
  let created = 0
  let skipped = 0

  for (const milestone of MILESTONES) {
    try {
      // Check by year+venture
      const existing = await payload.find({
        collection: 'milestones',
        where: {
          and: [
            { year: { equals: milestone.year } },
            { venture: { equals: milestone.venture } },
          ],
        },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log(`  [skip] ${milestone.year} — ${milestone.venture}`)
        skipped++
        continue
      }

      await payload.create({
        collection: 'milestones',
        data: {
          year: milestone.year,
          venture: milestone.venture,
          description: milestone.description,
        },
      })
      console.log(`  Created milestone: ${milestone.year} — ${milestone.venture}`)
      created++
    } catch (err) {
      console.error(`  [error] Failed to create milestone ${milestone.year}:`, err)
      errorCount++
    }
  }

  console.log(`  ✓ milestones: ${created} created, ${skipped} skipped`)
}

// ─── Step 10: Brands ────────────────────────────────────────────────────────

async function seedBrands(
  payload: Awaited<ReturnType<typeof getPayload>>,
  mediaMap: Map<string, number>,
  ventureMap: Map<string, number>,
  domainMap: Map<string, number>,
) {
  console.log('\nSeeding brands...')
  let created = 0
  let skipped = 0

  for (const brand of BRANDS) {
    try {
      const existing = await payload.find({
        collection: 'brands',
        where: { slug: { equals: brand.slug } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log(`  [skip] ${brand.slug}`)
        skipped++
        continue
      }

      // Resolve venture
      const ventureId = ventureMap.get(brand.venture)
      if (ventureId === undefined) {
        console.error(`  [error] Venture not found for brand ${brand.slug}: ${brand.venture}`)
        errorCount++
        continue
      }

      // Resolve trading domains
      const tradingDomainIds: number[] = []
      if (brand.tradingDomains) {
        for (const domainSlug of brand.tradingDomains) {
          const domainId = domainMap.get(domainSlug)
          if (domainId !== undefined) tradingDomainIds.push(domainId)
          else console.log(`  [warn] Domain not found: ${domainSlug} for brand ${brand.slug}`)
        }
      }

      // Resolve logo
      let logoId: number | undefined = undefined
      if (brand.logoUrl) {
        const mediaId = mediaMap.get(brand.logoUrl)
        if (mediaId !== undefined) logoId = mediaId
      }

      // Segments as array fields
      const segments = brand.segments.map((s) => ({ value: s }))

      await payload.create({
        collection: 'brands',
        data: {
          name: brand.name,
          slug: brand.slug,
          country: brand.country,
          ...(brand.founded ? { founded: brand.founded } : {}),
          segments,
          description: brand.description,
          website: brand.website,
          venture: ventureId,
          ...(tradingDomainIds.length > 0 ? { tradingDomains: tradingDomainIds } : {}),
          ...(logoId !== undefined ? { logo: logoId } : {}),
        },
      })
      console.log(`  Created brand: ${brand.name}`)
      created++
    } catch (err) {
      console.error(`  [error] Failed to create brand ${brand.slug}:`, err)
      errorCount++
    }
  }

  console.log(`  ✓ brands: ${created} created, ${skipped} skipped`)
}

// ─── Step 11: Projects ──────────────────────────────────────────────────────

async function seedProjects(
  payload: Awaited<ReturnType<typeof getPayload>>,
  mediaMap: Map<string, number>,
) {
  console.log('\nSeeding projects...')
  let created = 0
  let skipped = 0

  for (const project of PROJECTS) {
    try {
      const existing = await payload.find({
        collection: 'projects',
        where: { slug: { equals: project.id } },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log(`  [skip] ${project.id}`)
        skipped++
        continue
      }

      let imageId: number | undefined = undefined
      if (project.image) {
        const mediaId = mediaMap.get(project.image)
        if (mediaId !== undefined) imageId = mediaId
      }

      const scope = project.scope.map((s) => ({ value: s }))

      await payload.create({
        collection: 'projects',
        data: {
          title: project.title,
          slug: project.id,
          client: project.client,
          location: project.location,
          year: project.year,
          type: project.type,
          sector: project.sector,
          description: project.description,
          scope,
          area: project.area,
          featured: project.featured ?? false,
          ...(imageId !== undefined ? { image: imageId } : {}),
        },
      })
      console.log(`  Created project: ${project.title}`)
      created++
    } catch (err) {
      console.error(`  [error] Failed to create project ${project.id}:`, err)
      errorCount++
    }
  }

  console.log(`  ✓ projects: ${created} created, ${skipped} skipped`)
}

// ─── Step 12: Testimonials ──────────────────────────────────────────────────

async function seedTestimonials(
  payload: Awaited<ReturnType<typeof getPayload>>,
  mediaMap: Map<string, number>,
) {
  console.log('\nSeeding testimonials...')
  let created = 0
  let skipped = 0

  for (const testimonial of TESTIMONIALS) {
    try {
      // Check by client+date as unique key
      const existing = await payload.find({
        collection: 'testimonials',
        where: {
          and: [
            { client: { equals: testimonial.client } },
            { date: { equals: testimonial.date } },
          ],
        },
        limit: 1,
      })

      if (existing.docs.length > 0) {
        console.log(`  [skip] ${testimonial.id}`)
        skipped++
        continue
      }

      let scanImageId: number | undefined = undefined
      if (testimonial.scanImage) {
        const mediaId = mediaMap.get(testimonial.scanImage)
        if (mediaId !== undefined) scanImageId = mediaId
      }

      const scope = testimonial.scope.map((s) => ({ value: s }))

      await payload.create({
        collection: 'testimonials',
        data: {
          client: testimonial.client,
          clientType: testimonial.clientType,
          date: testimonial.date,
          deliveredBy: testimonial.deliveredBy,
          subject: testimonial.subject,
          scope,
          project: testimonial.project,
          location: testimonial.location,
          ...(scanImageId !== undefined ? { scanImage: scanImageId } : {}),
        },
      })
      console.log(`  Created testimonial: ${testimonial.id}`)
      created++
    } catch (err) {
      console.error(`  [error] Failed to create testimonial ${testimonial.id}:`, err)
      errorCount++
    }
  }

  console.log(`  ✓ testimonials: ${created} created, ${skipped} skipped`)
}

// ─── Step 13: SiteConfig global ─────────────────────────────────────────────

async function seedSiteConfig(payload: Awaited<ReturnType<typeof getPayload>>) {
  console.log('\nSeeding site config...')
  try {
    await payload.updateGlobal({
      slug: 'site-config',
      data: {
        name: 'Construction Materials Group',
        shortName: 'CMS Group',
        legalName: 'Construction Materials Group Pvt. Ltd.',
        tagline: 'Building Nepal, One Project at a Time',
        description: "Nepal's leading construction materials trading and contracting group",
        url: 'https://cms-dev.zunkireelabs.com',
        phone: '+977-1-4101234',
        email: 'info@cmsgroup.com.np',
        address: {
          street: 'Naxal',
          city: 'Kathmandu',
          country: 'Nepal',
          postal: '44600',
        },
      },
    })
    console.log('  SiteConfig updated')
  } catch (err) {
    console.error('  [error] Failed to update SiteConfig:', err)
    errorCount++
  }
}

// ─── Main seed function ─────────────────────────────────────────────────────

async function seed() {
  console.log('Starting CMS Group seed...')
  console.log('Images directory:', IMAGES_DIR)
  console.log('Images dir exists:', fs.existsSync(IMAGES_DIR))

  const payload = await getPayload({ config })

  // Step 1: Admin user
  await seedAdminUser(payload)

  // Step 2: Media upload
  const mediaMap = await seedMedia(payload)

  // Step 3: Ventures (Pass 1 — no deps)
  const ventureMap = await seedVentures(payload, mediaMap)

  // Step 4: Product domains (Pass 1 — no deps)
  const domainMap = await seedProductDomains(payload, mediaMap)

  // Step 5: Sectors (Pass 1 — no deps)
  await seedSectors(payload)

  // Step 6: Leadership (Pass 1 — no deps)
  await seedLeadership(payload, mediaMap)

  // Step 7: Events (Pass 1 — no deps)
  await seedEvents(payload, mediaMap)

  // Step 8: Certifications (Pass 1 — no deps)
  await seedCertifications(payload, mediaMap)

  // Step 9: Milestones (Pass 1 — no deps)
  await seedMilestones(payload)

  // Step 10: Brands (Pass 2 — depends on ventures + domains)
  await seedBrands(payload, mediaMap, ventureMap, domainMap)

  // Step 11: Projects (Pass 3 — depends on media only; sector is a select string)
  await seedProjects(payload, mediaMap)

  // Step 12: Testimonials (Pass 3 — depends on media only)
  await seedTestimonials(payload, mediaMap)

  // Step 13: SiteConfig global
  await seedSiteConfig(payload)

  // Print summary
  console.log('\n========== Seed Summary ==========')
  const counts = await Promise.all([
    payload.find({ collection: 'ventures', limit: 0 }),
    payload.find({ collection: 'product-domains', limit: 0 }),
    payload.find({ collection: 'sectors', limit: 0 }),
    payload.find({ collection: 'brands', limit: 0 }),
    payload.find({ collection: 'projects', limit: 0 }),
    payload.find({ collection: 'leadership', limit: 0 }),
    payload.find({ collection: 'testimonials', limit: 0 }),
    payload.find({ collection: 'events', limit: 0 }),
    payload.find({ collection: 'certifications', limit: 0 }),
    payload.find({ collection: 'milestones', limit: 0 }),
    payload.find({ collection: 'media', limit: 0 }),
  ])

  console.log(`  ventures:        ${counts[0].totalDocs}`)
  console.log(`  product-domains: ${counts[1].totalDocs}`)
  console.log(`  sectors:         ${counts[2].totalDocs}`)
  console.log(`  brands:          ${counts[3].totalDocs}`)
  console.log(`  projects:        ${counts[4].totalDocs}`)
  console.log(`  leadership:      ${counts[5].totalDocs}`)
  console.log(`  testimonials:    ${counts[6].totalDocs}`)
  console.log(`  events:          ${counts[7].totalDocs}`)
  console.log(`  certifications:  ${counts[8].totalDocs}`)
  console.log(`  milestones:      ${counts[9].totalDocs}`)
  console.log(`  media:           ${counts[10].totalDocs}`)
  console.log('==================================')

  if (errorCount > 0) {
    console.error(`\nSeed completed with ${errorCount} error(s). Check logs above.`)
    process.exit(1)
  } else {
    console.log('\nSeed complete!')
    process.exit(0)
  }
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
