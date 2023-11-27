import {type ProductType} from '../types/CRUD/ProductSchema';

export async function getOneProduct(id: string): Promise<ProductType> {
	try {
		const requestOptions: RequestInit = {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const response = await fetch(`http://localhost:3000/product/${id}`, requestOptions);
		if (!response.ok) {
			throw new Error('Error al obtener productos');
		}

		const productData: ProductType = (await response.json()) as ProductType;
		return productData;
	} catch (error) {
		console.error(error);
		throw error;
	}
}
