'use client';
import React, {useEffect, useState} from 'react';
import Header from '../../components/common/Header';
import {MoneyIcon, CheckIcon, ListForSendIcon, ListSendedIcon} from '../../components/icons/icons';
import Footer from '../../components/common/Footer';
import {getUser} from '../../api/auth';
import type {UserType} from '../../types/UserSchema';
import {useAuth} from '../../context/authContext';
import {useRouter} from 'next/navigation';
import Image from 'next/image';
import CartItem from '../../components/common/CartItem';

const Cart = (): JSX.Element => {
	const [profile, setProfile] = useState<UserType>();
	const {logout} = useAuth();
	const router = useRouter();
	const handleLogout = () => {
		console.log('Antes de logout');
		logout();
		console.log('Después de logout');
		router.push('/');
	};

	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				const profile = (await getUser())!;
				setProfile(profile);
				console.log(profile);
			} catch (error) {
				console.error('Error fetching user profile:', error);
			}
		};

		(async () => {
			await fetchUserProfile();
		})();
	}, []);

	if (!profile) {
		return <div> </div>;
	}

	function data(value: Record<string, unknown>, index: number, array: Array<Record<string, unknown>>): void {
		throw new Error('Function not implemented.');
	}

	return (
		<div className='bg-gris dark:bg-grisOscuro min-h-screen flex flex-col'>
			<main className='relative flex-1'>
				<Header />
				<div className='flex items-center justify-center h-full pb-10'>
					<div className='mt-14'>
						<div>
							<div className='m-3 p-2 flex-shrink-0'>
								{profile.cart.map((cartItem, cartIndex) => (
									<div key={cartItem._id}>
										{cartItem.products.map((product, productIndex) => (
											<CartItem
												key={product._id}
												productImageUrl={product.productImageUrl}
												producto={product}
												productName={product.productName}
												cantidad={product.quantity}
												precio={product.subtotal}
												productId={product.productId}
											/>
										))}
									</div>
								))}
							</div>
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
