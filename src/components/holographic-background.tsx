"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
uniform float uTime;
uniform float uProgress;
uniform float uMinY;
uniform float uMaxY;
uniform float uGlitchAmp;

varying vec3 vPosition;
varying vec3 vNormal;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  // Background glitch displacement
  float glitchTime = uTime - modelPosition.y;
  float glitchstrength = sin(glitchTime) * sin(glitchTime * 3.45) + sin(glitchTime * 8.76);
  glitchstrength /= 3.0;
  glitchstrength = smoothstep(0.65, 1.0, glitchstrength) * 1.5;
  modelPosition.x += (random(modelPosition.xz + uTime) - 0.5) * glitchstrength * 0.1 * uGlitchAmp;
  modelPosition.z += (random(modelPosition.xz + uTime) - 0.5) * glitchstrength * 0.1 * uGlitchAmp;

  // Slicing transition scan glitch
  float normalizedY = (modelPosition.y - uMinY) / max(uMaxY - uMinY, 0.001);
  float diff = abs(normalizedY - uProgress);
  float progressGlitch = smoothstep(0.04, 0.0, diff) * 0.35 * uGlitchAmp;

  modelPosition.x += (random(modelPosition.xz + uTime * 2.0) - 0.5) * progressGlitch;
  modelPosition.z += (random(modelPosition.xz + uTime * 2.0) - 0.5) * progressGlitch;

  gl_Position = projectionMatrix * viewMatrix * modelPosition;

  vPosition = modelPosition.xyz;
  vec4 newNormal = modelMatrix * vec4(normal, 0.0);
  vNormal = normalize(newNormal.xyz);
}
`;

const fragmentShader = `
uniform float uTime;
uniform float uIndex;
uniform float uCurrentIndex;
uniform float uNextIndex;
uniform float uProgress;
uniform vec3 uColor;
uniform vec3 uSecondaryColor;
uniform float uMinY;
uniform float uMaxY;
uniform float uOpacity;
uniform float uScanBeamPower;

varying vec3 vPosition;
varying vec3 vNormal;

