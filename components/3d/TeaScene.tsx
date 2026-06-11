"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function AnimatedCup({ reduced }: { reduced: boolean }) {
  const cup = useRef<THREE.Group>(null);
  const tea = useRef<THREE.Mesh>(null);
  const saucer = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (reduced) return;
    const t = clock.getElapsedTime();

    if (cup.current) {
      cup.current.rotation.y = -0.38 + Math.sin(t * 0.42) * 0.24;
      cup.current.rotation.z = Math.sin(t * 0.28) * 0.025;
      cup.current.position.y = Math.sin(t * 0.74) * 0.055;
    }

    if (tea.current) {
      tea.current.rotation.z = t * 0.14;
      tea.current.scale.setScalar(1 + Math.sin(t * 1.8) * 0.012);
    }

    if (saucer.current) {
      saucer.current.rotation.y = t * 0.055;
    }
  });

  return (
    <group ref={cup} position={[0.02, -0.3, 0]} rotation={[0.05, -0.38, 0]} scale={1.08}>
      <mesh ref={saucer} position={[0, -0.74, 0]} scale={[1.8, 0.18, 1.8]}>
        <sphereGeometry args={[0.72, 72, 18]} />
        <meshStandardMaterial color="#fff9f7" roughness={0.34} metalness={0.02} />
      </mesh>
      <mesh position={[0, -0.63, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.02, 0.025, 14, 96]} />
        <meshStandardMaterial color="#c9a85c" roughness={0.22} metalness={0.62} />
      </mesh>

      <mesh position={[0, -0.18, 0]}>
        <cylinderGeometry args={[0.82, 1.04, 1.08, 96, 1, true]} />
        <meshPhysicalMaterial
          color="#fff6fb"
          roughness={0.2}
          metalness={0.02}
          clearcoat={0.74}
          clearcoatRoughness={0.22}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh position={[0, 0.38, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.84, 0.045, 18, 112]} />
        <meshStandardMaterial color="#c9a85c" roughness={0.18} metalness={0.72} />
      </mesh>
      <mesh ref={tea} position={[0, 0.31, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.76, 96]} />
        <meshPhysicalMaterial color="#6c314c" roughness={0.18} metalness={0.08} clearcoat={0.55} />
      </mesh>
      <mesh position={[0, -0.04, 0]}>
        <cylinderGeometry args={[0.58, 0.76, 0.88, 96]} />
        <meshStandardMaterial color="#fff4fa" roughness={0.18} transparent opacity={0.22} side={THREE.BackSide} />
      </mesh>
      <mesh position={[1.03, -0.1, 0.02]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.42, 0.055, 18, 72, Math.PI * 1.23]} />
        <meshPhysicalMaterial color="#fff6fb" roughness={0.22} metalness={0.02} clearcoat={0.68} />
      </mesh>
      <mesh position={[0.01, -0.2, 0.835]} scale={[0.32, 0.02, 0.08]} rotation={[0, 0, -0.1]}>
        <sphereGeometry args={[1, 28, 12]} />
        <meshStandardMaterial color="#d6a9dc" roughness={0.6} />
      </mesh>
      <mesh position={[-0.28, 0.03, 0.845]} scale={[0.2, 0.018, 0.055]} rotation={[0, 0, 0.4]}>
        <sphereGeometry args={[1, 28, 12]} />
        <meshStandardMaterial color="#b99655" roughness={0.46} metalness={0.12} />
      </mesh>
    </group>
  );
}

function SteamRibbon({
  x,
  delay,
  reduced
}: {
  x: number;
  delay: number;
  reduced: boolean;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(x, 0.22, 0),
      new THREE.Vector3(x + 0.16, 0.72, 0.05),
      new THREE.Vector3(x - 0.14, 1.12, -0.02),
      new THREE.Vector3(x + 0.12, 1.55, 0.04),
      new THREE.Vector3(x - 0.08, 1.9, 0)
    ]);
    return new THREE.TubeGeometry(curve, 80, 0.017, 10, false);
  }, [x]);

  useFrame(({ clock }) => {
    if (!mesh.current || reduced) return;
    const t = clock.getElapsedTime() + delay;
    mesh.current.position.y = Math.sin(t * 0.9) * 0.09;
    mesh.current.position.x = Math.sin(t * 0.55) * 0.045;
    mesh.current.rotation.z = Math.sin(t * 0.48) * 0.12;
  });

  return (
    <mesh ref={mesh} geometry={geometry}>
      <meshBasicMaterial color="#f8e9ff" transparent opacity={0.28} />
    </mesh>
  );
}

