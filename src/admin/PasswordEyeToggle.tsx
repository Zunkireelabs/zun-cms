'use client'

import { useEffect, type ReactNode } from 'react'

const EYE_SVG =
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>'

const EYE_OFF_SVG =
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-7-10-7 1.21-2.82 3.07-5.21 5.41-6.81m3.36-1.13A9.95 9.95 0 0 1 12 4c7 0 10 7 10 7a13.21 13.21 0 0 1-1.45 2.5"/><line x1="1" y1="1" x2="23" y2="23"/></svg>'

function attach(input: HTMLInputElement) {
  if (input.dataset.eyeAttached) return
  const parent = input.parentElement
  if (!parent) return
  input.dataset.eyeAttached = '1'
  if (getComputedStyle(parent).position === 'static') {
    parent.style.position = 'relative'
  }
  input.style.paddingRight = '2.5rem'

  const btn = document.createElement('button')
  btn.type = 'button'
  btn.setAttribute('aria-label', 'Show password')
  btn.style.cssText =
    'position:absolute;right:0.75rem;top:50%;transform:translateY(-50%);background:transparent;border:0;cursor:pointer;padding:0.25rem;color:inherit;opacity:0.7;display:flex;align-items:center;justify-content:center;z-index:2;'
  btn.innerHTML = EYE_SVG
  btn.addEventListener('mouseenter', () => (btn.style.opacity = '1'))
  btn.addEventListener('mouseleave', () => (btn.style.opacity = '0.7'))
  btn.addEventListener('click', () => {
    const showing = input.type === 'text'
    input.type = showing ? 'password' : 'text'
    btn.innerHTML = showing ? EYE_SVG : EYE_OFF_SVG
    btn.setAttribute('aria-label', showing ? 'Show password' : 'Hide password')
  })
  parent.appendChild(btn)
}

export default function PasswordEyeToggle({ children }: { children: ReactNode }) {
  useEffect(() => {
    const scan = () => {
      document
        .querySelectorAll<HTMLInputElement>('input[type="password"]')
        .forEach(attach)
    }
    scan()
    const observer = new MutationObserver(scan)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  return <>{children}</>
}
