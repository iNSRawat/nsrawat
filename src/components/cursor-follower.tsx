"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import * as React from "react";

export function CursorFollower() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 20, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  React.useEffect(() => {
    const checkIsDesktop = () => {
      return window.innerWidth >= 768; // md breakpoint
    };

    if (!checkIsDesktop()) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="cursor-follower"
      style={{
        x,
        y,
      }}
    />
  );
}
