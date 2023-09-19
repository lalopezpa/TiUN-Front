// Src/pages/Home.tsx

import type React from 'react';
// import styled from 'styled-components';
import Carrusel from '../components/common/Carrusel';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
// `;

// const Title = styled.h1`
//   font-size: 2rem;
//   margin-bottom: 1rem;
// `;

const Home: React.FC = () => (
	<><Header />
		<div style={{
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
			height: "100vh",
		}}>
			<h1>Welcome to TiUN</h1>
			<Carrusel /> {/* Display your carousel component */}
		</div>
		<Footer/>
	</>
);

export default Home;
