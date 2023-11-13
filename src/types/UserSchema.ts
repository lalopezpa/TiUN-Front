import {z} from 'zod';

export const userSchema = z.object({
	cart: z.array(z.object({})),
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
