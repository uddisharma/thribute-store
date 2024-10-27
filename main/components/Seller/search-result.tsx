"use client";
import React, { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import Footer from "@/components/Footer/Footer";
import Product from "@/components/Product/Product";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import MenuSeller from "@/components/Header/Menu/MenuSeller";
import {
  sortByDiscountHighToLow,
  sortByDiscountLowToHigh,
  sortByNameAToZ,
  sortByNameZToA,
  sortByPriceHighToLow,
  sortByPriceLowToHigh,
} from "@/scripts/sorting";
import useSWR from "swr";
import { BaseApi, ItemperPage, SearchSellerProducts } from "@/constants";
import { useFilterControls } from "@/hooks/use-filter-control";
import axios from "axios";
import Pagination from "@/components/ui/pagination";
import NoDataFound from "@/components/no-data/page";
import Error from "@/components/error/page";
import Link from "next/link";

const SearchResult = () => {
  const searchParams = useSearchParams();
  let query = searchParams.get("query") as string;
  const params = useParams();

  const initialState = {
    page: "",
    sort: "",
    size: "",
  };
  const { state, paginate, onSort } = useFilterControls<
    typeof initialState,
    any
  >(initialState);
  const [page, setPage] = useState(state?.page ? state?.page : 1);
  const [sortBy, setSortBy] = useState(state?.sort ? state?.sort : null);
  const fetcher = (url: any) => axios.get(url).then((res) => res.data);

  let {
    data: p_data,
    error: p_error,
    isLoading: p_loading,
  } = useSWR(
    `${BaseApi}${SearchSellerProducts}/${params?.seller}?query=${query}&page=${page}&limit=${ItemperPage}`,
    fetcher,
    {
      refreshInterval: 3600000,
    }
  );
  // console.log(p_data?.data?.data);

  const paginator = p_data?.data?.paginator;
  p_data = p_data?.data?.data;
  if (p_data && state?.sort == "price-low-to-high") {
    p_data = sortByPriceLowToHigh(p_data);
  }
  if (p_data && state?.sort == "price-high-to-low") {
    p_data = sortByPriceHighToLow(p_data);
  }
  if (p_data && state?.sort == "name-a-to-z") {
    p_data = sortByNameAToZ(p_data);
  }
  if (p_data && state?.sort == "name-z-to-a") {
    p_data = sortByNameZToA(p_data);
  }
  if (p_data && state?.sort == "discount-low-to-high") {
    p_data = sortByDiscountLowToHigh(p_data);
  }
  if (p_data && state?.sort == "discount-high-to-low") {
    p_data = sortByDiscountHighToLow(p_data);
  }

  return (
    <>
      <TopNavOne
        props="style-one bg-black"
        slogan="New customers save 10% with the code GET10"
      />
      <div id="header" className="relative w-full">
        <MenuSeller props="bg-transparent" />
      </div>

      <div className="shop-product breadcrumb1 lg:py-20 md:py-14 py-20">
        <div className="container">
          <div className="list-product-block shop-square w-full md:w-9/12 m-auto md:pl-3">
            <div className="filter-heading flex items-center justify-between gap-5 flex-wrap">
              <Link
                className="flex gap-2 align-middle text-center cursor-pointer"
                href={`/${params?.seller}`}
              >
                <Icon.ArrowLeft size={20} className="mt-1" /> Go Back
              </Link>

              <div className="right flex items-center gap-3">
                <div className="select-block relative">
                  <select
                    id="select-filter"
                    name="select-filter"
                    className="caption1 py-2 pl-3 md:pr-20 pr-10 rounded-lg border border-line"
                    onChange={(e) => {
                      // handleSortChange(e.target.value);
                      onSort(e.target.value);
                      setSortBy(e.target.value);
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
            {p_loading ? (
              <div className="list-product-block lg:w-4/4 md:w-3/3 w-full md:pl-3">
                <div className="list-product hide-product-sold grid lg:grid-cols-4 grid-cols-2 sm:gap-[30px] gap-[20px] mt-7 m-auto">
                  {[...Array(16)].map((_, index) => (
                    <Product1 key={index} />
                  ))}
                </div>
              </div>
            ) : p_data?.length <= 0 || p_data == null ? (
              <div className="no-data-product my-10 md:w-8/12 lg:w-8/12 m-auto">
                <NoDataFound />
              </div>
            ) : p_error ? (
              <div className="my-10">
                <Error />
              </div>
            ) : (
              <div className="list-product hide-product-sold grid lg:grid-cols-4 grid-cols-2 sm:gap-[30px] gap-[20px] mt-7">
                {p_data &&
                  p_data?.map((item: any) => (
                    <Product key={item.id} data={item} type="grid" />
                  ))}
              </div>
            )}
            <div className="list-pagination w-full flex items-center md:mt-10 mt-10 justify-center">
              {p_data && (
                <Pagination
                  total={Number(paginator?.itemCount)}
                  pageSize={ItemperPage}
                  defaultCurrent={page}
                  showLessItems={true}
                  color="primary"
                  prevIconClassName="py-0 text-secondary !leading-[26px]"
                  nextIconClassName="py-0 text-secondary !leading-[26px]"
                  onChange={(e) => {
                    setPage(e);
                    paginate(e);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SearchResult;

function Product1() {
  return (
    <div className="skeleton-image product-item grid-type h-44 lg:h-52 md:h-52  rounded-lg animate-pulse">
      <div className="product-main cursor-pointer block">
        <div className="product-infor mt-4 lg:mb-7"></div>
      </div>
    </div>
  );
}
