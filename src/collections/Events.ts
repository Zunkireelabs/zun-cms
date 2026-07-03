import type { CollectionConfig } from 'payload'
import { afterChangeRevalidate, afterDeleteRevalidate } from '../hooks/revalidate'

export const Events: CollectionConfig = {
  slug: 'events',
  access: { read: () => true },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'year', 'featured'],
    hidden: true,
  },
  hooks: {
    afterChange: [afterChangeRevalidate('events')],
    afterDelete: [afterDeleteRevalidate('events')],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'month', type: 'text', required: true },
    { name: 'year', type: 'number', required: true },
    { name: 'date', type: 'text', required: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: ['training', 'partnership', 'csr', 'trade-show', 'internal', 'milestone'],
    },
    { name: 'description', type: 'textarea', required: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'featured', type: 'checkbox', defaultValue: false },
  ],
}
