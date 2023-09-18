/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
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
