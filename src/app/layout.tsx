import './globals.css';
import type {Metadata} from 'next';
import {StrictMode} from 'react';
import {AuthProvider} from '../context/authContext';
import {CartProvider} from '../context/cartContext';
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
				<AuthProvider>
					<CartProvider>
						<body>
							<div id='root'>{children}</div>
						</body>
					</CartProvider>
				</AuthProvider>
			</StrictMode>
		</html>
	);
}
