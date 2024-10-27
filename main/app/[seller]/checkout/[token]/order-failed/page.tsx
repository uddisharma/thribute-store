"use client";
import MenuHome from "@/components/Header/Menu/MenuHome";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div>
      <TopNavOne
        props="style-one bg-black"
        slogan="New customers save 10% with the code GET10"
      />
      <div id="header" className="relative w-full">
        <MenuHome props="bg-transparent" />
      </div>
      <div className="flex items-center justify-center h-screen">
        <div className="p-4 rounded ">
          <div className="flex flex-col items-center space-y-2">
            <svg
              style={{
                color: "red",
                border: "1px dashed red",
                borderRadius: "50%",
                height: "50px",
                width: "50px",
              }}
              xmlns="http://www.w3.org/2000/svg"
              className="text-red-600 w-28 h-28"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>

            <h1 className="text-4xl font-bold">Order Failed !</h1>
            <p className="text-center">
              {"We're"} sorry, but it looks like something went wrong with our
              servers.
            </p>
            <p className="text-center">
              Please try placing your order again later. If the issue persists,
              feel free to reach out to our customer support team for
              assistance.
            </p>
            <p className="text-center">Thank you for your understanding.</p>
            <a className="cursor-pointer inline-flex items-center px-4 py-2 text-white bg-indigo-600 border border-indigo-600  rounded-full hover:bg-indigo-700 focus:outline-none focus:ring">
              <svg
                style={{ color: "black" }}
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              <span className="text-sm font-medium text-black">Home</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;