import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Scene Setup ──────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Colors ───────────────────────────────────────────────────────────────
    const GREEN  = new THREE.Color('#3fb950');
    const BLUE   = new THREE.Color('#2f81f7');
    const DIM    = new THREE.Color('#30363d');

    // ── 1. Particle Field ─────────────────────────────────────────────────────
    const PARTICLE_COUNT = 280;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors    = new Float32Array(PARTICLE_COUNT * 3);
    const sizes     = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 180;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;

      const c = Math.random() < 0.4 ? GREEN : Math.random() < 0.6 ? BLUE : DIM;
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      sizes[i] = Math.random() * 1.8 + 0.4;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color',    new THREE.BufferAttribute(colors,    3));
    particleGeo.setAttribute('size',     new THREE.BufferAttribute(sizes,     1));

    const particleMat = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ── 2. Wireframe Icosahedron (right — green) ─────────────────────────────
    const icoGeoRight = new THREE.IcosahedronGeometry(9, 1);
    const icoMatRight = new THREE.MeshBasicMaterial({
      color: GREEN,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const icoRight = new THREE.Mesh(icoGeoRight, icoMatRight);
    icoRight.position.set(32, 0, -10);
    scene.add(icoRight);

    // ── 3. Wireframe Icosahedron ──────────────────────────────────────────────
    const icoGeo = new THREE.IcosahedronGeometry(7, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: BLUE,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    icoMesh.position.set(-32, 8, -5);
    scene.add(icoMesh);

    // ── 4. Floating Ring ──────────────────────────────────────────────────────
    const ringGeo = new THREE.TorusGeometry(5, 0.25, 8, 60);
    const ringMat = new THREE.MeshBasicMaterial({
      color: GREEN,
      transparent: true,
      opacity: 0.25,
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.position.set(0, -18, 5);
    ring1.rotation.x = Math.PI / 3;
    scene.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo.clone(), new THREE.MeshBasicMaterial({ color: BLUE, transparent: true, opacity: 0.2 }));
    ring2.position.set(-18, 14, -15);
    ring2.rotation.set(0.5, 0.9, 0.3);
    scene.add(ring2);

    // ── 5. Constellation Lines ────────────────────────────────────────────────
    const lineMat = new THREE.LineBasicMaterial({ color: '#3fb950', transparent: true, opacity: 0.08 });
    const MAX_DIST = 28;
    const lineGroup = new THREE.Group();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const dx = positions[i * 3]     - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < MAX_DIST) {
          const pts = [
            new THREE.Vector3(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]),
            new THREE.Vector3(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]),
          ];
          const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
          lineGroup.add(new THREE.Line(lineGeo, lineMat));
        }
      }
    }
    scene.add(lineGroup);

    // ── Mouse reactive camera drift ───────────────────────────────────────────
    let targetX = 0, targetY = 0;
    const onMouseMove = (e) => {
      targetX = (e.clientX / window.innerWidth  - 0.5) * 8;
      targetY = (e.clientY / window.innerHeight - 0.5) * -4;
    };
    window.addEventListener('mousemove', onMouseMove);

    // ── Resize handler ────────────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    // ── Animation Loop ────────────────────────────────────────────────────────
    let frame = 0;
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      frame += 0.004;

      // Smooth camera drift
      camera.position.x += (targetX - camera.position.x) * 0.03;
      camera.position.y += (targetY - camera.position.y) * 0.03;
      camera.lookAt(scene.position);

      // Rotate objects
      icoRight.rotation.x = frame * 0.4;
      icoRight.rotation.y = frame * 0.55;

      icoMesh.rotation.x = frame * 0.5;
      icoMesh.rotation.z = frame * 0.3;

      ring1.rotation.z = frame * 0.5;
      ring2.rotation.x = frame * 0.4;
      ring2.rotation.y = frame * 0.6;

      // Drift particles slowly
      particles.rotation.y = frame * 0.04;
      particles.rotation.x = frame * 0.015;

      // Breathing opacity
      particleMat.opacity = 0.6 + Math.sin(frame * 2) * 0.15;

      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default ThreeBackground;
