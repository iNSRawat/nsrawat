"use client";

import { animate, motion, useInView, useMotionValue } from "motion/react";
import * as React from "react";

import { cn } from "@/lib/utils";

// Unified "NSR" monogram ligature combining N, S, and R into one interconnected master letter
// flowing directly into cursive "awat" with an underline flourish
const SIGNATURE_PATH =
  "M 16 48 C 20 34, 24 20, 30 16 C 34 14, 36 22, 34 35 C 32 48, 36 62, 42 62 C 46 62, 50 46, 54 28 C 57 16, 62 14, 66 20 C 62 10, 52 8, 46 14 C 38 22, 44 36, 54 44 C 64 52, 60 62, 48 62 C 40 62, 38 56, 42 50 C 48 44, 60 34, 66 18 C 68 12, 76 10, 82 16 C 88 22, 86 34, 76 38 C 70 40, 66 38, 70 38 C 74 38, 82 46, 90 58 C 94 48, 98 42, 103 42 C 108 42, 104 52, 105 58 C 110 48, 114 42, 118 42 C 122 42, 121 52, 123 58 C 127 48, 131 42, 135 42 C 139 42, 138 52, 138 58 C 142 48, 146 42, 150 42 C 154 42, 151 52, 152 58 C 156 40, 160 22, 162 20 C 164 20, 162 40, 162 56 C 162 63, 168 61, 174 54 C 166 66, 138 72, 98 74 C 58 76, 26 74, 14 71 C 22 70, 88 70, 230 73";

const ANIMATION_DURATION = 2.0; // seconds

