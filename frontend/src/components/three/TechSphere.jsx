import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * An interactive digital sphere: nodes distributed on a sphere surface,
 * connected by thin lines to nearby neighbors, gently rotating and
 * responding to cursor position. Represents "connected systems / digital
 * ecosystem" per the brief's hero concept options.
 */
export default function TechSphere({ nodeCount = 140, radius = 2.2 }) {
  const groupRef = useRef()
  const { viewport } = useThree()

  // Distribute points evenly on a sphere using a Fibonacci sphere.
  const points = useMemo(() => {
    const pts = []
    const phi = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < nodeCount; i++) {
      const y = 1 - (i / (nodeCount - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const theta = phi * i
      pts.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(radius))
    }
    return pts
  }, [nodeCount, radius])

  // Build line segments between points that are close to each other.
  const linePositions = useMemo(() => {
    const positions = []
    const maxDist = radius * 0.55
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (points[i].distanceTo(points[j]) < maxDist) {
          positions.push(points[i].x, points[i].y, points[i].z)
          positions.push(points[j].x, points[j].y, points[j].z)
        }
      }
    }
    return new Float32Array(positions)
  }, [points, radius])

  const nodePositions = useMemo(() => {
    const arr = new Float32Array(points.length * 3)
    points.forEach((p, i) => {
      arr[i * 3] = p.x
      arr[i * 3 + 1] = p.y
      arr[i * 3 + 2] = p.z
    })
    return arr
  }, [points])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    // Idle rotation
    groupRef.current.rotation.y += delta * 0.08

    // Subtle cursor-follow tilt (normalized pointer -1..1)
    const targetX = (state.pointer.y * Math.PI) / 16
    const targetY = groupRef.current.rotation.y + (state.pointer.x * Math.PI) / 32 - groupRef.current.rotation.y
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05
  })

  const scale = viewport.width < 6 ? 0.75 : 1

  return (
    <group ref={groupRef} scale={scale}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#8A7024" transparent opacity={0.35} />
      </lineSegments>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#D4AF37" size={0.045} sizeAttenuation transparent opacity={0.9} />
      </points>

      <mesh>
        <icosahedronGeometry args={[radius * 0.32, 1]} />
        <meshStandardMaterial
          color="#D4AF37"
          emissive="#8A7024"
          emissiveIntensity={0.4}
          metalness={0.8}
          roughness={0.25}
          wireframe
        />
      </mesh>
    </group>
  )
}
