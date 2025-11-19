# App Pages and Final Migration Checklist

## Complete Migration Checklist

### Phase 1: Preparation ✅
- [ ] Create backup branch
- [ ] Tag current version
- [ ] Review files 01-04
- [ ] Prepare local environment

### Phase 2: Dependencies ✅
- [ ] Update package.json
- [ ] Run `yarn install`
- [ ] Verify no errors

### Phase 3: Configuration ✅
- [ ] Create contentlayer.config.ts
- [ ] Create biome.json
- [ ] Update next.config.mjs
- [ ] Update tsconfig.json

### Phase 4: Content Structure ✅
- [ ] Create data/blog/ directory
- [ ] Create data/projects/ directory  
- [ ] Create data/snippets/ directory
- [ ] Create data/authors/ directory
- [ ] Add 3+ blog posts
- [ ] Add 3+ projects
- [ ] Add 5+ code snippets

### Phase 5: App Pages ✅
- [ ] Create app/page.tsx
- [ ] Create app/blog/page.tsx
- [ ] Create app/blog/[slug]/page.tsx
- [ ] Create app/projects/page.tsx
- [ ] Create app/projects/[slug]/page.tsx
- [ ] Create app/snippets/page.tsx
- [ ] Create app/about/page.tsx
- [ ] Create app/layout.tsx

### Phase 6: Components ✅
- [ ] Header component
- [ ] Footer component (your custom one)
- [ ] Navigation component
- [ ] Card component
- [ ] Tag component
- [ ] MDX components

### Phase 7: Styling ✅
- [ ] Configure Tailwind
- [ ] Add dark mode support
- [ ] Test responsive design
- [ ] Add animations

### Phase 8: Testing ✅
- [ ] Run `yarn dev`
- [ ] Test all pages locally
- [ ] Check blog posts render
- [ ] Check projects render
- [ ] Check snippets render
- [ ] Test navigation
- [ ] Test dark mode toggle
- [ ] Test mobile responsive

### Phase 9: Build & Deploy ✅
- [ ] Run `yarn build`
- [ ] Fix any build errors
- [ ] Run `yarn lint:fix`
- [ ] Run `yarn typecheck`
- [ ] Commit changes
- [ ] Push to GitHub
- [ ] Verify Vercel deployment
- [ ] Test production site

### Phase 10: Final Checks ✅
- [ ] All links working
- [ ] Images loading
- [ ] SEO meta tags present
- [ ] Analytics configured
- [ ] Performance optimized
- [ ] Custom footer preserved

---

## Quick Start Commands

```bash
# Initial setup
git checkout -b upgrade-nextjs15
yarn install

# Development
yarn dev

# Checks
yarn typecheck
yarn lint
yarn build

# Deployment
git add .
git commit -m "Upgrade to Next.js 15 with DS content"
git push origin upgrade-nextjs15
```

---

## Example App Page Structure

### Homepage (app/page.tsx)
```typescript
import { allBlogs } from 'contentlayer/generated'
import { sortPosts } from '@/lib/utils'

export default function Home() {
  const latestPosts = sortPosts(allBlogs).slice(0, 5)
  
  return (
    <div>
      <h1>Data Science Portfolio</h1>
      <section>
        {latestPosts.map(post => (
          <article key={post.slug}>
            <h2>{post.title}</h2>
            <p>{post.summary}</p>
          </article>
        ))}
      </section>
    </div>
  )
}
```

### Blog List Page (app/blog/page.tsx)
```typescript
import { allBlogs } from 'contentlayer/generated'

export default function BlogPage() {
  return (
    <div>
      <h1>Blog Posts</h1>
      {allBlogs.map(post => (
        <article key={post.slug}>
          <Link href={post.url}>
            <h2>{post.title}</h2>
          </Link>
        </article>
      ))}
    </div>
  )
}
```

### Blog Detail Page (app/blog/[slug]/page.tsx)
```typescript
import { allBlogs } from 'contentlayer/generated'
import { getMDXComponent } from 'next-contentlayer2/hooks'

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = allBlogs.find(p => p.slug === params.slug)
  const MDXContent = getMDXComponent(post.body.code)
  
  return (
    <article>
      <h1>{post.title}</h1>
      <time>{post.date}</time>
      <MDXContent />
    </article>
  )
}
```

---

## Timeline Summary

**Total Estimated Time: 12-15 hours**

- Day 1 (4-5 hours): Setup, dependencies, configuration
- Day 2 (4-5 hours): Content creation (blog, projects, snippets)
- Day 3 (4-5 hours): Pages, components, testing, deployment

---

## Success Criteria

✅ Site builds without errors
✅ All pages accessible
✅ Content displays correctly
✅ Dark mode works
✅ Mobile responsive
✅ Fast page loads (<2s)
✅ SEO optimized
✅ Deployed to Vercel

---

## Post-Migration Tasks

1. Share on LinkedIn/Twitter
2. Update resume with project link
3. Add to Upwork/Fiverr portfolio
4. Submit to data science communities
5. Continue adding content weekly

---

## Resources

- File 01: Complete Migration Guide
- File 02: Blog Post Templates
- File 03: Project Templates  
- File 04: Code Snippets
- File 05: This checklist

---

## 🎉 Congratulations!

Once you complete this checklist, you'll have a modern, professional Data Science portfolio powered by Next.js 15!

**Next Steps:**
1. Start with Phase 1
2. Work through each phase systematically
3. Test frequently
4. Deploy with confidence
5. Share your amazing portfolio!

Good luck! 🚀