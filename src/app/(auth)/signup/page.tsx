'use client';
import React, {useRef} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import DarkModeToggle from '../../../components/common/DarkModeToggle';
import useDarkMode from '../../../hooks/useDarkMode';
import Footer from '../../../components/common/Footer';
import {useForm, type SubmitHandler} from 'react-hook-form';
import Background from '../../../components/common/Background';
import {useAuth} from '../../../context/authContext';
import {Toaster, toast} from 'sonner';
import {type UserRegisterData} from '../../../types/UserRegisterSchema';
import {type UserType} from '../../../types/UserSchema';
import {ref, uploadBytes, getDownloadURL, deleteObject} from 'firebase/storage';
import {storage} from '../../../firebase/config';
import {getUser} from '../../../api/auth';

const Register = (): JSX.Element => {
	const {modoOscuro, toggleModoOscuro} = useDarkMode();
	const {register, handleSubmit, formState: {errors}, watch} = useForm();
	const password = useRef('');
	const {signup} = useAuth();
	const router = useRouter();
	password.current = watch('password', {value: ''}) as string;

	const onSubmit: SubmitHandler<any> = async (data: UserRegisterData) => {
		console.log(data);
		const user: UserType | undefined = await getUser();
		let imageFile: File | undefined;
		let storageRef = null;
		let imageUrl = null;
		const userFolderPath = `Usuarios/${user?._id}/Profilepic`; // Carpeta del usuario
		if (data.imageUrl) {
			if (data.imageUrl instanceof FileList && data.imageUrl.length > 0) {
				imageFile = data.imageUrl[0];
			}
		}

		try {
			if (imageFile instanceof File) {
				storageRef = ref(storage, `${userFolderPath}/${imageFile.name}`);

				const snapshot = await uploadBytes(storageRef, imageFile);

				imageUrl = await getDownloadURL(storageRef);
				console.log(imageUrl);
				data.imageUrl = imageUrl;
			}

			const registrationResult = await signup(data);

			if (registrationResult?.userData) {
				// Registro exitoso, muestra un toast de éxito y redirige
				toast.success('Registro exitoso');
				setTimeout(() => {
					router.push('/');
				}, 2000);
			} else if (registrationResult?.res?.includes('id_cedula_1 dup key')) {
				// Error de cedula duplicada, muestra un toast con el mensaje específico
				toast.error('ERROR', {
					description: 'La cédula ya está en uso',
				});
			} else if (registrationResult?.res?.includes('email_1')) {
				// Error de correo duplicado, muestra un toast con el mensaje específico
				toast.error('ERROR', {
					description: 'El correo ya está en uso',
				});
			} else {
				// Otros errores no reconocidos, muestra un toast genérico
				toast.error('Error en el registro');
				// Console.log(type_error);
			}
		} catch (error) {
			if (imageFile && storageRef) {
				try {
					// Intenta eliminar la imagen en caso de error
					await deleteObject(storageRef);
					console.log('Imagen eliminada de Firebase Storage debido a un error en la petición.');
				} catch (deleteError) {
					console.error('No se pudo eliminar la imagen de Firebase Storage:', deleteError);
				}
			}

			// Error en el registro, muestra un toast genérico
			toast.error('Error desconocido en el registro');
			// Console.error('Error en el registro', error);
		}
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
									className='w-[20rem] m-2 p-4 bg-white bg-opacity-20 rounded-lg placeholder-black  text-black placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro hover:bg-opacity-30 lg:w-[27rem] dark:text-white dark:placeholder-white'
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
									className='w-[20rem] m-2 p-4 bg-white bg-opacity-20 rounded-lg placeholder-black  text-black placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro hover:bg-opacity-30 lg:w-[27rem] dark:text-white dark:placeholder-white'
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
									className='w-[20rem] m-2 p-4 bg-white bg-opacity-20 rounded-lg placeholder-black  text-black placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro hover:bg-opacity-30 lg:w-[27rem] dark:text-white dark:placeholder-white appearance-none'
									{...register('id_cedula', {
										required: {
											value: true,
											message: 'La cédula es requerida',
										},
										pattern: {
											value: /^[1-9]{1}\d{5,10}$/,
											message: 'Cédula no válida',
										},
									})}
								/>
								{errors.id_cedula && typeof errors.id_cedula.message === 'string' && (
									<span className='text-red-600 font-poppins'>{errors.id_cedula.message}</span>
								)}
							</label>
							<label className='flex flex-col text-white'>
								<input
									type='tel'
									placeholder='Teléfono'
									className='w-[20rem] m-2 p-4 bg-white bg-opacity-20 rounded-lg placeholder-black text-black placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro hover:bg-opacity-30 lg:w-[27rem] dark:text-white dark:placeholder-white'
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
								{errors.phoneNumber && typeof errors.phoneNumber.message === 'string' && (
									<span className='text-red-600 font-poppins'>{errors.phoneNumber.message}</span>
								)}
							</label>
						</div>
						<div className='flex flex-col' >
							<label className='flex flex-col text-white'>
								<input
									type='email'
									placeholder='Correo'
									className='w-auto m-2 p-4 bg-white bg-opacity-20 rounded-lg placeholder-black text-black placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro hover:bg-opacity-30 lg:w-[27rem] dark:text-white dark:placeholder-white'
									{...register('email', {
										required: {
											value: true,
											message: 'Correo es requerido',
										},
										pattern: {
											value: /^[a-zA-Z0-9_.+-]+@unal\.edu\.co$/,
											message: 'Debes registrarte con un correo institucional',
										},
									})}
								/>
								{errors.email && typeof errors.email.message === 'string' && (
									<span className='text-red-600 font-poppins'>{errors.email.message}</span>
								)}
							</label>
							<label className='flex flex-col text-white'>
								<input
									type='password'
									placeholder='Contraseña'
									className='w-auto m-2 p-4 bg-white bg-opacity-20 rounded-lg placeholder-black text-black placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro hover:bg-opacity-30 lg:w-[27rem] dark:text-white dark:placeholder-white'
									{...register('password', {
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
								{errors.password && typeof errors.password.message === 'string' && (
									<span className='text-red-600 font-poppins'>{errors.password.message}</span>
								)}
							</label>

							<label className='flex flex-col text-white'>
								<input
									type='password'
									placeholder='Confirmar contraseña'
									className='w-auto m-2 p-4 bg-white bg-opacity-20 rounded-lg placeholder-black text-black placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro hover:bg-opacity-30 lg:w-[27rem] dark:text-white dark:placeholder-white'
									{...register('confirmarcontraseña', {
										required: {
											value: true,
											message: 'Confirmar la contraseña es requerido',
										},
										minLength: {
											value: 6,
											message: 'Confirmar contraseña debe ser mayor a 6 caracteres',
										},
										validate: value =>
											value === password.current || 'Las contraseñas no coinciden',
									})}
								/>
								{errors.confirmarcontraseña && typeof errors.confirmarcontraseña.message === 'string' && (
									<span className='text-red-600 font-poppins'>{errors.confirmarcontraseña.message}</span>
								)}
							</label>

							<label>
								<div className='flex flex-col'>
									<div className='flex'>
										<label className='flex flex-col text-white'> Pudes subir una foto de perfil, es opcional
											<input
												type='file'
												accept='image/*'
												{...register('imageUrl')} // Registra el campo con RHF
											/>
										</label>
									</div>
								</div>
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
													message: 'Para registrarte debes aceptar los términos y condiciones',
												},
											})}
										/>
									</label>
									<div className='font-poppins text-xl flex justify-between items-center'>
										<p className='text-white'>Estoy de acuerdo con los  </p> <Link href={'/politics'} className='text-amarillo hover:invert'> Términos y Condiciones</Link>
									</div>
								</div>
								{errors.aceptaTerminos && typeof errors.aceptaTerminos.message === 'string' && (
									<span className='text-red-600 font-poppins'>{errors.aceptaTerminos.message}</span>
								)}
							</div>
						</div>
						<button
							type='submit'className='mt-4 bg-vinotinto text-white text-bold px-4 py-2 rounded border-solid hover:brightness-125 border-gris'>
							REGISTRATE
						</button>
					</form>
				</main>
				<Footer></Footer>
				<Toaster richColors visibleToasts={1} closeButton/>
			</div>
		</>
	);
};

export default Register;
