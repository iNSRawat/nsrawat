"use client";

import { cn } from "@/lib/utils";

import { NSRMark } from "./nsr-mark";

function MarkContainer({
  children,
  className,
  showPlaceholder = true,
}: {
  children: React.ReactNode;
  className?: string;
  showPlaceholder?: boolean;
}) {
  return (
    <div
      className={cn(
        "group/mark-motion relative flex h-8 w-16 items-center justify-center p-1",
        "before:absolute before:inset-0 before:rounded-md before:ring-1 before:ring-inset before:ring-border",
        "before:bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)]",
        "before:bg-[length:6px_6px]",
        "before:transition-opacity before:duration-500",
        showPlaceholder ? "before:opacity-100" : "before:opacity-0",
        "[--pattern-fg:hsl(var(--border)/0.56)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SiteHeaderMark() {
  return (
    <MarkContainer showPlaceholder={false}>
      <NSRMark className="relative z-10 h-full w-full" />
    </MarkContainer>
  );
}