export function SiteSignature({ className }: { className?: string }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const pathRef = React.useRef<SVGPathElement>(null);
  const isInView = useInView(containerRef, { amount: 0.35, once: false });

  // Motion values for pen position & state
  const penX = useMotionValue(16);
  const penY = useMotionValue(48);
  const penOpacity = useMotionValue(0);
  const penLift = useMotionValue(0);
  const pathProgress = useMotionValue(1); // 0 to 1

  const [isSigning, setIsSigning] = React.useState(false);

  // Audio state
  const audioContextRef = React.useRef<AudioContext | null>(null);
  const activeSourceRef = React.useRef<AudioBufferSourceNode | null>(null);
  const hasAutoPlayedRef = React.useRef(false);

  // Initialize total length of SVG path
  React.useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      if (length > 0) {
        const startPoint = pathRef.current.getPointAtLength(0);
        penX.set(startPoint.x);
        penY.set(startPoint.y);
      }
    }
  }, [penX, penY]);

  // Pen-on-paper sound generator using Web Audio API
  const playWritingSound = React.useCallback((durationSec: number) => {
    try {
      if (typeof window === "undefined") return;

      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;

      if (!AudioContextClass) return;

      if (
        !audioContextRef.current ||
        audioContextRef.current.state === "closed"
      ) {
        audioContextRef.current = new AudioContextClass();
      }

      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }

      // Stop previous playing sound
      if (activeSourceRef.current) {
        try {
          activeSourceRef.current.stop();
          activeSourceRef.current.disconnect();
        } catch {
          // ignore
        }
        activeSourceRef.current = null;
      }

      const sampleRate = ctx.sampleRate;
      const bufferSize = Math.floor(sampleRate * durationSec);
      const buffer = ctx.createBuffer(1, bufferSize, sampleRate);
      const data = buffer.getChannelData(0);

      // Synthesize realistic textured paper friction & fountain pen nib scratch
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        lastOut = lastOut * 0.72 + white * 0.28;
        const paperGrain =
          Math.random() < 0.035 ? (Math.random() * 2 - 1) * 0.5 : 0;
        data[i] = lastOut * 0.75 + paperGrain;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = buffer;
      activeSourceRef.current = noiseSource;

      // Bandpass filter to isolate crisp pen scratch resonance (~2600Hz - 3600Hz)
      const bandpass = ctx.createBiquadFilter();
      bandpass.type = "bandpass";
      bandpass.frequency.setValueAtTime(2900, ctx.currentTime);
      bandpass.Q.setValueAtTime(2.4, ctx.currentTime);

      // Highpass filter to eliminate any boomy low frequencies (< 850Hz)
      const highpass = ctx.createBiquadFilter();
      highpass.type = "highpass";
      highpass.frequency.setValueAtTime(850, ctx.currentTime);

      // Master volume gain node
      const masterGain = ctx.createGain();
      const startTime = ctx.currentTime;
      masterGain.gain.setValueAtTime(0.0001, startTime);

      // Micro-rhythms matching the NSR monogram and cursive letters
      const strokes: [number, number, number][] = [
        [0.05, 0.24, 0.17], // N stem and diagonal
        [0.26, 0.44, 0.18], // S intertwine
        [0.46, 0.68, 0.19], // R head and leg
        [0.72, 0.88, 0.14], // a loop
        [0.9, 1.06, 0.14], // w valleys
        [1.08, 1.22, 0.14], // a loop
        [1.24, 1.45, 0.17], // t ascender
        [1.5, 1.95, 0.22], // underline flourish sweep
      ];

      for (const [sStart, sEnd, peak] of strokes) {
        if (sStart < durationSec) {
          const t1 = startTime + sStart;
          const t2 = startTime + Math.min(sEnd, durationSec);
          const tMid = t1 + (t2 - t1) * 0.45;

          masterGain.gain.setValueAtTime(0.0001, t1);
          masterGain.gain.exponentialRampToValueAtTime(peak, tMid);
          masterGain.gain.exponentialRampToValueAtTime(0.0001, t2);
        }
      }

      masterGain.gain.setValueAtTime(0.0001, startTime + durationSec);

      noiseSource.connect(bandpass);
      bandpass.connect(highpass);
      highpass.connect(masterGain);
      masterGain.connect(ctx.destination);

      noiseSource.start(startTime);
      noiseSource.stop(startTime + durationSec);
    } catch {
      // Audio fails silently if blocked
    }
  }, []);

  // Animate the writing of the signature
  const playSignAnimation = React.useCallback(
    (withSound = true) => {
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        pathProgress.set(1);
        penOpacity.set(0);
        setIsSigning(false);
        return;
      }

      const pathEl = pathRef.current;
      if (!pathEl) return;

      const totalLen = pathEl.getTotalLength();
      if (totalLen <= 0) return;

      setIsSigning(true);

      // Reset starting position
      const startPoint = pathEl.getPointAtLength(0);
      penX.set(startPoint.x);
      penY.set(startPoint.y);
      penLift.set(0);
      penOpacity.set(1);
      pathProgress.set(0);

      if (withSound) {
        playWritingSound(ANIMATION_DURATION);
      }

      // Animate path progress from 0 to 1
      animate(pathProgress, 1, {
        duration: ANIMATION_DURATION,
        ease: [0.22, 0.05, 0.25, 1], // Natural fluid handwriting curve
        onUpdate: (latest) => {
          const point = pathEl.getPointAtLength(latest * totalLen);
          penX.set(point.x);
          penY.set(point.y);
        },
        onComplete: () => {
          // Pen lifts up and fades out smoothly
          animate(penLift, -5, { duration: 0.2, ease: "easeOut" });
          animate(penOpacity, 0, {
            duration: 0.2,
            ease: "easeOut",
            onComplete: () => {
              setIsSigning(false);
            },
          });
        },
      });
    },
    [penX, penY, penLift, penOpacity, pathProgress, playWritingSound],
  );

  // Auto-play signature when scrolled into view
  React.useEffect(() => {
    if (isInView && !hasAutoPlayedRef.current) {
      hasAutoPlayedRef.current = true;
      const timer = setTimeout(() => {
        playSignAnimation(false); // Silent on initial scroll
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isInView, playSignAnimation]);

  // Clean up sound on unmount
  React.useEffect(() => {
    return () => {
      if (activeSourceRef.current) {
        try {
          activeSourceRef.current.stop();
          activeSourceRef.current.disconnect();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  const handleClick = () => {
    playSignAnimation(true);
  };

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      title="Click to sign NSRawat"
      aria-label="Handwritten signature of NSRawat. Click to re-sign with pen animation and sound."
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      className={cn(
        "group relative inline-flex items-center select-none cursor-pointer focus:outline-none",
        "bg-transparent border-0 p-0 transition-opacity duration-200 hover:opacity-80",
        "focus-visible:ring-1 focus-visible:ring-ring rounded-sm",
        className,
      )}
    >
      <div className="relative w-32 sm:w-36 max-w-full">
        <svg
          viewBox="0 0 240 78"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto overflow-visible"
        >
          {/* Subtle ghost trace for depth and crispness */}
          <path
            d={SIGNATURE_PATH}
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-foreground/10"
          />

          {/* Active drawing signature stroke */}
          <motion.path
            ref={pathRef}
            d={SIGNATURE_PATH}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-foreground/90 transition-colors group-hover:text-foreground"
            style={{
              pathLength: pathProgress,
            }}
          />

          {/* Animated pen gliding along the signature path */}
          <motion.g
            style={{
              x: penX,
              y: penY,
              opacity: penOpacity,
            }}
            className="pointer-events-none drop-shadow-sm"
          >
            {/* Pen lifted offset and 45-degree angle pointing nib to stroke tip */}
            <motion.g
              style={{
                y: penLift,
              }}
              transform="rotate(45) scale(0.55)"
            >
              {/* Drafting / Fountain Pen Nib */}
              <path
                d="M 0 0 L -3.5 -10 L 3.5 -10 Z"
                fill="currentColor"
                fillOpacity="0.12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
                className="text-foreground"
              />
              {/* Nib center ink slit */}
              <line
                x1="0"
                y1="-2"
                x2="0"
                y2="-7.5"
                stroke="currentColor"
                strokeWidth="1"
                className="text-foreground"
              />
              {/* Metallic collar band */}
              <rect
                x="-4"
                y="-14"
                width="8"
                height="4"
                rx="0.5"
                fill="currentColor"
                fillOpacity="0.3"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-foreground"
              />
              {/* Pen cylindrical barrel */}
              <path
                d="M -3.5 -14 L -3.5 -48 C -3.5 -51, 3.5 -51, 3.5 -48 L 3.5 -14 Z"
                fill="currentColor"
                fillOpacity="0.08"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
                className="text-foreground"
              />
              {/* Clip detail on the barrel */}
              <line
                x1="2.2"
                y1="-20"
                x2="2.2"
                y2="-44"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                className="text-foreground"
              />
            </motion.g>
          </motion.g>
        </svg>
      </div>

      {/* Discreet accessible indicator visible only on hover when not signing */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -bottom-3 left-0 text-[8px] font-mono text-muted-foreground/60 tracking-wider",
          "opacity-0 transition-opacity duration-200 group-hover:opacity-100",
          isSigning && "opacity-0 group-hover:opacity-0",
        )}
      >
        click to sign
      </span>
    </div>
  );
}
