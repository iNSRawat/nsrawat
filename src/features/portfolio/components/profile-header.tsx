"use client";

import { USER } from "@/features/portfolio/data/user";

export function ProfileHeader() {
  return (
    <div className="relative border-x border-edge">
      <div className="px-5 pt-5 pb-4 sm:px-8 sm:pt-6 sm:pb-5">
        {/* Availability badge — only thing remaining here, rest moved into the hero */}
        <span className="inline-flex w-fit items-center gap-2 rounded-sm border border-edge px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          <span className="relative flex size-1.5 shrink-0">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
          </span>
          Available for work
        </span>

        {/* h1 for SEO — visually hidden, name is shown in the hero overlay */}
        <h1 className="sr-only">{USER.displayName}</h1>
      </div>
    </div>
  );
}
