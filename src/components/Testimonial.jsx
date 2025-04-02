import React from "react";
import user1 from "../assets/user1.jpg";
import { useStarRating } from "../hooks/useStarRating";
const Testimonial = ({feedBack}) => {
    const star = useStarRating(feedBack.rating)
  return (
    <div className="w-[95%] md:w-[80%] h-full bg-gray-100 shadow-sm flex flex-col gap-10 items-center py-16 rounded-2xl px-1 md:px-3 mx-auto">
      <img src={feedBack.image} alt={feedBack.image} className="w-28 h-28 rounded-full" />
      <div>
        <p className="text-center">
          <sup className="pr-2">
            <i className="fa-solid fa-quote-left"></i>
          </sup>
          {feedBack.feedback}
          <sup className="pl-2"><i className="fa-solid fa-quote-right"></i></sup> 🛒✨
        </p>
        <p className="text-right">
          - <strong>{feedBack.name}</strong>
        </p>
      </div>
      <p>{star}</p>
    </div>
  );
};

export default Testimonial;
