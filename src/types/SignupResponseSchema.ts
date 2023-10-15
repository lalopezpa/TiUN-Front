import {z} from 'zod';
import {userSchema} from './UserSchema';
const signupResponseSchema = z.object({
	userData: z.union([userSchema, z.undefined()]),
	res: z.string().nullable(),
});

export type SignupResponse = z.infer<typeof signupResponseSchema>;
