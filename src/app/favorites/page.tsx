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



type PageProps = {
	params: {id: string};
};



const favorites = ({params}: PageProps): JSX.Element => {
	const [products, setProducts] = useState<ProductType[]>([]);
	const loadProducts = async () => {
		try {
			const products = await getAllProducts();
			setProducts(products);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		(async () => {
			await loadProducts();
		})();
	}, []);





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
								{products.map(product => (
									<div key={product._id}>
										<FavoriteCard
											key ={product._id}
											id ={product._id}
											Foto= {product.imageUrl}
											Nombre={product.name}
											Precio={`${product.price}`}
											Rating={product.ratings}
										/>
									</div>
								))}
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
