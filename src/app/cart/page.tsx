'use client';
import React, {useState, useEffect} from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import {getUser} from '../../api/auth';
import {type UserType} from '../../types/UserSchema';
import CartItem from '../../components/common/CartItem';
import {createOrder} from '../../api/order';
import NoLogeado from '../../components/common/NoLogin';
import {type ProductType} from '../../types/CRUD/ProductSchema';
import {type CartType} from '../../types/CartSchema';
const Cart = (): JSX.Element => {
	const [profile, setProfile] = useState<UserType>();
	const [cartItems, setCartItems] = useState<CartType[]>([]);

	const fetchUserProfile = async () => {
		try {
			const userProfile: UserType | undefined = await getUser();
			setProfile(userProfile);
			if (userProfile?.cart) {
				setCartItems(
					userProfile.cart?.reduce(
						(acc, curr) => [...acc, ...curr.products],
						[],
					) || [],
				);
			} else {
				setCartItems([]); // Si userProfile o userProfile.cart son undefined, establecer cartItems como un array vacío
			}
		} catch (error) {
			console.error('Error fetching user profile:', error);
		}
	};

	useEffect(() => {
		fetchUserProfile().catch(error => {
			console.error('Error al cargar productos:', error);
		});
	}, []);

	const handleUpdateCart = () => {
		fetchUserProfile().catch(error => {
			console.error('Error al cargar productos:', error);
		});
	};

	const handleCreateOrder = async () => {
		try {
			const createdOrders = await createOrder();
			console.log('Órdenes creadas:', createdOrders);
		} catch (error) {
			console.error('Error al crear la orden:', error);
		}
	};

	if (!profile) {
		return <NoLogeado />;
	}

	return (
		<div className='bg-gris dark:bg-grisOscuro min-h-screen flex flex-col pt-14'>
			<main className='relative flex-1'>
				<Header />
				<div className='flex justify-center pb-10'>
					<div className='m-3 p-2'>
						{cartItems.length === 0 ? (
							<p className='text-center text-gray-500 text-3xl'>No tienes ningún producto en tu carrito. Agrega productos o revisa tus órdenes.</p>
						) : (
							profile.cart?.map(cartItem => (
								<div key={cartItem._id}>
									{cartItem.products.map(product => (
										<CartItem
											producto={product}
											key={product._id}
											productImageUrl={product.productImageUrl}
											productName={product.productName}
											cantidad={product.quantity}
											precio={product.subtotal}
											productId={product.productId}
											onUpdateCart={handleUpdateCart}
										/>
									))}
								</div>
							))
						)}
					</div>
				</div>
				<div className='flex justify-center pb-5'>
					<button
						onClick={handleCreateOrder}
						disabled={cartItems.length === 0}
						className={`px-4 py-2 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 transition duration-300 ease-in-out ${
							cartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
						}`}
					>
            Generar Órdenes
					</button>
				</div>
			</main>
			<footer>
				<Footer />
			</footer>
		</div>
	);
};

export default Cart;
