'use client';
import {useEffect} from 'react';
import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
import {useState} from 'react';
import {type ProductType} from '../../types/CRUD/ProductSchema';
import {getOneProduct} from '../../api/productCard';
import FavoriteCard from '../../components/common/FavoriteCard';
import {getUser} from '../../api/auth';
import type {UserType} from '../../types/UserSchema';
import {useAuth} from '../../context/authContext';
import {useRouter} from 'next/navigation';
import NoLogeado from '../../components/common/NoLogin';
import {removeFavorites} from '../../api/FavoriteProduct';
type PageProps = {
	params: {id: string};
};


const Favorites = ({params}: PageProps): JSX.Element => {
	const [profile, setProfile] = useState<UserType>();
	const [products, setProducts] = useState<Array<{name: string; _id: string; imageUrl: string; description: string; price: number; stock: number; discount: number; categories: string[]; createdAt: string; updatedAt: string; sellerId: string; solds: number; ratings: number}> | undefined>(undefined);


	const [loading, setLoading] = useState(true);

	const {logout} = useAuth();
	const router = useRouter();

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Obtener el perfil de usuario
				const userProfile = await getUser();
				setProfile(userProfile);

				// Obtener productos favoritos
				const favoriteProducts = await Promise.all(
					userProfile?.favoriteProducts?.map(async id => {
						try {
							const product = await getOneProduct(id);
							return product;
						} catch (error) {
							console.error('Error fetching product with ID ', error);
							return undefined;
						}
					}) ?? [],
				);

				// Filtrar productos nulos (errores) y establecer el estado
				setProducts(favoriteProducts.filter(product => product !== null) as Array<{name: string; _id: string; imageUrl: string; description: string; price: number; stock: number; discount: number; categories: string[]; createdAt: string; updatedAt: string; sellerId: string; solds: number; ratings: number}> | undefined);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching user data:', error);
			}
		};

		fetchData().catch(error => {
			console.error('Error al cargar productos:', error);
		});
	}, []); // Dejé el array de dependencias vacío para que se ejecute solo una vez al montar el componente

	const handleRemoveFromFavorites = async (productId: string) => {
		try {
			await removeFavorites([productId]);
			// Después de eliminar, actualiza el estado para reflejar el cambio
			setProducts(prevProducts => prevProducts?.filter(product => product._id !== productId));
		} catch (error) {
			console.error('Error removing product from favorites:', error);
		}
	};

	if (!profile) {
		return <NoLogeado />;
	}

	return (
		<>
			<div className='flex flex-col max-w-screen min-h-screen bg-repeat' style={{backgroundImage: 'url(https://img.freepik.com/vector-premium/fondo-vector-bolsas-compras_615502-2466.jpg)', zIndex: -1}}>
				<header className='flex flex-col pt-'>
					<Header/>
				</header>

				<main className='flex justify-center items-center bg-gris bg-opacity-75 flex-1 pt-20 space-x-2 dark:bg-grisOscuro dark:bg-opacity-80'>
					<section>
						<div className='flex flex-col justify-center items-center bg-opacity-75 flex-1 mt-1 space-x-2 rounded-lg'>


							{loading ? (
								<p>Cargando productos...</p>
							) : (
								<div>
									<div className='grid grid-cols-4 gap-4 md-grid-cols-2'>
										{products?.map(producto => (
											<FavoriteCard
												key={producto._id}
												id={producto._id}
												Foto={producto.imageUrl}
												Nombre={producto.name}
												Precio={producto.price}
												onRemove={handleRemoveFromFavorites}
											/>
										))}
									</div>
								</div>
							)}
						</div>
					</section>
				</main>
				<footer className='h-1/6 bg-verdeClaro bg-opacity-75'>
					<Footer />
				</footer>
			</div>
		</>
	);
};

export default Favorites;
