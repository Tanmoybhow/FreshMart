import React from "react";
import { useStarRating } from "../hooks/useStarRating";
import { Link, useNavigate, useOutletContext } from "react-router";
import { ToastContainer, toast } from "react-toastify";

const ProductCard = ({ item, allProducts }) => {
  const star = useStarRating(item.rating.rate);
  const { user, carts, setCarts, cartId, setCartId, setCountCart } =
    useOutletContext();

  const navigate = useNavigate();
  function addToCart(e) {
    e.stopPropagation(); // Stop event from bubbling up
    e.preventDefault();
    if (Object.keys(user).length > 0) {
      const newCartId = cartId + 1;
      setCartId(newCartId);
      console.log(cartId);
      const cartItem = { ...item, productQuantity: 1, cartId: newCartId };
      const isPresent = carts.some((item) => {
        return item.id === cartItem.id;
      });
      if (!isPresent) {
        setCarts((prevData) => [...prevData, cartItem]);
        console.log(carts);
        let cartAddedUser = { ...user, cart: [...carts, cartItem] };
        localStorage.setItem("loggedUser", JSON.stringify(cartAddedUser));
        const updateUser = JSON.parse(localStorage.getItem("loggedUser"));
        setCountCart(() => {
          return updateUser.cart.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.productQuantity;
          }, 0);
        });
        // let updatedArray = userArray.map((obj)=>{
        //   return obj.id===user.id? {...obj,cart:[...carts,item]}:obj;
        // })
        // localStorage.setItem('user',JSON.stringify(updatedArray));
        toast.success("Item successfully added to cart");
      } else {
        toast.warning("Item already present in Cart");
      }
    }
  }

  return (
    <Link to={`/${item.id}`} state={allProducts}>
      <div className="w-full   px-4 py-4 pb-4 bg-white rounded-lg shadow-lg">
        <div className="w-full h-[200px] border border-gray-300 rounded-lg overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-contain "
          />
        </div>
        <div className="w-full h-[170px] my-3 flex flex-col gap-2">
          <p className="text-lg line-clamp-2 font-semibold text-gray-800">
            {item.title}
          </p>
          <p style={{color:'#16a34a'}} className="font-bold text-xl mt-1">
            Price:{" "}
            <span>
              <i className="fa-solid fa-indian-rupee-sign"></i>
            </span>
            {parseInt(item.price)}
          </p>
          <p className="">Category : {item.category}</p>
          <p className="flex gap-2 items-center">Rating : {star}</p>
        </div>
        <button
          className="main-button mt-auto w-full bg-green-500 text-white px-4 py-2 rounded  hover:bg-green-700 transition-all cursor-pointer"
          onClick={addToCart}
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
