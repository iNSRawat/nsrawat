import Link from 'next/link';
import { genPageMetadata } from 'app/seo';
import { allSnippets } from 'contentlayer/generated';
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer';
import { slug } from 'github-slugger';

export const metadata = genPageMetadata({ title: 'Snippets' });

export default function SnippetsPage() {
  const snippets = allCoreContent(sortPosts(allSnippets));

  const description =
    "My personal stash of data science code snippets that make my life easier. They're simple and reusable. Feel free to copy, tweak, and use them as you like.";

  // Group snippets by tags
  const snippetsByTag: Record<string, typeof snippets> = {};
  snippets.forEach((snippet) => {
    if (snippet.tags && snippet.tags.length > 0) {
      snippet.tags.forEach((tag) => {
        const tagSlug = slug(tag);
        if (!snippetsByTag[tagSlug]) {
          snippetsByTag[tagSlug] = [];
        }
        snippetsByTag[tagSlug].push(snippet);
      });
    } else {
      if (!snippetsByTag['other']) {
        snippetsByTag['other'] = [];
      }
      snippetsByTag['other'].push(snippet);
    }
  });

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {/* Header Section */}
      <div className="space-y-2 px-2 pb-8 pt-6 sm:px-0 md:space-y-5">
        <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-5xl md:leading-tight lg:text-6xl">
          Snippets
        </h1>
        <p className="text-base leading-7 text-gray-500 dark:text-gray-400 sm:text-lg">{description}</p>
        <p className="text-sm italic text-gray-500 dark:text-gray-400">
          *Some snippets written by me, some are from the internet (Thanks to the open source community).
        </p>
      </div>

      {/* All Snippets List */}
      <div className="py-8 sm:py-12">
        <div className="space-y-6">
          {snippets.map((snippet) => (
            <Link
              key={snippet.slug}
              href={`/snippets/${snippet.slug}`}
              className="group block rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-gray-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 dark:text-gray-100 dark:group-hover:text-primary-400">
                    {snippet.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{snippet.description}</p>
                  {snippet.tags && snippet.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
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
                <svg
                  className="ml-4 h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
