import type React from 'react';
import {FavoritesIconN} from '../icons/icons';
import StarRating from './StarRating';
import Link from 'next/link';
import Image from 'next/image';

// TODO: pasar type
type CardProps = {
	Foto: string;
	Nombre: string;
	Precio: string;
	Rating: number;
	id: string;
};



const FavoriteCard: React.FC<CardProps> = ({Foto, Nombre, Precio, Rating, id}) => {
	const opcionesDeFormato = {
		style: 'currency',
		currency: 'COP',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	};

	const formatoMoneda = new Intl.NumberFormat('es-CO', opcionesDeFormato);
	const precioFormateado = formatoMoneda.format(parseFloat(Precio)); // Convierte el string a número y luego lo formatea
	return (
		<div className='max-w-xs m-4 p-3 z-10 bg-verdeClaro  border-green-900 rounded-lg shadow-lg dark:bg-teal-950 dark:border-green-900 '>
			<div className=''>
				<Link href={`/product/${id}`} className='flex items-center '>
					<Image src={Foto} alt='foto product' className='mx-auto rounded-lg' width={300} height={200} style={{width: '300px', height: '200px'}} />
				</Link>
				<p className='m-3 font-poppins font-bold text-white dark:text-white'>
					{Nombre}
				</p>
				<p className='m-3 font-poppins italic text-white dark:text-white overflow-hidden'>
					{precioFormateado}
				</p>
				<div className='m-3 font-normal flex justify-between'>

					<StarRating rating={Rating} />
					<button className='underline font-poppins text-white p-3 rounded-full transition duration-300 transform hover:scale-105 hover:text-red-500'>
                        Eliminar
					</button>



				</div>

			</div>
		</div>
	);
};



export default FavoriteCard;
