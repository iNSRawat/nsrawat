"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useId, useRef, useState } from "react";

import { useSound } from "@/hooks/use-sound";

interface Point2D {
  x: number;
  y: number;
}

interface BlockSide {
  A: Point2D;
  B: Point2D;
}

interface Block {
  top: Point2D[];
  sides: BlockSide[];
  depth: number;
  skipRightEdge?: boolean;
  skipLeftEdge?: boolean;
  customOutlineFn?: (z: number) => string;
}

const originX = 237;
const originY = 356;
const cos30 = 0.8660254;
const sin30 = 0.5;
const H = 42;

function project(x: number, y: number, z: number): string {
  const px = originX + (x + y) * cos30;
  const py = originY + (-x + y) * sin30 + z;
  return `${px.toFixed(2)},${py.toFixed(2)}`;
}

function projectXY(x: number, y: number, z: number): [number, number] {
  return [originX + (x + y) * cos30, originY + (-x + y) * sin30 + z];
}

function createBlock(x1: number, x2: number, y1: number, y2: number): Block {
  const p1 = { x: x1, y: y1 };
  const p2 = { x: x2, y: y1 };
  const p3 = { x: x2, y: y2 };
  const p4 = { x: x1, y: y2 };
  return {
    top: [p1, p2, p3, p4],
    sides: [
      { A: p1, B: p4 },
      { A: p4, B: p3 },
    ],
    depth: -(x1 + x2) / 2 + (y1 + y2) / 2,
  };
}

function createSlantedBlock(
  p1: Point2D,
  p2: Point2D,
  p3: Point2D,
  p4: Point2D,
): Block {
  return {
    top: [p1, p2, p3, p4],
    sides: [
      { A: p1, B: p4 },
      { A: p4, B: p3 },
    ],
    depth: -(p1.x + p3.x) / 2 + (p1.y + p3.y) / 2,
  };
}

function getTopOutlinePath(block: Block, z: number): string {
  if (block.customOutlineFn) {
    return block.customOutlineFn(z);
  }
  const p1 = project(block.top[0].x, block.top[0].y, z);
  const p2 = project(block.top[1].x, block.top[1].y, z);
  const p3 = project(block.top[2].x, block.top[2].y, z);
  const p4 = project(block.top[3].x, block.top[3].y, z);

  if (block.skipRightEdge) {
    return `M ${p3} L ${p4} L ${p1} L ${p2}`;
  }
  if (block.skipLeftEdge) {
    return `M ${p1} L ${p2} L ${p3} L ${p4}`;
  }
  return `M ${p1} L ${p2} L ${p3} L ${p4} Z`;
}

// Complete original intact NSR 3D isometric monogram blocks
const blocksList: Block[] = [
  // N (3 blocks)
  {
    ...createBlock(96, 128, 0, 160),
    sides: [
      { A: { x: 96, y: 0 }, B: { x: 96, y: 106.67 } },
      { A: { x: 96, y: 160 }, B: { x: 128, y: 160 } },
    ],
    customOutlineFn: (z: number) =>
      `M ${project(96, 106.67, z)} L ${project(96, 0, z)} L ${project(128, 0, z)} L ${project(128, 160, z)} L ${project(96, 160, z)}`,
  },
  {
    ...createSlantedBlock(
      { x: 0, y: 0 },
      { x: 32, y: 0 },
      { x: 128, y: 160 },
      { x: 96, y: 160 },
    ),
    sides: [
      { A: { x: 32, y: 53.33 }, B: { x: 96, y: 160 } },
      { A: { x: 96, y: 160 }, B: { x: 128, y: 160 } },
    ],
    customOutlineFn: (z: number) =>
      `M ${project(0, 0, z)} L ${project(32, 0, z)} L ${project(96, 106.67, z)} M ${project(96, 160, z)} L ${project(0, 0, z)}`,
  },
  {
    ...createBlock(0, 32, 0, 160),
    customOutlineFn: (z: number) =>
      `M ${project(32, 53.33, z)} L ${project(32, 160, z)} L ${project(0, 160, z)} L ${project(0, 0, z)} L ${project(32, 0, z)}`,
  },

  // S (5 blocks)
  createBlock(192, 288, 0, 32),
  {
    ...createBlock(160, 192, 32, 96),
    customOutlineFn: (z: number) =>
      `M ${project(192, 64, z)} L ${project(192, 32, z)} L ${project(160, 32, z)} L ${project(160, 96, z)} L ${project(192, 96, z)}`,
  },
  {
    ...createBlock(192, 256, 64, 96),
    sides: [{ A: { x: 192, y: 96 }, B: { x: 256, y: 96 } }],
    skipLeftEdge: true,
  },
  createBlock(256, 288, 96, 128),
  createBlock(160, 256, 128, 160),

  // R (5 blocks)
  createBlock(320, 352, 0, 160),
  createBlock(352, 416, 0, 32),
  createBlock(416, 448, 0, 64),
  createBlock(352, 416, 64, 96),
  createSlantedBlock(
    { x: 384, y: 96 },
    { x: 416, y: 96 },
    { x: 448, y: 160 },
    { x: 416, y: 160 },
  ),
];

