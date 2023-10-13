/* eslint-disable no-negated-condition */
// Pages/Payment.tsx
import type React from 'react';
import {useState} from 'react';
import {useCart} from '../../context/cartContext';

const Payment: React.FC = () => {
	const {cartItems, clearCart} = useCart();
	const [paymentSuccess, setPaymentSuccess] = useState(false);

	const handlePayment = () => {
		// Simulación de pago exitoso
		setTimeout(() => {
			setPaymentSuccess(true);
			clearCart(); // Limpiar el carrito después del pago exitoso
		}, 2000);
	};

	return (
		<div>
			<h2>Payment</h2>
			<div>
				<h3>Order Summary</h3>
				<ul>
					{cartItems.map(item => (
						<li key={item.id}>
							{item.name} - ${item.price}
						</li>
					))}
				</ul>
				<p>Total: ${cartItems.reduce((total, item) => total + item.price, 0)}</p>
			</div>
			{!paymentSuccess ? (
				<button onClick={handlePayment}>Complete Payment</button>
			) : (
				<p>Payment successful! Thank you for your purchase.</p>
			)}
		</div>
	);
};

export default Payment;
