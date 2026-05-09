import { RssIcon } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { SITE_INFO, SOURCE_CODE_GITHUB_URL } from "@/config/site";
import { cn } from "@/lib/utils";

import { Icons } from "./icons";
import { SiteFooterBrand } from "./site-footer-brand";
import { VisitorCount } from "./visitor-count";

export function SiteFooter() {
  return (
    <footer className="max-w-screen overflow-x-hidden px-2">
      <div className="screen-line-before mx-auto border-x border-edge pt-4 md:max-w-3xl">
        <p className="mb-1 px-4 text-center font-mono text-sm text-balance text-muted-foreground">
          Inspired by tailwindcss.com & ui.shadcn.com
        </p>

        <p className="mb-4 px-4 text-center font-mono text-sm text-balance text-muted-foreground">
          Built by{" "}
          <a
            className="link"
            href="https://twitter.com/NSRawat_in"
            target="_blank"
            rel="noopener"
          >
            NSRawat_in
          </a>
          . The source code is available on{" "}
          <a
            className="link"
            href={SOURCE_CODE_GITHUB_URL}
            target="_blank"
            rel="noopener"
          >
            GitHub
          </a>
          .
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2 px-4 pb-4">
          <span className="font-mono text-xs text-muted-foreground">
            Support me
          </span>
          <a
            href="https://buymeacoffee.com/nsrawat?ref=NSRawat.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-edge bg-background px-3 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
          >
            ☕ Buy Me a Coffee
          </a>
          <a
            href="https://paypal.me/NRawat710?ref=NSRawat.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-edge bg-background px-3 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
          >
            💳 PayPal
          </a>
          <a
            href="https://withupi.com/@nsrawat?ref=NSRawat.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-edge bg-background px-3 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
          >
            💸 UPI
          </a>
          <a
            href="https://github.com/sponsors/iNSRawat?ref=nsrawat.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-edge bg-background px-3 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
          >
            💖 Sponsor
          </a>
        </div>

        <div className="screen-line-before flex flex-wrap justify-center gap-2 py-3 font-mono text-xs text-muted-foreground sm:hidden">
          <Link className="font-medium" href="/sponsors">
            Sponsors
          </Link>

          <span className="opacity-50">•</span>

          <Link className="font-medium" href="/bookmarks">
            Bookmarks
          </Link>

          <span className="opacity-50">•</span>

          <a
            className="font-medium"
            href={`${SITE_INFO.url}/llms.txt`}
            target="_blank"
            rel="noopener noreferrer"
          >
            llms.txt
          </a>
        </div>

        <div className="screen-line-before screen-line-after flex w-full before:z-1 after:z-1">
          <div className="mx-auto flex items-center justify-center gap-3 border-x border-edge bg-background px-4">
            <Link
              className="flex font-mono text-xs font-medium text-muted-foreground max-sm:hidden"
              href="/sponsors"
            >
              Sponsors
            </Link>

            <Separator className="max-sm:hidden" />

            <Link
              className="flex font-mono text-xs font-medium text-muted-foreground max-sm:hidden"
              href="/bookmarks"
            >
              Bookmarks
            </Link>

            <Separator className="max-sm:hidden" />

            <a
              className="flex font-mono text-xs font-medium text-muted-foreground max-sm:hidden"
              href={`${SITE_INFO.url}/llms.txt`}
              target="_blank"
              rel="noopener noreferrer"
            >
              llms.txt
            </a>

            <Separator className="max-sm:hidden" />

            <a
              className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
              href="https://twitter.com/NSRawat_in"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icons.x className="size-4" />
              <span className="sr-only">X</span>
            </a>

            <Separator />

            <a
              className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
              href="https://github.com/iNSRawat"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icons.github className="size-4" />
              <span className="sr-only">GitHub</span>
            </a>

            <Separator />

            <a
              className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
              href="https://www.linkedin.com/in/insrawat"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icons.linkedin className="size-4" />
              <span className="sr-only">LinkedIn</span>
            </a>

            <Separator />

            <a
              className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
              href="https://peerlist.io/nsrawat"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icons.peerlist className="size-4" />
              <span className="sr-only">Peerlist</span>
            </a>

            <Separator />

            <a
              className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
              href="https://huggingface.co/nsrawat"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icons.huggingface className="size-4" />
              <span className="sr-only">Hugging Face</span>
            </a>

            <Separator />

            <a
              className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
              href="/rss"
              target="_blank"
              rel="noopener noreferrer"
            >
              <RssIcon className="size-4" />
              <span className="sr-only">RSS</span>
            </a>
          </div>
        </div>

        <div className="px-4 py-2">
          <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
            <p className="text-sm text-muted-foreground/80">
              © {new Date().getFullYear()} Nagendra Singh Rawat (NSRawat). All
              rights reserved.
            </p>
            <p className="text-sm text-muted-foreground/80">
              <VisitorCount />
            </p>
          </div>
        </div>
      </div>
      <SiteFooterBrand />
      <div className="pb-[env(safe-area-inset-bottom,0px)]">
        <div className="flex h-2" />
      </div>
    </footer>
  );
}

function Separator({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex h-11 w-px bg-edge", className)} {...props} />;
}
