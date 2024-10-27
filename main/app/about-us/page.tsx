import React from "react";
import Image from "next/image";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Instagram from "@/components/Home1/Instagram";
import Brand from "@/components/Home1/Brand";
import Footer from "@/components/Footer/Footer";
import MenuHome from "@/components/Header/Menu/MenuHome";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About us",
};

const AboutUs = () => {
  return (
    <>
      <TopNavOne
        props="style-one bg-black"
        slogan="New customers save 10% with the code GET10"
      />
      <div id="header" className="relative w-full">
        <MenuHome props="bg-transparent" />
        <Breadcrumb heading="About Us" subHeading="About Us" />
      </div>
      <div className="about md:pt-20 pt-10">
        <div className="about-us-block">
          <div className="container">
            <div className="text flex items-center justify-center">
              <div className="content md:w-5/6 w-full ">
                <div className="heading3 text-center">
                  I{String.raw`'m`} obsessed with the dress Pippa Middleton wore
                  to her brother{String.raw`'s`} wedding.
                </div>
                <div className="body1 text-center md:mt-7 mt-5">
                  Kim Kardashian West needs no introduction. In the 14 years
                  since she first graced our screens in Keeping Up With The
                  Kardashians, she has built her KKW beauty empire, filmed her
                  show, wrapped her show, become a billionaire, studied law,
                  campaigned for the rights of death row inmates, travelled the
                  world to attend events such as Paris Fashion Week, raised four
                  children and launched her wildly successful shapewear brand
                  SKIMS.
                </div>
              </div>
            </div>
            <div className="heading mt-16">
              <div className="heading3 text-center">Meet our Founders</div>
              <div className="text-center mt-3">#Thribute Stores</div>
            </div>
            <div className="list-img w-full md:w-9/12 m-auto grid sm:grid-cols-3 gap-[30px] md:pt-10 pt-10">
              <div className="bg-img">
                <Image
                  src={"/image/about/3.png"}
                  width={1500}
                  height={2000}
                  alt="bg-img"
                  className="w-full rounded-[30px] "
                />
                <div className="">
                  <div
                    style={{ fontStyle: "italic" }}
                    className="heading5 mt-2 text-center"
                  >
                    Udit Sharma
                  </div>
                  <div className="text-center mt-1">Founder & CEO</div>
                </div>{" "}
              </div>
              <div className="bg-img">
                <Image
                  src={"/image/about/1.png"}
                  width={1500}
                  height={2000}
                  alt="bg-img"
                  className="w-full rounded-[30px]"
                />
                <div className="">
                  <div
                    style={{ fontStyle: "italic" }}
                    className="heading5 mt-2 text-center"
                  >
                    Kamal Sharma
                  </div>
                  <div className="text-center mt-1">Co Founder & CTO</div>
                </div>{" "}
              </div>
              <div className="bg-img">
                <Image
                  src={"/image/about/2.png"}
                  width={1500}
                  height={2000}
                  alt="bg-img"
                  className="w-full rounded-[30px]"
                />
                <div className="">
                  <div
                    style={{ fontStyle: "italic" }}
                    className="heading5 mt-2 text-center"
                  >
                    Vedparkash Sharma
                  </div>
                  <div className="text-center mt-1">Investor</div>
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Instagram />
      <Brand />
      <Footer />
    </>
  );
};

export default AboutUs;
