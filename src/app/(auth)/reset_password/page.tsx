'use client';
// ForgotPassword.tsx
import React from 'react';
import fondo from '../../../assets/fondo.jpg';
import logomini from '../../../assets/logo_mini.png';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import Cookies from 'js-cookie';
import Footer from '../../../components/common/Footer';
import Link from 'next/link';
import Background from '../../../components/common/Background';

type ApiResponse = {
	accessToken: string;
};
type RequestData = {
	codigo: string;
};

const forgotPasswordValidate = (): JSX.Element => {
	const {
		register,
		handleSubmit,
		formState: {errors},
		watch,
	} = useForm();

	const onSubmit = async (data: RequestData) => {
		const requestData: RequestData = {
			codigo: data.codigo,
		};
		console.log(requestData);

		try {
			// Realiza una solicitud POST a la API con los datos del formulario
			const response = await axios.post<ApiResponse>(
				'URL_DE_TU_API',
				requestData,
			);
			// Maneja la respuesta si es necesario
			// console.log(response.data);
			// Guarda los tokens en las cookies
			Cookies.set('accessToken', response.data.accessToken);

			// Redirige al usuario al home
			window.location.href = '/Home';
		} catch (error) {
			// Maneja los errores si ocurren
			// console.error('Error al enviar los datos:', error);
		}
	};

	return (
		<> <div className='flex flex-col w-screen min-h-screen bg-repeat' style={{backgroundImage: 'url(https://img.freepik.com/vector-premium/fondo-vector-bolsas-compras_615502-2466.jpg)', zIndex: -1}}>
			<header className='flex justify-end  items-end bg-verdeClaro bg-opacity-75 h-1/6'>

				<div className='flex justify-end'>
					<img src={logomini.src} alt='Logo' className='w-400 h-400 mx-auto my-4'/>
				</div>

			</header>

			<main className='flex justify-center items-center bg-verdeClaro bg-opacity-75 h-2/3 flex-1  overflow-y-auto' >
				<section>
					<div className='flex justify-center items-center z-30 '>
						<div className='bg-gray p-8 rouded-full '>
							<h2 className='flex justify-center items-center text-4xl mb-4 font-poppins font-bold text-white'>
								RECUPERAR LA CONTRASEÑA
							</h2>
							<div className='bg-gray-300 p-8 rounded-lg shadow-md '>
								<form
									onSubmit={handleSubmit(onSubmit)}
									className=' text-xl flex flex-col '
								>
									<div className='flex justify-center items-center'>
										<label
											className='flex justify-center items-center flex-col text-black font-italic text-xl max-w-lg'
											htmlFor='codigo'
										>
											Comprueba si recibiste en el telefono un mensaje de texto
											con un código de 6 caracteres.
											<input
												id='codigo'
												{...register('codigo', {required: true})}
												className=' flex justify-center items-center w-[20rem] m-1 p-4 bg-verdeSeccionLogin text-white  rounded-full placeholder-white placeholder-opacity-70  hover:brightness-125 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro lg:w-[27rem]'
												placeholder='Código'
												type='codigo'
											/>
										</label>
									</div>
									<div className='flex justify-end items-end'>
										<p>
											<Link
												className='text-amarillo hover:invert'
												href='/RecoverPassword'
											>
												¿No recibiste el código?
											</Link>
										</p>
										<Link href='/'>
											<button
												type='submit'
												className='mt-4 bg-vinotinto text-white text-bold px-7 py-2 rounded-full border-solid hover:brightness-125 border-gris ml-2'
											>
												CANCELAR
											</button>
										</Link>
										<button
											type='submit'
											className='mt-4 bg-verdeSeccionLogin text-white text-bold px-7 py-2 rounded-full border-solid hover:brightness-125 border-gris ml-2'										>
												CONTINUAR
										</button>
									</div>
								</form>
							</div>
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

export default forgotPasswordValidate;
