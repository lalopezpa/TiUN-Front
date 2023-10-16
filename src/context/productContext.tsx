// Context/ProductContext.tsx
import type React from 'react';
import {createContext, useContext, useState} from 'react';

type Product = {
	id: number;
	name: string;
	price: number;
	// Add more product-related properties if needed
};

type ProductContextType = {
	products: Product[];
	addToCart: (product: Product) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProduct = () => {
	const context = useContext(ProductContext);
	if (!context) {
		throw new Error('useProduct must be used within a ProductProvider');
	}

	return context;
};

type ProductProviderProps = {
	children: React.ReactNode; // Properly type the children prop
};

export const ProductProvider: React.FC<ProductProviderProps> = ({children}) => {
	const [products, setProducts] = useState<Product[]>([]);

	// You can fetch and set the products here

	const addToCart = (product: Product) => {
		// Implement logic to add product to cart
	};

	const contextValue: ProductContextType = {
		products,
		addToCart,
	};

	return <ProductContext.Provider value={contextValue}>{children}</ProductContext.Provider>;
};
