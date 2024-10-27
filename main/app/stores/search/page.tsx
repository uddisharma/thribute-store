import SellerSearch from "@/components/Sellers/search";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stores",
};

const page = () => {
  return <SellerSearch />;
};

export default page;
