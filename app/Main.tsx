'use client';

import type { CoreContent } from 'pliny/utils/contentlayer';
import type { Blog } from 'contentlayer/generated';

import { Link } from '@/components/ui';
import {
  ProfileCard,
  Heading,
  Greeting,
  TypedBios,
  BlogLinks,
  ShortDescription,
  PopularTags,
} from '@/components/homepage';
import BlogPostCard from '@/components/homepage/BlogPostCard';

const MAX_DISPLAY = 5;

interface HomeProps {
  posts: CoreContent<Blog>[];
}

export default function Home({ posts }: HomeProps) {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {/* Hero Section - Similar to leohuynh.dev */}
      <section className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-2 pt-6 sm:space-y-5 sm:pb-4 sm:pt-10">
          <div className="items-start space-y-8 lg:grid lg:grid-cols-12 lg:gap-8 lg:space-y-0">
            {/* Left Column - Text Content */}
            <div className="flex flex-col lg:col-span-7">
              <Greeting />
              <div className="mt-6 flex flex-col space-y-6">
                <div className="space-y-2">
                  <Heading />
                  <TypedBios />
                </div>
                <ShortDescription />
                <div>
                  <BlogLinks />
                </div>
              </div>
            </div>

            {/* Right Column - Profile Card */}
            <div className="mt-8 self-start lg:col-span-5 lg:mt-0 lg:sticky lg:top-20">
              <ProfileCard />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tags Section */}
      <section className="pt-2 pb-2 sm:pt-4 sm:pb-4">
        <PopularTags />
      </section>

      {/* Recent Posts Section */}
      <section className="pt-6 pb-2 sm:pt-8 sm:pb-4">
        <div className="space-y-2 pb-2 sm:space-y-3 sm:pb-3">
          {/* Section Header */}
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

          {/* Posts List */}
          {!posts.length ? (
            <p className="py-4 text-center text-gray-500 dark:text-gray-400">No posts found.</p>
          ) : (
            <div className="mt-4 space-y-0 sm:mt-5">
              {posts.slice(0, MAX_DISPLAY).map((post, index) => (
                <BlogPostCard
                  key={post.slug}
                  post={post}
                  isLast={index === posts.slice(0, MAX_DISPLAY).length - 1}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
