import React, { useState } from "react";
import cart from "../assets/trolley.png";
import { useOutletContext } from "react-router";
import CartItem from "./CartItem";
import { toast } from "react-toastify";
const Cart = () => {
  const { carts,user,setCountCart } = useOutletContext();
  // console.log(user);
  // console.log(carts);
  const [totalPrice,setTotalPrice] = useState(0);
  return (
    <div className="w-full md:w-[90%] bg-white mx-auto pb-8">
      {Object.keys(user).length == 0 ? (
        <div className="flex items-center justify-center gap-2">
          <h2 className="text-gray-500">Please Login first😒</h2>
        </div>
      ) : carts.length == 0 ? (
        <div className="flex items-center justify-center gap-2">
          <h2 className="text-gray-500">No Item Available</h2>
          <img src={cart} alt={cart} className="w-[70px]" />
        </div>
      ) : (
        <>
        <div className="flex flex-col-reverse gap-4">
          {carts.map((cart) => {
            return <CartItem key={cart.cartId} cart={cart}  setTotalPrice={setTotalPrice}/>;
          })}
        </div>
        <div className="flex justify-end mt-5">
          <div className="border border-gray-200 w-full md:w-[40%] min-h-32 p-4 flex flex-col gap-4">
              <p>Total: <i className="fa-solid fa-indian-rupee-sign"></i><span>{totalPrice}</span></p>
              <p>Delevery: <i className="fa-solid fa-indian-rupee-sign"></i> <span>80</span></p>
              <p>Subtotal: <i className="fa-solid fa-indian-rupee-sign"></i> <span>{totalPrice+80}</span></p>
              <button className="bg-green-700 text-white px-3 py-2 rounded-sm cursor-pointer"onClick={()=>{
                toast.success('Order placed successfully 😊❤️')
              }}>Place Order</button>
          </div>
        </div>
        </>
        
      )}
    </div>
  );
};

export default Cart;
