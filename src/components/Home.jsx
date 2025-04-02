import React, { useEffect, useState } from "react";
import bgHome from "../assets/hero-bg.jpg";
import ProductCard from "./ProductCard";
import Carousel from "./Carousel";
import pepsi from '../assets/pepsi.png'
import kitkat from '../assets/kitkat.png'
import colagate from '../assets/colagate.png'
import laysLogo from '../assets/Lays-Logo.png'
import Testimonial from "./Testimonial";
import CarouselFull from "./CarouselFull";
import { Link, useOutletContext } from "react-router";
import LoginForm from "./LoginForm";
// import Carousel from "./Carousel";
const Home = () => {
  const {allProducts} = useOutletContext();
  const {user} = useOutletContext();
  const testimonialArray =  [
    {
      name: "Amit Sharma",
      feedback: "Great quality groceries at affordable prices! Highly recommended.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      name: "Priya Das",
      feedback: "Fresh vegetables and quick delivery. Love shopping here!",
      rating: 4.5,
      image: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      name: "Rahul Verma",
      feedback: "Excellent customer service and a wide variety of products.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/3.jpg"
    }
  ];
  return (
    <>
    <div className="my-4">
      <div className="h-[500px]  relative">
        <div className="absolute w-full h-full bg-[rgba(0,0,0,0.2)] top-0 left-0 flex items-center justify-center">
          <Link to={'/products'} className="main-button bg-green-500 text-white px-6 py-3 text-lg font-semibold rounded hover:bg-green-700 transition-all shadow-2xl cursor-pointer">
            Shop Now
          </Link>
        </div>
        <img
          src={bgHome}
          alt={bgHome}
          className="w-full h-full object-cover rounded-sm"
        />
      </div>
      <div className="mt-7">
        <h2 style={{color:'#22c55e'}} className="underline text-2xl font-semibold mb-3">
          Featured Products
        </h2>
        <div>
          <Carousel user={user} allProducts={allProducts} autoplayRun={true} paginationRun={false}/>
        </div>
      </div>

      <section className="brand my-7">
      <h2  style={{color:'#22c55e'}} className="underline text-2xl font-semibold mb-3">
          Brands
        </h2>
         <div className="grid grid-cols-2 md:grid-cols-4  gap-5 place-items-center">
         <img className="w-[150px] md:w-[200px] lg:w-[250px] grayscale hover:grayscale-0 cursor-pointer transition-all ease-in-out " src={kitkat} alt={kitkat} />
         <img className="w-[150px] md:w-[200px] lg:w-[250px] grayscale hover:grayscale-0 cursor-pointer transition-all ease-in-out " src={laysLogo} alt={laysLogo} />
         <img className="w-[150px] md:w-[200px] lg:w-[250px] grayscale hover:grayscale-0 cursor-pointer transition-all ease-in-out " src={colagate} alt={colagate} />
         <img className="w-[150px] md:w-[200px] lg:w-[250px] grayscale hover:grayscale-0 cursor-pointer transition-all ease-in-out " src={pepsi} alt={pepsi} />
         </div>
      </section>

      <section className="testimonial my-7 ">
      <h2  style={{color:'#22c55e'}} className="underline text-center text-4xl  font-semibold mb-6">
          Our Happy Customers
        </h2>
           <div className="max-w-3xl w-full h-auto mx-auto">
            <CarouselFull testimonialArray={testimonialArray}/>
           </div>
      </section>
    </div>
    </>
  );
};

export default Home;
