"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer/Footer";
import * as Icon from "@phosphor-icons/react/dist/ssr";

const SellerNotFound = () => {
  return (
    <>
      <div className="page-not-found ">
        <div className="container">
          <div className="flex items-center justify-between max-sm:flex-col gap-y-8">
            <Image
              src={"/images/other/404-img.png"}
              width={2000}
              height={2000}
              alt="bg-img"
              priority={true}
              className="sm:w-1/2 w-3/4"
            />
            <div className="text-content sm:w-1/2 w-full flex items-center justify-center sm:pl-10">
              <div className="">
                <div className="lg:text-[40px] md:text-[40px] text-[35px] lg:leading-[52px] md:leading-[42px] leading-[42px] font-semibold">
                  Seller Not Found !
                </div>
                {/* <div className="heading2 mt-4">No Data Found !</div> */}
                <div className="body1 text-secondary mt-4 pb-4">
                  There is no available data for this. <br /> Take a break
                  before trying again{" "}
                </div>
                <Link className="flex items-center gap-3" href={"/"}>
                  <Icon.ArrowLeft />
                  <div className="text-button">Back To Homepage</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerNotFound;
