import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
import {getUser} from './api/auth';

export async function middleware(request: NextRequest): Promise<NextResponse> {
	const authtoken = request.cookies.get('authToken');

	// Si el usuario intenta acceder a la página de perfil sin un authtoken, redirigirlo a la página de inicio de sesión
	if (request.nextUrl.pathname.includes('/profile')) {
		if (authtoken === undefined) {
			return NextResponse.redirect(new URL('/login', request.nextUrl));
		}

		// Verificamos la validez de ese token
		try {
			// Crear un objeto de opciones para la solicitud interna y pasar las cookies
			const requestOptions = {
				headers: {
					cookie: `authToken=${authtoken.value}`,
				},
			};

			const userData = await getUser(requestOptions);

			// Hacer algo con los datos del usuario, si es necesario
			console.log('Datos del usuario:', userData);

			// Continuar con la solicitud
			return NextResponse.next();
		} catch (error) {
			// Manejar errores de verificación de authtoken aquí
			console.error('Error de verificación de authtoken:', error);
			return NextResponse.redirect(new URL('/login', request.nextUrl));
		}
	}

	return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ['/profile', '/Cart'],
};
