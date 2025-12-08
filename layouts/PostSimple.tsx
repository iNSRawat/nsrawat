import { ReactNode } from 'react';
import Link from 'next/link';

import { CoreContent } from 'pliny/utils/contentlayer';
import type { Blog } from 'contentlayer/generated';

import siteMetadata from '@/data/siteMetadata';

import { BlogTags, BlogMeta, BlogNav } from '@/components/blog';
import { Comments, PageTitle, SectionContainer, ScrollTopAndComment } from '@/components/ui';

interface LayoutProps {
  content: CoreContent<Blog>;
  children: ReactNode;
  next?: { path: string; title: string };
  prev?: { path: string; title: string };
}

export default function PostLayout({ content, next, prev, children }: LayoutProps) {
  const { slug, date, title, tags, readingTime } = content;

  return (
    <SectionContainer>
      <ScrollTopAndComment />

      <article>
        <div>
          <header>
            <div className="dark:border-gray space-y-1 border-b border-gray-200 pb-10">
              <div className="mb-4">
                <Link
                  href="/blog"
                  className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ← Back to Blog
                </Link>
              </div>
              <div className="space-y-6">
                <PageTitle>{title}</PageTitle>
                <BlogTags tags={tags} />
                <dl>
                  <div>
                    <dt className="sr-only">Published on</dt>
                    <BlogMeta date={date} slug={slug} readingTime={readingTime} />
                  </div>
                </dl>
              </div>
            </div>
          </header>

          <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:divide-y-0">
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pb-8 pt-10 dark:prose-dark">{children}</div>
            </div>
            {siteMetadata.comments && (
              <div className="pb-6 pt-6 text-center text-gray-700 dark:text-gray-300" id="comment">
                <Comments />
              </div>
            )}

            <footer>
              <BlogNav next={next} prev={prev} />
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  );
}
