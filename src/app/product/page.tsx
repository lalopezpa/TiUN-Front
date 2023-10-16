'use client';
import React from 'react';
import fondo from '../../../assets/fondo.jpg';
import {useForm} from 'react-hook-form';
import Link from 'next/link';
import Cookies from 'js-cookie';
import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
import styled from 'styled-components';
import Carrusel from '../../components/common/Carrusel';
import {url} from 'inspector';
import {Stars} from '@mui/icons-material';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import {useState} from 'react';
import ProductQuantity from '../../components/product/ProductQuantity';

type ApiResponse = {
	accessToken: string;
};
type RequestData = {
	codigo: string;
};

const product = {
	sellerId: 'some-seller-id',
	name: 'Computador ASUS Intel Core i3 2 Núcleos 12 GB RAM 512 GB SSD',
	description: 'La computadora ASUS con Intel Core i3 es una potente y eficiente herramienta que te brinda un rendimiento excepcional para todas tus necesidades informáticas. Equipada con un procesador Intel Core i3 de 2 núcleos, esta computadora ofrece una experiencia de usuario fluida y sin interrupciones, ideal para tareas diarias, navegación web y multitareas.Con una generosa memoria RAM de 12 GB, esta computadora te permite realizar múltiples tareas simultáneamente con facilidad. Ya sea que estés trabajando en documentos importantes, editando fotos o disfrutando de tus juegos y películas favoritas, la memoria RAM garantiza una ejecución sin problemas de las aplicaciones y programas más exigentes.Además, cuenta con un impresionante almacenamiento SSD de 512 GB que no solo acelera el tiempo de arranque del sistema y el acceso a los archivos, sino que también ofrece una amplia capacidad para almacenar tus documentos, fotos, videos y juegos. Olvídate de las esperas con este SSD de alta velocidad que mejora significativamente la eficiencia y la velocidad de tu computadora. El diseño elegante y moderno de ASUS se combina con la potencia interna de este computador para ofrecerte una experiencia informática completa y satisfactoria. Ya sea que seas un profesional creativo, un estudiante o un entusiasta de la tecnología, esta computadora ASUS con Intel Core i3, 2 Núcleos, 12 GB de RAM y 512 GB de SSD es la opción perfecta para un rendimiento confiable y una productividad sin esfuerzo.',
	price: 1145900,
	imageUrl: 'https://exitocol.vtexassets.com/arquivos/ids/19708790-800-auto?v=638304176656770000&width=800&height=auto&aspect=true',
	categories: ['category1', 'category2'],
	stock: 10,
	discount: 10,
	ratings: 4.5,
	ratingsCount: 200,
	createdat: new Date(),
	updatedat: new Date(),
};

const TextoLargo = ({ texto }) => {
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

const opcionesDeFormato = {
	style: 'currency',
	currency: 'COP',
	minimumFractionDigits: 0,
	maximumFractionDigits: 0,
};

const formatoMoneda = new Intl.NumberFormat('es-CO', opcionesDeFormato);

const monedaFormateada = formatoMoneda.format(product.price);

console.log(product);
const products = (): JSX.Element => {
	const	{register, handleSubmit, formState: {errors}, watch} = useForm();

	const onSubmit = async (data: RequestData) => {
		console.log(product);

		try {
			// Realiza una solicitud POST a la API con los datos del formulario
			// Maneja la respuesta si es necesario
			// console.log(response.data);
			// Guarda los tokens en las cookies
			Cookies.set('accessToken', response.data.accessToken);
			// Redirige al usuario al home
		} catch (error) {
			// Maneja los errores si ocurren
			// console.error('Error al enviar los datos:', error);
		}
	};

	return (
		<> <div className='flex flex-col max-w-screen min-h-screen bg-repeat' style={{backgroundImage: 'url(https://img.freepik.com/vector-premium/fondo-vector-bolsas-compras_615502-2466.jpg)', zIndex: -1}}>
			<header className='flex flex-col pt-'>
				<Header/>
			</header>

			<main className='flex justify-center items-center bg-gris bg-opacity-75 flex-1 pt-20 space-x-2  ' >
				<section>
					<div className='flex justify-center  my-10 items-center z-30 space-x-2'>
						<div className='flex-col'>
							<div className=' w-11/12 rounded shadow-lg flex bg-gray-100 '>
								{/* Sección Izquierda */}
								<div className='max-w-xl '>
									<img className='rounded max-w-full overflow-hidden ' src={product.imageUrl} alt='Imagen de la tarjeta' />
								</div>

								{/* Sección Derecha */}
								<div className='flex justify-center items-start mx-10 my-3 flex-col'>
									<h2 className='font-poppins text-xl font-bold'>{product.name}</h2>
									<div className='horizontal flex items-center flex-row'>
										<Box className='flex items-center'>
											<Rating
												name='text-feedback'
												value={product.ratings}
												readOnly
												precision={0.5}
												emptyIcon={<StarIcon style={{opacity: 1}} fontSize='inherit' />}
												size='large'
											/>
										</Box>
									</div>
									<p className='text-gray-700  text-left font-poppins '>Precio: {monedaFormateada}</p>
									<p className='text-gray-700  font-poppins'>Stock: {product.stock}</p>
									<TextoLargo texto={product.description} />
									<ProductQuantity stock={product.stock} />
									<div className='flex space-x-4 mt-4 font-poppins'>
										<button className='className=" bg-green-500 hover:bg-green-700 text-white font-poppins font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out"'>
										Agregar al Carrito
										</button>
										<button className='bg-blue-500 hover:bg-blue-700 text-white font-poppins font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out'>
											Comprar Ahora
										</button>
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