import {z} from 'zod';
import {userSchema} from './UserSchema';
const signupResponseSchema = z.object({
	success: z.boolean(),
	user: userSchema,
	error: z.string().optional(),
});

export type SignupResponse = z.infer<typeof signupResponseSchema>;
// import {z} from 'zod';
// import {userSchema} from './UserSchema';

// const loginResponseSchema = z.object({
// 	userData: z.union([userSchema, z.undefined()]),
// 	res: z.string().nullable(),
// });

// export type LoginResponse = z.infer<typeof loginResponseSchema>;
