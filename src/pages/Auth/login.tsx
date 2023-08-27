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
	// K const	{register, handleSubmit, formState: {errors}, watch} = useForm();

	// const onSubmit = (data: any) => {
	// 	// Acá va el método post para enviar los datos al backend
	// 	// eslint-disable-next-line no-console
	// 	console.log(data);
	// };

	return (
		<>
			<div className='bg-white'>
				<div className='flex h-screen bg-verdeClaro bg-opacity-75'>
					{/* División izquierda */}
					<div className='w-1/2 flex flex-col justify-center items-center  overflow-hidden min-h-max relative hidden md:flex sm:w-100%'>
						<div className='w-full h-full absolute top-0 left-0 z-10'>
							<img src={fondo} alt='fondobolsas' className='w-full h-full opacity-5 bg-cover' />
						</div>
						<div className='z-20'>
							<img src={logo} alt='logo' className='w-[36rem] h-[36rem] ' />
						</div>
					</div>
					{/* División derecha */}
					<div className='bg-verdeSeccionLogin bg-opacity-90 w-full md:w-1/2 p-10  flex flex-col justify-center items-center'>
						<div className='flex md:hidden'><img src={logo} alt='logo' className='w-48 h-48 p-5' /></div>
						<h2 className='text-5xl mb-4 font-poppins font-bold text-white'>INICIO DE SESIÓN</h2>
						<form onSubmit={handleSubmit(onSubmit)} className='w-full text-xl flex flex-col justify-center items-center'>
							<label className='flex flex-col text-white ' htmlFor='correo'> Correo
								<input id='correo'{...register('correo', {required: true})}
									className='w-[20rem] m-1 p-4 bg-white bg-opacity-20 rounded-lg placeholder-white placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro hover:ring-verdeOscuro border-solid hover:border-2 border-verdeOscuro lg:w-[27rem]' placeholder='ejemplo@unal.edu.co' type='email' />
								{errors.correo && <span className='text-red-600'>Este campo es requerido</span>}
							</label>
							<label className='flex flex-col text-white '> Contraseña
								<input {...register('contraseña', {required: true})}
									className='w-[20rem] m-1 p-4 bg-white bg-opacity-20 rounded-lg placeholder-white placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro border-solid hover:border-2 border-verdeOscuro lg:w-[27rem]' placeholder='**********************' type='password'/>
								{errors.contraseña && <span className='text-red-600'>Este campo es requerido</span>}
							</label>
							<button type='submit' className='mt-4 bg-vinotinto text-white text-bold px-4 py-2 rounded border-solid hover:brightness-75 border-gris'>
								INGRESA
							</button>
							<pre>
								{JSON.stringify(watch(), null, 2)}
							</pre>
						</form >
						<div className='font-poppins text-xl flex flex-col justify-center items-center'>
							<p>
								<Link className='text-amarillo hover:invert' to='/RecoverPassword'>Olvidé mi contraseña</Link>
							</p>
							<p className=' text-white'>
								No tienes cuenta? <Link to='/SignUp' className='text-amarillo hover:invert'>Registate</Link>
							</p>
							<p className=' text-white'>
								------- O INGRESA CON --------
							</p>
							<p className='font-poppins text-xl text-white'>
								<button>Google</button>
							</p>
							<div >
								<Footer></Footer>
							</div>
						</div>
					</div>
				</div>

			</div>
		</>
	);
};

export default Login;
