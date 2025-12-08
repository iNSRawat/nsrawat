import siteMetadata from '@/data/siteMetadata';

import Link from '@/components/ui/Link';
import BrandIcon from '@/components/ui/BrandIcon';

const BuildWith = () => (
  <div className="flex items-center gap-2">
    <span className="text-sm text-gray-500 dark:text-gray-400">Build with</span>

    <div className="flex items-center gap-1.5">
      <Link href="https://nextjs.org?ref=NSRawat" className="flex items-center justify-center">
        <BrandIcon type="NextJS" className="h-6 w-6 rounded-full" />
      </Link>
      <Link href="https://www.typescriptlang.org?ref=NSRawat" className="flex items-center justify-center">
        <BrandIcon type="Typescript" className="h-6 w-6 rounded-full" />
      </Link>
      <Link href="https://tailwindcss.com?ref=NSRawat" className="flex items-center justify-center">
        <BrandIcon type="TailwindCSS" className="h-6 w-6 rounded-full" />
      </Link>
      <Link href="https://umami.is?ref=NSRawat" className="flex items-center justify-center">
        <BrandIcon type="Umami" className="h-6 w-6 rounded-full" />
      </Link>
    </div>
    <Link
      href={siteMetadata.siteRepo}
      className="text-sm text-gray-500 underline underline-offset-4 dark:text-gray-400"
    >
      <span data-umami-event="view-source">- View source</span>
    </Link>
  </div>
);

export default BuildWith;
