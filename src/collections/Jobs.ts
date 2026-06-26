import type { CollectionConfig } from 'payload'
import { afterChangeRevalidate, afterDeleteRevalidate } from '../hooks/revalidate'

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  access: { read: () => true },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'location', 'type', 'active', 'postedAt'],
  },
  hooks: {
    afterChange: [afterChangeRevalidate('jobs')],
    afterDelete: [afterDeleteRevalidate('jobs')],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'location', type: 'text', required: true },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'full-time',
      options: ['full-time', 'part-time', 'contract', 'internship'],
    },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'responsibilities',
      type: 'array',
      fields: [{ name: 'item', type: 'text', required: true }],
    },
    { name: 'postedAt', type: 'date', required: true },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Uncheck to hide this listing on the website without deleting the doc.' },
    },
  ],
}
