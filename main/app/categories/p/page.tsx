import CategoriesDetails from "@/components/Categories/details";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories",
};

const page = () => {
  return <CategoriesDetails />;
};

export default page;
