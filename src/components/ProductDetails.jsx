import React, { useEffect, useState } from "react";
import { useStarRating } from "../hooks/useStarRating";
import { useLocation, useNavigate, useOutletContext, useParams } from "react-router";
import Carousel from "./Carousel";
import { useFilter } from "../hooks/useFilter";
import Loading from "./Loading";
import { toast } from "react-toastify";

const ProductDetails = () => {
  //   const rate = useStarRating(4.1);
  const [quantity, setQuantity] = useState(1);
  const [productInfo, setProductInfo] = useState({});
  const { productDetails } = useParams();
  const {state} = useLocation();
  const x = useFilter(state,(el)=>el.category,productInfo.category)
  window.scrollTo(0, 0);
  const {user,setCarts,carts,cartId,setCartId,setCountCart} = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {

    fetch(`https://fakestoreapi.com/products/${productDetails}`)
      .then((response) => response.json())
      .then((data) => {
        setProductInfo(data);
      })
  }, [productDetails]);

  
    function addToCart(e) {
      if(Object.keys(user).length>0){
        const newCartId = cartId+1;
        setCartId(newCartId);
        const cartItem = {...productInfo,productQuantity:quantity,cartId:newCartId};
        const isPresent = carts.some((item)=>{
          return item.id===cartItem.id;
        });
        if(!isPresent){
        setCarts((prevData)=> [...prevData,cartItem]);
        console.log(carts)
        let cartAddedUser = {...user,cart:[...carts,cartItem]};
        localStorage.setItem('loggedUser',JSON.stringify(cartAddedUser));
        // let updatedArray = userArray.map((obj)=>{
        //   return obj.id===user.id? {...obj,cart:[...carts,item]}:obj;
        // })
        // localStorage.setItem('user',JSON.stringify(updatedArray));
        const updateUser = JSON.parse(localStorage.getItem('loggedUser'));
        setCountCart(()=>{
          return updateUser.cart.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.productQuantity;  
          }, 0);
        });
        toast.success("Item successfully added to cart");
      }else{
        toast.warning("Item already present in Cart");

      }
      }
    }
  
  return (
    Object.keys(productInfo).length==0? <Loading/>:
    <div className="w-full pb-12 ">
      <button  className="main-button py-2 px-9 mb-6 text-white bg-green-500 hover:bg-green-600 transition rounded-sm cursor-pointer" onClick={()=>{
        history.back();
      }}>Back</button>
      <div className="flex gap-1 md:gap-7 justify-center md:flex-row flex-col">
        <div className="w-full md:w-1/2 lg:w-1/3 h-[400px] rounded-lg border">
          <img
            className="w-full h-full object-contain"
            src={productInfo.image}
            alt={productInfo.image}
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-2/3 px-2 py-5 flex flex-col">
          <h1 className="text-lg md:text-xl text-gray-800 font-bold w-full md:w-[70%]">
            {productInfo.title}
          </h1>
          <p className="text-base text-gray-600 font-semibold pt-2 pb-1">
            {productInfo.category}
          </p>
          <p className="text-sm md:text-base text-gray-500 w-full md:w-[90%]">
            {productInfo.description}
          </p>
          <p style={{color:'#16a34a'}} className=" font-bold text-xl mt-1 py-3">
            Price:{" "}
            <span>
              <i className="fa-solid fa-indian-rupee-sign"></i>
            </span>
            {parseInt(productInfo.price)}
          </p>
          <div className="w-full md:w-[50%] flex justify-between">
            <p className="flex items-center gap-3">
              Rating:{" "}
              {productInfo.rating
                ? useStarRating(productInfo.rating.rate)
                : "N/A"}
            </p>
            <p>
              In Stock: {productInfo.rating ? productInfo.rating.count : "N/A"}
            </p>
          </div>
          <div className="quantity">
               <p className="text-gray-700 py-2">{parseInt(productInfo.price)} * {quantity} = {productInfo.price&&parseInt(productInfo.price)*quantity}</p>
               <div className="flex">
                <span className="flex items-center justify-center  px-6 border border-gray-300 text-2xl transition rounded-sm cursor-pointer" onClick={()=>{
                  if(quantity>1){
                    setQuantity((prev)=> prev-1);
                    console.log(typeof quantity)
                  }
                }}>-</span>
                <span style={{backgroundColor:'#eab308'}} className="flex items-center justify-center text-2xl w-[100px]  px-6 text-gray-800  hover:bg-yellow-600 transition rounded-sm cursor-pointer">{quantity}</span>
                <span className="flex items-center justify-center  px-6 border border-gray-300 text-2xl transition rounded-sm cursor-pointer" onClick={()=>{
                  if(quantity<3){
                    setQuantity((prev)=>prev+1)
                  }
                }}>+</span>
               </div>
          </div>
          <div className="w-full md:w-[50%] flex gap-2 pt-9">
            <a
              href="#"
              className="main-button py-2 px-6 text-white bg-green-500 hover:bg-green-600 transition rounded-sm cursor-pointer"
            >
              Buy Now
            </a>
            <button
              
              className="main-button-yellow py-2 px-6 text-gray-800 bg-yellow-500 hover:bg-yellow-600 transition rounded-sm cursor-pointer" onClick={addToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div className="pt-10 md:pt-30">
        <h2 style={{color:'#22c55e'}} className="underline text-2xl  font-semibold mb-3">
          Related Products
        </h2>
        <div>
          <Carousel allProducts={x} autoPlayRun={false} paginationRun={true}/>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
