'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useField, useFormFields, useDocumentInfo } from '@payloadcms/ui'
import nepalPaths from './nepal-paths.json'

interface ExistingLocation {
  id: number
  name: string
  latitude: number
  longitude: number
  labelOffsetX?: number
  labelOffsetY?: number
}

const WIDTH = 1150
const HEIGHT = 580

interface ProvincePath {
  id: number
  name: string
  d: string
}

// Same Kathmandu-anchored formulas used by the website fetcher.
function latLngToMarker(lat: number, lng: number): { x: number; y: number } {
  return {
    x: Math.round(650 + (lng - 85.32) * 70),
    y: Math.round(375 + (27.72 - lat) * 70),
  }
}
function markerToLatLng(x: number, y: number): { lat: number; lng: number } {
  return {
    lng: 85.32 + (x - 650) / 70,
    lat: 27.72 - (y - 375) / 70,
  }
}

export default function MapLocationPicker() {
  const { value: lat, setValue: setLat } = useField<number | null | undefined>({ path: 'latitude' })
  const { value: lng, setValue: setLng } = useField<number | null | undefined>({ path: 'longitude' })
  const { value: dir } = useField<'up' | 'down' | undefined>({ path: 'direction' })
  const { value: offX, setValue: setOffX } = useField<number | null | undefined>({ path: 'labelOffsetX' })
  const { value: offY, setValue: setOffY } = useField<number | null | undefined>({ path: 'labelOffsetY' })
  // name shown in the floating label preview
  const nameField = useFormFields(([fields]) => fields?.name)
  const name = (nameField?.value as string) || 'New pin'

  const svgRef = useRef<SVGSVGElement>(null)
  const [dragging, setDragging] = useState(false)
  const [existing, setExisting] = useState<ExistingLocation[]>([])
  const [savingGhostId, setSavingGhostId] = useState<number | null>(null)
  const [saveError, setSaveError] = useState<string | null>(null)
  const { id: currentDocId } = useDocumentInfo()

  // Fetch every other MapLocation once on mount so the picker can show ghost
  // pins for context. We filter out the doc being edited (if any) so we don't
  // double-draw it on top of the active pin.
  useEffect(() => {
    fetch('/api/map-locations?limit=100&depth=0')
      .then((r) => r.json())
      .then((j) => {
        const all: ExistingLocation[] = (j?.docs ?? []).map((d: any) => ({
          id: d.id,
          name: d.name,
          latitude: Number(d.latitude),
          longitude: Number(d.longitude),
          labelOffsetX: Number(d.labelOffsetX) || 0,
          labelOffsetY: Number(d.labelOffsetY) || 0,
        }))
        setExisting(all.filter((l) => String(l.id) !== String(currentDocId)))
      })
      .catch(() => setExisting([]))
  }, [currentDocId])
  const paths = (nepalPaths as { paths: ProvincePath[] }).paths
  const mapW = (nepalPaths as { width: number }).width
  const mapH = (nepalPaths as { height: number }).height
  const mapOffsetX = (WIDTH - mapW) / 2 + 25
  const mapOffsetY = (HEIGHT - mapH) / 2

  const hasPin = typeof lat === 'number' && typeof lng === 'number' && !Number.isNaN(lat) && !Number.isNaN(lng)

  const marker = useMemo(() => {
    if (!hasPin) return null
    return latLngToMarker(lat as number, lng as number)
  }, [lat, lng, hasPin])

  const labelX = marker ? marker.x + 90 + (Number(offX) || 0) : 0
  const labelY = marker ? marker.y + (Number(offY) || 0) : 0
  const direction = dir === 'down' ? 'down' : 'up'

  function svgCoordsFromEvent(e: { clientX: number; clientY: number }) {
    const svg = svgRef.current
    if (!svg) return null
    const pt = svg.createSVGPoint()
    pt.x = e.clientX
    pt.y = e.clientY
    const ctm = svg.getScreenCTM()
    if (!ctm) return null
    return pt.matrixTransform(ctm.inverse())
  }

  function handleMapClick(e: React.MouseEvent<SVGSVGElement>) {
    if (dragging) return
    const target = e.target as Element
    if (target.closest('[data-label-handle]')) return
    const p = svgCoordsFromEvent(e)
    if (!p) return
    const { lat: newLat, lng: newLng } = markerToLatLng(p.x, p.y)
    setLat(Number(newLat.toFixed(4)))
    setLng(Number(newLng.toFixed(4)))
    // Reset offsets when placing a fresh pin so the label starts at the default position
    setOffX(0)
    setOffY(0)
  }

  // Drag a ghost label — updates local state live, PATCHes the doc on mouseup
  function handleGhostMouseDown(e: React.MouseEvent<SVGGElement>, ghostId: number) {
    e.preventDefault()
    e.stopPropagation()
    setDragging(true)
    const startSvg = svgCoordsFromEvent({ clientX: e.clientX, clientY: e.clientY })
    if (!startSvg) return
    const target = existing.find((l) => l.id === ghostId)
    if (!target) return
    const startOffX = target.labelOffsetX || 0
    const startOffY = target.labelOffsetY || 0
    let nextOffX = startOffX
    let nextOffY = startOffY

    function move(ev: MouseEvent) {
      const cur = svgCoordsFromEvent({ clientX: ev.clientX, clientY: ev.clientY })
      if (!cur) return
      const dx = cur.x - startSvg!.x
      const dy = cur.y - startSvg!.y
      nextOffX = Math.round(startOffX + dx)
      nextOffY = Math.round(startOffY + dy)
      setExisting((prev) =>
        prev.map((l) => (l.id === ghostId ? { ...l, labelOffsetX: nextOffX, labelOffsetY: nextOffY } : l)),
      )
    }
    async function up() {
      setDragging(false)
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseup', up)
      // Only PATCH if the position actually changed
      if (nextOffX === startOffX && nextOffY === startOffY) return
      setSavingGhostId(ghostId)
      setSaveError(null)
      try {
        const res = await fetch(`/api/map-locations/${ghostId}`, {
          method: 'PATCH',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ labelOffsetX: nextOffX, labelOffsetY: nextOffY }),
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
      } catch (err: any) {
        // Revert on failure
        setExisting((prev) =>
          prev.map((l) =>
            l.id === ghostId ? { ...l, labelOffsetX: startOffX, labelOffsetY: startOffY } : l,
          ),
        )
        setSaveError(`Failed to save: ${err?.message ?? 'unknown error'}`)
      } finally {
        setSavingGhostId(null)
      }
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
  }

  // Label drag handlers
  function handleLabelMouseDown(e: React.MouseEvent<SVGGElement>) {
    if (!marker) return
    e.preventDefault()
    e.stopPropagation()
    setDragging(true)
    const startSvg = svgCoordsFromEvent({ clientX: e.clientX, clientY: e.clientY })
    if (!startSvg) return
    const startOffX = Number(offX) || 0
    const startOffY = Number(offY) || 0

    function move(ev: MouseEvent) {
      const cur = svgCoordsFromEvent({ clientX: ev.clientX, clientY: ev.clientY })
      if (!cur) return
      const dx = cur.x - startSvg!.x
      const dy = cur.y - startSvg!.y
      setOffX(Math.round(startOffX + dx))
      setOffY(Math.round(startOffY + dy))
    }
    function up() {
      setDragging(false)
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseup', up)
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
  }

  function getElbowPath(mx: number, my: number, lx: number, ly: number, d: 'up' | 'down'): string {
    if (d === 'up') {
      const bendY = ly + 8
      return `M ${mx},${my} L ${mx},${bendY} L ${lx - 4},${bendY}`
    }
    const bendY = ly - 2
    return `M ${mx},${my} L ${mx},${bendY} L ${lx - 4},${bendY}`
  }

  return (
    <div style={{ margin: '1.5rem 0' }}>
      <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--theme-elevation-650)' }}>
        <strong>Pin placement</strong> — click the map to place this pin. Drag any label (gold or gray) to reposition it; gray labels save back to their own document automatically.
      </div>
      {saveError && (
        <div
          style={{
            marginBottom: '0.5rem',
            padding: '0.4rem 0.6rem',
            fontSize: '0.8rem',
            color: '#b00020',
            background: '#fef0f0',
            border: '1px solid #f5c2c2',
            borderRadius: '4px',
          }}
        >
          {saveError}
        </div>
      )}
      <div
        style={{
          border: '1px solid var(--theme-elevation-150)',
          borderRadius: '6px',
          background: '#FAFAF8',
          overflow: 'hidden',
        }}
      >
        <svg
          ref={svgRef}
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            cursor: dragging ? 'grabbing' : 'crosshair',
            userSelect: 'none',
          }}
          preserveAspectRatio="xMidYMid meet"
          onClick={handleMapClick}
        >
          <rect x="0" y="0" width={WIDTH} height={HEIGHT} fill="#FAFAF8" />
          <g transform={`translate(${mapOffsetX}, ${mapOffsetY})`}>
            {paths.map((p) => (
              <path
                key={p.id}
                d={p.d}
                fill="rgba(212, 168, 75, 0.12)"
                stroke="rgba(212, 168, 75, 0.5)"
                strokeWidth={1}
              />
            ))}
          </g>

          {/* Ghost pins for every other MapLocation — labels are draggable + auto-saved */}
          {existing.map((loc) => {
            const m = latLngToMarker(loc.latitude, loc.longitude)
            const lx = m.x + 90 + (loc.labelOffsetX || 0)
            const ly = m.y + (loc.labelOffsetY || 0)
            const isSaving = savingGhostId === loc.id
            const labelWidth = Math.max(110, loc.name.length * 6.5 + 12)
            return (
              <g key={`ghost-${loc.id}`} opacity={isSaving ? 0.7 : 0.5}>
                <path
                  d={getElbowPath(m.x, m.y, lx, ly, 'up')}
                  stroke="#9aa0a6"
                  strokeWidth={1}
                  fill="none"
                  pointerEvents="none"
                />
                <circle cx={m.x} cy={m.y} r={5} fill="#9aa0a6" pointerEvents="none" />
                <g
                  data-label-handle="1"
                  style={{ cursor: dragging ? 'grabbing' : 'grab' }}
                  onMouseDown={(e) => handleGhostMouseDown(e, loc.id)}
                >
                  {/* Invisible-ish hitbox makes the label easier to grab */}
                  <rect
                    x={lx - 4}
                    y={ly - 12}
                    width={labelWidth}
                    height={18}
                    fill="white"
                    stroke="#9aa0a6"
                    strokeWidth={isSaving ? 1.5 : 0.8}
                    strokeDasharray={isSaving ? '3 2' : undefined}
                    rx={2}
                  />
                  <text
                    x={lx + 2}
                    y={ly}
                    fontSize="11"
                    fill="#555"
                    fontFamily="sans-serif"
                    pointerEvents="none"
                  >
                    {loc.name}
                  </text>
                </g>
              </g>
            )
          })}

          {marker && (
            <>
              <path
                d={getElbowPath(marker.x, marker.y, labelX, labelY, direction)}
                stroke="#D4A84B"
                strokeWidth={1.5}
                fill="none"
                pointerEvents="none"
              />
              <circle cx={marker.x} cy={marker.y} r={7} fill="#D4A84B" pointerEvents="none" />
              <circle cx={marker.x} cy={marker.y} r={3} fill="#fff" pointerEvents="none" />

              {/* Draggable label */}
              <g
                data-label-handle="1"
                style={{ cursor: dragging ? 'grabbing' : 'grab' }}
                onMouseDown={handleLabelMouseDown}
              >
                <rect
                  x={labelX - 4}
                  y={labelY - 14}
                  width={Math.max(120, name.length * 7 + 12)}
                  height={22}
                  fill="white"
                  stroke="#D4A84B"
                  strokeWidth={1.2}
                  rx={3}
                />
                <text
                  x={labelX + 4}
                  y={labelY}
                  fontSize="12"
                  fill="#333"
                  fontFamily="sans-serif"
                  pointerEvents="none"
                >
                  {name}
                </text>
              </g>
            </>
          )}
        </svg>
      </div>
      {!hasPin && (
        <div
          style={{
            marginTop: '0.5rem',
            fontSize: '0.8rem',
            color: 'var(--theme-elevation-500)',
            fontStyle: 'italic',
          }}
        >
          Click anywhere on the map to start.
        </div>
      )}
      {hasPin && (
        <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--theme-elevation-650)' }}>
          lat <strong>{Number(lat).toFixed(4)}</strong>, lng <strong>{Number(lng).toFixed(4)}</strong>
          {' — '}
          label offset ({Number(offX) || 0}, {Number(offY) || 0})
        </div>
      )}
    </div>
  )
}
