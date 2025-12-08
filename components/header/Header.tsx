'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';

import siteMetadata from '@/data/siteMetadata';
import headerNavLinks from '@/data/headerNavLinks';

import Link from '@/components/ui/Link';

import Logo from 'public/static/images/logo.svg';

import MobileNav from './MobileNav';
import ThemeSwitch from './ThemeSwitch';
// import SearchButton from './SearchButton';
import AnalyticsLink from './AnalyticsLink';
import { GrowingUnderline } from '@/components/ui/GrowingUnderline';

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="fixed left-1/2 top-6 z-50 w-full max-w-2xl -translate-x-1/2">
      <div className="mx-4 flex items-center justify-between rounded-full border border-zinc-200/50 bg-white/70 px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.04)] backdrop-blur-md transition-all dark:border-zinc-800/50 dark:bg-zinc-900/70 dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
        <Link href="/" aria-label={siteMetadata.headerTitle} className="flex items-center gap-2">
          <div className="flex h-8 w-8 animate-wave items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
            <Logo className="h-5 w-5 fill-zinc-800 dark:fill-zinc-200" />
          </div>
        </Link>
        <div className="flex items-center gap-1">
          <div className="hidden items-center gap-1 sm:flex">
            {headerNavLinks
              .filter((link) => link.href !== '/')
              .map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className={clsx(
                    'relative rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
                    pathname.startsWith(link.href)
                      ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
                      : 'text-zinc-600 hover:bg-zinc-100/50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-100'
                  )}
                >
                  {link.title}
                </Link>
              ))}
          </div>
          <div className="mx-2 hidden h-4 w-px bg-zinc-200 dark:bg-zinc-800 sm:block" />
          <div className="flex items-center gap-2">
            <AnalyticsLink />
            <ThemeSwitch />
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
