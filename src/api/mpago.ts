export const createPreference = async (orderId: any): Promise<any | undefined> => {
	try {
		const requestOptions: RequestInit = {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({orderId}),
		};
		const response = await fetch('http://localhost:3000/create_preference', requestOptions);
		// console.log('Después de la solicitud');
		// console.log(requestOptions);

		if (response.ok) {
			const data = await response.json();
			return data;
		}

		console.error('Error de respuesta:', response.status, response.statusText);
		throw new Error('Error en la solicitud.');
	} catch (error: any) {
		console.error('Error en la solicitud:', error.message);
		return undefined; // Devolver undefined en caso de error
	}
};


export const getlink = async (): Promise<string> => {
	try {
		const response = await fetch('http://localhost:3000/getlink', {
			method: 'GET',
			credentials: 'include',
		});

		if (response.ok) {
			const data = await response.json() as any;
			return data;
		}

		console.error('Error de respuesta:', response.status, response.statusText);
		throw new Error('Error en la solicitud.');
	} catch (error: any) {
		console.error('Error en la solicitud:', error.message);
		return error; // Devolver undefined en caso de error
	}
};
