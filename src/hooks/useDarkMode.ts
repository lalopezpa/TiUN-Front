'use client';
import {useState, useEffect} from 'react';

const useDarkMode = () => {
	const isClient = typeof window === 'object'; // Verifica si estás en un entorno de navegador
	const storedMode = isClient ? localStorage.getItem('modoOscuro') : null;
	const [modoOscuro, setModoOscuro] = useState(isClient && storedMode ? JSON.parse(storedMode) : false);

	useEffect(() => {
		if (isClient) {
			if (modoOscuro) {
				document.body.classList.add('dark');
			} else {
				document.body.classList.remove('dark');
			}
		}
	}, [isClient, modoOscuro]);

	const toggleModoOscuro = () => {
		const newModoOscuro = !modoOscuro;
		setModoOscuro(newModoOscuro);

		if (isClient) {
			localStorage.setItem('modoOscuro', JSON.stringify(newModoOscuro));
		}
	};

	return {modoOscuro, toggleModoOscuro};
};

export default useDarkMode;
