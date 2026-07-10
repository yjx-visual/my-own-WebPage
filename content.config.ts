import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.date(),
        tags: z.array(z.string()).default([]),
        image: z.string().optional(),
        featured: z.boolean().default(false),
        draft: z.boolean().default(false)
      })
    }),
    projects: defineCollection({
      type: 'page',
      source: 'projects/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.date(),
        tags: z.array(z.string()).default([]),
        image: z.string().optional(),
        featured: z.boolean().default(false),
        status: z.enum(['completed', 'active', 'archived', 'planned']).default('completed'),
        url: z.string().optional(),
        repo: z.string().optional(),
        techStack: z.array(z.string()).optional()
      })
    }),
    knowledge: defineCollection({
      type: 'page',
      source: 'knowledge/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        date: z.date(),
        category: z.string(),
        tags: z.array(z.string()).default([]),
        difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
        order: z.number().default(0)
      })
    })
  }
})
