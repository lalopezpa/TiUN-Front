import type React from 'react';
import {useState} from 'react';
import {removeFromCart} from '../../api/cart';
import {toast} from 'sonner';
import {UserType} from '../../types/UserSchema';
import {getUser} from '../../api/auth';
import type {ProductType} from '../../types/CRUD/ProductSchema';

type CartItemProps = {
	_id: string;
	producto: ProductType;
	productName: string;
	cantidad: number;
	precio: number;
	productImageUrl: string;
	productId: string;
	onUpdateCart: () => void;
};

const CartItem: React.FC<CartItemProps> = ({
	_id,
	productName,
	cantidad,
	precio,
	productImageUrl,
	productId,
	onUpdateCart,
}) => {
	const [nuevaCantidad, setNuevaCantidad] = useState(cantidad);

	const handleCantidadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const nuevaCantidad = parseInt(event.target.value, 10);
		setNuevaCantidad(Math.max(0, nuevaCantidad));
	};

	const handleRemoveFromCart = async () => {
		const confirmDelete = window.confirm('¿Estás seguro de eliminar este producto del carrito?');

		if (confirmDelete) {
			try {
				await removeFromCart(productId);
				toast.success('Eliminado del carrito correctamente');
				onUpdateCart(); // Actualizar el carrito en el componente padre
			} catch (error) {
				console.error('Error al eliminar el producto del carrito', error);
				toast.error('Hubo un problema al eliminar el producto del carrito');
			}
		}
	};

	return (
		<div className='items-center justify-between grid grid-cols-1 md:grid-cols-2 pb-10 gap-6 container mx-auto p-3 bg-gray-100 max-w-md rounded-lg shadow-md mt-4'>
			<div className='flex items-center space-x-4'>
				<img src={productImageUrl} alt={productName} className='w-12 h-12 object-cover' />
				<div>
					<p className='font-bold'>{productName}</p>
					<div>
						<p>Cantidad:</p>
						<input
							type='number'
							className='mr-24 p-1 border border-gray-300 rounded'
							value={nuevaCantidad}
							onChange={handleCantidadChange}
						/>
					</div>
					<p>Precio: ${precio.toFixed(2)}</p>
				</div>
			</div>
			<button onClick={handleRemoveFromCart} className='px-2 ml-12 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300'>
        Eliminar
			</button>
		</div>
	);
};

export default CartItem;
