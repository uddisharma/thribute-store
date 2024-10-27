"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { useRouter } from "next/navigation";
import { data } from "@/data/HomeCategory";
import Link from "next/link";

const Collection = () => {
  const router = useRouter();

  const handleTypeClick = (type: string) => {
    router.push(`/`);
  };

  return (
    <div className="mb-10">
      <div className="heading3 text-center mt-10">Explore Collection</div>
      <p className="text-center text-secondary ">Categories we offer</p>
      <div className="collection-block md:pt-5 pt-5 pb-10">
        <div className="list-collection section-swiper-navigation md:mt-6 mt-6 sm:px-5 px-4">
          <Swiper
            spaceBetween={12}
            slidesPerView={2}
            navigation
            loop={true}
            modules={[Navigation, Autoplay]}
            breakpoints={{
              576: {
                slidesPerView: 2,
                spaceBetween: 12,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1200: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }}
            className="h-full"
          >
            {data?.map((e: any, i: any) => (
              <SwiperSlide key={i}>
                <Link
                  key={i}
                  href={{
                    pathname: "/categories/p",
                    query: {
                      p_n: e.p_n.toLowerCase(),
                      parent: e.parent.toLowerCase(),
                      name: e.name.toLowerCase(),
                      id: e.id,
                    },
                  }}
                  className="relative group  overflow-hidden collection-item block relative rounded-2xl overflow-hidden cursor-pointer max-h-64"
                >
                  <div
                    className="collection-item block relative rounded-2xl overflow-hidden cursor-pointer"
                    onClick={() => handleTypeClick("swimwear")}
                  >
                    <div className="bg-img">
                      <Image
                        src={e?.photo}
                        width={1000}
                        height={600}
                        alt={e?.name}
                      />
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white text-lg">{e?.name}</span>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Collection;
