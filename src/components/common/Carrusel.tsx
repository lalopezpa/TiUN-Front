'use client';
import type React from 'react';
import Image from 'next/image';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import sale from '../../assets/images/sale.png';
import promocion from '../../assets/images/promocion.png';

const Carrusel: React.FC = () => (
	<div className='lg:w-3/4 w-full mt-7 mb-5 mx-auto z-10 bg-inherit border-gray-200 rounded-lg shadow-lg'>
		<Carousel showThumbs={false} showStatus={false}>
			<div>
				<Image className='rounded-lg' src={sale} alt='Imagen 1' />
			</div>
			<div>
				<Image className='rounded-lg' src={promocion} alt='Imagen 2' />
			</div>
			<div>
				<Image className='rounded-lg' src={sale} alt='Imagen 3' />
			</div>
			<div>
				<Image className='rounded-lg' src={promocion} alt='Imagen 4' />
			</div>
			{/* Agrega más imágenes según sea necesario */}
		</Carousel>
	</div>
);

export default Carrusel;
