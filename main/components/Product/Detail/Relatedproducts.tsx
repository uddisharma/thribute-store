import Product1 from "@/components/Shop/Product1";
import Pagination from "@/components/ui/pagination";
import { relatedProductsLimit } from "@/constants";
import React from "react";
import Product from "../Product";

const Relatedproducts = ({
  data1,
  isLoading,
  error,
  setPage,
  page,
  pagininator,
}: any) => {
  return (
    <div>
      {data1 && data1?.length > 0 && (
        <div className="related-product md:py-10 py-10">
          <div className="container">
            <div className="heading3 text-center mb-10">Related Products</div>
            <div className="shop-square list-product hide-product-sold  grid lg:grid-cols-5 grid-cols-2 md:gap-[30px] gap-5 md:mt-10 mt-6">
              {isLoading ? (
                <div className="shop-square list-product hide-product-sold  grid lg:grid-cols-5 grid-cols-2 md:gap-[30px] gap-5 md:mt-10 mt-6">
                  {[...Array(relatedProductsLimit)].map(
                    (_: any, index: number) => (
                      <Product1 key={index} />
                    )
                  )}
                </div>
              ) : error ? (
                <div className="my-10">
                  <p className="text-center font-semibold">
                    Somtehing went wrong !
                  </p>
                </div>
              ) : (
                data1 &&
                data1.map((item: any, index: number) => (
                  <Product key={index} data={item} type="grid" />
                ))
              )}
            </div>
            <div className="list-pagination w-full flex items-center  justify-center mt-5">
              {data1 && (
                <Pagination
                  total={Number(pagininator?.itemCount)}
                  pageSize={relatedProductsLimit}
                  defaultCurrent={page}
                  showLessItems={true}
                  color="primary"
                  prevIconClassName="py-0 text-secondary !leading-[26px]"
                  nextIconClassName="py-0 text-secondary !leading-[26px]"
                  onChange={(e) => {
                    setPage(e);
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

export default Relatedproducts;
