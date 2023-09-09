// Src/pages/Home.tsx
import type React from 'react';
import styled from 'styled-components';
import Carrusel from '../components/common/Carrusel';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Home: React.FC = () => (
	<><Header />
		<Container>
			<Title>Welcome to TiUN</Title>
			<Carrusel /> {/* Display your carousel component */}
		</Container>
		<Footer/>
	</>
);

export default Home;
