'use client';
import React, {useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import {CRUD} from '../../api/auth';

const ProductCRUD = () => {
	const [products, setProducts] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [isAdding, setIsAdding] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [editedProduct, setEditedProduct] = useState(null);

	const [newProduct, setNewProduct] = useState({
		name: '',
		description: '',
		price: 0,
		imageUrl: '',
		categories: [],
		stock: 0,
		discount: 0,
	});

	useEffect(() => {
		loadProducts();
	}, []);

	const loadProducts = async () => {
		try {
			const products = await CRUD.getProducts();
			setProducts(products);
		} catch (error) {
			console.error(error);
		}
	};

	const handleAddProduct = async () => {
		try {
			const createdProduct = await CRUD.createProduct(newProduct);
			setProducts([...products, createdProduct]);
			setNewProduct({
				name: '',
				description: '',
				price: 0,
				imageUrl: '',
				categories: [],
				stock: 0,
				discount: 0,
			});
			setIsAdding(false);
		} catch (error) {
			console.error(error);
		}
	};

	const handleDeleteProduct = async productId => {
		try {
			await CRUD.deleteProduct(productId);
			const updatedProducts = products.filter(product => product._id !== productId);
			setProducts(updatedProducts);
		} catch (error) {
			console.error(error);
		}
	};

	const handleEditProduct = product => {
		setEditedProduct(product);
		setIsEditing(true);
	};

	const handleCancelEdit = () => {
		setEditedProduct(null);
		setIsEditing(false);
	};

	const handleSaveEdit = async () => {
		try {
			// Realiza una solicitud PUT para guardar los cambios en el producto
			const updatedProduct = await CRUD.updateProduct(editedProduct._id, editedProduct);
			// Actualiza la lista de productos con los cambios
			const updatedProducts = products.map(product =>
				product._id === editedProduct._id ? updatedProduct : product,
			);
			setProducts(updatedProducts);
			setEditedProduct(null);
			setIsEditing(false);
		} catch (error) {
			console.error(error);
		}
	};

	const displayedProducts = products.slice(currentPage * 10, (currentPage + 1) * 10);

	return (
		<>
			<Header />
			<div className='flex flex-col justify-between pt-16'>
				<div className='container mx-auto px-4 h-100vh pt-9'>
					<h1 className='text-3xl font-semibold text-gray-800 mb-6'>Administrar Productos</h1>
					<div className='mb-6'>
						<button
							onClick={() => {
								setIsAdding(false);
							}}
							className={`mr-2 py-2 px-4 rounded cursor-pointer ${
								isAdding ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'
							}`}
						>
            Mis Productos
						</button>
						<button
							onClick={() => {
								setIsAdding(true);
							}}
							className={`py-2 px-4 rounded cursor-pointer ${
								isAdding ? 'bg-gray-200 text-gray-600' : 'bg-red-500 text-white'
							}`}
						>
            Añadir Productos
						</button>
					</div>

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
							{/* Resto de los campos de entrada */}
							<button
								onClick={handleAddProduct}
								className='bg-red-500 text-white py-2 px-4 rounded cursor-pointer'
							>
              Agregar
							</button>
						</div>
					) : isEditing ? (
					// Modo de edición
						<div className='mb-6'>
							<input
								type='text'
								placeholder='Nombre del producto'
								value={editedProduct.name}
								onChange={e => {
									setEditedProduct({...editedProduct, name: e.target.value});
								}}
								className='w-full p-2 mb-2 border rounded focus:border-blue-500'
							/>
							<input
								type='text'
								placeholder='Descripción del producto'
								value={editedProduct.description}
								onChange={e => {
									setEditedProduct({...editedProduct, description: e.target.value});
								}}
								className='w-full p-2 mb-2 border rounded focus:border-blue-500'
							/>
							<input
								type='number'
								placeholder='Precio'
								value={editedProduct.price}
								onChange={e => {
									setEditedProduct({...editedProduct, price: parseFloat(e.target.value)});
								}}
								className='w-full p-2 mb-2 border rounded focus:border-blue-500'
							/>
							{/* Agrega campos de edición para otros atributos del producto */}
							<button
								onClick={handleSaveEdit}
								className='bg-green-500 text-white py-2 px-4 rounded cursor-pointer'
							>
							Guardar
							</button>
							<button
								onClick={handleCancelEdit}
								className='bg-red-500 text-white py-2 px-4 rounded cursor-pointer ml-2'
							>
							Cancelar
							</button>
						</div>
					) : (
					// Modo de visualización
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
								{displayedProducts.map(product => (
									<tr key={product._id}>
										<td className='border py-2 px-4'>{product._id}</td>
										<td className='border'>{product.name}</td>
										<td className='border'>{product.description}</td>
										<td className='border'>{product.price}</td>
										<td className='border py-2 px-4'>
											<button
												onClick={() => {
													handleDeleteProduct(product._id);
												}}
												className='bg-red-500 text-white py-2 px-4 rounded cursor-pointer'
											>
                      Eliminar
											</button>
											<button
												onClick={() => {
													handleEditProduct(product); // Activa el modo de edición
												}}
												className='bg-blue-500 text-white py-2 px-4 rounded cursor-pointer ml-2'
											>
                      Editar
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					)}

					{products.length > 10 && !isAdding && !isEditing ? (
						<ReactPaginate
							previousLabel={'Anterior'}
							nextLabel={'Siguiente'}
							pageCount={Math.ceil(products.length / 10)}
							onPageChange={data => {
								setCurrentPage(data.selected);
							}}
							containerClassName={'flex justify-center items-center my-6'}
							previousLinkClassName={'border rounded-full p-2 px-4 mx-2 cursor-pointer text-gray-500 hover:bg-gray-200'}
							nextLinkClassName={'border rounded-full p-2 px-4 mx-2 cursor-pointer text-gray-500 hover:bg-gray-200'}
							disabledClassName={'cursor-not-allowed text-gray-400'}
							activeClassName={'bg-red-500 text-white rounded-full p-2 px-4 mx-2 cursor-pointer'}
							pageClassName={'cursor-pointer rounded-full p-2 px-4 mx-2 hover-bg-gray-200'}
						/>
					) : null}
				</div>
				<Footer />
			</div>
		</>
	);
};

export default ProductCRUD;
