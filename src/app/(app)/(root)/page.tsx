import dynamic from "next/dynamic";
import type { ProfilePage as PageSchema, WithContext } from "schema-dts";

import { StripedSeparator } from "@/components/striped-separator";
import { About } from "@/features/portfolio/components/about";
import { ProfileCover } from "@/features/portfolio/components/profile-cover";
import { USER } from "@/features/portfolio/data/user";

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

const TechStack = dynamic(
  () =>
    import("@/features/portfolio/components/tech-stack").then(
      (mod) => mod.TechStack,
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
        {/* Hero — overlay hangs below border via translate-y-1/2, needs bottom margin */}
        <div className="mb-10 sm:mb-12">
          <ProfileCover />
        </div>
        <About />
        <StripedSeparator />

        <GitHubContributions />

        <TechStack />
        <StripedSeparator />

        <Snippets />
        <StripedSeparator />

        <Experiences />
        <StripedSeparator />

        <Projects projectItemVariant="compact" />
        <StripedSeparator />

        <Blog />
        <StripedSeparator />

        <Testimonials />
        <StripedSeparator />

        <LetsTalk />
        <StripedSeparator />
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
