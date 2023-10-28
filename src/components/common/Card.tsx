// Card.tsx
import type React from 'react';
import {FavoritesIconN} from '../icons/icons';
import StarRating from './StarRating';
import AddToCartButton from './AddToCartButton';
import {toast, Toaster} from 'sonner';

type CardProps = {
	Foto: string;
	Nombre: string;
	Precio: string;
	Rating: number;
	onAddToCart: () => Promise<void>;
};

const Card: React.FC<CardProps> = ({Foto, Nombre, Precio, Rating, onAddToCart}) => {
	const handleAddToCart = async () => {
		await onAddToCart();

		// Muestra el toast
		toast.success('Añadido al carrito correctamente');
	};

	return (
		<div className='max-w-sm m-4 p-3 z-10 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-verdeClaro dark:border-green-900'>
			<div className='flex items-center justify-between p-2'>
				<AddToCartButton onClick={handleAddToCart} />
				<a className='text-verdeClaro dark:text-grisOscuro' href=''>
					<FavoritesIconN />
				</a>
			</div>
			<div className=''>
				<a href='#' className='flex items-center '>
					<img
						src={Foto}
						className='mx-auto rounded-lg'
						alt=''
						style={{width: '300px', height: '200px'}}
					/>
				</a>
				<p className='m-3 font-normal text-gray-700 dark:text-white'>{Nombre}</p>
				<p className='m-3 font-normal text-gray-700 dark:text-white'>{Precio}</p>
				<div className='m-3 font-normal flex justify-end'>
					<StarRating rating={Rating} />
				</div>
			</div>
			<Toaster />
		</div>
	);
};

export default Card;
