import 'css/prism.css';
import 'katex/dist/katex.css';

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXLayoutRenderer } from 'pliny/mdx-components';
import type { Snippet } from 'contentlayer/generated';
import { allSnippets } from 'contentlayer/generated';
import { coreContent, allCoreContent } from 'pliny/utils/contentlayer';
import { sortPosts } from 'pliny/utils/contentlayer';

import { components } from '@/components/ui';
import siteMetadata from '@/data/siteMetadata';
import Link from 'next/link';

export async function generateMetadata(props: { params: Promise<{ slug: string[] }> }): Promise<Metadata | undefined> {
  const params = await props.params;
  const slug = decodeURI(params.slug.join('/'));
  const snippet = allSnippets.find((p) => p.slug === slug);

  if (!snippet) {
    return;
  }

  return {
    title: snippet.title,
    description: snippet.description,
    openGraph: {
      title: snippet.title,
      description: snippet.description,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      url: './',
    },
    twitter: {
      card: 'summary',
      title: snippet.title,
      description: snippet.description,
    },
  };
}

export const generateStaticParams = async () => {
  return allSnippets.map((p) => ({ slug: p.slug.split('/').map((name) => decodeURI(name)) }));
};

export default async function SnippetPage(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params;
  const slug = decodeURI(params.slug.join('/'));

  const sortedCoreContents = allCoreContent(sortPosts(allSnippets));
  const snippetIndex = sortedCoreContents.findIndex((p) => p.slug === slug);

  if (snippetIndex === -1) {
    return notFound();
  }

  const prev = sortedCoreContents[snippetIndex + 1];
  const next = sortedCoreContents[snippetIndex - 1];
  const snippet = allSnippets.find((p) => p.slug === slug) as Snippet;
  const mainContent = coreContent(snippet);

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {/* Header */}
      <div className="space-y-2 px-2 pb-8 pt-6 sm:px-0 md:space-y-5">
        <div className="mb-4">
          <Link
            href="/snippets"
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ← Back to Snippets
          </Link>
        </div>
        <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-tight">
          {snippet.title}
        </h1>
        <p className="text-base leading-7 text-gray-500 dark:text-gray-400 sm:text-lg">{snippet.description}</p>
        {snippet.tags && snippet.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {snippet.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="pb-8 pt-8">
        <article className="prose max-w-none dark:prose-invert">
          <MDXLayoutRenderer code={snippet.body.code} components={components} />
        </article>
      </div>

      {/* Navigation */}
      {(prev || next) && (
        <div className="flex justify-between border-t border-gray-200 py-8 dark:border-gray-700">
          {prev ? (
            <Link
              href={`/snippets/${prev.slug}`}
              className="group flex flex-col rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-gray-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
            >
              <span className="text-sm text-gray-500 dark:text-gray-400">Previous</span>
              <span className="mt-1 font-semibold text-gray-900 group-hover:text-primary-600 dark:text-gray-100 dark:group-hover:text-primary-400">
                {prev.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/snippets/${next.slug}`}
              className="group flex flex-col rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-gray-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
            >
              <span className="text-sm text-gray-500 dark:text-gray-400">Next</span>
              <span className="mt-1 font-semibold text-gray-900 group-hover:text-primary-600 dark:text-gray-100 dark:group-hover:text-primary-400">
                {next.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      )}
    </div>
  );
}
