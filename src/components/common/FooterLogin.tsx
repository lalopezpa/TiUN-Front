// Footer.tsx
import React from 'react';
import {GithubIconB, InstagramIconB, FacebookIconB} from '../icons/icons';

const FooterLogin = (): JSX.Element => (
	<footer className='flex w-screen text-base bg-black bg-opacity-60 text-white p-4 md:p-5 h-  items-center justify-end  md:w-[50vw] md:text-xs  ' >
		<section className='flex items-center'>
			<a href= 'https://github.com/lalopezpa/TiUN-Front' className='mr-2'>
				<GithubIconB />
			</a>
			<a className='mr-2'>
				<FacebookIconB />
			</a>
			<a className='mr-2'>
				<InstagramIconB />
			</a>
			<div className='border-r-2 border-amarillo h-9 mr-2'></div> {/* Línea vertical */}
			<section className='mr-2'>
				<p className='text-white'>Términos y condiciones</p>
				<p className='text-white'>TiUN® 2023-2023 Todos los derechos reservados</p>
			</section>
		</section>
	</footer>
);

export default FooterLogin;
