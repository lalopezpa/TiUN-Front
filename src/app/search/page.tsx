'use client';
import React, {useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import styled from 'styled-components';

// Datos mockeados de productos
const mockProducts = [
	{
		id: 1,
		name: 'Producto 1',
		image: 'https://falabella.scene7.com/is/image/FalabellaCO/7201859_1?wid=800&hei=800&qlt=70',
		description: 'Descripción del Producto 1',
		price: 100, // Precio en dólares, por ejemplo
	},
	{
		id: 2,
		name: 'Producto 2',
		image: 'https://falabella.scene7.com/is/image/FalabellaCO/7201859_1?wid=800&hei=800&qlt=70',
		description: 'Descripción del Producto 2',
		price: 150,
	},
	{
		id: 3,
		name: 'Producto 3',
		image: 'https://falabella.scene7.com/is/image/FalabellaCO/7201859_1?wid=800&hei=800&qlt=70',
		description: 'Descripción del Producto 3',
		price: 75,
	},
	{
		id: 4,
		name: 'Producto 4',
		image: 'https://falabella.scene7.com/is/image/FalabellaCO/7201859_1?wid=800&hei=800&qlt=70',
		description: 'Descripción del Producto 4',
		price: 200,
	},
	{
		id: 5,
		name: 'Producto 5',
		image: 'https://falabella.scene7.com/is/image/FalabellaCO/7201859_1?wid=800&hei=800&qlt=70',
		description: 'Descripción del Producto 5',
		price: 50,
	},
	{
		id: 6,
		name: 'Producto 6',
		image: 'https://falabella.scene7.com/is/image/FalabellaCO/7201859_1?wid=800&hei=800&qlt=70',
		description: 'Descripción del Producto 6',
		price: 125,
	},
	{
		id: 7,
		name: 'Producto 7',
		image: 'https://falabella.scene7.com/is/image/FalabellaCO/7201859_1?wid=800&hei=800&qlt=70',
		description: 'Descripción del Producto 7',
		price: 80,
	},
	{
		id: 8,
		name: 'Producto 8',
		image: 'https://falabella.scene7.com/is/image/FalabellaCO/7201859_1?wid=800&hei=800&qlt=70',
		description: 'Descripción del Producto 8',
		price: 300,
	},
	{
		id: 9,
		name: 'Producto 9',
		image: 'https://falabella.scene7.com/is/image/FalabellaCO/7201859_1?wid=800&hei=800&qlt=70',
		description: 'Descripción del Producto 9',
		price: 95,
	},
	{
		id: 10,
		name: 'Producto 10',
		image: 'https://falabella.scene7.com/is/image/FalabellaCO/7201859_1?wid=800&hei=800&qlt=70',
		description: 'Descripción del Producto 10',
		price: 120,
	},
	{
		id: 11,
		name: 'Producto 11',
		image: 'https://falabella.scene7.com/is/image/FalabellaCO/7201859_1?wid=800&hei=800&qlt=70',
		description: 'Descripción del Producto 11',
		price: 250,
	},
	// Puedes agregar más productos según sea necesario
];

const itemsPerPage = 10; // Cantidad de productos por página
const ProductList = (): JSX.Element => {
	const [products, setProducts] = useState(mockProducts);
	const [pageNumber, setPageNumber] = useState(0);

	const itemsPerPage = 7; // Cambia el número de productos por página según tus necesidades
	const pageCount = Math.ceil(products.length / itemsPerPage);
	const displayedProducts = products.slice(
		pageNumber * itemsPerPage,
		(pageNumber + 1) * itemsPerPage,
	);

	const handlePageClick = ({selected}) => {
		setPageNumber(selected);
	};

	return (
		<>
			<Header />
			<div className='bg-gray-100 dark:bg-gray-900 py-8 flex flex-col'>
				<div className='container mx-auto px-4 flex-grow'>
					<div className='flex'>
						<div className='w-1/4 p-4'>
							{/* Barra lateral de filtros */}
							<div className='mb-6'>
								<label className='text-gray-600 dark:text-gray-400'>Categoría</label>
								<select className='block w-full mt-1 border rounded-lg shadow-sm focus:border-blue-500 dark:focus:border-blue-400'>
									<option value='nuevo'>Nuevo</option>
									<option value='usado'>Usado</option>
								</select>
							</div>
							<div className='mb-6'>
								<label className='text-gray-600 dark:text-gray-400'>Precio</label>
								<select className='block w-full mt-1 border rounded-lg shadow-sm focus:border-blue-500 dark:focus:border-blue-400'>
									<option value='0-100'>$0 - $100</option>
									<option value='100-200'>$100 - $200</option>
									<option value='200-500'>$200 - $500</option>
									<option value='500+'>$500+</option>
								</select>
							</div>
							<div>
								<label className='text-gray-600 dark:text-gray-400'>Ordenar por</label>
								<select className='block w-full mt-1 border rounded-lg shadow-sm focus-border-blue-500 dark:focus-border-blue-400'>
									<option value='relevancia'>Relevancia</option>
									<option value='precio-asc'>Precio Ascendente</option>
									<option value='precio-desc'>Precio Descendente</option>
								</select>
							</div>
						</div>
						<div className='w-3/4 flex-grow'>
							<h1 className='text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6'>
                Lista de Productos
							</h1>
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
								{displayedProducts.map(product => (
									<div
										key={product.id}
										className='bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden'
									>
										<img
											src={product.image}
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
								previousLabel={
									<i className='fas fa-chevron-left mr-2 text-gray-600 dark:text-gray-400'></i>
								}
								nextLabel={
									<i className='fas fa-chevron-right ml-2 text-gray-600 dark:text-gray-400'></i>
								}
								breakLabel={'...'}
								breakClassName={'break-me'}
								pageCount={pageCount}
								marginPagesDisplayed={2}
								pageRangeDisplayed={5}
								onPageChange={handlePageClick}
								containerClassName={'mt-6 flex justify-center'}
								subContainerClassName={'pages pagination'}
								activeClassName={
									'text-blue-500 border-blue-500 dark:text-blue-400 dark:border-blue-400'
								}
								previousClassName={'border rounded-l-full text-gray-600 dark:text-gray-400'}
								nextClassName={'border rounded-r-full text-gray-600 dark:text-gray-400'}
								pageLinkClassName={
									'px-3 py-2 border rounded-full border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover-bg-gray-800'
								}
							/>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default ProductList;

