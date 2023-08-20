/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
	],
	darkMode: 'media',
	theme: {
		extend: {
			colors: {
				verdeClaro: '#85CF62',
				verdeOscuro: '#063500',
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