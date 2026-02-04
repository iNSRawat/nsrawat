import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function NotFound({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-[calc(100svh-5.5rem)] flex-col items-center justify-center",
        className,
      )}
    >
      <svg
        className="h-28 w-full text-border"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 160"
        fill="none"
      >
        {/* NSR Pixel Mark in outline style */}
        <path
          d="M0 0h32v32h-32zM96 0h32v32h-32zM0 32h32v32h-32zM32 32h32v32h-32zM96 32h32v32h-32zM0 64h32v32h-32zM64 64h32v32h-32zM96 64h32v32h-32zM0 96h32v32h-32zM96 96h32v32h-32zM0 128h32v32h-32zM96 128h32v32h-32zM192 0h32v32h-32zM224 0h32v32h-32zM256 0h32v32h-32zM160 32h32v32h-32zM192 64h32v32h-32zM224 64h32v32h-32zM256 96h32v32h-32zM160 128h32v32h-32zM192 128h32v32h-32zM224 128h32v32h-32zM320 0h32v32h-32zM352 0h32v32h-32zM384 0h32v32h-32zM320 32h32v32h-32zM416 32h32v32h-32zM320 64h32v32h-32zM352 64h32v32h-32zM384 64h32v32h-32zM320 96h32v32h-32zM384 96h32v32h-32zM320 128h32v32h-32zM416 128h32v32h-32z"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <h1 className="my-6 text-8xl font-medium tracking-tighter tabular-nums">
        404
      </h1>

      <Button variant="default" asChild>
        <Link href="/">
          Go to Home
          <ArrowRightIcon />
        </Link>
      </Button>
    </div>
  );
}
