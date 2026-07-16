'use client'

import { useEffect, useState } from 'react'
import { useDocumentInfo, useFormFields } from '@payloadcms/ui'

interface Brand {
  id: number
  name: string
  slug: string
  country?: string
  website?: string
  brochureCount: number
}

export default function ProductDomainBrands() {
  const { id: currentDocId } = useDocumentInfo()
  // Live-watch the title so the heading updates as the user types
  const titleField = useFormFields(([fields]) => fields?.title)
  const title = (titleField?.value as string) || ''

  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!currentDocId) {
      setBrands([])
      return
    }
    let cancelled = false
    setLoading(true)
    setError(null)
    // Brands.tradingDomains is a hasMany relationship — filter by contains
    const url = `/api/brands?where[tradingDomains][contains]=${encodeURIComponent(String(currentDocId))}&limit=100&depth=0&sort=name`
    fetch(url, { credentials: 'same-origin' })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((j) => {
        if (cancelled) return
        setBrands(
          (j?.docs ?? []).map((d: any) => ({
            id: d.id,
            name: d.name,
            slug: d.slug,
            country: d.country,
            website: d.website,
            brochureCount: Array.isArray(d.brochures) ? d.brochures.length : 0,
          })),
        )
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message ?? 'Failed to load')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [currentDocId])

  const addUrl = currentDocId
    ? `/admin/collections/brands/create?tradingDomains=${encodeURIComponent(String(currentDocId))}`
    : `/admin/collections/brands/create`

  return (
    <div style={{ margin: '1.5rem 0' }}>
      <div
        style={{
          marginBottom: '0.5rem',
          fontSize: '0.85rem',
          color: 'var(--theme-elevation-650)',
        }}
      >
        <strong>Brands in this trading domain</strong>{' '}
        {title && <span style={{ color: 'var(--theme-elevation-500)' }}>({title})</span>}
      </div>

      {!currentDocId && (
        <div
          style={{
            padding: '0.75rem',
            background: 'var(--theme-elevation-50)',
            border: '1px solid var(--theme-elevation-100)',
            borderRadius: '4px',
            fontSize: '0.85rem',
            color: 'var(--theme-elevation-500)',
          }}
        >
          Save this trading domain first, then you'll be able to add brands here.
        </div>
      )}

      {currentDocId && loading && (
        <div style={{ padding: '0.5rem', fontSize: '0.85rem', color: 'var(--theme-elevation-500)' }}>
          Loading brands…
        </div>
      )}

      {currentDocId && error && (
        <div
          style={{
            padding: '0.5rem',
            background: '#fef0f0',
            border: '1px solid #f5c2c2',
            borderRadius: '4px',
            color: '#b00020',
            fontSize: '0.85rem',
          }}
        >
          Failed to load brands: {error}
        </div>
      )}

      {currentDocId && !loading && !error && brands.length === 0 && (
        <div
          style={{
            padding: '0.75rem',
            background: 'var(--theme-elevation-50)',
            border: '1px dashed var(--theme-elevation-150)',
            borderRadius: '4px',
            fontSize: '0.85rem',
            color: 'var(--theme-elevation-500)',
          }}
        >
          No brands tagged with this domain yet. Click below to add the first one.
        </div>
      )}

      {brands.length > 0 && (
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            border: '1px solid var(--theme-elevation-150)',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          {brands.map((b, idx) => (
            <li
              key={b.id}
              style={{
                padding: '0.6rem 0.8rem',
                borderTop: idx === 0 ? 'none' : '1px solid var(--theme-elevation-100)',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.5rem',
              }}
            >
              <span style={{ flex: 1 }}>
                <strong>{b.name}</strong>
                {b.country && (
                  <span style={{ color: 'var(--theme-elevation-500)' }}> · {b.country}</span>
                )}
                <span style={{ marginLeft: '0.5rem', fontSize: '0.7rem' }}>
                  {b.website && (
                    <span
                      title="Visit Brand link set"
                      style={{
                        marginRight: '0.3rem',
                        padding: '0.05rem 0.35rem',
                        background: '#e0f0e0',
                        color: '#1f6a1f',
                        borderRadius: '3px',
                      }}
                    >
                      website
                    </span>
                  )}
                  {b.brochureCount > 0 && (
                    <span
                      title={`${b.brochureCount} brochure${b.brochureCount === 1 ? '' : 's'} added`}
                      style={{
                        padding: '0.05rem 0.35rem',
                        background: '#f0e8e0',
                        color: '#6a4a1f',
                        borderRadius: '3px',
                      }}
                    >
                      {b.brochureCount} brochure{b.brochureCount === 1 ? '' : 's'}
                    </span>
                  )}
                </span>
              </span>
              <a
                href={`/admin/collections/brands/${b.id}`}
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--theme-text)',
                  textDecoration: 'underline',
                }}
              >
                Edit →
              </a>
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: '0.75rem' }}>
        <a
          href={addUrl}
          style={{
            display: 'inline-block',
            padding: '0.5rem 0.9rem',
            background: 'var(--theme-success-500, #2d8a3e)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontSize: '0.85rem',
            fontWeight: 600,
          }}
        >
          + Add Brand Here
        </a>
        {currentDocId && (
          <span style={{ marginLeft: '0.75rem', fontSize: '0.78rem', color: 'var(--theme-elevation-500)' }}>
            Opens the new-brand form with this trading domain pre-selected.
          </span>
        )}
      </div>
    </div>
  )
}
