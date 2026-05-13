"use client";

import { ArrowRight, ChevronDown, GraduationCapIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import * as React from "react";

import { Icons } from "@/components/icons";
import type {
  Experience,
  ExperiencePosition,
} from "@/features/portfolio/types/experiences";
import { cn } from "@/lib/utils";

interface ExperienceItemProps {
  experience: Experience;
}

const SKILL_ICONS: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  python: Icons.python,
  sql: Icons.mysql,
  pandas: Icons.pandas,
  numpy: Icons.numpy,
  "scikit-learn": Icons.scikitlearn,
  tensorflow: Icons.tensorflow,
  pytorch: Icons.pytorch,
  jupyter: Icons.jupyter,
  mongodb: Icons.mongodb,
  streamlit: Icons.streamlit,
  tableau: Icons.tableau,
  "power bi": Icons.powerbi,
  matplotlib: Icons.matplotlib,
  seaborn: Icons.seaborn,
  "hugging face": Icons.huggingface,
  "next.js": Icons.nextjs,
  "tailwind css": Icons.tailwindcss,
  git: Icons.git,
  docker: Icons.docker,
  datacamp: Icons.datacamp,
};

function getSkillIcon(skill: string) {
  const normalized = skill.toLowerCase();
  return SKILL_ICONS[normalized] || null;
}

/**
 * Renders the skills and description for a position.
 * Shared between regular experience items and education items.
 */
