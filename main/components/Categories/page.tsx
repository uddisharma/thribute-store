"use client";
import React, { useState } from "react";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";
import Image from "next/image";
import MenuHome from "@/components/Header/Menu/MenuHome";
import { data } from "@/data/HomeCategory";
import Link from "next/link";
import NoDataFound from "@/components/no-data/page";
import { convertImage, toBase64 } from "@/scripts/image";

const Categories = () => {
  const [activeTab, setActiveTab] = useState<string | undefined>("Men");

  const handleActiveTab = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      <TopNavOne
        props="style-one bg-black"
        slogan="New customers save 10% with the code GET10"
      />
      <div id="header" className="relative w-full">
        <MenuHome props="bg-transparent" />
        <Breadcrumb heading="Categories" subHeading="Categories" />
      </div>

      <div className="faqs-block md:py-20 py-10 ">
        <div className="container">
          <div className="categorycontainer">
            <div className="mt-10">
              <div className="menu-tab flex flex-col gap-5">
                {["Men", "Women", "Children", "Others"].map((item, index) => (
                  <div
                    key={index}
                    className={`tab-item inline-block w-fit heading6 has-line-before text-secondary2 hover:text-black duration-300 ${
                      activeTab === item ? "active" : ""
                    }`}
                    onClick={() => handleActiveTab(item)}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="">
              <div
                className={`tab-question flex flex-col gap-5 ${
                  activeTab === "Men" ? "active" : ""
                }`}
              >
                {data?.length <= 0 ? (
                  <div className="no-data-product my-20 w-full md:w-8/12 lg:w-8/12 m-auto">
                    <NoDataFound />
                  </div>
                ) : (
                  <div className="list-product-block relative">
                    <div
                      className={`shop-square list-product hide-product-sold grid lg:grid-cols-${4} sm:grid-cols-3 grid-cols-2 sm:gap-[30px] gap-[20px] `}
                    >
                      {data?.slice(0, 4).map((item: any, i: any) => (
                        <Link
                          key={i}
                          href={{
                            pathname: "/categories/p",
                            query: {
                              p_n: item.p_n.toLowerCase(),
                              parent: item.parent.toLowerCase(),
                              name: item.name.toLowerCase(),
                              id: item.id,
                            },
                          }}
                          className="relative group  overflow-hidden collection-item block relative rounded-2xl overflow-hidden cursor-pointer max-h-64"
                        >
                          <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-lg bg-gray-100 bg-img">
                            <Image
                              alt={item?.name}
                              src={item?.photo}
                              fill
                              priority
                              quality={90}
                              placeholder="blur"
                              sizes="(max-width: 768px) 100vw"
                              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                                convertImage(700, 475)
                              )}`}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-white text-lg">
                              {item?.name}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div
                className={`tab-question flex flex-col gap-5 ${
                  activeTab === "Women" ? "active" : ""
                }`}
              >
                {data?.length <= 0 ? (
                  <div className="no-data-product my-20 w-full md:w-8/12 lg:w-8/12 m-auto">
                    <NoDataFound />
                  </div>
                ) : (
                  <div className="list-product-block relative">
                    <div
                      className={`shop-square list-product hide-product-sold grid lg:grid-cols-${4} sm:grid-cols-3 grid-cols-2 sm:gap-[30px] gap-[20px] `}
                    >
                      {data?.slice(4, 8).map((item: any, i: any) => (
                        <Link
                          key={i}
                          href={{
                            pathname: "/categories/p",
                            query: {
                              p_n: item.p_n.toLowerCase(),
                              parent: item.parent.toLowerCase(),
                              name: item.name.toLowerCase(),
                              id: item.id,
                            },
                          }}
                          className="relative group  overflow-hidden collection-item block relative rounded-2xl overflow-hidden cursor-pointer max-h-64"
                        >
                          <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-lg bg-gray-100 bg-img">
                            <Image
                              alt={item?.name}
                              src={item?.photo}
                              fill
                              priority
                              quality={90}
                              placeholder="blur"
                              sizes="(max-width: 768px) 100vw"
                              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                                convertImage(700, 475)
                              )}`}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-white text-lg">
                              {item?.name}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div
                className={`tab-question flex flex-col gap-5 ${
                  activeTab === "Children" ? "active" : ""
                }`}
              >
                {data?.length <= 0 ? (
                  <div className="no-data-product my-20 w-full md:w-8/12 lg:w-8/12 m-auto">
                    <NoDataFound />
                  </div>
                ) : (
                  <div className="list-product-block relative">
                    <div
                      className={`shop-square list-product hide-product-sold grid lg:grid-cols-${4} sm:grid-cols-3 grid-cols-2 sm:gap-[30px] gap-[20px] `}
                    >
                      {data?.slice(8, 12).map((item: any, i: any) => (
                        <Link
                          key={i}
                          href={{
                            pathname: "/categories/p",
                            query: {
                              p_n: item.p_n.toLowerCase(),
                              parent: item.parent.toLowerCase(),
                              name: item.name.toLowerCase(),
                              id: item.id,
                            },
                          }}
                          className="relative group  overflow-hidden collection-item block relative rounded-2xl overflow-hidden cursor-pointer max-h-64"
                        >
                          <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-lg bg-gray-100 bg-img">
                            <Image
                              alt={item?.name}
                              src={item?.photo}
                              fill
                              priority
                              quality={90}
                              placeholder="blur"
                              sizes="(max-width: 768px) 100vw"
                              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                                convertImage(700, 475)
                              )}`}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-white text-lg">
                              {item?.name}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div
                className={`tab-question flex flex-col gap-5 ${
                  activeTab === "Others" ? "active" : ""
                }`}
              >
                {data?.length <= 0 ? (
                  <div className="no-data-product my-20 w-full md:w-8/12 lg:w-8/12 m-auto">
                    <NoDataFound />
                  </div>
                ) : (
                  <div className="list-product-block relative">
                    <div
                      className={`shop-square list-product hide-product-sold grid lg:grid-cols-${4} sm:grid-cols-3 grid-cols-2 sm:gap-[30px] gap-[20px] `}
                    >
                      {data?.slice(12, 20).map((item: any, i: any) => (
                        <Link
                          key={i}
                          href={{
                            pathname: "/categories/p",
                            query: {
                              p_n: item.p_n.toLowerCase(),
                              parent: item.parent.toLowerCase(),
                              name: item.name.toLowerCase(),
                              id: item.id,
                            },
                          }}
                          className="relative group  overflow-hidden collection-item block relative rounded-2xl overflow-hidden cursor-pointer max-h-64"
                        >
                          <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-lg bg-gray-100 bg-img">
                            <Image
                              alt={item?.name}
                              src={item?.photo}
                              fill
                              priority
                              quality={90}
                              placeholder="blur"
                              sizes="(max-width: 768px) 100vw"
                              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                                convertImage(700, 475)
                              )}`}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-white text-lg">
                              {item?.name}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
export default Categories;
