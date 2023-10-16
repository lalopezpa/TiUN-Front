import type React from 'react';
import {FavoritesIconN} from '../icons/icons';
import StarRating from './StarRating';

type CardProps = {
	Nombre: string;
	Precio: string;
	Rating: number;
};

const Card: React.FC<CardProps> = ({Nombre, Precio, Rating}) => (
	<div className='max-w-sm m-4 p-3 z-10 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-verdeClaro dark:border-green-900 '>
		<div className='flex items-center justify-between p-2'>
			<a
				className='items-center px-3 py-2 text-sm font-medium text-center text-white bg-verdeClaro rounded-lg focus:ring-4 focus:outline-none dark:bg-verdeOscuro dark:hover:bg-verdeOscuro ' href=''
			>
				Añadir al carrito
			</a>
			<a className='text-verdeClaro dark:text-grisOscuro' href=''>
				<FavoritesIconN />
			</a>
		</div>
		<div className=''>
			<a href='#' className='flex items-center '>
				<img
					src='https://via.placeholder.com/290x150'
					className='mx-auto rounded-lg'
					alt=''
				/>
			</a>
			<p className='m-3 font-normal text-gray-700 dark:text-white'>
				{Nombre}
			</p>
			<p className='m-3 font-normal text-gray-700 dark:text-white'>
				{Precio}
			</p>
			<div className='m-3 font-normal flex justify-end'>
				<StarRating rating={Rating} />
			</div>
		</div>
	</div>
);

export default Card;
