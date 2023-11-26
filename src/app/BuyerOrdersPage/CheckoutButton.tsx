import React, {useState, useEffect} from 'react';
import MercadoPago from 'mercadopago';

const CheckoutButton = ({orderId}) => {
	const [preferenceId, setPreferenceId] = useState(null);
	const tiunKey = 'TEST-a6587ee8-c0ea-4440-bdec-429bbc3da59d';
	useEffect(() => {
		if (!orderId) return;

		const mercadopago = new MercadoPago(
			tiunKey,
			{locale: 'es-CO'},
		);

		const orderData = {
			orderId,
		};

		fetch('/api/create-preference', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(orderData),
		})
			.then(async response => response.json())
			.then(preference => {
				setPreferenceId(preference.id);
			})
			.catch(error => {
				console.error('Error creating MercadoPago preference:', error);
			});
	}, [orderId]);

	if (!preferenceId) return null;

	const bricksBuilder = MercadoPago.bricks();
	const renderComponent = async bricksBuilder => {
		await bricksBuilder.create(
			'wallet',
			'button-checkout',
			{
				initialization: {
					marketplace: true,
					preferenceId,
				},
				callbacks: {
					onError(error) {
						console.error('MercadoPago error:', error);
					},
					onReady() {},
				},
			},
		);
	};

	useEffect(() => {
		if (preferenceId) {
			renderComponent(bricksBuilder);
		}
	}, [preferenceId]);

	return <div id='button-checkout'></div>;
};

export default CheckoutButton;
