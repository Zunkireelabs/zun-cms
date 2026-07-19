import type { Field, FieldHook } from 'payload'

// Slugs become URL path segments on the website (e.g. /trading/<slug>). Any
// character that is reserved in a URL — `&` above all, which is the query
// delimiter — survives the CMS save but cannot survive routing, so the page
// 404s while the listing that links to it still looks fine. Enforce the safe
// shape here, at the only point where a slug is created.
export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export function slugify(input: string): string {
  return input
    .normalize('NFKD')
    // strip accents so "Façade" → "facade" rather than "faade"
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Derive from `sourceField` only when the editor left the slug blank; never
// overwrite a slug someone set deliberately, because changing it breaks every
// live URL pointing at that document.
const formatSlug =
  (sourceField: string): FieldHook =>
  ({ value, data, operation }) => {
    if (typeof value === 'string' && value.trim()) return slugify(value)
    if (operation === 'create' || operation === 'update') {
      const source = data?.[sourceField]
      if (typeof source === 'string' && source.trim()) return slugify(source)
    }
    return value
  }

/**
 * URL-safe slug field. `sourceField` is the field to auto-derive from when the
 * slug is left blank (usually 'title' or 'name').
 */
export const slugField = (sourceField = 'title', overrides: Partial<Field> = {}): Field =>
  ({
    name: 'slug',
    type: 'text',
    required: true,
    unique: true,
    hooks: { beforeValidate: [formatSlug(sourceField)] },
    validate: (value: unknown) => {
      if (typeof value !== 'string' || !value)
        return 'Slug is required.'
      if (!SLUG_PATTERN.test(value))
        return `"${value}" is not URL-safe. Use lowercase letters, numbers and single hyphens only (e.g. "water-wastewater-solutions"). Characters like & or spaces break the page URL.`
      return true
    },
    admin: {
      description: `URL-safe identifier — appears in the page address. Leave blank to generate it from ${sourceField}.`,
      ...(overrides.admin ?? {}),
    },
    ...overrides,
  }) as Field
