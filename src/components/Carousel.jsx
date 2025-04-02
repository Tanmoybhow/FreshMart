import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { FreeMode, Pagination, Navigation, Autoplay } from "swiper/modules";
import ProductCard from "./ProductCard";
const Carousel = ({ allProducts,autoplayRun,paginationRun,user }) => {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        // loop={true} // ✅ Enables infinite looping
        autoplay={autoplayRun&&{
          delay: 2000, // ✅ Auto-scroll every 2 seconds
          disableOnInteraction: false, // ✅ Keeps autoplay running after user interaction
        }}
        modules={paginationRun?[Pagination,FreeMode, Navigation,Autoplay]:[FreeMode, Navigation,Autoplay]}
        breakpoints={{
          640: { slidesPerView: 1 }, // Mobile (width < 640px) → 1 card
          768: { slidesPerView: 2 }, // Tablet (width < 768px) → 2 cards
          1024: { slidesPerView: 3 }, // Desktop (width > 1024px) → 3 cards
        }}
        className="mySwiper"
      >
        {allProducts.slice(0,10).map((item, i) => (
          <SwiperSlide
            key={i}
            className="h-full flex justify-center px-[20px] md:px-[50px] pb-8"
          >
            <div className="w-[98%] h-auto flex flex-col">
              <ProductCard user={user} item={item} allProducts={allProducts}/>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Carousel;
