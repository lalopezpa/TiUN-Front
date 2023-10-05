import axios from 'axios';
const axiosInstance = axios.create({
	baseURL: 'http://localhost:3000/',
	withCredentials: true,
});

const API = 'http://localhost:3000/';

export const registerRequest = user => axiosInstance.post(`${API}signup`, user);

export const loginRequest = user => axiosInstance.post(`${API}signin`, user);

export const verifyToken = async (options = {}) => {
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

// Export const verifyTokenRequest = async () => axiosInstance.get(`/auth/verify`);
