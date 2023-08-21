// Components/cart/ProductCart.tsx
import React from 'react';
import {useCart} from '../../context/cartContext';

const ProductCart: React.FC = () => {
	const {cartItems, removeItem} = useCart();

	return (
		<div>
			<h2>Your Cart</h2>
			{cartItems.length === 0 ? (
				<p>Your cart is empty</p>
			) : (
				<ul>
					{cartItems.map(item => (
						<li key={item.id}>
							{item.name} - ${item.price.toFixed(2)}
							<button onClick={() => {
								removeItem(item.id);
							}}>Remove</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default ProductCart;
