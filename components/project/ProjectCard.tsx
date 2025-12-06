import type { GithubRepository, ProjectCardProps } from '@/types/index';

import { Zoom, Link, Image } from '@/components/ui';
import { GithubRepo } from '@/components/project';

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { title, description, imgSrc, url, repo, builtWith } = project;

  const repository = repo as GithubRepository | undefined;

  const href = repository?.url || url;

  return (
    <div className="w-full p-3 sm:p-4 md:w-1/2 lg:w-1/2">
      <div
        className={`${imgSrc && 'h-full'
          } flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:border-gray-700 dark:bg-gray-800/50`}
      >
        {imgSrc && (
          <div className="relative overflow-hidden">
            <Zoom>
              <Image
                alt={title}
                src={imgSrc}
                className="h-40 w-full object-cover object-center transition-transform duration-300 hover:scale-105 sm:h-44 md:h-48 lg:h-52"
                width={1088}
                height={612}
              />
            </Zoom>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>
        )}

        <div className="flex flex-1 flex-col p-4 sm:p-5 md:p-6">
          <h2 className="mb-2 text-lg font-bold leading-tight tracking-tight text-gray-900 dark:text-gray-100 sm:text-xl md:text-2xl">
            {href ? (
              <Link
                href={href}
                aria-label={`Link to ${title}`}
                className="transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400"
              >
                {title}
              </Link>
            ) : (
              title
            )}
          </h2>

          <p className="mb-3 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400 sm:text-base line-clamp-3 sm:line-clamp-none">
            {repository?.description || description}
          </p>

          <div className="mb-3 flex flex-wrap gap-1.5 text-xs sm:text-sm">
            <span className="shrink-0 font-medium text-gray-700 dark:text-gray-300">Built with:</span>
            <div className="flex flex-wrap gap-1">
              {builtWith?.map((tool, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {repository ? (
            <GithubRepo repo={repository} />
          ) : (
            href && (
              <Link
                href={href}
                className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition-colors duration-200 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 sm:text-base"
                aria-label={`Link to ${title}`}
              >
                Learn more
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
