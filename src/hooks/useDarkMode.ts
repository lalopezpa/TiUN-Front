import {useState, useEffect} from 'react';
import {darkModeSchema} from '../types/DarkModeSchema';
import {type DarkModeState} from '../types/DarkModeState';

const useDarkMode = (): DarkModeState => {
	const isClient = typeof window === 'object';
	const storedMode = isClient ? localStorage.getItem('modoOscuro') : null;
	const [modoOscuro, setModoOscuro] = useState<boolean>(isClient && storedMode ? JSON.parse(storedMode) : false);

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

	// Validar los valores con Zod antes de devolverlos
	darkModeSchema.parse({
		modoOscuro,
		toggleModoOscuro,
	});

	return {modoOscuro, toggleModoOscuro};
};

export default useDarkMode;
