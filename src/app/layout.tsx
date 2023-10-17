import './globals.css';
import type React from 'react';
import type {Metadata} from 'next';
import {StrictMode} from 'react';
import {AuthProvider} from '../context/authContext';
import {UserProvider} from '../context/userContext';
import {ProductProvider} from '../context/productContext';

// Layout se encarga de renderizar el componente hijo junto con cierta información que se repite en todas las paginas, como el head, el footer, el header, etc
// Para este caso, es necesario que de aquí se renderice el app y así se le agregue el contexto de autenticación
// y todos los contextos que se necesiten

export const metadata: Metadata = {
	title: 'TiUN',
	description: 'Tienda universitaria unal',
};

export default function RootLayout({children}: {
	children: React.ReactNode;
}): JSX.Element {
	return (
		<html lang='en'>
			<StrictMode>
				<UserProvider>
					<AuthProvider>
						<ProductProvider>
							<body>
								<div id='root'>{children}</div>
							</body>
						</ProductProvider>
					</AuthProvider>
				</UserProvider>
			</StrictMode>
		</html>
	);
}
