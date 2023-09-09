import fondo from '../../assets/fondo.jpg';
import fondoOscuro from '../../assets/fondo_oscuro.png';

const Background = ({modoOscuro}) => (
	<>
		<img
			src={modoOscuro ? fondoOscuro.src : fondo.src}
			alt='fondo'
			className='w-full h-full opacity-5 bg-cover'
			loading='lazy'
		/>
	</>
);

export default Background;

