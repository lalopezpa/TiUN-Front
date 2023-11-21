import type React from 'react';
import {FavoritesIconN} from '../icons/icons';
import StarRating from './StarRating';
import Link from 'next/link';
import Image from 'next/image';
import AddToFavoritesButton from '../common/AddToFavoritesButton';
import AddToCartButton from './AddToCartButton';
// TODO: pasar type
type CardProps = {
	Foto: string;
	Nombre: string;
	Precio: string;
	id: string;
};



const Card: React.FC<CardProps> = ({Foto, Nombre, Precio, id}) => (
	<div className='max-w-sm m-4 px-4 py-3 z-10 bg-green-100  border border-gray-200 rounded-lg shadow-lg dark:bg-verdeClaro dark:border-green-900 '>
		<div className='flex items-center justify-between p-1'>
			<Link
				className='items-center px-3 py-2 mb-2 text-sm font-medium text-center text-white bg-verdeClaro rounded-lg focus:ring-4 focus:outline-none dark:bg-verdeOscuro dark:hover:bg-verdeOscuro ' href='/'
			>
				Añadir al carrito
			</Link>
			<a>
				<AddToFavoritesButton products={id} />
			</a>
		</div>
		<div className=''>
			<Link href={`/product/${id}`} className='flex items-center '>
				<Image src={Foto} alt='foto product'className='mx-auto rounded-lg ' width={300} height={200} style={{width: '300px', height: '200px'}}/>
			</Link>
			<p className='m-2  font-bold text-gray-700 dark:text-white'>
				{Nombre}
			</p>
			<p className='mx-2 font-normal text-gray-700 dark:text-white'>
				{Precio}
			</p>
		</div>
	</div>
);

export default Card;
