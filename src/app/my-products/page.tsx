'use client';
import React, {useState, useEffect, type ChangeEvent} from 'react';
import Image from 'next/image';
import ReactPaginate from 'react-paginate';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import {CRUD} from '../../api/crud';

import {useForm, type SubmitHandler} from 'react-hook-form';
import {getCategories} from '../../api/categories';
import {type CategoryType} from '../../types/CRUD/CategoriesSchema';
import {type ProductType} from '../../types/CRUD/ProductSchema';
import {type ProductFormDataType} from '../../types/CRUD/ProductFormSchema';
import {ref, uploadBytes, getDownloadURL, deleteObject, list} from 'firebase/storage';
import {storage} from '../../firebase/config';
import {getUser} from '../../api/auth';
import {type UserType} from '../../types/UserSchema';
const myProducts = (): JSX.Element => {
	const [products, setProducts] = useState<ProductType[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [isAdding, setIsAdding] = useState<boolean>(false);
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [editedProduct, setEditedProduct] = useState<ProductType | undefined>(undefined);
	const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | undefined>(undefined);
	const [categories, setCategories] = useState<CategoryType[]>([]);
	const {handleSubmit, register, reset, formState: {errors}} = useForm();

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (file) {
			const reader = new FileReader();

			reader.onload = event => {
				const result = event.target?.result;
				if (result) {
					setImagePreview(result);
				}
			};

			reader.readAsDataURL(file);
		}
	};

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

	useEffect(() => {
		const loadData = async () => {
			await loadProducts();
		};

		loadData().catch(error => {
			console.error('Error al cargar productos:', error);
		});
	}, []);

	const resetForm = () => {
		reset();
	};

	const handleAddProduct: SubmitHandler<any> = async (data: ProductFormDataType) => {
		const user: UserType = await getUser();
		console.log('usuario', user);
		let imageFile: File | undefined;
		let storageRef = null;
		let imageUrl = null;
		const userFolderPath = `Usuarios/${user._id}/Productos`; // Carpeta del usuario

		if (data.imageUrl) {
			if (data.imageUrl instanceof FileList && data.imageUrl.length > 0) {
				imageFile = data.imageUrl[0];
			}
		}

		try {
			// Verifica que imageFile sea un objeto File válido
			if (imageFile instanceof File) {
				storageRef = ref(storage, `${userFolderPath}/${imageFile.name}`);

				const snapshot = await uploadBytes(storageRef, imageFile);

				imageUrl = await getDownloadURL(storageRef);

				data.imageUrl = imageUrl;

				const createdProduct: ProductType = await CRUD.createProduct(data);
				setProducts([...products, createdProduct]);
				if (isEditing) {
					resetForm();
				}

				setIsAdding(false);
			}
		} catch (error) {
			console.error('Error al agregar el producto:', error);

			if (imageFile && storageRef) {
				try {
					// Intenta eliminar la imagen en caso de error
					await deleteObject(storageRef);
					console.log('Imagen eliminada de Firebase Storage debido a un error en la petición.');
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

	const handleDeleteProduct: SubmitHandler<any> = async (productId: string): Promise<void> => {
		try {
			await CRUD.deleteProduct(productId);
			const updatedProducts = products.filter(product => product._id !== productId);
			setProducts(updatedProducts);
		} catch (error) {
			console.error(error);
		}
	};

	const handleEditProduct: SubmitHandler<any> = (product: ProductType): void => {
		setEditedProduct(product);
		setIsEditing(true);
	};

	const handleCancelEdit: SubmitHandler<any> = () => {
		resetForm();
		setEditedProduct(undefined);
		setIsEditing(false);
	};

	const handleSaveEdit: SubmitHandler<any> = async (data: ProductFormDataType) => {
		try {
			if (editedProduct) {
				const updatedProduct = await CRUD.updateProduct(editedProduct._id, data);
				const updatedProducts = products.map(product =>
					product._id === editedProduct._id ? updatedProduct : product,
				);
				setProducts(updatedProducts);
				setEditedProduct(undefined);
				setIsEditing(false);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const displayedProducts = products.slice(currentPage * 10, (currentPage + 1) * 10);

	return (
		<>
			<div className='bg-gris dark:bg-grisOscuro'>
				<Header/>
				<div className='flex flex-col justify-between pt-16 min-h-screen max-h-max pb-10 px-0 '>
					<div className='container mx-auto px-4 pt-9'>
						{isAdding
							? (<h1 className='text-3xl font-poppins text-gray-800 mb-6 dark:text-slate-100'>Añadir un producto</h1>)
							: (<h1 className='text-3xl font-poppins text-gray-800 mb-6 dark:text-slate-100'>Administrar mis productos</h1>)
						}
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
										{...register('name', {required: true})}
										defaultValue=''
										className='w-full p-2 mb-2 border rounded focus-border-blue-500'
									/>
									{errors.name && <span className='text-red-600'>Este campo es requerido</span>}
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
										{...register('imageUrl')}
										type='file'
										className='w-full p-2 mb-2 border rounded border-blue-500'
										onChange={handleImageChange}
									/>{imagePreview && (
										<img
											src={typeof imagePreview === 'string' ? imagePreview : 'imagen-de-marcador-de-posicion.jpg'}
											alt='Vista previa de la imagen'
											style={{maxWidth: '100px'}}
										/>
									)}
								</div>
								<div>
									<label>Categoría del producto</label>
									<select
										{...register('categories')}
										className='w-full p-2 mb-2 border rounded focus-border-blue-500'
									>
										<option value=''>Seleccionar una categoría</option>
										{categories.map(category => (
											<option key={category._id} value={category._id}>
												{category.name}
											</option>
										))}
									</select>
									{errors.category && <span className='text-red-600'>Este campo es requerido</span>}
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
										defaultValue={editedProduct ? editedProduct.name : ''}
										className='w-full p-2 mb-2 border rounded focus-border-blue-500'
									/>
								</div>
								<div>
									<label>Descripción del producto</label>
									<input
										{...register('description')}
										defaultValue={editedProduct ? editedProduct.description : ''}
										className='w-full p-2 mb-2 border rounded focus-border-blue-500'
									/>
								</div>
								<div>
									<label>Precio</label>
									<input
										{...register('price')}
										defaultValue={editedProduct ? editedProduct.price : ''}
										type='number'
										className='w-full p-2 mb-2 border rounded focus-border-blue-500'
									/>
								</div>
								<div>
									<label>Cantidad</label>
									<input
										{...register('stock')}
										type='number'
										defaultValue={editedProduct ? editedProduct.stock : ''}
										className='w-full p-2 mb-2 border rounded focus-border-blue-500'
									/>
								</div>
								<div>
									<label>Descuento</label>
									<input
										{...register('discount')}
										type='number'
										defaultValue={editedProduct ? editedProduct.discount : ''}
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
									<tr className='bg-verdeClaro border dark:border-green-900'>
										<th className='font-poppins py-2 px-2 md:px-4'>Foto</th>
										<th className='font-poppins py-2 px-2 md:px-4'>Nombre</th>
										<th className='font-poppins py-2 px-2 md:px-4'>Descripción</th>
										<th className='font-poppins py-2 px-2 md:px-4'>Precio</th>
										<th className='font-poppins py-2 px-2 md:px-4'>Stock</th>
										<th className='font-poppins py-2 px-2 md:px-4'>Descuento</th>
										<th className='font-poppins py-2 px-2 md:px-4'>Acciones</th>
									</tr>
								</thead>
								<tbody className='text-center'>
									{displayedProducts.map(product => (
										<tr key={product._id} className='dark:bg-verdeClaro border dark:border-green-900'>
											<td className='p-2'>
												<Image src={product.imageUrl} width={250} height={250} alt='imagen' />
											</td>
											<td className='dark:text-white border border-green-200 dark:bg-verdeClaro  dark:border-green-900 text-black'><p className=''>{product.name}</p></td>
											<td className='dark:text-white border border-green-200 dark:bg-verdeClaro  dark:border-green-900 text-black'>{product.description}</td>
											<td className='dark:text-white border border-green-200 dark:bg-verdeClaro  dark:border-green-900 text-black'>{product.price}</td>
											<td className='dark:text-white border border-green-200 dark:bg-verdeClaro  dark:border-green-900 text-black'>{product.stock}</td>
											<td className='dark:text-white border border-green-200 dark:bg-verdeClaro  dark:border-green-900 text-black'>{product.discount}</td>
											<td className='p-2'>
												<button
													onClick={() => {
														handleDeleteProduct(product._id);
													}}
													className='bg-red-500 font-poppins text-white py-2 px-2 md:px-4 rounded cursor-pointer mb-2 md:mb-0 md:mr-2'
												>
            Eliminar
												</button>
												<button
													onClick={() => {
														handleEditProduct(product);
													}}
													className='bg-blue-500 font-poppins text-white py-2 px-2 md:px-4 rounded cursor-pointer'
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
								previousLinkClassName={'border rounded-full p-2 px-4 mx-2 cursor-pointer text-black dark:text-slate-100 hover-bg-gray-200'}
								nextLinkClassName={'border rounded-full p-2 px-4 mx-2 cursor-pointer text-black  dark:text-slate-100 hover-bg-gray-200'}
								disabledClassName={'cursor-not-allowed text-gray-400'}
								activeClassName={'bg-verdeClaro text-white rounded-full p-2 px-4 mx-2 cursor-pointer'}
								pageClassName={'cursor-pointer rounded-full p-2 px-4 mx-2 hover-bg-gray-200'}
							/>
						) : null}
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
};

export default myProducts;

