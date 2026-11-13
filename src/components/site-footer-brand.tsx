"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import * as React from "react";

const VIEWBOX_WIDTH = 1120;

export function SiteFooterBrand() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Mouse tracking with smooth spring physics
  const mouseXRaw = useMotionValue(-1000);
  const mouseX = useSpring(mouseXRaw, {
    stiffness: 220,
    damping: 30,
    mass: 0.5,
  });
  const hoverOpacity = useSpring(0, { stiffness: 250, damping: 28 });

  // Spotlight gradient endpoints derived from cursor X position
  const spotlightX1 = useTransform(mouseX, (x) => x - 140);
  const spotlightX2 = useTransform(mouseX, (x) => x + 140);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const mouseXPos = event.clientX - containerRect.left;
    const containerWidth = containerRect.width;

    const normalizedX = (mouseXPos / containerWidth) * VIEWBOX_WIDTH;
    const clampedX = Math.max(0, Math.min(VIEWBOX_WIDTH, normalizedX));

    mouseXRaw.set(clampedX);
    hoverOpacity.set(1);
  };

  const handleMouseEnter = () => {
    hoverOpacity.set(1);
  };

  const handleMouseLeave = () => {
    hoverOpacity.set(0);
  };

  const pathD =
    "M0 0h32v32h-32zM96 0h32v32h-32zM0 32h32v32h-32zM16 32h32v32h-32zM96 32h32v32h-32zM0 64h32v32h-32zM48 64h32v32h-32zM96 64h32v32h-32zM0 96h32v32h-32zM80 96h32v32h-32zM96 96h32v32h-32zM0 128h32v32h-32zM96 128h32v32h-32zM192 0h32v32h-32zM224 0h32v32h-32zM256 0h32v32h-32zM160 32h32v32h-32zM192 64h32v32h-32zM224 64h32v32h-32zM256 96h32v32h-32zM160 128h32v32h-32zM192 128h32v32h-32zM224 128h32v32h-32zM320 0h32v32h-32zM352 0h32v32h-32zM384 0h32v32h-32zM320 32h32v32h-32zM416 32h32v32h-32zM320 64h32v32h-32zM352 64h32v32h-32zM384 64h32v32h-32zM320 96h32v32h-32zM384 96h32v32h-32zM320 128h32v32h-32zM416 128h32v32h-32zM512 32h32v32h-32zM544 32h32v32h-32zM576 32h32v32h-32zM480 64h32v32h-32zM576 64h32v32h-32zM480 96h32v32h-32zM544 96h32v32h-32zM576 96h32v32h-32zM512 128h32v32h-32zM576 128h32v32h-32zM640 32h32v32h-32zM768 32h32v32h-32zM640 64h32v32h-32zM768 64h32v32h-32zM640 96h32v32h-32zM704 96h32v32h-32zM768 96h32v32h-32zM640 128h32v32h-32zM672 128h32v32h-32zM736 128h32v32h-32zM768 128h32v32h-32zM864 32h32v32h-32zM896 32h32v32h-32zM928 32h32v32h-32zM832 64h32v32h-32zM928 64h32v32h-32zM832 96h32v32h-32zM896 96h32v32h-32zM928 96h32v32h-32zM864 128h32v32h-32zM928 128h32v32h-32zM1024 0h32v32h-32zM992 32h32v32h-32zM1024 32h32v32h-32zM1056 32h32v32h-32zM1024 64h32v32h-32zM1024 96h32v32h-32zM1024 128h32v32h-32zM1056 128h32v32h-32z";

  // Pure outer perimeter boundary outline without internal dividing grid lines
  const outlinePath =
    "M0 0L32 0M96 0L128 0M192 0L288 0M320 0L416 0M1024 0L1056 0M32 32L48 32M160 32L288 32M352 32L448 32M512 32L608 32M640 32L672 32M768 32L800 32M864 32L960 32M992 32L1024 32M1056 32L1088 32M32 64L80 64M160 64L256 64M352 64L448 64M480 64L576 64M832 64L928 64M992 64L1024 64M1056 64L1088 64M48 96L96 96M192 96L288 96M352 96L384 96M544 96L576 96M704 96L736 96M896 96L928 96M80 128L96 128M160 128L288 128M384 128L448 128M480 128L576 128M672 128L768 128M832 128L928 128M1056 128L1088 128M0 160L32 160M96 160L128 160M160 160L256 160M320 160L352 160M416 160L448 160M512 160L544 160M576 160L608 160M640 160L704 160M736 160L800 160M864 160L896 160M928 160L960 160M1024 160L1088 160M0 0L0 160M32 0L32 32M32 64L32 160M48 32L48 96M80 64L80 128M96 0L96 96M96 128L96 160M128 0L128 160M160 32L160 64M160 128L160 160M192 0L192 96M256 64L256 160M288 0L288 32M288 96L288 128M320 0L320 160M352 32L352 64M352 96L352 160M384 96L384 128M416 0L416 160M448 32L448 64M448 128L448 160M480 64L480 128M512 32L512 160M544 96L544 160M576 64L576 96M576 128L576 160M608 32L608 160M640 32L640 160M672 32L672 128M704 96L704 160M736 96L736 160M768 32L768 128M800 32L800 160M832 64L832 128M864 32L864 160M896 96L896 160M928 64L928 96M928 128L928 160M960 32L960 160M992 32L992 64M1024 0L1024 32M1024 64L1024 160M1056 0L1056 32M1056 64L1056 128M1088 32L1088 64M1088 128L1088 160";

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex w-full flex-col items-center justify-center overflow-hidden"
    >
      <div className="relative w-full max-w-7xl translate-y-0 select-none px-4 transition-transform duration-500 md:px-8">
        <svg
          viewBox="0 -4 1120 186"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full text-foreground"
        >
          <defs>
            {/* Clean CAD hatching pattern (closely spaced diagonal lines) */}
            <pattern
              id="brand-cad-hatch"
              width="6"
              height="6"
              patternTransform="rotate(45 0 0)"
              patternUnits="userSpaceOnUse"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="6"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeOpacity="0.22"
              />
            </pattern>

            {/* Spotlight gradient that moves with cursor */}
            <motion.linearGradient
              id="brand-spotlight-gradient"
              gradientUnits="userSpaceOnUse"
              x1={spotlightX1}
              y1="0"
              x2={spotlightX2}
              y2="0"
            >
              <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
              <stop offset="28%" stopColor="currentColor" stopOpacity="0.3" />
              <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
              <stop offset="72%" stopColor="currentColor" stopOpacity="0.3" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </motion.linearGradient>
          </defs>

          {/* Layer 1: Base clean CAD hatched letters (NO internal grid lines) */}
          <path d={pathD} fill="url(#brand-cad-hatch)" stroke="none" />

          {/* Layer 2: Base clean outer perimeter boundary outline */}
          <path
            d={outlinePath}
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.22"
            strokeWidth="1"
          />

          {/* Layer 3: Interactive cursor spotlight - illuminates letters under cursor only */}
          <motion.path
            d={pathD}
            fill="url(#brand-spotlight-gradient)"
            stroke="none"
            style={{ opacity: hoverOpacity }}
          />

          {/* Layer 4: Interactive cursor spotlight outer outline highlight */}
          <motion.path
            d={outlinePath}
            fill="none"
            stroke="url(#brand-spotlight-gradient)"
            strokeWidth="1.25"
            style={{ opacity: hoverOpacity }}
          />

          {/* Layer 5: Technical Blueprint Dimension Line */}
          <g className="text-muted-foreground/35 font-mono select-none">
            {/* Left end vertical tick */}
            <line
              x1="0"
              y1="168"
              x2="0"
              y2="182"
              stroke="currentColor"
              strokeWidth="0.75"
            />
            {/* Left extension arrow */}
            <polyline
              points="8,172 2,175 8,178"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
            />

            {/* Horizontal dimension lines */}
            <line
              x1="2"
              y1="175"
              x2="528"
              y2="175"
              stroke="currentColor"
              strokeWidth="0.75"
            />
            <text
              x="560"
              y="178"
              textAnchor="middle"
              fontSize="9"
              fill="currentColor"
              opacity="0.75"
              letterSpacing="0.05em"
            >
              1120
            </text>
            <line
              x1="592"
              y1="175"
              x2="1118"
              y2="175"
              stroke="currentColor"
              strokeWidth="0.75"
            />

            {/* Right extension arrow */}
            <polyline
              points="1112,172 1118,175 1112,178"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
            />
            {/* Right end vertical tick */}
            <line
              x1="1120"
              y1="168"
              x2="1120"
              y2="182"
              stroke="currentColor"
              strokeWidth="0.75"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
