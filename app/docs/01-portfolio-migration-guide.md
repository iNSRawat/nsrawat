# Complete Portfolio Migration Guide

## Upgrading to Next.js 15 + React 19 with Data Science Focus

---

## 📋 Overview

This guide will help you migrate your portfolio using **Yarn** as the package manager from the current setup to a modern stack using Next.js 15, React 19, Contentlayer, and Biome, with all content focused on Data Science.

---

## 🎯 Phase 1: Backup & Preparation (15 minutes)

### Step 1: Create a new branch

```bash
cd nsrawat_portfolio
git checkout -b upgrade-nextjs15
git push -u origin upgrade-nextjs15
```

### Step 2: Backup current state

```bash
git tag -a backup-pre-upgrade -m "Backup before Next.js 15 upgrade"
git push origin backup-pre-upgrade
```

---

## 🔧 Phase 2: Update Dependencies (30 minutes)

### Step 1: Update package.json

Replace your dependencies with:

```json
{
  "name": "nsrawat-portfolio",
  "version": "2.0.0",
  "private": true,
  "packageManager": "yarn@1.22.19",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "biome check .",
    "lint:fix": "biome check --write .",
    "format": "biome format --write .",
    "typecheck": "tsc --noEmit",
    "clean": "rm -rf .next .contentlayer",
    "clean:cache": "yarn clean && rm -rf node_modules/.cache",
    "reinstall": "rm -rf node_modules yarn.lock && yarn install",
    "check": "yarn lint && yarn typecheck && yarn build",
    "check:fix": "yarn lint:fix && yarn typecheck",
    "preview": "yarn build && yarn start"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "contentlayer2": "^0.4.6",
    "next-contentlayer2": "^0.4.6",
    "@tailwindcss/typography": "^0.5.10",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "gray-matter": "^4.0.3",
    "remark": "^15.0.1",
    "remark-gfm": "^4.0.0",
    "rehype": "^13.0.1",
    "rehype-slug": "^6.0.0",
    "rehype-autolink-headings": "^7.1.0",
    "rehype-pretty-code": "^0.13.0"
  },
  "devDependencies": {
    "@biomejs/biome": "^1.4.0",
    "typescript": "^5.3.0",
    "@types/node": "^20.10.0",
    "@types/react": "^18.2.45",
    "@types/react-dom": "^18.2.18"
  }
}
```

### Step 2: Install dependencies

```bash
yarn install
```

---

## ⚙️ Phase 3: Configuration Files (45 minutes)

### 1. Create `contentlayer.config.ts`

```typescript
import { defineDocumentType, makeSource } from 'contentlayer2/source-files'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blog/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' } },
    draft: { type: 'boolean' },
    summary: { type: 'string' },
    images: { type: 'list', of: { type: 'string' } },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('blog/', ''),
    },
    url: {
      type: 'string',
      resolve: (doc) => `/blog/${doc._raw.flattenedPath.replace('blog/', '')}`,
    },
  },
}))

export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: 'projects/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' } },
    draft: { type: 'boolean' },
    summary: { type: 'string' },
    images: { type: 'list', of: { type: 'string' } },
    github: { type: 'string' },
    demo: { type: 'string' },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('projects/', ''),
    },
    url: {
      type: 'string',
      resolve: (doc) => `/projects/${doc._raw.flattenedPath.replace('projects/', '')}`,
    },
  },
}))

export const Snippet = defineDocumentType(() => ({
  name: 'Snippet',
  filePathPattern: 'snippets/**/*.mdx',
  contentType: 'mdx',
  fields: {
    heading: { type: 'string', required: true },
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    type: { type: 'string', required: true },
    draft: { type: 'boolean' },
    summary: { type: 'string' },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('snippets/', ''),
    },
  },
}))

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Blog, Project, Snippet],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      [
        rehypePrettyCode,
        {
          theme: 'github-dark-dimmed',
          keepBackground: false,
        },
      ],
    ],
  },
})
```

### 2. Create `biome.json`

```json
{
  "$schema": "https://biomejs.dev/schemas/1.4.0/schema.json",
  "organizeImports": {
    "enabled": true
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  }
}
```

### 3. Update `next.config.mjs`

```javascript
import { withContentlayer } from 'next-contentlayer2'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  eslint: {
    dirs: ['app', 'components', 'layouts', 'scripts'],
  },
  images: {
    domains: ['picsum.photos'],
  },
}

export default withContentlayer(nextConfig)
```

### 4. Update `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"],
      "@/data/*": ["./data/*"],
      "contentlayer/generated": ["./.contentlayer/generated"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts", ".contentlayer/generated"],
  "exclude": ["node_modules"]
}
```

---

## 📝 Phase 4: Content Structure (2-3 hours)

### Create directory structure:

```bash
mkdir -p data/{blog,projects,snippets,authors}
```

### Content will be provided in separate files:
- Blog posts (see file 02)
- Projects (see file 03)  
- Snippets (see file 04)
- App pages (see file 05)

---

## 🧪 Phase 5: Testing (1 hour)

### 1. Start development server

```bash
yarn dev
```

### 2. Run checks

```bash
yarn typecheck
yarn lint
yarn build
```

### 3. Test all pages
- Home page: http://localhost:3000
- Blog: http://localhost:3000/blog
- Projects: http://localhost:3000/projects
- Snippets: http://localhost:3000/snippets
- About: http://localhost:3000/about

---

## 🚀 Phase 6: Deployment (30 minutes)

### 1. Push to GitHub

```bash
git add .
git commit -m "Upgrade to Next.js 15 with Data Science focus"
git push origin upgrade-nextjs15
```

### 2. Vercel will auto-deploy
- Check deployment at: https://vercel.com/dashboard
- Preview URL will be generated automatically

### 3. Merge to main (after testing)

```bash
git checkout main
git merge upgrade-nextjs15
git push origin main
```

---

## 🐛 Troubleshooting

### Issue: Build fails with Contentlayer errors

```bash
yarn clean
rm -rf .contentlayer
yarn dev
```

### Issue: Type errors

```bash
yarn typecheck
```

### Issue: Styling issues

Check Tailwind config and ensure all necessary classes are included.

### Issue: Yarn cache problems

```bash
yarn clean:cache
yarn install
```

---

## ✅ Final Checklist

- [ ] Dependencies updated
- [ ] Configuration files created
- [ ] Content structure in place
- [ ] All pages working locally
- [ ] Build passes
- [ ] Deployed to Vercel
- [ ] Custom footer preserved
- [ ] Dark mode working
- [ ] All links functional
- [ ] Mobile responsive

---

## 📚 Resources

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Contentlayer Docs](https://contentlayer.dev)
- [Biome Documentation](https://biomejs.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

## 💡 Estimated Timeline

- Phase 1 (Backup): 15 minutes
- Phase 2 (Dependencies): 30 minutes  
- Phase 3 (Configuration): 45 minutes
- Phase 4 (Content): 2-3 hours
- Phase 5 (Testing): 1 hour
- Phase 6 (Deployment): 30 minutes

**Total: 5-6 hours**

---

## 🎉 You're Ready!

Follow this guide step by step, and you'll have a modern Next.js 15 portfolio with Data Science content!

For additional help with specific content, refer to files 02-05 in this docs folder.