/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
'use client';
import React, {useEffect, useState} from 'react';
import {getOrders} from './../../api/order'; // Importa la función getOrders que hicimos antes
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import {createPreference} from '../../api/mpago';
import {initMercadoPago, Wallet} from '@mercadopago/sdk-react';
initMercadoPago('TEST-a6587ee8-c0ea-4440-bdec-429bbc3da59d');

const BuyerOrdersPage = () => {
	const [buyerOrders, setBuyerOrders] = useState([]);
	const [preferenceId, setPreferenceId] = useState(null);
	const [selectedOrderId, setSelectedOrderId] = useState(null);

	useEffect(() => {
		async function fetchBuyerOrders() {
			try {
				const ordersResponse = await getOrders('buyer');
				setBuyerOrders(ordersResponse);
			} catch (error) {
				console.error('Error fetching buyer orders:', error);
			}
		}


		fetchBuyerOrders();
	}, []);

	const handlePayment = async orderid => {
		console.log('orderid', orderid);
		const preferenceid = await createPreference(orderid);
		console.log('preferenceid1 ANTES DE SETPREFERENCE ', preferenceid);
		setPreferenceId(preferenceid);
		console.log('preferenceId DESPUES DE SETPREFERENCE', preferenceid);
	};

	const onReady = async () => {
		/*
			Callback llamado cuando el Brick está listo.
			Aquí puede ocultar cargamentos de su sitio, por ejemplo.
		*/
	};


	const renderCheckoutButton = preferenceid => {
		if (!preferenceid) return null;
		console.log('BANDERA', preferenceid);
		return (
			<Wallet
				initialization={{preferenceId: preferenceid, marketplace: true} }
				onReady={onReady} />
		);
	};

	return (
		<div className='bg-gray-100 min-h-screen'>
			<Header />
			<div className='container mx-auto py-8 my-16'>
				<h1 className='text-3xl font-bold mb-6'>Órdenes del comprador</h1>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{buyerOrders.map((order, index) => (
						<div key={order._id} className='border rounded p-4 bg-white'>
							<p className='font-semibold'>Order ID: {order._id}</p>
							<p>Status: {order.status}</p>
							<p>Date: {order.date}</p>
							<ul>
								{order.products.map((product, idx) => (
									<li key={product._id} className='mt-2'>
										<p>Product ID: {product.productId}</p>
										<p>Quantity: {product.quantity}</p>
										<p>Subtotal: {product.subtotal}</p>
									</li>
								))}

								<button
									onClick={async () => {
										// Al presionar el botón de Comprar, actualiza el estado con el ID de la orden seleccionada
										await handlePayment(order._id);
										setSelectedOrderId(order._id);
									}}
									className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
								> botón de compra </button>
								{selectedOrderId === order._id && renderCheckoutButton(preferenceId)}
							</ul>
						</div>
					))}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default BuyerOrdersPage;
