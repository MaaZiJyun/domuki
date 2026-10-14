"use client";

import { useEffect, useRef, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import * as THREE from "three";

type LightingRig = {
  hemisphere: THREE.HemisphereLight;
  sunlight: THREE.DirectionalLight;
  lantern: THREE.PointLight;
  scene: THREE.Scene;
};

const CAMERA_START = { x: 0, y: 1.34, z: 1.2 };
const CAMERA_START_ANGLES = { pitch: -0.08, yaw: 0 };

function makeTatamiTexture(renderer: THREE.WebGLRenderer) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const context = canvas.getContext("2d");

  if (context) {
    context.fillStyle = "#acc77d";
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < canvas.height; y += 3) {
      context.strokeStyle = y % 6 === 0 ? "#8faa65" : "#c8d99a";
      context.globalAlpha = 0.52;
      context.beginPath();
      context.moveTo(0, y + 0.5);
      context.lineTo(canvas.width, y + 0.5);
      context.stroke();
    }

    for (let x = 0; x < canvas.width; x += 8) {
      context.strokeStyle = "#e0edb7";
      context.globalAlpha = 0.18;
      context.beginPath();
      context.moveTo(x + 0.5, 0);
      context.lineTo(x + 0.5, canvas.height);
      context.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return texture;
}

function makeScrollTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 512;
  const context = canvas.getContext("2d");

  if (context) {
    const paper = context.createLinearGradient(0, 0, canvas.width, 0);
    paper.addColorStop(0, "#d8cfb2");
    paper.addColorStop(0.12, "#f1ead4");
    paper.addColorStop(0.88, "#eee5cc");
    paper.addColorStop(1, "#cec3a2");
    context.fillStyle = paper;
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.strokeStyle = "#22201b";
    context.lineCap = "round";
    context.globalAlpha = 0.82;
    context.lineWidth = 9;
    context.beginPath();
    context.moveTo(105, 420);
    context.bezierCurveTo(92, 330, 136, 250, 118, 120);
    context.stroke();

    context.lineWidth = 5;
    context.beginPath();
    context.moveTo(117, 250);
    context.quadraticCurveTo(65, 224, 48, 176);
    context.moveTo(120, 210);
    context.quadraticCurveTo(170, 178, 187, 126);
    context.stroke();

    context.fillStyle = "#a14a3c";
    context.globalAlpha = 0.72;
    for (const [x, y, radius] of [
      [50, 173, 9],
      [68, 203, 7],
      [183, 124, 10],
      [163, 160, 6],
      [127, 104, 7],
    ] as const) {
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function addTatami(
  room: THREE.Group,
  texture: THREE.Texture,
  width: number,
  depth: number,
  x: number,
  z: number,
) {
  const edgeMaterial = new THREE.MeshStandardMaterial({
    color: 0x435946,
    roughness: 0.9,
  });
  const strawMaterial = new THREE.MeshStandardMaterial({
    color: 0xb8cf87,
    map: texture,
    roughness: 0.93,
  });
  const base = new THREE.Mesh(
    new THREE.BoxGeometry(width - 0.025, 0.095, depth - 0.025),
    edgeMaterial,
  );
  base.position.set(x, 0.09, z);
  base.receiveShadow = true;
  room.add(base);

  const top = new THREE.Mesh(
    new THREE.BoxGeometry(width - 0.095, 0.035, depth - 0.095),
    strawMaterial,
  );
  top.position.set(x, 0.155, z);
  top.castShadow = true;
  top.receiveShadow = true;
  room.add(top);
}

function addBeam(
  room: THREE.Group,
  material: THREE.Material,
  size: [number, number, number],
  position: [number, number, number],
) {
  const beam = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
  beam.position.set(...position);
  beam.castShadow = true;
  beam.receiveShadow = true;
  room.add(beam);
}

function addFusuma(room: THREE.Group, wood: THREE.Material) {
  const group = new THREE.Group();
  group.position.set(-0.45, 1.27, -1.405);

  const paper = new THREE.MeshStandardMaterial({ color: 0xe9e6d8, roughness: 1 });
  for (const x of [-0.46, 0.46]) {
    const panel = new THREE.Mesh(new THREE.PlaneGeometry(0.88, 1.82), paper);
    panel.position.set(x, -0.13, 0.035);
    panel.receiveShadow = true;
    group.add(panel);

    const pull = new THREE.Mesh(
      new THREE.CylinderGeometry(0.045, 0.045, 0.012, 24),
      new THREE.MeshStandardMaterial({ color: 0x3a332b, roughness: 0.8 }),
    );
    pull.rotation.x = Math.PI / 2;
    pull.position.set(x + (x < 0 ? 0.35 : -0.35), -0.13, 0.065);
    group.add(pull);
  }

  const transom = new THREE.Mesh(
    new THREE.PlaneGeometry(1.86, 0.38),
    new THREE.MeshStandardMaterial({ color: 0xd8d7ca, roughness: 1 }),
  );
  transom.position.set(0, 1.02, 0.035);
  group.add(transom);

  for (const x of [-0.95, 0, 0.95]) {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.045, 2.35, 0.05), wood);
    rail.position.set(x, 0, 0.06);
    group.add(rail);
  }
  for (const y of [-1.12, 0.79, 1.22]) {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(1.94, 0.05, 0.05), wood);
    rail.position.set(0, y, 0.06);
    group.add(rail);
  }
  room.add(group);
}

