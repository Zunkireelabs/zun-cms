#!/usr/bin/env node
// Fails the build if a public-facing collection/global doesn't wire up the
// site-revalidation hooks from src/hooks/revalidate.ts. Media.ts and
// SiteConfig.ts both shipped without them (2026-07) — edits sat on stale
// cache indefinitely instead of notifying the website. This check exists so
// the next new collection/global can't silently repeat that bug.
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

// Slugs that intentionally do NOT push site revalidation — internal-only,
// nothing here is rendered on the public website.
const EXEMPT_COLLECTIONS = new Set(['Users.ts'])

const CHECKS = [
  {
    dir: 'src/collections',
    requiredHooks: ['afterChangeRevalidate', 'afterDeleteRevalidate'],
    exempt: EXEMPT_COLLECTIONS,
  },
  {
    dir: 'src/globals',
    requiredHooks: ['afterChangeRevalidateGlobal'],
    exempt: new Set(),
  },
]

const missing = []

for (const { dir, requiredHooks, exempt } of CHECKS) {
  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.ts') || exempt.has(file)) continue
    const contents = readFileSync(join(dir, file), 'utf8')
    const missingHooks = requiredHooks.filter((hook) => !contents.includes(hook))
    if (missingHooks.length > 0) {
      missing.push(`${dir}/${file} — missing ${missingHooks.join(', ')}`)
    }
  }
}

if (missing.length > 0) {
  console.error('Missing site-revalidation hook wiring:\n')
  missing.forEach((m) => console.error(`  - ${m}`))
  console.error(
    '\nEvery public-facing collection/global must wire the revalidate hooks from ' +
      'src/hooks/revalidate.ts (see Brands.ts for the collection pattern, SiteConfig.ts for ' +
      'the global pattern), or be added to the exempt list in scripts/check-revalidate-hooks.mjs ' +
      'if it is intentionally internal-only and never rendered on the public website.',
  )
  process.exit(1)
}

console.log('OK: all collections/globals wire the site-revalidation hook.')
