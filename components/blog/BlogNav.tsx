import Link from 'next/link';

interface BlogNavProps {
  next?: { path: string; title: string };
  nextLabel?: string;
  prev?: { path: string; title: string };
  prevLabel?: string;
}

const PostNav = (props: BlogNavProps) => {
  const { next, prev } = props;

  if (!prev && !next) {
    return null;
  }

  return (
    <div className="flex justify-between border-t border-gray-200 py-8 dark:border-gray-700">
      {prev && prev.path ? (
        <Link
          href={`/${prev.path}`}
          className="group flex flex-col rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-gray-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
          data-umami-event="post-nav-prev"
        >
          <span className="text-sm text-gray-500 dark:text-gray-400">Previous</span>
          <span className="mt-1 font-semibold text-gray-900 group-hover:text-primary-600 dark:text-gray-100 dark:group-hover:text-primary-400">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
      {next && next.path ? (
        <Link
          href={`/${next.path}`}
          className="group flex flex-col rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-gray-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
          data-umami-event="post-nav-next"
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
  );
};

export default PostNav;
