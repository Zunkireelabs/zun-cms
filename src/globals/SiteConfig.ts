import type { GlobalConfig } from 'payload'
import { afterChangeRevalidateGlobal } from '../hooks/revalidate'

export const SiteConfig: GlobalConfig = {
  slug: 'site-config',
  access: { read: () => true },
  admin: { group: 'Settings' },
  hooks: {
    afterChange: [afterChangeRevalidateGlobal('site-config')],
  },
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

    // ─── Stats (used on /about + home Impact Metrics) ─────────────────────────
    {
      name: 'stats',
      type: 'group',
      admin: { description: 'Marketing KPIs shown on the home page and About page.' },
      fields: [
        { name: 'projectsDelivered', type: 'number' },
        { name: 'projectsDeliveredLabel', type: 'text', defaultValue: 'Projects Delivered' },
        { name: 'yearsOfExcellence', type: 'number' },
        { name: 'yearsOfExcellenceLabel', type: 'text', defaultValue: 'Years of Excellence' },
        { name: 'brandPartners', type: 'number' },
        { name: 'brandPartnersLabel', type: 'text', defaultValue: 'Global Brand Partners' },
        { name: 'sectorsServed', type: 'number' },
        { name: 'sectorsServedLabel', type: 'text', defaultValue: 'Sectors Served' },
      ],
    },

    // ─── Contact meta (used on /contact) ──────────────────────────────────────
    { name: 'operatingHours', type: 'text', admin: { description: 'e.g. "Sun – Thu: 8:00 AM – 5:00 PM"' } },
    {
      name: 'showrooms',
      type: 'array',
      admin: { description: 'Showrooms surfaced on the contact page.' },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'address', type: 'text' },
      ],
    },

    // ─── About narrative ──────────────────────────────────────────────────────
    {
      name: 'mission',
      type: 'array',
      admin: { description: 'Mission bullet points shown on /about.' },
      fields: [{ name: 'point', type: 'text', required: true }],
    },
    {
      name: 'vision',
      type: 'array',
      admin: { description: 'Vision bullet points shown on /about.' },
      fields: [{ name: 'point', type: 'text', required: true }],
    },
    {
      name: 'trustPillars',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
    {
      name: 'coreValues',
      type: 'array',
      admin: { description: 'Six core values shown on /about.' },
      fields: [
        {
          name: 'icon',
          type: 'select',
          options: [
            'Target', 'Eye', 'Shield', 'Users', 'Award', 'Handshake',
            'CheckCircle', 'TrendingUp', 'Globe', 'Layers',
            'Sparkles', 'HeartPulse', 'Building2',
          ],
        },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'practice', type: 'text' },
      ],
    },
    {
      name: 'storyMeta',
      type: 'array',
      admin: { description: 'Story-block meta items (e.g. "Founded 2002").' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
      ],
    },
    {
      name: 'storySectors',
      type: 'array',
      admin: { description: 'Sectors named in the /about story block.' },
      fields: [{ name: 'name', type: 'text', required: true }],
    },

    // ─── Career page narrative ────────────────────────────────────────────────
    {
      name: 'whyWorkWithUs',
      type: 'array',
      admin: { description: 'Benefit cards on /career.' },
      fields: [
        {
          name: 'icon',
          type: 'select',
          options: ['Sparkles', 'Award', 'Users', 'TrendingUp', 'Globe', 'Layers', 'Building2', 'HeartPulse'],
        },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
    {
      name: 'employeeStories',
      type: 'array',
      admin: { description: 'Employee testimonials on /career.' },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text', required: true },
        { name: 'tenure', type: 'text' },
        { name: 'quote', type: 'textarea', required: true },
      ],
    },

    // ─── Contracting services (used on /contracting) ──────────────────────────
    {
      name: 'contractingServices',
      type: 'array',
      admin: { description: 'Service cards on /contracting.' },
      fields: [
        {
          name: 'icon',
          type: 'select',
          options: ['Hammer', 'Wrench', 'Building2', 'Sparkles', 'Layers', 'Briefcase'],
        },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
  ],
}
