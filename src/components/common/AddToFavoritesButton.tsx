// AddToFavoritesButton.tsx
import type React from 'react';
import {addToFavorites} from '../../api/FavoriteProduct';
import {type ProductType} from '../../types/CRUD/ProductSchema';
import {toast, Toaster} from 'sonner';
import {FavoritesIconN} from '../icons/icons';
type AddToFavoritesButtonProps = {
	products: string;
};

const AddToFavoritesButton: React.FC<AddToFavoritesButtonProps> = ({products}) => {
	const handleClick = async () => {
		try {
			const updatedFavorites: ProductType[] = await addToFavorites([products]);
			toast.success('Añadido a favoritos correctamente');
		} catch (error) {
			console.error('Error al agregar el producto a favoritos', error);
			toast.error('Debes iniciar sesión para añadir productos al carrito');
		}
	};

	return (
		<button
			className='items-center px-3 py-2 mb-2 text-sm font-medium text-center text-verdeOscuro dark:text-white rounded-lg focus:ring-4 focus:outline-none'
			onClick={handleClick}
		>
			<FavoritesIconN />
		</button>

	);
};

export default AddToFavoritesButton;
