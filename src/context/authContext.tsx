'use client';
import {createContext, useState, useContext, useEffect} from 'react';
import {loginRequest, registerRequest} from '../api/auth';
import {type UserType} from '../types/UserSchema';
import {type AuthProviderProps} from '../types/AuthProviderProps';
import {type AuthContextType} from '../types/AuthContextType';
import type RequestData from '../types/RequestData';
import Cookies from 'js-cookie';

import {type LoginDataType} from '../types/UserLoginSchema';
import {type LoginResponse} from '../types/LoginResponseSchema';
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Este hook es para usar el contexto sin necesidad de importar useContext, hace el uso del contexto por mi
export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth debe estar dentro del proveedor AuthContext');
	}

	return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
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

	const login = async (user: LoginDataType): Promise<LoginResponse | undefined> => {
		try {
			const response = await loginRequest(user);

			return response;
		} catch (error) {
			console.error('Error en el registro', error);
			return undefined;
		}
	};

	const logout = () => {
		Cookies.remove('authToken');
		Cookies.remove('refreshToken');
	};

	return (
		<AuthContext.Provider
			value={{
				login,
				signup,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
