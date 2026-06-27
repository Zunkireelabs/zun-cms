'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useField, useFormFields } from '@payloadcms/ui'
import nepalPaths from './nepal-paths.json'

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
        <strong>Pin placement</strong> — click the map to place the pin, drag the label to reposition it.
      </div>
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
