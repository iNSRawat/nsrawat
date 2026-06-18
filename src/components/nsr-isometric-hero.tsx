"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { PronounceMyName } from "@/features/portfolio/components/pronounce-my-name";
import { VerifiedIcon } from "@/features/portfolio/components/verified-icon";
import { USER } from "@/features/portfolio/data/user";

// Typewriter hook — cycles through sentences with type/delete animation
function useTypewriter(sentences: string[], speed = 60, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [sentenceIdx, setSentenceIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!sentences.length) return;
    const current = sentences[sentenceIdx] ?? "";
    if (!deleting && charIdx < current.length) {
      const id = setTimeout(() => {
        setDisplay(current.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      }, speed);
      return () => clearTimeout(id);
    }
    if (!deleting && charIdx === current.length) {
      const id = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(id);
    }
    if (deleting && charIdx > 0) {
      const id = setTimeout(() => {
        setDisplay(current.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      }, speed / 2);
      return () => clearTimeout(id);
    }
    if (deleting && charIdx === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDeleting(false);
      setSentenceIdx((i) => (i + 1) % sentences.length);
    }
  }, [charIdx, deleting, sentenceIdx, sentences, speed, pause]);

  return { display, blink };
}

// Live clock — updates every second in user's timezone
function LiveClock({ timeZone }: { timeZone: string }) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  if (!now) return null;
  const time = now.toLocaleTimeString("en-US", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  const date = now.toLocaleDateString("en-US", {
    timeZone,
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  return (
    <span className="tabular-nums">
      {time}
      <span className="mx-1.5 opacity-40">·</span>
      {date}
    </span>
  );
}

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
  customOutline?: string;
}

// Origin centered so NSR geometry fills the viewBox "150 95 700 420"
// Geometry spans: x:[237,764], y:[132,478] → center (500,305)
// ViewBox center: (150+350, 95+210) = (500, 305) — perfect match.
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

function getTopOutlinePath(block: Block): string {
  if (block.customOutline) {
    return block.customOutline;
  }
  const p1 = project(block.top[0].x, block.top[0].y, 0);
  const p2 = project(block.top[1].x, block.top[1].y, 0);
  const p3 = project(block.top[2].x, block.top[2].y, 0);
  const p4 = project(block.top[3].x, block.top[3].y, 0);

  if (block.skipRightEdge) {
    return `M ${p3} L ${p4} L ${p1} L ${p2}`;
  }
  if (block.skipLeftEdge) {
    return `M ${p1} L ${p2} L ${p3} L ${p4}`;
  }
  return `M ${p1} L ${p2} L ${p3} L ${p4} Z`;
}

// NSR blocks — same geometry as before
const blocksList: Block[] = [
  // N (3 blocks)
  {
    ...createBlock(96, 128, 0, 160),
    sides: [
      { A: { x: 96, y: 0 }, B: { x: 96, y: 106.67 } },
      { A: { x: 96, y: 160 }, B: { x: 128, y: 160 } },
    ],
    customOutline: `M ${project(96, 106.67, 0)} L ${project(96, 0, 0)} L ${project(128, 0, 0)} L ${project(128, 160, 0)} L ${project(96, 160, 0)}`,
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
    customOutline: `M ${project(0, 0, 0)} L ${project(32, 0, 0)} L ${project(96, 106.67, 0)} M ${project(96, 160, 0)} L ${project(0, 0, 0)}`,
  },
  {
    ...createBlock(0, 32, 0, 160),
    customOutline: `M ${project(32, 53.33, 0)} L ${project(32, 160, 0)} L ${project(0, 160, 0)} L ${project(0, 0, 0)} L ${project(32, 0, 0)}`,
  },

  // S (5 blocks)
  createBlock(192, 288, 0, 32),
  {
    ...createBlock(160, 192, 32, 96),
    customOutline: `M ${project(192, 64, 0)} L ${project(192, 32, 0)} L ${project(160, 32, 0)} L ${project(160, 96, 0)} L ${project(192, 96, 0)}`,
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

// Tight viewBox: geometry spans x:[237,764], y:[132,478]
// Add ~30px padding → viewBox centered on (500, 305) at 5:3 ratio
// width=700, height=420 → x:[150,850], y:[95,515] → center (500,305) ✓
const VB_X = 150;
const VB_Y = 95;
const VB_W = 700;
const VB_H = 420;

// Compute construction lines within tight viewBox extents
const [gx0] = projectXY(0, 0, 0); // left edge x
const [gx1] = projectXY(448, 160, 0); // right edge x
const [, gy0] = projectXY(448, 0, 0); // top edge y
const [, gy1] = projectXY(0, 160, H); // bottom edge y

export function NsrIsometricHero() {
  const { display, blink } = useTypewriter(USER.flipSentences);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120, mass: 0.8 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const translateX = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const translateY = useTransform(springY, [-0.5, 0.5], [-10, 10]);

  const gridTranslateX = useTransform(springX, [-0.5, 0.5], [4, -4]);
  const gridTranslateY = useTransform(springY, [-0.5, 0.5], [4, -4]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (shouldReduceMotion) return;
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
    };
    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };
    const el = containerRef.current;
    el?.addEventListener("mousemove", handleMouseMove);
    el?.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el?.removeEventListener("mousemove", handleMouseMove);
      el?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, shouldReduceMotion]);

  const floatAnimate = shouldReduceMotion ? {} : { y: [-4, 4] };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const floatTransition: any = shouldReduceMotion
    ? {}
    : {
        y: {
          duration: 9,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse" as const,
        },
      };

  return (
    <div
      ref={containerRef}
      className="group relative aspect-[5/3] w-full border-x border-edge select-none transition-colors duration-300"
      style={
        {
          backgroundColor: "var(--hero-bg)",
          "--hero-bg": "var(--color-hero-bg)",
          "--stroke-color": "var(--color-stroke-mix)",
          "--stroke-hover-color": "var(--color-stroke-hover-mix)",
          "--hatch-color": "var(--color-hatch-mix)",
          "--depth-fill": "var(--color-depth)",
          "--grid-color": "var(--color-grid)",
          "--helper-color": "var(--color-helper)",
          "--text-color": "var(--color-text-var)",
        } as React.CSSProperties
      }
    >
      {/* Isometric grid background */}
      <motion.div
        style={{ x: gridTranslateX, y: gridTranslateY }}
        className="absolute inset-0 pointer-events-none z-1 overflow-hidden"
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="iso-grid-react"
              width="40"
              height="23.094"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 0 0 L 20 11.547 L 40 0 M 0 23.094 L 20 11.547 L 40 23.094 M 20 0 L 20 23.094"
                fill="none"
                stroke="var(--grid-color)"
                strokeWidth="0.75"
                className="transition-colors duration-300"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#iso-grid-react)" />
        </svg>
      </motion.div>

      {/* Right-side status column — available badge + FIG_001 */}
      <div className="absolute bottom-3 right-4 z-20 pointer-events-none select-none flex flex-col items-end gap-3">
        {/* Available for work badge */}
        <span className="inline-flex items-center gap-1.5 rounded-sm border border-edge bg-background/60 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground backdrop-blur-sm sm:text-[10px]">
          <span className="relative flex size-1.5 shrink-0">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
          </span>
          Available for work
        </span>

        {/* FIG_001 label */}
        <span
          className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] font-light transition-colors duration-300"
          style={{ color: "var(--text-color)" }}
        >
          FIG_001
        </span>
      </div>

      {/* Profile overlay — bottom-left, avatar half-clipped by hero bottom border (chanhdai.com style) */}
      <div className="absolute bottom-0 left-0 z-30 flex translate-y-1/2 items-center gap-3 px-4 sm:gap-5 sm:px-6 pointer-events-auto">
        {/* Avatar — bottom half bleeds below the hero container */}
        <div className="relative shrink-0">
          <Image
            className="size-16 rounded-full ring-1 ring-border ring-offset-2 ring-offset-background select-none sm:size-24"
            alt={`${USER.displayName}'s avatar`}
            src={USER.avatar}
            width={96}
            height={96}
            priority
          />
        </div>

        {/* Name + verified + audio / typewriter / location + clock */}
        <div className="flex flex-col gap-0.5 sm:gap-1">
          {/* Row 1: Name + verified badge + audio icon */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <h1 className="font-mono text-sm font-bold tracking-tight text-foreground [word-spacing:-0.15em] sm:text-base">
              {USER.displayName}
            </h1>
            <VerifiedIcon
              className="size-4 shrink-0 text-info sm:size-4.5"
              aria-label="Verified"
            />
            {USER.namePronunciationUrl && (
              <PronounceMyName
                namePronunciationUrl={USER.namePronunciationUrl}
              />
            )}
          </div>

          {/* Row 2: Typewriter rotating headline */}
          <p className="font-mono text-[10px] font-bold text-foreground sm:text-xs">
            <span className="font-normal opacity-60">~/</span>
            {display}
            <span
              className="ml-px inline-block h-[1em] w-[2px] align-middle bg-muted-foreground transition-opacity"
              style={{ opacity: blink ? 1 : 0 }}
            />
          </p>

          {/* Row 3: Location + live clock */}
          <div className="flex flex-wrap items-center gap-x-1 gap-y-0.5 font-mono text-[10px] text-muted-foreground sm:text-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="size-3 shrink-0"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            <span>{USER.address}</span>
            <span className="mx-1 opacity-40">·</span>
            <LiveClock timeZone={USER.timeZone} />
          </div>
        </div>
      </div>

      {/* SVG canvas — fills container, viewBox tightly wraps NSR geometry */}
      <motion.svg
        style={{ x: translateX, y: translateY }}
        viewBox={`${VB_X} ${VB_Y} ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 h-full w-full cursor-crosshair will-change-transform z-10 overflow-hidden"
        color="var(--stroke-color)"
      >
        <defs>
          <pattern
            id="nsr-top-hatch"
            x="0"
            y="0"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M-1 1l2 -2M0 10l10 -10M9 11l2 -2"
              stroke="var(--hatch-color)"
              strokeWidth="1"
              className="transition-colors duration-300"
            />
          </pattern>
        </defs>

        {/* Construction lines — clipped to viewBox */}
        <g className="transition-opacity duration-300">
          {/* Horizontal midline */}
          <line
            x1={VB_X}
            y1={(gy0 + gy1) / 2}
            x2={VB_X + VB_W}
            y2={(gy0 + gy1) / 2}
            stroke="var(--helper-color)"
            strokeWidth="0.75"
            strokeDasharray="4 8"
            className="transition-colors duration-300"
          />
          {/* Isometric diagonal axes */}
          <line
            x1={VB_X}
            y1={VB_Y + VB_H}
            x2={VB_X + VB_W}
            y2={VB_Y}
            stroke="var(--helper-color)"
            strokeWidth="0.75"
            strokeDasharray="4 8"
            className="transition-colors duration-300"
          />
          <line
            x1={VB_X}
            y1={VB_Y}
            x2={VB_X + VB_W}
            y2={VB_Y + VB_H}
            stroke="var(--helper-color)"
            strokeWidth="0.75"
            strokeDasharray="4 8"
            className="transition-colors duration-300"
          />
          {/* Vertical registration at geometry left/right edges */}
          <line
            x1={gx0}
            y1={VB_Y}
            x2={gx0}
            y2={VB_Y + VB_H}
            stroke="var(--helper-color)"
            strokeWidth="0.75"
            strokeDasharray="4 8"
            className="transition-colors duration-300"
          />
          <line
            x1={gx1}
            y1={VB_Y}
            x2={gx1}
            y2={VB_Y + VB_H}
            stroke="var(--helper-color)"
            strokeWidth="0.75"
            strokeDasharray="4 8"
            className="transition-colors duration-300"
          />
        </g>

        {/* Floating monogram geometry */}
        <motion.g
          animate={floatAnimate}
          transition={floatTransition}
          className="will-change-transform"
        >
          {sortedBlocks.map((block, idx) => {
            const topPoints = block.top
              .map((p) => project(p.x, p.y, 0))
              .join(" ");
            return (
              <g key={`block-${idx}`}>
                {block.sides.map((side, sIdx) => {
                  const sidePoints = [
                    project(side.A.x, side.A.y, 0),
                    project(side.B.x, side.B.y, 0),
                    project(side.B.x, side.B.y, H),
                    project(side.A.x, side.A.y, H),
                  ].join(" ");
                  return (
                    <polygon
                      key={`side-${sIdx}`}
                      points={sidePoints}
                      fill="var(--hero-bg)"
                      stroke="var(--stroke-color)"
                      strokeWidth="0.75"
                      strokeLinejoin="round"
                      className="group-hover:stroke-[var(--stroke-hover-color)] transition-colors duration-300"
                    />
                  );
                })}

                <path
                  d={getTopOutlinePath(block)}
                  fill="var(--hero-bg)"
                  stroke="currentColor"
                  strokeWidth="0.75"
                  strokeLinejoin="round"
                  className="group-hover:stroke-[var(--stroke-hover-color)] transition-colors duration-300"
                />

                <polygon
                  points={topPoints}
                  fill="url(#nsr-top-hatch)"
                  stroke="none"
                />
              </g>
            );
          })}
        </motion.g>
      </motion.svg>
    </div>
  );
}
