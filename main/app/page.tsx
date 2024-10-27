"use client";
import React from "react";
import SliderPet from "@/components/Slider/SliderPet";
import Collection from "@/components/Home1/Collection";
import Benefit from "@/components/Home1/Benefit";
import Instagram from "@/components/Home1/Instagram";
import Brand from "@/components/Home1/Brand";
import Footer from "@/components/Footer/Footer";
import Newsletter from "@/components/Home1/Newsletter";
import Section2 from "@/components/Section2/page";
import Section3 from "@/components/Section3/page";
import Testimonial from "@/components/Home1/Testimonial";
import testimonialData from "@/data/Testimonial.json";
import MenuHome from "@/components/Header/Menu/MenuHome";
import Section4 from "@/components/Section4/page";
import Blogs from "@/components/Home1/Blogs";
import Section5 from "@/components/Section5/page";

export default function HomePet() {
  return (
    <div className="">
      <div id="header" className="relative w-full style-pet">
        <MenuHome props="bg-transparent" />
        <SliderPet />
      </div>
      <Brand />
      <div className="container">
        <div className="container instagram-block md:pt-14 pt-5">
          <div className="heading">
            <div className="heading3 text-center">Why Choose Us</div>
            <div className="text-center mt-2">#Thribue Stores</div>
          </div>
        </div>
        <Section2 />
        <div className="large-banner">
          <Section3 />
        </div>
        <div className="small-banner">
          <Section4 />
        </div>
        <Section5 />

        <Collection />
        <Testimonial data={testimonialData} limit={6} />
        <br />
        <Blogs data={testimonialData} limit={6} />
        <Instagram />
        <Benefit props="md:mt-10 mt-10 md:pt-10 pb-10 pt-10" />
        <br />

        {/* <br /> */}
        <Newsletter />
        <br />
        <Footer />
      </div>
    </div>
  );
}
