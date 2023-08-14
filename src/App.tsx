// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Cambiar 'Switch' por 'Routes'
import Home from './pages/home';
import ProductDetail from './pages/productDetail';
import Cart from './pages/cart';
import Login from './pages/Auth/login';
import Register from './pages/Auth/register';
import ForgotPassword from './pages/Auth/forgotPassword';

function App() {
  return (
    <Router>
      <div>
        {/* Common header or navigation component can go here */}
        <Routes> {/* Cambiar 'Switch' por 'Routes' */}
          {/* Route definitions */}
          <Route path="/" element={<Home />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes> {/* Cambiar 'Switch' por 'Routes' */}
        {/* Common footer or navigation component can go here */}
      </div>
    </Router>
  );
}

export default App;
