import React from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";

const ProductPageLoading = () => {
  const colors = [
    {
      color: "pink",
      colorCode: "#F4407D",
      colorImage: "/images/product/color/red.png",
      image: "/images/product/fashion/3-1.png",
    },
    {
      color: "yellow",
      colorCode: "#ECB018",
      colorImage: "/images/product/color/yellow.png",
      image: "/images/product/fashion/3-3.png",
    },
    {
      color: "purple",
      colorCode: "#8684D4",
      colorImage: "/images/product/color/purple.png",
      image: "/images/product/fashion/3-4.png",
    },
  ];
  const sizes = ["S", "M", "L", "XL"];
  return (
    <>
      <div className="featured-product underwear md:py-10 py-10">
        <div className="container flex justify-between gap-y-6 flex-wrap">
          <div className="list-img md:w-1/2 md:pr-[45px] w-full">
            <div className="mySwiper2 rounded-2xl overflow-hidden">
              <div className="skeleton-image lg:w-1/2 w-full h-full object-cover"></div>
            </div>

            <div className="skeleton-image w-full h-96 rounded-lg"></div>
          </div>

          <div className=" product-infor md:w-1/2 w-full lg:pl-[15px] md:pl-2">
            <div className="text-secondary mt-2 skeleton-text w-full md:w-6/12 lg:w-5/12"></div>
            <div className="text-secondary mt-2 skeleton-text w-8/12 md:w-5/12 lg:w-4/12"></div>

            <div className="list-action mt-6">
              <div className="sold flex justify-between flex-wrap gap-4">
                <div className="text-title">Stock :</div>
                <div className="right w-3/4">
                  <div className="progress h-3 rounded-full overflow-hidden bg-line relative w-8/12">
                    <div className="percent-sold absolute top-0 left-0 h-full bg-red"></div>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <span></span>
                    <span className="text-secondary">
                      Only 0 item(s) left in stock!
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-title my-5">Description :</div>
              <div role="status" className=" animate-pulse max-w-lg">
                <div className="flex items-center w-full">
                  <div className="h-3 skeleton-text rounded-full w-32" />
                  <div className="h-3 ms-2 skeleton-text rounded-full dark:bg-gray-600 w-24" />
                  <div className="h-3 ms-2 skeleton-text rounded-full dark:bg-gray-600 w-full" />
                </div>
                <div className="flex items-center w-full max-w-[480px]">
                  <div className="h-3 skeleton-text rounded-full dark:bg-gray-700 w-full" />
                  <div className="h-3 ms-2 skeleton-text rounded-full dark:bg-gray-600 w-full" />
                  <div className="h-3 ms-2 skeleton-text rounded-full dark:bg-gray-600 w-24" />
                </div>
              </div>
              <div className="choose-color mt-5">
                <div className="text-title">
                  Colors: <span className="text-title color">{"Black"}</span>
                </div>
                <div className="list-color flex items-center gap-2 flex-wrap mt-3">
                  {colors.map((item, index) => (
                    <div
                      className={`color-item w-12 h-12 rounded-xl duration-300 relative `}
                      key={index}
                    >
                      {/* <Image
                      src={item.colorImage}
                      width={100}
                      height={100}
                      alt="color"
                      className=""
                    /> */}

                      <div
                        style={{
                          height: "45px",
                          width: "45px",
                          backgroundColor: item.colorCode,
                          borderRadius: "5px",
                        }}
                      ></div>
                      <div className="tag-action bg-black text-white caption2 capitalize px-1.5 py-0.5 rounded-sm">
                        {item.color}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="choose-size mt-5">
                <div className="heading flex items-center justify-between">
                  <div className="text-title">
                    Size: <span className="text-title size">{"SM"}</span>
                  </div>
                  <div className="caption1 size-guide text-red underline cursor-pointer">
                    Size Guide
                  </div>
                </div>
                <div className="list-size flex items-center gap-2 flex-wrap mt-3">
                  {sizes.map((item, index) => (
                    <div
                      className={`size-item ${
                        item === "freesize" ? "px-3 py-2" : "w-12 h-12"
                      } flex items-center justify-center text-button rounded-full bg-white border border-line `}
                      key={index}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-title mt-5">Quantity:</div>
              <div className="choose-quantity flex items-center lg:justify-between gap-5 gap-y-3 mt-3">
                <div className="quantity-block md:p-3 max-md:py-1.5 max-md:px-3 flex items-center justify-between rounded-lg border border-line sm:w-[180px] w-[120px] flex-shrink-0">
                  <Icon.Minus size={20} className={` cursor-pointer`} />
                  <div className="body1 font-semibold">2</div>
                  <Icon.Plus size={20} className="cursor-pointer" />
                </div>
                <div className=" cartbtn cursor-not-allowed button-main w-full text-center bg-white text-black border border-black hidden md:block lg:block  ">
                  Add To Cart
                </div>
                <div className="cursor-not-allowed cartbtn1 button-main w-full text-center bg-white text-black border border-black md:hidden lg:hidden">
                  Add To Cart
                </div>
              </div>
              <div className="button-block mt-5">
                <div className="cursor-not-allowed button-main w-full text-center">
                  Buy It Now
                </div>
              </div>
              <div className="flex items-center lg:gap-20 gap-8 mt-5 pb-6 border-b border-line">
                <div
                  className="compare flex items-center gap-3  cursor-not-allowed"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <div className="compare-btn md:w-12 md:h-12 w-10 h-10 flex items-center justify-center border border-line  rounded-xl duration-300 hover:bg-black hover:text-white cursor-not-allowed">
                    <Icon.ArrowsCounterClockwise className="heading6" />
                  </div>
                  <span>Compare</span>
                </div>
                <div className="cursor-not-allowed share flex items-center gap-3 ">
                  <div className="share-btn md:w-12 md:h-12 w-10 h-10 flex items-center justify-center border border-line cursor-pointer rounded-xl duration-300 hover:bg-black hover:text-white">
                    <Icon.ShareNetwork weight="fill" className="heading6" />
                  </div>
                  <span>Share Products</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="heading3 text-center">Related Products</div>
      <div className="container list-product hide-product-sold grid lg:grid-cols-4 grid-cols-2 sm:gap-[30px] gap-[20px] mt-7 m-auto mb-14">
        {[...Array(16)].map((_, index) => (
          <Product key={index} />
        ))}
      </div>
    </>
  );
};

export default ProductPageLoading;

function Product() {
  return (
    <div className="skeleton-image product-item grid-type h-44 lg:h-52 md:h-52  rounded-lg animate-pulse">
      <div className="product-main cursor-pointer block">
        <div className="product-infor mt-4 lg:mb-7"></div>
      </div>
    </div>
  );
}
