"use client";

import { cn } from "@/lib/utils";

import { NSRMark } from "./nsr-mark";

function MarkContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group/mark-motion relative flex h-8 w-16 items-center justify-center p-1",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SiteHeaderMark() {
  return (
    <MarkContainer>
      <NSRMark className="relative z-10 h-full w-full" />
    </MarkContainer>
  );
}
