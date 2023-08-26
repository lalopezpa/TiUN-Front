// Footer.tsx
import React from 'react';
import {GithubIcon, InstagramIcon, FacebookIcon} from '../icons/icons';

const Footer = () => (
	<footer className='bg-black bg-opacity-70 text-white py-5 flex items-center justify-end '>
		<div className='flex items-center'>
			<button className='mr-2'>
				<GithubIcon />
			</button>
			<button className='mr-2'>
				<FacebookIcon />
			</button>
			<button className='mr-2'>
				<InstagramIcon />
			</button>
			<div className='border-r-2 border-amarillo h-9 mr-2'></div> {/* Línea vertical */}
			<div className='mr-2'>
				<p className='text-white'>Términos y condiciones</p>
				<p className='text-white'>TiUN® 2023-2023 Todos los derechos reservados</p>
			</div>
		</div>
	</footer>
);

export default Footer;
