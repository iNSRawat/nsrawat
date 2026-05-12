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
      <PanelContent>
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

        <div className="mt-3 flex flex-wrap items-center gap-1.5 sm:gap-2">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-transparent text-muted-foreground transition-colors hover:border-border hover:bg-accent2 hover:text-foreground sm:size-8"
              target={link.title === "Email" ? undefined : "_blank"}
              rel={link.title === "Email" ? undefined : "noopener noreferrer"}
              title={link.title}
            >
              <div className="size-4">{getIcon(link.icon)}</div>
            </a>
          ))}
        </div>
      </PanelContent>
    </Panel>
  );
}
