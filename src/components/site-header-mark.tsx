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
        "group/mark-motion relative flex h-7 w-14 sm:h-8 sm:w-16 items-center justify-center p-0.5 sm:p-1",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SiteHeaderMark({ className }: { className?: string }) {
  return (
    <MarkContainer className={className}>
      <NSRMark className="relative z-10 h-full w-full" />
    </MarkContainer>
  );
}
