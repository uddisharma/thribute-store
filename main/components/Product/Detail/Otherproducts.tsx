import Pagination from "@/components/ui/pagination";
import { otherProductsLimit } from "@/constants";
import React from "react";
import Product from "../Product";
import Product1 from "@/components/Shop/Product1";

const Otherproducts = ({
  data2,
  isLoading2,
  error2,
  setPage1,
  page1,
  pagininator1,
}: any) => {
  return (
    <div>
      {data2 && data2?.length > 0 && (
        <div className="related-product md:py-10 py-10">
          <div className="container">
            <div className="heading3 text-center mb-10">Other Products</div>
            <div className="">
              {isLoading2 ? (
                <div className="shop-square list-product hide-product-sold  grid lg:grid-cols-5 grid-cols-2 md:gap-[30px] gap-5 md:mt-10 mt-6">
                  {[...Array(otherProductsLimit)].map(
                    (_: any, index: number) => (
                      <Product1 key={index} />
                    )
                  )}
                </div>
              ) : error2 ? (
                <div className="my-10">
                  <p className="text-center font-semibold">
                    Somtehing went wrong !
                  </p>
                </div>
              ) : (
                <div className="shop-square list-product hide-product-sold  grid lg:grid-cols-5 grid-cols-2 md:gap-[30px] gap-5 md:mt-10 mt-6">
                  {data2 &&
                    data2.map((item: any, index: number) => (
                      <Product key={index} data={item} type="grid" />
                    ))}
                </div>
              )}
            </div>
            <div className="list-pagination w-full flex items-center  justify-center">
              {data2 && (
                <Pagination
                  total={Number(pagininator1?.itemCount)}
                  pageSize={otherProductsLimit}
                  defaultCurrent={page1}
                  showLessItems={true}
                  color="primary"
                  prevIconClassName="py-0 text-secondary !leading-[26px]"
                  nextIconClassName="py-0 text-secondary !leading-[26px]"
                  onChange={(e) => {
                    setPage1(e);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Otherproducts;
