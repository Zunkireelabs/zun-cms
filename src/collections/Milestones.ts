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
    { name: 'description', type: 'text', required: true },
    { name: 'logo', type: 'upload', relationTo: 'media' },
  ],
}
