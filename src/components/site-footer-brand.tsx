"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import * as React from "react";

const VIEWBOX_WIDTH = 1120;
const DEFAULT_GRADIENT_X = 560;
const SPELLOUT_DURATION = 2.2;
const GLINT_DURATION = 0.9;
const GLINT_INTERVAL = 8000;

export function SiteFooterBrand() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.25, once: false });

  // Mouse-reactive gradient position
  const gradientX1Raw = useMotionValue(DEFAULT_GRADIENT_X);
  const gradientX1 = useSpring(gradientX1Raw, {
    stiffness: 200,
    damping: 30,
    mass: 0.5,
  });

  // Laser beam position and reveal progress (range: -60 to 1180)
  const laserX = useMotionValue(-60);
  const laserOpacity = useMotionValue(0);
  const revealWidth = useMotionValue(0);

  // Glint / Shimmer animation values
  const glintX = useMotionValue(-200);
  const glintOpacity = useMotionValue(0);

  // Interactive hover flare
  const hoverFlareX = useMotionValue(-200);
  const hoverFlareOpacity = useMotionValue(0);

  const isHoveredRef = React.useRef(false);
  const isEtchedRef = React.useRef(false);

  // Derived transforms for laser glow & flare
  const laserHeadLeft = useTransform(laserX, (val) => val - 60);
  const laserBeamX1 = useTransform(laserX, (val) => val);
  const laserBeamX2 = useTransform(laserX, (val) => val);

  // Play full laser-etch spellout animation
  const playLaserEtch = React.useCallback(() => {
    // Check reduced motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      revealWidth.set(VIEWBOX_WIDTH);
      laserOpacity.set(0);
      isEtchedRef.current = true;
      return;
    }

    // Reset initial state
    laserX.set(-40);
    laserOpacity.set(1);
    revealWidth.set(0);
    glintOpacity.set(0);
    isEtchedRef.current = false;

    // Animate laser head across the logotype
    animate(laserX, VIEWBOX_WIDTH + 40, {
      duration: SPELLOUT_DURATION,
      ease: [0.25, 0.1, 0.25, 1],
      onUpdate: (latest) => {
        // Keep reveal width locked to laser head
        revealWidth.set(Math.max(0, Math.min(VIEWBOX_WIDTH, latest)));
      },
      onComplete: () => {
        // Fade out laser beam
        animate(laserOpacity, 0, { duration: 0.3 });
        isEtchedRef.current = true;
      },
    });
  }, [laserX, laserOpacity, revealWidth, glintOpacity]);

  // Trigger laser etch on scroll into view
  React.useEffect(() => {
    if (isInView) {
      playLaserEtch();
    }
  }, [isInView, playLaserEtch]);

  // Periodic subtle glint sweep when idle
  React.useEffect(() => {
    const glintTimer = setInterval(() => {
      if (!isEtchedRef.current || isHoveredRef.current) return;

      glintX.set(-200);
      glintOpacity.set(0.75);

      animate(glintX, VIEWBOX_WIDTH + 200, {
        duration: GLINT_DURATION,
        ease: "easeInOut",
        onComplete: () => {
          glintOpacity.set(0);
        },
      });
    }, GLINT_INTERVAL);

    return () => clearInterval(glintTimer);
  }, [glintX, glintOpacity]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const container = event.currentTarget;
    const containerRect = container.getBoundingClientRect();
    const mouseX = event.clientX - containerRect.left;
    const containerWidth = containerRect.width;

    const normalizedX = (mouseX / containerWidth) * VIEWBOX_WIDTH;
    const clampedX = Math.max(0, Math.min(VIEWBOX_WIDTH, normalizedX));

    gradientX1Raw.set(clampedX);
    hoverFlareX.set(clampedX - 80);
    hoverFlareOpacity.set(0.4);
  };

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    gradientX1Raw.set(DEFAULT_GRADIENT_X);
    animate(hoverFlareOpacity, 0, { duration: 0.4 });
  };

  const handleClick = () => {
    playLaserEtch();
  };

  const pathD =
    "M0 0h32v32h-32zM96 0h32v32h-32zM0 32h32v32h-32zM16 32h32v32h-32zM96 32h32v32h-32zM0 64h32v32h-32zM48 64h32v32h-32zM96 64h32v32h-32zM0 96h32v32h-32zM80 96h32v32h-32zM96 96h32v32h-32zM0 128h32v32h-32zM96 128h32v32h-32zM192 0h32v32h-32zM224 0h32v32h-32zM256 0h32v32h-32zM160 32h32v32h-32zM192 64h32v32h-32zM224 64h32v32h-32zM256 96h32v32h-32zM160 128h32v32h-32zM192 128h32v32h-32zM224 128h32v32h-32zM320 0h32v32h-32zM352 0h32v32h-32zM384 0h32v32h-32zM320 32h32v32h-32zM416 32h32v32h-32zM320 64h32v32h-32zM352 64h32v32h-32zM384 64h32v32h-32zM320 96h32v32h-32zM384 96h32v32h-32zM320 128h32v32h-32zM416 128h32v32h-32zM512 32h32v32h-32zM544 32h32v32h-32zM576 32h32v32h-32zM480 64h32v32h-32zM576 64h32v32h-32zM480 96h32v32h-32zM544 96h32v32h-32zM576 96h32v32h-32zM512 128h32v32h-32zM576 128h32v32h-32zM640 32h32v32h-32zM768 32h32v32h-32zM640 64h32v32h-32zM768 64h32v32h-32zM640 96h32v32h-32zM704 96h32v32h-32zM768 96h32v32h-32zM640 128h32v32h-32zM672 128h32v32h-32zM736 128h32v32h-32zM768 128h32v32h-32zM864 32h32v32h-32zM896 32h32v32h-32zM928 32h32v32h-32zM832 64h32v32h-32zM928 64h32v32h-32zM832 96h32v32h-32zM896 96h32v32h-32zM928 96h32v32h-32zM864 128h32v32h-32zM928 128h32v32h-32zM1024 0h32v32h-32zM992 32h32v32h-32zM1024 32h32v32h-32zM1056 32h32v32h-32zM1024 64h32v32h-32zM1024 96h32v32h-32zM1024 128h32v32h-32zM1056 128h32v32h-32z";

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      title="Click to replay NSRawat laser etching animation"
      aria-label="NSRawat logotype - click to replay animation"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          playLaserEtch();
        }
      }}
      className="group relative flex w-full cursor-pointer flex-col items-center justify-center overflow-hidden focus:outline-none"
    >
      <div className="relative w-full max-w-7xl translate-y-0 select-none px-4 transition-transform duration-500 md:px-8">
        <svg
          viewBox="0 -4 1120 168"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full text-foreground"
        >
          <defs>
            {/* Base revealed depth gradient */}
            <motion.linearGradient
              id="footer-brand-gradient"
              x1={gradientX1}
              y1="0"
              x2={DEFAULT_GRADIENT_X}
              y2="160"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.2" stopColor="currentColor" stopOpacity="0" />
              <stop offset="0.65" stopColor="currentColor" stopOpacity="0.3" />
              <stop offset="1" stopColor="currentColor" stopOpacity="0.85" />
            </motion.linearGradient>

            {/* Laser scanning vertical beam gradient with Omarchy turquoise core */}
            <linearGradient
              id="laser-beam-gradient"
              x1="0"
              y1="0"
              x2="0"
              y2="160"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#9ECE6A" stopOpacity="0.15" />
              <stop offset="0.2" stopColor="#9ECE6A" stopOpacity="0.85" />
              <stop offset="0.5" stopColor="#B4F9F8" stopOpacity="1" />
              <stop offset="0.8" stopColor="#9ECE6A" stopOpacity="0.85" />
              <stop offset="1" stopColor="#9ECE6A" stopOpacity="0.15" />
            </linearGradient>

            {/* Laser etching active flare gradient with Omarchy green & turquoise */}
            <linearGradient
              id="laser-flare-gradient"
              x1="0"
              y1="0"
              x2="1"
              y2="0"
            >
              <stop offset="0%" stopColor="#9ECE6A" stopOpacity="0" />
              <stop offset="40%" stopColor="#9ECE6A" stopOpacity="0.5" />
              <stop offset="70%" stopColor="#B4F9F8" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#9ECE6A" stopOpacity="0.1" />
            </linearGradient>

            {/* Periodic / Idle Glint Gradient with Omarchy colors */}
            <linearGradient
              id="laser-glint-gradient"
              x1="0"
              y1="0"
              x2="1"
              y2="0"
            >
              <stop offset="0%" stopColor="#9ECE6A" stopOpacity="0" />
              <stop offset="50%" stopColor="#9ECE6A" stopOpacity="0.55" />
              <stop offset="70%" stopColor="#B4F9F8" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#9ECE6A" stopOpacity="0" />
            </linearGradient>

            {/* Laser Glow Filter */}
            <filter
              id="laser-glow-filter"
              x="-40%"
              y="-40%"
              width="180%"
              height="180%"
            >
              <feGaussianBlur stdDeviation="4" result="blur1" />
              <feGaussianBlur stdDeviation="1.5" result="blur2" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Reveal Clip Path controlled by laser head */}
            <clipPath id="laser-reveal-clip">
              <motion.rect
                x="0"
                y="-10"
                width={revealWidth}
                height="180"
                fill="#ffffff"
              />
            </clipPath>

            {/* Blocks Outline Clip Path for Flare & Glint Effects */}
            <clipPath id="laser-blocks-clip">
              <path d={pathD} />
            </clipPath>
          </defs>

          {/* Layer 1: Subtle ghost/matrix wireframe */}
          <path
            d={pathD}
            fill="currentColor"
            fillOpacity="0.035"
            stroke="currentColor"
            strokeOpacity="0.12"
            strokeWidth="1"
          />

          {/* Layer 2: Progressively revealed etched brand blocks */}
          <g clipPath="url(#laser-reveal-clip)">
            {/* Base block fill with crisp stroke */}
            <path
              d={pathD}
              fill="currentColor"
              fillOpacity="0.04"
              stroke="currentColor"
              strokeOpacity="0.15"
              strokeWidth="1"
            />
            {/* Smooth depth gradient */}
            <path d={pathD} fill="url(#footer-brand-gradient)" />
          </g>

          {/* Layer 3: Laser etching active flare on the blocks (Omarchy Green/Turquoise) */}
          <g clipPath="url(#laser-blocks-clip)">
            {/* Etching spark band attached to laser head */}
            <motion.rect
              x={laserHeadLeft}
              y="-10"
              width="120"
              height="180"
              fill="url(#laser-flare-gradient)"
              opacity={laserOpacity}
            />

            {/* Periodic Glint sweep across etched blocks */}
            <motion.rect
              x={glintX}
              y="-10"
              width="200"
              height="180"
              fill="url(#laser-glint-gradient)"
              opacity={glintOpacity}
            />

            {/* Interactive cursor hover spotlight */}
            <motion.rect
              x={hoverFlareX}
              y="-10"
              width="160"
              height="180"
              fill="url(#laser-glint-gradient)"
              opacity={hoverFlareOpacity}
            />
          </g>

          {/* Layer 4: Vertical Laser Scanner Beam with Omarchy sparks */}
          <motion.g opacity={laserOpacity}>
            {/* Outer laser glow beam */}
            <motion.line
              x1={laserBeamX1}
              y1="-6"
              x2={laserBeamX2}
              y2="166"
              stroke="#9ECE6A"
              strokeWidth="4"
              strokeOpacity="0.6"
              filter="url(#laser-glow-filter)"
            />

            {/* Inner intense core laser line */}
            <motion.line
              x1={laserBeamX1}
              y1="-4"
              x2={laserBeamX2}
              y2="164"
              stroke="url(#laser-beam-gradient)"
              strokeWidth="1.75"
            />

            {/* Top laser emitter / spark node */}
            <motion.circle
              cx={laserBeamX1}
              cy="-2"
              r="3.5"
              fill="#B4F9F8"
              filter="url(#laser-glow-filter)"
            />
            <motion.circle cx={laserBeamX1} cy="-2" r="2" fill="#FFFFFF" />

            {/* Bottom laser emitter / spark node */}
            <motion.circle
              cx={laserBeamX1}
              cy="162"
              r="3.5"
              fill="#B4F9F8"
              filter="url(#laser-glow-filter)"
            />
            <motion.circle cx={laserBeamX1} cy="162" r="2" fill="#FFFFFF" />
          </motion.g>
        </svg>
      </div>
    </div>
  );
}
