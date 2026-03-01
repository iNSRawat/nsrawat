import { Markdown } from "@/components/markdown";
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
        <a
          href="/about"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Read more about me →
        </a>
      </PanelContent>
    </Panel>
  );
}
