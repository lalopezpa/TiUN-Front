'use client';
import React, {useState, useEffect} from 'react';
import Header from '../../components/common/Header'; // Reemplaza 'Header' con la ubicación real de tu componente de encabezado.
import Footer from '../../components/common/Footer'; // Reemplaza 'Footer' con la ubicación real de tu componente de pie de página.

import {CRUD} from '../../api/auth'; // Importa el objeto CRUD que contiene tus funciones fetch

const ProductCRUD = () => {
	const [products, setProducts] = useState([]);
	const [newProduct, setNewProduct] = useState({
		name: '',
		description: '',
		price: 0,
		imageUrl: '', // Campo para la URL de la imagen
		categories: [],
		stock: 0,
		discount: 0,
	});
	const [isAdding, setIsAdding] = useState(false);

	useEffect(() => {
		// Cargar productos al inicio
		loadProducts();
	}, []);

	const loadProducts = async () => {
		try {
			const products = await CRUD.getProducts(); // Utiliza la función para obtener productos
			setProducts(products);
		} catch (error) {
			console.error(error);
			// Maneja el error, muestra un mensaje al usuario si es necesario
		}
	};

	const handleAddProduct = async () => {
		try {
			const createdProduct = await CRUD.createProduct(newProduct); // Utiliza la función para crear un producto
			setProducts([...products, createdProduct]);
			setNewProduct({name: '', description: '', price: 0});
			setIsAdding(false);
		} catch (error) {
			console.error(error);
			// Maneja el error, muestra un mensaje al usuario si es necesario
		}
	};

	const handleDeleteProduct = async productId => {
		try {
			await CRUD.deleteProduct(productId); // Utiliza la función para eliminar un producto
			const updatedProducts = products.filter(product => product._id !== productId);
			setProducts(updatedProducts);
		} catch (error) {
			console.error(error);
			// Maneja el error, muestra un mensaje al usuario si es necesario
		}
	};

	return (
		<>
			<Header />
			<div className='container mx-auto px-4 h-screen pt-9'>
				<br />
				<h1 className='text-3xl font-semibold text-gray-800 mb-6'>Administrar Productos</h1>

				{isAdding ? (
					<div className='mb-6'>
						<input
							type='text'
							placeholder='Nombre del producto'
							value={newProduct.name}
							onChange={e => {
								setNewProduct({...newProduct, name: e.target.value});
							}}
							className='w-full p-2 mb-2 border rounded focus:border-blue-500'
						/>
						<input
							type='text'
							placeholder='Descripción del producto'
							value={newProduct.description}
							onChange={e => {
								setNewProduct({...newProduct, description: e.target.value});
							}}
							className='w-full p-2 mb-2 border rounded focus:border-blue-500'
						/>
						<input
							type='number'
							placeholder='Precio del producto'
							value={newProduct.price}
							onChange={e => {
								setNewProduct({...newProduct, price: parseFloat(e.target.value)});
							}}
							className='w-full p-2 mb-2 border rounded focus:border-blue-500'
						/>
						<input
							type='text'
							placeholder='URL de la imagen del producto'
							value={newProduct.imageUrl}
							onChange={e => {
								setNewProduct({...newProduct, imageUrl: e.target.value});
							}}
							className='w-full p-2 mb-2 border rounded focus:border-blue-500'
						/>
						<input
							type='text'
							placeholder='Categorías (separadas por comas)'
							value={newProduct.categories}
							onChange={e => {
								const categories = e.target.value.split(',').map(category => category.trim());
								setNewProduct({...newProduct, categories});
							}}
							className='w-full p-2 mb-2 border rounded focus:border-blue-500'
						/>
						<input
							type='number'
							placeholder='Stock del producto'
							value={newProduct.stock}
							onChange={e => {
								setNewProduct({...newProduct, stock: parseInt(e.target.value)});
							}}
							className='w-full p-2 mb-2 border rounded focus:border-blue-500'
						/>
						<input
							type='number'
							placeholder='Descuento del producto (%)'
							value={newProduct.discount}
							onChange={e => {
								setNewProduct({...newProduct, discount: parseFloat(e.target.value)});
							}}
							className='w-full p-2 mb-4 border rounded focus:border-blue-500'
						/>
						<button onClick={handleAddProduct} className='bg-red-500 text-white py-2 px-4 rounded cursor-pointer'>
      Agregar
						</button>
					</div>
				) : (
					<button
						onClick={() => {
							setIsAdding(true);
						}}
						className='bg-red-500 text-white py-2 px-4 rounded cursor-pointer'
					>
						Agregar Nuevo Producto
					</button>
				)}

				<table className='w-full mt-6'>
					<thead>
						<tr>
							<th className='bg-gray-200 font-semibold py-2 px-4'>ID</th>
							<th className='bg-gray-200 font-semibold py-2 px-4'>Nombre</th>
							<th className='bg-gray-200 font-semibold py-2 px-4'>Descripción</th>
							<th className='bg-gray-200 font-semibold py-2 px-4'>Precio</th>
							<th className='bg-gray-200 font-semibold py-2 px-4'>categories</th>
							<th className='bg-gray-200 font-semibold py-2 px-4'>Acciones</th>
						</tr>
					</thead>
					<tbody>
						{products.map(product => (
							<tr key={product._id}>
								<td className='border py-2 px-4'>{product._id}</td>
								<td className='border py-2 px-4'>{product.name}</td>
								<td className='border py-2 px-4'>{product.description}</td>
								<td className='border py-2 px-4'>${product.price}</td>
								<td className='border py-2 px-4'>{product.categories}</td>
								<td className='border py-2 px-4'>

									<button
										onClick={() => {
											handleDeleteProduct(product._id);
										}}
										className='bg-red-500 text-white py-2 px-4 rounded cursor-pointer'
									>
										Eliminar
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<Footer />
		</>
	);
};

export default ProductCRUD;
