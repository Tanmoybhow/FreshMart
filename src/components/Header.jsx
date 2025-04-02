import React, { useEffect, useState } from "react";
import leaf from "../assets/leaf.png";
import cart from "../assets/add-to-cart.png";
import menu from "../assets/menu.png";
import { Link, Navigate, NavLink, useNavigate } from "react-router";
import Logo from "./Logo";
import LoginForm from "./LoginForm";
const Header = ({
  setShowMenu,
  searchQuery,
  setSearchQuery,
  showLogin,
  setShowLogin,
  setUser,
  user,
  setShowElement,
  setCarts,
  countCart,
  setCountCart,
  carts,
  setCartId
}) => {
  const [hasRedirected, setHasRedirected] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!hasRedirected && searchQuery.trim().length > 0) {
      navigate("/products");
      setHasRedirected(true);
    }
    if (hasRedirected && searchQuery.trim().length == 0) {
      setHasRedirected(false);
    }
  }, [searchQuery, navigate, hasRedirected]);

  return (
    <>
      {showLogin && (
        <LoginForm
          setUser={setUser}
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          setShowElement={setShowElement}
          setCarts={setCarts}
          setCartId={setCartId}
          setCountCart={setCountCart}
        />
      )}
      <header className="flex w-[100%] shadow items-center justify-between px-2 md:px-5 py-3 fixed top-0 left-0 z-50 bg-white">
        <Logo
          name="FreshMart"
          divideName={["Fresh", "Mart"]}
          logoImg={leaf}
          textSize={["text-lg", "text-4xl"]}
        />
        <nav className="mx-auto hidden [@media(min-width:850px)]:block">
          <ul className="flex gap-8">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-green-500 underline" : "text-gray-800"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive ? "text-green-500 underline" : "text-gray-800"
                }
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "text-green-500 underline" : "text-gray-800"
                }
              >
                About
              </NavLink>
            </li>
          </ul>
        </nav>
        <input
          type="text"
          placeholder="Search products"
          value={searchQuery}
          className="border border-gray-300 rounded px-2 text-sm md:text-xl py-1 [@media(min-width:850px)]:hidden mx-auto"
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <div className="relative [@media(min-width:850px)]:hidden mr-4">
            <Link to='/cart'>
              <img src={cart} alt={cart} className="w-[30px] cursor-pointer" />
              {countCart>0?<div className="w-5 h-5 bg-yellow-500 absolute -right-2 -top-2 rounded-full flex items-center justify-center">{countCart}</div>:''}
            </Link>
          </div>
        <div className="justify-between items-center gap-5 hidden  [@media(min-width:850px)]:flex">
          <input
            type="text"
            placeholder="Search product"
            value={searchQuery}
            className="border border-gray-300 rounded px-4 py-1"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
          <div className="relative">
            <Link to='/cart'>
              <img src={cart} alt={cart} className="w-[30px] cursor-pointer" />
              {countCart>0?<div className="w-5 h-5 bg-yellow-500 absolute -right-2 -top-2 rounded-full flex items-center justify-center">{countCart}</div>:''}
            </Link>
          </div>
          {Object.keys(user).length > 0 ? (
            <div className="flex items-center gap-3">
              <p>Hi, {user.username}</p>
              <button
                className="cursor-pointer rounded-sm py-2 px-4 text-white bg-yellow-500 hover:bg-yellow-600"
                onClick={() => {
                  const allUser = JSON.parse(localStorage.getItem('user')) || [];
                  const updatedUser = { ...user, cart: [...carts] }; 
                  const updatedUserArray = allUser.map((item)=>{
                      return item.id == user.id ? updatedUser:item;
                  });
                  localStorage.setItem('user',JSON.stringify(updatedUserArray));
                  setCarts([])
                  setUser({});
                  setCountCart(0)
                  localStorage.removeItem("loggedUser");
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              className="cursor-pointer"
              onClick={() => setShowLogin(true)}
            >
              LogIn
            </button>
          )}
        </div>
        <div>
          <img
            src={menu}
            alt={menu}
            className="w-[20px] md:w-[30px] [@media(min-width:850px)]:hidden "
            onClick={() => setShowMenu(true)}
          />
        </div>
      </header>
    </>
  );
};

export default Header;
