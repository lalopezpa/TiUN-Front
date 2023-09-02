// Register.tsx
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import DarkModeToggle from '../../components/common/DarkModeToggle';
import useDarkMode from '../../hooks/useDarkMode';
import Footer from '../../components/common/Footer';
import {useForm} from 'react-hook-form';

const Register = () => {
	const {modoOscuro, toggleModoOscuro} = useDarkMode();
	const	{register, handleSubmit, formState: {errors}, watch} = useForm();

	return (
		<>
			<header className='fixed top-0 left-0 w-full p-4 bg-transparent z-50'>
				<div className='flex justify-between'>
					<Link to='/home' className='text-white  '>Inicio</Link>
					<DarkModeToggle modoOscuro={modoOscuro} toggleModoOscuro={toggleModoOscuro} />
				</div>
			</header>
			<main className='flex min-h-screen bg-verdeClaro bg-opacity-75 dark:bg-verdeOscuro md:full'>
				<section className='w-full flex flex-col justify-center items-center overflow-hidden min-h-max relative  md:flex sm:w-100%'>
					<label className='flex flex-col text-white' htmlFor='Nombres'>
						<input
							id='Nombres'
							{...register('Nombres', {
								required: 'Este campo es requerido',
								validate: {
									minLength: value =>
										value.length >= 2 || 'El campo debe tener al menos 2 caracteres',
									maxLength: value =>
										value.length <= 30 || 'El campo no debe tener más de 30 caracteres',
								},
							})}
							className='w-[20rem] m-1 p-4 bg-white bg-opacity-20 rounded-lg placeholder-white placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro hover:bg-opacity-30 lg:w-[27rem]'
							placeholder='Nombres'
							type='text'
						/>
						{errors.Nombres && <span className='text-red-600'>{errors.Nombres?.message?.toString()}</span>}
					</label>

					<label className='flex flex-col text-white' htmlFor='apellidos'>
						<input
							id='apellidos'
							{...register('apellidos', {required: true})}
							className='w-[20rem] m-1 p-4 bg-white bg-opacity-20 rounded-lg placeholder-white placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro hover:bg-opacity-30 lg:w-[27rem]'
							placeholder='Apellidos'
							type='text'
						/>
						{errors.apellidos && <span className='text-red-600'>Este campo es requerido</span>}
					</label>
					<button
						type='submit'
						className='mt-4 bg-vinotinto text-white text-bold px-4 py-2 rounded border-solid hover:brightness-125 border-gris'
					>
        INGRESA
					</button>
					<Footer></Footer>
				</section>

			</main>

		</>
	);
};

export default Register;
