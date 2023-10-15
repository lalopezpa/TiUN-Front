'use client';
import type React from 'react';
import {useState, useEffect} from 'react';
import styled from 'styled-components';
import Carrusel from '../components/common/Carrusel';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Card from '../components/common/Card';
import {CRUD} from '../api/auth';
import type {ProductType} from '../types/ProductShema';

const Container = styled.div`
  padding-top: 65px;
  display:flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;

const Home: React.FC = () => {
	const [products, setProducts] = useState<ProductType[]>([]);

	const loadProducts = async () => {
		try {
			const products = await CRUD.getProducts() as ProductType[];
			setProducts(products);
			console.log(products);
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
				onLoad(instance) {
					instance.render();
				},
			};
		};

		return () => {
			document.head.removeChild(script);
		};
	}, []);

	return (
		<>
			<div className='bg-gris dark:bg-grisOscuro'>
				<Header/>
				<Container>
					<Carrusel />
					{products.map(product => (
						<Card
							key ={product.key}
							Foto= {product.imageUrl}
							Nombre={product.name}
							Precio={`$${product.price}`}
							Rating={product.ratings}
						/>
					))}
				</Container>
				<Footer/>
			</div>
		</>
	);
};

export default Home;
