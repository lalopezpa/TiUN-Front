import React from 'react';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Carrusel: React.FC = () => (
	<div className='w-3/4 mx-auto z-10 bg-white border-gray-200 rounded-lg shadow-lg '>
		<Carousel showThumbs={false}>
			<div>
				<img className='rounded-lg' src='https://via.placeholder.com/550x200' alt='Imagen 1' />
			</div>
			<div>
				<img className='rounded-lg' src='https://via.placeholder.com/550x200' alt='Imagen 2' />
			</div>
			<div>
				<img className='rounded-lg' src='https://via.placeholder.com/550x200' alt='Imagen 3' />
			</div>
			{/* Agrega más imágenes según sea necesario */}
		</Carousel>
	</div>
);

export default Carrusel;
