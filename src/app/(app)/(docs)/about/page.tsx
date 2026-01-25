import type { Metadata } from "next";
import Image from "next/image";

import { EXPERIENCES } from "@/features/portfolio/data/experiences";
import { USER } from "@/features/portfolio/data/user";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description: `Learn more about ${USER.displayName} - Data Scientist & ML Enthusiast based in ${USER.address}.`,
};

export default function AboutPage() {
  return (
    <div className="min-h-svh">
      <div className="screen-line-after px-4">
        <h1 className="text-3xl font-semibold">About Me</h1>
      </div>

      <div className="p-4">
        <p className="font-mono text-sm text-balance text-muted-foreground">
          {USER.bio}
        </p>
      </div>

      <Separator />

      {/* About Content */}
      <div className="space-y-6 p-4">
        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <div className="relative">
            <Image
              src="/static/images/avatar.png"
              alt={USER.displayName}
              width={150}
              height={150}
              className="rounded-full border-4 border-edge"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{USER.displayName}</h2>
            <p className="font-mono text-muted-foreground">{USER.jobTitle}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              📍 {USER.address}
            </p>
          </div>
        </div>

        <div className="prose max-w-none prose-zinc dark:prose-invert">
          <p className="text-lg leading-relaxed">
            I&apos;m <strong>{USER.displayName}</strong>, a {USER.jobTitle}{" "}
            based in {USER.address}. After 5 years in Digital Marketing, I began
            my Data Science journey in September 2025 to shift my career focus
            toward leveraging data for meaningful insights.
          </p>

          <h2 className="mt-8 mb-4 text-xl font-semibold">🎯 What I Do</h2>
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
            <li>
              Build <strong>predictive models</strong> and machine learning
              solutions
            </li>
            <li>
              Develop <strong>data pipelines</strong> for processing and
              analysis
            </li>
            <li>
              Create <strong>interactive dashboards</strong> with Tableau &
              Power BI
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

          <h2 className="mt-8 mb-4 text-xl font-semibold">
            🛠️ Technical Skills
          </h2>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
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
                className="rounded-md bg-accent px-3 py-1 font-mono text-sm"
              >
                {skill}
              </span>
            ))}
          </div>

          <h2 className="mt-8 mb-4 text-xl font-semibold">📚 Background</h2>
          <p className="leading-relaxed text-muted-foreground">
            My journey into Data Science began after recognizing the power of
            data in making informed decisions during my marketing career.
            I&apos;ve since dedicated myself to mastering tools like Python,
            machine learning algorithms, and data visualization techniques to
            transform complex datasets into actionable insights.
          </p>

          <h2 className="mt-8 mb-4 text-xl font-semibold">
            🌐 Connect With Me
          </h2>
          <p className="text-muted-foreground">
            You can find me on{" "}
            <a
              href="https://github.com/iNSRawat"
              className="link font-medium"
              target="_blank"
              rel="noopener"
            >
              GitHub
            </a>
            ,{" "}
            <a
              href="https://www.linkedin.com/in/insrawat"
              className="link font-medium"
              target="_blank"
              rel="noopener"
            >
              LinkedIn
            </a>
            ,{" "}
            <a
              href="https://www.kaggle.com/nsrawat"
              className="link font-medium"
              target="_blank"
              rel="noopener"
            >
              Kaggle
            </a>
            , or{" "}
            <a
              href="https://twitter.com/NSRawat_in"
              className="link font-medium"
              target="_blank"
              rel="noopener"
            >
              Twitter/X
            </a>
            .
          </p>
          <h2 className="mt-4 mb-2 text-xl font-semibold">
            Express Your Support
          </h2>
          <p className="text-muted-foreground">
            If you find my data science projects helpful, show your appreciation
            with a ⭐
          </p>

          <h2 className="mt-4 mb-2 text-xl font-semibold">
            💰 You can help me by Donating
          </h2>
          <div className="flex flex-wrap gap-2">
            <a
              href="https://buymeacoffee.com/nsrawat?ref=NSRawat"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black"
                alt="Buy Me A Coffee"
              />
            </a>
            <a
              href="https://paypal.me/NRawat710?ref=NSRawat"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white"
                alt="PayPal"
              />
            </a>
            <a
              href="https://withupi.com/@nsrawat?ref=NSRawat"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://img.shields.io/badge/UPI-21b573?style=for-the-badge&logo=upi&logoColor=white"
                alt="UPI"
              />
            </a>
          </div>
        </div>
      </div>

      <Separator />

      {/* Experience Section */}
      <div className="p-4">
        <h2 className="mb-4 text-xl font-semibold">💼 Experience</h2>
        <div className="space-y-6">
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
      <div className="p-4">
        <h2 className="mb-4 text-xl font-semibold text-primary">
          🛠️ Tech stack
        </h2>
        <div className="space-y-4">
          <p className="leading-relaxed text-muted-foreground">
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
            using <strong>Tailwind Nextjs Minimal Portfolio</strong>.
          </p>

          <p className="leading-relaxed text-muted-foreground">
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

          <div className="mt-4">
            <p className="mb-3 font-medium text-muted-foreground">
              A few major over-engineering-changes from the original repo:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span>⚛️</span>
                <span>
                  Upgrade to <strong>React 19</strong>,{" "}
                  <strong>Next.js 16</strong>.
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
                    Tailwind CSS
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
                <span>📥</span>
                <span>
                  Bumping up{" "}
                  <code className="rounded bg-accent px-1 py-0.5 font-mono text-sm">
                    mdx-bundler
                  </code>
                  ,{" "}
                  <code className="rounded bg-accent px-1 py-0.5 font-mono text-sm">
                    rehype
                  </code>
                  /
                  <code className="rounded bg-accent px-1 py-0.5 font-mono text-sm">
                    remark
                  </code>{" "}
                  plugins and dependencies to the latest version
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="h-4" />
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
