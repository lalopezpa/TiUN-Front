// Cart.tsx
'use client';
import {useEffect, useState} from 'react';
import type React from 'react';
import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
import CartItem from '../../components/common/CartItem';
import {type ProductType} from '../../types/CRUD/ProductSchema';
import {removeFromCart, getCartItems} from '../../api/cart'; // Asegúrate de importar las funciones correctas


type CartItemType = {
	id: number;
	producto: ProductType;
	cantidad: number;
};

type CartProps = Record<string, unknown>;

const Cart: React.FC<CartProps> = () => {
	const [carrito, setCarrito] = useState<ProductType[]>([]);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		const fetchCartItems = async () => {
			try {
				const cartItems = await getCartItems();
				setCarrito(cartItems);
			} catch (error) {
				console.error(error);
				// Manejar errores de manera adecuada
			}
		};

		void fetchCartItems();
	}, []);

	const eliminarDelCarrito = async (productoId: string) => {
		await removeFromCart(productoId);
		await fetchCartItems();
	};

	const fetchCartItems = async () => {
		try {
			const cartItems = await getCartItems();
			setCarrito(cartItems);
		} catch (error) {
			console.error(error);
			// Manejar errores de manera adecuada
		}
	};

	if (!carrito) {
		return <div>Cargando...</div>;
	}

	if (carrito.length === 0) {
		return (
			<div>
				<h1 className='text-2xl font-bold mb-4'>Carrito de Compras</h1>
				<p>El carrito está vacío.</p>
			</div>
		);
	}

	// Calcula el total del carrito
	const calcularTotal = () => {
	// Implementa la lógica para calcular el total
		let calculatedTotal = 0;
		carrito.forEach(item => {
			calculatedTotal += item.price * item.stock; // Modifica aquí
		});
		return calculatedTotal;
	};



	return (
		<>
			<div className='flex flex-col max-w-screen min-h-screen bg-repeat' style={{backgroundImage: 'url(https://img.freepik.com/vector-premium/fondo-vector-bolsas-compras_615502-2466.jpg)', zIndex: -1}}>
				<header className='flex flex-col pt-'>
					<Header />
				</header>
				<div>
					<h1 className='text-2xl font-bold mb-4'>Carrito de Compras</h1>
					{carrito.map(item => (
						<CartItem
							key={item._id}
							producto={item}
							cantidad={item.stock}
							precio={item.price * item.stock}
							eliminarDelCarrito={eliminarDelCarrito}
						/>
					))}

					<div className='mt-4'>
						<p className='text-xl font-bold'>Total: ${calcularTotal()}</p>
						<button className='bg-blue-500 text-white px-4 py-2 mt-4'>Ir a Pagar</button>
					</div>
				</div>
				<footer className='h-1/6 bg-verdeClaro bg-opacity-75 '>
					<Footer />
				</footer>
			</div>
		</>
	);
};

export default Cart;
