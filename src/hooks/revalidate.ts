import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'

async function triggerRevalidate(body: Record<string, unknown>) {
  const url = process.env.REVALIDATE_URL
  const secret = process.env.REVALIDATE_SECRET
  if (!url || !secret) return
  try {
    await fetch(`${url}/api/revalidate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${secret}` },
      body: JSON.stringify(body),
    })
  } catch (_) {
    // non-blocking — never fail a save because of revalidation
  }
}

export const afterChangeRevalidate: (collection: string) => CollectionAfterChangeHook =
  (collection) => async ({ doc }) => {
    await triggerRevalidate({ collection, slug: doc.slug ?? doc.id })
    return doc
  }

export const afterDeleteRevalidate: (collection: string) => CollectionAfterDeleteHook =
  (collection) => async ({ doc }) => {
    await triggerRevalidate({ collection, slug: doc.slug ?? doc.id, deleted: true })
    return doc
  }

// Globals are singletons (site-wide settings) — no per-doc slug, no delete
// operation. Every field on a global can back multiple pages, so treat any
// change as "revalidate everything driven by this global."
export const afterChangeRevalidateGlobal: (global: string) => GlobalAfterChangeHook =
  (global) => async ({ doc }) => {
    await triggerRevalidate({ collection: global, slug: doc.slug ?? doc.id })
    return doc
  }
