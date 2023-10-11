'use client';
import React, {useState, useEffect} from 'react';
import Image from 'next/image';
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
	const [imagePreview, setImagePreview] = useState(null);

	const handleImageChange = e => {
		const file = e.target.files[0];

		if (file) {
			// Lee el contenido del archivo como un objeto Blob
			const reader = new FileReader();

			reader.onload = e => {
				setImagePreview(e.target.result);
			};

			reader.readAsDataURL(file);
		}
	};

	const {handleSubmit, register, reset} = useForm();

	useEffect(() => {
		loadProducts();
	}, []);
	const resetForm = () => {
		reset();
	};

	const handleAddProduct = async data => {
		let imageFile = null;
		let storageRef = null;
		let imageUrl = null;

		try {
			console.log(data);
			if (data.imageurl?.[0]) {
				imageFile = data.imageurl[0];
				storageRef = ref(storage, 'Productos/' + imageFile.name);

				const snapshot = await uploadBytes(storageRef, imageFile);

				imageUrl = await getDownloadURL(storageRef);

				data.imageurl = imageUrl;

				const createdProduct = await CRUD.createProduct(data);

				setProducts([...products, createdProduct]);
				if (isEditing) {
					resetForm();
				}

				setIsAdding(false);
			}
		} catch (error) {
			console.error('Error al agregar el producto:', error);
			console.log('data despues del error');
			console.log(data);

			if (imageFile && storageRef) {
				try {
					// Intenta eliminar la imagen en caso de error
					await deleteObject(storageRef);
					console.log('Imagen eliminada de Firebase Storage debido a un error en la petición POST.');
					console.log('data despues de borrar');
					console.log(data);
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
		resetForm();
		setEditedProduct(null);
		setIsEditing(false);
	};

	const handleSaveEdit = async data => {
		try {
			const updatedProduct = await CRUD.updateProduct(editedProduct._id, data);
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
			<div className='flex flex-col justify-between pt-16 min-h-screen max-h-max'>
				<div className='container mx-auto px-4 pt-9'>
					<h1 className='text-3xl font-poppins text-gray-800 mb-6'>Administrar Productos</h1>
					<div className='mb-6'>
						<button
							onClick={() => {
								setIsAdding(false);
							}}
							className={`mr-2 py-2 px-4 rounded font-poppins ${
								isAdding ? 'bg-verdeClaro text-white' : 'bg-gray-200 text-gray-600 cursor-not-allowed'
							}`}
						>
              Mis Productos
						</button>
						<button
							onClick={() => {
								setIsAdding(true);
							}}
							className={`py-2 px-4 rounded font-poppins ${
								isAdding ? 'bg-gray-200 text-gray-600 cursor-not-allowed' : 'bg-verdeClaro text-white'
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
								<label>Cantidad</label>
								<input
									{...register('stock')}
									type='number'
									defaultValue=''
									className='w-full p-2 mb-2 border rounded focus-border-blue-500'
								/>
							</div>
							<div>
								<label>Descuento</label>
								<input
									{...register('discount')}
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
							{/* Terminar los restantes */}
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
							<div>
								<label>Cantidad</label>
								<input
									{...register('stock')}
									type='number'
									defaultValue={editedProduct.stock}
									className='w-full p-2 mb-2 border rounded focus-border-blue-500'
								/>
							</div>
							<div>
								<label>Descuento</label>
								<input
									{...register('discount')}
									type='number'
									defaultValue={editedProduct.discount}
									className='w-full p-2 mb-2 border rounded focus-border-blue-500'
								/>
							</div>
							<div>
								<label>Foto del producto</label>
								<input
									type='file'
									onChange={handleImageChange}
									className='w-full p-2 mb-2 border rounded border-blue-500'
								/>
								{imagePreview && (
									<img
										src={imagePreview}
										alt='Vista previa de la imagen'
										style={{maxWidth: '100px'}} // Ajusta el tamaño según tus necesidades
									/>
								)}
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
									<th className='bg-gray-200 font-semibold py-2 px-4'>Foto</th>
									<th className='bg-gray-200 font-semibold py-2 px-4'>Nombre</th>
									<th className='bg-gray-200 font-semibold py-2 px-4'>Descripción</th>
									<th className='bg-gray-200 font-semibold py-2 px-4'>Precio</th>
									<th className='bg-gray-200 font-semibold py-2 px-4'>Stock</th>
									<th className='bg-gray-200 font-semibold py-2 px-4'>Descuento</th>
									<th className='bg-gray-200 font-semibold py-2 px-4'>Acciones</th>
								</tr>
							</thead>
							<tbody>
								{displayedProducts.map(product => (
									<tr key={product._id}>
										<td className='border'><Image src='https://firebasestorage.googleapis.com/v0/b/tiun-175b2.appspot.com/o/Productos%2F63b73981e5a99.jpeg?alt=media&token=b6472c9e-a92e-4278-b201-8f8255ba776b'
											width={50} height = {100} alt = 'imagen'></Image></td>
										<td className='border'>{product.name}</td>
										<td className='border'>{product.description}</td>
										<td className='border'>{product.price}</td>
										<td className='border'>{product.stock}</td>
										<td className='border'>{product.discount}</td>
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
							activeClassName={'bg-verdeClaro text-white rounded-full p-2 px-4 mx-2 cursor-pointer'}
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
