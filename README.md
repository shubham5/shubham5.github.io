# shubham-personal-website

Personal site at [notaquizzer.in](https://notaquizzer.in). Built with [Astro](https://astro.build).

## How it works

Each section is a folder of markdown files under `src/content/`. To add or remove content, just add or remove a file — no code changes needed.

```
src/content/
├── about/index.md          # the About page
├── writings/*.md           # blog posts
├── bookshelf/*.md          # books, one per file
└── projects/*.md           # projects, one per file
```

Each collection has a schema (frontmatter validation) defined in `src/content/config.ts`.

### Adding a writing

Create `src/content/writings/my-post.md`:

```markdown
---
title: My post title
date: 2026-05-08
description: Optional one-liner.
draft: false
tags: [optional]
---

Body markdown here.
```

### Adding a book

Create `src/content/bookshelf/some-book.md`:

```markdown
---
title: Book title
author: Author name
status: read          # reading | read | want-to-read
rating: 4             # 1-5, optional
cover: /images/books/cover.jpg   # optional
dateFinished: 2025-12-01         # optional
---

Your review (markdown).
```

Cover images go in `public/images/books/`.

### Adding a project

Create `src/content/projects/some-project.md`:

```markdown
---
title: Project title
description: One-line description.
url: https://example.com         # optional
repo: https://github.com/...     # optional
date: 2025-06-01                 # optional
featured: true                   # optional, pins to top
tech: [Astro, TypeScript]        # optional
---

Long-form description (markdown).
```

## Local development

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # production build → ./dist
npm run preview      # preview the production build
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and deploys to GitHub Pages. The `public/CNAME` file (containing `notaquizzer.in`) is copied verbatim into the build output to preserve the custom domain.

First-time setup in the repo:

1. Settings → Pages → Source: **GitHub Actions**.
2. Settings → Pages → Custom domain: `notaquizzer.in` (auto-detected from CNAME).
