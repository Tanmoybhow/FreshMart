import React from "react";
import { createPortal } from "react-dom";
import { Link, NavLink } from "react-router";
import cart from "../assets/add-to-cart.png";

const SideMenu = ({showMenu,setShowMenu,setShowLogin,user, setUser}) => {
  return createPortal(
    <div id="wrapper" className={`w-full h-[100vh] bg-[rgba(0,0,0,.3)] ${showMenu?'':'hidden'}  absolute top-0 left-0 z-10`} onClick={(e)=> {
        if(e.target.id=='wrapper' || e.target.children) setShowMenu(false)
    } }>
      <div className={`absolute top-0 ${showMenu?'right-0':'-right-[50%]'} w-[50%] shadow-lg h-[100vh] bg-white py-7 px-4 transition-all duration-300`}>
        <div className="flex justify-end mb-7 text-3xl text-green-500" onClick={()=> setShowMenu(false)}>
          <i className="fa-solid fa-xmark"></i>
        </div>
        {Object.keys(user).length>0 ? <><p>Hi, {user.username}</p>
        <div className="flex items-center justify-center rounded-sm gap-2 mb-4 bg-yellow-500 text-white py-2 px-3">
        <button onClick={()=>{
          setUser({})
          localStorage.removeItem('loggedUser');
        }}>Logout</button>
      </div></>:
        <div className="flex items-center justify-center rounded-sm gap-2 mb-4 bg-green-500 text-white py-2 px-3">
          <i className="fa-solid fa-user-plus"></i>
          <button onClick={()=>{
            setShowLogin(true);
          }}>LogIn</button>
        </div>
       }
        <ul className="flex gap-4 flex-col">
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
      </div>
    </div>,
    document.getElementById("sideMenu")
  );
};

export default SideMenu;
