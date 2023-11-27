export async function createOrder(): Promise<any[]> {
	try {
		const requestOptions: RequestInit = {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			// No se envía ningún dato en el cuerpo de la solicitud
		};

		const response = await fetch('http://localhost:3000/orders/createorder', requestOptions);

		if (!response.ok) {
			throw new Error(`Error al crear la orden. Código de estado: ${response.status}`);
		}

		const createdOrders = await response.json();

		return createdOrders;
	} catch (error) {
		console.error('Error al crear la orden:', error);
		throw error;
	}
}

// Luego puedes llamar a esta función para crear la orden desde el carrito
async function generarOrdenDesdeCarrito() {
	try {
		const orders = await createOrderFromCart();
		// Manejar la respuesta de la creación de la orden, si es necesario
	} catch (error) {
		// Manejar errores
	}
}


export async function getOrders(userType: string): Promise<any[]> {
	try {
		const requestOptions: RequestInit = {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		};

		let endpoint = 'http://localhost:3000/orders/?userType=';

		if (userType === 'buyer') {
			endpoint += 'buyer'; // Endpoint para obtener órdenes del comprador
		} else if (userType === 'seller') {
			endpoint += 'seller'; // Endpoint para obtener órdenes del vendedor
		} else {
			throw new Error('Invalid user type');
		}

		const response = await fetch(endpoint, requestOptions);

		if (!response.ok) {
			throw new Error(`Error al obtener las órdenes. Código de estado: ${response.status}`);
		}

		const orders = await response.json();

		return orders;
	} catch (error) {
		console.error('Error al obtener las órdenes:', error);
		throw error;
	}
}

// Luego puedes llamar a esta función para obtener las órdenes según el tipo de usuario
async function obtenerOrdenesSegunUsuario() {
	try {
		const userType = 'buyer'; // O 'seller'
		const orders = await getOrders(userType);
		// Manejar la respuesta de las órdenes obtenidas
	} catch (error) {
		// Manejar errores
	}
}
