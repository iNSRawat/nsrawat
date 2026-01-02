'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';

import siteMetadata from '@/data/siteMetadata';
import headerNavLinks from '@/data/headerNavLinks';

import Link from '@/components/ui/Link';

import Logo from 'public/static/images/logo.svg';

import MobileNav from './MobileNav';
import ThemeSwitch from './ThemeSwitch';
import SearchButton from './SearchButton';

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="fixed left-1/2 top-4 z-50 w-full max-w-4xl -translate-x-1/2 px-4">
      <div className="flex items-center justify-between rounded-lg border border-zinc-700/50 bg-zinc-900/90 px-4 py-2.5 shadow-lg backdrop-blur-md">
        {/* Logo + Name in terminal style */}
        <Link
          href="/"
          aria-label={siteMetadata.headerTitle}
          className="flex items-center gap-2 font-mono text-sm font-bold transition-colors hover:text-green-300"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-800">
            <Logo className="h-4 w-4 fill-green-400" />
          </div>
          <span className="text-green-500">&gt;_</span>
          <span className="text-zinc-500">://</span>
          <span className="text-white">N S Rawat</span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-1">
          <nav className="hidden items-center gap-0 sm:flex">
            {headerNavLinks
              .filter((link) => link.href !== '/')
              .map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className={clsx(
                    'px-2 py-1 font-mono text-sm font-bold transition-colors',
                    pathname.startsWith(link.href)
                      ? 'text-green-400'
                      : 'text-zinc-400 hover:text-green-400'
                  )}
                >
                  <span className="text-zinc-600">://</span>
                  {link.title.toLowerCase()}
                </Link>
              ))}
          </nav>

          {/* Utility buttons */}
          <div className="ml-2 flex items-center gap-2 border-l border-zinc-700 pl-3">
            <SearchButton />
            <ThemeSwitch />
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
