#!/usr/bin/env node
// Fails the build if a collection declares a raw `slug` text field instead of
// using slugField() from src/fields/slug.ts. ProductDomains shipped a free-text
// slug and an editor saved "water-&-wastewater-solutions" (2026-07) — `&` is the
// URL query delimiter, so the listing linked to a page that could never route
// and /trading/<slug> 404'd. slugField() validates the shape and auto-derives
// from the title, so the bad value can't be created. This check exists so the
// next new collection can't silently repeat that bug.
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const DIR = 'src/collections'
// Collections with no public URL of their own — nothing routes on their slug.
const EXEMPT = new Set(['Users.ts', 'Media.ts'])

// Matches a hand-rolled slug field: `name: 'slug'` inside a field object
// literal, rather than the shared slugField() helper.
const RAW_SLUG_FIELD = /name:\s*['"]slug['"]/

const offenders = []

for (const file of readdirSync(DIR)) {
  if (!file.endsWith('.ts') || EXEMPT.has(file)) continue
  const contents = readFileSync(join(DIR, file), 'utf8')
  if (!RAW_SLUG_FIELD.test(contents)) continue
  // `slug: 'product-domains'` (the collection's own key) is not a field —
  // only flag when the file declares a slug *field* without the helper.
  if (contents.includes('slugField(')) continue
  offenders.push(`${DIR}/${file}`)
}

if (offenders.length > 0) {
  console.error('Raw slug field(s) found — use slugField() instead:\n')
  offenders.forEach((o) => console.error(`  - ${o}`))
  console.error(
    '\nA free-text slug lets an editor save characters that are reserved in a URL ' +
      '(& ? # space), which produces a page that links correctly but 404s on open. ' +
      "Replace the field with slugField() from src/fields/slug.ts — pass the source " +
      "field to derive from, e.g. slugField('name') — see ProductDomains.ts for the pattern.",
  )
  process.exit(1)
}

console.log('OK: all collections use slugField() for their slug.')
