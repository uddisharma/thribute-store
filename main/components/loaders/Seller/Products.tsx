import React from "react";

const Products = () => {
  return (
    <div>
      <div className="list-product hide-product-sold grid lg:grid-cols-4 grid-cols-2 sm:gap-[30px] gap-[20px] mt-7">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="skeleton-image h-48 lg:h-52 md:h-52 w-48 lg:w-52 md:w-52 rounded-lg"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Products;
