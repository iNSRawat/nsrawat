import BuildWith from '@/components/footer/BuildWith';
import DonationButtons from '@/components/footer/DonationButtons';

export default function Footer() {
  return (
    <footer className="mt-4 py-6">
      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-4">
        {/* Divider Line */}
        <div className="border-t border-gray-200 dark:border-gray-700"></div>

        {/* Donation Section */}
        <div className="pt-2">
          <DonationButtons />
        </div>

        {/* Build With & Copyright Row */}
        <div className="flex flex-col gap-4 border-t border-gray-200 pt-4 dark:border-gray-700 sm:flex-row sm:items-center sm:justify-between">
          <BuildWith />
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Copyright © {new Date().getFullYear()} • NSRawat's Blog - Data Adventure
          </div>
        </div>
      </div>
    </footer>
  );
}
