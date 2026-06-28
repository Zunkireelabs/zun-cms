import type { CollectionConfig } from 'payload'
import { afterChangeRevalidate, afterDeleteRevalidate } from '../hooks/revalidate'

export const ProductDomains: CollectionConfig = {
  slug: 'product-domains',
  access: { read: () => true },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
  },
  hooks: {
    afterChange: [afterChangeRevalidate('product-domains')],
    afterDelete: [afterDeleteRevalidate('product-domains')],
  },
  fields: [
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'externalImageUrl',
      type: 'text',
      admin: { description: 'For external image URLs (e.g. hunterdouglasgroup.com)' },
    },
    {
      name: 'imagePosition',
      type: 'select',
      options: ['object-center', 'object-top', 'object-bottom'],
      defaultValue: 'object-center',
    },
    {
      name: 'projectKeywords',
      type: 'array',
      fields: [
        { name: 'value', type: 'text', required: true },
      ],
    },

    // Drives the Domain Metrics strip on the home page.
    {
      name: 'installedAreaSqFt',
      type: 'number',
      admin: {
        description:
          'Marketing metric — square feet installed across this domain. Used on the home page Domain Metrics strip. Leave blank to hide.',
      },
    },
    {
      name: 'metricLabel',
      type: 'text',
      admin: {
        description:
          'Label shown next to the metric (e.g. "False Ceiling Installed", "Roofing Installed").',
      },
    },
    {
      // Inline panel listing every Brand tagged with this trading domain,
      // plus an "Add Brand Here" button that opens the brand create form
      // with this domain pre-selected.
      name: 'brandsInDomain',
      type: 'ui',
      admin: {
        components: {
          Field: '/src/admin/ProductDomainBrands',
        },
      },
    },
  ],
}
