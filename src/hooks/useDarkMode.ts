'use client';
import {useState, useEffect} from 'react';

const useDarkMode = () => {
	// Obtén el valor almacenado en el localStorage
	const storedMode = localStorage.getItem('modoOscuro');
	const [modoOscuro, setModoOscuro] = useState(storedMode ? JSON.parse(storedMode) : false);

	useEffect(() => {
		// Agrega o elimina la clase 'dark' del body según el modo oscuro
		if (modoOscuro) {
			document.body.classList.add('dark');
		} else {
			document.body.classList.remove('dark');
		}
	}, [modoOscuro]);

	const toggleModoOscuro = () => {
		const newModoOscuro = !modoOscuro;
		setModoOscuro(newModoOscuro);

		// Actualiza el valor en el localStorage
		localStorage.setItem('modoOscuro', JSON.stringify(newModoOscuro));
	};

	return {modoOscuro, toggleModoOscuro};
};

export default useDarkMode;
