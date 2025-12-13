import BuildWith from '@/components/footer/BuildWith';

export default function Footer() {
  return (
    <footer className="mt-4 py-6">
      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between">
        <BuildWith />

        <div className="text-sm text-gray-500 dark:text-gray-400">
          Copyright © {new Date().getFullYear()} • NSRawat's Blog - Data Adventure
        </div>
      </div>
    </footer>
  );
}
