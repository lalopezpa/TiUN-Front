import {API} from './api';
import Cookies from 'js-cookie';

type ApiResponse = {
	accessToken: string;
};
type RequestData1 = {
	email: string;
};
type RequestData = {
	newpassword: string;
};
export const resetPasswordRequest = async (requestData: RequestData1): Promise<void> => {
	try {
		const response = await fetch('https://backend-6fx2.vercel.app/resetpassword', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestData),
		});

		if (response.ok) {
			const data = await response.json() as ApiResponse;
			Cookies.set('accessToken', data.accessToken);
		} else {
			const errorMessage = await response.text();
			throw new Error(errorMessage);
		}
	} catch (error) {
		console.error('Error en la solicitud:', error);
		throw error;
	}
};

// Función para realizar la petición al servidor
export const sendNewPasswordRequest = async (requestData: RequestData): Promise<void> => {
	const urlActual = window.location.href;
	const partes = urlActual.split('?');
	const parametrosString = partes[1];

	const response = await fetch(`https://backend-6fx2.vercel.app/newpassword?${parametrosString}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(requestData),
	});
};
