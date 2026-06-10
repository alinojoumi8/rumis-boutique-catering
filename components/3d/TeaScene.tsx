"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Cup({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current || reduced) return;
    const t = clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t * 0.32) * 0.18;
    group.current.position.y = Math.sin(t * 0.72) * 0.04;
  });

  return (
    <group ref={group} rotation={[0.08, -0.28, 0]} scale={1.05}>
      <mesh position={[0, -0.42, 0]}>
        <cylinderGeometry args={[1.35, 1.58, 0.16, 72]} />
        <meshStandardMaterial color="#fffdf9" roughness={0.42} metalness={0.02} />
      </mesh>
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.72, 0.9, 0.9, 72, 1, true]} />
        <meshStandardMaterial color="#fff8fb" roughness={0.32} metalness={0.02} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.23, 0]}>
        <torusGeometry args={[0.74, 0.045, 16, 72]} />
        <meshStandardMaterial color="#b99655" roughness={0.26} metalness={0.45} />
      </mesh>
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.66, 0.7, 0.035, 72]} />
        <meshStandardMaterial color="#5f344f" roughness={0.55} />
      </mesh>
      <mesh position={[0.88, -0.1, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.29, 0.045, 16, 48, Math.PI * 1.25]} />
        <meshStandardMaterial color="#fff8fb" roughness={0.32} metalness={0.02} />
      </mesh>
      <mesh position={[0, -0.83, 0]} scale={[1.2, 0.18, 1.2]}>
        <sphereGeometry args={[0.52, 48, 16]} />
        <meshStandardMaterial color="#eecef8" roughness={0.58} />
      </mesh>
    </group>
  );
}

function Steam({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const geometries = useMemo(() => {
    return [-0.22, 0, 0.24].map((offset, index) => {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(offset, 0.28, 0),
        new THREE.Vector3(offset + 0.12, 0.72, 0.03),
        new THREE.Vector3(offset - 0.1, 1.1, -0.02),
        new THREE.Vector3(offset + 0.08, 1.48 + index * 0.08, 0.02)
      ]);
      return new THREE.TubeGeometry(curve, 48, 0.014, 8, false);
    });
  }, []);

  useFrame(({ clock }) => {
    if (!group.current || reduced) return;
    const t = clock.getElapsedTime();
    group.current.position.y = Math.sin(t * 0.86) * 0.08;
    group.current.rotation.z = Math.sin(t * 0.4) * 0.05;
  });

  return (
    <group ref={group}>
      {geometries.map((geometry, index) => (
        <mesh key={index} geometry={geometry}>
          <meshBasicMaterial color="#8b6b79" transparent opacity={0.25 - index * 0.035} />
        </mesh>
      ))}
    </group>
  );
}

function Petal({ position, delay, reduced }: { position: [number, number, number]; delay: number; reduced: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!mesh.current || reduced) return;
    const t = clock.getElapsedTime() + delay;
    mesh.current.position.y = position[1] + Math.sin(t * 0.8) * 0.08;
    mesh.current.rotation.z = t * 0.35;
  });

  return (
    <mesh ref={mesh} position={position} rotation={[0.4, 0.2, 0.5]} scale={[0.22, 0.05, 0.12]}>
      <sphereGeometry args={[1, 24, 12]} />
      <meshStandardMaterial color="#eecef8" roughness={0.7} />
    </mesh>
  );
}

export default function TeaScene({ className = "" }: { className?: string }) {
  const reducedMotion = useReducedMotion();
  const reduced = Boolean(reducedMotion);

  return (
    <div className={`${className} h-full w-full`} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.8, 5.2], fov: 42 }}
        dpr={[1, 1.7]}
        frameloop={reduced ? "demand" : "always"}
        style={{ height: "100%", width: "100%" }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[3, 4, 5]} intensity={2.1} />
        <directionalLight position={[-3, 1, 2]} intensity={0.7} color="#eecef8" />
        <group position={[0, -0.25, 0]}>
          <Cup reduced={reduced} />
          <Steam reduced={reduced} />
          <Petal position={[-1.25, 0.9, -0.2]} delay={0.3} reduced={reduced} />
          <Petal position={[1.35, 0.72, 0.1]} delay={1.4} reduced={reduced} />
          <Petal position={[0.95, 1.45, -0.25]} delay={2.1} reduced={reduced} />
        </group>
      </Canvas>
    </div>
  );
}
