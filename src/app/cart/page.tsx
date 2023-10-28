// Cart.tsx

import type React from 'react';
import {useState} from 'react';
import CartItem from '../../components/common/CartItem';
import {type ProductType} from '../../types/CRUD/ProductSchema';

type CartProps = {
	carrito: Array<{id: number; producto: ProductType; cantidad: number}>;
};

const Cart: React.FC<CartProps> = ({carrito}) => {
	const [total, setTotal] = useState(0);

	const eliminarDelCarrito = (productoId: string) => {
		// Implementa la lógica para eliminar un producto del carrito
	};

	// Calcula el total del carrito
	const calcularTotal = () =>
	// Implementa la lógica para calcular el total
		total;
	return (
		<div>
			<h1 className='text-2xl font-bold mb-4'>Carrito de Compras</h1>
			{carrito.map(item => (
				<CartItem
					key={item.id}
					producto={item.producto}
					cantidad={item.cantidad}
					precio={item.producto.price * item.cantidad}
					eliminarDelCarrito={eliminarDelCarrito}
				/>
			))}
			<div className='mt-4'>
				<p className='text-xl font-bold'>Total: ${calcularTotal()}</p>
				<button className='bg-blue-500 text-white px-4 py-2 mt-4'>Ir a Pagar</button>
			</div>
		</div>
	);
};

export default Cart;
