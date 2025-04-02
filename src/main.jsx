import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from "react-router";
import Home from './components/Home.jsx'
import Products from './components/Products.jsx'
import About from './components/About.jsx'
import ProductDetails from './components/ProductDetails.jsx';
import Cart from './components/Cart.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}>
      <Route index element={<Home/>} />
      <Route path='/products' element={<Products/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/:productDetails' element={<ProductDetails/>}/>
      <Route path='/cart' element={<Cart/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
