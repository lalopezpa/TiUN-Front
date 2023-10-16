// Components/product/ProductDetail.tsx
import type React from 'react';

type Product = {
	id: number;
	name: string;
	price: number;
	// Add more product-related properties if needed
};

type ProductDetailProps = {
	product: Product;
};

const ProductDetail: React.FC<ProductDetailProps> = ({product}) => (
	<div>
		<h2>{product.name}</h2>
		<p>Price: ${product.price.toFixed(2)}</p>
		{/* Add more product details */}
		{/* Add an "Add to Cart" button that utilizes the addToCart function from the context */}
	</div>
);

export default ProductDetail;
