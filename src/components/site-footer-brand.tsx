"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import * as React from "react";

const VIEWBOX_WIDTH = 1120;
const DEFAULT_GRADIENT_X = 560;

export function SiteFooterBrand() {
  const gradientX1Raw = useMotionValue(DEFAULT_GRADIENT_X);
  const gradientX1 = useSpring(gradientX1Raw, {
    stiffness: 200,
    damping: 30,
    mass: 0.5,
  });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const container = event.currentTarget;
    const containerRect = container.getBoundingClientRect();
    const mouseX = event.clientX - containerRect.left;
    const containerWidth = containerRect.width;

    const normalizedX = (mouseX / containerWidth) * VIEWBOX_WIDTH;
    const clampedX = Math.max(0, Math.min(VIEWBOX_WIDTH, normalizedX));

    gradientX1Raw.set(clampedX);
  };

  const handleMouseLeave = () => {
    gradientX1Raw.set(DEFAULT_GRADIENT_X);
  };

  const pathD =
    "M0 0h32v32h-32zM96 0h32v32h-32zM0 32h32v32h-32zM16 32h32v32h-32zM96 32h32v32h-32zM0 64h32v32h-32zM48 64h32v32h-32zM96 64h32v32h-32zM0 96h32v32h-32zM80 96h32v32h-32zM96 96h32v32h-32zM0 128h32v32h-32zM96 128h32v32h-32zM192 0h32v32h-32zM224 0h32v32h-32zM256 0h32v32h-32zM160 32h32v32h-32zM192 64h32v32h-32zM224 64h32v32h-32zM256 96h32v32h-32zM160 128h32v32h-32zM192 128h32v32h-32zM224 128h32v32h-32zM320 0h32v32h-32zM352 0h32v32h-32zM384 0h32v32h-32zM320 32h32v32h-32zM416 32h32v32h-32zM320 64h32v32h-32zM352 64h32v32h-32zM384 64h32v32h-32zM320 128h32v32h-32zM416 128h32v32h-32zM512 32h32v32h-32zM544 32h32v32h-32zM576 64h32v32h-32zM512 96h32v32h-32zM544 96h32v32h-32zM576 96h32v32h-32zM480 128h32v32h-32zM576 128h32v32h-32zM640 32h32v32h-32zM768 32h32v32h-32zM640 64h32v32h-32zM768 64h32v32h-32zM640 96h32v32h-32zM704 96h32v32h-32zM768 96h32v32h-32zM640 128h32v32h-32zM672 128h32v32h-32zM736 128h32v32h-32zM768 128h32v32h-32zM864 32h32v32h-32zM896 32h32v32h-32zM928 64h32v32h-32zM864 96h32v32h-32zM896 96h32v32h-32zM928 96h32v32h-32zM832 128h32v32h-32zM928 128h32v32h-32zM1024 0h32v32h-32zM992 32h32v32h-32zM1024 32h32v32h-32zM1056 32h32v32h-32zM1024 64h32v32h-32zM1024 96h32v32h-32zM1024 128h32v32h-32zM1056 128h32v32h-32z";

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex w-full flex-col items-center justify-center overflow-hidden"
    >
      <div className="pointer-events-none relative w-full max-w-7xl translate-y-[35%] select-none px-4 transition-transform duration-500 md:px-8">
        <svg
          viewBox="0 0 1120 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path d={pathD} className="stroke-foreground/10" strokeWidth="1" />
          <path d={pathD} fill="url(#footer-brand-gradient)" />
          <defs>
            <motion.linearGradient
              id="footer-brand-gradient"
              x1={gradientX1}
              y1="0"
              x2={DEFAULT_GRADIENT_X}
              y2="160"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.625" stopColor="currentColor" stopOpacity="0" />
              <stop offset="1" stopColor="currentColor" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
