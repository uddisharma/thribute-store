"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css/effect-fade";

const SliderPet = () => {
  return (
    <>
      <div className="slider-block style-one 2xl:h-[780px] xl:h-[740px] lg:h-[680px] md:h-[580px] sm:h-[500px] h-[420px] w-full md:pb-20 pb-10">
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
            <SwiperSlide>
              <div className="slider-item h-full w-full relative">
                <div className="container w-full h-full flex items-center flex-wrap">
                  <div className="text-content sm:w-1/2 w-2/3">
                    <div className="text-sub-display">Sale! Up To 50% Off!</div>
                    <div className="text-display md:mt-5 mt-2">
                      Discover Your Style Story
                    </div>
                    <Link
                      href="/stores"
                      className="button-main md:mt-8 mt-3"
                    >
                      Shop Now
                    </Link>
                  </div>
                  <div className="sub-img absolute left-0 top-0 w-full h-full z-[-1]">
                    <Image
                      src={"/image/banners/1.png"}
                      width={2560}
                      height={1080}
                      alt="bg-pet1-1"
                      priority={true}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="slider-item h-full w-full relative">
                <div className="container w-full h-full flex items-center">
                  <div className="text-content sm:w-1/2 w-2/3">
                    <div className="text-sub-display">Sale! Up To 50% Off!</div>
                    <div className="text-display md:mt-5 mt-2">
                      Elevate Your Wardrobe
                    </div>
                    <Link
                      href="/stores"
                      className="button-main md:mt-8 mt-3"
                    >
                      Shop Now
                    </Link>
                  </div>
                  <div className="sub-img absolute left-0 top-0 w-full h-full z-[-1]">
                    <Image
                      src={"/image/banners/2.png"}
                      width={2560}
                      height={1080}
                      alt="bg-pet1-2"
                      priority={true}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="slider-item h-full w-full relative">
                <div className="container w-full h-full flex items-center">
                  <div className="text-content sm:w-1/2 w-2/3">
                    <div className="text-sub-display">Sale! Up To 50% Off!</div>
                    <div className="text-display md:mt-5 mt-2">
                      Step into Fashion{String.raw`'s`} Finest
                    </div>
                    <Link
                      href="/stores"
                      className="button-main md:mt-8 mt-3"
                    >
                      Shop Now
                    </Link>
                  </div>
                  <div className="sub-img absolute left-0 top-0 w-full h-full z-[-1]">
                    <Image
                      src={"/image/banners/3.png"}
                      width={2560}
                      height={1080}
                      alt="bg-pet1-3"
                      priority={true}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default SliderPet;