function addSideShoji(room: THREE.Group, wood: THREE.Material) {
  const group = new THREE.Group();
  group.position.set(1.405, 1.27, 0);
  group.rotation.y = -Math.PI / 2;

  const paper = new THREE.Mesh(
    new THREE.PlaneGeometry(2.65, 2.24),
    new THREE.MeshPhysicalMaterial({
      color: 0xfff7dc,
      emissive: 0xffe7b3,
      emissiveIntensity: 0.13,
      opacity: 0.92,
      roughness: 1,
      side: THREE.DoubleSide,
      transparent: true,
    }),
  );
  group.add(paper);

  for (const x of [-1.32, -0.88, -0.44, 0, 0.44, 0.88, 1.32]) {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.035, 2.3, 0.045), wood);
    rail.position.set(x, 0, 0.035);
    rail.castShadow = true;
    group.add(rail);
  }
  for (const y of [-1.12, -0.67, -0.22, 0.23, 0.68, 1.12]) {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(2.69, 0.035, 0.045), wood);
    rail.position.set(0, y, 0.035);
    rail.castShadow = true;
    group.add(rail);
  }
  room.add(group);
}

function addTokonoma(room: THREE.Group, wood: THREE.Material) {
  const alcove = new THREE.Mesh(
    new THREE.BoxGeometry(0.72, 2.05, 0.08),
    new THREE.MeshStandardMaterial({ color: 0xddd7c2, roughness: 1 }),
  );
  alcove.position.set(0.97, 1.25, -1.425);
  room.add(alcove);

  const scroll = new THREE.Mesh(
    new THREE.PlaneGeometry(0.31, 0.98),
    new THREE.MeshStandardMaterial({ map: makeScrollTexture(), roughness: 1 }),
  );
  scroll.position.set(0.97, 1.53, -1.375);
  room.add(scroll);

  for (const y of [1.04, 2.03]) {
    const roller = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.4, 12), wood);
    roller.rotation.z = Math.PI / 2;
    roller.position.set(0.97, y, -1.35);
    room.add(roller);
  }

  const shelf = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.1, 0.42), wood);
  shelf.position.set(0.97, 0.26, -1.2);
  shelf.castShadow = true;
  room.add(shelf);

  const vase = new THREE.Mesh(
    new THREE.CylinderGeometry(0.065, 0.095, 0.26, 20),
    new THREE.MeshStandardMaterial({ color: 0x637f72, roughness: 0.55 }),
  );
  vase.position.set(0.97, 0.44, -1.19);
  vase.castShadow = true;
  room.add(vase);

  const stemMaterial = new THREE.MeshStandardMaterial({ color: 0x4a3322, roughness: 1 });
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.009, 0.012, 0.46, 8), stemMaterial);
  stem.position.set(0.99, 0.76, -1.19);
  stem.rotation.z = -0.18;
  room.add(stem);

  const leafMaterial = new THREE.MeshStandardMaterial({
    color: 0x587052,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  for (const [x, y, angle] of [
    [0.9, 0.69, -0.55],
    [1.08, 0.83, 0.7],
    [0.93, 0.94, -0.8],
  ]) {
    const leaf = new THREE.Mesh(new THREE.CircleGeometry(0.075, 16), leafMaterial);
    leaf.scale.y = 0.42;
    leaf.rotation.z = angle;
    leaf.position.set(x, y, -1.17);
    room.add(leaf);
  }
}

function buildRoom(renderer: THREE.WebGLRenderer, lanternLight: THREE.PointLight) {
  const room = new THREE.Group();
  const wood = new THREE.MeshStandardMaterial({
    color: 0x604735,
    roughness: 0.78,
  });
  const plaster = new THREE.MeshStandardMaterial({
    color: 0xe4e0cf,
    roughness: 1,
  });

  const platform = new THREE.Mesh(
    new THREE.BoxGeometry(3, 0.14, 3),
    new THREE.MeshStandardMaterial({ color: 0x4c392d, roughness: 0.9 }),
  );
  platform.position.y = 0.02;
  platform.receiveShadow = true;
  room.add(platform);

  const tatamiTexture = makeTatamiTexture(renderer);
  addTatami(room, tatamiTexture, 1.8, 0.9, -0.45, -0.9);
  addTatami(room, tatamiTexture, 0.9, 1.8, 0.9, -0.45);
  addTatami(room, tatamiTexture, 1.8, 0.9, 0.45, 0.9);
  addTatami(room, tatamiTexture, 0.9, 1.8, -0.9, 0.45);
  addTatami(room, tatamiTexture, 0.9, 0.9, 0, 0);

  addBeam(room, plaster, [2.9, 2.35, 0.08], [0, 1.35, -1.45]);
  addBeam(room, plaster, [2.9, 2.35, 0.08], [0, 1.35, 1.45]);
  addBeam(room, plaster, [0.08, 2.35, 2.9], [-1.45, 1.35, 0]);
  addBeam(room, plaster, [0.08, 2.35, 2.9], [1.45, 1.35, 0]);

  const ceiling = new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.08, 2.9), plaster);
  ceiling.position.y = 2.54;
  ceiling.receiveShadow = true;
  room.add(ceiling);

  for (const x of [-1.45, 0.54, 1.45]) {
    addBeam(room, wood, [0.09, 2.48, 0.11], [x, 1.32, -1.4]);
    addBeam(room, wood, [0.09, 2.48, 0.11], [x, 1.32, 1.4]);
  }
  for (const z of [-1.45, 0, 1.45]) {
    addBeam(room, wood, [0.11, 2.48, 0.09], [-1.4, 1.32, z]);
    addBeam(room, wood, [0.11, 2.48, 0.09], [1.4, 1.32, z]);
  }
  addBeam(room, wood, [2.98, 0.11, 0.12], [0, 2.49, -1.4]);
  addBeam(room, wood, [2.98, 0.11, 0.12], [0, 2.49, 1.4]);
  addBeam(room, wood, [0.12, 0.11, 2.98], [-1.4, 2.49, 0]);
  addBeam(room, wood, [0.12, 0.11, 2.98], [1.4, 2.49, 0]);

  addFusuma(room, wood);
  addSideShoji(room, wood);
  addTokonoma(room, wood);
  lanternLight.position.set(1.2, 1.65, 0);
  room.add(lanternLight);
  return room;
}

