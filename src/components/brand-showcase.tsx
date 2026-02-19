import { useId } from "react";

import { cn } from "@/lib/utils";

export function BrandShowcase({
  children,
  className,
  showGrid = true,
}: {
  children: React.ReactNode;
  className?: string;
  showGrid?: boolean;
}) {
  const id = useId();

  return (
    <div
      className={cn(
        "not-prose relative overflow-hidden rounded-xl border bg-neutral-950",
        className,
      )}
    >
      {showGrid && (
        <div className="absolute inset-0 z-0 opacity-20">
          <svg
            className="h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
          >
            <defs>
              <pattern
                id={id}
                width="32"
                height="32"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0 32V.5H32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-neutral-500"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${id})`} />
          </svg>
        </div>
      )}
      <div className="relative z-10 flex h-full w-full items-center justify-center">
        {children}
      </div>
    </div>
  );
}
