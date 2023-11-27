import {z} from 'zod';

const productSchemaOrder = z.object({
	productId: z.string(),
	productImageUrl: z.string(),
	productName: z.string(),
	_id: z.number(),
	quantity: z.number(),
	subtotal: z.number(),
});

export type ProductTypeOrder = z.infer<typeof productSchemaOrder>;
export {productSchemaOrder};
