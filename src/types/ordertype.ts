import {z} from 'zod';
import {productSchemaOrder} from './ProductSchemaOrder';
// Define un tipo para una orden
const orderSchema = z.object({
	_id: z.string(),
	status: z.string(),
	date: z.string(), // O utiliza z.date() si la fecha es un objeto Date
	products: z.array(productSchemaOrder),
});

export type OrderType = z.infer<typeof orderSchema>;
