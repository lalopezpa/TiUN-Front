'use client';
import React, {useEffect, useState} from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import {getUser} from '../../api/auth';
import {type UserType} from '../../types/UserSchema';
import CartItem from '../../components/common/CartItem';

const Cart = (): JSX.Element => {
	const [profile, setProfile] = useState<UserType>();

	const fetchUserProfile = async () => {
		try {
			const userProfile = await getUser();
			setProfile(userProfile);
		} catch (error) {
			console.error('Error fetching user profile:', error);
		}
	};

	useEffect(() => {
		fetchUserProfile();
	}, []);

	const handleUpdateCart = () => {
		fetchUserProfile(); // Actualizar el carrito al eliminar un elemento
	};

	if (!profile) {
		return <div></div>;
	}

	return (
		<div className='bg-gris dark:bg-grisOscuro min-h-screen flex flex-col'>
			<main className='relative flex-1'>
				<Header />
				<div className='flex items-center justify-center h-full pb-10'>
					<div className='mt-14'>
						<div className='m-3 p-2 flex-shrink-0'>
							{profile.cart.map((cartItem, cartIndex) => (
								<div key={cartItem._id}>
									{cartItem.products.map((product, productIndex) => (
										<CartItem
											key={product._id}
											productImageUrl={product.productImageUrl}
											productName={product.productName}
											cantidad={product.quantity}
											precio={product.subtotal}
											productId={product.productId}
											onUpdateCart={handleUpdateCart} // Pasar función para actualizar el carrito
										/>
									))}
								</div>
							))}
						</div>
					</div>
				</div>
			</main>
			<footer>
				<Footer />
			</footer>
		</div>
	);
};

export default Cart;
