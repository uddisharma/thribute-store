import ForgotPassword1 from "@/components/Forgot-password/page";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
};

const page = () => {
  return <ForgotPassword1 />;
};

export default page;
