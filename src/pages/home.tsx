// Src/pages/Home.tsx
import React from 'react';
import styled from 'styled-components';
import Carrusel from '../components/common/Carrusel';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import fondo from '../assets/fondo.jpg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 50px;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Home: React.FC = () => (
	<><Header/>
		<Container>
			<Title>Bienvenido a TiUN, tenemos unas sugerencias para ti:</Title>
			<Carrusel /> {/* Display your carousel component */}
		</Container>
		<Footer/>
	</>
);

export default Home;

