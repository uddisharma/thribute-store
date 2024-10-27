import Contact from "@/components/Contact/page";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact us",
};

const page = () => {
  return <Contact />;
};

export default page;
