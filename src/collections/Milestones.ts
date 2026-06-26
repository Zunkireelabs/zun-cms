import type { CollectionConfig } from 'payload'
import { afterChangeRevalidate, afterDeleteRevalidate } from '../hooks/revalidate'

export const Milestones: CollectionConfig = {
  slug: 'milestones',
  access: { read: () => true },
  admin: {
    useAsTitle: 'venture',
    defaultColumns: ['year', 'venture'],
  },
  hooks: {
    afterChange: [afterChangeRevalidate('milestones')],
    afterDelete: [afterDeleteRevalidate('milestones')],
  },
  fields: [
    { name: 'year', type: 'number', required: true },
    { name: 'venture', type: 'text', required: true },
    { name: 'title', type: 'text' },
    { name: 'description', type: 'text', required: true },
    {
      name: 'icon',
      type: 'select',
      admin: { description: 'Lucide icon name shown next to the milestone year on the website.' },
      options: [
        'Sparkles', 'Bath', 'Wrench', 'Recycle', 'Armchair',
        'Award', 'Trophy', 'Building2', 'Briefcase',
      ],
    },
    {
      name: 'brands',
      type: 'array',
      admin: { description: 'Brands surfaced as pills under this milestone.' },
      fields: [{ name: 'name', type: 'text', required: true }],
    },
    { name: 'logo', type: 'upload', relationTo: 'media' },
  ],
}
