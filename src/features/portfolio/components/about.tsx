import { CalendarIcon, MailIcon } from "lucide-react";
import Link from "next/link";

import { getIcon } from "@/components/icons";
import { Markdown } from "@/components/markdown";
import { Button } from "@/components/ui/button";
import { ProseMono } from "@/components/ui/typography";
import { SOCIAL_LINKS } from "@/features/portfolio/data/social-links";
import { USER } from "@/features/portfolio/data/user";

import { Panel, PanelContent } from "./panel";

export function About() {
  const CAL_URL =
    "https://cal.com/nsrawat/15min?utm_source=nsrawat.in&utm_medium=website&utm_campaign=about_section";

  return (
    <Panel id="about" className="before:hidden">
      <PanelContent className="relative">
        <ProseMono>
          <Markdown>{USER.about}</Markdown>
        </ProseMono>

        <div className="mt-3 flex flex-wrap gap-3">
          <Button asChild variant="outline" size="sm">
            <Link href="/contact">
              <MailIcon className="size-4" />
              Contact Me
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <a href={CAL_URL} target="_blank" rel="noopener noreferrer">
              <CalendarIcon className="size-4" />
              Book free 1:1
            </a>
          </Button>
        </div>

        {/* Social Links Row with handwritten "follow me" note outside the container */}
        <div className="relative mt-4">
          {/* Handwritten "follow me" note positioned in the left margin outside the panel */}
          <div
            className="pointer-events-none absolute -left-20 sm:-left-24 md:-left-26 bottom-0 hidden md:flex flex-col items-center select-none font-signature text-muted-foreground/80 z-20"
            aria-hidden="true"
          >
            <span className="-rotate-6 text-lg tracking-wide text-muted-foreground/90">
              follow me
            </span>
            <svg
              className="size-6 text-muted-foreground/60 -scale-x-100 -rotate-6 ml-4"
              viewBox="0 0 40 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M34 4c1 15-5 26-21 30" />
              <path d="m22 37-9-3 7.5-8" />
            </svg>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-transparent text-muted-foreground transition-colors hover:border-border hover:bg-accent2 hover:text-foreground sm:size-8"
                target={link.title === "Email" ? undefined : "_blank"}
                rel={link.title === "Email" ? undefined : "noopener noreferrer"}
                title={link.title}
              >
                <div className="size-4 [&_svg]:size-full">
                  {getIcon(link.icon)}
                </div>
              </a>
            ))}
          </div>
        </div>
      </PanelContent>
    </Panel>
  );
}
