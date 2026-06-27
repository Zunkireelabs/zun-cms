import type { CollectionConfig } from 'payload'
import { afterChangeRevalidate, afterDeleteRevalidate } from '../hooks/revalidate'

export const MapLocations: CollectionConfig = {
  slug: 'map-locations',
  access: { read: () => true },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'latitude', 'longitude', 'direction'],
    description:
      'Pin coordinates for the Nepal project map on the home page. Each project whose `location` matches a name here (or any of the keywords) is shown at the corresponding lat/lng. The website converts lat/lng to SVG coords automatically — the hand-drawn map is not a true projection, so pins land approximately (within ~50px of the true position) but obviously in the right region.',
  },
  hooks: {
    afterChange: [afterChangeRevalidate('map-locations')],
    afterDelete: [afterDeleteRevalidate('map-locations')],
  },
  fields: [
    {
      name: 'picker',
      type: 'ui',
      admin: {
        components: {
          Field: '/src/admin/MapLocationPicker',
        },
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'Exact match for the Project.location field, e.g. "Kathmandu, Nepal".' },
    },
    {
      name: 'latitude',
      type: 'number',
      required: true,
      admin: {
        description:
          'Geographic latitude. Get it from Google Maps: right-click any place → click the coordinates at the top → it copies "lat, lng" to your clipboard.',
      },
    },
    {
      name: 'longitude',
      type: 'number',
      required: true,
      admin: { description: 'Geographic longitude (the second number from Google Maps).' },
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
      type: 'row',
      fields: [
        {
          name: 'labelOffsetX',
          type: 'number',
          defaultValue: 0,
          admin: {
            width: '50%',
            description:
              'Optional. Pixel offset from the auto-placed label position. Positive = right, negative = left. Use the map picker above to drag the label visually.',
          },
        },
        {
          name: 'labelOffsetY',
          type: 'number',
          defaultValue: 0,
          admin: {
            width: '50%',
            description: 'Optional. Pixel offset. Positive = down, negative = up.',
          },
        },
      ],
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
