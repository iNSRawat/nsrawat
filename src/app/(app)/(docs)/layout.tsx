import { StripedSeparator } from "@/components/striped-separator";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="screen-line-x mx-auto md:max-w-3xl">
      <StripedSeparator />

      {children}
    </div>
  );
}
