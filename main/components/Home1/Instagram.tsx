"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css/bundle";

const Instagram = () => {
  const data = [
    {
      img: "/image/instagram/1.png",
    },
    {
      img: "/image/instagram/2.png",
    },
    {
      img: "/image/instagram/3.png",
    },
    {
      img: "/image/instagram/4.png",
    },
    {
      img: "/image/instagram/5.png",
    },
    {
      img: "/image/instagram/6.png",
    },
  ];
  return (
    <>
      <div className="instagram-block md:pt-20 pt-10">
        <div className="container">
          <div className="heading">
            <div className="heading3 text-center">Thribute On Instagram</div>
            <div className="text-center mt-3">#Anvougetheme</div>
          </div>
        </div>
        <div className="list-instagram mt-7">
          <Swiper
            slidesPerView={2}
            loop={true}
            modules={[Autoplay]}
            autoplay={{
              delay: 4000,
            }}
            breakpoints={{
              576: {
                slidesPerView: 3,
              },
              680: {
                slidesPerView: 4,
              },
              992: {
                slidesPerView: 5,
              },
              1290: {
                slidesPerView: 6,
              },
            }}
          >
            {[
              data?.map((e: any) => (
                <SwiperSlide key={e} className="m-1 ">
                  <Link
                    href={"https://www.instagram.com/"}
                    target="_blank"
                    className="item relative block overflow-hidden"
                  >
                    <Image
                      src={e?.img}
                      width={300}
                      height={300}
                      alt="1"
                      className="h-full w-full duration-500 relative rounded-xl"
                    />
                    <div className="icon w-12 h-12 bg-white hover:bg-black duration-500 flex items-center justify-center rounded-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]">
                      <div className="icon-instagram text-2xl text-black"></div>
                    </div>
                  </Link>
                </SwiperSlide>
              )),
            ]}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Instagram;
