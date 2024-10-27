import Cart from "@/components/Seller/cart";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
};
const page = () => {
  return <Cart />;
};

export default page;
