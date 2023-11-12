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
	id: string;
};

const Card: React.FC<CardProps> = ({Foto, Nombre, Precio, id}) => (
	<div className='max-w-sm m-4 p-3 z-10 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-verdeClaro dark:border-green-900 '>
		<div className='flex items-center justify-between p-2'>
			<Link
				className='items-center px-3 py-2 text-sm font-medium text-center text-white bg-verdeClaro rounded-lg focus:ring-4 focus:outline-none dark:bg-verdeOscuro dark:hover:bg-verdeOscuro ' href='/'
			>
				Añadir al carrito
			</Link>
			<a className='text-verdeClaro dark:text-grisOscuro' href=''>
				<FavoritesIconN />
			</a>
		</div>
		<div className=''>
			<Link href={`/product/${id}`} className='flex items-center '>
				<Image src={Foto} width={300} height={300} alt='foto product'className='mx-auto rounded-lg' style={{width: '300px', height: '200px'}}/>
			</Link>
			<p className='m-3 font-normal text-gray-700 dark:text-white'>
				{Nombre}
			</p>
			<p className='m-3 font-normal text-gray-700 dark:text-white'>
				{Precio}
			</p>
			<div className='m-3 font-normal flex justify-end'>
			</div>
		</div>
	</div>
);

export default Card;
