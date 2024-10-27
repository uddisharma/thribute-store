import Faqs from "@/components/Faqs/page";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Faqs",
};

const page = () => {
  return <Faqs />;
};

export default page;
