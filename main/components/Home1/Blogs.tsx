"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import { TestimonialType } from "@/type/TestimonialType";
import BlogItem from "@/components/Blog/BlogItem";
import blogData from "@/data/Blog.json";
import "swiper/css/bundle";

interface Props {
  data: Array<TestimonialType>;
  limit: number;
}

const Blogs: React.FC<Props> = ({ data, limit }) => {
  return (
    <>
      <div className="testimonial-block md:py-20 py-10 bg-surface">
        <div className="container">
          <div className="heading3 text-center">Blogs</div>
          <p className="text-center text-secondary ">
            Service we provide to grow your business
          </p>

          <div className="list-testimonial pagination-mt40 md:mt-10 mt-6">
            <Swiper
              spaceBetween={12}
              slidesPerView={1}
              pagination={{ clickable: true }}
              loop={true}
              modules={[Pagination, Autoplay]}
              breakpoints={{
                680: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1200: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
            >
              {blogData?.slice(0, 6).map((prd, index) => (
                <SwiperSlide key={index}>
                  <BlogItem key={prd.id} data={prd} type="style-default" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogs;
