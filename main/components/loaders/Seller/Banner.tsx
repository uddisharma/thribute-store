import Link from "next/link";
import React from "react";

const Banner = () => {
  return (
    <div className=" w-full rounded-lg m-auto store-list  animate-pulse">
      <div className="item bg-surface  rounded-[20px]">
        <div className=" ">
          <div className="skeleton-image h-64 lg:h-96 md:h-96 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
