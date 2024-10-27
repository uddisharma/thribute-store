import React from "react";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import Footer from "@/components/Footer/Footer";
import MenuSeller from "@/components/Header/Menu/MenuSeller";
import Banner from "./Banner";
import * as Icon from "@phosphor-icons/react/dist/ssr";
export default function SellerDashboard() {
  return (
    <>
      <TopNavOne
        props="style-one bg-black"
        slogan="New customers save 10% with the code GET10"
      />
      <div id="header" className="relative w-full">
        <MenuSeller props="relative w-full mt-2" />
        <Banner />
      </div>

      <div className="shop-square">
        <ProductFilter />
      </div>
      <Footer />
    </>
  );
}

function ProductFilter() {
  function getRandomNumber() {
    return Math.floor(Math.random() * (11 - 5 + 1)) + 5;
  }

  return (
    <div>
      <div className="shop-product breadcrumb1 lg:py-15 md:py-10 py-6">
        <div className="">
          <div className="flex max-md:flex-wrap max-md:flex-col-reverse gap-y-8">
            <div className="large-banner sidebar lg:w-1/5 md:w-1/4 w-full md:pr-12">
              <div className="filter-type pb-8 border-b border-line">
                <div className="heading6">Products Type</div>
                <div className="list-type mt-4">
                  {[...Array(10)].map((_, index) => (
                    <div
                      key={index}
                      className={`text-secondary mt-2 skeleton-text h-4 w-${getRandomNumber()}/12`}
                    ></div>
                  ))}
                </div>
              </div>
              <div className="filter-size pb-8 border-b border-line mt-8">
                <div className="heading6">Size</div>
                <div className="list-size flex items-center flex-wrap gap-3 gap-y-4 mt-4">
                  {["XS", "S", "M", "L", "XL", "2XL", "3XL"].map(
                    (item, index) => (
                      <div
                        key={index}
                        className={`size-item text-button w-[44px] h-[44px] flex items-center justify-center rounded-full border border-line `}
                      >
                        {item}
                      </div>
                    )
                  )}
                  <div
                    className={`size-item text-button px-4 py-2 flex items-center justify-center rounded-full border border-line `}
                  >
                    Freesize
                  </div>
                </div>
              </div>
              <div className="filter-price pb-8 border-b border-line mt-8">
                <div className="heading6">Price Range</div>
                {/* <Slider
                  range
                  defaultValue={[0, 2000]}
                  min={0}
                  max={2000}
                  className="mt-5"
                /> */}
                <div className="price-block flex items-center justify-between flex-wrap mt-4">
                  <div className="min flex items-center gap-1">
                    <div>Min price:</div>
                    <div className="price-min">
                      $<span>{200}</span>
                    </div>
                  </div>
                  <div className="min flex items-center gap-1">
                    <div>Max price:</div>
                    <div className="price-max">
                      $<span>{2000}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="filter-color pb-8 border-b border-line mt-8">
                <div className="heading6">colors</div>
                <div className="list-color flex items-center flex-wrap gap-3 gap-y-4 mt-4">
                  <div
                    className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line `}
                  >
                    <div className="color bg-[#F4C5BF] w-5 h-5 rounded-full"></div>
                    <div className="caption1 capitalize">pink</div>
                  </div>
                  <div
                    className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line `}
                  >
                    <div className="color bg-red w-5 h-5 rounded-full"></div>
                    <div className="caption1 capitalize">red</div>
                  </div>
                  <div
                    className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line`}
                  >
                    <div className="color bg-green w-5 h-5 rounded-full"></div>
                    <div className="caption1 capitalize">green</div>
                  </div>
                  <div
                    className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line `}
                  >
                    <div className="color bg-yellow w-5 h-5 rounded-full"></div>
                    <div className="caption1 capitalize">yellow</div>
                  </div>
                  <div
                    className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line `}
                  >
                    <div className="color bg-purple w-5 h-5 rounded-full"></div>
                    <div className="caption1 capitalize">purple</div>
                  </div>
                  <div
                    className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line `}
                  >
                    <div className="color bg-black w-5 h-5 rounded-full"></div>
                    <div className="caption1 capitalize">black</div>
                  </div>
                  <div
                    className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line `}
                  >
                    <div className="color bg-[#F6EFDD] w-5 h-5 rounded-full"></div>
                    <div className="caption1 capitalize">white</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="list-product-block lg:w-4/4 md:w-3/3 w-full md:pl-3">
              <div className="filter-heading flex items-center justify-between gap-5 flex-wrap">
                <div className="left flex has-line items-center flex-wrap gap-5">
                  <div className="large-banner">
                    <div className="check-sale flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="filterSale"
                        id="filter-sale"
                        className="border-line"
                      />
                      <label
                        htmlFor="filter-sale"
                        className="cation1 cursor-pointer"
                      >
                        on sale
                      </label>
                    </div>
                  </div>
                  <div className="small-banner">
                    <div className="filter-sidebar-btn flex items-center gap-2 cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M4 21V14"
                          stroke="#1F1F1F"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4 10V3"
                          stroke="#1F1F1F"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 21V12"
                          stroke="#1F1F1F"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 8V3"
                          stroke="#1F1F1F"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M20 21V16"
                          stroke="#1F1F1F"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M20 12V3"
                          stroke="#1F1F1F"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M1 14H7"
                          stroke="#1F1F1F"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 8H15"
                          stroke="#1F1F1F"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M17 16H23"
                          stroke="#1F1F1F"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>Filters</span>
                    </div>
                  </div>
                </div>
                <div className="right flex items-center gap-3">
                  <div className="select-block relative">
                    <select
                      id="select-filter"
                      name="select-filter"
                      className="caption1 py-2 pl-3 md:pr-20 pr-10 rounded-lg border border-line"
                      defaultValue={"Sorting"}
                    >
                      <option value="Sorting" disabled>
                        Sorting
                      </option>
                      <option value="soldQuantityHighToLow">
                        Best Selling
                      </option>
                      <option value="discountHighToLow">Best Discount</option>
                      <option value="priceHighToLow">Price High To Low</option>
                      <option value="priceLowToHigh">Price Low To High</option>
                    </select>
                    <Icon.CaretDown
                      size={12}
                      className="absolute top-1/2 -translate-y-1/2 md:right-4 right-2"
                    />
                  </div>
                </div>
              </div>

              <div className="list-product hide-product-sold grid lg:grid-cols-4 grid-cols-2 sm:gap-[30px] gap-[20px] mt-7 m-auto">
                {[...Array(16)].map((_, index) => (
                  <Product key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Product() {
  return (
    <div className="skeleton-image product-item grid-type h-44 lg:h-52 md:h-52  rounded-lg animate-pulse">
      <div className="product-main cursor-pointer block">
        <div className="product-infor mt-4 lg:mb-7"></div>
      </div>
    </div>
  );
}
