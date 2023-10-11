// Login.tsx
'use client';
import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../assets/logo.png';
import logooscuro from '../../../assets/logo_oscuro.png';
import {useForm} from 'react-hook-form';
import type RequestData from '../../../types/RequestData';
import FooterLogin from '../../../components/common/FooterLogin';
import DarkModeToggle from '../../../components/common/DarkModeToggle';
import useDarkMode from '../../../hooks/useDarkMode';
import {useAuth} from '../../../context/authContext';
import Background from '../../../components/common/Background';
import {toast, Toaster} from 'sonner';
import {useRouter} from 'next/navigation';
import {useUser} from '../../../context/userContext';
const Login = (): JSX.Element => {
	const	{register, handleSubmit, formState: {errors}, watch} = useForm();
	const {modoOscuro, toggleModoOscuro} = useDarkMode();
	const {login, user} = useAuth();
	const userContext = useUser();
	const router = useRouter();

	const onSubmit = async (data: RequestData) => {
		try {
			const loginResult = await login(data);
			const typeError = loginResult.error;
			// !console.log('usuario');
			// console.log(user);
			if (loginResult.success) {
			// Inicio de sesión exitoso, muestra un toast de éxito y redirige
				userContext.login2(data);
				toast.success('Inicio de sesión exitoso');
				setTimeout(() => {
					router.push('/');
				}, 2000);
			} else if (typeError?.includes('Email is wrong')) {
			// Error de correo no registrado
				toast.error('ERROR', {
					description: 'Este correo no está registrado',
				});
			} else if (typeError?.includes('Password is wrong')) {
			// Error de contraseña incorrecta
				toast.error('ERROR', {
					description: 'La contraseña es incorrecta',
				});
			} else {
			// Otros errores no reconocidos, muestra un toast genérico
				toast.error('Error en el registro');
			// Console.log(typeError);
			}
		} catch (error) {
		// Error en el registro, muestra un toast genérico
			toast.error('Error desconocido en el registro');
		// Console.error('Error en el registro', error);
		}
	};

	return (
		<>
			<main className='flex min-h-screen bg-verdeClaro bg-opacity-75 dark:bg-verdeOscuro md:full'>
				<header className='fixed top-0 left-0 w-full p-4 bg-transparent z-50'>
					<div className='flex justify-between'>
						<Link href='/' className='text-white text-xl  hover:opacity-70'>Inicio</Link>
						<DarkModeToggle modoOscuro={modoOscuro } toggleModoOscuro={toggleModoOscuro} />
					</div>
				</header>
				{/* División izquierda */}
				<section className='w-1/2 flex flex-col justify-center items-center overflow-hidden min-h-max relative hidden md:flex sm:w-100%'>
					<div className='w-full h-full absolute top-0 left-0 z-10'>
						<Background modoOscuro={modoOscuro} />
					</div>
					<figure className='z-20'>
						<img src={modoOscuro ? logooscuro.src : logo.src} alt='logo'loading='lazy' className='w-[24rem] h-[24rem] px-4 lg:w-[36rem] lg:h-[36rem] lg:px-0' />
					</figure>
				</section>
				{/* División derecha */}
				<section className='bg-verdeSeccionLogin bg-opacity-90 w-full md:w-1/2 p-10 pb-0 flex flex-col justify-between items-center md:pt-40 dark:bg-verdeOscuro'>
					<figure className='flex md:hidden'>
						<img src={modoOscuro ? logooscuro.src : logo.src} alt='logo' loading='lazy' className='w-48 h-48 pb-5' />
					</figure>
					<form onSubmit={handleSubmit(onSubmit)} className='w-full text-xl flex flex-col justify-center items-center'>
						<h2 className='text-5xl mb-4 font-poppins font-bold text-white'>INICIO DE SESIÓN</h2>
						<label className='flex flex-col text-white' htmlFor='email'>
							Correo
							<input
								id='email'
								{...register('email', {required: true})}
								className='w-[20rem] m-1 p-4 bg-white bg-opacity-20 rounded-lg placeholder-black  text-black placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro hover:bg-opacity-30 lg:w-[27rem] dark:focus:ring-verdeClaro'
								placeholder='ejemplo@unal.edu.co'
								type='email'
							/>
							{errors.email && <span className='text-red-600'>Este campo es requerido</span>}
						</label>
						<label className='flex flex-col text-white'>
        Contraseña
							<input
								{...register('password', {required: true})}
								className='w-[20rem] m-1 p-4 bg-white bg-opacity-20 rounded-lg placeholder-black  text-black  placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro border-solid hover:bg-opacity-30 lg:w-[27rem] dark:focus:ring-verdeClaro'
								placeholder='**********************'
								type='password'
							/>
							{errors.password && <span className='text-red-600'>Este campo es requerido</span>}
						</label>
						<div className='flex text-left w-[20rem] lg:w-[27rem]'>
							<p>
								<Link className='text-amarillo hover:invert' href='/RecoverPassword'>
            Olvidé mi contraseña
								</Link>
							</p>
						</div>
						<button
							type='submit'
							className='my-4 bg-vinotinto text-white text-bold px-4 py-2 rounded border-solid hover:brightness-125 border-gris'
						>
        INGRESA
						</button>
						<div className='font-poppins text-xl flex flex-col justify-center items-center'>
							<p className='text-white pb-6'>
          ¿No tienes cuenta? <Link href='/signup' className='text-amarillo hover:invert'>Regístrate</Link>
							</p>
						</div>
					</form>
					<FooterLogin />
				</section>
			</main>
			<Toaster richColors visibleToasts={1} closeButton/>
		</>
	);
};

export default Login;
