import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import SwiperCore from "swiper/core";
import "swiper/css/bundle";
import Image from "next/image";
import InstagramPost from "@/components/Instagram/page";

SwiperCore.use([Navigation, Thumbs]);

const Swiper1 = ({ productMain, data }: any) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);
  const handleSwiper = (swiper: SwiperCore) => {
    setThumbsSwiper(swiper);
  };
  return (
    <div>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Thumbs]}
        className="mySwiper2 rounded-2xl overflow-hidden"
      >
        {productMain &&
          productMain?.images.map((item: any, index: number) => (
            <SwiperSlide key={index}>
              <Image
                src={item}
                width={1000}
                height={1000}
                alt="prd-img"
                className="w-full aspect-[3/4] object-cover"
              />
            </SwiperSlide>
          ))}
      </Swiper>
      <Swiper
        onSwiper={handleSwiper}
        spaceBetween={0}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[Navigation, Thumbs]}
        className="mySwiper style-rectangle"
      >
        {productMain &&
          productMain?.images.map((item: any, index: number) => (
            <SwiperSlide key={index}>
              <Image
                src={item}
                width={1000}
                height={1300}
                alt="prd-img"
                className="w-full aspect-[3/4] object-cover rounded-xl"
              />
            </SwiperSlide>
          ))}
      </Swiper>
      {data && data?.instaId && <InstagramPost id={data && data?.instaId} />}
    </div>
  );
};

export default Swiper1;
