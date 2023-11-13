import type React from 'react';
import Link from 'next/link';
import {removeFavorites} from '../../api/FavoriteProduct'; // Asegúrate de importar tu función removeFromFavorites desde el archivo correcto

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
			<div className='my-4 p-3 bg-green-100 border border-green-900 rounded-lg shadow-lg dark:bg-teal-950 dark:border-green-900'>
				<Link href={`/product/${id}`}>
					<div className='flex items-center justify-center mb-3'>
						<img src={Foto} alt={Nombre} className='w-20 h-20 object-cover flex-shrink-0 rounded-full' />
					</div>
				</Link>
				<p className='mb-3 text-xl font-bold text-green-900 dark:text-white'>
					{Nombre}
				</p>
				<p className='mb-3 italic text-green-900 dark:text-white overflow-hidden'>
					{precioFormateado}
				</p>
				<div className='flex justify-between items-center h-12'>
					<button
						onClick={handleRemoveFromFavorites}
						className='px-4 py-2 text-white bg-red-500 rounded-full transition duration-300 transform hover:scale-105 hover:bg-red-700'
					>
            Eliminar
					</button>
				</div>
			</div>
		</>
	);
};

export default FavoriteCard;
