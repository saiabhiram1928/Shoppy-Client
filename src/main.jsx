import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter ,createRoutesFromElements, Route , RouterProvider} from 'react-router-dom'
//pages
import Home from './pages/Home.jsx'
import ProductPage from './pages/ProductPage.jsx'
import CartPage from './pages/CartPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
//redux
import store from './store.jsx';
import {Provider} from 'react-redux';
import RegisterPage from './pages/RegisterPage.jsx'
import ShippingPage from './pages/ShippingPage.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import PaymentPage from './pages/PaymentPage.jsx'
import OrderPage from './pages/OrderPage.jsx'
import ViewOrder from './pages/ViewOrder.jsx'
//paypal
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import ProfilePage from './pages/ProfilePage.jsx'

const router=  createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>} >
      <Route path='/' index={true} element={<Home/>}/>
      <Route path='/search/:keyword'  element={<Home/>}/>
      <Route path='/product/:id' element={<ProductPage/>}/>
      <Route path='/cart' element={<CartPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='/' element={<PrivateRoute/>}>
      <Route path='/shipping' element={<ShippingPage/>}/>
      <Route path='/payment' element={<PaymentPage/>}/>
      <Route path='/placeorder' element={<OrderPage/>}/>
      <Route path='/order/:id' element={<ViewOrder/>}/>
      <Route path='/profile' element={<ProfilePage/>}/>
      </Route>
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading= {true}>
    <RouterProvider router={router} />
    </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>,
)
