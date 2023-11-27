import {z} from 'zod';
import {productSchema} from './CRUD/ProductSchema';
import {cartSchema} from './CartSchema';
export const userSchema = z.object({
	cart: z.array(cartSchema),
	accessTokenMp: z.string() || z.null(),
	email: z.string(),
	emailVerified: z.boolean(),
	favoriteProducts: z.array(z.string()),
	// eslint-disable-next-line @typescript-eslint/naming-convention
	id_cedula: z.string(),
	isAdmin: z.boolean(),
	lastname: z.string(),
	name: z.string(),
	orders: z.array(z.object({})),
	password: z.string(),
	phoneNumber: z.string(),
	termsandconditions: z.boolean(),
	__v: z.number(),
	_id: z.string(),
	imageUrl: z.string(),
});
export type UserType = z.infer<typeof userSchema>;
