import React, {createContext, useContext, useEffect, useState} from 'react';

type DarkModeContextType = {
	modoOscuro: boolean;
	toggleModoOscuro: () => void;
};

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export const useDarkMode = () => {
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

	const contextValue: DarkModeContextType = {
		modoOscuro,
		toggleModoOscuro,
	};

	return <DarkModeContext.Provider value={contextValue}>{children}</DarkModeContext.Provider>;
};
