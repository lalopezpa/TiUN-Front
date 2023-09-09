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
				verdeClaro: '#85CF62',
				verdeOscuro: '#063500',
				verdeSeccionLogin: '#658854',
				vinotinto: '#A30D24',
				gris: '#58595B',
				amarillo: '#F3A434',
			},
			fontFamily: {
				poppins: ['Poppins', 'sans-serif'],
				urbanist: ['Urbanist', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
export default config;
