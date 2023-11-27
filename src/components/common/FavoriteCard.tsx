import type React from 'react';
import Link from 'next/link';
import {removeFavorites} from '../../api/FavoriteProduct';

type CardProps = {
	Foto: string;
	Nombre: string;
	Precio: number;
	id: string;
	onRemove: (productId: string) => void;
};

const FavoriteCard: React.FC<CardProps> = ({Foto, Nombre, Precio, id, onRemove}) => {
	const opcionesDeFormato = {
		style: 'currency',
		currency: 'COP',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	};


	const formatoMoneda = new Intl.NumberFormat('es-CO', opcionesDeFormato);
	const precioFormateado = formatoMoneda.format(parseFloat(Precio.toString()));
	const handleRemoveFromFavorites = async () => {
		try {
			// Llama a la función proporcionada desde las props para eliminar el producto
			onRemove(id);
		} catch (error) {
			console.error('Error removing product from favorites:', error);
		}
	};

	return (
		<>
			<div className='my-2 mx-2 p-4 bg-green-100 rounded-lg shadow-lg dark:bg-teal-950'>
				<Link href={`/product/${id}`}>
					<div className='flex items-center justify-center mb-3'>
						<img src={Foto} alt={Nombre} className='w-60 h-40 object-cover flex-shrink-0 rounded-lg' />
					</div>
				</Link>
				<p className='text-xl font-bold text-grisOscuro dark:text-white'>
					{Nombre}
				</p>
				<p className='italic text-green-900 dark:text-white overflow-hidden'>
					{precioFormateado}
				</p>
				<div className='flex justify-center items-center h-12'>
					<button
						onClick={handleRemoveFromFavorites}
						className='px-5 py-2 text-white bg-red-500 rounded-lg transition duration-300 transform hover:scale-105 hover:bg-red-700'
					>
            Eliminar
					</button>
				</div>
			</div>
		</>
	);
};

export default FavoriteCard;
