import SellersByCategory from "@/components/Sellers/category";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Stores",
};

const page = () => {
  return <SellersByCategory />;
};

export default page;
