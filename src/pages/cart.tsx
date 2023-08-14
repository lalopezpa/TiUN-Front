// Cart.tsx
import React from 'react';
import { useCart } from '../context/cartContext';

const Cart = () => {
  const { cartItems, removeItem, clearCart } = useCart();

  const calculateTotalPrice = (items: { id: number; price: number }[]) => {
    return items.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price.toFixed(2)}
              <button onClick={() => removeItem(item.id)}>Remove</button>
            </li>
          ))}
          <li>
            <strong>Total Price: ${calculateTotalPrice(cartItems).toFixed(2)}</strong>
          </li>
          <button onClick={clearCart}>Clear Cart</button>
        </ul>
      )}
    </div>
  );
};

export default Cart;
