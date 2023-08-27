// ForgotPassword.tsx
import React from 'react';
import fondo from '../../assets/fondo.jpg';
import logomini from '../../assets/logomini.png'
import {useForm} from 'react-hook-form';
import axios from 'axios';
import Cookies from 'js-cookie';
import Footer from '../../components/common/Footer';
import bcrypt from 'bcryptjs';




type ApiResponse = {
	accessToken: string;
	refreshToken: string;
};
type RequestData = {
	correo: string;
	contraseña: string;
};

const forgotPassword = (): JSX.Element => {

	const	{register, handleSubmit, formState: {errors}, watch} = useForm();

	const onSubmit = async (data: RequestData) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
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

	return(
		<>
			<header className="flex justify-end  items-end bg-verdeClaro bg-opacity-75 ">
				<div className='flex justify-end'>
					<img src={logomini} alt="Logo" className="w-400 h-400 mx-auto my-4"/>
				</div>
  				
			</header>


			<main>
				
				<section className='flex h-screen bg-verdeClaro bg-opacity-75'>
					<div className='w-full h-full absolute top-0 left-0 z-10'>
						<img src={fondo} alt='fondobolsas' className='w-full h-full opacity-5 bg-cover' />
						<footer>
							<Footer/>
						</footer>
					</div>
					


					<div className="flex justify-center items-center h-screen w-full h-full absolute top-0 left-0 z-30 ">
						<div className="bg-gray p-8">
							<h2 className='text-4xl mb-4 font-poppins font-bold text-white'>RECUPERAR LA CONTRASEÑA</h2>
							<div className='bg-gray-300 p-8 rounded-lg shadow-md '>	
								<form onSubmit={handleSubmit(onSubmit)} className='w-full text-xl flex flex-col justify-center items-center'>
									<label className='flex flex-col text-black font-nunito text-xl ' htmlFor='correo'> Ingresa tu correo electronico para buscar tu cuenta
										<input id='correo'{...register('correo', {required: true})}
											className='w-[20rem] m-1 p-4 bg-white bg-opacity-20 rounded-lg placeholder-white placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro hover:bg-opacity-30 lg:w-[27rem]' placeholder='ejemplo@unal.edu.co' type='email' />
										
									</label>
									<button type='submit' className='mt-4 bg-green-300 text-white text-bold px-4 py-2 rounded border-solid hover:brightness-125 border-gris'>
											Buscar
									</button>
								</form>

							</div>
						</div>

					</div>
				</section>	


				

			</main>




		</>
	);

}

		


export default forgotPassword;
