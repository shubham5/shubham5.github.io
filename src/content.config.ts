import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const about = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/about' }),
  schema: z.object({
    title: z.string().default('About'),
  }),
});

const writings = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writings' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

const bookshelf = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/bookshelf' }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    status: z.enum(['reading', 'read', 'want-to-read']),
    rating: z.number().min(1).max(5).optional(),
    cover: z.string().optional(),
    dateFinished: z.coerce.date().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    url: z.string().url().optional(),
    repo: z.string().url().optional(),
    date: z.coerce.date().optional(),
    featured: z.boolean().default(false),
    tech: z.array(z.string()).default([]),
  }),
});

export const collections = { about, writings, bookshelf, projects };
