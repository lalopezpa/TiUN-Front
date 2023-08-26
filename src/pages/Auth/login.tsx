// Login.tsx
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import fondo from '../../assets/fondo.jpg';
import logo from '../../assets/Logotipo..png';
import {useForm} from 'react-hook-form';
import axios from 'axios'; // Importa la librería axios
import Cookies from 'js-cookie';
import Footer from '../../components/common/Footer';

const Login = () => {
	const	{register, handleSubmit, formState: {errors}, watch} = useForm();

	const onSubmit = (data: any) => {
		// Acá va el método post para enviar los datos al backend
		// eslint-disable-next-line no-console
		console.log(data);
	};

	return (
		<>
			<main className='flex h-screen bg-verdeClaro bg-opacity-75'>
				{/* División izquierda */}
				<section className='w-1/2 flex flex-col justify-center items-center  overflow-hidden min-h-max relative hidden md:flex sm:w-100%'>
					<div className='w-full h-full absolute top-0 left-0 z-10'>
						<img src={fondo} alt='fondobolsas' className='w-full h-full opacity-5 bg-cover' />
					</div>

					<div className='z-20'>
						<img src={logo} alt='logo' className='w-[36rem] h-[36rem] ' />
					</div>
				</section>
				{/* División derecha */}
				<section className='bg-verdeSeccionLogin bg-opacity-90 w-full md:w-1/2 p-10 pb-0  flex flex-col justify-center items-center'>
					<figure className='flex md:hidden'><img src={logo} alt='logo' className='w-48 h-48 p-5' /></figure>
					<h2 className='text-5xl mb-4 font-poppins font-bold text-white'>INICIO DE SESIÓN</h2>
					<form onSubmit={handleSubmit(onSubmit)} className='w-full text-xl flex flex-col justify-center items-center'>
						<label className='flex flex-col text-white ' htmlFor='correo'> Correo
							<input id='correo'{...register('correo', {required: true})}
								className='w-[20rem] m-1 p-4 bg-white bg-opacity-20 rounded-lg placeholder-white placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro hover:bg-opacity-30 lg:w-[27rem]' placeholder='ejemplo@unal.edu.co' type='email' />
							{errors.correo && <span className='text-red-600'>Este campo es requerido</span>}
						</label>
						<label className='flex flex-col text-white '> Contraseña
							<input {...register('contraseña', {required: true})}
								className='w-[20rem] m-1 p-4 bg-white bg-opacity-20 rounded-lg placeholder-white placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro border-solid hover:bg-opacity-30 lg:w-[27rem]' placeholder='**********************' type='password'/>
							{errors.contraseña && <span className='text-red-600'>Este campo es requerido</span>}
						</label>
						<div className='flex text-left w-[20rem] lg:w-[27rem]'>
							<p>
								<Link className='text-amarillo hover:invert' to='/RecoverPassword'>Olvidé mi contraseña</Link>
							</p>
						</div>
						<button type='submit' className='mt-4 bg-vinotinto text-white text-bold px-4 py-2 rounded border-solid hover:brightness-125 border-gris'>
								INGRESA
						</button>
					</form>
					<div className='font-poppins text-xl flex flex-col justify-center items-center'>
						<p className=' text-white'>
								¿No tienes cuenta? <Link to='/SignUp' className='text-amarillo hover:invert'>Regístrate</Link>
						</p>
						<p className=' text-white'>
								------- O INGRESA CON --------
						</p>
						<p className='font-poppins text-xl text-white'>
							<button>Google</button>
						</p>
					</div>
					<div className=''>
						<Footer/>
					</div>
				</section>{/* fin de la sección derecha */}
			</main>
		</>
	);
};

export default Login;
