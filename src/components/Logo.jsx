import React from "react";

const Logo = ({divideName,logoImg,textSize}) => {
  return (
    <a href="/" className="flex gap-1 md:gap-2 items-center">
      <p className={`${textSize[0]} md:${textSize[1]}`}>
        <span style={{color:'#22c55e'}}
          className="font-bold hover:text-blue-500 transition
"
        >
          {divideName[0]}
        </span>
        <span style={{color:'#facc15'}}>{divideName[1]}</span>
      </p>
      <img className="w-[20px] md:w-[40px]" src={logoImg} alt={logoImg} />
    </a>
  );
};

export default Logo;
