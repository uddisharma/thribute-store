import Compare from "@/components/Compare/page";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Comparison",
};

const page = () => {
  return <Compare />;
};

export default page;
