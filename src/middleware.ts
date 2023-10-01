import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
import {verify} from 'jsonwebtoken';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
	const token = request.cookies.get('authToken');
	console.log('Validating token: ' + token?.value);
	console.log(request.nextUrl.pathname);

	if (request.nextUrl.pathname.includes('/profile') || request.nextUrl.pathname.includes('/Cart')) {
		if (token === undefined) {
			return NextResponse.redirect(new URL('/login', request.nextUrl));
		}
	}

	return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ['/profile', '/Cart'],
};
