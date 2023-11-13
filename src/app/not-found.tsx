import React from 'react';
import Link from 'next/link';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';

const NotFound = () => (
	<div className='flex flex-col w-screen min-h-screen bg-repeat' style={{backgroundImage: 'url(https://tu-url-de-buho.jpg)', zIndex: -1}}>
		<header className='flex justify-end items-end bg-verdeClaro bg-opacity-75 h-1/6'>
			<Header></Header>
			{/* Puedes colocar el logo o imagen que desees aquí */}
		</header>
		<main className='flex justify-center items-center bg-verdeClaro bg-opacity-75 h-2/3 flex-1 overflow-y-auto'>
			<section>
				<div className='flex justify-center items-center z-30 '>
					<div className='bg-gray p-8 rounded-full '>
						<h2 className='flex justify-center items-center text-4xl mb-4 font-poppins font-bold text-white'>
                            404 Not Found
						</h2>
						<div className='bg-gray-300 p-8 rounded-lg shadow-md flex justify-center items-center'>
							<h1>Parece que has llegado a un lugar inexistente 😮 <Link className='font-poppins text-yellow-400 hover:invert' href={'/'}>Volver a la página principal</Link></h1>
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

export default NotFound;
