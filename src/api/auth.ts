
// Import axios from 'axios';
import {API} from './api';
import {type UserType} from '../types/UserSchema';
import {type UserRegisterData} from '../types/UserRegisterSchema';
import {type LoginDataType} from '../types/UserLoginSchema';
import {type LoginResponse} from '../types/LoginResponseSchema';
import {type SignupResponse} from '../types/SignupResponseSchema';
export const registerRequest = async (user: UserRegisterData): Promise<SignupResponse | undefined> => {
	try {
		const response = await fetch('https://backend-6fx2.vercel.app/signup', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});
		console.log(response);
		if (response.status === 200) {
			// Si la respuesta es 200 (éxito), procesa los datos y devuelve un objeto con userData
			const data = await response.json() as UserType;
			console.log('data desde auth', data);
			return {userData: data, res: null};
		}

		// Si la respuesta no es 200, asume que hay un mensaje de error en el cuerpo de la respuesta
		const errorMessage = await response.text();
		return {userData: undefined, res: errorMessage};
	} catch (error: any) {
		// Manejar otros tipos de errores, como problemas de red
		console.error('Error en la solicitud:', error);
		return undefined;
	}
};

export const loginRequest = async (user: LoginDataType): Promise<LoginResponse | undefined> => {
	try {
		const response = await fetch('https://backend-6fx2.vercel.app/signin', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});

		if (response.status === 200) {
			// Si la respuesta es 200 (éxito), procesa los datos y devuelve un objeto con userData
			const data = await response.json() as UserType;

			return {userData: data, res: null};
		}

		// Si la respuesta no es 200, asume que hay un mensaje de error en el cuerpo de la respuesta
		const errorMessage = await response.text();
		return {userData: undefined, res: errorMessage};
	} catch (error: any) {
		// Manejar otros tipos de errores, como problemas de red
		console.error('Error en la solicitud:', error);
		return undefined;
	}
};

export const getUser = async (options = {}): Promise<UserType | undefined> => {
	try {
		const response = await fetch('https://backend-6fx2.vercel.app/profile', {
			method: 'GET',
			credentials: 'include',
			...options,
		});

		if (response.ok) {
			const data = await response.json() as UserType;
			return data;
		}

		console.error('Error de respuesta:', response.status, response.statusText);
		throw new Error('Error en la solicitud.');
	} catch (error: any) {
		console.error('Error en la solicitud:', error.message);
		return undefined; // Devolver undefined en caso de error
	}
};
