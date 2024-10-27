import Wishlist from "@/components/wishlist/page";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Wishlist",
};
const page = () => {
  return <Wishlist />;
};

export default page;
