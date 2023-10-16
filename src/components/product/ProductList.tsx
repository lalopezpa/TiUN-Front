// Components/product/ProductList.tsx
import type React from 'react';
import ProductDetail from './ProductDetail';
import {useProduct} from '../../context/productContext';

const ProductList: React.FC = () => {
	const {products} = useProduct();

	return (
		<div>
			<h2>Product List</h2>
			{products.map(product => (
				<ProductDetail key={product.id} product={product} />
			))}
		</div>
	);
};

export default ProductList;
