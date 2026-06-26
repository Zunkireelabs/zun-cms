import type { GlobalConfig } from 'payload'

export const SiteConfig: GlobalConfig = {
  slug: 'site-config',
  access: { read: () => true },
  admin: { group: 'Settings' },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'shortName', type: 'text', required: true },
    { name: 'legalName', type: 'text', required: true },
    { name: 'tagline', type: 'text', required: true },
    { name: 'description', type: 'textarea', required: true },
    { name: 'url', type: 'text', required: true },
    { name: 'phone', type: 'text', required: true },
    { name: 'phoneSecondary', type: 'text' },
    { name: 'phoneMobile', type: 'text' },
    { name: 'email', type: 'email', required: true },
    {
      name: 'address',
      type: 'group',
      fields: [
        { name: 'street', type: 'text', required: true },
        { name: 'city', type: 'text', required: true },
        { name: 'country', type: 'text', required: true },
        { name: 'postal', type: 'text' },
      ],
    },
    { name: 'mapsUrl', type: 'text' },
    {
      name: 'social',
      type: 'group',
      fields: [
        { name: 'instagram', type: 'text' },
        { name: 'facebook', type: 'text' },
        { name: 'tiktok', type: 'text' },
        { name: 'linkedin', type: 'text' },
      ],
    },
  ],
}
