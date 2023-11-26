'use client';
import React, {useEffect, useState} from 'react';
import {getOrders} from '../../api/order';
import Header from '../../components/common/Header'; // Importa el componente Header
import Footer from '../../components/common/Footer'; // Importa el componente Footer

const SellerPendingOrdersPage = () => {
	const [sellerPendingOrders, setSellerPendingOrders] = useState([]);

	useEffect(() => {
		async function fetchSellerPendingOrders() {
			try {
				const response = await getOrders('seller');
				const orders = response || []; // Asigna la respuesta directamente a orders si es un arreglo
				console.log('Seller pending orders:', orders);
				// Filtra las órdenes pendientes
				const pendingOrders = orders.filter(order => order.status === 'En proceso');
				setSellerPendingOrders(pendingOrders);
			} catch (error) {
				console.error('Error fetching seller pending orders:', error);
			}
		}

		fetchSellerPendingOrders();
	}, []);

	return (
		<div className='min-h-screen flex flex-col'>
			<Header /> {/* Agrega el componente Header */}
			<main className='flex-1 p-4'>
				<h1 className='text-2xl font-bold mb-4'>Todas las órdenes del vendedor</h1>
				<div className='grid grid-cols-3 gap-4'>
					{sellerPendingOrders.map((order, index) => (
						<div key={index} className='bg-white p-4 shadow-md rounded-md'>
							{/* Detalles de la orden */}
							<p>Order ID: {order._id}</p>
							<p>Status: {order.status}</p>
							<p>Date: {order.date}</p>
							{/* Agrega más detalles si es necesario */}
						</div>
					))}
				</div>
			</main>
			<Footer /> {/* Agrega el componente Footer */}
		</div>
	);
};

export default SellerPendingOrdersPage;
