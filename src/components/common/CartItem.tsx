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
		setNuevaCantidad(nuevaCantidad);
	};

	return (
		<div className='flex items-center justify-between border-b p-4'>
			{/* Usamos el producto._id como clave única */}
			<div key={producto._id} className='flex items-center space-x-4'>
				<img src={productImageUrl} alt={productName} className='w-12 h-12 object-cover' />
				<div>
					<p className='font-bold'>{productName}</p>
					<div>
						<p>Cantidad:</p>
						{/* Aquí puedes agregar la lógica para cambiar la cantidad */}
						<input type='number' className='m-5' value={nuevaCantidad} onChange={handleCantidadChange} />
					</div>
					<p>Precio: ${precio.toFixed(2)}</p>
				</div>
			</div>
			<button
				onClick={() => {
					eliminarDelCarrito(producto._id);
				}}
				className='ml-12 text-red-500'>
		Eliminar
			</button>
		</div>
	);
};

export default CartItem;

