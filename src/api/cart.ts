// Cart.ts
import {type ProductType} from '../types/CRUD/ProductSchema';
import {API} from './api';

export async function addToCart(product: string, quantity: number): Promise<ProductType[]> {
	try {
		console.log('Antes de la solicitud');
		const requestOptions: RequestInit = {
			method: 'PUT',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({product, quantity}),
		};
		console.log(requestOptions);
		const response = await fetch('http://localhost:3000/user/cart/add', requestOptions);
		console.log('Después de la solicitud');

		if (!response.ok) {
			throw new Error(`Error al agregar el producto al carrito. Código de estado: ${response.status}`);
		}

		const updatedCart: ProductType[] = await response.json() as ProductType[];

		return updatedCart;
	} catch (error) {
		console.error('Error al agregar el producto al carrito:', error);
		throw error;
	}
}



export async function removeFromCart(product: string): Promise<ProductType> {
	try {
		const requestOptions: RequestInit = {
			method: 'PUT', // O el método que uses en tu backend
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({product}),
		};

		const response = await fetch('http://localhost:3000/user/cart/remove', requestOptions);
		console.log(response);
		if (!response.ok) {
			throw new Error('Error al eliminar el producto del carrito');
		}

		const removedCartItem: ProductType = (await response.json()) as ProductType;
		return removedCartItem;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

