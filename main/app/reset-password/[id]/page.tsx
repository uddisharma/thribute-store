import ResetPassword1 from "@/components/Reset-password/page";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Reset Password",
};
const page = () => {
  return <ResetPassword1 />;
};

export default page;
