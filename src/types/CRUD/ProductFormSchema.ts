import {z} from 'zod';

const productFormData = z.object({
	name: z.string(),
	description: z.string(),
	price: z.number(),
	stock: z.number(),
	discount: z.number(),
	imageUrl: z.unknown(), // You might want to refine this validation
	category: z.string(),
});

export type ProductFormDataType = z.infer<typeof productFormData>;
