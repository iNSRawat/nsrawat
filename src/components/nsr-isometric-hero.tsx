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
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

import { PronounceMyName } from "@/features/portfolio/components/pronounce-my-name";
import { VerifiedIcon } from "@/features/portfolio/components/verified-icon";
import { USER } from "@/features/portfolio/data/user";
import { useSound } from "@/hooks/use-sound";

// Typewriter hook — cycles through sentences with type/delete animation
function useTypewriter(sentences: string[], speed = 60, pause = 2000) {
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
    const current = sentences[sentenceIdx % sentences.length] ?? "";

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
      const id = setTimeout(
        () => {
          setDisplay(current.slice(0, charIdx - 1));
          setCharIdx((c) => c - 1);
        },
        Math.max(25, speed / 2),
      );
      return () => clearTimeout(id);
    }

    if (deleting && charIdx === 0) {
      const id = setTimeout(() => {
        setDeleting(false);
        setSentenceIdx((i) => (i + 1) % sentences.length);
      }, 250);
      return () => clearTimeout(id);
    }
  }, [charIdx, deleting, sentenceIdx, speed, pause, sentences]);

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
    <span className="tabular-nums inline-flex items-center shrink-0">
      <span>{time}</span>
      <span className="hidden sm:inline">
        <span className="mx-1 opacity-40">·</span>
        {date}
      </span>
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
  customOutlineFn?: (z: number) => string;
}

// Original NSR isometric projection parameters
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

// SVG viewBox centered around (500, 305)
const VB_X = 150;
const VB_Y = 95;
const VB_W = 700;
const VB_H = 420;

const [gx0, gy0] = projectXY(0, 0, 0);
const [gx1, gy1] = projectXY(448, 160, H);

