/* eslint-disable @typescript-eslint/naming-convention */
'use client';
import type React from 'react';
import {useEffect} from 'react';
import {API} 	from '../api/api';
import {useState} from 'react';
import Carrusel from '../components/common/Carrusel';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Card from '../components/common/Card';
import {getRecommendedProducts} from '../api/recomendation';
import type {ProductType} from '../types/CRUD/ProductSchema';
import {Toaster} from 'sonner';
import {getUser} from '../api/auth';
import type {UserType} from '../types/UserSchema';
import {getAllProducts} from '../api/crud';

const Home: React.FC = () => {
	const [products, setProducts] = useState<ProductType[]>([]);
	const [profile, setProfile] = useState<UserType>();

	const loadProducts = async () => {
		if (!profile) {
			try {
				const profile = (await getUser())!;
				setProfile(profile);
				console.log(profile);
			} catch (error) {
				console.error('Error fetching user profile:', error);
			}

			try {
				console.log('no hay perfil');
				const products = await getAllProducts();
				console.log('todos los productos: ', products);
				setProducts(products);
			} catch (error) {
				console.error(error);
			}
		}

		if (profile) {
			console.log('si hay perfil');
			try {
				const products = await getRecommendedProducts();
				console.log('productos recomendados: ', products);
				setProducts(products);
			} catch (error) {
				console.error(error);
			}
		}
	};

	useEffect(() => {
		(async () => {
			await loadProducts();
		})();

		const script = document.createElement('script');
		script.src = 'https://web-chat.global.assistant.watson.appdomain.cloud/versions/latest/WatsonAssistantChatEntry.js';
		script.async = true;
		document.head.appendChild(script);

		script.onload = () => {
			window.watsonAssistantChatOptions = {
				integrationID: '5b859bb1-bd6c-4d25-a730-9b425c08f717',
				region: 'au-syd',
				serviceInstanceID: '4d73066b-eef2-4338-9d83-a28d57b247ab',
				onLoad(instance: {render: () => void}) {
					instance.render();
				},
			};
		};
	}, []);

	return (
		<>
			<div className='bg-gris dark:bg-grisOscuro'>
				<Header/>
				<div className='pt-16 flex flex-wrap min-h-screen justify-center gap-4'>
					<Carrusel />
					{products.map(product => (
						<Card
							key ={product._id}
							id ={product._id}
							Foto= {product.imageUrl}
							Nombre={product.name}
							Precio={`$${product.price}`}
						/>
					))}
				</div>
				<Footer/>
				<Toaster/>
			</div>
		</>
	);
};

export default Home;
