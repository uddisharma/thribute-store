"use client";
import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import ShopBreadCrumb1 from "@/components/Shop/ShopBreadCrumb1";
import Footer from "@/components/Footer/Footer";
import ShopsBanner from "@/components/Slider/ShopsBanners";
import MenuSeller from "@/components/Header/Menu/MenuSeller";
import useSWR from "swr";
import axios from "axios";
import {
  BaseApi,
  ItemperPage,
  SellerBanners,
  SellerProducts,
  sellerCategories,
} from "@/constants";
import { useFilterControls } from "@/hooks/use-filter-control";
import {
  sortByDiscountHighToLow,
  sortByDiscountLowToHigh,
  sortByNameAToZ,
  sortByNameZToA,
  sortByPriceHighToLow,
  sortByPriceLowToHigh,
} from "@/scripts/sorting";
import SellerDashboard from "@/components/loaders/Seller/SellerDashboard";
import Error from "@/components/error/page";
import SellerNotFound from "@/components/Seller-not-found/page";
import NoDataFound from "@/components/no-data/page";
import NotAccpecting from "@/components/not-accpecting/page";

export default function Store() {
  const searchParams = useSearchParams();
  let [type, setType] = useState<string | null | undefined>();
  let datatype = searchParams.get("type");
  let gender = searchParams.get("gender");

  useEffect(() => {
    setType(datatype);
  }, [datatype]);

  const params = useParams();

  const initialState = {
    page: "",
    sort: "",
    size: "",
  };
  const { state, paginate, onSort, applyFilter1 } = useFilterControls<
    typeof initialState,
    any
  >(initialState);
  const [page, setPage] = useState(state?.page ? state?.page : 1);
  const [sortBy, setSortBy] = useState(state?.sort ? state?.sort : null);
  const [size, setSize] = useState(state?.size ? state?.size : null);
  const [color, setColor] = useState(state?.color ? state?.color : null);
  const [category, setCategory] = useState<any>(
    state?.category ? state?.category : null
  );

  const fetcher = (url: any) => axios.get(url).then((res) => res.data);
  let {
    data: b_data,
    isLoading: b_loading,
    error: b_error,
  } = useSWR(`${BaseApi}${SellerBanners}/${params?.seller}`, fetcher, {
    refreshInterval: 3600000,
  });
  const b_status = b_data?.status;
  const eb_status = b_data?.status;
  b_data = b_data?.data?.data;
  const s_status = b_data && b_data[0]?.sellerId?.isActive;

  let {
    data: p_data,
    error: p_error,
    isLoading: p_loading,
  } = useSWR(
    `${BaseApi}${SellerProducts}/${
      params?.seller
    }?page=${page}&limit=${ItemperPage}${
      category ? `&category=${category}` : ""
    }${size ? `&size=${size}` : ""}${color ? `&color=${color}` : ""}`,
    fetcher,
    {
      refreshInterval: 3600000,
    }
  );

  const paginator = p_data?.data?.paginator;
  const p_status = p_data?.status;
  const ep_status = p_data?.status;
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

  let {
    data: c_data,
    isLoading: c_loading,
    error: c_error,
  } = useSWR(`${BaseApi}${sellerCategories}/${params?.seller}`, fetcher, {
    refreshInterval: 3600000,
  });
  c_data = c_data?.data?.sellingCategory;
  const c_status = c_data?.status;

  return (
    <>
      {b_loading || c_loading ? (
        <div className="container">
          <SellerDashboard />
        </div>
      ) : p_error || b_error || c_error ? (
        <SellerError />
      ) : b_status == "SELLERNOTFOUND" ||
        p_status == "SELLERNOTFOUND" ||
        c_status == "SELLERNOTFOUND" ? (
        <SellerNotFoundError />
      ) : s_status == false ? (
        <NotAccpectingOrder />
      ) : eb_status == "RECORD_NOT_FOUND" && ep_status == "RECORD_NOT_FOUND" ? (
        <RecordNotFound />
      ) : (
        <>
          <TopNavOne
            props="style-one bg-black"
            slogan="New customers save 10% with the code GET10"
          />
          <div id="header" className="relative w-full">
            <MenuSeller props="relative w-full" />
            <ShopsBanner data={b_data} />
          </div>

          <div className="shop-square">
            <ShopBreadCrumb1
              data={p_data}
              pagiation={paginator}
              productPerPage={9}
              dataType={type}
              gender={gender}
              category={category}
              page={page}
              setPage={setPage}
              paginate={paginate}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onSort={onSort}
              applyFilter={applyFilter1}
              setSize1={setSize}
              setColor1={setColor}
              p_loading={p_loading}
              p_error={p_error}
              c_data={c_data}
              setCategory={setCategory}
              category1={category}
            />
          </div>

          <Footer />
        </>
      )}
    </>
  );
}

const SellerError = () => {
  return (
    <div>
      <div className="">
        <TopNavOne
          props="style-one bg-black"
          slogan="New customers save 10% with the code GET10"
        />
        <div id="header" className="relative w-full">
          <MenuSeller props="relative w-full" />
        </div>
        <div className="my-20 w-full md:w-8/12 lg:w-8/12 m-auto">
          <Error />
        </div>
        <Footer />
      </div>
    </div>
  );
};

const SellerNotFoundError = () => {
  return (
    <div className="">
      <TopNavOne
        props="style-one bg-black"
        slogan="New customers save 10% with the code GET10"
      />
      <div id="header" className="relative w-full">
        <MenuSeller props="relative w-full" />
      </div>
      <div className="my-20 w-full md:w-8/12 lg:w-8/12 m-auto">
        <SellerNotFound />
      </div>
      <Footer />
    </div>
  );
};

const NotAccpectingOrder = () => {
  return (
    <div className="">
      <TopNavOne
        props="style-one bg-black"
        slogan="New customers save 10% with the code GET10"
      />
      <div id="header" className="relative w-full">
        <MenuSeller props="relative w-full" />
      </div>
      <div className="my-20 w-full md:w-8/12 lg:w-8/12 m-auto">
        <NotAccpecting />
      </div>
      <Footer />
    </div>
  );
};

const RecordNotFound = () => {
  return (
    <div className="">
      <TopNavOne
        props="style-one bg-black"
        slogan="New customers save 10% with the code GET10"
      />
      <div id="header" className="relative w-full">
        <MenuSeller props="relative w-full" />
      </div>
      <div className="my-20 w-full md:w-8/12 lg:w-8/12 m-auto">
        <NoDataFound />
      </div>
      <Footer />
    </div>
  );
};
