'use client'

import { useEffect, useRef } from 'react'
import { useField } from '@payloadcms/ui'

/**
 * Hidden UI field on the Projects collection. When the Project create form
 * is opened with a ?location=… URL param (e.g. from the "Add Project Here"
 * button on the MapLocation form), this component reads the param once and
 * sets the location field. The user can still edit it after.
 *
 * Renders nothing visible.
 */
export default function ProjectLocationPrefill() {
  const { value: currentLocation, setValue: setLocation } = useField<string>({ path: 'location' })
  const appliedRef = useRef(false)

  useEffect(() => {
    if (appliedRef.current) return
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const fromUrl = params.get('location')
    // Only prefill if (a) URL has a value, (b) the field is currently empty
    if (fromUrl && (!currentLocation || currentLocation.trim() === '')) {
      setLocation(fromUrl)
      appliedRef.current = true
    }
  }, [currentLocation, setLocation])

  return null
}
