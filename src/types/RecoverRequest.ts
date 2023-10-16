import {z} from 'zod';

const recoverPasswordRequestSchema = z.object({
	email: z.string().email(),

});

export type RecoverPasswordRequestData = z.infer<typeof recoverPasswordRequestSchema>;

