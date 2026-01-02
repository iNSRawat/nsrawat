'use client';

import { Dialog, Transition } from '@headlessui/react';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { Fragment, useState, useEffect, useRef } from 'react';
import Link from '../ui/Link';
import headerNavLinks from '@/data/headerNavLinks';

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navRef = useRef(null);

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        enableBodyScroll(navRef.current);
      } else {
        // Prevent scrolling
        disableBodyScroll(navRef.current);
      }
      return !status;
    });
  };

  useEffect(() => {
    setMounted(true);
    return clearAllBodyScrollLocks;
  }, []);

  return (
    <>
      <button
        data-umami-event="mobile-nav-toggle"
        aria-label="Toggle Menu"
        onClick={onToggleNav}
        className="sm:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-6 w-6 text-green-400 hover:text-green-300"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {mounted && (
        <Transition appear show={navShow} as={Fragment} unmount={false}>
          <Dialog as="div" onClose={onToggleNav} unmount={false}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              unmount={false}
            >
              <div className="fixed inset-0 z-60 bg-black/50" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full opacity-0"
              enterTo="translate-x-0 opacity-100"
              leave="transition ease-in duration-200 transform"
              leaveFrom="translate-x-0 opacity-100"
              leaveTo="translate-x-full opacity-0"
              unmount={false}
            >
              <Dialog.Panel className="fixed left-0 top-0 z-70 h-full w-full transform bg-zinc-900 transition-transform duration-300 ease-in-out">
                <nav
                  ref={navRef}
                  className="mt-16 flex h-full basis-0 flex-col items-start overflow-y-auto pl-8 pt-4 text-left font-mono"
                >
                  {/* Home link */}
                  <Link
                    href="/"
                    className="mb-4 py-2 text-xl text-green-400 hover:text-green-300"
                    onClick={onToggleNav}
                  >
                    <span className="text-zinc-500">://</span>home
                  </Link>
                  {headerNavLinks
                    .filter((link) => link.href !== '/')
                    .map((link) => (
                      <Link
                        key={link.title}
                        href={link.href}
                        className="mb-4 py-2 text-xl text-zinc-400 hover:text-green-400"
                        onClick={onToggleNav}
                      >
                        <span className="text-zinc-600">://</span>
                        {link.title.toLowerCase()}
                      </Link>
                    ))}
                </nav>

                <button
                  className="fixed right-4 top-4 z-80 p-3 text-green-400 hover:text-green-300"
                  aria-label="Toggle Menu"
                  onClick={onToggleNav}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-8 w-8"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </Dialog>
        </Transition>
      )}
    </>
  );
};

export default MobileNav;
