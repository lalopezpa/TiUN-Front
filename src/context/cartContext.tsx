// Context/CartContext.tsx
'use client';
import React, {createContext, useContext, useState, type ReactNode} from 'react';


//TODO: pasar types
// Define the shape of a cart item
type CartItem = {
	id: number;
	name: string;
	price: number;
	quantity: number;
};

// Define the shape of the cart context
type CartContextType = {
	cartItems: CartItem[];
	addItem: (item: CartItem) => void;
	removeItem: (itemId: number) => void;
	increaseItemQuantity: (itemId: number) => void;
	decreaseItemQuantity: (itemId: number) => void;
	clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error('useCart must be used within a CartProvider');
	}

	return context;
};

type CartProviderProps = {
	children: ReactNode;
};

export const CartProvider: React.FC<CartProviderProps> = ({children}) => {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);

	const addItem = (item: CartItem) => {
		// Implement addItem logic
	};

	const removeItem = (itemId: number) => {
		// Implement removeItem logic
	};

	const increaseItemQuantity = (itemId: number) => {
		// Implement increaseItemQuantity logic
	};

	const decreaseItemQuantity = (itemId: number) => {
		// Implement decreaseItemQuantity logic
	};

	const clearCart = () => {
		// Implement clearCart logic
	};

	const contextValue: CartContextType = {
		cartItems,
		addItem,
		removeItem,
		increaseItemQuantity,
		decreaseItemQuantity,
		clearCart,
	};

	return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};
