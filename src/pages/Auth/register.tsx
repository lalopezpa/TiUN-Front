// Register.tsx
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import DarkModeToggle from '../../components/common/DarkModeToggle';
import useDarkMode from '../../hooks/useDarkMode';
const Register = () => {
	const {modoOscuro, toggleModoOscuro} = useDarkMode();
	return (
		<>
			<header className='fixed top-0 left-0 w-full p-4 bg-transparent z-50'>
				<div className='flex justify-between'>
					<Link to='/home' className='text-white  '>Inicio</Link>
					<DarkModeToggle modoOscuro={modoOscuro } toggleModoOscuro={toggleModoOscuro} />
				</div>
			</header>
			<main>
				<h1>hola</h1>
			</main>
		</>
	);
};

export default Register;
