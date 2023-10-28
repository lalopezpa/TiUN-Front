// CarItem.tsx

import type React from 'react';
import {type ProductType} from '../../types/CRUD/ProductSchema';

type CartItemProps = {
	producto: ProductType;
	cantidad: number;
	precio: number;
	eliminarDelCarrito: (productoId: string) => void;
};

const CartItem: React.FC<CartItemProps> = ({producto, cantidad, eliminarDelCarrito}) => {
	const precio: number = producto.price;
	return (
		<>
			<div className='flex items-center justify-between border-b p-4'>
				<div className='flex items-center space-x-4'>
					<img src={producto.imageUrl} alt={producto.name} className='w-12 h-12 object-cover' />
					<div>
						<p className='font-bold'>{producto.name}</p>
						<p>Cantidad: {cantidad}</p>
						<p>Precio: ${precio.toFixed(2)}</p>
					</div>
				</div>
				<button
					onClick={() => {
						eliminarDelCarrito(producto._id);
					}}
					className='text-red-500'>
          Eliminar
				</button>
			</div>
		</>
	);
};

export default CartItem;
