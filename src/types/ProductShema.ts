import {z} from 'zod';

export const productSchema = z.object({
	name: z.string(),
	imageUrl: z.string(),
	ratings: z.number(),
	key: z.string(),
	price: z.number(),
	_id: z.string(),
});

export type ProductType = z.infer<typeof productSchema>;
