"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function createParticleField({ color, count, spread, opacity }) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const phases = new Float32Array(count);

  for (let index = 0; index < count; index += 1) {
    const stride = index * 3;
    const radius = spread * (0.28 + Math.random() * 0.72);
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[stride] = radius * Math.sin(phi) * Math.cos(theta);
    positions[stride + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[stride + 2] = radius * Math.cos(phi);
    phases[index] = Math.random() * Math.PI * 2;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("phase", new THREE.BufferAttribute(phases, 1));

  const material = new THREE.PointsMaterial({
    color,
    size: 0.11,
    transparent: true,
    opacity,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });

  const points = new THREE.Points(geometry, material);
  return { geometry, material, points };
}

function createOrb({ color, scale = 1, x = 0, y = 0, z = 0 }) {
  const geometry = new THREE.SphereGeometry(1.35, 40, 40);
  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.06,
    depthWrite: false,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  mesh.scale.setScalar(scale);
  mesh.userData.base = { x, y, z };
  return { geometry, material, mesh };
}

export default function SiteAmbientScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current || prefersReducedMotion()) {
      return undefined;
    }

    const host = mountRef.current;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf7f1ed, 0.02);

    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.className = "h-full w-full";
    host.appendChild(renderer.domElement);

    const warmField = createParticleField({
      color: 0x7a1c2f,
      count: 180,
      spread: 16,
      opacity: 0.22,
    });
    warmField.points.position.set(-5.5, 1.4, -7);
    scene.add(warmField.points);

    const coolField = createParticleField({
      color: 0xaed4ff,
      count: 180,
      spread: 16,
      opacity: 0.24,
    });
    coolField.points.position.set(5.5, -1.4, -8);
    scene.add(coolField.points);

    const orbs = [
      createOrb({ color: 0x7a1c2f, scale: 2.4, x: -6.8, y: 3.8, z: -6 }),
      createOrb({ color: 0xaed4ff, scale: 3.2, x: 6.8, y: -3.2, z: -8 }),
      createOrb({ color: 0xffffff, scale: 1.8, x: 0.8, y: 5.2, z: -5 }),
    ];

    orbs.forEach(({ mesh }) => scene.add(mesh));

    const rings = [
      {
        geometry: new THREE.TorusGeometry(4.4, 0.02, 12, 160),
        material: new THREE.MeshBasicMaterial({ color: 0x7a1c2f, transparent: true, opacity: 0.12 }),
      },
      {
        geometry: new THREE.TorusGeometry(4.4, 0.02, 12, 160),
        material: new THREE.MeshBasicMaterial({ color: 0xaed4ff, transparent: true, opacity: 0.11 }),
      },
    ].map((ring) => ({
      ...ring,
      mesh: new THREE.Mesh(ring.geometry, ring.material),
    }));

    rings[0].mesh.position.set(-7, -4.5, -9);
    rings[0].mesh.rotation.set(Math.PI / 2.1, 0.1, 0.35);
    rings[1].mesh.position.set(7.3, 4.2, -10);
    rings[1].mesh.rotation.set(Math.PI / 2.4, -0.2, -0.28);
    rings.forEach(({ mesh }) => scene.add(mesh));

    let frameId = 0;
    let time = 0;

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    resize();

    const animate = () => {
      time += 0.008;

      warmField.points.rotation.z += 0.0008;
      warmField.points.rotation.y += 0.0005;
      coolField.points.rotation.z -= 0.0007;
      coolField.points.rotation.y -= 0.0004;

      orbs.forEach((orb, index) => {
        const phase = time * (0.8 + index * 0.15);
        const { x, y, z } = orb.mesh.userData.base;
        orb.mesh.position.x = x + Math.cos(phase * 0.9) * 0.55;
        orb.mesh.position.y = y + Math.sin(phase) * 0.45;
        orb.mesh.position.z = z;
        orb.mesh.rotation.z += 0.0025 + index * 0.0002;
        orb.mesh.rotation.y += 0.0018 + index * 0.0002;
      });

      rings.forEach((ring, index) => {
        ring.mesh.rotation.z += index === 0 ? 0.0016 : -0.0014;
        ring.mesh.rotation.y += index === 0 ? 0.0005 : -0.0004;
      });

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", onResize);
      window.cancelAnimationFrame(frameId);
      renderer.dispose();
      warmField.geometry.dispose();
      warmField.material.dispose();
      coolField.geometry.dispose();
      coolField.material.dispose();
      rings.forEach((ring) => {
        ring.geometry.dispose();
        ring.material.dispose();
      });
      orbs.forEach(({ geometry, material }) => {
        geometry.dispose();
        material.dispose();
      });
      if (host.contains(renderer.domElement)) {
        host.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      aria-hidden
      ref={mountRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-90"
      style={{
        background:
          "radial-gradient(circle at top left, rgba(122,28,47,0.08), transparent 32%), radial-gradient(circle at bottom right, rgba(174,212,255,0.10), transparent 28%), linear-gradient(180deg, #fff9f6 0%, #fbf7f4 55%, #f9fbff 100%)",
      }}
    />
  );
}
