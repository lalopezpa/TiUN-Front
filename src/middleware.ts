import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
import {verifyToken} from './api/auth';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
	const token = request.cookies.get('authToken');
	console.log('Validating token: ' + token?.value);
	console.log(request.nextUrl.pathname);

	if (request.nextUrl.pathname.includes('/profile')) {
		if (token === undefined) {
			return NextResponse.redirect(new URL('/login', request.nextUrl));
		}

		try {
			const userData = await verifyToken();

			// Hacer algo con los datos del usuario, si es necesario
			console.log('Datos del usuario:', userData);

			// Continuar con la solicitud
			return NextResponse.next();
		} catch (error) {
			// Manejar errores de verificación de token aquí
			console.error('Error de verificación de token:', error);
			return NextResponse.redirect(new URL('/login', request.nextUrl));
		}
	}

	// if (request.nextUrl.pathname.includes('/Cart')) {
	// 	if (token === undefined) {
	// 		return NextResponse.redirect(new URL('/login', request.nextUrl));
	// 	}
	// 	console.log("paso por el middleware de cart")
	// 	try {
	// 		const userData = await verifyToken();

	// 		// Hacer algo con los datos del usuario, si es necesario
	// 		console.log('Datos del usuario:', userData);

	// 		// Continuar con la solicitud
	// 		return NextResponse.next();
	// 	} catch (error) {
	// 		// Manejar errores de verificación de token aquí
	// 		console.error('Error de verificación de token:', error);
	// 		return NextResponse.redirect(new URL('/login', request.nextUrl));
	// 	}
	// }
	return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ['/profile', '/Cart'],
};
