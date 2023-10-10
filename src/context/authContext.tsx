'use client';
import {createContext, useState, useContext, useEffect} from 'react';
import {loginRequest, registerRequest} from '../api/auth';
import {type UserType} from '../types/UserSchema';
import {type AuthProviderProps} from '../types/AuthProviderProps';
import {type AuthContextType} from '../types/AuthContextType';
import type RequestData from '../types/RequestData';
import Cookies from 'js-cookie';

export const AuthContext = createContext(null);

// Este hook es para usar el contexto sin necesidad de importar useContext, hace el uso del contexto por mi
export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth debe estar dentro del proveedor AuthContext');
	}

	return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
	const [user, setUser] = useState<UserType | undefined>(undefined);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);

	const signup = async (user: UserType) => {
		try {
			const res = await registerRequest(user);
			const userData: UserType = (res.data as {user: UserType}).user; // Gracias Gpt :)

			return {success: true, user: userData, error: undefined};
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.response.data);

				const errorcito = error.response?.data;
				return {success: false, user: undefined, error: errorcito};
			}
		}
	};

	const login = async (user: RequestData) => {
		try {
			const res = await loginRequest(user);
			const userData: UserType = (res.data as {user: UserType}).user;
			// Console.log(res);
			// console.log('userData');
			// console.log(userData);
			setUser(userData);
			setIsAuthenticated(true);
			return {success: true, user: userData, error: undefined};
		} catch (error) {
			console.error('Error en el registro', error);
			const errorcito = error.response.data;
			console.log(errorcito);
			return {success: false, user: undefined, error: errorcito};
		}
	};

	const logout = () => {
		Cookies.remove('authToken');
		Cookies.remove('refreshToken');
		setUser(undefined);
		setIsAuthenticated(false);
	};

	// UseEffect(() => {
	// 	const checkLogin = async () => {
	// 		const cookies = Cookies.get();
	// 		console.log('cookies');
	// 		console.log(cookies.authToken);
	// 		if (!cookies.authToken) {
	// 			setIsAuthenticated(false);
	// 			setLoading(false);
	// 			return;
	// 		}

	// 		try {
	// 			const res = await verifyTokenRequest(cookies.token);
	// 			console.log(res);
	// 			if (!res.data) {
	// 				setIsAuthenticated(false);
	// 				return;
	// 			}

	// 			setIsAuthenticated(true);
	// 			setUser(res.data);
	// 			setLoading(false);
	// 		} catch (error) {
	// 			setIsAuthenticated(false);
	// 			setLoading(false);
	// 		}
	// 	};

	// 	checkLogin();
	// }, []);
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
