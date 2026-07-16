import type { CollectionConfig } from 'payload'
import { afterChangeRevalidate, afterDeleteRevalidate } from '../hooks/revalidate'

export const Brands: CollectionConfig = {
  slug: 'brands',
  access: { read: () => true },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'venture', 'country'],
  },
  hooks: {
    afterChange: [afterChangeRevalidate('brands')],
    afterDelete: [afterDeleteRevalidate('brands')],
  },
  fields: [
    {
      // Hidden helper: when the form opens with ?tradingDomains=<id> in the
      // URL (from the "Add Brand Here" button on a ProductDomain), adds that
      // id to the tradingDomains relationship. No visible rendering.
      name: 'tradingDomainsPrefill',
      type: 'ui',
      admin: {
        components: {
          Field: '/src/admin/BrandTradingDomainPrefill',
        },
      },
    },
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
      name: 'brochures',
      type: 'array',
      admin: {
        description:
          'Add one entry per brochure. Each can have a PDF and/or an external link — add more if this brand has more than one.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          admin: { description: 'Optional — helps tell entries apart, e.g. "Catalogue 2026".' },
        },
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Upload a PDF — drives the "Download Brochure" button on the trading pages.',
          },
        },
        {
          name: 'url',
          type: 'text',
          admin: {
            description:
              'External link (flipbook / online viewer) — drives the "View Brochure" button. e.g. https://brand.com/catalogue.',
          },
        },
      ],
    },
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
