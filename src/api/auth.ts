/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios';
import {API} from './api';
const axiosInstance = axios.create({
	baseURL: 'http://localhost:3000/',
	withCredentials: true,
});

export const registerRequest = async user => axiosInstance.post(`${API}signup`, user);

export const loginRequest = async user => axiosInstance.post(`${API}signin`, user);

export const getUser = async (options = {}) => {
	try {
		const response = await fetch(`${API}profile`, {
			method: 'GET',
			credentials: 'include', // Esto establece las cookies de sesión por defecto
			...options, // Combina las opciones pasadas con las opciones predeterminadas
		});

		if (response.ok) {
			const data = await response.json();
			// Manejar la respuesta exitosa aquí, si es necesario
			return data;
		}

		// Manejar el error aquí
		console.error('Error de respuesta:', response.status, response.statusText);
		throw new Error('Error en la solicitud.');
	} catch (error) {
		// Manejar otros tipos de errores, como problemas de red
		console.error('Error en la solicitud:', error.message);
		throw error; // Puedes re-lanzar el error si es necesario
	}
};
