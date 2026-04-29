"use client";

import { useEffect, useRef, useState } from "react";

import { ContactTabs } from "@/components/contact-tabs";
import { cn } from "@/lib/utils";

const ROTATING_WORDS = ["Collaborations", "Ideas", "Projects", "Solutions"];

function AnimatedWord() {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setShow(false);
      timeoutRef.current = setTimeout(() => {
        setIndex((i) => (i + 1) % ROTATING_WORDS.length);
        setShow(true);
      }, 350);
    }, 3000);

    return () => {
      clearInterval(interval);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <span
      className="inline-block font-bold transition-all duration-300"
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(8px)",
      }}
    >
      {ROTATING_WORDS[index]}
    </span>
  );
}

function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-8 w-full",
        "before:absolute before:-left-[100vw] before:-z-1 before:h-8 before:w-[200vw]",
        "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56",
        className,
      )}
    />
  );
}

export default function ContactPage() {
  return (
    <div className="mx-auto border-x border-edge md:max-w-3xl">
      {/* Top stripe separator - matching docs layout */}
      <div
        className={cn(
          "h-8 px-2",
          "screen-line-after",
          "before:absolute before:-left-[100vw] before:-z-1 before:h-full before:w-[200vw]",
          "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56",
        )}
      />

      {/* Page Header */}
      <div className="screen-line-after px-2 sm:px-4">
        <h1 className="text-2xl sm:text-3xl font-semibold">
          Let&apos;s work on <AnimatedWord />
        </h1>
      </div>

      <div className="p-2 sm:p-4">
        <p className="font-mono text-sm text-balance text-muted-foreground">
          Whether you have a question, a project proposal, or just want to say
          hi, I&apos;ll try my best to get back to you!
        </p>
      </div>

      <Separator />

      {/* Tabs Section - no header since page already has one */}
      <div className="p-2 sm:p-4">
        <ContactTabs showHeader={false} showFormDescription />
      </div>

      <Separator />
    </div>
  );
}
