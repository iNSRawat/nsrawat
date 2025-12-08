'use client';

import { formatDate } from 'pliny/utils/formatDate';
import type { CoreContent } from 'pliny/utils/contentlayer';
import type { Blog } from 'contentlayer/generated';

import siteMetadata from '@/data/siteMetadata';
import { Link } from '@/components/ui';
import { ProfileCard, Heading, Greeting, TypedBios, BlogLinks, ShortDescription } from '@/components/homepage';
import SpotlightCard from '@/components/SpotlightCard';

const MAX_DISPLAY = 5;

interface HomeProps {
  posts: CoreContent<Blog>[];
}

export default function Home({ posts }: HomeProps) {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {/* Hero Section - Similar to leohuynh.dev */}
      <section className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 sm:space-y-5 sm:pb-12 sm:pt-10">
          <div className="space-y-8 lg:grid lg:grid-cols-12 lg:gap-8 lg:space-y-0">
            {/* Left Column - Text Content */}
            <div className="lg:col-span-7">
              <Greeting />
              <div className="mt-6 space-y-6">
                <div className="space-y-2">
                  <Heading />
                  <TypedBios />
                </div>
                <ShortDescription />
                <div className="pt-6">
                  <BlogLinks />
                </div>
              </div>
            </div>

            {/* Right Column - Profile Card */}
            <div className="mt-8 flex items-start lg:col-span-5 lg:mt-0">
              <ProfileCard />
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="divide-y divide-gray-200 py-8 dark:divide-gray-700 sm:py-12">
        <div className="space-y-2 pb-6 sm:space-y-5">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <h2 className="text-2xl font-extrabold leading-8 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-9 md:text-4xl md:leading-10">
              Latest posts
            </h2>
            <Link
              href="/blog"
              className="text-sm font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 sm:text-base"
            >
              View all posts →
            </Link>
          </div>

          <div className="mt-6 space-y-4 sm:space-y-6">
            {!posts.length && 'No posts found.'}
            {posts.slice(0, MAX_DISPLAY).map((post) => {
              const { slug, date, title, summary, tags } = post;
              return (
                <SpotlightCard key={slug} className="p-4 sm:p-6">
                  <article>
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-sm font-medium leading-6 text-gray-500 dark:text-gray-400 sm:text-base">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-3 xl:space-y-4">
                      <div>
                        <h3 className="text-lg font-bold leading-8 tracking-tight sm:text-xl">
                          <Link
                            href={`/blog/${slug}`}
                            className="text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
                          >
                            {title}
                          </Link>
                        </h3>
                        {tags && tags.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="text-xs font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 sm:text-sm"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="prose max-w-none text-sm text-gray-500 dark:text-gray-400 sm:text-base">
                        {summary}
                      </div>
                    </div>
                  </article>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
