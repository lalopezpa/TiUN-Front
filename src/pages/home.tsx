import React, {useEffect} from 'react';
import styled from 'styled-components';
import Carrusel from '../components/common/Carrusel';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import fondo from '../assets/fondo.jpg';
import Card from '../components/common/Card';

const Container = styled.div`
  padding-top: 65px;
  display:flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;

const BackgroundImage = styled.img`
  position: fixed; 
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: fill; 
  z-index: 0; 
  opacity: 0.09; 
`;

const Home: React.FC = () => {
	useEffect(() => {
		const script = document.createElement('script');
		script.src = "https://web-chat.global.assistant.watson.appdomain.cloud/versions/latest/WatsonAssistantChatEntry.js";
		script.async = true;
		document.head.appendChild(script);

		script.onload = () => {
			window.watsonAssistantChatOptions = {
				integrationID: '5b859bb1-bd6c-4d25-a730-9b425c08f717',
				region: 'au-syd',
				serviceInstanceID: '4d73066b-eef2-4338-9d83-a28d57b247ab',
				onLoad: function(instance) { instance.render(); }
			};
		};

		return () => {
			document.head.removeChild(script);
		};
	}, []);

	return (
		<>
			<div className=''>
				<BackgroundImage
					src={fondo}
					alt='fondobolsas'
				/>
				<Header/>
				<Container>
					<Carrusel />
					<Card Descripcion={'Macbook pro'} Precio={'4000e'} Rating={4}/>
					<Card Descripcion={'HP XXXX'} Precio={'283929e'} Rating={4}/>
					<Card Descripcion={'HP XXXX'} Precio={'283929e'} Rating={3}/>
					<Card Descripcion={'HP XXXX'} Precio={'283929e'} Rating={5}/>
					<Card Descripcion={'HP XXXX'} Precio={'283929e'} Rating={2}/>
					<Card Descripcion={'HP XXXX'} Precio={'283929e'} Rating={1}/>
				</Container>
				<Footer/>
			</div>
		</>
	);
};

export default Home;
