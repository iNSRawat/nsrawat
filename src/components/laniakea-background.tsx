"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useRef } from "react";

// 3D Point in space
interface Point3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  radius: number;
  colorIndex: number;
  alpha: number;
  attractorIndex: number;
}

// 3D Attractor Node (Supercluster Core)
interface Attractor3D {
  baseX: number;
  baseY: number;
  baseZ: number;
  x: number;
  y: number;
  z: number;
  radius: number;
  pulse: number;
}

// 3D Milky Way Star
interface MilkyWayStar3D {
  r: number;
  theta: number;
  armOffset: number;
  yOffset: number;
  speed: number;
  radius: number;
  colorIndex: number;
}

export function LaniakeaBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { resolvedTheme } = useTheme();
  const themeRef = useRef<string>("dark");

  useEffect(() => {
    themeRef.current = resolvedTheme || "dark";
  }, [resolvedTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let isTabVisible = true;

    // Responsive configuration based on screen width
    const getResponsiveConfig = (w: number) => {
      if (w < 640) {
        // Mobile
        return {
          particleCount: 55,
          mwStarsCount: 50,
          maxDpr: 1.25,
          focalLength: 550,
          cameraZ: 850,
          attractorScale: 0.65,
        };
      } else if (w < 1024) {
        // Tablet
        return {
          particleCount: 90,
          mwStarsCount: 80,
          maxDpr: 1.5,
          focalLength: 650,
          cameraZ: 880,
          attractorScale: 0.85,
        };
      }
      // Desktop
      return {
        particleCount: 140,
        mwStarsCount: 110,
        maxDpr: 1.5,
        focalLength: 750,
        cameraZ: 900,
        attractorScale: 1.0,
      };
    };

    let config = getResponsiveConfig(window.innerWidth);

    // Visibility API: Pause rendering when tab is hidden to save battery & GPU
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        lastTime = performance.now();
        requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Scroll tracking
    let scrollY = window.scrollY || 0;
    let targetScrollY = scrollY;
    const handleScroll = () => {
      targetScrollY = window.scrollY || 0;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Dark mode check
    const checkIsDark = () => {
      if (document.documentElement.classList.contains("dark")) return true;
      if (document.documentElement.classList.contains("light")) return false;
      return themeRef.current === "dark";
    };

    // Arrays
    const attractors3D: Attractor3D[] = [];
    const particles3D: Point3D[] = [];
    const mwStars3D: MilkyWayStar3D[] = [];

    // Re-initialize 3D Scene based on viewport size
    const initScene = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      config = getResponsiveConfig(width);

      dpr = Math.min(window.devicePixelRatio || 1, config.maxDpr);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      // 3D Attractor positions scaled for mobile/tablet/desktop
      attractors3D.length = 0;
      const s = config.attractorScale;
      attractors3D.push(
        {
          baseX: -280 * s,
          baseY: -90 * s,
          baseZ: 70,
          x: 0,
          y: 0,
          z: 0,
          radius: 150 * s,
          pulse: 0,
        },
        {
          baseX: 300 * s,
          baseY: -160 * s,
          baseZ: -100,
          x: 0,
          y: 0,
          z: 0,
          radius: 180 * s,
          pulse: Math.PI / 3,
        },
        {
          baseX: 90 * s,
          baseY: 270 * s,
          baseZ: 150,
          x: 0,
          y: 0,
          z: 0,
          radius: 130 * s,
          pulse: (2 * Math.PI) / 3,
        },
      );

      // Laniakea Particles
      particles3D.length = 0;
      for (let i = 0; i < config.particleCount; i++) {
        particles3D.push({
          x: (Math.random() - 0.5) * 1200 * s,
          y: (Math.random() - 0.5) * 1200 * s,
          z: (Math.random() - 0.5) * 800,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          vz: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 1.6 + 0.5,
          colorIndex: Math.floor(Math.random() * 4),
          alpha: Math.random() * 0.6 + 0.3,
          attractorIndex: i % attractors3D.length,
        });
      }

      // Milky Way Stars
      mwStars3D.length = 0;
      const b = 0.24;
      for (let i = 0; i < config.mwStarsCount; i++) {
        const armOffset = (i % 2) * Math.PI;
        const theta = Math.random() * Math.PI * 3.0;
        const r = 9 * Math.exp(b * theta) + (Math.random() - 0.5) * 14;
        mwStars3D.push({
          r: Math.min(r, 210 * s),
          theta,
          armOffset,
          yOffset: (Math.random() - 0.5) * 18,
          speed: 0.0016 + Math.random() * 0.0008,
          radius: Math.random() * 1.4 + 0.5,
          colorIndex: Math.floor(Math.random() * 4),
        });
      }
    };

    initScene();

    const handleResize = () => {
      initScene();
    };
    window.addEventListener("resize", handleResize);

    // Mouse tracking for subtle desktop 3D tilt
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      if (width < 640) return; // Disable mouse tilt tracking on mobile to conserve CPU
      mouse.targetX = (e.clientX - width / 2) / (width / 2);
      mouse.targetY = (e.clientY - height / 2) / (height / 2);
    };
    const handleMouseLeave = () => {
      mouse.targetX = 0;
      mouse.targetY = 0;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    // Theme Color Palettes (strict sync with site design system)
    const getThemeColors = (isDark: boolean) => {
      if (isDark) {
        return {
          bg: "#09090b",
          milkyWayCoreInner: "rgba(224, 242, 254, 0.75)",
          milkyWayCoreOuter: "rgba(56, 189, 248, 0.25)",
          milkyWayGlow: "rgba(168, 85, 247, 0.16)",
          milkyWayDust: "rgba(236, 72, 153, 0.12)",
          spiralArmStroke1: "rgba(56, 189, 248, 0.18)",
          spiralArmStroke2: "rgba(168, 85, 247, 0.14)",
          filamentStroke1: "rgba(56, 189, 248, 0.12)",
          filamentStroke2: "rgba(168, 85, 247, 0.1)",
          webLine: "rgba(129, 140, 248, 0.045)",
          particles: [
            "rgba(240, 249, 255, 0.8)",
            "rgba(186, 230, 253, 0.75)",
            "rgba(221, 214, 254, 0.75)",
            "rgba(244, 114, 182, 0.65)",
          ],
          attractorGlow: "rgba(168, 85, 247, 0.05)",
        };
      }

      return {
        bg: "#ffffff",
        milkyWayCoreInner: "rgba(79, 70, 229, 0.35)",
        milkyWayCoreOuter: "rgba(99, 102, 241, 0.15)",
        milkyWayGlow: "rgba(124, 58, 237, 0.09)",
        milkyWayDust: "rgba(14, 165, 233, 0.07)",
        spiralArmStroke1: "rgba(79, 70, 229, 0.09)",
        spiralArmStroke2: "rgba(124, 58, 237, 0.07)",
        filamentStroke1: "rgba(79, 70, 229, 0.06)",
        filamentStroke2: "rgba(14, 165, 233, 0.05)",
        webLine: "rgba(100, 116, 139, 0.03)",
        particles: [
          "rgba(79, 70, 229, 0.45)",
          "rgba(14, 165, 233, 0.4)",
          "rgba(124, 58, 237, 0.4)",
          "rgba(100, 116, 139, 0.35)",
        ],
        attractorGlow: "rgba(99, 102, 241, 0.035)",
      };
    };

    let time = 0;
    let lastTime = performance.now();
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // 3D Perspective Projection with Viewport Adaptation
    const project3D = (
      x: number,
      y: number,
      z: number,
      rotX: number,
      rotY: number,
      camYOffset: number,
    ) => {
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const x1 = x * cosY + z * sinY;
      const z1 = -x * sinY + z * cosY;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const y2 = y * cosX - z1 * sinX + camYOffset;
      const z2 = y * sinX + z1 * cosX;

      const depth = z2 + config.cameraZ;
      const scale = depth > 10 ? config.focalLength / depth : 0.001;

      const screenX = width / 2 + x1 * scale;
      const screenY = height / 2 + y2 * scale;

      return { screenX, screenY, scale, depth, x1, y2, z2 };
    };

    // Lightweight 60 FPS Render Loop
    const render = () => {
      if (!isTabVisible) return;

      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      time += prefersReducedMotion ? delta * 0.1 : delta * 0.8;
      scrollY += (targetScrollY - scrollY) * 0.08;
      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      const isDark = checkIsDark();
      const colors = getThemeColors(isDark);

      // Fast background clear
      ctx.fillStyle = colors.bg;
      ctx.fillRect(0, 0, width, height);

      const cameraRotX =
        -0.2 + mouse.y * 0.12 + ((scrollY * 0.0002) % (Math.PI * 2));
      const cameraRotY = time * 0.12 + mouse.x * 0.12;
      const cameraYOffset = -scrollY * 0.12;

      // 1. Update 3D Attractors
      const projectedAttractors = attractors3D.map((att, idx) => {
        const driftX = Math.sin(time * 0.7 + idx) * 20;
        const driftY = Math.cos(time * 0.5 + idx * 2) * 20;
        att.x = att.baseX + driftX;
        att.y = att.baseY + driftY;
        att.z = att.baseZ + Math.sin(time + idx) * 12;
        att.pulse = Math.sin(time * 1.4 + idx) * 0.1 + 1;

        const proj = project3D(
          att.x,
          att.y,
          att.z,
          cameraRotX,
          cameraRotY,
          cameraYOffset,
        );
        return { ...att, ...proj };
      });

      // Attractor Glows
      projectedAttractors.forEach((att) => {
        if (att.depth <= 20) return;
        const radius = att.radius * att.scale * att.pulse;

        const grad = ctx.createRadialGradient(
          att.screenX,
          att.screenY,
          0,
          att.screenX,
          att.screenY,
          Math.max(radius, 10),
        );
        grad.addColorStop(0, colors.attractorGlow);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(att.screenX, att.screenY, Math.max(radius, 10), 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Bezier Filament Curves
      ctx.lineWidth = 0.9;
      for (let i = 0; i < projectedAttractors.length; i++) {
        const a1 = projectedAttractors[i];
        const a2 = projectedAttractors[(i + 1) % projectedAttractors.length];

        if (a1.depth <= 20 || a2.depth <= 20) continue;

        const mid3DX = (a1.x + a2.x) / 2 + Math.sin(time + i) * 40;
        const mid3DY = (a1.y + a2.y) / 2 + Math.cos(time * 0.8 + i) * 40;
        const mid3DZ = (a1.z + a2.z) / 2 + Math.sin(time * 1.1 + i) * 40;

        const midProj = project3D(
          mid3DX,
          mid3DY,
          mid3DZ,
          cameraRotX,
          cameraRotY,
          cameraYOffset,
        );

        const grad = ctx.createLinearGradient(
          a1.screenX,
          a1.screenY,
          a2.screenX,
          a2.screenY,
        );
        grad.addColorStop(0, colors.filamentStroke1);
        grad.addColorStop(0.5, colors.filamentStroke2);
        grad.addColorStop(1, colors.filamentStroke1);

        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(a1.screenX, a1.screenY);
        ctx.quadraticCurveTo(
          midProj.screenX,
          midProj.screenY,
          a2.screenX,
          a2.screenY,
        );
        ctx.stroke();
      }

      // 3. Milky Way Core & Spiral Arms
      const mwCenter3D = projectedAttractors[1];
      if (mwCenter3D.depth > 20) {
        const mwAngle = time * 0.3;
        const mwRadiusScreen = 130 * mwCenter3D.scale;

        const mwGrad = ctx.createRadialGradient(
          mwCenter3D.screenX,
          mwCenter3D.screenY,
          0,
          mwCenter3D.screenX,
          mwCenter3D.screenY,
          Math.max(mwRadiusScreen, 12),
        );
        mwGrad.addColorStop(0, colors.milkyWayCoreInner);
        mwGrad.addColorStop(0.3, colors.milkyWayCoreOuter);
        mwGrad.addColorStop(0.65, colors.milkyWayGlow);
        mwGrad.addColorStop(0.85, colors.milkyWayDust);
        mwGrad.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = mwGrad;
        ctx.beginPath();
        ctx.arc(
          mwCenter3D.screenX,
          mwCenter3D.screenY,
          Math.max(mwRadiusScreen, 12),
          0,
          Math.PI * 2,
        );
        ctx.fill();

        // Spiral Arm Stars
        mwStars3D.forEach((star) => {
          star.theta += star.speed;
          const currentAngle = star.theta + mwAngle + star.armOffset;

          const starLocalX = star.r * Math.cos(currentAngle);
          const starLocalY = star.yOffset;
          const starLocalZ = star.r * Math.sin(currentAngle);

          const pitch = 0.9;
          const tiltedY =
            starLocalY * Math.cos(pitch) - starLocalZ * Math.sin(pitch);
          const tiltedZ =
            starLocalY * Math.sin(pitch) + starLocalZ * Math.cos(pitch);

          const starWorldX = mwCenter3D.x + starLocalX;
          const starWorldY = mwCenter3D.y + tiltedY;
          const starWorldZ = mwCenter3D.z + tiltedZ;

          const starProj = project3D(
            starWorldX,
            starWorldY,
            starWorldZ,
            cameraRotX,
            cameraRotY,
            cameraYOffset,
          );

          if (starProj.depth > 20) {
            const size = star.radius * starProj.scale;
            ctx.fillStyle = colors.particles[star.colorIndex];
            ctx.beginPath();
            ctx.arc(
              starProj.screenX,
              starProj.screenY,
              Math.max(size, 0.4),
              0,
              Math.PI * 2,
            );
            ctx.fill();
          }
        });
      }

      // 4. Laniakea Particles
      particles3D.forEach((p) => {
        const targetAttractor = attractors3D[p.attractorIndex];

        const dx = targetAttractor.x - p.x;
        const dy = targetAttractor.y - p.y;
        const dz = targetAttractor.z - p.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist > 18) {
          p.vx += (dx / dist) * 0.01;
          p.vy += (dy / dist) * 0.01;
          p.vz += (dz / dist) * 0.01;
        }

        p.vx *= 0.96;
        p.vy *= 0.96;
        p.vz *= 0.96;

        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        if (
          dist < 22 ||
          Math.abs(p.x) > 1000 ||
          Math.abs(p.y) > 1000 ||
          Math.abs(p.z) > 800
        ) {
          p.x = (Math.random() - 0.5) * 1200;
          p.y = (Math.random() - 0.5) * 1200;
          p.z = (Math.random() - 0.5) * 800;
          p.vx = (Math.random() - 0.5) * 0.4;
          p.vy = (Math.random() - 0.5) * 0.4;
          p.vz = (Math.random() - 0.5) * 0.4;
          p.attractorIndex = (p.attractorIndex + 1) % attractors3D.length;
        }

        const proj = project3D(
          p.x,
          p.y,
          p.z,
          cameraRotX,
          cameraRotY,
          cameraYOffset,
        );
        if (proj.depth > 20) {
          const particleSize = p.radius * proj.scale;
          ctx.fillStyle = colors.particles[p.colorIndex];
          ctx.beginPath();
          ctx.arc(
            proj.screenX,
            proj.screenY,
            Math.max(particleSize, 0.4),
            0,
            Math.PI * 2,
          );
          ctx.fill();
        }
      });

      // 5. Inter-Particle 3D Web Network
      ctx.strokeStyle = colors.webLine;
      ctx.lineWidth = 0.65;
      const MAX_3D_WEB_DIST = width < 640 ? 100 : 125;

      for (let i = 0; i < particles3D.length; i += 2) {
        const p1 = particles3D[i];
        const proj1 = project3D(
          p1.x,
          p1.y,
          p1.z,
          cameraRotX,
          cameraRotY,
          cameraYOffset,
        );
        if (proj1.depth <= 20) continue;

        for (let j = i + 1; j < particles3D.length; j += 2) {
          const p2 = particles3D[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dz = p1.z - p2.z;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < MAX_3D_WEB_DIST * MAX_3D_WEB_DIST) {
            const proj2 = project3D(
              p2.x,
              p2.y,
              p2.z,
              cameraRotX,
              cameraRotY,
              cameraYOffset,
            );
            if (proj2.depth <= 20) continue;

            ctx.beginPath();
            ctx.moveTo(proj1.screenX, proj1.screenY);
            ctx.lineTo(proj2.screenX, proj2.screenY);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
