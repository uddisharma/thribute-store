import React from "react";
import Link from "next/link";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";
import MenuHome from "@/components/Header/Menu/MenuHome";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Track Order",
};

const OrderTracking = () => {
  return (
    <>
      <TopNavOne
        props="style-one bg-black"
        slogan="New customers save 10% with the code GET10"
      />
      <div id="header" className="relative w-full">
        <MenuHome props="bg-transparent" />
        <Breadcrumb heading="Order Tracking" subHeading="Order Tracking" />
      </div>
      <div className="order-tracking md:py-20 py-10">
        <div className="container">
          <div className="content-main flex gap-y-8 max-md:flex-col">
            <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
              <div className="heading4">Order Tracking</div>
              <div className="mt-2">
                To track your order please enter your Order ID in the box below
                and press the {String.raw`"`}Track{String.raw`"`} button. This
                was given to you on your receipt and in the confirmation email
                you should have received.
              </div>
              <form className="md:mt-7 mt-4">
                <div className="email ">
                  <input
                    className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                    id="awb"
                    type="text"
                    placeholder="Tracking / AWB Number *"
                    required
                  />
                </div>

                <div className="block-button md:mt-7 mt-4">
                  <button className="button-main">Track Order</button>
                </div>
              </form>
            </div>
            <div className="right md:w-1/2 w-full lg:pl-[60px] md:pl-[40px] flex items-center">
              {/* <div className="text-content">
                <div className="heading4">Already have an account?</div>
                <div className="mt-2 text-secondary">
                  Welcome back. Sign in to access your personalized experience,
                  saved preferences, and more. We{String.raw`'re`} thrilled to
                  have you with us again!
                </div>
                <div className="block-button md:mt-7 mt-4">
                  <Link href={"/login"} className="button-main">
                    Login
                  </Link>
                </div>
              </div> */}
              <div className="bg-img lg:w-8/12 lg:pr-[45px] md:w-full w-full block m-auto">
                <Image
                  src={"/image/track-order.png"}
                  width={1000}
                  height={1000}
                  alt="bg-img"
                  priority={true}
                  className="w-full rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderTracking;
