import React from "react";
import Logo from "./Logo";
import leaf from "../assets/leaf.png";
import { NavLink } from "react-router";
const Footer = () => {
  return (
    <footer style={{backgroundColor:'#111827',color:'white'}} className="py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        {/* Logo & About */}
        <div>
          <Logo name='FreshMart' divideName={['Fresh','Mart']} logoImg={leaf} textSize={['text-lg','text-3xl']}/>
          <p className="text-gray-400 mt-2">
            Freshness delivered to your doorstep.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <NavLink  to="/" className={({isActive})=> isActive?'text-green-500 underline':'text-gray-400'}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" className={({isActive})=> isActive?'text-green-500 underline':'text-gray-400'}>
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({isActive})=> isActive?'text-green-500 underline':'text-gray-400'}>
                About
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold">Customer Service</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <a href="/faq" className="text-gray-400 hover:text-white">
                FAQ
              </a>
            </li>
            <li>
              <a href="/returns" className="text-gray-400 hover:text-white">
                Returns
              </a>
            </li>
            <li>
              <a href="/shipping" className="text-gray-400 hover:text-white">
                Shipping Info
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold">Subscribe</h3>
          <p className="text-gray-400 mt-2">
            Get updates on new deals & offers.
          </p>
          <input
            type="email"
            placeholder="Enter your email"
            className="mt-3 w-full p-2 rounded text-gray-100 border border-gray-100"
          />
          <button className="main-button mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
            Subscribe
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-400">
        &copy; {new Date().getFullYear()} Created With ❤️ By Tanmoy Bhowmik.
      </div>
    </footer>
  );
};

export default Footer;
