import StoreList from "@/components/Sellers/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stores",
};
const page = () => {
  return <StoreList />;
};

export default page;
