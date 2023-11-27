import logomini from '../../assets/logo_mini.png';
import Link from 'next/link';
import React from 'react';
import Footer from './Footer'; // Asegúrate de importar el componente Footer desde la ubicación correcta

const getUser = async (): Promise<void> => {
	try {
		const response = await fetch('https://backend-6fx2.vercel.app/verifyemail', {
			method: 'GET',
			credentials: 'include',
		});
	} catch (error: any) {
		console.error('Error en la solicitud:', error.message);
	}
};

const NoEmail = () => (
	<div className='flex flex-col w-screen min-h-screen bg-repeat' style={{backgroundImage: 'url(https://img.freepik.com/vector-premium/fondo-vector-bolsas-compras_615502-2466.jpg)', zIndex: -1}}>
		<header className='flex justify-end  items-end bg-verdeClaro bg-opacity-75 h-1/6'>
			<div className='flex justify-end'>
				<img src={logomini.src} alt='Logo' className='w-400 h-400 mx-auto my-4'/>
			</div>
		</header>
		<main className='flex justify-center items-center bg-verdeClaro bg-opacity-75 h-2/3 flex-1  overflow-y-auto'>
			<section>
				<div className='flex justify-center items-center z-30 '>
					<div className='bg-gray p-8 rounded-full '>
						<h2 className='flex justify-center items-center text-4xl mb-4 font-poppins font-bold text-white'>
							TU CUENTA NO ESTÁ VERIFICADA
						</h2>
						<div className='bg-gray-300 p-8 rounded-lg shadow-md flex justify-center items-center'>
							<h1>Parece que no has verificado tu cuenta 😭 <button onClick={getUser}>Haz click aquí para recibir un correo</button></h1>
							<Link href={'./'}>Volver al Home</Link>
						</div>
					</div>
				</div>
			</section>
		</main>
		<footer className='h-1/6 bg-verdeClaro bg-opacity-75'>
			<Footer />
		</footer>
	</div>
);

export default NoEmail;
