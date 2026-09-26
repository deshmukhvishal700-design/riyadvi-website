import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Module-scoped instance so other parts of the app (e.g. ScrollToTop on
// route change) can command the same Lenis instance instead of fighting it
// with plain window.scrollTo, which Lenis would otherwise override.
let lenisInstance = null

export function getLenis() {
  return lenisInstance
}

/**
 * Initializes Lenis smooth scrolling once at the app root and keeps it
 * synced with GSAP's ScrollTrigger so scroll-based animations stay
 * accurate. Respects prefers-reduced-motion by skipping smoothing.
 */
export default function useLenis() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    })
    lenisInstance = lenis

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      lenisInstance = null
      gsap.ticker.remove(lenis.raf)
    }
  }, [])
}
