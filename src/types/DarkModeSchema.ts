import {z} from 'zod';

export const darkModeSchema = z.object({
	modoOscuro: z.boolean(),
	toggleModoOscuro: z.function(),
});

export type DarkModeValues = z.infer<typeof darkModeSchema>;