export default function TatamiRoom() {
  const mountRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const pressedKeysRef = useRef(new Set<string>());
  const viewAnglesRef = useRef({ ...CAMERA_START_ANGLES });
  const lightingRef = useRef<LightingRig | null>(null);
  const [isNight, setIsNight] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const enterRoom = () => {
    setHasEntered(true);
    const canvas = mountRef.current?.querySelector("canvas");
    if (canvas && window.matchMedia("(pointer: fine)").matches) {
      void canvas.requestPointerLock();
    }
  };

  const setMoving = (code: string, moving: boolean) => {
    if (moving) pressedKeysRef.current.add(code);
    else pressedKeysRef.current.delete(code);
  };

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const pressedKeys = pressedKeysRef.current;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x2d352f);
    scene.fog = new THREE.Fog(0x2d352f, 6, 12);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.05, 30);
    camera.zoom = 0.62;
    camera.position.set(CAMERA_START.x, CAMERA_START.y, CAMERA_START.z);
    camera.rotation.order = "YXZ";
    camera.rotation.set(
      CAMERA_START_ANGLES.pitch,
      CAMERA_START_ANGLES.yaw,
      0,
    );
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.setAttribute(
      "aria-label",
      "可使用方向键移动、鼠标环视的日式四叠半房间",
    );
    renderer.domElement.setAttribute("role", "application");
    renderer.domElement.tabIndex = 0;
    renderer.domElement.style.touchAction = "none";
    mount.appendChild(renderer.domElement);

    const hemisphere = new THREE.HemisphereLight(0xfff8e8, 0x71806a, 1.9);
    scene.add(hemisphere);

    const sunlight = new THREE.DirectionalLight(0xfff1d2, 2.45);
    sunlight.position.set(2.8, 5.5, 3.8);
    sunlight.castShadow = true;
    sunlight.shadow.mapSize.set(2048, 2048);
    sunlight.shadow.camera.left = -4;
    sunlight.shadow.camera.right = 4;
    sunlight.shadow.camera.top = 4;
    sunlight.shadow.camera.bottom = -4;
    sunlight.shadow.bias = -0.0004;
    scene.add(sunlight);

    const lantern = new THREE.PointLight(0xffdfaa, 1.15, 4, 1.6);
    lantern.castShadow = true;
    scene.add(buildRoom(renderer, lantern));

    lightingRef.current = { hemisphere, sunlight, lantern, scene };

    const resetView = () => {
      camera.position.set(CAMERA_START.x, CAMERA_START.y, CAMERA_START.z);
      viewAnglesRef.current = { ...CAMERA_START_ANGLES };
      camera.rotation.set(
        CAMERA_START_ANGLES.pitch,
        CAMERA_START_ANGLES.yaw,
        0,
      );
    };

    const onPointerLockChange = () => {
      setIsLocked(document.pointerLockElement === renderer.domElement);
      if (document.pointerLockElement === renderer.domElement) {
        setHasEntered(true);
      }
    };

    const onCanvasClick = () => {
      setHasEntered(true);
      if (
        window.matchMedia("(pointer: fine)").matches &&
        document.pointerLockElement !== renderer.domElement
      ) {
        void renderer.domElement.requestPointerLock();
      }
    };

    const onMouseMove = (event: MouseEvent) => {
      if (document.pointerLockElement !== renderer.domElement) return;
      const angles = viewAnglesRef.current;
      angles.yaw -= event.movementX * 0.0016;
      angles.pitch = THREE.MathUtils.clamp(
        angles.pitch - event.movementY * 0.0015,
        -Math.PI * 0.38,
        Math.PI * 0.38,
      );
      camera.rotation.set(angles.pitch, angles.yaw, 0);
    };

    const movementCodes = new Set([
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "KeyW",
      "KeyA",
      "KeyS",
      "KeyD",
    ]);
    const onKeyDown = (event: KeyboardEvent) => {
      if (movementCodes.has(event.code)) {
        event.preventDefault();
        pressedKeys.add(event.code);
      }
      if (event.code === "KeyN" && !event.repeat) {
        setIsNight((value) => !value);
      }
      if (event.code === "KeyR" && !event.repeat) resetView();
    };
    const onKeyUp = (event: KeyboardEvent) => {
      pressedKeys.delete(event.code);
    };
    const onWindowBlur = () => pressedKeys.clear();

    let activeTouch: { id: number; x: number; y: number } | null = null;
    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== "touch") return;
      activeTouch = { id: event.pointerId, x: event.clientX, y: event.clientY };
      renderer.domElement.setPointerCapture(event.pointerId);
      setHasEntered(true);
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!activeTouch || activeTouch.id !== event.pointerId) return;
      const angles = viewAnglesRef.current;
      angles.yaw -= (event.clientX - activeTouch.x) * 0.0045;
      angles.pitch = THREE.MathUtils.clamp(
        angles.pitch - (event.clientY - activeTouch.y) * 0.0035,
        -Math.PI * 0.38,
        Math.PI * 0.38,
      );
      activeTouch.x = event.clientX;
      activeTouch.y = event.clientY;
      camera.rotation.set(angles.pitch, angles.yaw, 0);
    };
    const onPointerUp = (event: PointerEvent) => {
      if (activeTouch?.id === event.pointerId) activeTouch = null;
    };

    document.addEventListener("pointerlockchange", onPointerLockChange);
    document.addEventListener("mousemove", onMouseMove);
    window.addEventListener("keydown", onKeyDown, { passive: false });
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onWindowBlur);
    renderer.domElement.addEventListener("click", onCanvasClick);
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerup", onPointerUp);
    renderer.domElement.addEventListener("pointercancel", onPointerUp);

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      const aspect = width / Math.max(height, 1);
      camera.aspect = aspect;
      camera.fov = 42;
      camera.zoom = aspect < 0.75 ? 0.5 : aspect < 1.15 ? 0.56 : 0.62;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(mount);
    resize();

    const clock = new THREE.Clock();
    const forward = new THREE.Vector3();
    const right = new THREE.Vector3();
    const movement = new THREE.Vector3();
    let frameId = 0;
    const render = () => {
      const delta = Math.min(clock.getDelta(), 0.05);
      const keys = pressedKeys;
      movement.set(0, 0, 0);

      camera.getWorldDirection(forward);
      forward.y = 0;
      forward.normalize();
      right.crossVectors(forward, camera.up).normalize();

      if (keys.has("ArrowUp") || keys.has("KeyW")) movement.add(forward);
      if (keys.has("ArrowDown") || keys.has("KeyS")) movement.sub(forward);
      if (keys.has("ArrowRight") || keys.has("KeyD")) movement.add(right);
      if (keys.has("ArrowLeft") || keys.has("KeyA")) movement.sub(right);

      if (movement.lengthSq() > 0) {
        movement.normalize().multiplyScalar(delta * 1.25);
        camera.position.x = THREE.MathUtils.clamp(
          camera.position.x + movement.x,
          -1.18,
          1.18,
        );
        camera.position.z = THREE.MathUtils.clamp(
          camera.position.z + movement.z,
          -1.18,
          1.18,
        );
      }
      camera.position.y = CAMERA_START.y;

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(render);
    };
    render();
    setIsReady(true);

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      document.removeEventListener("pointerlockchange", onPointerLockChange);
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onWindowBlur);
      renderer.domElement.removeEventListener("click", onCanvasClick);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerup", onPointerUp);
      renderer.domElement.removeEventListener("pointercancel", onPointerUp);
      if (document.pointerLockElement === renderer.domElement) {
        document.exitPointerLock();
      }
      scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        object.geometry.dispose();
        const materials = Array.isArray(object.material)
          ? object.material
          : [object.material];
        for (const material of materials) {
          for (const value of Object.values(material)) {
            if (value instanceof THREE.Texture) value.dispose();
          }
          material.dispose();
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
      cameraRef.current = null;
      pressedKeys.clear();
      lightingRef.current = null;
    };
  }, []);

  useEffect(() => {
    const rig = lightingRef.current;
    if (!rig) return;

    const background = isNight ? 0x090d14 : 0x2d352f;
    rig.scene.background = new THREE.Color(background);
    if (rig.scene.fog) rig.scene.fog.color.set(background);
    rig.hemisphere.intensity = isNight ? 0.28 : 1.9;
    rig.hemisphere.color.set(isNight ? 0x53617a : 0xfff5dc);
    rig.sunlight.intensity = isNight ? 0.16 : 2.45;
    rig.lantern.intensity = isNight ? 2.6 : 1.15;
  }, [isNight]);

  return (
    <main className="relative min-h-svh overflow-hidden bg-[#0d120f] text-[#f7f0df] select-none">
      <div ref={mountRef} className="absolute inset-0" />

      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(4,8,6,0.42)_100%)]" />

      <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between p-5 sm:p-7">
        <div className="flex items-center gap-3 text-white/80">
          <span className="grid size-9 place-items-center border border-[#e7d3a3]/35 bg-black/20 font-serif text-sm backdrop-blur-md">
            間
          </span>
          <div>
            <p className="font-serif text-xs tracking-[0.24em] text-[#f1dfb7]">YOJŌHAN</p>
            <p className="mt-1 text-[9px] tracking-[0.2em] text-white/45">四畳半 · 和室</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsNight((value) => !value)}
          className="pointer-events-auto flex h-9 items-center gap-2 rounded-full border border-white/15 bg-black/25 px-3 text-[10px] tracking-[0.14em] text-white/75 backdrop-blur-md transition hover:border-[#ead9ad]/60 hover:text-[#f5dfaa] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5dfaa]"
          aria-label={isNight ? "切换为昼景" : "切换为夜景"}
        >
          {isNight ? <SunIcon className="size-3.5" /> : <MoonIcon className="size-3.5" />}
          {isNight ? "昼景" : "夜景"}
        </button>
      </header>

      {hasEntered && (
        <>
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 size-4 -translate-x-1/2 -translate-y-1/2 opacity-55">
            <span className="absolute left-1/2 top-0 h-1.5 w-px bg-white" />
            <span className="absolute bottom-0 left-1/2 h-1.5 w-px bg-white" />
            <span className="absolute left-0 top-1/2 h-px w-1.5 bg-white" />
            <span className="absolute right-0 top-1/2 h-px w-1.5 bg-white" />
          </div>

          <div className="pointer-events-none absolute bottom-6 left-6 z-20 hidden items-end gap-4 text-[9px] tracking-[0.16em] text-white/45 md:flex">
            <span>方向键 / WASD&nbsp; 移动</span>
            <span>鼠标&nbsp; 环视</span>
            <span>N&nbsp; 昼夜</span>
            <span>R&nbsp; 复位</span>
            <span>ESC&nbsp; 释放鼠标</span>
          </div>

          <div className="absolute bottom-6 right-5 z-30 grid grid-cols-3 gap-1.5 md:hidden">
            <button
              type="button"
              onPointerDown={(event) => {
                event.stopPropagation();
                setMoving("ArrowUp", true);
              }}
              onPointerUp={() => setMoving("ArrowUp", false)}
              onPointerCancel={() => setMoving("ArrowUp", false)}
              className="col-start-2 grid size-12 place-items-center rounded-full border border-white/20 bg-black/35 text-lg text-white/80 backdrop-blur-md"
              aria-label="向前移动"
            >
              ↑
            </button>
            {[
              ["ArrowLeft", "←", "向左移动"],
              ["ArrowDown", "↓", "向后移动"],
              ["ArrowRight", "→", "向右移动"],
            ].map(([code, label, ariaLabel]) => (
              <button
                key={code}
                type="button"
                onPointerDown={(event) => {
                  event.stopPropagation();
                  setMoving(code, true);
                }}
                onPointerUp={() => setMoving(code, false)}
                onPointerCancel={() => setMoving(code, false)}
                className="grid size-12 place-items-center rounded-full border border-white/20 bg-black/35 text-lg text-white/80 backdrop-blur-md"
                aria-label={ariaLabel}
              >
                {label}
              </button>
            ))}
          </div>
        </>
      )}

      {hasEntered && !isLocked && (
        <button
          type="button"
          onClick={enterRoom}
          className="absolute bottom-8 left-1/2 z-30 hidden -translate-x-1/2 rounded-full border border-white/20 bg-black/40 px-5 py-2 text-[10px] tracking-[0.18em] text-white/70 backdrop-blur-md transition hover:border-[#e6d2a4]/70 hover:text-[#f5e3b9] md:block"
        >
          点击继续鼠标环视
        </button>
      )}

      {!hasEntered && isReady && (
        <div className="absolute inset-0 z-30 grid place-items-center bg-[radial-gradient(circle_at_center,rgba(14,20,16,0.22),rgba(7,11,9,0.78))] px-6 text-center backdrop-blur-[2px]">
          <div className="max-w-lg">
            <p className="text-[10px] tracking-[0.34em] text-[#e8d5a8]/65">IMMERSIVE ROOM 01</p>
            <h1 className="mt-5 font-serif text-5xl tracking-[-0.04em] sm:text-7xl">进入和室</h1>
            <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-white/58">
              依照传统四叠半尺度复原。穿行在浅绿榻榻米之间，靠近襖、障子与床之间，感受一间和室真实的空间比例。
            </p>
            <button
              type="button"
              onClick={enterRoom}
              className="mt-8 border border-[#e8d5a8]/50 bg-[#e8d5a8]/10 px-8 py-3 text-xs tracking-[0.26em] text-[#f3e3bd] backdrop-blur-md transition hover:bg-[#e8d5a8]/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f3e3bd]"
            >
              进入房间
            </button>
            <p className="mt-5 text-[9px] tracking-[0.16em] text-white/38">
              方向键 / WASD 移动 · 鼠标环视 · ESC 退出
            </p>
          </div>
        </div>
      )}

      {!isReady && (
        <div className="absolute inset-0 z-20 grid place-items-center bg-[#111714] text-xs tracking-[0.3em] text-[#e9d9b4]">
          正在布置茶室
        </div>
      )}
    </main>
  );
}
