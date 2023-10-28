/* eslint-disable @typescript-eslint/naming-convention */
'use client';
import type React from 'react';
import {useEffect} from 'react';
// Import styled from 'styled-components';
import {API} 	from '../api/api';
import {useState} from 'react';
import Carrusel from '../components/common/Carrusel';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Card from '../components/common/Card';
import {getAllProducts} from '../api/crud';
import type {ProductType} from '../types/CRUD/ProductSchema';

// Const Container: StyledComponent<'div', any, Record<string, unknown>, never> = styled.div`
//   padding-top: 65px;
//   display:flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   gap: 1rem;
// `;

// Const BackgroundImage = styled.img`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   object-fit: fill;
//   z-index: 0;
//   opacity: 0.05;
// `;

const Home: React.FC = () => {
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
							Foto= {product.imageUrl}
							Nombre={product.name}
							Precio={`$${product.price}`}
							Rating={product.ratings}
							onAddToCart={async () => Promise.resolve()}
						/>
					))}
				</div>
				<Footer/>
			</div>
		</>
	);
};

export default Home;
