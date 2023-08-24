// Login.tsx
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import fondo from '../../assets/fondo.jpg';
import logo from '../../assets/Logotipo..png';
const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = (event: React.FormEvent) => {
		event.preventDefault();
		// Implement your login logic here
		// You can use the 'email' and 'password' state values for login
	};

	return (
		<>
			<div className='bg-white'>
				<div className='flex h-screen bg-verdeClaro bg-opacity-75'>
					{/* División izquierda */}
					<div className='w-1/2 flex flex-col justify-center items-center max-h-min overflow-hidden min-h-max relative hidden md:flex'>
						<div className='w-full h-full absolute top-0 left-0 z-10'>
							<img src={fondo} alt='fondobolsas' className='w-full h-full opacity-5 bg-cover' />
						</div>
						<div className='z-20'>
							<img src={logo} alt='logo' className='w-[36rem] h-[36rem] ' />
						</div>
					</div>
					{/* División derecha */}
					<div className='bg-verdeSeccionLogin bg-opacity-90 w-full md:w-1/2 p-10  flex flex-col justify-center items-center'>
						<div className='flex  md:hidden'><img src={logo} alt='logo' className='w-48 h-48 p-5' /></div>
						<h2 className='text-5xl mb-4 font-poppins font-bold text-white'>INICIO DE SESIÓN</h2>
						<form onSubmit={handleLogin} className='w-full text-xl flex flex-col justify-center items-center'>
							<div className='relative'>
								<input className='w-full m-1 p-4 bg-white bg-opacity-20 rounded-lg placeholder-white placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro' placeholder='Correo/Usuario' value={email} onChange={e => {
									setEmail(e.target.value);
								} } />
							</div>
							<div className='relative'>
								<input className='w-full m-1 p-4 bg-white bg-opacity-20 rounded-lg placeholder-white placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro' placeholder='Contraseña' type='password' value={password} onChange={e => {
									setPassword(e.target.value);
								} } />
							</div>
							<button type='submit' className='mt-4 bg-vinotinto text-white text-bold px-4 py-2 rounded'>
								INGRESA
							</button>
						</form>
						<div className='font-poppins text-xl flex flex-col justify-center items-center'>
							<p>
								<Link className='text-amarillo' to='/RecoverPassword'>Olvidé mi contraseña</Link>
							</p>
							<p className=' text-white'>
								No tienes cuenta? <Link to='/SignUp' className='text-amarillo'>Registate</Link>
							</p>
							<p className=' text-white'>
								------- O INGRESA CON --------
							</p>
							<p className='font-poppins text-xl text-white'>
								<button>Google</button>
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
