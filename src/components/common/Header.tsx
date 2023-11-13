'use client';
import type React from 'react';
import {useState, useEffect} from 'react';
import logoMini from '../../assets/logo_mini.png';
import {ShoppingCartIcon, UserIcon, FavoritesIcon} from '../icons/icons';
import DarkModeToggle from './DarkModeToggle';
import useDarkMode from '../../hooks/useDarkMode';
import Link from 'next/link';
import {type CategoryType} from '../../types/CRUD/CategoriesSchema';
import {getCategories} from '../../api/categories';
import {useRouter} from 'next/navigation';
type Event = React.ChangeEvent<HTMLInputElement>;
type SearchFilters = {
	name: string;
	category: string;
	// Otros campos...
};

const Header = () => {
	const router = useRouter();
	const [searchFilters, setSearchFilters] = useState({
		name: '',
		category: '',
	});

	// Función para manejar cambios en los filtros de búsqueda
	const handleFilterChange: React.ChangeEventHandler<HTMLSelectElement> = event => {
		const {name, value} = event.target;
		setSearchFilters({
			...searchFilters,
			[name]: value,
		});
	};


	// Función para realizar la búsqueda y redirigir a la página de resultados
	const handleSearchSubmit: React.FormEventHandler<HTMLFormElement> = e => {
		e.preventDefault(); // Previene el envío predeterminado del formulario
		// Construye la URL de búsqueda con los parámetros name y category
		const searchQuery = `/search?name=${searchFilters.name}&category=${searchFilters.category}`;

		// Redirige a la página de resultados con los filtros adecuados
		router.push(searchQuery);
	};

	const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
		const {name, value} = event.target;
		setSearchFilters({
			...searchFilters,
			[name]: value,
		});
	};

	const [categories, setCategories] = useState<CategoryType[]>([]);
	const {modoOscuro, toggleModoOscuro} = useDarkMode();

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const categoriesData = await getCategories();
				setCategories(categoriesData);
			} catch (error) {
				console.error('Error al obtener categorías:', error);
			}
		};

		fetchCategories().catch(error => {
			console.error('Error al cargar productos:', error);
		});
	}, []);
	return (
		<header className='z-20 top-0 left-0 right-0 flex flex-col p-4 fixed bg-verdeClaro text-poppins dark:bg-verdeOscuro'>
			{/* Encabezado superior con logotipo y elementos de navegación */}
			<div className='flex justify-between items-center'>
				<div className='flex flex-col items-start space-x-4 md:flex-row md:items-center'>
					<Link href='/'>
						<img src={logoMini.src} alt='Logo' className='w-28' />
					</Link>
					<div className='hidden md:flex flex-grow-0 bg-white rounded-lg p-0 shadow-md max-w-md h-full text-verdeOscuro lg:flex-grow-0-hidden '>
						<form className='flex items-center space-x-5 'onSubmit={handleSearchSubmit}>
							<select
								name='category'
								onChange={handleFilterChange}
								className='w-full max-w-4xl rounded-full bg-white ml-3'
							>
								<option value=''>Categorías</option>
								{categories.map(category => (
									<option key={category._id} value={category._id}>
										{category.name}
									</option>
								))}
							</select>
							<input
								name='name'
								type='text'
								className=' flex-grow p-1 rounded-lg w-full max-w-4xl placeholder:text-verdeOscuro'
								placeholder='Estoy buscando... '
								onChange={handleInputChange}
							/>
							<button type='submit' className='px-3 py-2 bg-blue-500 text-white rounded-lg '>Buscar</button>
						</form>
					</div>
				</div>
				<nav className='flex items-center space-x-5 text-verdeOscuro'>
					<Link href='/favorites'>
						<FavoritesIcon />
					</Link>
					<Link href='/profile'>
						<UserIcon />
					</Link>
					<Link href='/Cart'>
						<ShoppingCartIcon />
					</Link>
					<DarkModeToggle modoOscuro={modoOscuro} toggleModoOscuro={toggleModoOscuro} />
				</nav>
			</div>
			<div className='flex md:hidden flex-grow-0  rounded-lg p-0 shadow-md max-w-md h-full text-verdeOscuro lg:flex-grow-0-hidden '>
				<form className='flex items-center space-x-5 ' onSubmit={handleSearchSubmit}>
					<select
						onChange={handleFilterChange}
						name='category'
						className='w-full max-w-4xl  border rounded-full'
					>
						<option className='bg-white '>Categorías</option>
						{categories.map(category => (
							<option className='bg-white' key={category._id} value={category._id}>
								{category.name}
							</option>
						))}
					</select>

					<input
						name='name'
						type='text'
						className=' flex-grow p-1 rounded-lg w-full max-w-4xl placeholder:text-verdeOscuro'
						placeholder='Estoy buscando... '
						onChange={handleInputChange}
						// TODO por implementar
						// value={searchQuery}
						// onChange={handleSearchInputChange}
					/>
					<button type='submit' className='px-2 py-2  bg-blue-500 text-white rounded-lg hover:bg-blue-600'>Buscar</button>
				</form>
			</div>
			{/* Barra de búsqueda y filtros */}

		</header>
	);
};

export default Header;
