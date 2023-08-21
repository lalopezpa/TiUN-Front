// Context/AuthContext.tsx
import React, {createContext, useContext, useState, type ReactNode} from 'react';

// Define the shape of the user
type User = {
	id: number;
	email: string;
	// Add more user-related properties if needed
};

// Define the shape of the context
type AuthContextType = {
	user: User | undefined;
	isAuthenticated: boolean;
	login: (email: string, password: string) => void;
	logout: () => void;
	register: (email: string, password: string) => void; // Ensure register is defined
	forgotPassword: (email: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}

	return context;
};

type AuthProviderProps = {
	children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
	const [user, setUser] = useState<User | undefined>(null);

	const login = (email: string, password: string) => {
		// Aquí puedes realizar la lógica de autenticación si es necesario
		// Por ahora, estableceremos el usuario con un objeto de ejemplo
		setUser({
			id: 1,
			email,
		});
	};

	const logout = () => {
		setUser(null);
	};

	const register = (email: string, password: string) => {
		// Aquí puedes implementar la lógica de registro
	};

	const forgotPassword = (email: string) => {
		// Aquí puedes implementar la lógica de recuperar contraseña
	};

	const isAuthenticated = Boolean(user);

	const contextValue: AuthContextType = {
		user,
		isAuthenticated,
		login,
		logout,
		register, // Agregamos la función register aquí
		forgotPassword, // Agregamos la función forgotPassword aquí
	};

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

