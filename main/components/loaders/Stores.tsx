import Link from "next/link";
import React from "react";

const SkeletonCard = () => {
  return (
    <div className="container w-full md:w-11/12 lg:w-11/12 rounded-lg m-auto store-list md:my-10 my-10 animate-pulse">
      <div className="item bg-surface  rounded-[20px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 ">
          <div className="skeleton-image h-56 lg:h-96 md:h-96 rounded-lg"></div>
          <div className="text-content lg:pr-20 lg:pl-[100px] lg:py-14 sm:py-10 max-lg:px-6 w-full pb-5 mt-5 lg:mt-0 md:mt-0">
            <div className="heading3 skeleton-title h-10 w-8/12"></div>
            <div className="list-featrue lg:mt-10 mt-6">
              <div className="item flex lg:gap-10 gap-6">
                <div className="w-1/2">
                  <div className="heading6">Address:</div>
                  <div className="text-secondary mt-2 skeleton-text"></div>
                  <div className="text-secondary mt-2 skeleton-text w-8/12"></div>
                </div>
                <div className="w-1/2">
                  <div className="heading6"> social media:</div>
                  <div className="flex items-center sm:gap-4 gap-2 mt-2">
                    <Link
                      href={"https://www.facebook.com/"}
                      target="_blank"
                      className="item bg-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black hover:text-white duration-300"
                    >
                      <div className="icon-facebook"></div>
                    </Link>
                    <Link
                      href={"https://www.instagram.com/"}
                      target="_blank"
                      className="item bg-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black hover:text-white duration-300"
                    >
                      <div className="icon-instagram"></div>
                    </Link>
                    <Link
                      href={"https://www.youtube.com/"}
                      target="_blank"
                      className="item bg-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black hover:text-white duration-300"
                    >
                      <div className="icon-youtube"></div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="list-featrue mt-5">
              <div className="item flex lg:gap-10 gap-6">
                <div className="w-1/2">
                  <div className="heading6">Infomation:</div>
                  <div className="text-secondary mt-2 skeleton-text"></div>
                  <div className="text-secondary mt-2 skeleton-text w-8/12"></div>
                </div>
                <div className="w-1/2">
                  <div className="button-main md:mt-8 mt-3">Visit Store</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
