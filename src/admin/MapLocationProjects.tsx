'use client'

import { useEffect, useState } from 'react'
import { useFormFields } from '@payloadcms/ui'

interface Project {
  id: number
  title: string
  slug: string
  year?: number
  sector?: string
}

export default function MapLocationProjects() {
  // Live-watch the `name` field so the project list updates as the user
  // types or after the city name is set from the map picker.
  const nameField = useFormFields(([fields]) => fields?.name)
  const name = (nameField?.value as string) || ''

  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!name.trim()) {
      setProjects([])
      return
    }
    let cancelled = false
    setLoading(true)
    setError(null)
    const url = `/api/projects?where[location][equals]=${encodeURIComponent(name)}&limit=100&depth=0`
    fetch(url, { credentials: 'same-origin' })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((j) => {
        if (cancelled) return
        setProjects(
          (j?.docs ?? []).map((d: any) => ({
            id: d.id,
            title: d.title,
            slug: d.slug,
            year: d.year,
            sector: d.sector,
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
  }, [name])

  const addUrl = name
    ? `/admin/collections/projects/create?location=${encodeURIComponent(name)}`
    : `/admin/collections/projects/create`

  return (
    <div style={{ margin: '1.5rem 0' }}>
      <div
        style={{
          marginBottom: '0.5rem',
          fontSize: '0.85rem',
          color: 'var(--theme-elevation-650)',
        }}
      >
        <strong>Projects at this location</strong>{' '}
        {name && (
          <span style={{ color: 'var(--theme-elevation-500)' }}>
            (Project.location = <code>{name}</code>)
          </span>
        )}
      </div>

      {!name && (
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
          Set the Name above first, then any matching projects will appear here.
        </div>
      )}

      {name && loading && (
        <div style={{ padding: '0.5rem', fontSize: '0.85rem', color: 'var(--theme-elevation-500)' }}>
          Loading projects…
        </div>
      )}

      {name && error && (
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
          Failed to load projects: {error}
        </div>
      )}

      {name && !loading && !error && projects.length === 0 && (
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
          No projects yet at <code>{name}</code>. Click the button below to add the first one.
        </div>
      )}

      {projects.length > 0 && (
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
          {projects.map((p, idx) => (
            <li
              key={p.id}
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
              <span>
                <strong>{p.title}</strong>
                {p.year && (
                  <span style={{ color: 'var(--theme-elevation-500)' }}> — {p.year}</span>
                )}
                {p.sector && (
                  <span
                    style={{
                      marginLeft: '0.5rem',
                      padding: '0.1rem 0.4rem',
                      background: 'var(--theme-elevation-100)',
                      borderRadius: '3px',
                      fontSize: '0.75rem',
                      color: 'var(--theme-elevation-650)',
                    }}
                  >
                    {p.sector}
                  </span>
                )}
              </span>
              <a
                href={`/admin/collections/projects/${p.id}`}
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
          + Add Project Here
        </a>
        {name && (
          <span style={{ marginLeft: '0.75rem', fontSize: '0.78rem', color: 'var(--theme-elevation-500)' }}>
            Opens the new-project form. Set location to <code>{name}</code> (will pre-fill if supported).
          </span>
        )}
      </div>
    </div>
  )
}
