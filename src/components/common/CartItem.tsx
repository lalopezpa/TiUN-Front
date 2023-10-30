import type React from 'react';
import {useState} from 'react';
import {type ProductType} from '../../types/CRUD/ProductSchema';

type CartItemProps = {
	producto: ProductType;
	productName: string;
	cantidad: number;
	precio: number;
	productImageUrl: string;
	eliminarDelCarrito: (productoId: string) => void;
};
// ... (importa lo necesario)

const CartItem: React.FC<CartItemProps> = ({producto, productName, cantidad, precio, productImageUrl, eliminarDelCarrito}) => {
	const [nuevaCantidad, setNuevaCantidad] = useState(cantidad);

	const handleCantidadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const nuevaCantidad = parseInt(event.target.value, 10);
		setNuevaCantidad(Math.max(0, nuevaCantidad));
	};

	return (
		<div className='items-center justify-between grid grid-cols-1 md:grid-cols-2 pb-10 gap-6 container mx-auto p-3 bg-gray-100 max-w-md rounded-lg shadow-md mt-4 '>
			<div key={producto._id} className='flex items-center space-x-4'>
				<img src={productImageUrl} alt={productName} className='w-12 h-12 object-cover' />
				<div>
					<p className='font-bold'>{productName}</p>
					<div>
						<p>Cantidad:</p>
						<input
							type='number'
							className='m-5 p-1 border border-gray-300 rounded'
							value={nuevaCantidad}
							onChange={handleCantidadChange}
						/>
					</div>
					<p>Precio: ${precio.toFixed(2)}</p>
				</div>
			</div>
			<button
				onClick={() => {
					eliminarDelCarrito(producto._id);
				}}
				className='ml-12 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300'
			>
			Eliminar
			</button>
		</div>
	);
};

export default CartItem;

