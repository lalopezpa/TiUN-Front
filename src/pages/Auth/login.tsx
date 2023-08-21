// Login.tsx
import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = (event: React.FormEvent) => {
		event.preventDefault();
		// Implement your login logic here
		// You can use the 'email' and 'password' state values for login
	};

	return (
		<body className='bg-verdeClaro'>
			<div className='flex h-screen'>
				{/* División izquierda */}
				<div className='w-1/2 p-10 bg-white flex flex-col justify-center items-center'>
				</div>

				{/* División derecha */}
				<div className='w-1/2 p-10 bg-verdeClaro flex flex-col justify-center items-center'>
					<h2 className='text-5xl mb-4 font-poppins font-bold text-white'>INICIO DE SESIÓN</h2>
					<form onSubmit={handleLogin} className='w-full text-xl flex flex-col justify-center items-center'>
						<div>
							<label className='font-poppins  text-white'>Correo/Usuario</label>
							<input type='email' value={email} onChange={e => {
								setEmail(e.target.value);
							}} />
						</div>
						<div>
							<label className='font-poppins  text-white'>Contraseña</label>
							<input type='password' value={password} onChange={e => {
								setPassword(e.target.value);
							}} />
						</div>
						<button type='submit' className='mt-4 bg-vinotinto text-white text-bold px-4 py-2 rounded'>
						INGRESA
						</button>
					</form>
					<div className='font-poppins text-xl flex flex-col justify-center items-center'>
						<p >
							<Link className='text-amarillo' to='/forgot-password'>Olvidé mi contraseña</Link>
						</p>
						<p className=' text-white' >
					No tienes cuenta? <Link to='/register' className='text-amarillo' >Registate</Link>
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
		</body>
	);
};

export default Login;
