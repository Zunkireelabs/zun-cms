import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

export const afterChangeRevalidate: (collection: string) => CollectionAfterChangeHook =
  (collection) => async ({ doc }) => {
    const url = process.env.REVALIDATE_URL
    const secret = process.env.REVALIDATE_SECRET
    if (!url || !secret) return doc
    try {
      await fetch(`${url}/api/revalidate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${secret}` },
        body: JSON.stringify({ collection, slug: doc.slug ?? doc.id }),
      })
    } catch (_) {
      // non-blocking — never fail a save because of revalidation
    }
    return doc
  }

export const afterDeleteRevalidate: (collection: string) => CollectionAfterDeleteHook =
  (collection) => async ({ doc }) => {
    const url = process.env.REVALIDATE_URL
    const secret = process.env.REVALIDATE_SECRET
    if (!url || !secret) return
    try {
      await fetch(`${url}/api/revalidate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${secret}` },
        body: JSON.stringify({ collection, slug: doc.slug ?? doc.id, deleted: true }),
      })
    } catch (_) {
      // non-blocking
    }
  }
