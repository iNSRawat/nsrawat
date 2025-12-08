'use client';

import { formatDate } from 'pliny/utils/formatDate';
import type { CoreContent } from 'pliny/utils/contentlayer';
import type { Blog } from 'contentlayer/generated';
// import NewsletterForm from 'pliny/ui/NewsletterForm';

import siteMetadata from '@/data/siteMetadata';
import { Tag, Link, Twemoji } from '@/components/ui';
import {
  Avatar,
  Heading,
  Greeting,
  TypedBios,
  BlogLinks,
  PopularTags,
  ShortDescription,
  SpotifyNowPlaying,
} from '@/components/homepage';
import SpotlightCard from '@/components/SpotlightCard';

const MAX_DISPLAY = 5;

interface HomeProps {
  posts: CoreContent<Blog>[];
}

export default function Home({ posts }: HomeProps) {
  return (
    <div className="relative isolate overflow-hidden">
      {/* Hero Section */}
      <div className="pb-4 pt-16 sm:pb-6 sm:pt-20 lg:pb-8 lg:pt-24">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Greeting />
            <div className="mt-4 flex flex-col gap-2 sm:mt-5 sm:gap-3">
              <Heading />
              <TypedBios />
              <ShortDescription />
              <div className="mt-4 flex items-center gap-4 sm:mt-6">
                <BlogLinks />
              </div>
            </div>
          </div>
          <div className="relative mt-8 sm:mt-12 lg:col-span-5 lg:mx-0 lg:mt-0 lg:flex lg:items-center">
            <Avatar />
          </div>
        </div>
      </div>

      {/* Featured Projects Preview (Bento/Spotlight Style) */}
      <div className="mt-4 sm:mt-6 lg:mt-8">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-3xl lg:text-4xl">
          Featured Projects
        </h2>
        <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400 sm:mt-2 sm:text-base">
          Some of the projects I've worked on recently.
        </p>

        {/* Placeholder for Bento Grid - Ideally this would pull from projects data, but for now we structure it */}
        <div className="mt-3 grid grid-cols-1 gap-4 sm:mt-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* This area will be populated by project data later or manually added if specific featured ones are desired. 
                 For now, we keep the blog list below as the main content but wrapped nicely. */}
        </div>
      </div>

      <div className="mt-4 sm:mt-6 lg:mt-8">
        <PopularTags />
      </div>

      {/* Recent Posts */}
      <div className="mt-4 border-t border-zinc-100 pt-4 dark:border-zinc-800 sm:mt-6 sm:pt-6 lg:mt-8 lg:pt-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-3xl lg:text-4xl">
            Recent Posts
          </h2>
          <Link
            href="/blog"
            className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            All posts <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="mt-3 space-y-3 sm:mt-4 sm:space-y-4">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post;
            return (
              <SpotlightCard key={slug} className="p-4 sm:p-6">
                <article className="flex flex-col items-start justify-between">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs sm:gap-x-4">
                    <time dateTime={date} className="text-zinc-500">
                      {formatDate(date, siteMetadata.locale)}
                    </time>
                    {/* Render first tag as category */}
                    {tags && tags.length > 0 && (
                      <span className="relative z-10 rounded-full bg-zinc-50 px-2.5 py-1 font-medium text-zinc-600 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 sm:px-3 sm:py-1.5">
                        {tags[0]}
                      </span>
                    )}
                  </div>
                  <div className="group relative w-full">
                    <h3 className="mt-2 text-base font-semibold leading-6 text-zinc-900 group-hover:text-zinc-600 dark:text-zinc-100 dark:group-hover:text-zinc-300 sm:mt-3 sm:text-lg">
                      <Link href={`/blog/${slug}`}>
                        <span className="absolute inset-0" />
                        {title}
                      </Link>
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400 sm:mt-4">
                      {summary}
                    </p>
                  </div>
                </article>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}
