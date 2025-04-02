import React, { useEffect } from "react";
import { Link, useOutletContext } from "react-router";
import { toast } from "react-toastify";

const CartItem = ({ cart, count,setTotalPrice }) => {
  const { allProducts, carts, setCarts, setCountCart, user } =
    useOutletContext();
  const quantity = parseInt(cart.productQuantity);
  console.log(quantity)
  useEffect(()=>{
    const updateUser = JSON.parse(localStorage.getItem("loggedUser"));
    setTotalPrice(() => {
        return updateUser.cart.reduce((accumulator, currentValue) => {
          return accumulator + (currentValue.productQuantity*parseInt(currentValue.price));
        }, 0);
      });

  },[])
  function decreaseQuantity(e) {
    e.stopPropagation(); // Stop event from bubbling up
    e.preventDefault();
    console.log(cart.productQuantity);
    if (cart.productQuantity > 1) {
      let quantity = parseInt(cart.productQuantity);
      quantity = quantity - 1;
      let updatedArrayCarts = carts.map((item)=>{
        if(item.id===cart.id){
          return { ...cart, productQuantity: quantity }
        }
        return item;
      })
      setCarts(updatedArrayCarts);
      const updatedUser = {...user,cart:updatedArrayCarts};
      localStorage.setItem('loggedUser',JSON.stringify(updatedUser));
      const updateUser = JSON.parse(localStorage.getItem("loggedUser"));
        setCountCart(() => {
          return updateUser.cart.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.productQuantity;
          }, 0);
        });
        setTotalPrice(() => {
          return updateUser.cart.reduce((accumulator, currentValue) => {
            return accumulator + (currentValue.productQuantity*parseInt(currentValue.price));
          }, 0);
        });
    }
  }
  function increaseQuantity(e){
    e.stopPropagation(); // Stop event from bubbling up
    e.preventDefault();
    if (cart.productQuantity < 3) {
      let quantity = parseInt(cart.productQuantity);
      quantity = quantity + 1;
      let updatedArrayCarts = carts.map((item)=>{
        if(item.id===cart.id){
          return { ...cart, productQuantity: quantity }
        }
        return item;
      })
      setCarts(updatedArrayCarts);
      const updatedUser = {...user,cart:updatedArrayCarts};
      localStorage.setItem('loggedUser',JSON.stringify(updatedUser));
      const updateUser = JSON.parse(localStorage.getItem("loggedUser"));
        setCountCart(() => {
          return updateUser.cart.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.productQuantity;
          }, 0);
        });
        setTotalPrice(() => {
          return updateUser.cart.reduce((accumulator, currentValue) => {
            return accumulator + (currentValue.productQuantity*parseInt(currentValue.price));
          }, 0);
        });
    }else{
      toast.info("You can't add more than 3")
    }
  }
  function deleteCart(e) {
    e.stopPropagation(); // Stop event from bubbling up
    e.preventDefault();
    console.log(cart.cartId);
    const filteredCarts = carts.filter((item) => item.id != cart.id);
    setCarts(filteredCarts);
    const updatedUser = { ...user, cart: filteredCarts };
    localStorage.setItem("loggedUser", JSON.stringify(updatedUser));
    const updateUser = JSON.parse(localStorage.getItem("loggedUser"));
    setCountCart(() => {
      return updateUser.cart.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.productQuantity;
      }, 0);
    });
    setTotalPrice(() => {
      return updateUser.cart.reduce((accumulator, currentValue) => {
        return accumulator + (currentValue.productQuantity*parseInt(currentValue.price));
      }, 0);
    });
    toast.error("Item deleted successfully");
  }
  return (
    <Link to={`/${cart.id}`} state={allProducts}>
      <div
        id={count}
        className="flex gap-4 items-center border border-gray-200 pr-3 rounded-md overflow-hidden"
      >
        <img
          src={cart.image}
          alt={cart.title}
          className="w-[60px] md:w-[100px] h-full"
        />
        <div className="grow py-2 h-full">
          <h3 className="font-medium">{cart.title}</h3>
          <h4 className="text-gray-400">{cart.category}</h4>
          <p className="text-gray-500">
            <span>
              <i className="fa-solid fa-indian-rupee-sign"></i>
            </span>
            {`${parseInt(cart.price)} * ${quantity}= ${
              parseInt(cart.price) * quantity
            }`}
          </p>
        </div>
        <div className="flex items-center">
          <button
            className="bg-amber-400 text-xl px-3 rounded-sm cursor-pointer"
            onClick={decreaseQuantity}
          >
            -
          </button>
          <p className="text-xl px-3 rounded-sm border border-gray-300">
            {quantity}
          </p>
          <button className="bg-amber-400 text-xl px-3 rounded-sm cursor-pointer" onClick={increaseQuantity}>+</button>
        </div>
        <i className="fa-solid fa-trash text-red-600" onClick={deleteCart}></i>
      </div>
    </Link>
  );
};

export default CartItem;
