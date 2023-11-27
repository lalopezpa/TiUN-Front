import {z} from 'zod';
import {productCardSchema} from './productCartSchema';
const cartSchema = z.object({
	_id: z.string(),
	sellerId: z.string(),
	products: z.array(productCardSchema),

});

export type CartType = z.infer<typeof cartSchema>;
export {cartSchema};
