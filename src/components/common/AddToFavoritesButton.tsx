// AddToFavoritesButton.tsx
import type React from 'react';
import {addToFavorites} from '../../api/FavoriteProduct';
import {type ProductType} from '../../types/CRUD/ProductSchema';
import {toast, Toaster} from 'sonner';

type AddToFavoritesButtonProps = {
	products: string;
};

const AddToFavoritesButton: React.FC<AddToFavoritesButtonProps> = ({products}) => {
	const handleClick = async () => {
		console.log('productId:', products);
		try {
			const updatedFavorites: ProductType[] = await addToFavorites([products]);
			console.log('Producto agregado a favoritos:', updatedFavorites);
			toast.success('Añadido al carrito correctamente');
		} catch (error) {
			console.error('Error al agregar el producto al carrito', error);
			toast.error('Debes iniciar sesión para añadir productos al carrito');
		}
	};

	return (
		<button
			className='items-center px-3 py-2 text-sm font-medium text-center text-white bg-verdeClaro rounded-lg focus:ring-4 focus:outline-none dark:bg-verdeOscuro dark:hover:bg-verdeOscuro'
			onClick={handleClick}
		>
      Añadir a favoritos
		</button>

	);
};

export default AddToFavoritesButton;
