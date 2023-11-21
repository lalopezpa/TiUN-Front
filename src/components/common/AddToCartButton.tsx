// AddToCartButton.tsx
import type React from 'react';
import {addToCart} from '../../api/cart';
import {type ProductType} from '../../types/CRUD/ProductSchema';
import {toast, Toaster} from 'sonner';

type AddToCartButtonProps = {
	product: string;
	quantity: number;
};

const AddToCartButton: React.FC<AddToCartButtonProps> = ({product, quantity}) => {
	const handleClick = async () => {
		console.log('quantity:', quantity);
		console.log('productId:', product);
		try {
			const updatedCart: ProductType[] = await addToCart(product, quantity);
			console.log('Producto agregado al carrito:', updatedCart);
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
      Añadir al carrito
		</button>
	);
};

export default AddToCartButton;
