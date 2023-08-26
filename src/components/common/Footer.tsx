// Footer.tsx
import React from 'react';
import {GithubIcon, InstagramIcon, FacebookIcon} from '../icons/icons';

const Footer = (): JSX.Element => (
	<footer className='flex justify-end items-center bg-black bg-opacity-25 w-[] '>
		<div className='flex flex h-full justify-center items-end pr-5'>
			<GithubIcon />
			<FacebookIcon />
			<InstagramIcon />
		</div>
		<h1 className='flex-grow text-right pr-5'>Bienvenidos</h1>
	</footer>
);

export default Footer;
