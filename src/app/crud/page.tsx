'use client';
import React, {useState, useEffect} from 'react';
import Header from '../../components/common/Header'; // Reemplaza 'Header' con la ubicación real de tu componente de encabezado.
import Footer from '../../components/common/Footer'; // Reemplaza 'Footer' con la ubicación real de tu componente de pie de página.

const ProductCRUD = () => {
	const [products, setProducts] = useState([]);
	const [newProduct, setNewProduct] = useState({name: '', description: '', price: 0});
	const [isAdding, setIsAdding] = useState(false);

	// Simulación de productos de ejemplo
	const mockProducts = [
		{
			id: 1,
			name: 'Producto 1',
			description: 'Descripción del Producto 1',
			price: 100,
		},
		{
			id: 2,
			name: 'Producto 2',
			description: 'Descripción del Producto 2',
			price: 150,
		},
		// Agrega más productos si es necesario
	];

	useEffect(() => {
		// Simulación de carga de productos
		setProducts(mockProducts);
	}, []);

	const handleAddProduct = () => {
		// Simulación de la lógica para agregar un nuevo producto
		const newProductId = products.length + 1;
		const newProductData = {id: newProductId, ...newProduct};
		setProducts([...products, newProductData]);
		setNewProduct({name: '', description: '', price: 0});
		setIsAdding(false);
	};

	const handleDeleteProduct = productId => {
		// Simulación de la lógica para eliminar un producto por su ID
		const updatedProducts = products.filter(product => product.id !== productId);
		setProducts(updatedProducts);
	};

	return (
		<>
			<Header />
			<div className='container mx-auto px-4 h-screen pt-9'>
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
							<th className='bg-gray-200 font-semibold py-2 px-4'>Acciones</th>
						</tr>
					</thead>
					<tbody>
						{products.map(product => (
							<tr key={product.id}>
								<td className='border py-2 px-4'>{product.id}</td>
								<td className='border py-2 px-4'>{product.name}</td>
								<td className='border py-2 px-4'>{product.description}</td>
								<td className='border py-2 px-4'>${product.price}</td>
								<td className='border py-2 px-4'>
									<button
										onClick={() => {
											handleDeleteProduct(product.id);
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
