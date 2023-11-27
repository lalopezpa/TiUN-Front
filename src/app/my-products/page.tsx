/* eslint-disable complexity */
'use client';
import React, {useState, useEffect, type ChangeEvent} from 'react';
import Image from 'next/image';
import ReactPaginate from 'react-paginate';
import {useForm, type SubmitHandler} from 'react-hook-form';
import {ref, uploadBytes, getDownloadURL, deleteObject} from 'firebase/storage';
import NoEmail from '../../components/common/Verificarmail';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

import {getUser} from '../../api/auth';
import {CRUD} from '../../api/crud';
import {getCategories} from '../../api/categories';

import {type CategoryType} from '../../types/CRUD/CategoriesSchema';
import {type ProductType} from '../../types/CRUD/ProductSchema';
import {type UserType} from '../../types/UserSchema';
import {type ProductFormDataType} from '../../types/CRUD/ProductFormSchema';

import {getImageDescription} from '../../services/imageDescriptionService';
import NoLogeado from '../../components/common/NoLogin';
import NoMpago from '../../components/common/NoMpago';
import {storage} from '../../firebase/config';

const myProducts = (): JSX.Element => {
	const [products, setProducts] = useState<ProductType[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [isAdding, setIsAdding] = useState<boolean>(false);
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [editedProduct, setEditedProduct] = useState<ProductType | undefined>(undefined);
	const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | undefined>(undefined);
	const [categories, setCategories] = useState<CategoryType[]>([]);
	const {handleSubmit, register, reset, formState: {errors}} = useForm();
	const [profile, setProfile] = useState<UserType>();


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
		const fetchUserProfile = async () => {
			try {
				const profile = (await getUser())!;
				setProfile(profile);
				console.log(profile);
			} catch (error) {
				console.error('Error fetching user profile:', error);
			}
		};

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
		fetchUserProfile().catch(error => {
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
		const user: UserType | undefined = await getUser();
		let imageFile: File | undefined;
		let storageRef = null;
		let imageUrl = null;
		const userFolderPath = `Usuarios/${user?._id}/Productos`; // Carpeta del usuario

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

				const description = await getDescriptionForImage(imageUrl);

				data.imageUrl = imageUrl;
				data.description = description ?? 'Producto sin descripción';
				console.log('descripcion' + description);
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

	const getDescriptionForImage = async (imageUrl: string): Promise<string | undefined> => {
		try {
			const descriptionData: {description: {captions: Array<{text: string}>}} = await getImageDescription(imageUrl);
			const descriptionText = descriptionData.description.captions[0]?.text;
			console.log(descriptionData);
			return descriptionText ?? 'No se encontró descripción';
		} catch (error) {
			console.error('Error al obtener la descripción de la imagen:', error);
			return undefined;
		}
	};

	const displayedProducts = products.slice(currentPage * 10, (currentPage + 1) * 10);
	if (!profile) {
		return 	<NoLogeado></NoLogeado>;
	}

	// if (!profile.accessTokenMp) {
	// 	return 	<NoMpago></NoMpago>;
	// }

	if (!profile.emailVerified) {
		return 	<NoEmail></NoEmail>;
	}

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
									<label className='flex flex-col dark:text-white font-poppins'>Nombre del producto</label>
									<input
										{...register('name', {required: true})}
										type='text'
										defaultValue=''
										className='w-full font-poppins  m-1 p-4 bg-white bg-opacity-20 rounded-lg placeholder-black  text-black  placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro border-solid hover:bg-opacity-30 dark:focus:ring-verdeClaro'
									/>
									{errors.name && <span className='text-red-600 font-poppins'>Este campo es requerido</span>}
								</div>
								{/* <div>
									<label className='flex flex-col dark:text-white font-poppins'>Descripc	ión del producto</label>
									<input
										{...register('description', {required: true})}
										type='text'
										defaultValue=''
										className='w-full font-poppins m-1 p-4 bg-white bg-opacity-20 rounded-lg placeholder-black  text-black  placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro border-solid hover:bg-opacity-30 dark:focus:ring-verdeClaro'
									/>
								</div> */}
								<div>
									<label className='flex flex-col dark:text-white font-poppins'>Precio</label>
									<input
										{...register('price', {required: true})}
										type='number'
										defaultValue=''
										className='w-full font-poppins m-1 p-4 bg-white bg-opacity-20 rounded-lg placeholder-black  text-black  placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro border-solid hover:bg-opacity-30 dark:focus:ring-verdeClaro appearance-none'
									/>
								</div>
								<div>
									<label className='flex flex-col dark:text-white font-poppins'>Cantidad</label>
									<input
										{...register('stock', {required: true})}
										type='number'
										defaultValue=''
										className='w-full font-poppins m-1 p-4 bg-white bg-opacity-20 rounded-lg placeholder-black  text-black  placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro border-solid hover:bg-opacity-30 dark:focus:ring-verdeClaro appearance-none'
									/>
								</div>
								<div>
									<label className='flex flex-col dark:text-white font-poppins'>Descuento</label>
									<input
										{...register('discount', {required: true})}
										type='number'
										defaultValue=''
										className='w-full font-poppins m-1 p-4 bg-white bg-opacity-20 rounded-lg placeholder-black  text-black  placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro border-solid hover:bg-opacity-30 dark:focus:ring-verdeClaro appearance-none'
									/>
								</div>
								<div>
									<label className='flex flex-col dark:text-white font-poppins'>Foto del producto</label>
									<input
										{...register('imageUrl', {required: true})}
										type='file'
										className='flex w-full mb-5 text-xs text-gray-900 border border-red-900 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
										id='default_size'
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
									<label className='flex flex-col dark:text-white font-poppins '>Categoría del producto</label>
									<select
										{...register('categories', {required: true})}
										className='w-full font-poppins m-1 p-4 bg-white bg-opacity-20 rounded-lg placeholder-black  text-black  placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro border-solid hover:bg-opacity-30 dark:focus:ring-verdeClaro'
									>
										<option value=''>Seleccionar una categoría</option>
										{categories.map(category => (
											<option key={category._id} value={category._id}>
												{category.name}
											</option>
										))}
									</select>
									{errors.category && <span className='text-red-600 font-poppins '>Este campo es requerido</span>}
								</div>
								<button type='submit' className='m-2 font-poppins  bg-blue-600 text-white text-bold px-4 py-2 rounded border-solid hover:brightness-125 border-gris'>
                Agregar
								</button>
							</form>
						) : isEditing ? (
							<form onSubmit={handleSubmit(handleSaveEdit)} className='mb-6'>
								<div>
									<label className='flex flex-col dark:text-white font-poppins'>Nombre del producto</label>
									<input
										{...register('name')}
										defaultValue={editedProduct ? editedProduct.name : ''}
										className='w-full m-1 p-4 bg-white bg-opacity-20 rounded-lg placeholder-black  text-black  placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro border-solid hover:bg-opacity-30  dark:focus:ring-verdeClaro font-poppins '
									/>
								</div>
								<div>
									<label className='flex flex-col dark:text-white font-poppin '>Descripción del producto</label>
									<input
										{...register('description')}
										defaultValue={editedProduct ? editedProduct.description : ''}
										className='w-full m-1 p-4 bg-white bg-opacity-20 rounded-lg placeholder-black  text-black  placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro border-solid hover:bg-opacity-30  dark:focus:ring-verdeClaro font-poppins '
									/>
								</div>
								<div>
									<label className='flex flex-col dark:text-white font-poppins'>Precio</label>
									<input
										{...register('price')}
										defaultValue={editedProduct ? editedProduct.price : ''}
										type='number'
										className='w-full m-1 p-4 bg-white bg-opacity-20 rounded-lg placeholder-black  text-black  placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro border-solid hover:bg-opacity-30  dark:focus:ring-verdeClaro appearance-none font-poppins'
									/>
								</div>
								<div>
									<label className='flex flex-col dark:text-white font-poppins '>Cantidad</label>
									<input
										{...register('stock')}
										type='number'
										defaultValue={editedProduct ? editedProduct.stock : ''}
										className='w-full m-1 p-4 bg-white bg-opacity-20 rounded-lg placeholder-black  text-black  placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro border-solid hover:bg-opacity-30  dark:focus:ring-verdeClaro font-poppins appearance-none'
									/>
								</div>
								<div>
									<label className='flex flex-col dark:text-white font-poppins '>Descuento</label>
									<input
										{...register('discount')}
										type='number'
										defaultValue={editedProduct ? editedProduct.discount : ''}
										className='w-full m-1 p-4 bg-white bg-opacity-20 rounded-lg placeholder-black  text-black  placeholder-opacity-70 placeholder-center text-center focus:outline-none focus:ring-2 focus:ring-verdeOscuro border-solid hover:bg-opacity-30  dark:focus:ring-verdeClaro font-poppins appearance-none'
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
												<Image src={product.imageUrl} width={100} height={100} alt='imagen' />
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
													className='m-2 bg-vinotinto text-white text-bold px-4 py-2 rounded border-solid hover:brightness-125 border-gris'
												>
            Eliminar
												</button>
												<button
													onClick={() => {
														handleEditProduct(product);
													}}
													className='m-2 bg-verdeClaro text-white text-bold px-4 py-2 rounded border-solid hover:brightness-125 border-gris'
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
