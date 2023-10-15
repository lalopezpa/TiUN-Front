import {z} from 'zod';

const userRegisterSchema = z.object({
	aceptaTerminos: z.boolean(),
	confirmarcontraseña: z.string(),
	email: z.string().email(),
	// eslint-disable-next-line @typescript-eslint/naming-convention
	id_cedula: z.string(),
	lastname: z.string(),
	password: z.string(),
	phoneNumber: z.string(),
	username: z.string(),
	imageUrl: z.string().optional(),
});

export type UserRegisterData = z.infer<typeof userRegisterSchema>;
