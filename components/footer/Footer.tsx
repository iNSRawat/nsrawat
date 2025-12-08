import BuildWith from '@/components/footer/BuildWith';

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-gray-200 bg-white py-8 dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-300">NSRawat's Blog - Data Adventure</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} N S Rawat. All rights reserved.
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
          <BuildWith />
        </div>
      </div>
    </footer>
  );
}
