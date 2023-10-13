import type React from 'react';
import {createContext, useContext, useEffect, useState} from 'react';
import {darkModeSchema} from '../types/DarkModeSchema';
import {type DarkModeValues} from '../types/DarkModeSchema';
import {type DarkModeState} from '../types/DarkModeState';

const DarkModeContext = createContext<DarkModeValues | undefined>(undefined);

export const useDarkMode = (): DarkModeState => {
	const context = useContext(DarkModeContext);
	if (!context) {
		throw new Error('useDarkMode must be used within a DarkModeProvider');
	}

	return context;
};

type DarkModeProviderProps = {
	children: React.ReactNode;
};

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({children}) => {
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

	// Validar los valores con Zod antes de asignarlos al contexto
	const contextValue = darkModeSchema.parse({
		modoOscuro,
		toggleModoOscuro,
	});

	return <DarkModeContext.Provider value={contextValue}>{children}</DarkModeContext.Provider>;
};
