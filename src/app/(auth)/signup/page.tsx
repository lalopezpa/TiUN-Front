'use client';
import React, {useState, useEffect, useRef} from 'react';
import Link from 'next/link';
import DarkModeToggle from '../../../components/common/DarkModeToggle';
import useDarkMode from '../../../hooks/useDarkMode';
import Footer from '../../../components/common/Footer';
import {useForm} from 'react-hook-form';
import Background from '../../../components/common/Background';
import {useAuth} from '../../../context/authContext';

const Register = () => {
	const {modoOscuro, toggleModoOscuro} = useDarkMode();
	const {register, handleSubmit, formState: {errors}, watch} = useForm();
	const password = useRef(null);
	password.current = watch('password', '');
	const {signup} = useAuth();
	const onSubmit = async data => {
		console.log(data);
		signup(data);
	};

	return (
		<>
			<div className='flex flex-col min-h-screen bg-white dark:bg-verdeOscuro'>
				<header className='sticky bg-verdeClaro bg-opacity-75 z-50 top-0 p-4 dark:bg-verdeOscuro'>
					<div className='flex justify-between'>
						<Link href='/' className='text-white'>Inicio</Link>
						<DarkModeToggle modoOscuro={modoOscuro } toggleModoOscuro={toggleModoOscuro}/>
					</div>
				</header>
				<main className='flex-grow bg-verdeClaro py-10 bg-opacity-90 dark:bg-verdeOscuro relative z-20' >
					<form onSubmit={handleSubmit(onSubmit)} className='w-full text-xl flex flex-col justify-center items-center '>
						<div className='w-full h-full absolute top-0 left-0 -z-20'>
							<Background modoOscuro={modoOscuro} />
						</div>
						<h2 className='text-5xl mb-4 font-poppins font-bold text-white '>REGISTRO</h2>
						<div className='grid grid-rows-2 grid-flow-col gap-x-0 md:gap-x-4'>
							<label className='flex flex-col text-white'>
								<input
									type='text'
									placeholder='Nombres'
									className='w-[20rem] m-2 p-4 bg-white bg-opacity-20 rounded-lg placeholder-white placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro hover:bg-opacity-30 lg:w-[27rem]'
									{...register('username', {
										required: {
											value: true,
											message: 'El Nombre es requerido',
										},
										maxLength: 20,
										minLength: 2,
									})}
								/>
								{errors.username?.type === 'required' && <span className='text-red-600 font-poppins'>Nombre requerido</span>}
								{errors.username?.type === 'maxLength' && (
									<span className='text-red-600 font-poppins' >El nombre no debe ser mayor a 20 caracteres</span>
								)}
								{errors.username?.type === 'minLength' && (
									<span className='text-red-600 font-poppins' >El nombre debe ser mayor a 2 caracteres</span>
								)}
							</label>
							<label className='flex flex-col text-white'>
								<input
									type='text'
									placeholder='Apellidos'
									className='w-[20rem] m-2 p-4 bg-white bg-opacity-20 rounded-lg placeholder-white placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro hover:bg-opacity-30 lg:w-[27rem]'
									{...register('lastname', {
										required: {
											value: true,
											message: 'El Apellido es requerido',
										},
										maxLength: 20,
										minLength: 2,
									})}
								/>
								{errors.lastname?.type === 'required' && <span className='text-red-600 font-poppins'>Apellido requerido</span>}
								{errors.lastname?.type === 'maxLength' && (
									<span className='text-red-600 font-poppins'>El apellido no debe ser mayor a 20 caracteres</span>
								)}
								{errors.lastname?.type === 'minLength' && (
									<span className='text-red-600 font-poppins' >El apellido debe ser mayor a 2 caracteres</span>
								)}
							</label>
							<label className='flex flex-col text-white'>
								<input
									type='number'
									placeholder='Cédula'
									className='w-[20rem] m-2 p-4 bg-white bg-opacity-20 rounded-lg placeholder-white placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro hover:bg-opacity-30 lg:w-[27rem] appearance-none'
									{...register('id_cedula', {
										required: {
											value: true,
											message: 'La cédula es requerida',
										},
										pattern: {
											value: /^[1-9]{1}\d{5,10}$/,
											message: 'Cédula no válida',
										},
									})}/>
								{errors.id_cedula && <span className='text-red-600 font-poppins'>{errors.id_cedula.message}</span>}
							</label>
							<label className='flex flex-col text-white'>
								<input
									type='tel'
									placeholder='Teléfono'
									className='w-[20rem] m-2 p-4 bg-white bg-opacity-20 rounded-lg placeholder-white placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro hover:bg-opacity-30 lg:w-[27rem]'
									{...register('phoneNumber', {
										required: {
											value: true,
											message: 'El teléfono es requerido',
										},
										pattern: {
											value: /^[2-9]\d{9}$/,
											message: 'Número no válido',
										},
									})}
								/>
								{errors.phoneNumber && <span className='text-red-600 font-poppins'>{errors.phoneNumber.message}</span>}
							</label>
						</div>
						<div className='flex flex-col' >
							<label className='flex flex-col text-white'>
								<input
									type='email'
									placeholder='Correo'
									className='w-auto m-2 p-4 bg-white bg-opacity-20 rounded-lg placeholder-white placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro hover:bg-opacity-30 lg:w-[27rem]'
									{...register('email', {
										required: {
											value: true,
											message: 'Correo es requerido',
										},
										pattern: {
											value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
											message: 'Correo no válido',
										},
									})}
								/>
								{errors.email && <span className='text-red-600 font-poppins'>{errors.email.message}</span>}
							</label>
							<label className='flex flex-col text-white'>
								<input
									type='password'
									placeholder='Contraseña'
									className='w-auto m-2 p-4 bg-white bg-opacity-20 rounded-lg placeholder-white placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro hover:bg-opacity-30 lg:w-[27rem]'
									{...register('password', {
										required: {
											value: true,
											message: 'La Contraseña es requerida',
										},
										minLength: {
											value: 6,
											message: 'La Contraseña debe ser mayoraaa a 6 caracteres',
										},
										maxLength: {
											value: 20,
											message: 'La Contraseña debe ser máximo de 20 caracteres',
										},
									})}
								/>
								{errors.password && <span className='text-red-600 font-poppins'>{errors.password.message}</span>}
							</label>
							<label className='flex flex-col text-white'>
								<input
									type='password'
									placeholder='Confirmar contraseña'
									className='w-auto m-2 p-4 bg-white bg-opacity-20 rounded-lg placeholder-white placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro hover:bg-opacity-30 lg:w-[27rem]'
									{...register('confirmarcontraseña', {
										required: {
											value: true,
											message: 'Confirmar contraseña es requerida',
										},
										minLength: {
											value: 6,
											message: 'Confirmar contraseña debe ser mayor a 6 caracteres',
										},
										validate: value =>
											value === password.current || 'Las contraseñas no coinciden',
									})}
								/>
								{errors.confirmarcontraseña && (<span className='text-red-600 font-poppins'>{errors.confirmarcontraseña.message}</span>)}
							</label>
							<div className='flex flex-col'>
								<div className='flex'>
									<label className='w-4 pr-5'>
										<input
											type='checkbox'
											className='border-2 border-gris rounded  mb-4 '
											{...register('aceptaTerminos', {
												required: {
													value: true,
													message: 'Para registrate debes aceptar los términos y condiciones',
												},
											})}
										/>
									</label>
									<div className='font-poppins text-xl flex justify-between items-center'>
										<p className='text-white'>Estoy de acuerdo con los  </p> <Link href={'/'} className='text-amarillo hover:invert'> Términos y Condiciones</Link>
									</div>
								</div>
								{errors.aceptaTerminos && <span className='text-red-600 font-poppins'>{errors.aceptaTerminos.message}</span>}
							</div>
						</div>
						<button
							type='submit'className='mt-4 bg-vinotinto text-white text-bold px-4 py-2 rounded border-solid hover:brightness-125 border-gris'>
							REGISTRATE
						</button>
					</form>
					<pre style={{width: '400px'}}>{JSON.stringify(watch(), null, 2)}</pre>
				</main>
				<Footer ></Footer>
			</div>
		</>
	);
};

export default Register;
