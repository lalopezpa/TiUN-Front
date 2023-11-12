'use client';
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import {useState} from 'react';
import {type ProductType} from '../../types/CRUD/ProductSchema';
import {getOneProduct} from '../../api/productCard';
import {getAllProducts} from '../../api/crud';
import FavoriteCard from '../../components/common/FavoriteCard';
import Grid from '@mui/material/Grid';
import {getUser} from '../../api/auth';
import type {UserType} from '../../types/UserSchema';
import {useAuth} from '../../context/authContext';
import {useRouter} from 'next/navigation';
import Image from 'next/image';
import {CRUD} from '../../api/crud';



type PageProps = {
	params: {id: string};
};





const favorites = ({params}: PageProps): JSX.Element => {
	const [profile, setProfile] = useState<UserType>();
	const [product, setProduct] = useState<ProductType | undefined>(undefined);
	const {logout} = useAuth();
	const router = useRouter();
	const [products, setProducts] = useState<ProductType[]>([]);
	const [loadedProducts, setLoadedProducts] = useState<ProductType[]>([]);


	const handleLogout = () => {
		console.log('Antes de logout');
		logout();
		console.log('Después de logout');
		router.push('/');
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

		(async () => {
			await fetchUserProfile();
		})();
	}, []);

	if (!profile) {
		return <div> </div>;
	}

	function data(value: Record<string, unknown>, index: number, array: Array<Record<string, unknown>>): void {
		throw new Error('Function not implemented.');
	}
	// Aca se acaba perfil



	const favoriteProductsIDs = profile.favouriteProducts;

	const productosPa = [];

	const fetchFavoriteProducts = async () => {
		try {
		// Usar Promise.all para esperar a que todas las solicitudes se completen
			const products = await Promise.all(
				favoriteProductsIDs.map(async id => {
					try {
						const product = await getOneProduct(id);
						return product;
					} catch (error) {
						// Manejar errores si la solicitud de un producto falla
						console.error(`Error al obtener producto con ID ${id}:`, error);
						return null; // O un valor predeterminado si prefieres
					}
				}),
			);

			// Filtrar productos nulos (si hay errores) y agregar los productos válidos a productosPa
			productosPa.push(...products.filter(product => product !== null));

		// Si prefieres usar setProductosPa en lugar de manipular directamente el array
		// setProductosPa(products.filter(product => product !== null));
		} catch (error) {
		// Manejar errores si falla la obtención de productos favoritos
			console.error('Error al obtener productos favoritos:', error);
		}
	};

	fetchFavoriteProducts();

	console.log(productosPa);





	return (
		<> <div className='flex flex-col max-w-screen min-h-screen bg-repeat' style={{backgroundImage: 'url(https://img.freepik.com/vector-premium/fondo-vector-bolsas-compras_615502-2466.jpg)', zIndex: -1}}>
			<header className='flex flex-col pt-'>
				<Header/>
			</header>

			<main className='flex justify-center items-center bg-gris bg-opacity-75 flex-1 pt-20 space-x-2 dark:bg-grisOscuro dark:bg-opacity-80  ' >
				<section>
					<div className='flex justify-center items-center z-30 '>
						<div className='flex flex-col justify-center items-center  bg-opacity-75 flex-1 my-10 space-x-2 rounded-lg'>
							<h2 className='flex justify-center items-center text-4xl mb-4 font-poppins  text-white my-10'>
								MIS FAVORITOS
							</h2>
							<div className=' w-11/12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 '>
								{


								}
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

export default favorites;