const sortedBlocks = [...blocksList].sort((a, b) => a.depth - b.depth);

const VB_X = 150;
const VB_Y = 95;
const VB_W = 700;
const VB_H = 420;

const [gx0, gy0] = projectXY(0, 0, 0);
const [gx1, gy1] = projectXY(448, 160, H);

export interface SpotlightLogoProps {
  className?: string;
  enableSound?: boolean;
}

export function SpotlightLogo({
  className,
  enableSound = true,
}: SpotlightLogoProps) {
  const containerRef = useRef<SVGSVGElement>(null);
  const isInView = useInView(containerRef);
  const shouldReduceMotion = useReducedMotion();
  const rawId = useId();
  const radialGradientId = `spotlight-grad-${rawId.replace(/:/g, "")}`;
  const facePatternId = `spotlight-hatch-${rawId.replace(/:/g, "")}`;
  const playClick = useSound("/audio/ui-sounds/click.wav");

  const [isPressed, setIsPressed] = useState(false);

  // Spotlight mouse tracking in SVG coordinates
  const mouseX = useMotionValue(500);
  const mouseY = useMotionValue(305);
  const springConfig = { damping: 25, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const spotlightCx = useTransform(smoothX, (v) => v.toFixed(2));
  const spotlightCy = useTransform(smoothY, (v) => v.toFixed(2));

  // Parallax tilt effect
  const translateX = useTransform(smoothX, [VB_X, VB_X + VB_W], [-8, 8]);
  const translateY = useTransform(smoothY, [VB_Y, VB_Y + VB_H], [-5, 5]);

  const pressOffset = useMotionValue(0);
  const [offsetVal, setOffsetVal] = useState(0);

  useMotionValueEvent(pressOffset, "change", (latest) => {
    setOffsetVal(latest);
  });

  useEffect(() => {
    const controls = animate(pressOffset, isPressed ? 14 : 0, {
      type: "spring",
      stiffness: 600,
      damping: 15,
      mass: 0.5,
    });
    return () => controls.stop();
  }, [isPressed, pressOffset]);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const el = containerRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isInView) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(VB_X + x * VB_W);
      mouseY.set(VB_Y + y * VB_H);
    };

    const handleMouseLeave = () => {
      mouseX.set(500);
      mouseY.set(305);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, shouldReduceMotion, isInView]);

  return (
    <motion.svg
      ref={containerRef}
      style={{ x: translateX, y: translateY }}
      viewBox={`${VB_X} ${VB_Y} ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`h-full w-full cursor-pointer select-none will-change-transform overflow-visible ${className ?? ""}`}
      onPointerDown={(e) => {
        e.preventDefault();
        setIsPressed(true);
        if (enableSound) playClick();
      }}
      onPointerUp={() => setIsPressed(false)}
      onPointerLeave={() => setIsPressed(false)}
      onPointerCancel={() => setIsPressed(false)}
    >
      <defs>
        <pattern
          id={facePatternId}
          x="0"
          y="0"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M-1 1l2 -2M0 10l10 -10M9 11l2 -2"
            stroke="color-mix(in oklab, var(--foreground) 15%, transparent)"
            strokeWidth="1"
          />
        </pattern>

        <motion.radialGradient
          id={radialGradientId}
          cx={spotlightCx}
          cy={spotlightCy}
          r="220"
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(-30 500 305) translate(0 35)"
        >
          <stop
            className="dark:[stop-color:#ffffff]"
            stopColor="var(--color-zinc-800, #27272a)"
          />
          <stop
            className="dark:[stop-color:var(--color-zinc-500, #71717a)]"
            offset="1"
            stopColor="var(--color-zinc-400, #a1a1aa)"
            stopOpacity="0"
          />
        </motion.radialGradient>
      </defs>

      {/* Blueprint construction guide lines */}
      <g
        className="stroke-muted-foreground/15 dark:stroke-muted-foreground/20"
        strokeWidth="0.75"
        strokeDasharray="4 8"
      >
        <line
          x1={VB_X}
          y1={(gy0 + gy1) / 2}
          x2={VB_X + VB_W}
          y2={(gy0 + gy1) / 2}
        />
        <line x1={VB_X} y1={VB_Y + VB_H} x2={VB_X + VB_W} y2={VB_Y} />
        <line x1={VB_X} y1={VB_Y} x2={VB_X + VB_W} y2={VB_Y + VB_H} />
        <line x1={gx0} y1={VB_Y} x2={gx0} y2={VB_Y + VB_H} />
        <line x1={gx1} y1={VB_Y} x2={gx1} y2={VB_Y + VB_H} />
      </g>

      {/* 3D Isometric NSR Monogram — rotated 18.5 deg so the baseline follows the user's straight line */}
      <g transform="translate(0 -35) rotate(30 500 305)">
        {sortedBlocks.map((block, idx) => {
          const topPoints = block.top
            .map((p) => project(p.x, p.y, offsetVal))
            .join(" ");

          return (
            <g key={`block-${idx}`}>
              {/* Sides faces */}
              {block.sides.map((side, sIdx) => {
                const sidePoints = [
                  project(side.A.x, side.A.y, offsetVal),
                  project(side.B.x, side.B.y, offsetVal),
                  project(side.B.x, side.B.y, H),
                  project(side.A.x, side.A.y, H),
                ].join(" ");
                return (
                  <polygon
                    key={`side-${sIdx}`}
                    points={sidePoints}
                    fill="var(--background)"
                    stroke="color-mix(in oklab, var(--foreground) 20%, transparent)"
                    strokeWidth="0.75"
                    strokeLinejoin="round"
                  />
                );
              })}

              {/* Top face base outline */}
              <path
                d={getTopOutlinePath(block, offsetVal)}
                fill="var(--background)"
                stroke="color-mix(in oklab, var(--foreground) 22%, transparent)"
                strokeWidth="0.75"
                strokeLinejoin="round"
              />

              {/* Top face hatch */}
              <polygon
                points={topPoints}
                fill={`url(#${facePatternId})`}
                stroke="none"
              />

              {/* Cursor-tracking Spotlight highlight strokes (sides) */}
              {block.sides.map((side, sIdx) => {
                const sidePoints = [
                  project(side.A.x, side.A.y, offsetVal),
                  project(side.B.x, side.B.y, offsetVal),
                  project(side.B.x, side.B.y, H),
                  project(side.A.x, side.A.y, H),
                ].join(" ");
                return (
                  <polygon
                    key={`side-spotlight-${sIdx}`}
                    points={sidePoints}
                    fill="none"
                    stroke={`url(#${radialGradientId})`}
                    strokeWidth="1.25"
                    strokeLinejoin="round"
                    className="pointer-events-none"
                  />
                );
              })}

              {/* Cursor-tracking Spotlight highlight stroke (top outline) */}
              <path
                d={getTopOutlinePath(block, offsetVal)}
                fill="none"
                stroke={`url(#${radialGradientId})`}
                strokeWidth="1.25"
                strokeLinejoin="round"
                className="pointer-events-none"
              />
            </g>
          );
        })}
      </g>
    </motion.svg>
  );
}
