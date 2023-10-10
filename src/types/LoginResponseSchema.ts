import {z} from 'zod';
import {userSchema} from './UserSchema';
const loginResponseSchema = z.object({
	success: z.boolean(),
	user: userSchema,
	error: z.string().optional(),
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;
