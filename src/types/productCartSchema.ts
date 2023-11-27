import {z} from 'zod';
const productCardSchema = z.object({
	_id: z.string(),
	productId: z.string(),
	productImageUrl: z.string(),
	productName: z.string(),
	quantity: z.number(),
	subtotal: z.number(),
});

export type ProductCardType = z.infer<typeof productCardSchema>;
export {productCardSchema};
