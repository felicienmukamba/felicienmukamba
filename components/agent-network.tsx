"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useTheme } from "next-themes"
import * as THREE from "three"

const palettes = {
  dark: { node: "#b3a8ff", hub: "#7fe7ff", line: "#8d82ff", pulse: "#e9fbff" },
  light: { node: "#5a4bd6", hub: "#0e8fb3", line: "#5a4bd6", pulse: "#0e8fb3" },
}

type Graph = {
  positions: THREE.Vector3[]
  edges: [number, number][]
  neighbors: number[][]
  hubs: Set<number>
}

/** Seeded PRNG so the network looks identical on every visit. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function buildGraph(count: number, radius: number): Graph {
  const random = mulberry32(7)
  const positions: THREE.Vector3[] = []
  const golden = Math.PI * (3 - Math.sqrt(5))

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i
    const jitter = radius * (0.86 + random() * 0.22)
    positions.push(new THREE.Vector3(Math.cos(theta) * r * jitter, y * jitter, Math.sin(theta) * r * jitter))
  }

  const neighbors: number[][] = positions.map(() => [])
  const edgeKeys = new Set<string>()
  const edges: [number, number][] = []

  positions.forEach((p, i) => {
    const nearest = positions
      .map((q, j) => ({ j, d: p.distanceToSquared(q) }))
      .filter(({ j }) => j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 3)
    for (const { j } of nearest) {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`
      if (edgeKeys.has(key)) continue
      edgeKeys.add(key)
      edges.push([i, j])
      neighbors[i].push(j)
      neighbors[j].push(i)
    }
  })

  const hubs = new Set<number>()
  while (hubs.size < Math.round(count / 12)) hubs.add(Math.floor(random() * count))

  return { positions, edges, neighbors, hubs }
}

type Pulse = { from: number; to: number; t: number; speed: number }

function Network({ count, animate }: { count: number; animate: boolean }) {
  const { resolvedTheme } = useTheme()
  const colors = palettes[resolvedTheme === "light" ? "light" : "dark"]
  const group = useRef<THREE.Group>(null)
  const nodes = useRef<THREE.InstancedMesh>(null)
  const pulsesMesh = useRef<THREE.InstancedMesh>(null)
  const pointer = useThree((state) => state.pointer)

  const graph = useMemo(() => buildGraph(count, 2.55), [count])
  const pulseCount = Math.round(count / 6)

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const array = new Float32Array(graph.edges.length * 6)
    graph.edges.forEach(([a, b], i) => {
      graph.positions[a].toArray(array, i * 6)
      graph.positions[b].toArray(array, i * 6 + 3)
    })
    geometry.setAttribute("position", new THREE.BufferAttribute(array, 3))
    return geometry
  }, [graph])

  const pulses = useMemo<Pulse[]>(() => {
    const random = mulberry32(42)
    return Array.from({ length: pulseCount }, () => {
      const [from, to] = graph.edges[Math.floor(random() * graph.edges.length)]
      return { from, to, t: random(), speed: 0.35 + random() * 0.5 }
    })
  }, [graph, pulseCount])

  const dummy = useMemo(() => new THREE.Object3D(), [])
  const tmp = useMemo(() => new THREE.Vector3(), [])

  // Declared up front (not via setColorAt) so the material compiles with instance colors.
  const nodeColors = useMemo(() => {
    const hub = new THREE.Color(colors.hub)
    const node = new THREE.Color(colors.node)
    const array = new Float32Array(graph.positions.length * 3)
    graph.positions.forEach((_, i) => (graph.hubs.has(i) ? hub : node).toArray(array, i * 3))
    return array
  }, [graph, colors])

  useEffect(() => {
    const mesh = nodes.current
    if (!mesh) return
    graph.positions.forEach((p, i) => {
      dummy.position.copy(p)
      dummy.scale.setScalar(graph.hubs.has(i) ? 2.1 : 1)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    })
    mesh.instanceMatrix.needsUpdate = true
  }, [graph, dummy])

  useFrame((_, delta) => {
    const g = group.current
    if (!g) return
    const dt = Math.min(delta, 0.05)

    if (animate) g.rotation.y += dt * 0.07
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -pointer.y * 0.25, 0.04)
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, pointer.x * 0.12, 0.04)

    const mesh = pulsesMesh.current
    if (!mesh) return
    pulses.forEach((pulse, i) => {
      if (animate) {
        pulse.t += dt * pulse.speed
        if (pulse.t >= 1) {
          // Hop to a neighbouring node: messages wander through the agent graph.
          const next = graph.neighbors[pulse.to]
          pulse.from = pulse.to
          pulse.to = next[Math.floor(Math.random() * next.length)]
          pulse.t = 0
        }
      }
      tmp.lerpVectors(graph.positions[pulse.from], graph.positions[pulse.to], pulse.t)
      dummy.position.copy(tmp)
      dummy.scale.setScalar(Math.sin(pulse.t * Math.PI) * 1.4 + 0.2)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    })
    mesh.instanceMatrix.needsUpdate = true
  })

  return (
    <group ref={group} rotation={[0.35, 0, 0]}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color={colors.line} transparent opacity={resolvedTheme === "light" ? 0.22 : 0.28} depthWrite={false} />
      </lineSegments>
      <instancedMesh ref={nodes} args={[undefined, undefined, graph.positions.length]}>
        <icosahedronGeometry args={[0.035, 1]}>
          <instancedBufferAttribute key={nodeColors.length + colors.node} attach="attributes-color" args={[nodeColors, 3]} />
        </icosahedronGeometry>
        <meshBasicMaterial vertexColors toneMapped={false} />
      </instancedMesh>
      <instancedMesh ref={pulsesMesh} args={[undefined, undefined, pulseCount]}>
        <icosahedronGeometry args={[0.03, 1]} />
        <meshBasicMaterial color={colors.pulse} toneMapped={false} />
      </instancedMesh>
    </group>
  )
}

export default function AgentNetwork() {
  const container = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)
  const [reduced, setReduced] = useState(false)
  const [count, setCount] = useState(84)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(media.matches)
    update()
    media.addEventListener("change", update)
    if (window.innerWidth < 768) setCount(56)

    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    if (container.current) observer.observe(container.current)
    return () => {
      media.removeEventListener("change", update)
      observer.disconnect()
    }
  }, [])

  const animate = visible && !reduced

  return (
    <div ref={container} className="absolute inset-0" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        frameloop={animate ? "always" : "demand"}
        style={{ pointerEvents: "none" }}
        eventSource={typeof document !== "undefined" ? document.body : undefined}
        eventPrefix="client"
      >
        <Network count={count} animate={animate} />
      </Canvas>
    </div>
  )
}
