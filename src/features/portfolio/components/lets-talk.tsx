import Image from "next/image";

import { ContactForm } from "@/components/contact-form";
import { USER } from "@/features/portfolio/data/user";

import { Panel } from "./panel";

export function LetsTalk() {
  return (
    <Panel>
      <div className="flex flex-col items-center justify-center gap-6 px-4 py-8 sm:py-12">
        <p className="text-center text-lg text-muted-foreground sm:text-xl">
          I&apos;m actively looking for Data Science opportunities &mdash;
          let&apos;s connect!
        </p>

        <a
          href="mailto:nsrawatdigital@gmail.com"
          className="group inline-flex items-center gap-2.5 rounded-full border border-border bg-accent2 px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:border-foreground/20 hover:bg-accent2/80 hover:shadow-lg active:scale-[0.98] sm:px-6 sm:py-3 sm:text-base mb-4"
        >
          <Image
            src={USER.avatar}
            alt={USER.displayName}
            width={32}
            height={32}
            className="size-7 rounded-full ring-1 ring-border sm:size-8"
            loading="lazy"
          />
          Let&apos;s talk
        </a>

        <div className="w-full max-w-xl mx-auto rounded-xl border border-border bg-card/50 p-4 sm:p-6 shadow-sm">
          <ContactForm compact />
        </div>
      </div>
    </Panel>
  );
}
