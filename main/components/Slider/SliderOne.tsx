"use client";

import React, { Component } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css/effect-fade";

const data = [
  {
    discount: "Sale! Up To 50% Off!",
    heading: "Summer Sale Collections",
    link: "/shop/breadcrumb-img",
    photo: "/images/slider/bg1-1.png",
  },
  {
    discount: "Sale! Up To 50% Off!",
    heading: "Fashion for Every Occasion",
    link: "/shop/breadcrumb-img",
    photo: "/images/slider/bg1-2.png",
  },
  {
    discount: "Sale! Up To 50% Off!",
    heading: "Stylish Looks for Any Season",
    link: "/shop/breadcrumb-img",
    photo: "/images/slider/bg1-3.png",
  },
];

const SliderOne = () => {
  return (
    <>
      <div className="slider-block style-one bg-linear xl:h-[500px] lg:h-[450px] md:h-[580px] sm:h-[500px] h-[350px] max-[420px]:h-[320px] w-full">
        <div className="slider-main h-full w-full">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay]}
            className="h-full relative"
            autoplay={{
              delay: 4000,
            }}
          >
            {data?.map((e: any, i: number) => (
              <SwiperSlide key={i}>
                <div className="slider-item h-full w-full relative">
                  <div className="container w-full h-full flex items-center relative">
                    <div className="text-content basis-1/2">
                      <div className="text-sub-display">{e?.discount}</div>
                      <div className="text-display md:mt-5 mt-2">
                        {e?.heading}
                      </div>
                      <Link href={e?.link} className="button-main md:mt-8 mt-3">
                        Shop Now
                      </Link>
                    </div>
                    <div className="sub-img absolute sm:w-1/2 w-3/5 2xl:-right-[60px] -right-[16px] bottom-0">
                      <Image
                        style={{ maxHeight: "500px" }}
                        src={e?.photo}
                        width={670}
                        height={536}
                        alt="bg1-1"
                        priority={true}
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default SliderOne;
