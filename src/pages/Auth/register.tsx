import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import DarkModeToggle from '../../components/common/DarkModeToggle';
import useDarkMode from '../../hooks/useDarkMode';
import Footer from '../../components/common/Footer';
import {useForm} from 'react-hook-form';
import Background from '../../components/common/Background';

const Register = () => {
	const {modoOscuro, toggleModoOscuro} = useDarkMode();
	const {register, handleSubmit, formState: {errors}, watch} = useForm();
	const onSubmit = data => {
		console.log(data);
	};

	return (
		<>
			<div className='flex flex-col min-h-screen'>
				<header className='relative z-50 bg-gray-300 top-0 p-4'>
					<div className='flex justify-between'>
						<Link to='/home' className='text-white'>Inicio</Link>
						<DarkModeToggle modoOscuro={modoOscuro } toggleModoOscuro={toggleModoOscuro}/>
					</div>
				</header>
				<main className='flex-grow bg-verdeClaro py-10'>
					<form onSubmit={handleSubmit(onSubmit)} className='w-full text-xl flex flex-col justify-center items-center'>
						<h2 className='text-5xl mb-4 font-poppins font-bold text-white '>REGISTRO</h2>
						<div className='grid grid-rows-2 grid-flow-col gap-4'>
							<label className='flex flex-col text-white'>
								<input
									type='text'
									placeholder='Nombres'
									className='w-[20rem] m-2 p-4 bg-white bg-opacity-20 rounded-lg placeholder-white placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro hover:bg-opacity-30 lg:w-[27rem]'
									{...register('nombre', {required: true, maxLength: 80})}/>
							</label>
							<label className='flex flex-col text-white'>
								<input
									type='text'
									placeholder='Apellidos'
									className='w-[20rem] m-2 p-4 bg-white bg-opacity-20 rounded-lg placeholder-white placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro hover:bg-opacity-30 lg:w-[27rem]'
									{...register('apellido', {required: true, maxLength: 100})}/>
							</label>
							<label className='flex flex-col text-white'>
								<input
									type='number'
									placeholder='Cédula'
									className='w-[20rem] m-2 p-4 bg-white bg-opacity-20 rounded-lg placeholder-white placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro hover:bg-opacity-30 lg:w-[27rem]'
									{...register('cedula', {required: true, maxLength: 10})}/>
							</label>
							<label className='flex flex-col text-white'>
								<input
									type='number'
									placeholder='Teléfono'
									className='w-[20rem] m-2 p-4 bg-white bg-opacity-20 rounded-lg placeholder-white placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro hover:bg-opacity-30 lg:w-[27rem]'
									{...register('telefono', {required: true, maxLength: 10})}/>
							</label>
						</div>
						<div className='flex flex-col' >
							<label className='flex flex-col text-white'>
								<input
									type='text'
									placeholder='Correo'
									className='w-[20rem] m-2 p-4 bg-white bg-opacity-20 rounded-lg placeholder-white placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro hover:bg-opacity-30 lg:w-[27rem]'
									{...register('correo', {required: true, pattern: /^\S+@\S+$/i})}/>
							</label>
							<label className='flex flex-col text-white'>
								<input
									type='password'
									placeholder='Contraseña'
									className='w-[20rem] m-2 p-4 bg-white bg-opacity-20 rounded-lg placeholder-white placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro hover:bg-opacity-30 lg:w-[27rem]'
									{...register('contraseña', {required: true, minLength: 6})}/>
							</label>
							<label className='flex flex-col text-white'>
								<input
									type='password'
									placeholder='Confirmar contraseña'
									className='w-[20rem] m-2 p-4 bg-white bg-opacity-20 rounded-lg placeholder-white placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro hover:bg-opacity-30 lg:w-[27rem]'
									{...register('confirmarContraseña', {required: true, minLength: 6})}/>
							</label>
							<div className='flex'>
								<label className='w-4 pr-5'>
									<input
										type='checkbox'
										className='border-2 border-gris rounded  mb-4 '
										{...register('terminosYCondiciones', {required: true})}/>
								</label>
								<Link to={'/'}>Términos y Condiciones</Link>
							</div>
						</div>
						<button
							type='submit'className='mt-4 bg-vinotinto text-white text-bold px-4 py-2 rounded border-solid hover:brightness-125 border-gris'>
							REGISTRATE
						</button>
					</form>
				</main>
				<Footer ></Footer>
			</div>
		</>
	);
};

export default Register;
