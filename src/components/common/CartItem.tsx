import type React from 'react';
import {useState, useEffect} from 'react';
import {type ProductType} from '../../types/CRUD/ProductSchema';
import {removeFromCart} from '../../api/cart';
import {toast} from 'sonner';
import {getUser} from '../../api/auth';
import type {UserType} from '../../types/UserSchema';

type CartItemProps = {
	producto: ProductType;
	productName: string;
	cantidad: number;
	precio: number;
	productImageUrl: string;
	productId: string;
};
const RemoveFromCartButton: React.FC<{product: string; onRemove: () => void}> = ({product, onRemove}) => {
	const handleClick = async () => {
		try {
			const removedProduct: ProductType = await removeFromCart(product);
			console.log('Producto eliminado del carrito:', removedProduct);
			toast.success('Eliminado del carrito correctamente');
			window.location.reload();
			// Llama a la función `onRemove` para activar el useEffect en el componente `Cart`.
			onRemove();
		} catch (error) {
			console.error('Error al eliminar el producto del carrito', error);
			toast.error('Hubo un problema al eliminar el producto del carrito');
		}
	};

	return (
		<button onClick={handleClick} className='px-2 ml-12 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300'>
      Eliminar
		</button>
	);
};

const CartItem: React.FC<CartItemProps> = ({producto, productName, cantidad, precio, productImageUrl, productId}) => {
	const [profile, setProfile] = useState<UserType>();

	const fetchUserProfile = async () => {
		try {
			const userProfile = (await getUser())!;
			setProfile(userProfile);
			console.log(userProfile);
		} catch (error) {
			console.error('Error fetching user profile:', error);
		}
	};

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
							className='mr-24 p-1 border border-gray-300 rounded'
							value={nuevaCantidad}
							onChange={handleCantidadChange}
						/>
					</div>
					<p>Precio: ${precio.toFixed(2)}</p>
				</div>
			</div>
			<RemoveFromCartButton product={productId} onRemove={fetchUserProfile} />
		</div>
	);
};

export default CartItem;
