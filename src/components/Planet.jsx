import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Sphere } from "@react-three/drei";
import * as THREE from "three";

// Floating Particles Background
export function ParticleField() {
  const particlesRef = useRef();
  const particleCount = 1000;

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 50;
      positions[i3 + 1] = (Math.random() - 0.5) * 50;
      positions[i3 + 2] = (Math.random() - 0.5) * 50;

      const color = new THREE.Color();
      color.setHSL(0.6 + Math.random() * 0.2, 0.7, 0.6);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = Math.random() * 2 + 0.5;
    }

    return { positions, colors, sizes };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.03;

      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.002;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={particles.colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particleCount}
          array={particles.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Orbiting Rings
export function OrbitingRings() {
  const ringsRef = useRef();

  useFrame((state) => {
    if (ringsRef.current) {
      ringsRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      ringsRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={ringsRef}>
      {[...Array(3)].map((_, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, (Math.PI / 3) * i]}>
          <torusGeometry args={[3 + i * 1.5, 0.05, 16, 100]} />
          <meshStandardMaterial
            color={`hsl(${200 + i * 30}, 70%, 60%)`}
            emissive={`hsl(${200 + i * 30}, 70%, 40%)`}
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

// Geometric Shapes Array
export function GeometricShapes() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        child.rotation.x = state.clock.elapsedTime * (0.3 + i * 0.1);
        child.rotation.y = state.clock.elapsedTime * (0.2 + i * 0.05);
        child.position.y = Math.sin(state.clock.elapsedTime + i) * 0.3;
      });
    }
  });

  const shapes = [
    { type: "box", pos: [-6, 2, -5], size: [1, 1, 1], color: "#4F46E5" },
    { type: "octahedron", pos: [6, -1, -8], size: 0.8, color: "#7C3AED" },
    { type: "tetrahedron", pos: [-4, -3, -6], size: 0.9, color: "#2563EB" },
    { type: "icosahedron", pos: [5, 3, -7], size: 0.7, color: "#06B6D4" },
    { type: "dodecahedron", pos: [0, -4, -9], size: 0.8, color: "#8B5CF6" },
  ];

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <Float
          key={i}
          speed={2 + i * 0.5}
          rotationIntensity={0.5 + i * 0.2}
          floatIntensity={0.5}
        >
          <mesh position={shape.pos}>
            {shape.type === "box" && <boxGeometry args={shape.size} />}
            {shape.type === "octahedron" && (
              <octahedronGeometry args={[shape.size]} />
            )}
            {shape.type === "tetrahedron" && (
              <tetrahedronGeometry args={[shape.size]} />
            )}
            {shape.type === "icosahedron" && (
              <icosahedronGeometry args={[shape.size]} />
            )}
            {shape.type === "dodecahedron" && (
              <dodecahedronGeometry args={[shape.size]} />
            )}
            <meshStandardMaterial
              color={shape.color}
              metalness={0.6}
              roughness={0.3}
              emissive={shape.color}
              emissiveIntensity={0.3}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// Animated Wave Grid
export function WaveGrid() {
  const gridRef = useRef();
  const gridSize = 30;
  const spacing = 0.8;

  const positions = useMemo(() => {
    const pos = [];
    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        pos.push({
          x: (x - gridSize / 2) * spacing,
          z: (z - gridSize / 2) * spacing,
          offset: Math.random() * Math.PI * 2,
        });
      }
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.children.forEach((child, i) => {
        const { offset } = positions[i];
        child.position.y =
          Math.sin(state.clock.elapsedTime + offset) * 0.5 - 8;
        child.scale.y = 1 + Math.sin(state.clock.elapsedTime + offset) * 0.3;
      });
    }
  });

  return (
    <group ref={gridRef}>
      {positions.map((pos, i) => (
        <mesh key={i} position={[pos.x, -8, pos.z]}>
          <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
          <meshStandardMaterial
            color="#3B82F6"
            emissive="#1E40AF"
            emissiveIntensity={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

// Central Morphing Sphere
export function MorphingSphere() {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere args={[1.5, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#6366F1"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive="#4F46E5"
          emissiveIntensity={0.5}
        />
      </Sphere>
    </Float>
  );
}

// Energy Rings
export function EnergyRings() {
  const ringsRef = useRef();

  useFrame((state) => {
    if (ringsRef.current) {
      ringsRef.current.children.forEach((ring, i) => {
        ring.rotation.z = state.clock.elapsedTime * (0.5 + i * 0.1);
        ring.scale.setScalar(1 + Math.sin(state.clock.elapsedTime + i) * 0.1);
      });
    }
  });

  return (
    <group ref={ringsRef} position={[0, 0, 0]}>
      {[...Array(5)].map((_, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2 + i * 0.5, 0.03, 16, 100]} />
          <meshStandardMaterial
            color={`hsl(${240 + i * 15}, 80%, 60%)`}
            emissive={`hsl(${240 + i * 15}, 80%, 50%)`}
            emissiveIntensity={0.8}
            transparent
            opacity={0.6 - i * 0.08}
          />
        </mesh>
      ))}
    </group>
  );
}

// DNA Helix Structure
export function DNAHelix() {
  const helixRef = useRef();
  const count = 40;

  const helixPoints = useMemo(() => {
    const points = [];
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 4;
      const radius = 2;
      points.push({
        pos1: [
          Math.cos(t) * radius,
          i * 0.3 - 6,
          Math.sin(t) * radius,
        ],
        pos2: [
          Math.cos(t + Math.PI) * radius,
          i * 0.3 - 6,
          Math.sin(t + Math.PI) * radius,
        ],
      });
    }
    return points;
  }, []);

  useFrame((state) => {
    if (helixRef.current) {
      helixRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={helixRef} position={[8, 2, -10]}>
      {helixPoints.map((point, i) => (
        <group key={i}>
          <mesh position={point.pos1}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial
              color="#EC4899"
              emissive="#DB2777"
              emissiveIntensity={0.5}
            />
          </mesh>
          <mesh position={point.pos2}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial
              color="#F59E0B"
              emissive="#D97706"
              emissiveIntensity={0.5}
            />
          </mesh>
          <mesh
            position={[
              (point.pos1[0] + point.pos2[0]) / 2,
              point.pos1[1],
              (point.pos1[2] + point.pos2[2]) / 2,
            ]}
            rotation={[
              0,
              Math.atan2(point.pos2[2] - point.pos1[2], point.pos2[0] - point.pos1[0]),
              0,
            ]}
          >
            <cylinderGeometry args={[0.05, 0.05, 4, 8]} />
            <meshStandardMaterial color="#8B5CF6" opacity={0.6} transparent />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Main Scene Component
export function PortfolioScene(props) {
  return (
    <group {...props}>
      {/* Particle Field Background */}
      <ParticleField />

      {/* Central Morphing Sphere */}
      <MorphingSphere />

      {/* Energy Rings around sphere */}
      <EnergyRings />

      {/* Orbiting Rings */}
      <OrbitingRings />

      {/* Geometric Shapes */}
      <GeometricShapes />

      {/* Wave Grid at bottom */}
      <WaveGrid />

      {/* DNA Helix structure */}
      <DNAHelix />

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4F46E5" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        color="#6366F1"
      />
    </group>
  );
}