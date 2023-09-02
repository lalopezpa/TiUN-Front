// ForgotPassword.tsx
import React from 'react';
import fondo from '../../assets/fondo.jpg';
import logomini from '../../assets/logomini.png';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import Cookies from 'js-cookie';
import Footer from '../../components/common/Footer';
import {Link} from 'react-router-dom';

type ApiResponse = {
	accessToken: string;
};
type RequestData = {
	correo: string;
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
			correo: data.correo,
		};
		// 1console.log(requestData);

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
		<>
			<header className='flex justify-end  items-end bg-verdeClaro bg-opacity-75 '>
				<div className='flex justify-end'>
					<img src={logomini} alt='Logo' className='w-400 h-400 mx-auto my-4' />
				</div>
			</header>

			<main>
				<section className='flex h-screen bg-verdeClaro bg-opacity-75'>
					<div className='w-full h-full absolute top-0 left-0 z-10'>
						<img
							src={fondo}
							alt='fondobolsas'
							className='w-full h-full opacity-5 bg-cover'
						/>
						<footer>
							<Footer />
						</footer>
					</div>

					<div className='flex justify-center items-center h-screen w-full h-full absolute top-0 left-0 z-30 '>
						<div className='bg-gray p-8 rouded-full'>
							<h2 className='flex justify-center items-center text-4xl mb-4 font-poppins font-bold text-white'>
								RECUPERAR LA CONTRASEÑA
							</h2>
							<div className='bg-gray-300 p-8 rounded-lg shadow-md '>
								<form
									onSubmit={handleSubmit(onSubmit)}
									className='w-full text-xl flex flex-col '
								>
									<div className='flex justify-center items-center'>
										<label
											className='flex justify-center items-center flex-col text-black font-italic text-xl '
											htmlFor='correo'
										>
											Comprueba si recibiste en el telefono un mensaje de texto
											con un código de 6 caracteres.
											<input
												id='correo'
												{...register('correo', {required: true})}
												className=' flex justify-center items-center w-[20rem] m-1 p-4 bg-verdeSeccionLogin text-white  rounded-full placeholder-white placeholder-opacity-70  hover:bg-black placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro hover:bg-opacity-30 lg:w-[27rem]'
												placeholder='Código'
												type='email'
											/>
										</label>
									</div>
									<div className='flex justify-end items-end'>
										<p>
											<Link
												className='text-amarillo hover:invert'
												to='/RecoverPassword'
											>
												¿No recibiste el código?
											</Link>
										</p>
										<button
											type='submit'
											className='mt-4 bg-vinotinto text-white text-bold px-7 py-2 rounded-full border-solid hover:brightness-125 border-gris ml-2'
										>
											CANCELAR
										</button>

										<button
											type='submit'
											className='mt-4 bg-verdeSeccionLogin text-white text-bold px-7 py-2 rounded-full border-solid hover:brightness-125 border-gris ml-2'
										>
											CONTINUAR
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
};

export default forgotPasswordValidate;
