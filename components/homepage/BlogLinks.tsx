import Link from '@/components/ui/Link';
import siteMetadata from '@/data/siteMetadata';

const BlogLinks = () => {
  return (
    <div className="flex flex-col space-y-1.5">
      <Link href="/projects" className="hover:underline" data-umami-event="home-link-projects">
        <span className="mr-1.5">🧑‍💻</span>
        <span>what have i built?</span>
      </Link>
      <Link href="/blog" className="hover:underline" data-umami-event="home-link-blog">
        <span className="mr-1.5">📝</span>
        <span>my writings</span>
      </Link>
      <Link href="/snippets" className="hover:underline" data-umami-event="home-link-snippets">
        <span className="mr-1.5">🧬</span>
        <span>snippets collection</span>
      </Link>
      <Link href="/about" className="hover:underline" data-umami-event="home-link-about">
        <span className="mr-1.5">😎</span>
        <span>about me & this blog</span>
      </Link>
      <Link
        href={siteMetadata.analyticsURL}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
        data-umami-event="home-link-analytics"
      >
        <span className="mr-1.5">📊</span>
        <span>traffic and insights</span>
      </Link>
    </div>
  );
};

export default BlogLinks;
