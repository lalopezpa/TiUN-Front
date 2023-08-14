// components/cart/CartDropdown.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/cartContext';

  
  const CartDropdown: React.FC = () => {
    const { cartItems, removeItem, clearCart } = useCart();
  
    return (
      <div className="cart-dropdown">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  {item.name} - ${item.price.toFixed(2)}
                  <button onClick={() => removeItem(item.id)}>Remove</button>
                </li>
              ))}
            </ul>
            <div>
              <strong>Total Price: ${calculateTotalPrice(cartItems).toFixed(2)}</strong>
            </div>
            <button onClick={clearCart}>Clear Cart</button>
            <Link to="/checkout">Proceed to Checkout</Link>
          </div>
        )}
      </div>
    );
  };

function calculateTotalPrice(items: { id: number; price: number }[]) {
    return items.reduce((total, item) => total + item.price, 0);
  }
  
  export default CartDropdown;