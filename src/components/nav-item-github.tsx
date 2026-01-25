import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { SOURCE_CODE_GITHUB_URL } from "@/config/site";

export function NavItemGitHub() {
  return (
    <Button variant="ghost" size="icon" asChild>
      <a
        href={SOURCE_CODE_GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
      >
        <Icons.github className="size-4" />
      </a>
    </Button>
  );
}
