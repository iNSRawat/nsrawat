import BuildWith from '@/components/footer/BuildWith';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-zinc-100 bg-white/50 py-10 dark:border-zinc-800 dark:bg-zinc-900/50">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-6 px-4 md:flex-row">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <div className="flex items-center gap-2">
            <div className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </div>
            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Available for new projects</span>
          </div>
          <div className="text-sm text-zinc-500 dark:text-zinc-500">
            © {new Date().getFullYear()} N S Rawat. All rights reserved.
          </div>
        </div>

        <BuildWith />
      </div>
    </footer>
  );
}
