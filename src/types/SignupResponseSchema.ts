import {z} from 'zod';
import {userSchema} from './UserSchema';
const signupResponseSchema = z.object({
	success: z.boolean(),
	user: userSchema,
	error: z.string().optional(),
});

export type SignupResponse = z.infer<typeof signupResponseSchema>;
