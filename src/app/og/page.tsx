import { StripedSeparator } from "@/components/striped-separator";
import { Overview } from "@/features/portfolio/components/overview";
import { ProfileHeader } from "@/features/portfolio/components/profile-header";

export default function Page() {
  return (
    <>
      <div className="mx-auto flex h-screen flex-col justify-center md:max-w-3xl">
        <div className="screen-line-after grow border-x border-edge after:-bottom-px">
          <div className="flex h-4" />
        </div>

        <ProfileHeader />
        <StripedSeparator />

        <Overview />

        <div className="grow border-x border-edge" />
      </div>
    </>
  );
}
