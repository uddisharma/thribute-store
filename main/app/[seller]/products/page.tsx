"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import BreadcrumbProduct from "@/components/Breadcrumb/BreadcrumbProduct";
import Footer from "@/components/Footer/Footer";
import productData from "@/data/Product.json";
import MenuSeller from "@/components/Header/Menu/MenuSeller";
import ProductDetails from "@/components/loaders/Product";

const ProductThumbnailBottom = () => {
  const searchParams = useSearchParams();
  let productId = searchParams.get("id");

  if (productId === null) {
    productId = "1";
  }

  return (
    <>
      <TopNavOne
        props="style-one bg-black"
        slogan="New customers save 10% with the code GET10"
      />
      <div id="header" className="relative w-full">
        <MenuSeller props="bg-white" />
        <BreadcrumbProduct
          data={{ ...productData, quantity: 1 }}
          productPage="sale"
          productId={productId}
        />
      </div>
      <ProductDetails />
      <Footer />
    </>
  );
};

export default ProductThumbnailBottom;
