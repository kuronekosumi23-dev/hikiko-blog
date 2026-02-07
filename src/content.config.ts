import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			// ここ！ image() を z.string() より前に書くのがポイントケロ！👓✨
			heroImage: z.union([image(), z.string()]).optional(),
			category: z.enum(['Diary', 'Sedori', 'Stock', 'Daily']).optional().default('Diary'),
		}),
});

export const collections = { blog };
