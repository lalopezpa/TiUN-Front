'use client';
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import Footer from '../../../components/common/Footer';
import Header from '../../../components/common/Header';
import Link from 'next/link';
import {useState} from 'react';
import {type ProductType} from '../../../types/CRUD/ProductSchema';
import {getOneProduct} from '../../../api/productCard';

type PageProps = {
	params: {id: string};
};

const TextoLargo = (texto: string) => {
	const [mostrarTextoCompleto, setMostrarTextoCompleto] = useState(false);
	const toggleTexto = () => {
		setMostrarTextoCompleto(!mostrarTextoCompleto);
	};

	return (
		<div className='max-w-md  my-4 p-4 border border-gray-700 rounded'>
			<h2 className='font-poppins font-bold mb-2'>Descripción:</h2>
			{mostrarTextoCompleto ? (
				<div>
					<p>{texto}</p>
					<span className='text-indigo-700 cursor-pointer' onClick={toggleTexto}>
						Ver menos
					</span>
				</div>
			) : (
				<div>
					<p>
						{texto.slice(0, 200)} {/* Mostrar primeros 150 caracteres */}
						{texto.length > 200 && '... '}
						<span className='text-indigo-700 cursor-pointer' onClick={toggleTexto}>
				Ver más
						</span>
					</p>
				</div>
			)}
		</div>
	);
};



const products = ({params}: PageProps): JSX.Element => {
	const [product, setProduct] = useState<ProductType | undefined>(undefined);
	console.log(params.id);
	const	{register, handleSubmit, formState: {errors}, watch} = useForm();
	const opcionesDeFormato = {
		style: 'currency',
		currency: 'COP',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	};

	const formatoMoneda = new Intl.NumberFormat('es-CO', opcionesDeFormato);


	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const product = await getOneProduct(params.id);
				console.log(product);
				setProduct(product);
			} catch (error) {
				console.error('Error al obtener producto:', error);
			}
		};

		fetchCategories().catch(error => {
			console.error('Error al cargar productos:', error);
		});
	}, []);


	return (
		<> <div className='flex flex-col max-w-screen min-h-screen bg-repeat' style={{backgroundImage: 'url(https://img.freepik.com/vector-premium/fondo-vector-bolsas-compras_615502-2466.jpg)', zIndex: -1}}>
			<header className='flex flex-col pt-'>
				<Header/>
			</header>

			<main className='flex justify-center rounded-lg items-center bg-gris bg-opacity-75 flex-1 pt-20 space-x-2  ' >
				<section>
					<div className='flex justify-center rounded-lg my-10 items-center z-30 space-x-2'>
						<div className='flex-col'>
							<div className=' w-11/12 rounded-lg shadow-lg flex bg-gray-100 '>
								{/* Sección Izquierda */}
								<div className='max-w-xl '>
									<img className='rounded-l-lg max-w-full m-3 overflow-hidden h-80 w-80 ' src={product?.imageUrl} alt='Imagen de la tarjeta' />
								</div>

								{/* Sección Derecha */}
								<div className='flex justify-center items-start mx-10 my-3 flex-col'>
									<h2 className='font-poppins text-xl font-bold'>{product?.name}</h2>
									<p className='text-gray-700  text-left font-poppins '>Precio: {product?.price}</p>
									<p className='text-gray-700  font-poppins'>Stock: {product?.stock}</p>
									<div className='flex space-x-4 mt-4 font-poppins'>
										<div className='flex items-center justify-between p-1'>
											<Link
												className='items-center px-5 py-2 mb-2 text-sm font-medium text-center text-white bg-verdeClaro rounded-lg focus:ring-4 focus:outline-none dark:bg-verdeOscuro dark:hover:bg-verdeOscuro ' href='/'
											>
				Añadir al carrito
											</Link>
										</div>
										<div className='flex items-center justify-between p-1'>
											<Link
												className='items-center px-5 py-2 mb-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg focus:ring-4 focus:outline-none dark:bg-verdeOscuro dark:hover:bg-verdeOscuro ' href='/'
											>
				Comprar											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
			<footer className='h-1/6 bg-verdeClaro bg-opacity-75 ' >
				<Footer />
			</footer>
		</div >
		</>
	);
};

export default products;
