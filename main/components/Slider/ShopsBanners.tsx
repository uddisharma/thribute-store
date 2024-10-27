"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css/effect-fade";

const ShopsBanner = ({ data }: any) => {
  // console.log(data?.images);
  return (
    <>
      <div
        className={`container large-banner style-two  xl:h-[460px] lg:h-[400px] md:h-[380px] sm:h-[350px] h-[350px] max-[210px]:h-[200px] w-full`}
      >
        <div className="slider-main h-full w-full">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay]}
            className="h-full relative"
            autoplay={{
              delay: 3000,
            }}
          >
            {data &&
              data?.map((e: any, i: number) => (
                <SwiperSlide key={i}>
                  <div className="slider-item h-full w-full m-auto block">
                    <Image
                      src={
                        (e?.images && e?.images[0]?.desktop?.url) ??
                        "/images/banners/1.png"
                      }
                      width={1600}
                      height={936}
                      alt="bg2-1"
                      priority={true}
                      className="rounded-lg"
                    />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
      {/* xl:h-[460px] lg:h-[400px] md:h-[380px] sm:h-[350px] h-[350px] max-[210px]:h-[200px] */}
      <div className={`small-banner banner1 style-two   w-full`}>
        <div className="slider-main h-full w-full">
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay]}
            className="h-full relative"
            autoplay={{
              delay: 3000,
            }}
          >
            {data &&
              data?.map((e: any, i: number) => (
                <SwiperSlide key={i}>
                  <div className="slider-item w-full">
                    <Image
                      src={
                        (e?.images && e?.images[0]?.mobile?.url) ??
                        "/images/banners/3.png"
                      }
                      width={480}
                      height={636}
                      alt="bg2-1"
                      priority={true}
                    />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default ShopsBanner;
