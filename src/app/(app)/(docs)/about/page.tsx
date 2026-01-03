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
              href="https://twitter.com/iNSRawat"
              className="link font-medium"
              target="_blank"
              rel="noopener"
            >
              Twitter/X
            </a>
            .
          </p>
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
        className
      )}
    />
  );
}
