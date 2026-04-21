import dynamic from "next/dynamic";
import type { ProfilePage as PageSchema, WithContext } from "schema-dts";

import { About } from "@/features/portfolio/components/about";
import { Overview } from "@/features/portfolio/components/overview";
import { ProfileCover } from "@/features/portfolio/components/profile-cover";
import { ProfileHeader } from "@/features/portfolio/components/profile-header";
import { USER } from "@/features/portfolio/data/user";
import { cn } from "@/lib/utils";

// Lazy load below-fold sections to reduce initial JS bundle
const Testimonials = dynamic(
  () =>
    import("@/features/portfolio/components/testimonials").then(
      (mod) => mod.Testimonials,
    ),
  { loading: () => <SectionSkeleton /> },
);

const GitHubContributions = dynamic(
  () =>
    import("@/features/portfolio/components/github-contributions").then(
      (mod) => mod.GitHubContributions,
    ),
  { loading: () => <SectionSkeleton /> },
);

const TeckStack = dynamic(
  () =>
    import("@/features/portfolio/components/teck-stack").then(
      (mod) => mod.TeckStack,
    ),
  { loading: () => <SectionSkeleton /> },
);

const Snippets = dynamic(
  () =>
    import("@/features/portfolio/components/snippets").then(
      (mod) => mod.Snippets,
    ),
  { loading: () => <SectionSkeleton /> },
);

const Blog = dynamic(
  () => import("@/features/portfolio/components/blog").then((mod) => mod.Blog),
  { loading: () => <SectionSkeleton /> },
);

const Experiences = dynamic(
  () =>
    import("@/features/portfolio/components/experiences").then(
      (mod) => mod.Experiences,
    ),
  { loading: () => <SectionSkeleton /> },
);

const Projects = dynamic(
  () =>
    import("@/features/portfolio/components/projects").then(
      (mod) => mod.Projects,
    ),
  { loading: () => <SectionSkeleton /> },
);

const LetsTalk = dynamic(
  () =>
    import("@/features/portfolio/components/lets-talk").then(
      (mod) => mod.LetsTalk,
    ),
  { loading: () => <SectionSkeleton /> },
);

function SectionSkeleton() {
  return <div className="h-32 w-full animate-pulse bg-muted/30" />;
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPageJsonLd()).replace(/</g, "\\u003c"),
        }}
      />

      <div className="mx-auto md:max-w-3xl *:[[id]]:scroll-mt-22">
        <ProfileCover />
        <ProfileHeader />
        <Separator />

        <Overview />
        <Separator />

        <About />
        <Separator />

        <Testimonials />

        <GitHubContributions />
        <Separator />

        <TeckStack />
        <Separator />

        <Snippets />
        <Separator />

        <Blog />
        <Separator />

        <Experiences />
        <Separator />

        <Projects projectItemVariant="compact" />
        <Separator />

        {/* Awards section removed for now */}
        {/* <Awards /> */}
        {/* <Separator /> */}

        <LetsTalk />
        <Separator />
      </div>
    </>
  );
}

function getPageJsonLd(): WithContext<PageSchema> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: new Date(USER.dateCreated).toISOString(),
    dateModified: new Date(USER.dateCreated).toISOString(),
    mainEntity: {
      "@type": "Person",
      name: USER.displayName,
      identifier: USER.username,
      image: USER.avatar,
    },
  };
}

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
