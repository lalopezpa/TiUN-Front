/* eslint-disable @typescript-eslint/naming-convention */
import {type ProductType} from '../types/CRUD/ProductSchema';
import {type ProductFormDataType} from '../types/CRUD/ProductFormSchema';
import {type CrudMethods} from '../types/CRUD/Crudmethodstype';
import {API} from './api';

export async function getAllProducts(): Promise<ProductType[]> {
	try {
		const requestOptions: RequestInit = {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const response = await fetch('http://localhost:3000/product', requestOptions);
		console.log(response);
		if (!response.ok) {
			throw new Error('Error al obtener productos');
		}

		const productData: ProductType[] = (await response.json()) as ProductType[];
		return productData;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export const CRUD: CrudMethods = {
	async getProducts(): Promise<ProductType[]> {
		try {
			const requestOptions: RequestInit = {
				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
			};

			const response = await fetch('http://localhost:3000/productseller', requestOptions);
			console.log(response);
			if (!response.ok) {
				throw new Error('Error al obtener productos');
			}

			const productData: ProductType[] = (await response.json()) as ProductType[];
			return productData;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	async createProduct(productData: ProductFormDataType): Promise<ProductType> {
		try {
			const requestOptions: RequestInit = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify(productData),
			};
			const response = await fetch('http://localhost:3000/product', requestOptions);

			if (!response.ok) {
				console.error(response);
				throw new Error('Error al crear el producto');
			}

			const productoCreado: ProductType = (await response.json()) as ProductType;
			return productoCreado;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	async updateProduct(productId, productData) {
		try {
			const requestOptions: RequestInit = {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify(productData),
			};
			const response = await fetch(`http://localhost:3000/product/${productId}`, requestOptions);

			if (!response.ok) {
				throw new Error('Error al actualizar el producto');
			}

			const porductoEditado: ProductType = (await response.json()) as ProductType;
			return porductoEditado;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	async deleteProduct(productId) {
		try {
			const requestOptions: RequestInit = {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			};
			const response = await fetch(`http://localhost:3000/product/${productId}`, requestOptions);

			if (!response.ok) {
				console.error(response);
				throw new Error('Error al eliminar el producto');
			}

			const productoEliminado: ProductType = (await response.json()) as ProductType;
			return productoEliminado;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
};
