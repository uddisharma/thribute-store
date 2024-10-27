import Store from "@/components/Seller/page";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Store",
};
const page = () => {
  return <Store />;
};

export default page;
