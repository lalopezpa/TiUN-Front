import {useState, useEffect} from 'react';

const useDarkMode = () => {
	const [modoOscuro, setModoOscuro] = useState(false);

	useEffect(() => {
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		setModoOscuro(prefersDark);
	}, []);

	useEffect(() => {
		if (modoOscuro) {
			document.body.classList.add('dark');
		} else {
			document.body.classList.remove('dark');
		}
	}, [modoOscuro]);

	const toggleModoOscuro = () => {
		setModoOscuro(!modoOscuro);
	};

	return {modoOscuro, toggleModoOscuro};
};

export default useDarkMode;
