import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { Outlet } from "react-router";
import SideMenu from "./components/SideMenu";
import Footer from "./components/Footer";
import { ToastContainer, toast } from 'react-toastify';
import Loading from "./components/Loading";

function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [searchQuery,setSearchQuery] = useState('');
  const [showLogin,setShowLogin] = useState(false);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('loggedUser');
    return storedUser ? JSON.parse(storedUser) : {}; 
  });
  
  const [carts, setCarts] = useState(user?.cart || []);
  const [showElement,setShowElement] = useState(false);

  const [countCart, setCountCart] = useState(() => {
    if (user?.cart && user.cart.length > 0) {
      return user.cart.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.productQuantity;  
      }, 0);
    } else {
      return 0;
    }
  });
  const [cartId, setCartId] = useState(() => {
    if (user?.cart && user.cart.length > 0) {
      return user.cart[user.cart.length - 1].cartId; // Get cartId from the last item in cart
    } else {
      return 0; // Default to 0 if no cart or cart items
    }
  });
    useEffect(() => {
      fetch("https://fakestoreapi.com/products")
        .then((response) => response.json())
        .then((data) => {
          setAllProducts(data);
        });
    }, []);
  return (
    allProducts.length==0?<Loading/>:
    <div className="flex flex-col min-h-screen max-w-[1530px] w-full mx-auto relative overflow-x-hidden">
      <SideMenu showMenu={showMenu} setShowMenu={setShowMenu} setShowLogin={setShowLogin} user={user} setUser={setUser}/>
      <Header user={user} setShowElement={setShowElement} setUser={setUser} setShowMenu={setShowMenu} searchQuery={searchQuery} setSearchQuery={setSearchQuery} showLogin={showLogin} setShowLogin={setShowLogin} setCarts={setCarts} countCart={countCart} setCountCart={setCountCart} setCartId={setCartId} carts={carts}/>

      <main className="flex-grow w-[90%] mx-auto mt-[80px]">
        <ToastContainer position="top-left" autoClose={3000}/>
        <Outlet context={{allProducts,searchQuery,carts,setCarts,user,countCart,setCountCart,cartId,setCartId}} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
