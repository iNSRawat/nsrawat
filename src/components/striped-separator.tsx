import { cn } from "@/lib/utils";

export function StripedSeparator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-6 sm:h-8 w-full screen-line-after",
        "bg-[radial-gradient(circle,var(--line-dot)_0.6px,transparent_1px)] bg-[size:8px_8px]",
        className,
      )}
    />
  );
}
