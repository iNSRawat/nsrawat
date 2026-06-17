"use client";

import { ExternalLink, RssIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { SITE_INFO, SOURCE_CODE_GITHUB_URL } from "@/config/site";
import { USER } from "@/features/portfolio/data/user";
import { cn } from "@/lib/utils";

import { Icons } from "./icons";
import { SiteFooterBrand } from "./site-footer-brand";

// A live clock client component formatting to Asia/Kolkata and offset
function LocalClock() {
  const [mounted, setMounted] = React.useState(false);
  const [timeStr, setTimeStr] = React.useState("");
  const [diffStr, setDiffStr] = React.useState("");

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    const updateClock = () => {
      const tz = USER.timeZone || "Asia/Kolkata";
      const now = new Date();

      const timeFormatter = new Intl.DateTimeFormat("en-US", {
        timeZone: tz,
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setTimeStr(timeFormatter.format(now));

      // Calculate timezone difference relative to Asia/Kolkata (+330 min / UTC+5:30)
      const targetOffset = 330;
      const localOffset = -now.getTimezoneOffset();
      const diffMin = targetOffset - localOffset;
      const diffHrs = diffMin / 60;

      if (diffHrs === 0) {
        setDiffStr("same time");
      } else {
        const absDiff = Math.abs(diffHrs);
        const hours = Math.floor(absDiff);
        const mins = Math.round((absDiff - hours) * 60);
        const parts = [];
        if (hours > 0) parts.push(`${hours}h`);
        if (mins > 0) parts.push(`${mins}m`);
        setDiffStr(`${parts.join(" ")} ${diffHrs > 0 ? "ahead" : "behind"}`);
      }
    };

    updateClock();
    const interval = setInterval(updateClock, 60000);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  if (!mounted) {
    return (
      <span className="font-mono text-xs text-muted-foreground/50">
        --:-- --
      </span>
    );
  }

  return (
    <span className="font-mono text-xs text-muted-foreground select-none">
      {timeStr} <span className="opacity-50">({diffStr})</span>
    </span>
  );
}

export function SiteFooter() {
  return (
    <footer className="max-w-screen overflow-x-hidden px-2">
      <div className="mx-auto border-x border-t border-edge pt-8 md:max-w-3xl">
        {/* Upper layout: profile column + sitemaps & metadata column */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-y-5 sm:gap-x-8 px-6 pb-5 sm:pb-6">
          {/* Profile details: avatar, name, bio, signature, live widgets */}
          <div className="sm:col-span-7 lg:col-span-8 flex flex-col gap-3">
            {/* Profile Avatar & Title */}
            <div className="flex items-center gap-3">
              <Image
                src={USER.avatar}
                alt={`${USER.displayName}'s avatar`}
                width={44}
                height={44}
                className="relative size-11 select-none rounded-full ring-1 ring-border ring-offset-2 ring-offset-background object-cover bg-muted"
              />
              <div>
                <h3 className="font-mono text-sm font-semibold text-foreground leading-tight">
                  {USER.displayName}
                </h3>
                <p className="font-mono text-xs text-muted-foreground">
                  Data Scientist
                </p>
              </div>
            </div>

            {/* Bio description */}
            <p className="font-mono text-xs text-muted-foreground/90 leading-relaxed">
              {USER.bio}
            </p>

            {/* Handwritten style signature */}
            <div className="py-0">
              <span className="font-signature text-3xl text-foreground/90 select-none">
                N.S. Rawat
              </span>
            </div>

            {/* Live site and profile status info */}
            <div className="flex flex-col gap-2.5 pt-1 border-t border-edge/30 -mt-3">
              {/* GitHub Link Status */}
              <div className="flex items-center">
                <a
                  href={SOURCE_CODE_GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-muted-foreground flex items-center gap-1 hover:text-foreground transition-colors"
                >
                  <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                  nsrawat.in
                </a>
              </div>

              {/* Location Status */}
              <div className="flex items-center gap-2 text-muted-foreground select-none">
                <span className="text-xs">📍</span>
                <span className="font-mono text-xs flex items-center gap-1.5">
                  {USER.address}
                  <IndiaFlag className="w-4 h-2.5 shrink-0 rounded-[1px] border border-muted-foreground/20" />
                </span>
              </div>

              {/* Ticking clock status */}
              <div className="flex items-center gap-2 text-muted-foreground select-none">
                <span className="text-xs">🕒</span>
                <LocalClock />
              </div>
            </div>
          </div>

          {/* Links and Metadata Columns */}
          <div className="sm:col-span-5 lg:col-span-4 grid grid-cols-2 gap-6">
            {/* Sitemap section */}
            <div className="flex flex-col gap-3.5">
              <h4 className="font-mono text-xs font-semibold text-foreground uppercase tracking-wider">
                sitemap
              </h4>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <Link
                    href="/"
                    className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects"
                    className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/snippets"
                    className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    snippets
                  </Link>
                </li>
                <li>
                  <a
                    href={`${SITE_INFO.url}/llms.txt`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    llms.txt
                  </a>
                </li>
              </ul>
            </div>

            {/* Personal stuff section */}
            <div className="flex flex-col gap-3.5">
              <h4 className="font-mono text-xs font-semibold text-foreground uppercase tracking-wider">
                personal stuff
              </h4>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <Link
                    href="/about"
                    className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    about
                  </Link>
                </li>
                <li>
                  <Link
                    href="/certifications"
                    className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    certifications
                  </Link>
                </li>
                <li>
                  <Link
                    href="/bookmarks"
                    className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    bookmarks
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sponsors"
                    className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    sponsors
                  </Link>
                </li>
                <li>
                  <a
                    href={USER.analyticsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-0.5"
                  >
                    analytics <ExternalLink className="size-3" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Support me row */}
        <div className="screen-line-before flex w-full before:z-1">
          <div className="mx-auto flex flex-wrap items-center justify-center gap-3 border-x border-edge bg-background px-4 py-2.5 font-mono text-xs text-muted-foreground select-none">
            <span className="font-semibold text-foreground uppercase tracking-wider mr-1">
              Support me
            </span>
            <a
              href="https://buymeacoffee.com/nsrawat?ref=NSRawat.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-edge bg-background px-2.5 py-0.5 font-mono text-[10px] text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
            >
              ☕ Buy Me a Coffee
            </a>
            <a
              href="https://paypal.me/NRawat710?ref=NSRawat.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-edge bg-background px-2.5 py-0.5 font-mono text-[10px] text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
            >
              💳 PayPal
            </a>
            <a
              href="https://withupi.com/@nsrawat?ref=NSRawat.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-edge bg-background px-2.5 py-0.5 font-mono text-[10px] text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
            >
              💸 UPI
            </a>
            <a
              href="https://github.com/sponsors/iNSRawat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-edge bg-background px-2.5 py-0.5 font-mono text-[10px] text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
            >
              💖 Sponsor
            </a>
          </div>
        </div>

        {/* Original horizontal social icons row (circled to keep) */}
        <div className="screen-line-before screen-line-after flex w-full before:z-1 after:z-1">
          <div className="mx-auto flex flex-wrap items-center justify-center gap-3 border-x border-edge bg-background px-4 font-mono text-xs text-muted-foreground select-none">
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

        {/* Copyright and Location Badge row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-3">
          <p className="font-mono text-[10px] text-muted-foreground/60 select-none text-center sm:text-left">
            © {new Date().getFullYear()} Nagendra Singh Rawat. All rights
            reserved.
          </p>
          <div className="inline-flex items-center rounded overflow-hidden font-mono text-[10px] select-none border border-edge">
            <span className="bg-zinc-800/80 dark:bg-zinc-900/80 text-zinc-400 px-2.5 py-1 text-[9px] uppercase tracking-wide border-r border-edge">
              made in
            </span>
            <span className="bg-[#FF671F] text-white px-2.5 py-1 font-semibold flex items-center gap-1.5">
              <IndiaFlag className="w-4 h-2.5 shrink-0 rounded-[1px] border border-white/20" />
              <span>India</span>
            </span>
          </div>
        </div>
      </div>

      {/* Grid pattern brand blocks logo (circled to keep) */}
      <div className="-mt-8 sm:-mt-12 overflow-hidden">
        <SiteFooterBrand />
      </div>

      <div className="pb-[env(safe-area-inset-bottom,0px)]">
        <div className="flex h-2" />
      </div>
    </footer>
  );
}

function Separator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("hidden sm:flex h-11 w-px bg-edge", className)}
      {...props}
    />
  );
}

function IndiaFlag({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 900 600"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="900" height="200" fill="#FF671F" />
      <rect y="200" width="900" height="200" fill="#FFFFFF" />
      <rect y="400" width="900" height="200" fill="#046A38" />
      <g transform="translate(450, 300)">
        <circle r="92" fill="none" stroke="#06038D" strokeWidth="8" />
        <circle r="16" fill="#06038D" />
        {Array.from({ length: 24 }).map((_, i) => (
          <line
            key={i}
            y1="-92"
            y2="0"
            stroke="#06038D"
            strokeWidth="4"
            transform={`rotate(${i * 15})`}
          />
        ))}
        {Array.from({ length: 24 }).map((_, i) => (
          <circle
            key={`c-${i}`}
            cy="-82"
            r="4"
            fill="#06038D"
            transform={`rotate(${i * 15 + 7.5})`}
          />
        ))}
      </g>
    </svg>
  );
}
