// FavoriteProduct.ts
import {type ProductType} from '../types/CRUD/ProductSchema';
import {API} from './api';
import {getOneProduct} from '../api/productCard';

export async function addToFavorites(products: string[]): Promise<ProductType[]> {
	try {
		const requestOptions: RequestInit = {
			method: 'PUT',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({products}),
		};
		console.log(requestOptions);
		const response = await fetch('http://localhost:3000/user/favprod/add', requestOptions);
		console.log('Después de la solicitud');

		if (!response.ok) {
			throw new Error(`Error al agregar el producto a favoritos. Código de estado: ${response.status}`);
		}

		const updatedFavorites: ProductType[] = await response.json() as ProductType[];

		return updatedFavorites;
	} catch (error) {
		console.error('Error al agregar el producto a favoritos:', error);
		throw error;
	}
}


export async function removeFavorites(products: string[]): Promise<ProductType> {
	try {
		const requestOptions: RequestInit = {
			method: 'PUT', // O el método que uses en tu backend
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({products}),
		};

		const response = await fetch('http://localhost:3000/user/favprod/remove', requestOptions);
		console.log(response);
		if (!response.ok) {
			throw new Error('Error al eliminar el producto de favoritos');
		}

		const removedFavoriteItem: ProductType = (await response.json()) as ProductType;
		return removedFavoriteItem;
	} catch (error) {
		console.error(error);
		throw error;
	}
}



