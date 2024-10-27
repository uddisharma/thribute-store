// "use client";
import React from "react";
import MenuHome from "@/components/Header/Menu/MenuHome";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return & Refund Policy",
};
const AboutUs = () => {
  return (
    <>
      <div id="header" className="relative w-full">
        <MenuHome props="bg-transparent" />
      </div>
      <div className="about md:pt-10 pt-10 w-full md:w-8/12 m-auto">
        <div className="about-us-block">
          <div className="container">
            <div className="heading mt-16">
              <div className="heading3 text-left">Return & Refund</div>
              <div className="text-left mt-3">#Anvougetheme</div>
            </div>
            <div className="body1 text-left md:mt-5 mt-5">
              Kim Kardashian West needs no introduction. In the 14 years since
              she first graced our screens in Keeping Up With The Kardashians,
              she has built her KKW beauty empire, filmed her show, wrapped her
              show, become a billionaire, studied law, campaigned for the rights
              of death row inmates, travelled the world to attend events such as
              Paris Fashion Week, raised four children and launched her wildly
              successful shapewear brand SKIMS.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
