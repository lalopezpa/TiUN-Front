'use client';
// ForgotPassword.tsx
import React from 'react';
import fondo from '../../../assets/fondo.jpg';
import logomini	from '../../../assets/logo_mini.png';
import {useForm} from 'react-hook-form';
import Link from 'next/link';
import Cookies from 'js-cookie';
import Footer from '../../../components/common/Footer';
import { render } from 'react-dom';
import axios from 'axios';

type ApiResponse = {
	accessToken: string;
};
type RequestData = {
	email: string;
};

const axiosInstance = axios.create({
	baseURL: 'http://localhost:3000/',
	withCredentials: true,
});

const API = 'http://localhost:3000/';



const forgotPassword = (): JSX.Element => {
	const	{register, handleSubmit, formState: {errors}, watch} = useForm();

	const onSubmit = async (data: RequestData) => {
		const requestData: RequestData = {
			email: data.email,
		};
		console.log(requestData);
		console.log(requestData.email);
			
		try {
			// Realiza una solicitud POST a la API con los datos del formulario
			const response = await axios.post<ApiResponse>(`${API}resetpassword`, requestData);
			// Maneja la respuesta si es necesario
			console.log("ahora no se que hacer");
			// console.log(response.data);
			// Guarda los tokens en las cookies
			Cookies.set('accessToken', response.data.accessToken);
			// Redirige al usuario al home
		} catch (error) {
			console.error(error);
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
											htmlFor='correo'
										>
											Ingresa tu correo electronico para buscar tu cuenta
											<input
												id='correo'
												{...register('email', {required: true})}
												className=' flex justify-center items-center w-[20rem] m-1 p-4 bg-verdeSeccionLogin text-white  rounded-full placeholder-white placeholder-opacity-70  hover:brightness-125 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro lg:w-[27rem]'
												placeholder='correo@unal.edu.co'
												type='email'
											/>
										</label>
									</div>
									<div className='flex justify-end items-end'>

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
											className='mt-4 bg-verdeSeccionLogin text-white text-bold px-7 py-2 rounded-full border-solid hover:brightness-125 border-gris ml-2'>		
												BUSCAR
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

export default forgotPassword;
