// Src/pages/Profile.tsx
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import styled from 'styled-components';

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

const ProfilePage: React.FC = () => (
	<><Header />
		<Container>
			<Title>Profile</Title>
		</Container>
		<Footer/>
	</>
);

export default ProfilePage;
