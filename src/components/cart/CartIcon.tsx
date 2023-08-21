// Components/cart/CartIcon.tsx
import React from 'react';
import {Link} from 'react-router-dom';
import {useCart} from '../../context/cartContext';

const CartIcon: React.FC = () => {
	const {cartItems} = useCart();

	const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

	return (
		<Link to='/cart' className='cart-icon'>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
				className='feather feather-shopping-cart'
			>
				<circle cx='9' cy='21' r='1' />
				<circle cx='20' cy='21' r='1' />
				<path d='M1 1h4l2.1 11c.2 1 .8 2 1.8 2h12' />
			</svg>
			<span className='item-count'>{totalItems}</span>
		</Link>
	);
};

export default CartIcon;
