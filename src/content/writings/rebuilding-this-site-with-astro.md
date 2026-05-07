---
title: Rebuilding this site with Astro
date: 2026-05-08
description: Why I tossed the old Jekyll site and what the new markdown-driven setup looks like.
tags: [meta, astro]
---

The old version of this site was a Jekyll fork I'd set up years ago and barely touched. Two demo posts that were never mine, a theme I never customised, and a workflow (`bundle exec`, Ruby gems, Jekyll plugins) that I'd forgotten how to operate. Every time I thought about writing something I had to remember how to start the dev server first, and that was usually enough to put me off.

So I rebuilt it.

## What I wanted

One requirement: **adding or removing content should be adding or removing a file**. No CMS, no database, no admin panel. Just a folder per section and markdown files inside it. If I want to add a book to the bookshelf, I drop a file in `src/content/bookshelf/` with a few frontmatter fields. Done.

The five sections — Home, About, Writings, Bookshelf, Projects — each map to a content folder. The home page pulls the latest few items from each.

## The stack

[Astro](https://astro.build), with content collections. Astro generates a static site, ships almost no JavaScript by default, and its content collection API gives me typed frontmatter (so a typo in `status: redaing` fails the build instead of silently rendering wrong). No CSS framework — just a `global.css` file with a system font stack and a couple of CSS variables for light/dark.

Hosted on GitHub Pages via Actions. Push to `main`, the workflow builds and deploys. The custom domain (`notaquizzer.in`) is preserved with a `CNAME` file in `public/`.

## How it actually went

I built it pair-programming with Claude Code. Two interesting hiccups:

1. **`npm audit` flagged Astro 4 vulnerabilities** on first install. Most were SSR/dev-server related and didn't apply to a static GitHub Pages deploy, but I bumped to Astro 6 anyway. That broke the legacy content collection API — `entry.slug` became `entry.id`, `entry.render()` became `render(entry)`, and `src/content/config.ts` had to move to `src/content.config.ts` with explicit `glob` loaders. Mechanical migration, but worth knowing if you're upgrading.
2. **First CI deploy failed** because the workflow pinned Node 20 and Astro 6 needs ≥22.12. One-line fix in `.github/workflows/deploy.yml`.

The push itself snagged on a missing `workflow` OAuth scope — `gh auth refresh -h github.com -s workflow` fixed it.

## Adding content from now on

```bash
echo "..." > src/content/writings/some-post.md
git add . && git commit -m "Add post" && git push
```

That's the whole loop. The CI deploys in under a minute. If I get lazy and don't write, that's on me, not the tooling.
