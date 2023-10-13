// ProductDetail.tsx
import React from 'react';
import {useParams} from 'react-router-dom';

//TODO: Pasar type
type ProductDetailProps = {
	// Define the props if needed
};

const ProductDetail: React.FC<ProductDetailProps> = () => {
	const {productId} = useParams<{productId: string}>();

	// Fetch the product details using the productId
	// Implement your logic here to get the product details

	return (
		<div>
			<h2>Product Details</h2>
			{/* Display product information here */}
			<p>Product ID: {productId}</p>
			<p>Product Name: Sample Product</p>
			<p>Product Price: $99.99</p>
			{/* Add more product information */}
		</div>
	);
};

export default ProductDetail;
