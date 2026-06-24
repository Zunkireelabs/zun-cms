import type { CollectionConfig } from 'payload'
import { afterChangeRevalidate, afterDeleteRevalidate } from '../hooks/revalidate'

export const Brands: CollectionConfig = {
  slug: 'brands',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'venture', 'country'],
  },
  hooks: {
    afterChange: [afterChangeRevalidate('brands')],
    afterDelete: [afterDeleteRevalidate('brands')],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'country', type: 'text', required: true },
    { name: 'founded', type: 'number' },
    {
      name: 'segments',
      type: 'array',
      admin: { description: 'Product categories' },
      fields: [
        { name: 'value', type: 'text', required: true },
      ],
    },
    { name: 'description', type: 'textarea', required: true },
    { name: 'website', type: 'text' },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    {
      name: 'venture',
      type: 'relationship',
      relationTo: 'ventures',
      required: true,
    },
    {
      name: 'tradingDomains',
      type: 'relationship',
      relationTo: 'product-domains',
      hasMany: true,
    },
  ],
}
