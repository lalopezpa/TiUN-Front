// ImageDescriptionService.tsx

type ImageDescription = {
	description: {
		tags: string[];
		captions: Array<{
			text: string;
			confidence: number;
		}>;
	};
	requestId: string;
	metadata: {
		height: number;
		width: number;
		format: string;
	};
};

const apiKey = '277e935acc514a3e9a6c7c5938120340';
const endpoint = 'https://recurso-04.cognitiveservices.azure.com/';

export const getImageDescription = async (imageUrl: string): Promise<ImageDescription> => {
	try {
		const response = await fetch(`${endpoint}/vision/v3.1/describe?language=es`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Ocp-Apim-Subscription-Key': apiKey,
			},
			body: JSON.stringify({url: imageUrl}),
		});

		if (!response.ok) {
			throw new Error('Error al realizar la solicitud a la API');
		}

		const data: ImageDescription = await response.json() as ImageDescription;

		return data;
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
};
