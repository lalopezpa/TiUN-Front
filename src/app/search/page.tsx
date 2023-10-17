/* eslint-disable @typescript-eslint/naming-convention */
'use client';
import React, {useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import {API} from '../../api/api';
import {type ProductType} from '../../types/CRUD/ProductSchema';
const ProductList = (): JSX.Element => {
	const [products, setProducts] = useState<ProductType[]>([]);
	const [pageNumber, setPageNumber] = useState(0);
	const [filters, setFilters] = useState({
		category: '', // Agrega más opciones según tus necesidades
		priceMin: '',
		priceMax: '',
		sort: 'relevancia',
		seller_id: '',
		name: '',
		discountMin: '',
	});

	const itemsPerPage = 7;
	const pageCount = Math.ceil(products.length / itemsPerPage);
	const displayedProducts = products.slice(
		pageNumber * itemsPerPage,
		(pageNumber + 1) * itemsPerPage,
	);

	const handlePageClick = ({selected}: {selected: number}) => {
		setPageNumber(selected);
	};

	const fetchProducts = async () => {
		try {
			const queryParameters = new URLSearchParams(filters).toString();
			const response = await fetch(`https://backend-6fx2.vercel.app/productsby?${queryParameters}`);
			if (response.ok) {
				const data = await response.json() as ProductType[];
				console.log(data);
				setProducts(data);
			} else {
				console.error('Error al obtener productos');
			}
		} catch (error) {
			console.error('Error al obtener productos', error);
		}
	};

	useEffect(() => {
		(async () => {
			try {
				await fetchProducts();
			} catch (error) {
				console.error('Error al obtener productos', error);
			}
		})();
	}, [filters]);

	return (
		<>
			<Header />
			<div className='flex flex-col justify-between pt-16 min-h-screen max-h-max'>
				<div className='bg-gray-100 dark:bg-gray-900 py-8 flex flex-col'>
					<div className='container mx-auto px-4 flex-grow'>
						<div className='flex'>
							<div className='w-1/4 p-4'>
								{/* Barra lateral de filtros */}
								<div className='mb-6'>
									<label className='text-gray-600 dark:text-gray-400'>Categoría</label>
									<select
										className='block w-full mt-1 border rounded-lg shadow-sm focus:border-blue-500 dark:focus:border-blue-400'
										value={filters.category}
										onChange={e => {
											setFilters({...filters, category: e.target.value});
										}}
									>
										<option value=''>Todas</option>
										<option value='nuevo'>Nuevo</option>
										<option value='usado'>Usado</option>
									</select>
								</div>
								<div className='mb-6'>
									<label className='text-gray-600 dark:text-gray-400'>Precio</label>
									<div className='flex'>
										<input
											type='text'
											placeholder='Mínimo'
											className='block w-1/2 mt-1 border rounded-l-lg shadow-sm focus:border-blue-500 dark:focus:border-blue-400'
											value={filters.priceMin}
											onChange={e => {
												setFilters({...filters, priceMin: e.target.value});
											}}
										/>
										<input
											type='text'
											placeholder='Máximo'
											className='block w-1/2 mt-1 border rounded-r-lg shadow-sm focus:border-blue-500 dark:focus:border-blue-400'
											value={filters.priceMax}
											onChange={e => {
												setFilters({...filters, priceMax: e.target.value});
											}}
										/>
									</div>
								</div>
								<div className='mb-6'>
									<label className='text-gray-600 dark:text-gray-400'>Vendedor</label>
									<input
										type='text'
										className='block w-full mt-1 border rounded-lg shadow-sm focus:border-blue-500 dark:focus:border-blue-400'
										value={filters.seller_id}
										onChange={e => {
											setFilters({...filters, seller_id: e.target.value});
										}}
										placeholder='ID del vendedor'
									/>
								</div>
								<div className='mb-6'>
									<label className='text-gray-600 dark:text-gray-400'>Nombre del producto</label>
									<input
										type='text'
										className='block w-full mt-1 border rounded-lg shadow-sm focus:border-blue-500 dark:focus:border-blue-400'
										value={filters.name}
										onChange={e => {
											setFilters({...filters, name: e.target.value});
										}}
										placeholder='Nombre del producto'
									/>
								</div>
								<div className='mb-6'>
									<label className='text-gray-600 dark:text-gray-400'>Descuento mínimo</label>
									<input
										type='number'
										className='block w-full mt-1 border rounded-lg shadow-sm focus:border-blue-500 dark:focus:border-blue-400'
										value={filters.discountMin}
										onChange={e => {
											setFilters({...filters, discountMin: e.target.value});
										}}
										placeholder='Descuento mínimo'
									/>
								</div>
								<div>
									<button
										className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
										onClick={fetchProducts}
									>
                    Aplicar filtros
									</button>
								</div>
							</div>
							<div className='w-3/4 flex-grow'>
								<h1 className='text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6'>
                  Lista de Productos
								</h1>
								<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
									{displayedProducts.map(product => (
										<div
											key={product._id}
											className='bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden'
										>
											<img
												src={product.imageUrl}
												alt={product.name}
												className='w-full h-48 object-cover object-center'
											/>
											<div className='p-4'>
												<h2 className='text-2xl text-gray-800 dark:text-gray-200 font-semibold'>
													{product.name}
												</h2>
												<p className='text-gray-600 dark:text-gray-400'>{product.description}</p>
												<p className='mt-2 text-black font-bold'>${product.price}</p>
											</div>
										</div>
									))}
								</div>
								<ReactPaginate
									previousLabel={'Anterior'}
									nextLabel={'Siguiente'}
									pageCount={Math.ceil(products.length / 10)}
									onPageChange={handlePageClick}
									containerClassName={'flex justify-center items-center my-6'}
									previousLinkClassName={'border rounded-full p-2 px-4 mx-2 cursor-pointer text-black dark:text-slate-100 hover-bg-gray-200'}
									nextLinkClassName={'border rounded-full p-2 px-4 mx-2 cursor-pointer text-black  dark:text-slate-100 hover-bg-gray-200'}
									disabledClassName={'cursor-not-allowed text-gray-400'}
									activeClassName={'bg-verdeClaro text-white rounded-full p-2 px-4 mx-2 cursor-pointer'}
									pageClassName={'cursor-pointer rounded-full p-2 px-4 mx-2 hover-bg-gray-200'}
								/>
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
};

export default ProductList;
