"use client";
import React from "react";
import { useParams, useSearchParams } from "next/navigation";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import BreadcrumbProduct from "@/components/Breadcrumb/BreadcrumbProduct";
import Sale from "@/components/Product/Detail/Sale";
import Footer from "@/components/Footer/Footer";
import MenuSeller from "@/components/Header/Menu/MenuSeller";
import axios from "axios";
import useSWR from "swr";
import { BaseApi, productDetails } from "@/constants";
import Error from "@/components/error/page";
import ProductPageLoading from "@/components/loaders/Product";

const ProductDetails = () => {
  const params = useParams();
  const productId = params?.id;

  const fetcher = (url: any) => axios.get(url).then((res) => res.data);

  let { data, isLoading, error } = useSWR(
    `${BaseApi}${productDetails}/${productId}/${params?.seller}`,
    fetcher,
    {
      refreshInterval: 3600000,
    }
  );

  return (
    <>
      <TopNavOne
        props="style-one bg-black"
        slogan="New customers save 10% with the code GET10"
      />
      <div id="header" className="relative w-full">
        <MenuSeller props="bg-white" />
        <BreadcrumbProduct
          data={data}
          productPage="sale"
          productId={productId}
        />
      </div>
      {isLoading ? (
        <div className="">
          <ProductPageLoading />
        </div>
      ) : error ? (
        <div className="my-10 w-full md:w-9/12 lg:w-9/12 m-auto">
          <Error />
        </div>
      ) : (
        <Sale data={{ ...data, quantity: 1 }} />
      )}
      <Footer />
    </>
  );
};

export default ProductDetails;
