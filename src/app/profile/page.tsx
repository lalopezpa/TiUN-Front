import React from 'react';
// Import Background from '../../components/common/Background';
// import DarkModeToggle from '../../components/common/DarkModeToggle';
// import useDarkMode from '../../hooks/useDarkMode';
import Header from '../../components/common/Header';
import {ListIcon, MoneyIcon, CheckIcon, ListForSendIcon, ListSendedIcon} from '../../components/icons/icons';
import Footer from '../../components/common/Footer';
import fondo from '../../assets/fondo.jpg';
import {useUser} from '../../context/userContext';

const Profile = (): JSX.Element => {
 	// Const {modoOscuro, toggleModoOscuro} = useDarkMode();
	// eslint-disable-next-line no-negated-condition
	const {user} = typeof window !== 'undefined' ? useUser() : {user: null};

	if (!user) {
	// Usuario no autenticado
		return <div>Usuario no autenticado</div>;
	}

	return (
		<div className='bg-gris dark:bg-grisOscuro min-h-screen flex flex-col'>
			<main className='relative flex-1'>
				<Header />
				{/* <div className='w-full h-full absolute top-0 left-0 z-10'>
				<img
					src={fondo.src}
					alt='fondobolsas'
					className='w-full h-full opacity-5 bg-cover'
				/>
			</div> */}
				<div className='flex items-center justify-center h-full'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6 container mx-auto p-5 bg-gray-100 max-w-md rounded-lg shadow-md mt-32'>
						{/* Columna izquierda - Información del usuario */}
						<div>
							<div className='m-3 p-2'>
								<h1 className='text-2xl font-bold py-3'>{user.id} </h1>
								<p className='text-gray-600'>correo@unal.edu.co</p>
								<p className='text-gray-600'>123-456-7890</p>
							</div>
							{/* Botón para editar perfil */}
							<button className='bg-blue-500 text-white px-4 py-2 rounded-full ml-4'>
								Editar perfil
							</button>
						</div>
						{/* Columna derecha - Imagen en dispositivos medianos y grandes */}
						<img
							src='https://via.placeholder.com/150x175'
							className='mx-auto  rounded-lg md:ml-auto'
							alt=''
						/>

						{/* Nueva fila para "My Orders" */}
						<div className='md:col-span-2 ml-4 mx-2'>
							<div className='text-lg font-bold m-1'>Mis pedidos</div>
							<div className='flex mt-2'>
								<div className='flex-1 items-center justify-center text-center ml-2'>
									<a className='flex items-center'>
										<MoneyIcon />
										<span className='ml-1'>Por pagar</span>
									</a>
								</div>
								<div className='flex-1 items-center justify-center text-center ml-2'>
									<a className='flex items-center'>
										<CheckIcon />
										<span className='ml-1'>Por calificar</span>
									</a>
								</div>
							</div>
						</div>

						{/* Nueva fila para "My sales" */}
						<div className='md:col-span-2 ml-4 mx-2'>
							<div className='text-lg font-bold m-2 '>Mis ventas</div>
							<div className='flex mt-2 '>
								<div className='flex-1 items-center justify-center text-center ml-2'>
									<a className='flex items-center'>
										<ListForSendIcon />
										<span className='ml-1'>Por enviar</span>
									</a>
								</div>
								<div className='flex-1 items-center justify-center text-center ml-2'>
									<a className='flex items-center'>
										<ListSendedIcon />
										<span className='ml-1'>Enviados</span>
									</a>
								</div>
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
