"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei"
import { useTheme } from "next-themes"
import * as THREE from "three"

function FloatingParticles({ count = 100 }) {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const { theme } = useTheme()

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
      )
      const scale = Math.random() * 0.5 + 0.1
      temp.push({ position, scale })
    }
    return temp
  }, [count])

  useFrame((state) => {
    if (mesh.current) {
      particles.forEach((particle, i) => {
        const matrix = new THREE.Matrix4()
        const pos = particle.position.clone()
        pos.y += Math.sin(state.clock.elapsedTime + i) * 0.02
        pos.x += Math.cos(state.clock.elapsedTime + i * 0.5) * 0.02
        matrix.setPosition(pos)
        matrix.scale(new THREE.Vector3(particle.scale, particle.scale, particle.scale))
        mesh.current!.setMatrixAt(i, matrix)
      })
      mesh.current.instanceMatrix.needsUpdate = true
    }
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color={theme === "dark" ? "#4fd1c5" : "#3182ce"} transparent opacity={0.6} />
    </instancedMesh>
  )
}

function MainSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { theme } = useTheme()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={theme === "dark" ? "#4fd1c5" : "#3182ce"}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.9}
          wireframe
        />
      </mesh>
    </Float>
  )
}

function TorusMesh() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { theme } = useTheme()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[3, -1, -2]} scale={0.8}>
        <torusGeometry args={[1, 0.3, 16, 32]} />
        <MeshWobbleMaterial
          color={theme === "dark" ? "#805ad5" : "#6b46c1"}
          attach="material"
          factor={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

function OctahedronMesh() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { theme } = useTheme()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={meshRef} position={[-3, 1, -1]} scale={0.6}>
        <octahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color={theme === "dark" ? "#38b2ac" : "#319795"}
          attach="material"
          distort={0.2}
          speed={3}
          roughness={0.15}
          metalness={0.85}
        />
      </mesh>
    </Float>
  )
}

export function Scene3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={["transparent"]} />
        <fog attach="fog" args={["transparent", 8, 25]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <pointLight position={[-10, -10, -5]} intensity={0.4} color="#4fd1c5" />
        <pointLight position={[10, -10, 5]} intensity={0.3} color="#805ad5" />
        <MainSphere />
        <TorusMesh />
        <OctahedronMesh />
        <FloatingParticles count={80} />
      </Canvas>
    </div>
  )
}
