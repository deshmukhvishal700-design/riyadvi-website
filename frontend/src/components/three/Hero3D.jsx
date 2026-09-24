import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import TechSphere from './TechSphere'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  )
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return isMobile
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return reduced
}

export default function Hero3D() {
  const isMobile = useIsMobile()
  const reducedMotion = usePrefersReducedMotion()

  // Static fallback: no WebGL animation loop at all, per the brief's
  // "mobile strategy / static fallback" requirement (section 29).
  if (reducedMotion) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-48 w-48 rounded-full border border-gold/40 bg-gradient-to-br from-gold/20 to-transparent" />
      </div>
    )
  }

  return (
    <Canvas
      dpr={isMobile ? 1 : [1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: !isMobile, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#D4AF37" />
      <Suspense fallback={null}>
        <TechSphere nodeCount={isMobile ? 70 : 140} />
      </Suspense>
    </Canvas>
  )
}
