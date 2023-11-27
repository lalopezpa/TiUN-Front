'use client';
import React, {useEffect, useState} from 'react';
import {getOrders} from './../../api/order'; // Importa la función getOrders que hicimos antes
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import {createPreference} from '../../api/mpago';
import {initMercadoPago, Wallet} from '@mercadopago/sdk-react';
import {type OrderType} from '../../types/ordertype';
initMercadoPago('TEST-a6587ee8-c0ea-4440-bdec-429bbc3da59d');

const BuyerOrdersPage = () => {
	const [preferenceId, setPreferenceId] = useState<string | undefined>(undefined);
	const [selectedOrderId, setSelectedOrderId] = useState<string | undefined>(undefined);

	const [buyerOrders, setBuyerOrders] = useState<never[]>([]);

	useEffect(() => {
		async function fetchBuyerOrders() {
			try {
				const ordersResponse: any[] = await getOrders('buyer'); // Asegúrate de que ordersResponse sea del tipo any[]
				console.log('Buyer orders:', ordersResponse);
				// Hacer cualquier conversión necesaria aquí si ordersResponse no es exactamente de tipo never[]
				setBuyerOrders(ordersResponse as never[]);
			} catch (error) {
				console.error('Error fetching buyer orders:', error);
			}
		}

		(async () => {
			await fetchBuyerOrders();
		})();
	}, []);


	const handlePayment = async (orderid: string) => {
		console.log('orderid', orderid);
		const preferenceid: string | undefined = await createPreference(orderid);
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


	const renderCheckoutButton = (preferenceid: string) => {
		if (!preferenceid) return null;
		console.log('BANDERA', preferenceid);
		return (
			<Wallet
				initialization={{preferenceId: preferenceid, marketplace: true} }
				onReady={onReady} />
		);
	};

	return (
		<div className=' min-h-screen rounded-lg items-center bg-gris bg-opacity-75 flex-1 pt-20 space-x-2  '>
			<Header />
			<div className='container mx-auto py-8 '>
				<h1 className='text-3xl font-bold mb-6 text-center'>Órdenes del comprador</h1>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{buyerOrders.map((order: OrderType, index) => (
						<div key={order._id} className='border rounded-lg text-center p-4 ml-8  bg-green-100 dark:text-white shadow-lg dark:bg-teal-950'>
							<p className='font-semibold text-center '>Order ID: {order._id}</p>
							<p>Status: {order.status}</p>
							<ul>
								{order.products.map((product, idx) => (
									<li key={product._id} className='mt-2'>
										<p className='font-semibold italic text-green-900 dark:text-white m-2'> {product.productName} </p>
										<div className='flex justify-center dark:text-white '>
											<img src={product.productImageUrl} alt='Imagen' className='w-40 h-40 rounded-lg m-2' />
										</div>
										<p>Cantidad: {product.quantity}</p>
										<p>Subtotal: {product.subtotal}</p>
									</li>
								))}

								<div className='flex justify-center '>
									<button
										onClick={async () => {
										// Al presionar el botón de Comprar, actualiza el estado con el ID de la orden seleccionada
											await handlePayment(order._id);
											setSelectedOrderId(order._id);
										}}
										className='bg-blue-500 hover:bg-blue-700 mt-3 text-white font-bold py-2 px-4 rounded-lg'
									> Ir a comprar </button>
								</div>
								{selectedOrderId  === order._id && preferenceId !== undefined && renderCheckoutButton(preferenceId)}
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
