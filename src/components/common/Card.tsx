import React from 'react';
import {FavoritesIconN} from '../icons/icons';

type CardProps = {
	Descripcion: string;
	Precio: string;
};

const Card: React.FC<CardProps> = ({Descripcion, Precio}) => (
	<div className='max-w-sm m-4 p-3 z-10 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700'>
		<div className='flex items-center justify-between p-2'>
			<a
				className='items-center px-3 py-2 text-sm font-medium text-center text-white bg-verdeClaro rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' href=''
			>
				Añadir al carrito
			</a>
			<a className='text-verdeOscuro' href=''>
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
			<p className='m-3 font-normal text-gray-700 dark:text-gray-400'>
				{Descripcion}
			</p>
			<p className='m-3 font-normal text-gray-700 dark:text-gray-400'>
				{Precio}
			</p>
		</div>
	</div>
);

export default Card;
