import {type CategoryType} from '../types/CRUD/CategoriesSchema';
import {API} from './api';

export async function getCategories(): Promise<CategoryType[]> {
	try {
		const response = await fetch('http://localhost:3000/categories', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		});

		if (!response.ok) {
			throw new Error('Error al obtener categorías');
		}

		const categoriesData = await response.json() as CategoryType[];
		return categoriesData;
	} catch (error) {
		console.error(error);
		throw error;
	}
}
