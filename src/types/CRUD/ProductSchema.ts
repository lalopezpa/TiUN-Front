import {z} from 'zod';

const productSchema = z.object({
	_id: z.string(),
	name: z.string(),
	description: z.string(),
	price: z.number(),
	stock: z.number(),
	discount: z.number(),
	imageUrl: z.string(),
	categories: z.array(z.string()),
	createdAt: z.string(),
	updatedAt: z.string(),
	sellerId: z.string(),
	solds: z.number(),
	ratings: z.number(),
});

export type ProductType = z.infer<typeof productSchema>;
export {productSchema};
