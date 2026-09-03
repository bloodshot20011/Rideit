import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

export default function Car3DViewer({
  className = '',
  initialColor = '#1e5bb5',
  autoRotateDefault = true,
  showControls = true
}) {
  const mountRef = useRef(null);
  const [currentColor, setCurrentColor] = useState(initialColor);
  const [headlightsOn, setHeadlightsOn] = useState(true);
  const [autoRotate, setAutoRotate] = useState(autoRotateDefault);
  const [activeView, setActiveView] = useState('front-left');
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // References for Three.js state
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const carGroupRef = useRef(null);
  const carPaintMaterialsRef = useRef([]);
  const lightsRef = useRef([]);
  const animFrameIdRef = useRef(null);

  // Mouse drag rotation state
  const mouseState = useRef({
    isDown: false,
    prevX: 0,
    prevY: 0,
    rotX: 0.2,
    rotY: 0.8,
    targetRotX: 0.2,
    targetRotY: 0.8,
    targetZoom: 6.2,
    currentZoom: 6.2
  });

  const COLOR_PALETTES = [
    { id: 'blue', name: 'Apex Blue Metallic', hex: '#1e5bb5' },
    { id: 'white', name: 'Pearl White Crystal', hex: '#f0f3f8' },
    { id: 'black', name: 'Obsidian Midnight', hex: '#111215' },
    { id: 'red', name: 'Crimson Sport Red', hex: '#b51a24' },
    { id: 'silver', name: 'Titanium Silver', hex: '#8c939d' }
  ];

  const VIEW_PRESETS = [
    { id: 'front-left', label: 'Front-Left', rotY: 0.8, rotX: 0.2, zoom: 6.0 },
    { id: 'front', label: 'Front View', rotY: 0.0, rotX: 0.1, zoom: 5.8 },
    { id: 'side', label: 'Side Profile', rotY: 1.57, rotX: 0.1, zoom: 6.2 },
    { id: 'rear-right', label: 'Rear-Right', rotY: 2.5, rotX: 0.2, zoom: 6.0 },
    { id: 'rear', label: 'Rear View', rotY: 3.14, rotX: 0.15, zoom: 5.8 },
    { id: 'top', label: 'Top View', rotY: 1.57, rotX: 1.3, zoom: 7.0 }
  ];

  const HOTSPOTS = [
    {
      id: 'headlight',
      title: 'Matrix LED Headlamps',
      desc: 'High-intensity projector beams with signature DRL light bar.',
      pos: { x: 0.8, y: 0.6, z: 1.8 }
    },
    {
      id: 'wheel',
      title: '18" Multi-Spoke Sport Alloys',
      desc: 'Diamond-cut aerodynamic alloys with red sport brake calipers.',
      pos: { x: 1.0, y: 0.35, z: 1.2 }
    },
    {
      id: 'cabin',
      title: '5-Seater Executive Cabin',
      desc: 'Ergonomic leather seating, acoustic glass and smart climate control.',
      pos: { x: 0.0, y: 1.0, z: -0.2 }
    },
    {
      id: 'rear',
      title: 'Aero Diffuser & LED Tail-Bar',
      desc: 'Full-width connected rear taillight with dual sport exhaust tips.',
      pos: { x: -0.6, y: 0.7, z: -1.9 }
    }
  ];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0c10);
    scene.fog = new THREE.FogExp2(0x0a0c10, 0.06);
    sceneRef.current = scene;

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 6.2);
    cameraRef.current = camera;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Studio Showroom Lighting
    const ambientLight = new THREE.AmbientLight(0xdde5ff, 0.7);
    scene.add(ambientLight);

    const mainKeyLight = new THREE.SpotLight(0xffffff, 2.5);
    mainKeyLight.position.set(5, 7, 5);
    mainKeyLight.angle = 0.6;
    mainKeyLight.penumbra = 0.8;
    mainKeyLight.castShadow = true;
    mainKeyLight.shadow.mapSize.width = 1024;
    mainKeyLight.shadow.mapSize.height = 1024;
    mainKeyLight.shadow.bias = -0.0005;
    scene.add(mainKeyLight);

    const rimLight = new THREE.SpotLight(0x0088ff, 3.5);
    rimLight.position.set(-6, 5, -5);
    rimLight.angle = 0.8;
    rimLight.penumbra = 0.9;
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xe8f0ff, 1.0);
    fillLight.position.set(0, 5, 4);
    scene.add(fillLight);

    const bottomUnderglow = new THREE.PointLight(0x2170e4, 1.5, 6);
    bottomUnderglow.position.set(0, 0.1, 0);
    scene.add(bottomUnderglow);

    // 5. Turntable Stage / Studio Ground Plane
    const stageGroup = new THREE.Group();

    // Floor Disc
    const floorGeo = new THREE.CylinderGeometry(4.2, 4.4, 0.15, 64);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x141824,
      roughness: 0.25,
      metalness: 0.6
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.position.y = -0.075;
    floorMesh.receiveShadow = true;
    stageGroup.add(floorMesh);

    // Turntable Glowing Rim Ring
    const rimGeo = new THREE.TorusGeometry(4.25, 0.035, 16, 100);
    const rimMat = new THREE.MeshBasicMaterial({ color: 0x2170e4 });
    const rimMesh = new THREE.Mesh(rimGeo, rimMat);
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.y = 0.01;
    stageGroup.add(rimMesh);

    // Grid Floor Outer
    const gridHelper = new THREE.GridHelper(24, 24, 0x1e2638, 0x111622);
    gridHelper.position.y = -0.08;
    stageGroup.add(gridHelper);

    scene.add(stageGroup);

    // 6. Build Procedural High-Fidelity 3D Car Model
    const carGroup = new THREE.Group();
    carGroupRef.current = carGroup;
    carPaintMaterialsRef.current = [];

    // Metallic Car Paint Material
    const carPaintMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(currentColor),
      metalness: 0.82,
      roughness: 0.18,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.95
    });
    carPaintMaterialsRef.current.push(carPaintMat);

    const darkTrimMat = new THREE.MeshStandardMaterial({
      color: 0x0d0e12,
      roughness: 0.3,
      metalness: 0.7
    });

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.95,
      roughness: 0.05
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x111622,
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.9,
      transparent: true,
      opacity: 0.75,
      ior: 1.5
    });

    const headlightGlassMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: headlightsOn ? 0xd0e8ff : 0x222222,
      emissiveIntensity: headlightsOn ? 3.0 : 0.0,
      roughness: 0.1,
      metalness: 0.9
    });

    const taillightGlassMat = new THREE.MeshStandardMaterial({
      color: 0xff1e27,
      emissive: headlightsOn ? 0xff1e27 : 0x440000,
      emissiveIntensity: headlightsOn ? 3.5 : 0.2,
      roughness: 0.2
    });

    lightsRef.current = [headlightGlassMat, taillightGlassMat];

    // --- CAR BODY CHASSIS GEOMETRIES ---
    // Lower Body
    const lowerBodyGeo = new THREE.BoxGeometry(1.85, 0.55, 4.3);
    const lowerBodyMesh = new THREE.Mesh(lowerBodyGeo, carPaintMat);
    lowerBodyMesh.position.set(0, 0.52, 0);
    lowerBodyMesh.castShadow = true;
    lowerBodyMesh.receiveShadow = true;
    carGroup.add(lowerBodyMesh);

    // Front Hood Slope
    const hoodGeo = new THREE.BoxGeometry(1.8, 0.22, 1.4);
    const hoodMesh = new THREE.Mesh(hoodGeo, carPaintMat);
    hoodMesh.position.set(0, 0.68, 1.35);
    hoodMesh.rotation.x = 0.08;
    hoodMesh.castShadow = true;
    carGroup.add(hoodMesh);

    // Aerodynamic Cabin Roof (Greenhouse)
    const cabinGeo = new THREE.CylinderGeometry(0.78, 0.92, 2.2, 4);
    const cabinMesh = new THREE.Mesh(cabinGeo, glassMat);
    cabinMesh.rotation.y = Math.PI / 4;
    cabinMesh.rotation.x = Math.PI / 2;
    cabinMesh.scale.set(1.0, 0.9, 0.52);
    cabinMesh.position.set(0, 1.05, -0.1);
    cabinMesh.castShadow = true;
    carGroup.add(cabinMesh);

    // Roof Top Shell
    const roofGeo = new THREE.BoxGeometry(1.4, 0.08, 1.7);
    const roofMesh = new THREE.Mesh(roofGeo, darkTrimMat);
    roofMesh.position.set(0, 1.28, -0.15);
    roofMesh.castShadow = true;
    carGroup.add(roofMesh);

    // Front Hexagonal Grille
    const grilleGeo = new THREE.BoxGeometry(1.2, 0.35, 0.1);
    const grilleMat = new THREE.MeshStandardMaterial({ color: 0x050608, roughness: 0.9, metalness: 0.2 });
    const grilleMesh = new THREE.Mesh(grilleGeo, grilleMat);
    grilleMesh.position.set(0, 0.42, 2.16);
    carGroup.add(grilleMesh);

    // Front License Plate
    const plateGeo = new THREE.BoxGeometry(0.45, 0.12, 0.04);
    const plateMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });
    const plateMesh = new THREE.Mesh(plateGeo, plateMat);
    plateMesh.position.set(0, 0.36, 2.22);
    carGroup.add(plateMesh);

    // Front Headlight Strips (Left & Right)
    const hlGeo = new THREE.BoxGeometry(0.42, 0.1, 0.2);
    const hlLeft = new THREE.Mesh(hlGeo, headlightGlassMat);
    hlLeft.position.set(0.65, 0.65, 2.12);
    hlLeft.rotation.y = -0.2;
    carGroup.add(hlLeft);

    const hlRight = new THREE.Mesh(hlGeo, headlightGlassMat);
    hlRight.position.set(-0.65, 0.65, 2.12);
    hlRight.rotation.y = 0.2;
    carGroup.add(hlRight);

    // Rear Connected Taillight Bar
    const tlGeo = new THREE.BoxGeometry(1.65, 0.09, 0.12);
    const tlMesh = new THREE.Mesh(tlGeo, taillightGlassMat);
    tlMesh.position.set(0, 0.8, -2.15);
    carGroup.add(tlMesh);

    // Rear Diffuser & Exhaust Tips
    const diffuserGeo = new THREE.BoxGeometry(1.4, 0.2, 0.2);
    const diffuserMesh = new THREE.Mesh(diffuserGeo, darkTrimMat);
    diffuserMesh.position.set(0, 0.3, -2.12);
    carGroup.add(diffuserMesh);

    const exhaustGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.1, 16);
    const exhaustLeft = new THREE.Mesh(exhaustGeo, chromeMat);
    exhaustLeft.rotation.x = Math.PI / 2;
    exhaustLeft.position.set(0.5, 0.24, -2.18);
    carGroup.add(exhaustLeft);

    const exhaustRight = new THREE.Mesh(exhaustGeo, chromeMat);
    exhaustRight.rotation.x = Math.PI / 2;
    exhaustRight.position.set(-0.5, 0.24, -2.18);
    carGroup.add(exhaustRight);

    // Side Mirrors
    const mirrorGeo = new THREE.BoxGeometry(0.2, 0.1, 0.12);
    const mirrorLeft = new THREE.Mesh(mirrorGeo, darkTrimMat);
    mirrorLeft.position.set(0.98, 0.95, 0.65);
    carGroup.add(mirrorLeft);

    const mirrorRight = new THREE.Mesh(mirrorGeo, darkTrimMat);
    mirrorRight.position.set(-0.98, 0.95, 0.65);
    carGroup.add(mirrorRight);

    // --- WHEELS & SPORT BRAKE ASSEMBLIES (4 Corners) ---
    const wheelPositions = [
      { x: 0.92, y: 0.35, z: 1.25 },   // Front Right
      { x: -0.92, y: 0.35, z: 1.25 },  // Front Left
      { x: 0.92, y: 0.35, z: -1.35 },  // Rear Right
      { x: -0.92, y: 0.35, z: -1.35 }   // Rear Left
    ];

    const tireMat = new THREE.MeshStandardMaterial({ color: 0x16171a, roughness: 0.85, metalness: 0.1 });
    const rimCenterMat = new THREE.MeshStandardMaterial({ color: 0x222630, metalness: 0.9, roughness: 0.2 });
    const caliperMat = new THREE.MeshStandardMaterial({ color: 0xe53935, metalness: 0.6, roughness: 0.3 });

    wheelPositions.forEach((pos, idx) => {
      const wheelAssembly = new THREE.Group();
      wheelAssembly.position.set(pos.x, pos.y, pos.z);

      // Rubber Tire
      const tireGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.24, 28);
      const tireMesh = new THREE.Mesh(tireGeo, tireMat);
      tireMesh.rotation.z = Math.PI / 2;
      tireMesh.castShadow = true;
      wheelAssembly.add(tireMesh);

      // Alloy Rim Face
      const rimFaceGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.25, 16);
      const rimFaceMesh = new THREE.Mesh(rimFaceGeo, rimCenterMat);
      rimFaceMesh.rotation.z = Math.PI / 2;
      wheelAssembly.add(rimFaceMesh);

      // Chrome Rim Spokes
      for (let s = 0; s < 5; s++) {
        const spokeGeo = new THREE.BoxGeometry(0.04, 0.44, 0.26);
        const spokeMesh = new THREE.Mesh(spokeGeo, chromeMat);
        spokeMesh.rotation.x = (s * Math.PI) / 2.5;
        wheelAssembly.add(spokeMesh);
      }

      // Red Sport Brake Caliper
      const caliperGeo = new THREE.BoxGeometry(0.08, 0.14, 0.08);
      const caliperMesh = new THREE.Mesh(caliperGeo, caliperMat);
      caliperMesh.position.set(pos.x > 0 ? -0.04 : 0.04, 0.14, 0);
      wheelAssembly.add(caliperMesh);

      carGroup.add(wheelAssembly);
    });

    scene.add(carGroup);

    // 7. Mouse & Touch Event Handlers for 360 Rotation
    const handleMouseDown = (e) => {
      mouseState.current.isDown = true;
      mouseState.current.prevX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      mouseState.current.prevY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
      setIsDragging(true);
    };

    const handleMouseMove = (e) => {
      if (!mouseState.current.isDown) return;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

      const deltaX = clientX - mouseState.current.prevX;
      const deltaY = clientY - mouseState.current.prevY;

      mouseState.current.targetRotY += deltaX * 0.008;
      mouseState.current.targetRotX = Math.max(0.05, Math.min(1.2, mouseState.current.targetRotX + deltaY * 0.005));

      mouseState.current.prevX = clientX;
      mouseState.current.prevY = clientY;
    };

    const handleMouseUp = () => {
      mouseState.current.isDown = false;
      setIsDragging(false);
    };

    const handleWheel = (e) => {
      e.preventDefault();
      mouseState.current.targetZoom = Math.max(4.5, Math.min(8.5, mouseState.current.targetZoom + e.deltaY * 0.004));
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', handleMouseDown);
    domEl.addEventListener('touchstart', handleMouseDown, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleMouseMove, { passive: true });
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    domEl.addEventListener('wheel', handleWheel, { passive: false });

    // 8. Resize Handler
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // 9. Animation Render Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Auto rotation when not dragging
      if (autoRotate && !mouseState.current.isDown) {
        mouseState.current.targetRotY += delta * 0.35;
      }

      // Smooth interpolation (Damping)
      mouseState.current.rotY += (mouseState.current.targetRotY - mouseState.current.rotY) * 0.08;
      mouseState.current.rotX += (mouseState.current.targetRotX - mouseState.current.rotX) * 0.08;
      mouseState.current.currentZoom += (mouseState.current.targetZoom - mouseState.current.currentZoom) * 0.08;

      // Position Camera Spherical Orbit
      const radius = mouseState.current.currentZoom;
      const phi = mouseState.current.rotX;
      const theta = mouseState.current.rotY;

      camera.position.x = radius * Math.sin(theta) * Math.cos(phi);
      camera.position.y = Math.max(0.6, radius * Math.sin(phi) + 0.4);
      camera.position.z = radius * Math.cos(theta) * Math.cos(phi);
      camera.lookAt(0, 0.6, 0);

      // Gentle floating/suspension breath
      if (carGroupRef.current) {
        carGroupRef.current.position.y = Math.sin(clock.getElapsedTime() * 1.5) * 0.015;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animFrameIdRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
      domEl.removeEventListener('mousedown', handleMouseDown);
      domEl.removeEventListener('touchstart', handleMouseDown);
      domEl.removeEventListener('wheel', handleWheel);
      if (renderer) renderer.dispose();
    };
  }, [autoRotate]);

  // Update Car Paint Color
  const handleColorChange = (colorHex) => {
    setCurrentColor(colorHex);
    carPaintMaterialsRef.current.forEach(mat => {
      mat.color.set(colorHex);
    });
  };

  // Toggle Headlights
  const handleToggleHeadlights = () => {
    const newState = !headlightsOn;
    setHeadlightsOn(newState);
    if (lightsRef.current[0]) {
      lightsRef.current[0].emissiveIntensity = newState ? 3.0 : 0.0;
    }
    if (lightsRef.current[1]) {
      lightsRef.current[1].emissiveIntensity = newState ? 3.5 : 0.2;
    }
  };

  // Switch View Preset
  const handleViewPreset = (preset) => {
    setActiveView(preset.id);
    mouseState.current.targetRotY = preset.rotY;
    mouseState.current.targetRotX = preset.rotX;
    mouseState.current.targetZoom = preset.zoom;
  };

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#0e121c] via-[#0a0c10] to-[#06070a] border border-white/10 shadow-2xl text-white select-none ${className}`}>
      {/* 3D WebGL Canvas Viewport */}
      <div
        ref={mountRef}
        className={`w-full h-[380px] sm:h-[480px] lg:h-[540px] cursor-${isDragging ? 'grabbing' : 'grab'}`}
      />

      {/* Top Header Badge & 360 Indicator */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
        <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="font-headline font-bold text-xs uppercase tracking-wider text-white">
            Realtime 3D Studio
          </span>
          <span className="text-[10px] text-white/60">| Drag to Rotate 360°</span>
        </div>

        {/* Specs Pills (Matching Reference Image) */}
        <div className="hidden sm:flex items-center gap-2 pointer-events-auto">
          <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-center text-[10px] text-white/80">
            <span className="material-symbols-outlined text-sm block mx-auto text-primary-fixed">group</span>
            5 Seater
          </div>
          <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-center text-[10px] text-white/80">
            <span className="material-symbols-outlined text-sm block mx-auto text-primary-fixed">local_gas_station</span>
            Petrol / Hybrid
          </div>
          <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-center text-[10px] text-white/80">
            <span className="material-symbols-outlined text-sm block mx-auto text-primary-fixed">settings</span>
            Automatic
          </div>
          <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-center text-[10px] text-white/80">
            <span className="material-symbols-outlined text-sm block mx-auto text-primary-fixed">luggage</span>
            Spacious Boot
          </div>
        </div>
      </div>

      {/* Floating 360 Degree Turntable Center Cue */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 pointer-events-none text-center">
        <div className="inline-flex items-center gap-1.5 bg-primary/20 backdrop-blur-md text-primary-fixed px-3 py-1 rounded-full border border-primary/40 text-xs font-headline font-bold shadow-md">
          <span className="material-symbols-outlined text-sm animate-spin" style={{ animationDuration: '8s' }}>
            360
          </span>
          <span>Interactive 360° View</span>
        </div>
      </div>

      {/* Control Action Bar */}
      {showControls && (
        <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 bg-black/70 backdrop-blur-md p-3 rounded-xl border border-white/15">
          {/* Color Customizer Swatches */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-white/70 hidden sm:inline">Color:</span>
            {COLOR_PALETTES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => handleColorChange(c.hex)}
                className={`w-6 h-6 rounded-full transition-transform cursor-pointer border-2 ${
                  currentColor === c.hex ? 'scale-125 border-white shadow-md' : 'border-transparent opacity-75 hover:opacity-100'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>

          {/* Camera View Angle Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            {VIEW_PRESETS.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => handleViewPreset(v)}
                className={`px-2.5 py-1 rounded-lg text-xs font-headline font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeView === v.id
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>

          {/* Toggles: Auto Rotate & Headlights */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleHeadlights}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1 border transition-colors cursor-pointer ${
                headlightsOn
                  ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
                  : 'bg-white/10 text-white/60 border-white/10'
              }`}
              title="Toggle Headlights"
            >
              <span className="material-symbols-outlined text-sm">
                {headlightsOn ? 'light_mode' : 'dark_mode'}
              </span>
              <span className="hidden md:inline">{headlightsOn ? 'Lights ON' : 'Lights OFF'}</span>
            </button>

            <button
              type="button"
              onClick={() => setAutoRotate(!autoRotate)}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1 border transition-colors cursor-pointer ${
                autoRotate
                  ? 'bg-primary/30 text-primary-fixed border-primary/50'
                  : 'bg-white/10 text-white/60 border-white/10'
              }`}
              title="Toggle Turntable Rotation"
            >
              <span className="material-symbols-outlined text-sm">sync</span>
              <span className="hidden md:inline">{autoRotate ? 'Rotate: ON' : 'Rotate: PAUSED'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
