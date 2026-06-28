'use client'

import { useEffect, useRef } from 'react'
import { useField } from '@payloadcms/ui'

/**
 * Hidden UI field on the Brands collection. When the Brand create form is
 * opened with `?tradingDomains=<id>` in the URL (e.g. from the "Add Brand
 * Here" button on a ProductDomain form), this component reads the id and
 * adds it to the tradingDomains relationship — without overwriting any
 * existing selection. Renders nothing visible.
 */
export default function BrandTradingDomainPrefill() {
  const { value: current, setValue } = useField<(string | number)[] | undefined>({
    path: 'tradingDomains',
  })
  const appliedRef = useRef(false)

  useEffect(() => {
    if (appliedRef.current) return
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const fromUrl = params.get('tradingDomains')
    if (!fromUrl) return
    const idNum = Number(fromUrl)
    const idValue = Number.isFinite(idNum) ? idNum : fromUrl
    const existing = Array.isArray(current) ? current : []
    // Only add if not already present
    const already = existing.some((v) => String(v) === String(idValue))
    if (!already) {
      setValue([...existing, idValue])
    }
    appliedRef.current = true
  }, [current, setValue])

  return null
}
