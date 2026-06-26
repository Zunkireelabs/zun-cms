import type { CollectionConfig } from 'payload'
import { afterChangeRevalidate, afterDeleteRevalidate } from '../hooks/revalidate'

export const Sectors: CollectionConfig = {
  slug: 'sectors',
  access: { read: () => true },
  admin: {
    useAsTitle: 'name',
  },
  hooks: {
    afterChange: [afterChangeRevalidate('sectors')],
    afterDelete: [afterDeleteRevalidate('sectors')],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    {
      name: 'icon',
      type: 'text',
      required: true,
      admin: { description: "Lucide icon name (e.g. 'Building2', 'GraduationCap')" },
    },
    { name: 'summary', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
  ],
}
