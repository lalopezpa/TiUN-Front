import {z} from 'zod';

const categorySchema = z.object({
	_id: z.string(),
	name: z.string(),
	description: z.string(),
	__v: z.number(),
});

export type CategoryType = z.infer<typeof categorySchema>;

