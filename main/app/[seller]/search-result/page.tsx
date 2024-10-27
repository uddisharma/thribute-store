import SearchResult from "@/components/Seller/search-result";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Search Result",
};

const page = () => {
  return <SearchResult />;
};

export default page;
