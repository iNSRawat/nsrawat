import { map } from 'lodash';

import popularTags from '@/data/popularTags';

import Link from '@/components/ui/Link';
import BrandIcon from '@/components/ui/BrandIcon';

const PopularTags = () => {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-1 py-2 sm:space-y-1.5 sm:py-3">
        <h1 className="text-2xl font-extrabold leading-8 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-9 md:text-4xl md:leading-10 lg:text-5xl lg:leading-14">
          Popular Tags
        </h1>
        <p className="!mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400 sm:!mt-1.5 sm:text-base md:text-lg">
          Popular tags feature the most widely favored topics.
        </p>
      </div>

      <div className="popular-tags grid grid-cols-2 gap-3 py-2 sm:grid-cols-3 sm:gap-4 sm:py-3 lg:grid-cols-4 xl:grid-cols-6">
        {map(popularTags, (popularTag) => {
          const { slug, iconType, href, title, bgColor } = popularTag;

          const className = `${slug} flex w-full min-w-0 justify-center space-x-1.5 rounded-lg p-2.5 text-white sm:space-x-2 sm:p-3 ${bgColor}`;

          return (
            <Link key={slug} href={href} className={className}>
              <BrandIcon type={iconType} className="h-5 w-5 flex-shrink-0 sm:h-6 sm:w-6" />
              <div className="my-auto truncate text-xs text-white sm:text-sm">{title}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default PopularTags;
