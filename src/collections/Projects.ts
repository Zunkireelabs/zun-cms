import type { CollectionConfig } from 'payload'
import { afterChangeRevalidate, afterDeleteRevalidate } from '../hooks/revalidate'

export const Projects: CollectionConfig = {
  slug: 'projects',
  access: { read: () => true },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'client', 'year', 'type', 'featured'],
  },
  hooks: {
    afterChange: [afterChangeRevalidate('projects')],
    afterDelete: [afterDeleteRevalidate('projects')],
  },
  fields: [
    {
      // Hidden helper: when the form opens with ?location=... in the URL,
      // pre-fills the location field. Used by the "Add Project Here"
      // button on the MapLocation form.
      name: 'locationPrefill',
      type: 'ui',
      admin: {
        components: {
          Field: '/src/admin/ProjectLocationPrefill',
        },
      },
    },
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'client', type: 'text', required: true },
    { name: 'location', type: 'text', required: true },
    { name: 'year', type: 'number', required: true },
    {
      name: 'type',
      type: 'select',
      options: ['commercial', 'residential'],
      required: true,
    },
    {
      name: 'sector',
      type: 'select',
      options: ['healthcare', 'education', 'airports', 'office', 'hospitality', 'industrial'],
    },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'scope',
      type: 'array',
      fields: [
        { name: 'value', type: 'text', required: true },
      ],
    },
    { name: 'area', type: 'text' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'featured', type: 'checkbox', defaultValue: false },
  ],
}
