'use client';
import {createContext, useState, useContext, useEffect} from 'react';
import {loginRequest, registerRequest} from '../api/auth';
import Cookies from 'js-cookie';

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
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);

	const signup = async user => {
		try {
			const res = await registerRequest(user);
			const userData = res.data.user;
			// console.log(res);

			return {success: true, user: userData};
		} catch (error) {
			// console.log(error.response.data);
			const errorcito = error.response.data;
			return {success: false, error: errorcito};
		}
	};

	const login = async (user: any) => {
		try {
			const res = await loginRequest(user);
			const userData = res.data.user;
			console.log(res);
			setUser(userData);
			setIsAuthenticated(true);
			return {success: true, user: userData};
		} catch (error) {
			console.error('Error en el registro', error);
			const errorcito = error.response.data;
			console.log(errorcito)
			return {success: false, error: errorcito};
		}
	};

	const logout = () => {
		Cookies.remove('accesToken');
		setUser(null);
		setIsAuthenticated(false);
	};

	useEffect(() => {
		const checkLogin = async () => {
			const cookies = Cookies.get();
			if (!cookies.token) {
				setIsAuthenticated(false);
				setLoading(false);
				return;
			}

			try {
				const res = await verifyTokenRequest(cookies.token);
				console.log(res);
				if (!res.data) {
					setIsAuthenticated(false);
					return;
				}

				setIsAuthenticated(true);
				setUser(res.data);
				setLoading(false);
			} catch (error) {
				setIsAuthenticated(false);
				setLoading(false);
			}
		};

		checkLogin();
	}, []);
	return (
		<AuthContext.Provider
			value={{
				login,
				signup,
				logout,
				user,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
