"use client";

import { ContactForm } from "@/components/contact-form";
import { ProseMono } from "@/components/ui/typography";
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/features/portfolio/components/panel";
import { cn } from "@/lib/utils";

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

export default function ContactPage() {
  return (
    <div className="mx-auto md:max-w-3xl mt-6 sm:mt-12 *:[[id]]:scroll-mt-22">
      <Separator />
      <Panel id="contact">
        <PanelHeader>
          <PanelTitle>Contact Me</PanelTitle>
        </PanelHeader>

        <PanelContent>
          <ProseMono className="mb-6 max-w-xl">
            <p className="text-muted-foreground text-sm sm:text-base">
              Have a question or want to work together? Fill out the form below
              and I&apos;ll get back to you as soon as possible.
            </p>
          </ProseMono>

          <ContactForm compact />
        </PanelContent>
      </Panel>
      <Separator />
    </div>
  );
}
