import { DownloadIcon, Mail } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

import { Icons } from "@/components/icons";
import { EXPERIENCES } from "@/features/portfolio/data/experiences";
import { USER } from "@/features/portfolio/data/user";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
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

      <Separator />

      {/* About Content */}
      <div className="space-y-3 sm:space-y-6 p-2 sm:p-4">
        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-3 sm:gap-6 sm:flex-row">
          <div className="relative">
            <Image
              src="/static/images/avatar.png"
              alt={USER.displayName}
              width={120}
              height={120}
              priority
              className="rounded-full border-4 border-edge sm:w-[150px] sm:h-[150px]"
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
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-600 sm:gap-1.5 sm:px-2.5 sm:text-xs dark:text-emerald-400">
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

        <div className="prose max-w-none prose-zinc dark:prose-invert">
          <p className="text-lg leading-relaxed">
            I&apos;m <strong>{USER.displayName}</strong>, a {USER.jobTitle}{" "}
            based in {USER.address}. After 5 years in Digital Marketing, I began
            my Data Science journey in September 2025 to shift my career focus
            toward leveraging data for meaningful insights.
          </p>

          <h2 className="mt-4 sm:mt-8 mb-2 sm:mb-4 text-lg sm:text-xl font-semibold">
            🎯 What I Do
          </h2>
          <ul className="list-inside list-disc space-y-1 sm:space-y-2 text-sm sm:text-base text-muted-foreground">
            <li>
              Build <strong>predictive models</strong> (
              <a
                href="https://github.com/iNSRawat/recipe-site-traffic-prediction"
                className="link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Recipe Predictor
              </a>
              ) and machine learning solutions
            </li>
            <li>
              Develop <strong>data pipelines</strong> (
              <a
                href="https://github.com/iNSRawat/customer-behavior-prediction"
                className="link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Customer Analytics
              </a>{" "}
              &{" "}
              <a
                href="https://github.com/iNSRawat/data-cleaning-visualization"
                className="link"
                target="_blank"
                rel="noopener noreferrer"
              >
                ETL Pipeline
              </a>
              ) for processing and analysis
            </li>
            <li>
              Create <strong>interactive dashboards</strong> (
              <a
                href="https://github.com/iNSRawat/marketing-analytics-dashboard"
                className="link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Marketing KPI Dashboard
              </a>
              ) with Tableau & Power BI
            </li>
            <li>
              Perform <strong>exploratory data analysis</strong> to uncover
              patterns
            </li>
            <li>
              Conduct <strong>statistical analysis</strong> for data-driven
              decisions
            </li>
          </ul>

          <h2 className="mt-4 sm:mt-8 mb-2 sm:mb-4 text-lg sm:text-xl font-semibold">
            🛠️ Technical Skills
          </h2>
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2 md:grid-cols-3">
            {[
              "Python",
              "SQL",
              "Pandas",
              "NumPy",
              "Scikit-learn",
              "TensorFlow",
              "PyTorch",
              "Tableau",
              "Power BI",
              "Excel",
              "Matplotlib",
              "Seaborn",
            ].map((skill) => (
              <span
                key={skill}
                className="rounded-md bg-accent px-2 sm:px-3 py-0.5 sm:py-1 font-mono text-xs sm:text-sm"
              >
                {skill}
              </span>
            ))}
          </div>

          <h2 className="mt-4 sm:mt-8 mb-2 sm:mb-4 text-lg sm:text-xl font-semibold">
            📚 Background
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
            My journey into Data Science began after recognizing the power of
            data in making informed decisions during my marketing career.
            I&apos;ve since dedicated myself to mastering tools like{" "}
            <strong>Python</strong>, <strong>SQL</strong>, and modern data
            science frameworks to build{" "}
            <a
              href="https://github.com/iNSRawat/recipe-site-traffic-prediction"
              className="link"
              target="_blank"
              rel="noopener noreferrer"
            >
              predictive models
            </a>
            ,{" "}
            <a
              href="https://github.com/iNSRawat/customer-behavior-prediction"
              className="link"
              target="_blank"
              rel="noopener noreferrer"
            >
              data pipelines
            </a>
            , and{" "}
            <a
              href="https://github.com/iNSRawat/marketing-analytics-dashboard"
              className="link"
              target="_blank"
              rel="noopener noreferrer"
            >
              interactive dashboards
            </a>
            . With{" "}
            <a href="/certifications" className="link font-medium">
              8+ certifications
            </a>{" "}
            and a growing portfolio of hands-on projects, I&apos;m committed to
            transforming complex datasets into actionable insights.
          </p>
          <ul className="mt-3 list-inside list-disc space-y-1.5 sm:space-y-2 text-sm sm:text-base leading-relaxed text-muted-foreground">
            <li>
              Skilled in <strong>Python</strong>, <strong>SQL</strong>,{" "}
              <strong>TensorFlow</strong>, <strong>PyTorch</strong>,{" "}
              <strong>Scikit-learn</strong>, and modern data science tools.
            </li>
            <li>
              Building predictive models, data pipelines, and interactive
              dashboards with Tableau &amp; Power BI.
            </li>
            <li>
              Currently deepening skills in Python, machine learning, and data
              analysis for my new career path.
            </li>
            <li>
              Creator of data science projects on{" "}
              <a
                href="https://github.com/iNSRawat"
                className="link"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              .
            </li>
            <li>
              Passionate about exploratory data analysis and finding patterns in
              data.
            </li>
          </ul>

          <h2 className="mt-4 sm:mt-8 mb-2 sm:mb-4 text-lg sm:text-xl font-semibold">
            🌐 Connect With Me
          </h2>
          <p className="mb-3 text-sm sm:text-base text-muted-foreground">
            Reach out to me at{" "}
            <a href="mailto:digital@nsrawat.in" className="link font-medium">
              digital@nsrawat.in
            </a>{" "}
            or find me on social media:
          </p>
          {/* Social Icons Row */}
          <div className="inline-flex items-center gap-2">
            <a
              href="https://github.com/iNSRawat"
              className="p-2 text-foreground/70 transition-colors hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Icons.github className="size-6" />
            </a>
            <a
              href="https://twitter.com/NSRawat_in"
              className="p-2 text-foreground/70 transition-colors hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter/X"
            >
              <Icons.x className="size-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/insrawat"
              className="p-2 text-foreground/70 transition-colors hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Icons.linkedin className="size-6" />
            </a>
            <a
              href="https://www.kaggle.com/nsrawat"
              className="p-2 text-foreground/70 transition-colors hover:text-foreground"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Kaggle"
            >
              <Icons.kaggle className="size-6" />
            </a>
            <a
              href="mailto:digital@nsrawat.in"
              className="p-2 text-foreground/70 transition-colors hover:text-foreground"
              aria-label="Email"
            >
              <Mail className="size-6" />
            </a>
          </div>
          <h2 className="mt-3 sm:mt-4 mb-1.5 sm:mb-2 text-lg sm:text-xl font-semibold">
            Express Your Support
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            If you find my data science projects helpful, show your appreciation
            with a ⭐
          </p>

          <h2 className="mt-3 sm:mt-4 mb-1.5 sm:mb-2 text-lg sm:text-xl font-semibold">
            💰 You can help me by Donating
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
        </div>
      </div>

      <Separator />

      {/* Experience Section */}
      <div className="p-2 sm:p-4">
        <h2 className="mb-2 sm:mb-4 text-lg sm:text-xl font-semibold">
          💼 Experience
        </h2>
        <div className="space-y-3 sm:space-y-6">
          {EXPERIENCES.slice(0, 5).map((exp) => (
            <div key={exp.id} className="border-l-2 border-edge pl-4">
              <h3 className="font-semibold">{exp.companyName}</h3>
              {exp.positions.map((pos) => (
                <div key={pos.id} className="mt-2">
                  <p className="font-mono text-sm text-muted-foreground">
                    {pos.title}
                  </p>
                  <p className="font-mono text-xs text-muted-foreground/70">
                    {pos.employmentPeriod.start} -{" "}
                    {pos.employmentPeriod.end || "Present"}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <Separator />

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
                  Upgrade to <strong>React 19</strong>,{" "}
                  <strong>Next.js 16</strong>, <strong>Shadcn/UI</strong>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span>🎉</span>
                <span>
                  Adopting <strong>TypeScript</strong>, committing with{" "}
                  <a
                    href="https://tailwindcss.com"
                    className="link font-medium"
                    target="_blank"
                    rel="noopener"
                  >
                    Tailwind CSS v4
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
                  .
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
            </ul>
          </div>
        </div>
      </div>

      <div className="h-2 sm:h-4" />
    </div>
  );
}

function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-8 w-full",
        "before:absolute before:-left-[100vw] before:-z-1 before:h-8 before:w-[200vw]",
        "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56",
        className,
      )}
    />
  );
}
