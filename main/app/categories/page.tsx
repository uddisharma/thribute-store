import Categories from "@/components/Categories/page";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories",
};

const page = () => {
  return <Categories />;
};

export default page;
