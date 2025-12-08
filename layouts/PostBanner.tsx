import { ReactNode } from 'react';
import Link from 'next/link';
import Bleed from 'pliny/ui/Bleed';
import { CoreContent } from 'pliny/utils/contentlayer';
import type { Blog } from 'contentlayer/generated';

import siteMetadata from '@/data/siteMetadata';
import { Image, Comments, PageTitle, SectionContainer, ScrollTopAndComment } from '@/components/ui';
import { BlogNav } from '@/components/blog';

interface LayoutProps {
  content: CoreContent<Blog>;
  children: ReactNode;
  next?: { path: string; title: string };
  prev?: { path: string; title: string };
}

export default function PostMinimal({ content, next, prev, children }: LayoutProps) {
  const { slug, title, images } = content;
  const displayImage = images && images.length > 0 ? images[0] : 'https://picsum.photos/seed/picsum/800/400';

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div>
          <div className="mb-4 px-2 sm:px-0">
            <Link
              href="/blog"
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ← Back to Blog
            </Link>
          </div>
          <div className="space-y-1 pb-10 text-center dark:border-gray-700">
            <div className="w-full">
              <Bleed>
                <div className="relative aspect-[2/1] w-full">
                  <Image src={displayImage} alt={title} fill className="object-cover" />
                </div>
              </Bleed>
            </div>
            <div className="relative pt-10">
              <PageTitle>{title}</PageTitle>
            </div>
          </div>
          <div className="prose max-w-none py-4 dark:prose-invert">{children}</div>
          {siteMetadata.comments && (
            <div className="pb-6 pt-6 text-center text-gray-700 dark:text-gray-300" id="comment">
              <Comments />
            </div>
          )}
          <footer>
            <BlogNav next={next} prev={prev} />
          </footer>
        </div>
      </article>
    </SectionContainer>
  );
}
