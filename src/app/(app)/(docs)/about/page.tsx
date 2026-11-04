import { DownloadIcon, Mail } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

import { ContactTabs } from "@/components/contact-tabs";
import { Icons } from "@/components/icons";
import { StripedSeparator } from "@/components/striped-separator";
import { ProseMono } from "@/components/ui/typography";
import { SOURCE_CODE_GITHUB_URL } from "@/config/site";
import { ExperienceItem } from "@/features/portfolio/components/experiences/experience-item";
import { EXPERIENCES } from "@/features/portfolio/data/experiences";
import { SKILLS } from "@/features/portfolio/data/skills";
import { USER } from "@/features/portfolio/data/user";

export const metadata: Metadata = {
  title: "About Nagendra Singh Rawat",
  description: `Learn more about ${USER.displayName} - Data Scientist | Specializing in Marketing Analytics based in ${USER.address}.`,
};

export default function AboutPage() {
  return (
    <div className="min-h-svh">
      <div className="screen-line-after px-2 sm:px-4">
        <h1 className="text-2xl sm:text-3xl font-semibold">About Me</h1>
      </div>

      <div className="p-2 sm:p-4">
        <p className="font-mono text-sm text-balance text-muted-foreground">
          {USER.bio}
        </p>
      </div>

      <StripedSeparator />

      {/* About Content */}
      <div className="space-y-3 sm:space-y-6 p-2 sm:p-4">
        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-3 sm:gap-6 sm:flex-row">
          <div className="group relative flex items-center justify-center">
            {/* Glowing Aura (visible on hover) */}
            <div className="pointer-events-none absolute inset-[-6px] z-0 rounded-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 opacity-0 blur-lg transition-opacity duration-300 group-hover:animate-spin group-hover:[animation-duration:3s] group-hover:opacity-60" />
            {/* Glowing Border (visible on hover) */}
            <div className="pointer-events-none absolute inset-[-3px] z-0 rounded-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 opacity-0 transition-opacity duration-300 group-hover:animate-spin group-hover:[animation-duration:3s] group-hover:opacity-100" />

            <Image
              src="/static/images/avatar.png"
              alt={USER.displayName}
              width={120}
              height={120}
              priority
              className="relative z-10 rounded-full border-4 border-edge sm:w-[150px] sm:h-[150px]"
            />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">
              {USER.displayName}
            </h2>
            <p className="font-mono text-sm text-muted-foreground">
              {USER.jobTitle}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              📍 {USER.address}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-pixel font-medium text-emerald-600 sm:gap-1.5 sm:px-2.5 sm:text-xs dark:text-emerald-400">
                <span className="relative flex size-1.5 sm:size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-full rounded-full bg-emerald-500" />
                </span>
                Open to Data Science roles
              </span>
              <a
                href="https://github.com/iNSRawat/resume/blob/main/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-border bg-accent px-2 py-0.5 text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground sm:px-2.5 sm:text-xs"
              >
                <DownloadIcon className="size-3" />
                Resume
              </a>
            </div>
          </div>
        </div>

        <ProseMono className="max-w-none">
          <p className="leading-relaxed">
            Self-taught Data Scientist with a 5-year background in Digital
            Marketing, building reliable, data-driven systems instead of vanity
            metrics and toy models. Based in {USER.address}.
          </p>

          <p className="mt-3 leading-relaxed">
            Currently focusing on building robust predictive models (
            <a
              href="https://github.com/iNSRawat/recipe-site-traffic-prediction"
              target="_blank"
              rel="noopener noreferrer"
            >
              Recipe Predictor
            </a>
            ), developing reproducible data pipelines (
            <a
              href="https://github.com/iNSRawat/customer-behavior-prediction"
              target="_blank"
              rel="noopener noreferrer"
            >
              Customer Analytics
            </a>{" "}
            &amp;{" "}
            <a
              href="https://github.com/iNSRawat/data-cleaning-visualization"
              target="_blank"
              rel="noopener noreferrer"
            >
              ETL Pipeline
            </a>
            ), and production-ready analytics dashboards (
            <a
              href="https://github.com/iNSRawat/marketing-analytics-dashboard"
              target="_blank"
              rel="noopener noreferrer"
            >
              Marketing KPI Dashboard
            </a>
            ). I care deeply about rigorous statistical evaluation and clean
            data processing because models actually need to drive business
            decisions in the real world.
          </p>

          <p className="mt-3 leading-relaxed">
            Genuinely curious about machine learning architectures, statistical
            modeling, and workflow optimization. Always looking for better ways
            to bring solid engineering discipline and domain context into data
            science workflows.
          </p>

          <h2 className="mt-4 sm:mt-6 mb-2 sm:mb-3 text-lg sm:text-xl font-semibold">
            🛠️ Skills
          </h2>
          <div className="not-prose divide-y divide-border border-y border-border">
            {SKILLS.map((category) => (
              <div
                key={category.title}
                className="flex flex-col gap-0.5 py-1.5 sm:flex-row sm:items-baseline sm:gap-4 sm:py-2 md:gap-6"
              >
                <div className="shrink-0 sm:w-36 md:w-40">
                  <span className="font-mono text-xs sm:text-[13px] font-semibold text-foreground">
                    {category.title}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 font-mono text-xs sm:text-[13px] leading-normal text-muted-foreground">
                  {category.skills.map((skill, i) => (
                    <span key={skill} className="inline-flex items-center">
                      <span>{skill}</span>
                      {i < category.skills.length - 1 && (
                        <span
                          className="ml-2 text-border select-none"
                          aria-hidden="true"
                        >
                          ·
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <h2 className="mt-4 sm:mt-6 mb-2 text-lg sm:text-xl font-semibold">
            📚 Background
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
            My transition into Data Science began after spending 5 years in
            Digital Marketing, where I realized intuition and spreadsheets can
            only take optimization so far. With{" "}
            <a href="/certifications" className="link font-medium">
              8+ certifications
            </a>{" "}
            from DataCamp, Google, and IBM, I focus on turning complex datasets
            into reliable, actionable business insights.
          </p>

          <h2 className="mt-4 sm:mt-6 mb-2 text-base sm:text-lg font-semibold">
            🌐 Connect With Me
          </h2>
          <p className="mb-2 text-sm sm:text-base text-muted-foreground">
            Reach out to me at{" "}
            <a href="mailto:digital@nsrawat.in" className="link font-medium">
              digital@nsrawat.in
            </a>{" "}
            or find me on social media:
          </p>
          {/* Social Icons Row */}
          <div className="inline-flex items-center gap-1 sm:gap-2">
            <a
              href="https://github.com/iNSRawat"
              className="p-1.5 sm:p-2 text-foreground/70 transition-colors hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Icons.github className="size-5 sm:size-6" />
            </a>
            <a
              href="https://twitter.com/NSRawat_in"
              className="p-1.5 sm:p-2 text-foreground/70 transition-colors hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter/X"
            >
              <Icons.x className="size-5 sm:size-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/insrawat"
              className="p-1.5 sm:p-2 text-foreground/70 transition-colors hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Icons.linkedin className="size-5 sm:size-6" />
            </a>
            <a
              href="https://www.kaggle.com/nsrawat"
              className="p-1.5 sm:p-2 text-foreground/70 transition-colors hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Kaggle"
            >
              <Icons.kaggle className="size-5 sm:size-6" />
            </a>
            <a
              href="mailto:digital@nsrawat.in"
              className="p-1.5 sm:p-2 text-foreground/70 transition-colors hover:text-foreground"
              aria-label="Email"
            >
              <Mail className="size-5 sm:size-6" />
            </a>
          </div>

          <h2 className="mt-4 sm:mt-6 mb-1 text-base sm:text-lg font-semibold">
            ⭐ Express Your Support
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            If you find my data science projects helpful, show your appreciation
            with a star on GitHub.
          </p>

          <h2 className="mt-4 sm:mt-6 mb-2 text-base sm:text-lg font-semibold">
            💰 Help Support My Work
          </h2>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            <a
              href="https://buymeacoffee.com/nsrawat?ref=NSRawat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-[#ffdd00] px-3 py-1.5 text-sm font-semibold text-black transition-opacity hover:opacity-90"
            >
              ☕ Buy Me a Coffee
            </a>
            <a
              href="https://paypal.me/NRawat710?ref=NSRawat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-[#00457C] px-3 py-1.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              💳 PayPal
            </a>
            <a
              href="https://withupi.com/@nsrawat?ref=NSRawat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-[#21b573] px-3 py-1.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              💸 UPI
            </a>
          </div>
        </ProseMono>
      </div>

      <StripedSeparator />

      {/* Experience Section */}
      <div className="p-2 sm:p-4">
        <h2 className="mb-4 text-xl sm:text-2xl font-bold tracking-tight">
          💼 Experience
        </h2>
        <div className="space-y-4 sm:space-y-6">
          {EXPERIENCES.map((exp) => (
            <ExperienceItem key={exp.id} experience={exp} />
          ))}
        </div>
      </div>

      <StripedSeparator />

      {/* Tech Stack Section */}
      <div className="p-2 sm:p-4">
        <h2 className="mb-2 sm:mb-4 text-lg sm:text-xl font-semibold text-primary">
          🛠️ Tech stack
        </h2>
        <div className="space-y-3 sm:space-y-4">
          <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
            This portfolio is built with{" "}
            <a
              href="https://nextjs.org/"
              className="link font-medium"
              target="_blank"
              rel="noopener"
            >
              Next.js
            </a>{" "}
            and{" "}
            <a
              href="https://tailwindcss.com/"
              className="link font-medium"
              target="_blank"
              rel="noopener"
            >
              Tailwind CSS
            </a>{" "}
            using{" "}
            <a
              href="https://ui.shadcn.com/"
              className="link font-medium"
              target="_blank"
              rel="noopener"
            >
              Shadcn/UI
            </a>
            .
          </p>

          <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
            This blog site takes inspiration from{" "}
            <a
              href="https://chanhdai.com/"
              className="link font-medium"
              target="_blank"
              rel="noopener"
            >
              chanhdai.com
            </a>
            . I appreciate{" "}
            <a
              href="https://github.com/ncdai"
              className="link font-medium"
              target="_blank"
              rel="noopener"
            >
              Nguyen Chanh Dai
            </a>{" "}
            for their contribution to this minimal, lightweight, and highly
            customizable{" "}
            <a
              href="https://ui.shadcn.com/"
              className="link font-medium"
              target="_blank"
              rel="noopener"
            >
              shadcn/ui
            </a>
            .
          </p>

          <div className="mt-3 sm:mt-4">
            <p className="mb-3 font-medium text-muted-foreground">
              Tech &amp; Features
            </p>
            <ul className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-muted-foreground">
              <li className="flex items-start gap-2">
                <span>⚛️</span>
                <span>
                  Built with <strong>React 19.3</strong>,{" "}
                  <strong>Next.js 16.3</strong>, and{" "}
                  <strong>shadcn/ui 4.21</strong>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span>🎉</span>
                <span>
                  Powered by <strong>TypeScript</strong> and{" "}
                  <a
                    href="https://tailwindcss.com"
                    className="link font-medium"
                    target="_blank"
                    rel="noopener"
                  >
                    Tailwind CSS v4.3
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span>👀</span>
                <span>
                  Theming in dark mode with{" "}
                  <a
                    href="https://ui.shadcn.com/docs/dark-mode/next"
                    className="link font-medium"
                    target="_blank"
                    rel="noopener"
                  >
                    shadcn/ui Dark Mode
                  </a>{" "}
                  colors for better contrast.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span>📊</span>
                <span>
                  Website analytics with{" "}
                  <a
                    href="https://umami.is/"
                    className="link font-medium"
                    target="_blank"
                    rel="noopener"
                  >
                    umami
                  </a>
                  . (
                  <a
                    href={USER.analyticsUrl}
                    className="link font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📊 Traffic & Insights
                  </a>
                  )
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span>👨‍💻</span>
                <span>
                  My website refers to the design and code from the{" "}
                  <a
                    href="https://github.com/ncdai/chanhdai.com"
                    className="link font-medium"
                    target="_blank"
                    rel="noopener"
                  >
                    chanhdai.com
                  </a>{" "}
                  repository and incorporates{" "}
                  <a
                    href="https://ui.shadcn.com/"
                    className="link font-medium"
                    target="_blank"
                    rel="noopener"
                  >
                    shadcn/ui
                  </a>
                  .
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span>📝</span>
                <span>
                  Blog Supports MDX &amp; Markdown, raw{" "}
                  <code className="rounded bg-accent px-1 py-0.5 font-mono text-sm">
                    .mdx
                  </code>{" "}
                  endpoints for AI readability, syntax highlighting, dynamic OG
                  images, and RSS feed
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span>🎨</span>
                <span>
                  Inspired by{" "}
                  <a
                    href="https://tailwindcss.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link font-medium"
                  >
                    tailwindcss.com
                  </a>{" "}
                  &amp;{" "}
                  <a
                    href="https://ui.shadcn.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link font-medium"
                  >
                    ui.shadcn.com
                  </a>
                  . Built by{" "}
                  <a
                    href="https://x.com/NSRawat_in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link font-medium"
                  >
                    NSRawat_in
                  </a>
                  . The source code is available on{" "}
                  <a
                    href={SOURCE_CODE_GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link font-medium"
                  >
                    GitHub
                  </a>
                  .
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <StripedSeparator />

      {/* Contact Form Section */}
      <div className="py-4 px-2 sm:px-4">
        <ContactTabs />
      </div>

      <StripedSeparator />

      <div className="h-2 sm:h-4" />
    </div>
  );
}
