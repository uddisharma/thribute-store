import Becomeseller from "@/components/Become-a-seller/page";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Become Seller",
};
const page = () => {
  return <Becomeseller />;
};

export default page;
