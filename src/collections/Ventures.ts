import type { CollectionConfig } from 'payload'
import { afterChangeRevalidate, afterDeleteRevalidate } from '../hooks/revalidate'

export const Ventures: CollectionConfig = {
  slug: 'ventures',
  access: { read: () => true },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'shortName', 'founded'],
  },
  hooks: {
    afterChange: [afterChangeRevalidate('ventures')],
    afterDelete: [afterDeleteRevalidate('ventures')],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'shortName', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'URL-safe identifier' },
    },
    { name: 'founded', type: 'number', required: true },
    { name: 'tagline', type: 'text' },
    { name: 'description', type: 'textarea', required: true },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    {
      name: 'products',
      type: 'array',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'relatedBrands',
      type: 'join',
      collection: 'brands',
      on: 'venture',
    },
  ],
}
