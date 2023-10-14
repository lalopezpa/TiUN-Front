import axios from 'axios';
const axiosInstance = axios.create({
	baseURL: 'http://localhost:3000/',
	withCredentials: true,
});

const API = 'http://localhost:3000/';

export const registerRequest = user => axiosInstance.post(`${API}signup`, user);

export const loginRequest = user => axiosInstance.post(`${API}signin`, user);

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

export const CRUD = {
	async getProducts() {
		try {
			const response = await fetch(`${API}product`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			});

			if (!response.ok) {
				throw new Error('Error al obtener productos');
			}

			return response.json();
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	async createProduct(productData) {
		try {
			const response = await fetch(`${API}product`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify(productData),
			});

			if (!response.ok) {
				console.log(response);
				throw new Error('Error al crear el producto');
			}

			return response.json();
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	async updateProduct(productId, productData) {
		try {
			const response = await fetch(`${API}product/${productId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify(productData),
			});

			if (!response.ok) {
				throw new Error('Error al actualizar el producto');
			}

			return response.json();
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	async deleteProduct(productId) {
		try {
			const response = await fetch(`${API}product/${productId}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			});

			if (!response.ok) {
				console.log(response);
				throw new Error('Error al eliminar el producto');
			}

			return response.json();
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
};
