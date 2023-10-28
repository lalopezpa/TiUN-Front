// Cart.ts

import {type ProductType} from '../types/CRUD/ProductSchema';
import {API} from './api';

export async function getCartItems(): Promise<ProductType[]> {
	try {
		const requestOptions: RequestInit = {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const response = await fetch('http://localhost:3000/user/cart', requestOptions);
		console.log(response);
		if (!response.ok) {
			throw new Error('Error al obtener los productos del carrito');
		}

		const cartItems: ProductType[] = (await response.json()) as ProductType[];
		return cartItems;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function addToCart(productId: string, quantity: number): Promise<ProductType[]> {
	try {
		const requestOptions: RequestInit = {
			method: 'PUT',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({productId, quantity}),
		};

		const response = await fetch('http://localhost:3000/user/cart/add', requestOptions);

		if (!response.ok) {
			throw new Error('Error al agregar el producto al carrito');
		}

		const updatedCart: ProductType[] = (await response.json()) as ProductType[];
		return updatedCart;
	} catch (error) {
		console.error(error);
		throw error;
	}
}


export async function removeFromCart(productId: string): Promise<ProductType> {
	try {
		const requestOptions: RequestInit = {
			method: 'PUT', // O el método que uses en tu backend
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({productId}),
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

