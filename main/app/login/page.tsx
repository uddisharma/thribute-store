import Login1 from "@/components/Login/page";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

const page = () => {
  return <Login1 />;
};

export default page;
