import type React from 'react';
import {DarkModeIcon, LightModeIcon} from '../icons/icons';

type DarkModeToggleProps = {
	modoOscuro: boolean;
	toggleModoOscuro: () => void;
};

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({modoOscuro, toggleModoOscuro}) => (
	<div className='flex items-center'>
		<span className='mr-2'>
			{modoOscuro ? <DarkModeIcon /> : <LightModeIcon />}
		</span>
		<label
			id='switch'
			className='relative inline-block w-12 h-6 bg-gray-400 rounded-full cursor-pointer dark:bg-gray-600'
		>
			<input type='checkbox' className='opacity-0 w-0 h-0' checked={modoOscuro} onChange={toggleModoOscuro} />
			<span className='slider absolute w-6 h-6 rounded-full bg-white dark:bg-gray-400'>
				<span
					className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-gray-400 dark:bg-white ${
						modoOscuro ? 'transform translate-x-6' : 'transform translate-x-0'
					}`}
					style={{
						transition: 'background-color 0.4s, transform 0.4s', // Agrega una transición suave
					}}
				/>
			</span>
		</label>
	</div>
);

export default DarkModeToggle;
