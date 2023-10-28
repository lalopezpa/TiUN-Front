// AddToCartButton.tsx
import type React from 'react';

type AddToCartButtonProps = {
	onClick: () => Promise<void> | void;
};

const AddToCartButton: React.FC<AddToCartButtonProps> = ({onClick}) => {
	const handleClick = async () => {
		if (typeof onClick === 'function') {
			await onClick();
		}
	};

	return (
		<button
			className='items-center px-3 py-2 text-sm font-medium text-center text-white bg-verdeClaro rounded-lg focus:ring-4 focus:outline-none dark:bg-verdeOscuro dark:hover:bg-verdeOscuro'
			onClick={handleClick}
		>
      Añadir al carrito
		</button>
	);
};

export default AddToCartButton;
