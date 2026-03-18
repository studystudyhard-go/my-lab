import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const imageNodeSchema = (image: any) =>
  z.object({
    type: z.literal('image'),
    src: image(),
    alt: z.string().optional(),
    flex: z.number().optional(),
    caption: z.string().optional(),
    note: z.string().optional(),
    tags: z.array(z.string()).default([]),
    banner: z.union([z.boolean(), z.number()]).optional().transform((value) => Boolean(value)),
  });

const groupNodeSchema = (image: any) =>
  z.object({
    type: z.literal('group'),
    flex: z.number().optional(),
    direction: z.enum(['row', 'column']).default('row'),
    children: z.array(imageNodeSchema(image)).min(1),
  });

const articleBlockSchema = (image: any) =>
  z.object({
    title: z.string(),
    body: z.string(),
    image: image(),
    alt: z.string().optional(),
    caption: z.string().optional(),
    align: z.enum(['left', 'right']).default('left'),
    tone: z.enum(['default', 'muted']).default('default'),
  });

const datedEntry = z.object({
  title: z.string(),
  summary: z.string(),
  publishedAt: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
});

const works = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
  schema: ({ image }) =>
    datedEntry.extend({
      coverLayout: z
        .object({
          direction: z.enum(['row', 'column']).default('row'),
          gap: z.number().default(16),
          minHeight: z.number().optional(),
          children: z.array(z.union([imageNodeSchema(image), groupNodeSchema(image)])).min(1),
        })
        .optional(),
      media: z.array(imageNodeSchema(image)).default([]),
    }),
});

const lab = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/lab' }),
  schema: ({ image }) =>
    datedEntry.extend({
      status: z.enum(['ongoing', 'archived']).default('ongoing'),
      cardImage: image().optional(),
      cardImageAlt: z.string().optional(),
      blocks: z.array(articleBlockSchema(image)).default([]),
    }),
});

const books = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/books' }),
  schema: ({ image }) =>
    datedEntry.extend({
      author: z.string(),
      cardImage: image().optional(),
      cardImageAlt: z.string().optional(),
      blocks: z.array(articleBlockSchema(image)).default([]),
    }),
});

export const collections = { works, lab, books };
