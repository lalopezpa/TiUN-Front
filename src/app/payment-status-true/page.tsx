'use client';
// ForgotPassword.tsx
import React from 'react';
import logomini	from '../../../assets/logo_mini.png';
import {useForm, type SubmitHandler} from 'react-hook-form';
import Link from 'next/link';
import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
import {useRouter, useSearchParams} from 'next/navigation';

const forgotPassword = (): JSX.Element => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const payId = searchParams.get('payment_id');
	const prefId	= searchParams.get('preference_id');
	const merchantOrderId = searchParams.get('merchant_order_id');
	const getpref = async (): Promise<void> => {
		try {
			const searchParams = useSearchParams();
			const payId = searchParams.get('payment_id');
			const prefId = searchParams.get('preference_id');
			const merchantOrderId = searchParams.get('merchant_order_id');

			// Enviar los datos POST al endpoint /getpref
			const postData = {
				payId,
				prefId,
				merchantOrderId,
			};

			const postResponse = await fetch('https://backend-6fx2.vercel.app/getpref', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(postData),
			});

			if (postResponse.ok) {
				// Manejar la respuesta en caso de éxito si es necesario
			} else {
				console.error('Error al enviar datos al endpoint /getpref:', postResponse.status, postResponse.statusText);
			}
		} catch (error: any) {
			console.error('Error en la solicitud:', error.message);
		}
	};

	getpref().catch(error => {
		console.error('Error al cargar productos:', error);
	});

	return (
		<> <div className='flex flex-col w-screen min-h-screen bg-repeat' style={{backgroundImage: 'url(https://img.freepik.com/vector-premium/fondo-vector-bolsas-compras_615502-2466.jpg)', zIndex: -1}}>

			<main className='flex justify-center items-center bg-verdeClaro bg-opacity-75 h-2/3 flex-1  overflow-y-auto' >
				<section>
					<div className='flex justify-center  z-30'>
						<div className='flex bg-gray-300 bg-opacity-75 rounded p-4 dark:bg-verdeOscuro md:full max-w-3xl  mx-4'>
							{/* División izquierda */}
							<section className='w-1/2 flex-col justify-center items-center overflow-hidden min-h-max relative hidden md:flex sm:w-full '>
								<div className='image-container'>
									<img src='https://th.bing.com/th/id/OIG..YZE7lrd7iBpCS6FROOr?w=1024&h=1024&rs=1&pid=ImgDetMain' alt='Imagen de confirmación' className='w-72 h-fit rounded-full'/>
								</div>
							</section>
							{/* División derecha */}
							<section className='flex-col bg-opacity-90 w-full   p-8'>
								<div className='text-3xl font-poppins text-green-800 my-2 md:my-4'>
                    TU PAGO HA SIDO APROBADO
									<div className='text-xl font-poppins text-black my-2 md:my-4'>
                        ¡Felicidades! Tu pago ha sido procesado con éxito. Agradecemos tu compra. Si tienes alguna pregunta o necesitas asistencia, no dudes en ponerte en contacto con nuestro equipo de soporte.
									</div>
									{/* Botón Continuar */}
									<Link href='/'>
										<button className=' justify-end items-end bg-green-700 hover:bg-green-600 text-white font-bold font-poppins py-2 px-2  rounded-full text-lg '>
										Volver al comercio
										</button>
									</Link>
								</div>
							</section>
						</div>
					</div>
				</section>

			</main>
			<footer className='h-1/6 bg-verdeClaro bg-opacity-75 ' >
				<Footer />
			</footer>
		</div >
		</>
	);
};

export default forgotPassword;
