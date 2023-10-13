import {z} from 'zod';

export const productSchema = z.object({
	name: z.string(),
	key: z.string(),
	price: z.number(),
	_id: z.string(),
});

export type ProductType = z.infer<typeof productSchema>;
