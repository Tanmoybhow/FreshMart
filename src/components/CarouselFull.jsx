import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Testimonial from "./Testimonial";

export default function CarouselFull({ testimonialArray }) {
  return (
    <>
      <Swiper
        pagination={{ clickable: true }}
        // navigation={{ clickable: true }}
        navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }} 
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper custom-pagination"
      >
        {testimonialArray.map((item,i) => {
          return (
            <SwiperSlide key={i}>
              <Testimonial key={i} feedBack={item} />
            </SwiperSlide>
          );
        })}
        <div className="hidden md:block">
        <div className="swiper-button-next carousel-full"></div>
        <div className="swiper-button-prev carousel-full"></div>
      </div>
      </Swiper>
    </>
  );
}
