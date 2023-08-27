// Login.tsx
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import fondo from '../../assets/fondo.jpg';
import logo from '../../assets/Logotipo..png';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import Cookies from 'js-cookie';
import FooterLogin from '../../components/common/FooterLogin';
import bcrypt from 'bcryptjs';
import type ApiResponse from '../../types/ApiResponse';
import type RequestData from '../../types/RequestData';

const Login = (): JSX.Element => {
	const	{register, handleSubmit, formState: {errors}, watch} = useForm();

	const onSubmit = async (data: RequestData) => {
		const hashedPassword: string = await bcrypt.hash(data.contraseña, 10);
		console.log(data.contraseña);
		console.log(data.correo);
		console.log(hashedPassword);
		const requestData: RequestData = {
			correo: data.correo,
			contraseña: hashedPassword,
		};
		// 1console.log(requestData);

		try {
			// Realiza una solicitud POST a la API con los datos del formulario
			const response = await axios.post<ApiResponse>('URL_DE_TU_API', requestData);
			// Maneja la respuesta si es necesario
			// console.log(response.data);
			// Guarda los tokens en las cookies
			Cookies.set('accessToken', response.data.accessToken);
			Cookies.set('refreshToken', response.data.refreshToken);

			// Redirige al usuario al home
			window.location.href = '/Home';
		} catch (error) {
			// Maneja los errores si ocurren
			// console.error('Error al enviar los datos:', error);
		}
	};

	return (
		<>
			<main className='flex min-h-screen bg-verdeClaro bg-opacity-75 dark:bg-verdeOscuro md:full'>
				{/* División izquierda */}
				<section className='w-1/2 flex flex-col justify-center items-center  overflow-hidden min-h-max relative hidden md:flex sm:w-100%'>
					<div className='w-full h-full absolute top-0 left-0 z-10'>
						<img src={fondo} alt='fondobolsas' className='w-full h-full opacity-5 bg-cover' />
					</div>
					<figure className='z-20'>
						<img src={logo} alt='logo' className='w-[24rem] h-[24rem] px-4 lg:w-[36rem] lg:h-[36rem] lg:px-0 ' />
					</figure>
				</section>
				{/* División derecha */}
				<section className='bg-verdeSeccionLogin bg-opacity-90 w-full md:w-1/2 p-10 pb-0 flex flex-col justify-between items-center md:pt-48 dark:bg-verdeOscuro'>
					<figure className='flex md:hidden'><img src={logo} alt='logo' className='w-48 h-48 pb-5' /></figure>
					<form onSubmit={handleSubmit(onSubmit)} className='w-full text-xl flex flex-col justify-center items-center'>
						<h2 className='text-5xl mb-4 font-poppins font-bold text-white'>INICIO DE SESIÓN</h2>
						<label className='flex flex-col text-white ' htmlFor='correo'>
							<input id='correo'{...register('correo', {required: true})} className='w-[20rem] m-1 p-4 bg-white bg-opacity-20 rounded-lg placeholder-white placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro hover:bg-opacity-30 lg:w-[27rem]' placeholder='ejemplo@unal.edu.co' type='email' />
							{errors.correo && <span className='text-red-600'>Este campo es requerido</span>}
						</label>
						<label className='flex flex-col text-white '> Contraseña
							<input {...register('contraseña', {required: true})} className='w-[20rem] m-1 p-4 bg-white bg-opacity-20 rounded-lg placeholder-white placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro border-solid hover:bg-opacity-30 lg:w-[27rem]' placeholder='**********************' type='password'/>
							{errors.contraseña && <span className='text-red-600'>Este campo es requerido</span>}
						</label>
						<div className='flex text-left w-[20rem] lg:w-[27rem]'>
							<p>
								<Link className='text-amarillo hover:invert' to='/RecoverPassword'>Olvidé mi contraseña</Link>
							</p>
						</div>
						<button type='submit' className='mt-4 bg-vinotinto text-white text-bold px-4 py-2 rounded border-solid hover:brightness-125 border-gris '>
							INGRESA
						</button>
						<div className='font-poppins text-xl flex flex-col justify-center items-center'>
							<p className=' text-white'>
								¿No tienes cuenta? <Link to='/SignUp' className='text-amarillo hover:invert'>Regístrate</Link>
							</p>
							<p className=' text-white'>
								------- O INGRESA CON --------
							</p>
							<p className='font-poppins text-xl text-white pb-10'>
								<button>Google</button>
							</p>
						</div>
					</form>
					<FooterLogin />
				</section>
			</main>

		</>
	);
};

export default Login;
