import type { CollectionConfig } from 'payload'
import { afterChangeRevalidate, afterDeleteRevalidate } from '../hooks/revalidate'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'client',
    defaultColumns: ['client', 'clientType', 'deliveredBy', 'date'],
  },
  hooks: {
    afterChange: [afterChangeRevalidate('testimonials')],
    afterDelete: [afterDeleteRevalidate('testimonials')],
  },
  fields: [
    { name: 'client', type: 'text', required: true },
    {
      name: 'clientType',
      type: 'select',
      required: true,
      options: ['hotel', 'hospital', 'construction', 'architecture', 'industrial', 'government', 'international', 'residential'],
    },
    { name: 'date', type: 'text', required: true },
    {
      name: 'deliveredBy',
      type: 'select',
      required: true,
      options: ['cubic-meter', 'baba-muktinath', '4r-technologies', 'green-building-technologies', 'cms-group'],
    },
    { name: 'subject', type: 'text', required: true },
    {
      name: 'scope',
      type: 'array',
      fields: [
        { name: 'value', type: 'text', required: true },
      ],
    },
    { name: 'project', type: 'text' },
    { name: 'location', type: 'text' },
    { name: 'scanImage', type: 'upload', relationTo: 'media' },
  ],
}
