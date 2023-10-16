'use client';
// ForgotPassword.tsx
import React from 'react';
import logomini from '../../../assets/logo_mini.png';
import {useForm, type SubmitHandler} from 'react-hook-form';
import Footer from '../../../components/common/Footer';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {sendNewPasswordRequest} from '../../../api/recoverpassword';
type RequestData = {
	newpassword: string;
};

const forgotPasswordValidate = (): JSX.Element => {
	const router = useRouter();
	const {register, handleSubmit, formState: {errors}} = useForm();

	const onSubmit: SubmitHandler<any> = async (data: RequestData) => {
		const requestData = {
			newpassword: data.newpassword,
		};
		try {
			await sendNewPasswordRequest(requestData);
			router.push('/login');
		} catch (error) {
			console.error(error);
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
											htmlFor='nueva_contraseña'
										>
											Crea una contraseña nueva de seis caracteres como minimo.
											<input
												type='password'
												placeholder='Contraseña'
												className='w-auto m-2 p-4 bg-white bg-opacity-20 rounded-lg placeholder-black text-black placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro hover:bg-opacity-30 lg:w-[27rem] dark:text-white dark:placeholder-white'
												{...register('newpassword', {
													required: {
														value: true,
														message: 'La Contraseña es requerida',
													},
													minLength: {
														value: 6,
														message: 'La Contraseña debe ser mayor a 6 caracteres',
													},
													maxLength: {
														value: 20,
														message: 'La Contraseña debe ser máximo de 20 caracteres',
													},
												})}
											/>
											{errors.newpassword && typeof errors.newpassword.message === 'string' && (
												<span className='text-red-600 font-poppins'>{errors.newpassword.message}</span>
											)}
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
											className='mt-4 bg-verdeSeccionLogin text-white text-bold px-7 py-2 rounded-full border-solid hover:brightness-125 border-gris ml-2'										>
												CONTINUAR
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

export default forgotPasswordValidate;
