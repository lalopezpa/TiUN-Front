'use client';
import React, {useEffect, useState} from 'react';
import Header from '../../components/common/Header';
import {MoneyIcon, ListSendedIcon} from '../../components/icons/icons';
import Footer from '../../components/common/Footer';
import {getUser} from '../../api/auth';
import type {UserType} from '../../types/UserSchema';
import {useAuth} from '../../context/authContext';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import NoLogeado from '../../components/common/NoLogin';
const Profile = (): JSX.Element => {
	const [profile, setProfile] = useState<UserType>();
	const {logout} = useAuth();
	const router = useRouter();
	const handleLogout = () => {
		logout();
		router.push('/');
	};

	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				const profile = (await getUser())!;
				setProfile(profile);
			} catch (error) {
				console.error('Error fetching user profile:', error);
			}
		};

		(async () => {
			await fetchUserProfile();
		})();
	}, []);

	if (!profile) {
		return 	<NoLogeado></NoLogeado>;
	}

	return (
		<div className='bg-gris dark:bg-teal-950 min-h-screen flex flex-col'>
			<main className='relative flex-1'>
				<Header />
				<div className='flex items-center justify-center h-full pb-10'>
 
					<div className='grid grid-cols-1 md:grid-cols-2 pb-10 gap-6 container mx-auto p-5  bg-green-100 dark:bg-verdeClaro max-w-md rounded-lg shadow-md mt-32'>
						{/* Columna izquierda - Información del usuario */}
						<div>
							<div className='m-3 p-2 flex-shrink-0'>
								<h1 className='text-3xl font-bold py-3 dark:text-white'>{profile.name} </h1>
								<p className='text-gray-600 dark:text-white'>{profile.email} </p>
								<p className='text-gray-600 dark:text-white'>{profile.phoneNumber} </p>
							</div>
							<button className='bg-red-500 text-white m-1 px-4 py-2 rounded-full ml-4' onClick={handleLogout} >
								Cerrar sesión
							</button>
						</div>
						<div >
							<Image className='rounded-lg mt-3' src={profile.imageUrl} alt='profilepic' width={200} height={100}></Image>
						</div>

						{/* Nueva fila para "My Orders" */}
						<div className='md:col-span-2 ml-4 mx-2'>
							<div className='text-lg font-bold m-1 dark:text-white'>Mis pedidos</div>
							<div className='flex-1 items-center justify-center text-center ml-2'>
								<a className='flex items-center'>
									<MoneyIcon />
									<span className='ml-1 dark:text-white'>Por pagar</span>
								</a>
							</div>

						</div>

						{/* Nueva fila para "My sales" */}
						<div className='md:col-span-2 ml-4 mx-2'>
							<div className='text-lg font-bold dark:text-white'>Mis ventas</div>
							<div className='flex-1 items-center justify-center text-center ml-2'>
								<Link href={'./my-products'} className='flex items-center'>
									<ListSendedIcon />
									<span className='ml-1 dark:text-white'>Administrar productos</span>
								</Link>
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

export default Profile;