function PositionContent({ position }: { position: ExperiencePosition }) {
  return (
    <div className="space-y-6">
      {/* Technologies Section */}
      {position.skills && position.skills.length > 0 && (
        <div className="space-y-2">
          <h5 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
            Technologies & Tools
          </h5>
          <div className="flex flex-wrap gap-1.5">
            {position.skills.map((skill) => {
              const Icon = getSkillIcon(skill);
              return (
                <div
                  key={skill}
                  className="flex items-center gap-1.5 rounded-md border border-edge bg-accent/30 px-2 py-0.5 transition-colors hover:bg-accent"
                  title={skill}
                >
                  {Icon ? (
                    <Icon className="size-3.5" />
                  ) : (
                    <span className="text-[9px] font-medium">{skill}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* What I've Done Section */}
      {position.description && (
        <div className="space-y-2">
          <h5 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
            What I&apos;ve done
          </h5>
          <div className="prose prose-sm max-w-none prose-zinc dark:prose-invert">
            <ul className="list-inside list-none space-y-1.5">
              {position.description.split("\n").map((line, i) => {
                const trimmed = line.trim();
                const content = trimmed.startsWith("- ")
                  ? trimmed.slice(2)
                  : trimmed;
                if (!content) return null;
                return (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-[13px] leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-1.5 size-1 shrink-0 rounded-full bg-muted-foreground/40" />
                    <span
                      dangerouslySetInnerHTML={{
                        __html: content.replace(
                          /\*\*(.*?)\*\*/g,
                          "<strong>$1</strong>",
                        ),
                      }}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Renders an individual position in the Education section with the about-page style.
 */
function EducationPositionItem({ position }: { position: ExperiencePosition }) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className="group relative border-l-2 border-edge pl-4 transition-colors hover:border-primary/50 py-2">
      <div
        className="flex cursor-pointer flex-col gap-1 sm:flex-row sm:items-start sm:justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-bold sm:text-lg">{position.title}</h3>
            <ChevronDown
              className={cn(
                "size-4 text-muted-foreground transition-transform duration-200",
                isExpanded && "rotate-180",
              )}
            />
          </div>
        </div>

        <div className="flex flex-col text-left sm:text-right">
          <p className="text-xs font-medium text-muted-foreground sm:text-sm">
            {position.employmentPeriod.start} —{" "}
            {position.employmentPeriod.end || "Present"}
          </p>
          <p className="text-xs text-muted-foreground/60">
            {position.location && `${position.location} `}
            {position.locationType && `(${position.locationType})`}
          </p>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-3 pb-2">
              <PositionContent position={position} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ExperienceItem({ experience }: ExperienceItemProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  if (experience.id === "education") {
    return (
      <div className="space-y-4 py-2">
        <div className="flex items-center gap-3">
          <div className="flex size-6 shrink-0 items-center justify-center select-none">
            <div className="flex size-6 items-center justify-center rounded-lg bg-muted text-muted-foreground border border-muted-foreground/15 ring-1 ring-edge ring-offset-1 ring-offset-background">
              <GraduationCapIcon className="size-4" />
            </div>
          </div>

          <h3 className="text-lg leading-snug font-medium text-foreground">
            {experience.companyName}
          </h3>

          {experience.isCurrentEmployer && (
            <span className="relative flex items-center justify-center">
              <span className="absolute inline-flex size-3 animate-ping rounded-full bg-info opacity-50" />
              <span className="relative inline-flex size-2 rounded-full bg-info" />
              <span className="sr-only">Current Employer</span>
            </span>
          )}
        </div>

        <div className="space-y-2">
          {experience.positions.map((position) => (
            <EducationPositionItem key={position.id} position={position} />
          ))}

          <Link
            href="/certifications"
            className="group relative mt-2 flex items-center justify-between rounded-xl border border-edge bg-card/50 p-3 sm:p-4 transition-all hover:bg-accent hover:border-primary/30"
          >
            <div className="flex flex-col gap-1">
              <h4 className="text-sm font-bold text-foreground sm:text-base">
                Certifications
              </h4>
              <p className="text-[10px] text-muted-foreground sm:text-sm">
                Professional certificates and credentials I&apos;ve earned.
              </p>
            </div>
            <div className="flex size-7 shrink-0 items-center justify-center rounded-full border border-edge bg-background transition-transform group-hover:translate-x-1 group-hover:border-primary/30 sm:size-8">
              <ArrowRight className="size-3.5 text-muted-foreground group-hover:text-primary sm:size-4" />
            </div>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative border-l-2 border-edge pl-4 transition-colors hover:border-primary/50 py-2">
      <div
        className="flex cursor-pointer flex-col gap-1 sm:flex-row sm:items-start sm:justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-bold sm:text-lg">
              {experience.companyName}
            </h3>
            {experience.isCurrentEmployer && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-full rounded-full bg-emerald-500" />
                </span>
                Working
              </span>
            )}
            <ChevronDown
              className={cn(
                "size-4 text-muted-foreground transition-transform duration-200",
                isExpanded && "rotate-180",
              )}
            />
          </div>
          <p className="text-sm font-medium text-muted-foreground">
            {experience.positions[0].title}
            {experience.positions.length > 1 &&
              ` (+${experience.positions.length - 1} more roles)`}
          </p>
        </div>

        <div className="flex flex-col text-left sm:text-right">
          <p className="text-xs font-medium text-muted-foreground sm:text-sm">
            {
              experience.positions[experience.positions.length - 1]
                .employmentPeriod.start
            }{" "}
            — {experience.positions[0].employmentPeriod.end || "Present"}
          </p>
          <p className="text-xs text-muted-foreground/60">
            {experience.positions[0].location &&
              `${experience.positions[0].location} `}
            {experience.positions[0].locationType &&
              `(${experience.positions[0].locationType})`}
          </p>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-3 space-y-6 pb-2">
              {experience.positions.map((pos, idx) => (
                <div
                  key={pos.id}
                  className={cn(
                    "space-y-4",
                    idx > 0 && "border-t border-edge pt-4",
                  )}
                >
                  {experience.positions.length > 1 && (
                    <div className="flex flex-col gap-0.5">
                      <h4 className="text-sm font-bold text-foreground">
                        {pos.title}
                      </h4>
                      <p className="text-[11px] text-muted-foreground">
                        {pos.employmentPeriod.start} —{" "}
                        {pos.employmentPeriod.end || "Present"}
                        {pos.location && ` • ${pos.location}`}
                      </p>
                    </div>
                  )}

                  <PositionContent position={pos} />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
