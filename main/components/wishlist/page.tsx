"use client";
import React, { useState } from "react";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";
import Product from "@/components/Product/Product";
import { useWishlist } from "@/context/WishlistContext";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import MenuHome from "@/components/Header/Menu/MenuHome";
import NoDataFound from "@/components/no-data/page";
import {
  sortByDiscountHighToLow,
  sortByDiscountLowToHigh,
  sortByNameAToZ,
  sortByNameZToA,
  sortByPriceHighToLow,
  sortByPriceLowToHigh,
} from "@/scripts/sorting";
import { useRouter } from "next/navigation";

const Wishlist = () => {
  let { wishlistState } = useWishlist();
  const [sortOption, setSortOption] = useState("");
  const router = useRouter();

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  let wishlistData = wishlistState?.wishlistArray;

  if (sortOption == "price-low-to-high") {
    wishlistData = sortByPriceLowToHigh(wishlistState?.wishlistArray);
  }
  if (sortOption == "price-high-to-low") {
    wishlistData = sortByPriceHighToLow(wishlistState?.wishlistArray);
  }
  if (sortOption == "name-a-to-z") {
    wishlistData = sortByNameAToZ(wishlistState?.wishlistArray);
  }
  if (sortOption == "name-z-to-a") {
    wishlistData = sortByNameZToA(wishlistState?.wishlistArray);
  }
  if (sortOption == "discount-low-to-high") {
    wishlistData = sortByDiscountLowToHigh(wishlistState?.wishlistArray);
  }
  if (sortOption == "discount-high-to-low") {
    wishlistData = sortByDiscountHighToLow(wishlistState?.wishlistArray);
  }

  return (
    <>
      <TopNavOne
        props="style-one bg-black"
        slogan="New customers save 10% with the code GET10"
      />
      <div id="header" className="relative w-full">
        <MenuHome props="bg-transparent" />
        <Breadcrumb heading="Wish list" subHeading="Wish list" />
      </div>
      <div className="shop-product breadcrumb1 lg:py-10 md:py-10 py-10">
        <div className="container">
          <div className="list-product-block relative shop-square w-full md:w-9/12 m-auto md:pl-3">
            <div className="filter-heading flex items-center justify-between gap-5 flex-wrap">
              <div
                className="flex gap-2 align-middle text-center cursor-pointer"
                onClick={() => {
                  router.back();
                }}
              >
                <Icon.ArrowLeft size={20} className="mt-1" /> Go Back
              </div>

              <div className="right flex items-center gap-3">
                <div className="select-block relative">
                  <select
                    id="select-filter"
                    name="select-filter"
                    className="caption1 py-2 pl-3 md:pr-20 pr-10 rounded-lg border border-line"
                    onChange={(e) => {
                      handleSortChange(e.target.value);
                    }}
                    defaultValue={"Sorting"}
                  >
                    <option value="Sorting" disabled>
                      Sorting
                    </option>
                    <option value="price-low-to-high">
                      Price - Low to High
                    </option>
                    <option value="price-high-to-low">
                      Price - High to Low
                    </option>
                    <option value="name-a-to-z">Name - A to Z</option>
                    <option value="name-z-to-a">Name - Z to A</option>
                  </select>
                  <Icon.CaretDown
                    size={12}
                    className="absolute top-1/2 -translate-y-1/2 md:right-4 right-2"
                  />
                </div>
              </div>
            </div>

            {wishlistData?.length <= 0 ? (
              <div className="no-data-product my-10 md:w-8/12 lg:w-8/12 m-auto">
                <NoDataFound />
              </div>
            ) : (
              <div
                className={`shop-square list-product hide-product-sold grid lg:grid-cols-${4} sm:grid-cols-3 grid-cols-2 sm:gap-[30px] gap-[20px] mt-7`}
              >
                {wishlistData.map((item) => (
                  <Product key={item.id} data={item} type="grid" />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;
