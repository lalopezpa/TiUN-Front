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
`;

const Title = styled.h1`
  margin-top: 1rem;
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Home: React.FC = () => (
	<>
		<Header/>
		<Container>
			<Title>Bienvenido a TiUN, tenemos unas sugerencias para ti:</Title>
			<Carrusel /> {/* Display your carousel component */}
			<Card/>
		</Container>
		<Footer/>
	</>
);

export default Home;

