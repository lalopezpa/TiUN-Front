'use client';
import {createContext, useState, useContext} from 'react';
import {loginRequest, registerRequest} from '../api/auth';

export const AuthContext = createContext(null);
// Este hook es para usar el contexto sin necesidad de importar useContext, hace el uso del contexto por mi
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth debe estar dentro del proveedor AuthContext');
	}

	return context;
};

export const AuthProvider = ({children}) => {
	const [user, setUser] = useState(null);

	const login = async (user: any) => {
		try {
			const res = await loginRequest(user);
			console.log(res);
			setUser(res.user);
		} catch (error) {
			console.error('Error en el registro', error);
		}
	};

	const signup = async (user: any) => {
		try {
			const res = await registerRequest(user);
			console.log(res);
			setUser(res.user);
		} catch (error) {
			console.error('Error en el registro', error);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				login,
				signup,
				user,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
