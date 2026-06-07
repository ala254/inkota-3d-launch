import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, OrbitControls, Stars, MeshDistortMaterial, RoundedBox } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function Globe() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, dt) => {
    ref.current.rotation.y += dt * 0.25;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={1}>
      <group position={[0, 0, 0]}>
        <Sphere ref={ref} args={[1.4, 64, 64]}>
          <MeshDistortMaterial color="#0B2E6B" distort={0.15} speed={1.5} roughness={0.2} metalness={0.8} />
        </Sphere>
        {/* wireframe overlay */}
        <Sphere args={[1.42, 32, 32]}>
          <meshBasicMaterial color="#F9A826" wireframe transparent opacity={0.25} />
        </Sphere>
        {/* orbiting rings */}
        <mesh rotation={[Math.PI / 2.3, 0, 0]}>
          <torusGeometry args={[2, 0.01, 16, 100]} />
          <meshBasicMaterial color="#F9A826" transparent opacity={0.6} />
        </mesh>
        <mesh rotation={[Math.PI / 1.5, Math.PI / 4, 0]}>
          <torusGeometry args={[2.3, 0.008, 16, 100]} />
          <meshBasicMaterial color="#F9A826" transparent opacity={0.4} />
        </mesh>
      </group>
    </Float>
  );
}

function Laptop({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.5} position={position}>
      <group rotation={[-0.2, 0.4, 0.1]}>
        {/* base */}
        <RoundedBox args={[1.6, 0.08, 1.1]} radius={0.04}>
          <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.2} />
        </RoundedBox>
        {/* screen */}
        <group position={[0, 0.55, -0.5]} rotation={[-0.3, 0, 0]}>
          <RoundedBox args={[1.6, 1.1, 0.06]} radius={0.04}>
            <meshStandardMaterial color="#0B2E6B" metalness={0.9} roughness={0.2} />
          </RoundedBox>
          <mesh position={[0, 0, 0.035]}>
            <planeGeometry args={[1.5, 1]} />
            <meshBasicMaterial color="#F9A826" />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

function Phone({ position }: { position: [number, number, number] }) {
  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1.5} position={position}>
      <group rotation={[0.2, -0.5, 0.3]}>
        <RoundedBox args={[0.55, 1.05, 0.06]} radius={0.08}>
          <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.15} />
        </RoundedBox>
        <mesh position={[0, 0, 0.035]}>
          <planeGeometry args={[0.48, 0.95]} />
          <meshBasicMaterial color="#0B2E6B" />
        </mesh>
        <mesh position={[0, 0.2, 0.04]}>
          <planeGeometry args={[0.4, 0.15]} />
          <meshBasicMaterial color="#F9A826" />
        </mesh>
      </group>
    </Float>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null!);
  const count = 400;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 18;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
  }
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.03;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#F9A826" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

export function Hero3D() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 2]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-5, -3, -5]} intensity={0.8} color="#F9A826" />
        <Stars radius={50} depth={50} count={1500} factor={3} fade speed={1} />
        <Particles />
        <Globe />
        <Laptop position={[-2.8, 0.8, 0.5]} />
        <Phone position={[2.7, -0.6, 0.8]} />
        <Phone position={[2.4, 1.2, -0.5]} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 2.5} />
      </Suspense>
    </Canvas>
  );
}
