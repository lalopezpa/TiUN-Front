// Components/cart/CartItems.tsx
import type React from 'react';
import {useCart} from '../../context/cartContext';

const CartItems: React.FC = () => {
	const {cartItems, increaseItemQuantity, decreaseItemQuantity, removeItem} = useCart();

	return (
		<div className='cart-items'>
			<h2>Your Cart</h2>
			{cartItems.length === 0 ? (
				<p>Your cart is empty</p>
			) : (
				<ul>
					{cartItems.map(item => (
						<li key={item.id}>
							<div>
								<h3>{item.name}</h3>
								<p>Price: ${item.price.toFixed(2)}</p>
								<p>Quantity: {item.quantity}</p>
							</div>
							<div>
								<button onClick={() => {
									increaseItemQuantity(item.id);
								}}>+</button>
								<button onClick={() => {
									decreaseItemQuantity(item.id);
								}}>-</button>
								<button onClick={() => {
									removeItem(item.id);
								}}>Remove</button>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default CartItems;