export function NsrIsometricHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef);
  const shouldReduceMotion = useReducedMotion();
  const rawId = useId();
  const radialGradientId = `nsr-spotlight-${rawId.replace(/:/g, "")}`;
  const hatchPatternId = `nsr-top-hatch-${rawId.replace(/:/g, "")}`;

  // Interactive UI sound
  const playClick = useSound("/audio/ui-sounds/click.wav");

  // 3D physical block press animation
  const [isPressed, setIsPressed] = useState(false);
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

  // Spotlight mouse & touch tracking in SVG coordinates
  const mouseX = useMotionValue(500);
  const mouseY = useMotionValue(305);
  const springConfig = { damping: 25, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const spotlightCx = useTransform(smoothX, (v) => v.toFixed(2));
  const spotlightCy = useTransform(smoothY, (v) => v.toFixed(2));

  // Parallax tilt based on cursor movement
  const translateX = useTransform(smoothX, [VB_X, VB_X + VB_W], [-8, 8]);
  const translateY = useTransform(smoothY, [VB_Y, VB_Y + VB_H], [-5, 5]);

  // Gentle idle floating animation
  const floatAnimate = shouldReduceMotion ? { y: 0 } : { y: [-3, 3] };

  const floatTransition = shouldReduceMotion
    ? { duration: 0 }
    : {
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "mirror" as const,
        ease: "easeInOut" as const,
        duration: 3.5,
      };

  const { display, blink } = useTypewriter(USER.flipSentences, 50, 2000);

  // Mouse & Touch movement tracking
  useEffect(() => {
    if (shouldReduceMotion) return;
    const el = containerRef.current;
    if (!el) return;

    const updateCoords = (clientX: number, clientY: number) => {
      if (!isInView) return;
      const rect = el.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;
      mouseX.set(VB_X + Math.max(0, Math.min(1, x)) * VB_W);
      mouseY.set(VB_Y + Math.max(0, Math.min(1, y)) * VB_H);
    };

    const handleMouseMove = (e: MouseEvent) => {
      updateCoords(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateCoords(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleMouseLeave = () => {
      mouseX.set(500);
      mouseY.set(305);
    };

    el.addEventListener("mousemove", handleMouseMove, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: true });
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, shouldReduceMotion, isInView]);

  return (
    <div
      ref={containerRef}
      className="group relative h-[250px] xs:h-[270px] sm:h-[290px] md:h-[310px] w-full border-x border-edge border-b bg-background screen-line-after select-none transition-colors duration-300"
    >
      {/* SVG Canvas with Clean Dark Background and 3D Isometric NSR Spotlight Logo */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none scale-[0.70] xs:scale-[0.80] sm:scale-[0.90] md:scale-100 -translate-y-5 sm:-translate-y-3 origin-center overflow-hidden">
        <motion.svg
          style={{ x: translateX, y: translateY }}
          viewBox={`${VB_X} ${VB_Y} ${VB_W} ${VB_H}`}
          preserveAspectRatio="xMidYMid meet"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full cursor-pointer will-change-transform overflow-visible pointer-events-auto"
          onPointerDown={(e) => {
            e.preventDefault();
            setIsPressed(true);
            playClick();
          }}
          onPointerUp={() => setIsPressed(false)}
          onPointerLeave={() => setIsPressed(false)}
          onPointerCancel={() => setIsPressed(false)}
        >
          <defs>
            <pattern
              id={hatchPatternId}
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

          {/* Clean construction guide lines (chanhdai style) */}
          <g
            className="stroke-muted-foreground/15 dark:stroke-muted-foreground/20"
            strokeWidth="0.75"
            strokeDasharray="4 8"
          >
            {/* Horizontal midline */}
            <line
              x1={VB_X}
              y1={(gy0 + gy1) / 2}
              x2={VB_X + VB_W}
              y2={(gy0 + gy1) / 2}
            />
            {/* Isometric diagonal axes */}
            <line x1={VB_X} y1={VB_Y + VB_H} x2={VB_X + VB_W} y2={VB_Y} />
            <line x1={VB_X} y1={VB_Y} x2={VB_X + VB_W} y2={VB_Y + VB_H} />
            {/* Vertical registration markers */}
            <line x1={gx0} y1={VB_Y} x2={gx0} y2={VB_Y + VB_H} />
            <line x1={gx1} y1={VB_Y} x2={gx1} y2={VB_Y + VB_H} />
          </g>

          {/* Floating intact NSR 3D monogram — rotated 30 deg and shifted so N is lifted up and baseline is straight */}
          <motion.g
            transform="translate(0 -35) rotate(30 500 305)"
            animate={floatAnimate}
            transition={floatTransition}
            className="cursor-pointer will-change-transform"
          >
            {sortedBlocks.map((block, idx) => {
              const topPoints = block.top
                .map((p) => project(p.x, p.y, offsetVal))
                .join(" ");
              return (
                <g key={`block-${idx}`}>
                  {/* Extruded side faces with dark fill */}
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
                        className="fill-background stroke-muted-foreground/30 transition-colors duration-200"
                        strokeWidth="0.75"
                        strokeLinejoin="round"
                      />
                    );
                  })}

                  {/* Top face polygon background */}
                  <polygon
                    points={topPoints}
                    className="fill-background stroke-muted-foreground/40 transition-colors duration-200"
                    strokeWidth="0.75"
                    strokeLinejoin="round"
                  />

                  {/* Top face isometric hatch pattern */}
                  <polygon
                    points={topPoints}
                    fill={`url(#${hatchPatternId})`}
                    stroke="none"
                  />

                  {/* Top face clean boundary outline */}
                  <path
                    d={getTopOutlinePath(block, offsetVal)}
                    fill="none"
                    className="stroke-muted-foreground/50 transition-colors duration-200"
                    strokeWidth="0.75"
                    strokeLinejoin="round"
                  />

                  {/* Spotlight cursor-tracking dynamic glow strokes */}
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
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                        className="pointer-events-none"
                      />
                    );
                  })}

                  <path
                    d={getTopOutlinePath(block, offsetVal)}
                    fill="none"
                    stroke={`url(#${radialGradientId})`}
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    className="pointer-events-none"
                  />
                </g>
              );
            })}
          </motion.g>
        </motion.svg>
      </div>

      {/* Outer handwritten note in right margin (chanhdai.com style) */}
      <div
        className="pointer-events-none absolute -right-24 sm:-right-28 md:-right-32 top-14 sm:top-18 hidden md:flex flex-col items-start select-none font-signature text-muted-foreground/85 z-20"
        aria-hidden="true"
      >
        <svg
          className="size-5 text-muted-foreground/60 -rotate-12 mb-0.5 ml-1"
          viewBox="0 0 40 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M30 35c-2-12-8-22-22-26" />
          <path d="M18 6l-10 3 3 10" />
        </svg>
        <span className="-rotate-3 text-base leading-tight">
          follows your cursor
        </span>
        <span className="-rotate-3 text-base leading-tight">
          click for a sound
        </span>
      </div>

      {/* Profile Photo and Name overlay — transparent, no box, responsive across mobile, tablet, and desktop */}
      <div className="absolute bottom-2.5 sm:bottom-4 left-0 right-0 z-30 flex items-center justify-between px-3 sm:px-6 pointer-events-auto">
        {/* Left: Avatar + Details (simple and transparent, no box) */}
        <div className="flex items-center gap-2.5 sm:gap-4 w-full min-w-0">
          {/* Avatar */}
          <div className="relative shrink-0">
            <Image
              className="size-14 xs:size-16 sm:size-20 md:size-22 rounded-full object-cover ring-2 ring-border/80 shadow-md select-none"
              alt={USER.displayName}
              src={USER.avatar}
              width={88}
              height={88}
              priority
            />
          </div>

          {/* Details */}
          <div className="flex flex-col gap-0.5 sm:gap-1 min-w-0 flex-1">
            {/* Row 1: Name + verified + sound */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h1 className="text-base sm:text-xl md:text-2xl font-bold tracking-tight text-foreground font-mono shrink-0">
                {USER.displayName}
              </h1>
              <VerifiedIcon className="size-4 sm:size-4.5 text-blue-500 shrink-0" />
              <PronounceMyName
                namePronunciationUrl={USER.namePronunciationUrl}
              />
            </div>

            {/* Row 2: Typewriter bio with terminal prompt */}
            <p className="font-mono text-xs sm:text-sm font-bold text-foreground flex items-center min-w-0">
              <span className="text-muted-foreground/60 mr-1 select-none shrink-0">
                ~/
              </span>
              <span className="truncate">{display}</span>
              <span
                className="inline-block w-1.5 h-3.5 bg-foreground ml-0.5 align-middle shrink-0"
                style={{ opacity: blink ? 1 : 0 }}
              />
            </p>

            {/* Row 3: Location + live clock */}
            <div className="flex items-center gap-1 sm:gap-1.5 font-mono text-[10px] xs:text-[11px] sm:text-xs text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis">
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
              <span className="shrink-0">{USER.address}</span>
              <span className="mx-0.5 sm:mx-1 opacity-40 shrink-0">·</span>
              <LiveClock timeZone={USER.timeZone} />
            </div>
          </div>
        </div>

        {/* Right: Available for work status badge (single-line, transparent) */}
        <div className="hidden md:inline-flex shrink-0 items-center gap-2 font-mono text-xs text-muted-foreground/90 select-none whitespace-nowrap ml-4">
          <span className="relative flex size-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span className="whitespace-nowrap">Available for work</span>
        </div>
      </div>
    </div>
  );
}
