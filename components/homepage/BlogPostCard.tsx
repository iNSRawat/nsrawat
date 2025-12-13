'use client';

import { formatDate } from 'pliny/utils/formatDate';
import type { CoreContent } from 'pliny/utils/contentlayer';
import type { Blog } from 'contentlayer/generated';

import siteMetadata from '@/data/siteMetadata';
import { Link } from '@/components/ui';
import { slug } from 'github-slugger';

interface BlogPostCardProps {
  post: CoreContent<Blog>;
  isLast?: boolean;
}

export default function BlogPostCard({ post, isLast = false }: BlogPostCardProps) {
  const { slug: postSlug, date, title, summary, tags } = post;

  return (
    <article className="group py-3 sm:py-4">
      {/* Date */}
      <time
        dateTime={date}
        className="mb-1 block text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base"
      >
        {formatDate(date, siteMetadata.locale)}
      </time>

      {/* Title */}
      <h3 className="mb-2 text-xl font-bold leading-tight tracking-tight text-gray-900 transition-colors duration-200 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400 sm:text-2xl md:text-3xl">
        <Link
          href={`/blog/${postSlug}`}
          className="hover:underline"
          aria-label={`Read ${title}`}
        >
          {title}
        </Link>
      </h3>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-2 sm:gap-3">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${slug(tag)}`}
              className="text-xs font-semibold uppercase tracking-wide text-primary-500 transition-colors duration-200 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 sm:text-sm"
            >
              {tag}
            </Link>
          ))}
        </div>
      )}

      {/* Summary */}
      <p className="mb-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400 sm:text-base md:text-lg">
        {summary}
      </p>

      {/* Read More Link */}
      <Link
        href={`/blog/${postSlug}`}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-900 transition-colors duration-200 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400 sm:text-base"
        aria-label={`Read more about ${title}`}
      >
        Read more
        <svg
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </Link>

      {/* Separator */}
      {!isLast && (
        <div className="mt-3 border-b border-gray-200 dark:border-gray-700 sm:mt-4" />
      )}
    </article>
  );
}
