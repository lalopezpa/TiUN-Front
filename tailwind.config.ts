import type {Config} from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				verdeClaro: '#4b9957',
				verdeOscuro: '#152e1b',
				verdeSeccionLogin: '#658854',
				vinotinto: '#A30D24',
				gris: '#8ab288',
				amarillo: '#F3A434',
				grisOscuro: '#063831',
			},
			fontFamily: {
				poppins: ['Poppins', 'sans-serif'],
				urbanist: ['Urbanist', 'sans-serif'],
			},
			borderRadius: {
				lg: '1.5rem',
			},
		},
	},
	plugins: [],
};
export default config;
