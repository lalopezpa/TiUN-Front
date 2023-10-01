/* eslint-disable no-warning-comments */
'use client';
import React, {useState} from 'react';
import logoMini from '../../assets/logo_mini.png';
import {ShoppingCartIcon, UserIcon, FavoritesIcon} from '../icons/icons';
import DarkModeToggle from './DarkModeToggle';
import useDarkMode from '../../hooks/useDarkMode';
import Link from 'next/link';
const Header = () => {
	const {modoOscuro, toggleModoOscuro} = useDarkMode();
	// console.log(modoOscuro);
	// TODO Para implementar
	// const [selectedCategory, setSelectedCategory] = useState('');
	// const [searchQuery, setSearchQuery] = useState('');

	// const handleCategoryChange = (event) => {
	// 	setSelectedCategory(event.target.value);
	// };

	// const handleSearchInputChange = (event) => {
	// 	setSearchQu	ery(event.target.value);
	// };

	const handleSearchSubmit = () => {
		// TODO  agregar la lógica para realizar la búsqueda
		// console.log(`Categoría: ${selectedCategory}, Búsqueda: ${searchQuery}`);
	};

	return (
		<header className=' z-20 top-0 left-0 right-0 flex justify-between items-center p-4  fixed  bg-verdeClaro text-poppins dark:bg-verdeOscuro'>
			<div className='flex items-center space-x-4'>
				<DarkModeToggle modoOscuro={modoOscuro} toggleModoOscuro={toggleModoOscuro} />
				<div className='flex-grow-0 bg-white p-2 rounded-lg shadow-md  text-verdeOscuro lg:flex-grow-0-hidden '>
					<form className='flex items-center space-x-5 '>
						<select className='bg-white rounded-lg' // TODO por implementar
							// value={selectedCategory}
							// onChange={handleCategoryChange}
						>
							<option value=''>Todas las categorías</option>
							<option value='categoria1'>Categoría 1</option>
							<option value='categoria2'>Categoría 2</option>
							{/* Agrega más opciones de categorías según sea necesario */}
						</select>
						<input
							type='text'
							className=' flex-grow p-1 rounded-lg  placeholder:text-verdeOscuro'
							placeholder='Estoy buscando... '
							// TODO por implementar
							// value={searchQuery}
							// onChange={handleSearchInputChange}
						/>
					</form>
				</div>
			</div>
			<nav className='flex items-center space-x-5 text-verdeOscuro'>
				<Link href='/Favorites'>	<FavoritesIcon/></Link>
				<Link href='/profile'><UserIcon/> </Link>
				<Link href='/Cart'><ShoppingCartIcon/> </Link>
				<Link href='/'><img src= {logoMini.src} alt='Logo' className='w-28' /> </Link>
			</nav>
		</header>
	);
};

export default Header;
