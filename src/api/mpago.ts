
export const createPreference = async (orderId: string): Promise<string | undefined> => {
	try {
		const requestOptions: RequestInit = {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({orderId}),
		};
		const response = await fetch('https://backend-6fx2.vercel.app/create_preference', requestOptions);

		if (response.ok) {
			const data: string = await response.json() as string;
			return data;
		}

		console.error('Error de respuesta:', response.status, response.statusText);
		throw new Error('Error en la solicitud.');
	} catch (error: any) {
		console.error('Error en la solicitud:', error.message);
		return undefined; // Devolver undefined en caso de error
	}
};


export const getlink = async (): Promise<string | void> => {
	try {
		const response = await fetch('https://backend-6fx2.vercel.app/getlink', {
			method: 'GET',
			credentials: 'include',
		});

		if (response.ok) {
			const data: string = await response.json() as string;
			return data;
		}

		console.error('Error de respuesta:', response.status, response.statusText);
		throw new Error('Error en la solicitud.');
	} catch (error: any) {
		console.error('Error en la solicitud:', error.message);
	}
};