function FloatingPetal({
  radius,
  speed,
  delay,
  y,
  reduced
}: {
  radius: number;
  speed: number;
  delay: number;
  y: number;
  reduced: boolean;
}) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!mesh.current || reduced) return;
    const t = clock.getElapsedTime() * speed + delay;
    mesh.current.position.x = Math.cos(t) * radius;
    mesh.current.position.z = Math.sin(t) * radius * 0.28;
    mesh.current.position.y = y + Math.sin(t * 1.6) * 0.1;
    mesh.current.rotation.set(0.4 + Math.sin(t) * 0.2, t * 0.55, t);
  });

  return (
    <mesh ref={mesh} position={[radius, y, 0]} scale={[0.22, 0.045, 0.12]}>
      <sphereGeometry args={[1, 24, 12]} />
      <meshStandardMaterial color="#eecef8" roughness={0.68} />
    </mesh>
  );
}

function LightHalo({ reduced }: { reduced: boolean }) {
  const halo = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!halo.current || reduced) return;
    halo.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.22) * 0.08;
  });

  return (
    <group ref={halo} position={[0, 0.03, -0.64]}>
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[1.78, 0.01, 8, 128]} />
        <meshBasicMaterial color="#b99655" transparent opacity={0.36} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 5]}>
        <torusGeometry args={[1.35, 0.008, 8, 128]} />
        <meshBasicMaterial color="#eecef8" transparent opacity={0.22} />
      </mesh>
    </group>
  );
}

export default function TeaScene({ className = "" }: { className?: string }) {
  const reducedMotion = useReducedMotion();
  const reduced = Boolean(reducedMotion);

  return (
    <div className={`${className} h-full w-full`} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.78, 5.45], fov: 40 }}
        dpr={[1, 1.75]}
        frameloop={reduced ? "demand" : "always"}
        gl={{ alpha: true, antialias: true }}
        style={{ height: "100%", width: "100%" }}
      >
        <ambientLight intensity={1.15} />
        <spotLight position={[0, 4.2, 4.4]} angle={0.42} penumbra={0.88} intensity={3.8} color="#fff3dc" />
        <directionalLight position={[3.6, 2.4, 3.5]} intensity={1.85} color="#f9dca2" />
        <directionalLight position={[-3.4, 1.4, 1.8]} intensity={1.05} color="#eecef8" />
        <pointLight position={[0, 0.6, 2.4]} intensity={1.4} color="#c9a85c" />
        <group position={[0.1, -0.08, 0]}>
          <LightHalo reduced={reduced} />
          <AnimatedCup reduced={reduced} />
          <SteamRibbon x={-0.22} delay={0.1} reduced={reduced} />
          <SteamRibbon x={0.04} delay={0.8} reduced={reduced} />
          <SteamRibbon x={0.28} delay={1.45} reduced={reduced} />
          <FloatingPetal radius={1.55} speed={0.32} delay={0.4} y={0.96} reduced={reduced} />
          <FloatingPetal radius={1.22} speed={-0.38} delay={1.7} y={1.28} reduced={reduced} />
          <FloatingPetal radius={1.84} speed={0.28} delay={2.8} y={0.58} reduced={reduced} />
        </group>
        <mesh position={[0, -1.22, -0.35]} scale={[2.25, 0.18, 1.05]}>
          <sphereGeometry args={[1, 48, 16]} />
          <meshBasicMaterial color="#171018" transparent opacity={0.35} />
        </mesh>
      </Canvas>
    </div>
  );
}
