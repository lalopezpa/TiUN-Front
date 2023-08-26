// App.tsx
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'; // Cambiar 'Switch' por 'Routes'
import Home from './pages/home';
import ProductDetail from './pages/productDetail';
import Cart from './pages/cart';
// Import Login from './pages/Auth/login';
import Register from './pages/Auth/register';
import ForgotPassword from './pages/Auth/forgotPassword';
import Payment from './pages/payment';

function App(): JSX.Element {
	return (
		<Router>
			<div>
				{/* Common header or navigation component can go here */}
				<Routes>
					{/* Rutas generales */}
					<Route path='/' element={<Home />} />
					<Route path='/Home' element={<Home />} />
					{/* <Route path='/Login' element={<Login />} /> */}
					<Route path='/SignUp' element={<Register />} />
					<Route path='/RecoverPassword' element={<ForgotPassword />} />

					{/* Rutas de productos */}
					<Route path='/product/:productId' element={<ProductDetail />} />

					{/* Rutas protegidas DESPUES */}
					<Route path='/Cart' element={<Cart />} />
					<Route path='/payment' element={<Payment />} />

					{/* <Route element={<PrivateRoutesShopper/>}>
						<Route path="/DashShopper" element ={<DashboardShopper/>} />
						<Route path='/Profile' element ={<ProfilePage/>} />
						<Route path='/WishList' element ={<WishListPage/>} />
						<Route path='/MyPurchases' element ={<MyPurchasesPage/>} />
						<Route path='/PaymentMethods' element ={<PaymentMethodsPage/>} />
						<Route path='/Addresses' element ={<AddressesPage/>} />
						<Route path='/Notification' element ={<NotificationPage/>} />
						<Route path='/Checkout' element ={<CheckoutPage/>} />
						<Route path="/SellerProducts" element ={<SellerProductsPage/>} />
            <Route path="/Sales" element ={<SalesPage/>} />
            <Route path="/Payments" element ={<PaymentsPage/>} />
					</Route> */}

				</Routes>
				{/* Common footer or navigation component can go here */}
			</div>
		</Router>
	);
}

export default App;
