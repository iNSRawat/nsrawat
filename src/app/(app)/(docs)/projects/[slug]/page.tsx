import { ArrowLeftIcon, ArrowRightIcon, ExternalLinkIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  TooltipContent,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from "@/components/base/ui/tooltip";
import { Icons } from "@/components/icons";
import { Markdown } from "@/components/markdown";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { Tag } from "@/components/ui/tag";
import { LLMCopyButtonWithViewOptions } from "@/features/blog/components/post-page-actions";
import { PostShareMenu } from "@/features/blog/components/post-share-menu";
import { ProjectItem } from "@/features/portfolio/components/projects/project-item";
import { PROJECTS } from "@/features/portfolio/data/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.id === slug);
  if (!project) return {};

  return {
    title: `${project.title} - Case Study`,
    description: project.description.slice(0, 150),
  };
}

export default async function ProjectDetailsPage({ params }: Props) {
  const { slug } = await params;
  const projectIndex = PROJECTS.findIndex((p) => p.id === slug);
  const project = PROJECTS[projectIndex];

  if (!project) {
    notFound();
  }

  // Pagination and Related Projects
  const nextProject = PROJECTS[projectIndex + 1] || PROJECTS[0];
  const previousProject =
    projectIndex > 0
      ? PROJECTS[projectIndex - 1]
      : PROJECTS[PROJECTS.length - 1];
  const relatedProjects = PROJECTS.filter((p) => p.id !== project.id).slice(
    0,
    2,
  );

  return (
    <div className="container relative mx-auto max-w-4xl py-10 px-4 sm:px-6 min-h-svh">
      {/* Sidebar TOC - Absolute positioned outside the main column for large screens */}
      <aside className="hidden xl:block absolute top-24 left-[-16rem] w-56">
        <div className="sticky top-24 rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-sm shadow-xl">
          <h3 className="text-sm font-medium mb-4 text-foreground/80">
            On This Page
          </h3>
          <div className="flex flex-col border-l border-white/10 pl-4 space-y-4">
            {project.overview && (
              <a
                href="#overview"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors relative flex items-center"
              >
                <span className="absolute -left-[21px] w-1.5 h-1.5 rounded-full bg-foreground" />
                Overview
              </a>
            )}
            {project.keyFeatures && (
              <a
                href="#key-features"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors relative flex items-center"
              >
                <span className="absolute -left-[21px] w-1 h-1 rounded-full bg-muted-foreground opacity-0 hover:opacity-100 transition-opacity" />
                Key Features
              </a>
            )}
            {project.whyIBuiltThis && (
              <a
                href="#why-i-built-this"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors relative flex items-center"
              >
                <span className="absolute -left-[21px] w-1 h-1 rounded-full bg-muted-foreground opacity-0 hover:opacity-100 transition-opacity" />
                Why I Built This
              </a>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="w-full">
        {/* Top Navigation Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <Button
            className="h-7 gap-2 rounded-lg px-0 font-mono text-muted-foreground w-fit"
            variant="link"
            asChild
          >
            <Link href="/projects">
              <ArrowLeftIcon />
              Projects
            </Link>
          </Button>

          <div className="flex items-center gap-2">
            <LLMCopyButtonWithViewOptions
              markdownUrl={`/projects.mdx/${slug}`}
            />
            <PostShareMenu title={project.title} url={`/projects/${slug}`} />
            <TooltipProvider>
              <TooltipRoot>
                <TooltipTrigger
                  render={
                    <Button variant="secondary" size="icon-sm" asChild>
                      <Link href={`/projects/${previousProject.id}`} />
                    </Button>
                  }
                >
                  <span className="sr-only">Previous</span>
                  <ArrowLeftIcon />
                </TooltipTrigger>
                <TooltipContent className="pr-2 pl-3">
                  <div className="flex items-center gap-3">
                    Previous
                    <Kbd>
                      <ArrowLeftIcon />
                    </Kbd>
                  </div>
                </TooltipContent>
              </TooltipRoot>

              <TooltipRoot>
                <TooltipTrigger
                  render={
                    <Button variant="secondary" size="icon-sm" asChild>
                      <Link href={`/projects/${nextProject.id}`} />
                    </Button>
                  }
                >
                  <span className="sr-only">Next</span>
                  <ArrowRightIcon />
                </TooltipTrigger>
                <TooltipContent className="pr-2 pl-3">
                  <div className="flex items-center gap-3">
                    Next
                    <Kbd>
                      <ArrowRightIcon />
                    </Kbd>
                  </div>
                </TooltipContent>
              </TooltipRoot>
            </TooltipProvider>
          </div>
        </div>

        {/* Hero Image */}
        {project.logo && (
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden rounded-2xl mb-6 mt-2 flex items-center justify-center bg-[#050505] ring-1 ring-white/10 group">
            {/* Ambient background glow inside the container */}
            <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-cyan-500/30 blur-[120px] rounded-full pointer-events-none" />

            {/* The actual screenshot, floating inside the container */}
            <div className="relative w-[85%] h-[85%] sm:w-[75%] sm:h-[85%] rounded-lg sm:rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 z-10 transition-transform duration-500 group-hover:scale-[1.02]">
              <Image
                src={project.logo}
                alt={project.title}
                fill
                className="object-cover object-top"
                quality={100}
                priority
                unoptimized
              />
            </div>
          </div>
        )}

        {/* Tags above title */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.status && (
            <Tag className="px-3 py-1 text-xs font-medium bg-secondary/50 border-white/10 rounded-full">
              {project.status}
            </Tag>
          )}
          {project.skills.slice(0, 4).map((skill, i) => (
            <Tag
              key={i}
              className="px-3 py-1 text-xs font-medium bg-transparent border-white/10 rounded-full"
            >
              {skill}
            </Tag>
          ))}
          {project.skills.length > 4 && (
            <Tag className="px-3 py-1 text-xs font-medium bg-transparent border-white/10 rounded-full">
              +{project.skills.length - 4} more
            </Tag>
          )}
        </div>

        {/* Header & Meta */}
        <h1 className="text-4xl font-bold sm:text-5xl leading-tight text-balance mb-6">
          {project.title}
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed text-balance mb-8">
          {project.description.replace(
            /^Problem: |- Approach: |- Result: /gm,
            "",
          )}
        </p>

        {/* Meta Grid Box */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 sm:p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground tracking-wider">
              Timeline
            </span>
            <span className="text-sm font-medium">
              {project.duration ||
                `${project.period.start} - ${project.period.end || "Present"}`}
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground tracking-wider">
              Role
            </span>
            <span className="text-sm font-medium">
              {project.role || "Developer"}
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground tracking-wider">
              Team
            </span>
            <span className="text-sm font-medium">
              {project.teamSize || "Solo"}
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground tracking-wider">
              Status
            </span>
            <div>
              <Tag className="px-2 py-0.5 text-xs font-medium bg-secondary/50 border-white/10 rounded-full">
                {project.status || "Completed"}
              </Tag>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 py-6 border-b border-white/10 mb-8">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background shadow transition-colors hover:bg-foreground/90"
            >
              <ExternalLinkIcon className="size-4" /> Live Demo
            </a>
          )}
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-5 py-2.5 text-sm font-medium shadow-sm transition-colors hover:bg-white/[0.05]"
          >
            <Icons.github className="size-4" /> Source Code
          </a>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Technology Stack Box */}
          <section className="p-4 sm:p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
            <h2 className="text-lg font-bold mb-4">Technology Stack</h2>
            <ul className="flex flex-wrap gap-2.5">
              {project.skills.map((skill, index) => (
                <li key={index}>
                  <Tag className="px-3.5 py-1.5 text-sm font-medium bg-white/[0.05] border-transparent rounded-full">
                    {skill}
                  </Tag>
                </li>
              ))}
            </ul>
          </section>

          {/* Challenges & Learnings Grid */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
            {project.keyChallenges && (
              <section className="p-4 sm:p-5 rounded-2xl border border-orange-500/20 bg-orange-500/5 shadow-[0_0_30px_-15px_rgba(249,115,22,0.2)]">
                <h2 className="text-lg font-bold mb-4 text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.5)]">
                  Key Challenges
                </h2>
                <div className="prose prose-sm dark:prose-invert prose-li:marker:text-orange-500 max-w-none">
                  <Markdown>{project.keyChallenges}</Markdown>
                </div>
              </section>
            )}

            {project.keyLearnings && (
              <section className="p-4 sm:p-5 rounded-2xl border border-green-500/20 bg-green-500/5 shadow-[0_0_30px_-15px_rgba(34,197,94,0.2)]">
                <h2 className="text-lg font-bold mb-4 text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]">
                  Key Learnings
                </h2>
                <div className="prose prose-sm dark:prose-invert prose-li:marker:text-green-500 max-w-none">
                  <Markdown>{project.keyLearnings}</Markdown>
                </div>
              </section>
            )}
          </div>

          {/* Overview */}
          {project.overview && (
            <section
              id="overview"
              className="space-y-6 prose prose-sm sm:prose-base dark:prose-invert max-w-none scroll-mt-28"
            >
              <h2 className="text-2xl font-bold border-b border-border/50 pb-3 not-prose">
                Overview
              </h2>
              <Markdown>{project.overview}</Markdown>
            </section>
          )}

          {/* Key Features */}
          {project.keyFeatures && (
            <section
              id="key-features"
              className="space-y-6 prose prose-sm sm:prose-base dark:prose-invert max-w-none scroll-mt-28"
            >
              <h2 className="text-2xl font-bold border-b border-border/50 pb-3 not-prose">
                Key Features
              </h2>
              <Markdown>{project.keyFeatures}</Markdown>
            </section>
          )}

          {/* Why I Built This */}
          {project.whyIBuiltThis && (
            <section
              id="why-i-built-this"
              className="space-y-6 prose prose-sm sm:prose-base dark:prose-invert max-w-none scroll-mt-28"
            >
              <h2 className="text-2xl font-bold border-b border-border/50 pb-3 not-prose">
                Why I Built This
              </h2>
              <Markdown>{project.whyIBuiltThis}</Markdown>
            </section>
          )}

          {/* Pagination Box */}
          <div className="pt-12 border-t border-white/10 mt-16">
            <Link
              href={`/projects/${nextProject.id}`}
              className="flex items-center justify-between p-6 sm:p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all group"
            >
              <div className="flex items-center gap-6">
                {nextProject.logo && (
                  <div className="hidden sm:block relative size-16 rounded-xl overflow-hidden bg-black/50 ring-1 ring-white/10">
                    <Image
                      src={nextProject.logo}
                      alt={nextProject.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Next
                  </span>
                  <span className="text-lg sm:text-xl font-bold group-hover:text-primary transition-colors">
                    {nextProject.title}
                  </span>
                </div>
              </div>
              <ArrowRightIcon className="size-6 text-muted-foreground group-hover:text-foreground transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Related Projects */}
          <div className="pt-8 space-y-6">
            <h2 className="text-2xl font-bold">Related Projects</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {relatedProjects.map((rp) => (
                <ProjectItem key={rp.id} project={rp} />
              ))}
            </div>

            <div className="flex justify-center pt-8">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 px-6 py-3 text-sm font-medium transition-colors"
              >
                View All Projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
