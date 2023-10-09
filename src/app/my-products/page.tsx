'use client';
import React, {useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import {CRUD} from '../../api/auth';
import {ref, uploadBytes, getDownloadURL, deleteObject} from 'firebase/storage';
import {storage} from '../../firebase/config';
import {useForm} from 'react-hook-form';

const ProductCRUD = () => {
	const [products, setProducts] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [isAdding, setIsAdding] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [editedProduct, setEditedProduct] = useState(null);

	const {handleSubmit, register, reset} = useForm();

	useEffect(() => {
		loadProducts();
	}, []);

	const handleAddProduct = async data => {
		let imageFile = null;
		let storageRef = null;
		let imageUrl = null;

		try {
			// Verifica si se seleccionó una imagen
			console.log(data)
			if (data.imageurl?.[0]) {
				imageFile = data.imageurl[0];
				storageRef = ref(storage, 'Productos/' + imageFile.name);

				// Sube la imagen a Firebase Storage
				const snapshot = await uploadBytes(storageRef, imageFile);

				// Obtiene la URL de descarga de la imagen
				imageUrl = await getDownloadURL(storageRef);

				// Actualiza el campo de imagen en los datos del producto
				data.imageurl = imageUrl;

				// Realiza la solicitud POST para crear el producto
				const createdProduct = await CRUD.createProduct(data);

				// Agrega el producto al estado
				setProducts([...products, createdProduct]);

				// Restablece el formulario y finaliza el proceso de adición
				setIsAdding(false);
			}
		} catch (error) {
			console.error('Error al agregar el producto:', error);
			console.log("data despues del error")
			console.log(data)
			// Si hubo un error en la carga de la imagen, intenta eliminarla
			if (imageFile && storageRef) {
				try {
					// Intenta eliminar la imagen en caso de error
					await deleteObject(storageRef);
					console.log('Imagen eliminada de Firebase Storage debido a un error en la petición POST.');
					console.log("data despues de borrar")
					console.log(data)
				} catch (deleteError) {
					console.error('No se pudo eliminar la imagen de Firebase Storage:', deleteError);
				}
			}
		}
	};

	const loadProducts = async () => {
		try {
			const products = await CRUD.getProducts();
			setProducts(products);
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

	const handleSaveEdit = async data => {
		try {
			// Realiza una solicitud PUT para guardar los cambios en el producto
			const updatedProduct = await CRUD.updateProduct(editedProduct._id, data);
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
						<form onSubmit={handleSubmit(handleAddProduct)} className='mb-6'>
							<div>
								<label>Nombre del producto</label>
								<input
									{...register('name')}
									defaultValue=''
									className='w-full p-2 mb-2 border rounded focus-border-blue-500'
								/>
							</div>
							<div>
								<label>Descripción del producto</label>
								<input
									{...register('description')}
									defaultValue=''
									className='w-full p-2 mb-2 border rounded focus-border-blue-500'
								/>
							</div>
							<div>
								<label>Precio</label>
								<input
									{...register('price')}
									type='number'
									defaultValue=''
									className='w-full p-2 mb-2 border rounded focus-border-blue-500'
								/>
							</div>
							<div>
								<label>Foto del producto</label>
								<input
									{...register('imageurl')}
									type='file'
									className='w-full p-2 mb-2 border rounded border-blue-500'
								/>
							</div>
							{/* Resto de los campos de entrada */}
							<button type='submit' className='bg-red-500 text-white py-2 px-4 rounded cursor-pointer'>
                Agregar
							</button>
						</form>
					) : isEditing ? (
						<form onSubmit={handleSubmit(handleSaveEdit)} className='mb-6'>
							<div>
								<label>Nombre del producto</label>
								<input
									{...register('name')}
									defaultValue={editedProduct.name}
									className='w-full p-2 mb-2 border rounded focus-border-blue-500'
								/>
							</div>
							<div>
								<label>Descripción del producto</label>
								<input
									{...register('description')}
									defaultValue={editedProduct.description}
									className='w-full p-2 mb-2 border rounded focus-border-blue-500'
								/>
							</div>
							<div>
								<label>Precio</label>
								<input
									{...register('price')}
									defaultValue={editedProduct.price}
									type='number'
									className='w-full p-2 mb-2 border rounded focus-border-blue-500'
								/>
							</div>
							<button type='submit' className='bg-red-500 text-white py-2 px-4 rounded cursor-pointer'>
                Guardar
							</button>
							<button
								type='button'
								onClick={handleCancelEdit}
								className='bg-red-500 text-white py-2 px-4 rounded cursor-pointer ml-2'
							>
                Cancelar
							</button>
						</form>
					) : (
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
													handleEditProduct(product);
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
							previousLinkClassName={'border rounded-full p-2 px-4 mx-2 cursor-pointer text-gray-500 hover-bg-gray-200'}
							nextLinkClassName={'border rounded-full p-2 px-4 mx-2 cursor-pointer text-gray-500 hover-bg-gray-200'}
							disabledClassName={'cursor-not-allowed text-gray-400'}
							activeClassName={'bg-red-500 text-white rounded-full p-2 px-4 mx-2 cursor-pointer'}
							pageClassName={'cursor-pointer rounded-full p-2 px-4 mx-2 hover-bg-gray-200'}
						/>
					) : null}
				</div>
			</div>
			<Footer />
		</>
	);
};

export default ProductCRUD;
