import Referrals from "@/components/My-referrals/page";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Referrals",
};

const page = () => {
  return <Referrals />;
};

export default page;
