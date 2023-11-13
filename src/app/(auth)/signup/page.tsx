'use client';
import React, {useRef} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import DarkModeToggle from '../../../components/common/DarkModeToggle';
import useDarkMode from '../../../hooks/useDarkMode';
import FooterLogin from '../../../components/common/FooterLogin';
import {useForm, type SubmitHandler} from 'react-hook-form';
import Background from '../../../components/common/Background';
import {useAuth} from '../../../context/authContext';
import {Toaster, toast} from 'sonner';
import {type UserRegisterData} from '../../../types/UserRegisterSchema';
import {type UserType} from '../../../types/UserSchema';
import {ref, uploadBytes, getDownloadURL, deleteObject} from 'firebase/storage';
import {storage} from '../../../firebase/config';
import {getUser} from '../../../api/auth';
import logo from '../../../assets/logo.png';
import logooscuro from '../../../assets/logo_oscuro.png';
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
			<main className='flex min-h-screen bg-verdeClaro bg-opacity-75 dark:bg-verdeOscuro md:full'>
				<header className='fixed top-0 left-0 w-full p-4 bg-transparent z-50'>
					<div className='flex justify-between'>
						<Link href='/' className='text-white'>Inicio</Link>
						<DarkModeToggle modoOscuro={modoOscuro } toggleModoOscuro={toggleModoOscuro}/>
					</div>
				</header>
				{/* División izquierda */}
				<section className='w-1/2  flex-col justify-center items-center overflow-hidden min-h-max relative hidden md:flex sm:w-100%'>
					<div className='w-full h-full absolute top-0 left-0 z-10'>
						<Background modoOscuro={modoOscuro} />
					</div>
					<figure className='z-20'>
						<img src={modoOscuro ? logooscuro.src : logo.src} alt='logo'loading='lazy' className='w-[24rem] h-[24rem] px-4 lg:w-[36rem] lg:h-[36rem] lg:px-0' />
					</figure>
				</section>
				{/* División derecha */}
				<section className='bg-verdeSeccionLogin bg-opacity-90 w-full md:w-1/2 p-10 pb-0 flex flex-col justify-between items-center dark:bg-verdeOscuro'>
					<form onSubmit={handleSubmit(onSubmit)} className='w-full text-xl flex flex-col justify-center items-center'>
						<div className='w-full h-full absolute top-0 left-0 -z-20'>
							<Background modoOscuro={modoOscuro} />
						</div>
						<h2 className='text-5xl mb-4 font-poppins font-bold text-white'>REGISTRO</h2>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							<div className='flex flex-col text-white'>
								<label className='text-black placeholder-black dark:text-white dark:placeholder-white'>Nombres</label>
								<input
									type='text'
									placeholder='Nombres'
									className='w-full p-4 bg-white bg-opacity-20 rounded-lg placeholder-black text-black placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-verdeOscuro dark:text-white dark:placeholder-white'
									{...register('username', {
										required: 'El Nombre es requerido',
										maxLength: {value: 20, message: 'El nombre no debe ser mayor a 20 caracteres'},
										minLength: {value: 2, message: 'El nombre debe ser mayor a 2 caracteres'},
									})}
								/>
								{errors.username?.type === 'required' && <span className='text-red-600 font-poppins'>Nombre requerido</span>}
								{errors.username?.type === 'maxLength' && (
									<span className='text-red-600 font-poppins'>El nombre no debe ser mayor a 20 caracteres</span>
								)}
								{errors.username?.type === 'minLength' && (
									<span className='text-red-600 font-poppins'>El nombre debe ser mayor a 2 caracteres</span>
								)}
							</div>
							<div className='flex flex-col text-white'>
								<label className='text-black placeholder-black dark:text-white dark:placeholder-white'>Apellidos</label>
								<input
									type='text'
									placeholder='Apellidos'
									className='w-full p-4 bg-white bg-opacity-20 rounded-lg placeholder-black text-black placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-verdeOscuro dark:text-white dark:placeholder-white'
									{...register('lastname', {
										required: 'El Apellido es requerido',
										maxLength: {value: 20, message: 'El apellido no debe ser mayor a 20 caracteres'},
										minLength: {value: 2, message: 'El apellido debe ser mayor a 2 caracteres'},
									})}
								/>
								{errors.lastname?.type === 'required' && <span className='text-red-600 font-poppins'>Apellido requerido</span>}
								{errors.lastname?.type === 'maxLength' && (
									<span className='text-red-600 font-poppins'>El apellido no debe ser mayor a 20 caracteres</span>
								)}
								{errors.lastname?.type === 'minLength' && (
									<span className='text-red-600 font-poppins'>El apellido debe ser mayor a 2 caracteres</span>
								)}
							</div>
							<div className='flex flex-col text-white'>
								<label className='text-black placeholder-black dark:text-white dark:placeholder-white'>Cédula</label>
								<input
									type='number'
									placeholder='Cédula'
									className='w-full p-4 bg-white bg-opacity-20 rounded-lg placeholder-black text-black placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-verdeOscuro dark:text-white dark:placeholder-white appearance-none'
									{...register('id_cedula', {
										required: 'La cédula es requerida',
										pattern: {
											value: /^[1-9]{1}\d{5,10}$/,
											message: 'Cédula no válida',
										},
									})}
								/>
								{errors.id_cedula && typeof errors.id_cedula.message === 'string' && (
									<span className='text-red-600 font-poppins'>{errors.id_cedula.message}</span>
								)}
							</div>
							<div className='flex flex-col text-white'>
								<label className='text-black placeholder-black dark:text-white dark:placeholder-white'>Teléfono</label>
								<input
									type='tel'
									placeholder='Teléfono'
									className='w-full p-4 bg-white bg-opacity-20 rounded-lg placeholder-black text-black placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-verdeOscuro dark:text-white dark:placeholder-white'
									{...register('phoneNumber', {
										required: 'El teléfono es requerido',
										pattern: {
											value: /^[2-9]\d{9}$/,
											message: 'Número no válido',
										},
									})}
								/>
								{errors.phoneNumber && typeof errors.phoneNumber.message === 'string' && (
									<span className='text-red-600 font-poppins'>{errors.phoneNumber.message}</span>
								)}
							</div>
							<div className='flex flex-col text-white'>
								<label className='text-black placeholder-black dark:text-white dark:placeholder-white'>Correo</label>
								<input
									type='email'
									placeholder='Correo'
									className='w-full p-4 bg-white bg-opacity-20 rounded-lg placeholder-black text-black placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-verdeOscuro dark:text-white dark:placeholder-white'
									{...register('email', {
										required: 'Correo es requerido',
										pattern: {
											value: /^[a-zA-Z0-9_.+-]+@unal\.edu\.co$/,
											message: 'Debes registrarte con un correo institucional',
										},
									})}
								/>
								{errors.email && typeof errors.email.message === 'string' && (
									<span className='text-red-600 font-poppins'>{errors.email.message}</span>
								)}
							</div>
							<div className='flex flex-col text-white'>
								<label className='text-black placeholder-black dark:text-white dark:placeholder-white'>Contraseña</label>
								<input
									type='password'
									placeholder='Contraseña'
									className='w-full p-4 bg-white bg-opacity-20 rounded-lg placeholder-black text-black placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-verdeOscuro dark:text-white dark:placeholder-white'
									{...register('password', {
										required: 'La Contraseña es requerida',
										minLength: {value: 6, message: 'La Contraseña debe ser mayor a 6 caracteres'},
										maxLength: {value: 20, message: 'La Contraseña debe ser máximo de 20 caracteres'},
									})}
								/>
								{errors.password && typeof errors.password.message === 'string' && (
									<span className='text-red-600 font-poppins'>{errors.password.message}</span>
								)}
							</div>
							<div className='flex flex-col text-white'>
								<label className='text-black placeholder-black dark:text-white dark:placeholder-white'>Confirmar contraseña</label>
								<input
									type='password'
									placeholder='Confirmar contraseña'
									className='w-full p-4 bg-white bg-opacity-20 rounded-lg placeholder-black text-black placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-verdeOscuro dark:text-white dark:placeholder-white'
									{...register('confirmarcontraseña', {
										required: 'Confirmar la contraseña es requerido',
										minLength: {value: 6, message: 'Confirmar contraseña debe ser mayor a 6 caracteres'},
										validate: value => (value === password.current ? true : 'Las contraseñas no coinciden'),
									})}
								/>
								{errors.confirmarcontraseña && typeof errors.confirmarcontraseña.message === 'string' && (
									<span className='text-red-600 font-poppins'>{errors.confirmarcontraseña.message}</span>
								)}
							</div>
							<div className='flex flex-col mt-4'>
								<label className='text-black placeholder-black dark:text-white text-xl mb-2 font-poppins'>Foto de perfil (opcional)</label>
								<div className='flex items-center'>
									<label className='text-black text-opacity-70 placeholder-black bg-white bg-opacity-20 rounded-lg p-3 dark:text-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-verdeOscuro dark:placeholder-white cursor-pointer hover:bg-opacity-30'>
          Subir archivo
										<input type='file' accept='image/*' {...register('imageUrl')} className='placeholder-opacity-70 hidden' />
									</label>
								</div>
							</div>

						</div>
						<div className='flex flex-col'>
							<div className='flex'>
								<label className='w-4 pr-5'>
									<input
										type='checkbox'
										className='border-2 border-gris rounded mb-4'
										{...register('aceptaTerminos', {
											required: 'Aceptar los términos es requerido',
										})}
									/>
								</label>
								<div className='font-poppins text-xl'>
									<p className='text-black placeholder-black dark:text-white'>Estoy de acuerdo con los</p> <Link href='/politics' className='text-amarillo hover:invert' target='_blank'>
  Términos y Condiciones
									</Link>

								</div>
							</div>
						</div>
						{errors.aceptaTerminos && typeof errors.aceptaTerminos.message === 'string' && (
							<span className='text-red-600 font-poppins px-10 mt-2'>{errors.aceptaTerminos.message}</span>
						)}
						<button type='submit' className='my-4 bg-vinotinto text-white text-bold px-4 py-2 rounded border-solid hover:brightness-125 border-gris'>
    REGISTRATE
						</button>
					</form>
					<FooterLogin/>
				</section>
			</main>
			<Toaster richColors visibleToasts={1} closeButton/>
		</>
	);
};

export default Register;
