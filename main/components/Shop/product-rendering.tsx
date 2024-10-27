import React from "react";
import NoDataFound from "../no-data/page";
import Error1 from "../error/page";
import Product1 from "./Product1";
import Product from "../Product/Product";

const ProductRendering = ({ p_loading, p_error, data }: any) => {
  return (
    <div>
      {p_loading ? (
        <div className="list-product-block lg:w-4/4 md:w-3/3 w-full md:pl-3">
          <div className="list-product hide-product-sold grid lg:grid-cols-4 grid-cols-2 sm:gap-[30px] gap-[20px] mt-7 m-auto">
            {[...Array(16)].map((_, index) => (
              <Product1 key={index} />
            ))}
          </div>
        </div>
      ) : data?.length <= 0 || data == null ? (
        <div className="no-data-product my-10 md:w-9/12 m-auto">
          <NoDataFound />
        </div>
      ) : p_error ? (
        <div className="my-10">
          <Error1 />
        </div>
      ) : (
        <div className="list-product hide-product-sold grid lg:grid-cols-4 grid-cols-2 sm:gap-[30px] gap-[20px] mt-7">
          {data &&
            data?.map((item: any) => (
              <Product key={item.id} data={item} type="grid" />
            ))}
        </div>
      )}
    </div>
  );
};

export default ProductRendering;
