import MyAccount from "@/components/profile/page";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Account",
};

const page = () => {
  return <MyAccount />;
};

export default page;
