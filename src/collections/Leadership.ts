import type { CollectionConfig } from 'payload'
import { afterChangeRevalidate, afterDeleteRevalidate } from '../hooks/revalidate'

export const Leadership: CollectionConfig = {
  slug: 'leadership',
  access: { read: () => true },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'title', 'order'],
    hidden: true,
  },
  hooks: {
    afterChange: [afterChangeRevalidate('leadership')],
    afterDelete: [afterDeleteRevalidate('leadership')],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'title', type: 'text', required: true },
    { name: 'company', type: 'text', required: true },
    { name: 'bio', type: 'textarea', required: true },
    { name: 'summary', type: 'text' },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    {
      name: 'order',
      type: 'number',
      required: true,
      admin: { description: 'Sort order; 0 = Chairman' },
    },
  ],
}
