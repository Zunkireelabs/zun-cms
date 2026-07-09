import type { CollectionConfig } from 'payload'
import { afterChangeRevalidate, afterDeleteRevalidate } from '../hooks/revalidate'

export const Media: CollectionConfig = {
  slug: 'media',
  access: { read: () => true },
  admin: { useAsTitle: 'alt' },
  hooks: {
    afterChange: [afterChangeRevalidate('media')],
    afterDelete: [afterDeleteRevalidate('media')],
  },
  upload: {
    staticDir: 'public/media',
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 768, height: 512, position: 'centre' },
      { name: 'tablet', width: 1024 },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*', 'application/pdf', 'text/plain'],
  },
  fields: [
    { name: 'alt', type: 'text', required: true },
  ],
}
