import type { CollectionConfig } from 'payload'
import { afterChangeRevalidate, afterDeleteRevalidate } from '../hooks/revalidate'

export const Certifications: CollectionConfig = {
  slug: 'certifications',
  access: { read: () => true },
  admin: {
    useAsTitle: 'brand',
    defaultColumns: ['brand', 'type', 'holder', 'holderVenture'],
  },
  hooks: {
    afterChange: [afterChangeRevalidate('certifications')],
    afterDelete: [afterDeleteRevalidate('certifications')],
  },
  fields: [
    { name: 'brand', type: 'text', required: true },
    { name: 'type', type: 'text', required: true },
    { name: 'holder', type: 'text', required: true },
    {
      name: 'holderVenture',
      type: 'select',
      options: ['cms-group', 'bath-n-room', 'baba-muktinath', '4r-technologies', 'cubic-meter', 'techwood', 'prime-ceramics', 'shree-swastik', 'green-building-technologies'],
    },
    { name: 'scope', type: 'textarea', required: true },
    { name: 'country', type: 'text' },
    { name: 'issued', type: 'text' },
    { name: 'validFrom', type: 'text' },
    { name: 'validUntil', type: 'text' },
    { name: 'scanImage', type: 'upload', relationTo: 'media' },
  ],
}
