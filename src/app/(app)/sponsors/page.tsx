import { PlusIcon } from "lucide-react";
import type { Metadata } from "next";

import { SPONSORSHIP_URL } from "@/config/site";
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/features/portfolio/components/panel";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Sponsors",
  description: "Support my work and open-source projects.",
};

export default function SponsorsPage() {
  return (
    <div className="mx-auto md:max-w-3xl">
      <Panel>
        <PanelHeader>
          <PanelTitle>Sponsors</PanelTitle>
        </PanelHeader>
        <PanelContent className="space-y-8">
          <p className="text-muted-foreground">
            I&apos;m building open-source tools and sharing my journey in Data
            Science. If you find my work helpful, consider supporting me!
          </p>

          <div className="flex flex-col items-center gap-6 py-4">
            {/* GitHub Sponsor Button */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-center">
              <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                Quick Support:
              </span>
              <a
                href="https://github.com/sponsors/iNSRawat"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border border-edge bg-background px-3 py-1.5 font-mono text-sm text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
              >
                💖 Sponsor
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Special Thanks</h3>
            <div className="grid grid-cols-2 gap-px overflow-hidden border border-edge bg-edge sm:grid-cols-3">
              {/* Reference style grid cells */}
              <SponsorCard
                name="You?"
                description="Become my first sponsor"
                href={SPONSORSHIP_URL}
                isPlaceholder
              />
              <SponsorCard
                name="Sponsor my work"
                href={SPONSORSHIP_URL}
                isCta
              />
              <div className="hidden bg-background sm:block" />
            </div>
          </div>
        </PanelContent>
      </Panel>

      <Separator />

      <Panel>
        <PanelHeader>
          <PanelTitle>Why Sponsor?</PanelTitle>
        </PanelHeader>
        <PanelContent>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <p>Your sponsorship helps me dedicate more time to:</p>
            <ul>
              <li>Developing open-source Python and Data Science tools.</li>
              <li>Creating educational content and tutorials.</li>
              <li>Maintaining my portfolio and component registry.</li>
              <li>
                Exploring new frontiers in Machine Learning and Data
                Engineering.
              </li>
            </ul>
            <p>
              Every bit of support is deeply appreciated and fuels my commitment
              to the community.
            </p>
          </div>
        </PanelContent>
      </Panel>
    </div>
  );
}

function SponsorCard({
  name,
  description,
  href,
  isPlaceholder = false,
  isCta = false,
}: {
  name: string;
  description?: string;
  href: string;
  isPlaceholder?: boolean;
  isCta?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group flex h-32 flex-col items-center justify-center p-4 text-center transition-colors hover:bg-accent",
        "bg-background",
      )}
    >
      {isCta ? (
        <div className="flex flex-col items-center gap-2">
          <div className="flex size-10 items-center justify-center rounded-full border border-dashed border-edge group-hover:border-foreground transition-colors">
            <PlusIcon className="size-5 text-muted-foreground group-hover:text-foreground" />
          </div>
          <span className="text-sm font-medium">{name}</span>
        </div>
      ) : (
        <>
          <span
            className={cn(
              "text-sm font-medium",
              isPlaceholder && "text-muted-foreground",
            )}
          >
            {name}
          </span>
          {description && (
            <span className="mt-1 text-xs text-muted-foreground">
              {description}
            </span>
          )}
        </>
      )}
    </a>
  );
}

function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-8 w-full border-x border-edge",
        "before:absolute before:-left-[100vw] before:-z-1 before:h-8 before:w-[200vw]",
        "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56",
        className,
      )}
    />
  );
}
