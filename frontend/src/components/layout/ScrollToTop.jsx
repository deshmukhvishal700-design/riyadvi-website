import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getLenis } from '../../hooks/useLenis'

/**
 * React Router does not reset scroll position on navigation by default.
 * This scrolls to the top of the new page on every route change, using
 * the shared Lenis instance when smooth scroll is active (falls back to
 * plain window.scrollTo when Lenis is off, e.g. prefers-reduced-motion).
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname])

  return null
}
