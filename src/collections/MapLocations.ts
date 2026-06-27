import type { CollectionConfig } from 'payload'
import { afterChangeRevalidate, afterDeleteRevalidate } from '../hooks/revalidate'

export const MapLocations: CollectionConfig = {
  slug: 'map-locations',
  access: { read: () => true },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'markerX', 'markerY', 'direction'],
    description:
      'Pin coordinates for the Nepal project map on the home page. Each project whose `location` matches a name here (or any of the keywords) is shown at the marker.',
  },
  hooks: {
    afterChange: [afterChangeRevalidate('map-locations')],
    afterDelete: [afterDeleteRevalidate('map-locations')],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'Exact match for the Project.location field, e.g. "Kathmandu, Nepal".' },
    },
    {
      name: 'markerX',
      type: 'number',
      required: true,
      admin: { description: 'SVG x coord of the pin dot (0–1000 range).' },
    },
    {
      name: 'markerY',
      type: 'number',
      required: true,
      admin: { description: 'SVG y coord of the pin dot.' },
    },
    {
      name: 'labelX',
      type: 'number',
      required: true,
      admin: { description: 'SVG x coord where the label text starts.' },
    },
    {
      name: 'labelY',
      type: 'number',
      required: true,
      admin: { description: 'SVG y coord of the label text baseline.' },
    },
    {
      name: 'direction',
      type: 'select',
      required: true,
      defaultValue: 'up',
      options: [
        { value: 'up', label: 'Up (label above marker)' },
        { value: 'down', label: 'Down (label below marker)' },
      ],
      admin: { description: 'Which way the elbow connector bends.' },
    },
    {
      name: 'keywords',
      type: 'array',
      admin: {
        description:
          'Lowercase substrings that should also resolve to this location. e.g. "lumbini" → Bhairahawa.',
      },
      fields: [{ name: 'value', type: 'text', required: true }],
    },
  ],
}
