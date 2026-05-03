import { MailIcon, UserIcon } from "lucide-react";
import Link from "next/link";

import { Markdown } from "@/components/markdown";
import { Button } from "@/components/ui/button";
import { ProseMono } from "@/components/ui/typography";
import { USER } from "@/features/portfolio/data/user";

import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

export function About() {
  return (
    <Panel id="about">
      <PanelHeader>
        <PanelTitle>About</PanelTitle>
      </PanelHeader>

      <PanelContent>
        <ProseMono>
          <Markdown>{USER.about}</Markdown>
        </ProseMono>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button asChild variant="outline" size="sm">
            <Link href="/about">
              <UserIcon className="size-4" />
              More About Me
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/contact">
              <MailIcon className="size-4" />
              Contact Me
            </Link>
          </Button>
        </div>
      </PanelContent>
    </Panel>
  );
}
