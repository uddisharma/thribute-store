import Order from "@/components/Order/page";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Details",
};

const page = () => {
  return <Order />;
};

export default page;
