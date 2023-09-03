// Src/pages/Home.tsx
import React from 'react';
import styled from 'styled-components';
import Carrusel from '../components/common/Carrusel';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import fondo from '../assets/fondo.jpg';
import Card from '../components/common/Card';

const Container = styled.div`
  padding-top: 65px;
  display:flex;
  flex-wrap: wrap; /* Permite que las tarjetas fluyan hacia la siguiente línea cuando no haya suficiente espacio horizontal */
  justify-content: center; /* Centra las tarjetas horizontalmente */
  gap: 1rem; /* Espacio entre las tarjetas */
`;

const Title = styled.h1`
  margin-top: 2rem;
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;
const BackgroundImage = styled.img`
  position: fixed; 
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: fill; 
  z-index: 0; 
  opacity: 0.1; 
`;

const GrayOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: fill; 
  background-color: rgba(128, 128, 128, 0.2); 
`;

const Home: React.FC = () => (
	<>
		<div className=''>
			<BackgroundImage
				src={fondo}
				alt='fondobolsas'
			/>
			<GrayOverlay />
			<Header/>
			<Container>
				<Title>Bienvenido a TiUN<br/> tenemos unas sugerencias para ti:</Title>
				<Carrusel /> {/* Display your carousel component */}
				<Card Descripcion={'Macbook pro'} Precio={'4000e'}/>
				<Card Descripcion={'HP XXXX'} Precio={'283929e'}/>
				<Card Descripcion={'HP XXXX'} Precio={'283929e'}/>
				<Card Descripcion={'HP XXXX'} Precio={'283929e'}/>
				<Card Descripcion={'HP XXXX'} Precio={'283929e'}/>
				<Card Descripcion={'HP XXXX'} Precio={'283929e'}/>
			</Container>
			<Footer/>
		</div>
	</>
);

export default Home;