void main() {
  if (uIndex != uCurrentIndex && uIndex != uNextIndex) {
    discard;
  }

  // Dynamic horizontal scanlines
  float lines = 32.0;
  float scanline = sin((vPosition.y - uTime * 0.32) * lines * 3.14159);
  scanline = pow(scanline * 0.5 + 0.5, 2.0);

  // Fresnel rim glow: strongest at glancing angles
  vec3 viewDirection = normalize(vPosition - cameraPosition);
  float fresnel = 1.0 - abs(dot(vNormal, viewDirection));
  fresnel = pow(fresnel, 1.8);

  // Holographic intensity: vivid Fresnel rim + scanlines + ambient glow
  float holographic = fresnel * 1.6 + scanline * (fresnel * 1.4 + 0.22) + 0.12;

  // Normalized vertical coordinate for slicing transition
  float normalizedY = (vPosition.y - uMinY) / max(uMaxY - uMinY, 0.001);

  // Scanning beam slice line
  float scanLineDist = abs(normalizedY - uProgress);
  float scanBeam = smoothstep(0.025, 0.0, scanLineDist) * uScanBeamPower;

  if (uIndex == uCurrentIndex && normalizedY < uProgress) {
    discard;
  }
  if (uIndex == uNextIndex && normalizedY > uProgress) {
    discard;
  }

  // Chromatic neon holographic color
  vec3 finalColor = mix(uColor, uSecondaryColor, fresnel * 0.7);
  finalColor += uSecondaryColor * (scanBeam * 1.8);

  float finalAlpha = (holographic + scanBeam * 1.2) * uOpacity;

  gl_FragColor = vec4(finalColor, clamp(finalAlpha, 0.0, 1.0));
}
`;

interface HolographicBackgroundProps {
  className?: string;
  variant?: "default" | "cli";
}

function createStarDotTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1.0)");
    gradient.addColorStop(0.35, "rgba(255, 255, 255, 0.9)");
    gradient.addColorStop(0.75, "rgba(255, 255, 255, 0.3)");
    gradient.addColorStop(1.0, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function HolographicBackground({
  className = "-z-10",
  variant = "default",
}: HolographicBackgroundProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const { resolvedTheme } = useTheme();
  const themeRef = useRef<string>("dark");

  useEffect(() => {
    themeRef.current = resolvedTheme || "dark";
  }, [resolvedTheme]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let isTabVisible = true;
    let animationFrameId: number;

    const checkIsDark = () => {
      if (document.documentElement.classList.contains("dark")) return true;
      if (document.documentElement.classList.contains("light")) return false;
      return themeRef.current === "dark";
    };

    const isDark = checkIsDark();
    const isCli = variant === "cli";

    // Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, isCli ? 5.8 : 6.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Theme Colors
    const getColors = (dark: boolean) => {
      if (isCli) {
        if (dark) {
          return {
            holoPrimary: new THREE.Color(0x00f5ff), // Vibrant cyber cyan
            holoSecondary: new THREE.Color(0xd946ef), // Neon fuchsia
            hologramOpacity: 0.88, // Rich, high-visibility opacity for CLI
            particleColor: new THREE.Color(0x00f5ff),
            particleOpacity: 0.55,
            ringOpacity: 0.45,
            scanBeamPower: 1.35,
            glitchAmp: 1.4,
          };
        }
        return {
          holoPrimary: new THREE.Color(0x0284c7),
          holoSecondary: new THREE.Color(0x7c3aed),
          hologramOpacity: 0.55,
          particleColor: new THREE.Color(0x0284c7),
          particleOpacity: 0.35,
          ringOpacity: 0.28,
          scanBeamPower: 0.85,
          glitchAmp: 1.0,
        };
      }

      // Default (About page)
      if (dark) {
        return {
          holoPrimary: new THREE.Color(0x38bdf8),
          holoSecondary: new THREE.Color(0xa855f7),
          hologramOpacity: 0.35,
          particleColor: new THREE.Color(0x38bdf8),
          particleOpacity: 0.28,
          ringOpacity: 0.18,
          scanBeamPower: 0.65,
          glitchAmp: 1.0,
        };
      }
      return {
        holoPrimary: new THREE.Color(0x0284c7),
        holoSecondary: new THREE.Color(0x6366f1),
        hologramOpacity: 0.2,
        particleColor: new THREE.Color(0x0284c7),
        particleOpacity: 0.18,
        ringOpacity: 0.1,
        scanBeamPower: 0.45,
        glitchAmp: 0.8,
      };
    };

    const currentColors = getColors(isDark);
    const starDotTexture = createStarDotTexture();

    const isMobile = width < 768;

    // ==========================================
    // 3D HOLOGRAPHIC ANIMATION
    // ==========================================
    const hologramGroup = new THREE.Group();
    scene.add(hologramGroup);

    hologramGroup.position.set(
      isCli ? 0.0 : isMobile ? 0.0 : 0.75,
      isCli ? (isMobile ? -0.05 : -0.1) : isMobile ? 0.1 : 0.0,
      isCli ? -0.4 : -1.0,
    );
    hologramGroup.scale.set(
      isCli ? 1.4 : 0.92,
      isCli ? 1.4 : 0.92,
      isCli ? 1.4 : 0.92,
    );

    const geometries = [
      new THREE.TorusKnotGeometry(1.15, 0.34, 110, 32, 2, 3),
      new THREE.IcosahedronGeometry(1.4, 3),
      new THREE.TorusGeometry(1.3, 0.34, 28, 70),
    ];

    const bounds = geometries.map((geo) => {
      geo.computeBoundingBox();
      const bbox = geo.boundingBox!;
      return { minY: bbox.min.y, maxY: bbox.max.y };
    });

    const meshes: THREE.Mesh[] = [];
    const materials: THREE.ShaderMaterial[] = [];

    geometries.forEach((geo, index) => {
      const mat = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uIndex: { value: index },
          uCurrentIndex: { value: 0 },
          uNextIndex: { value: 1 },
          uProgress: { value: 0 },
          uColor: { value: currentColors.holoPrimary },
          uSecondaryColor: { value: currentColors.holoSecondary },
          uMinY: { value: bounds[index].minY },
          uMaxY: { value: bounds[index].maxY },
          uOpacity: { value: currentColors.hologramOpacity },
          uScanBeamPower: { value: currentColors.scanBeamPower },
          uGlitchAmp: { value: currentColors.glitchAmp },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geo, mat);
      meshes.push(mesh);
      materials.push(mat);
      hologramGroup.add(mesh);
    });

    // Holographic Orbital Rings (Dual Gyroscopic Hologram Rings)
    const ringGeo1 = new THREE.RingGeometry(2.08, 2.14, 80);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: currentColors.holoPrimary,
      transparent: true,
      opacity: currentColors.ringOpacity,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const orbitalRing1 = new THREE.Mesh(ringGeo1, ringMat1);
    orbitalRing1.rotation.x = Math.PI / 2.3;
    hologramGroup.add(orbitalRing1);

    const ringGeo2 = new THREE.RingGeometry(2.4, 2.45, 80);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: currentColors.holoSecondary,
      transparent: true,
      opacity: isCli
        ? currentColors.ringOpacity * 0.75
        : currentColors.ringOpacity * 0.5,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const orbitalRing2 = new THREE.Mesh(ringGeo2, ringMat2);
    orbitalRing2.rotation.x = -Math.PI / 3.0;
    orbitalRing2.rotation.y = Math.PI / 4.0;
    hologramGroup.add(orbitalRing2);

    // Ambient Hologram Floating Particles Field
    const particleCount = isMobile ? 80 : 160;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 11;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      particleSpeeds[i] = 0.15 + Math.random() * 0.35;
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3),
    );

    const particleMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.045 : 0.06,
      color: currentColors.particleColor,
      map: starDotTexture,
      transparent: true,
      opacity: currentColors.particleOpacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const ambientParticles = new THREE.Points(
      particleGeometry,
      particleMaterial,
    );
    scene.add(ambientParticles);

    // Mouse & Scroll Parallax Tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX - width / 2) / (width / 2);
      mouse.targetY = -(e.clientY - height / 2) / (height / 2);
    };

    const handleMouseLeave = () => {
      mouse.targetX = 0;
      mouse.targetY = 0;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    let scrollY = window.scrollY || 0;
    let targetScrollY = scrollY;
    const handleScroll = () => {
      targetScrollY = window.scrollY || 0;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      const mobile = width < 768;
      hologramGroup.position.set(
        isCli ? 0.0 : mobile ? 0.0 : 0.75,
        isCli ? (mobile ? -0.05 : -0.1) : mobile ? 0.1 : 0.0,
        isCli ? -0.4 : -1.0,
      );
    };
    window.addEventListener("resize", handleResize);

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        lastTime = performance.now();
        requestAnimationFrame(animate);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let currentIndex = 0;
    let nextIndex = 1;
    let progress = 0;
    let isTransitioning = false;
    let transitionStartTime = 0;
    const TRANSITION_DURATION = 2.4;
    let lastTransitionTime = performance.now() / 1000;
    const CYCLE_INTERVAL = 7.0;

    let lastTime = performance.now();
    let clockTime = 0;

    const animate = () => {
      if (!isTabVisible) return;

      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      clockTime += delta;
      const effectiveSpeed = prefersReducedMotion ? 0.2 : 1.0;

      // Mouse Damping (High responsiveness on CLI!)
      const mouseDamping = isCli ? 0.09 : 0.04;
      mouse.x += (mouse.targetX - mouse.x) * mouseDamping;
      mouse.y += (mouse.targetY - mouse.y) * mouseDamping;
      scrollY += (targetScrollY - scrollY) * 0.08;

      // Theme Sync
      const activeIsDark = checkIsDark();
      const themeColors = getColors(activeIsDark);

      materials.forEach((mat) => {
        mat.uniforms.uColor.value.lerp(themeColors.holoPrimary, 0.08);
        mat.uniforms.uSecondaryColor.value.lerp(
          themeColors.holoSecondary,
          0.08,
        );
        mat.uniforms.uOpacity.value = THREE.MathUtils.lerp(
          mat.uniforms.uOpacity.value,
          themeColors.hologramOpacity,
          0.08,
        );
        mat.uniforms.uScanBeamPower.value = themeColors.scanBeamPower;
        mat.uniforms.uGlitchAmp.value = themeColors.glitchAmp;
      });

      ringMat1.color.lerp(themeColors.holoPrimary, 0.08);
      ringMat1.opacity = themeColors.ringOpacity;
      ringMat2.color.lerp(themeColors.holoSecondary, 0.08);
      ringMat2.opacity = isCli
        ? themeColors.ringOpacity * 0.75
        : themeColors.ringOpacity * 0.5;

      particleMaterial.color.lerp(themeColors.particleColor, 0.08);
      particleMaterial.opacity = themeColors.particleOpacity;

      // Slicing Morphing Cycle for Hologram
      const nowSec = now / 1000;
      if (!isTransitioning && nowSec - lastTransitionTime > CYCLE_INTERVAL) {
        isTransitioning = true;
        transitionStartTime = nowSec;
      }

      if (isTransitioning) {
        const elapsed = (nowSec - transitionStartTime) / TRANSITION_DURATION;
        if (elapsed >= 1.0) {
          isTransitioning = false;
          progress = 0;
          currentIndex = nextIndex;
          nextIndex = (nextIndex + 1) % geometries.length;
          lastTransitionTime = nowSec;
        } else {
          progress = 0.5 - 0.5 * Math.cos(elapsed * Math.PI);
        }
      }

      materials.forEach((mat, idx) => {
        mat.uniforms.uTime.value = clockTime * effectiveSpeed;
        mat.uniforms.uCurrentIndex.value = currentIndex;
        mat.uniforms.uNextIndex.value = nextIndex;
        mat.uniforms.uProgress.value = progress;
        mat.uniforms.uMinY.value = bounds[idx].minY;
        mat.uniforms.uMaxY.value = bounds[idx].maxY;
      });

      // Hologram Rotation & Parallax (Dynamic on CLI!)
      const holoMouseFactor = isCli ? 0.7 : 0.3;
      const scrollRotation = scrollY * 0.0004;
      hologramGroup.rotation.y =
        clockTime * 0.32 * effectiveSpeed +
        mouse.x * holoMouseFactor +
        scrollRotation;
      hologramGroup.rotation.x =
        Math.sin(clockTime * 0.18) * 0.12 + mouse.y * (holoMouseFactor * 0.8);
      hologramGroup.rotation.z = Math.cos(clockTime * 0.22) * 0.06;

      const mobile = width < 768;
      const baseHoloX = isCli ? 0.0 : mobile ? 0.0 : 0.75;
      const baseHoloY = isCli ? (mobile ? -0.05 : -0.1) : mobile ? 0.1 : 0.0;
      hologramGroup.position.x = baseHoloX + mouse.x * (isCli ? 0.4 : 0.15);
      hologramGroup.position.y =
        baseHoloY +
        Math.sin(clockTime * 0.7) * 0.08 +
        mouse.y * (isCli ? 0.3 : 0.1);

      orbitalRing1.rotation.z = -clockTime * 0.2 * effectiveSpeed;
      orbitalRing2.rotation.z = clockTime * 0.25 * effectiveSpeed;

      // Animate ambient particles gently
      const posAttr = particleGeometry.attributes
        .position as THREE.BufferAttribute;
      const positions = posAttr.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] +=
          particleSpeeds[i] * delta * 0.25 * effectiveSpeed;
        if (positions[i * 3 + 1] > 4.5) {
          positions[i * 3 + 1] = -4.5;
        }
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);

      // Clean up Three.js resources
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      particleGeometry.dispose();
      particleMaterial.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      starDotTexture.dispose();

      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [variant]);

  return (
    <div
      ref={mountRef}
      className={`pointer-events-none fixed inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
}

export default HolographicBackground;
