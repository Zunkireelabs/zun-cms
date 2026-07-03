import type { CollectionConfig } from 'payload'
import { afterChangeRevalidate, afterDeleteRevalidate } from '../hooks/revalidate'

export const HeroSlides: CollectionConfig = {
  slug: 'hero-slides',
  access: { read: () => true },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['order', 'title', 'alt'],
    hidden: true,
  },
  hooks: {
    afterChange: [afterChangeRevalidate('hero-slides')],
    afterDelete: [afterDeleteRevalidate('hero-slides')],
  },
  fields: [
    { name: 'order', type: 'number', required: true, defaultValue: 0 },
    { name: 'title', type: 'text', required: true },
    { name: 'alt', type: 'text', required: true },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Still image shown when no video is provided.' },
    },
    {
      name: 'video',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional looping video — overrides image when present.' },
    },
  ],
}
