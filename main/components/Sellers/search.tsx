"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";
import MenuHome from "@/components/Header/Menu/MenuHome";
import StoresLoading from "@/components/loaders/Stores";
import axios from "axios";
import useSWR from "swr";
import { AllSellersLimit, BaseApi, SearchSellers } from "@/constants";
import Error from "@/components/error/page";
import NoDataFound from "@/components/no-data/page";
import { useSearchParams } from "next/navigation";

const SellerSearch = () => {
  const [page, setPage] = useState(1);
  const fetcher = (url: any) => axios.get(url).then((res) => res.data);
  const searchParams = useSearchParams();

  const { data, isLoading, error } = useSWR(
    `${BaseApi}${SearchSellers}?query=${searchParams.get("q")}`,
    fetcher,
    {
      refreshInterval: 3600000,
      onErrorRetry({ retrycount }: any) {
        if (retrycount > 3) {
          return false;
        }
      },
    }
  );

  const sellers = data?.data;

  return (
    <>
      <TopNavOne
        props="style-one bg-black"
        slogan="New customers save 10% with the code GET10"
      />
      <div id="header" className="relative w-full">
        <MenuHome props="bg-transparent" />
        <Breadcrumb heading="Stores List" subHeading="Stores list" />
      </div>

      {isLoading ? (
        [...Array(AllSellersLimit)].map((e, i) => (
          <div key={i}>
            <StoresLoading />
          </div>
        ))
      ) : data?.status == "RECORD_NOT_FOUND" ? (
        <div className="my-20 w-full md:w-8/12 lg:w-8/12 m-auto">
          <NoDataFound />
        </div>
      ) : error ? (
        <div className="my-20 w-full md:w-8/12 lg:w-8/12 m-auto">
          <Error />
        </div>
      ) : (
        <div className="container w-full md:w-11/12 lg:w-11/12">
          <div className="mt-10"></div>
          {sellers?.map((e: any, i: number) => (
            <>
              {i % 2 == 0 ? (
                <div key={i} className="store-list md:my-10 my-10">
                  <div className=" item bg-surface overflow-hidden rounded-[20px]">
                    <div className="flex items-center lg:justify-end relative max-lg:flex-col">
                      <Link href={`/${e?.username}`}>
                        <Image
                          src={
                            e?.cover ?? "/images/other/store-list-office1.png"
                          }
                          width={3000}
                          height={2000}
                          alt="bg-img"
                          className="lg:absolute relative top-0 left-0 lg:bottom-0 lg:w-1/2 w-full h-full object-cover"
                        />
                      </Link>
                      <div className="text-content lg:w-1/2 lg:pr-20 lg:pl-[100px] lg:py-14 sm:py-10 py-6 max-lg:px-6">
                        <div className="heading3">
                          {e?.shopname ?? "Shop Name"}
                        </div>
                        <div className="list-featrue lg:mt-10 mt-6">
                          <div className="item flex lg:gap-10 gap-6">
                            <div className="w-1/2">
                              <div className="heading6">Address:</div>
                              <div className="text-secondary mt-2">
                                {e?.shopaddress
                                  ? `${e?.shopaddress?.address1} ${e?.shopaddress?.landmark} ${e?.shopaddress?.city} ${e?.shopaddress?.state} ${e?.shopaddress?.pincode}`
                                  : "Shop Address"}
                              </div>
                            </div>

                            <div className="w-1/2">
                              <div className="heading6"> Social media:</div>
                              <div className="flex items-center sm:gap-4 gap-2 mt-2">
                                <a
                                  href={
                                    e?.socialLinks?.facebook ??
                                    "https://www.facebook.com/"
                                  }
                                  target="_blank"
                                  className="item bg-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black hover:text-white duration-300"
                                >
                                  <div className="icon-facebook"></div>
                                </a>
                                <a
                                  href={
                                    e?.socialLinks?.instagram ??
                                    "https://www.instagram.com/"
                                  }
                                  target="_blank"
                                  className="item bg-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black hover:text-white duration-300"
                                >
                                  <div className="icon-instagram"></div>
                                </a>
                                <a
                                  href={
                                    e?.socialLinks?.youtube ??
                                    "https://www.youtube.com/"
                                  }
                                  target="_blank"
                                  className="item bg-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black hover:text-white duration-300"
                                >
                                  <div className="icon-youtube"></div>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="list-featrue mt-5">
                          <div className="item flex lg:gap-10 gap-6">
                            <div className="w-1/2">
                              <div className="heading6">Infomation:</div>
                              <div className="text-secondary mt-2">
                                {e?.mobileNo}
                                <br />
                                {e?.email}
                              </div>
                            </div>
                            <div className="w-1/2">
                              <Link
                                href={`/${e?.username}`}
                                className="button-main md:mt-8 mt-3 md:w-44 lg:w-44 "
                              >
                                Visit Store
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div key={i} className="store-list ">
                  <div className="item bg-surface overflow-hidden rounded-[20px]">
                    <div className="flex items-center justify-start relative max-lg:flex-col-reverse">
                      <div className="text-content lg:w-1/2 w-full lg:pl-20 lg:pr-[100px] lg:py-14 sm:py-10 py-6 max-lg:px-6">
                        <div className="heading3">
                          {e?.shopname ?? "Shop Name"}
                        </div>
                        <div className="list-featrue lg:mt-10 mt-6">
                          <div className="item flex lg:gap-10 gap-6">
                            <div className="w-1/2">
                              <div className="heading6">Address:</div>
                              <div className="text-secondary mt-2">
                                {e?.shopaddress
                                  ? `${e?.shopaddress?.address1} ${e?.shopaddress?.landmark} ${e?.shopaddress?.city} ${e?.shopaddress?.state} ${e?.shopaddress?.pincode}`
                                  : "Shop Address"}
                              </div>
                            </div>
                            <div className="w-1/2">
                              <div className="heading6"> Social media:</div>
                              <div className="flex items-center sm:gap-4 gap-2 mt-2">
                                <a
                                  href={
                                    e?.socialLinks?.facebook ??
                                    "https://www.facebook.com/"
                                  }
                                  target="_blank"
                                  className="item bg-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black hover:text-white duration-300"
                                >
                                  <div className="icon-facebook"></div>
                                </a>
                                <a
                                  href={
                                    e?.socialLinks?.instagram ??
                                    "https://www.instagram.com/"
                                  }
                                  target="_blank"
                                  className="item bg-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black hover:text-white duration-300"
                                >
                                  <div className="icon-instagram"></div>
                                </a>
                                <a
                                  href={
                                    e?.socialLinks?.youtube ??
                                    "https://www.youtube.com/"
                                  }
                                  target="_blank"
                                  className="item bg-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black hover:text-white duration-300"
                                >
                                  <div className="icon-youtube"></div>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="list-featrue mt-5">
                          <div className="item flex lg:gap-10 gap-6">
                            <div className="w-1/2">
                              <div className="heading6">Infomation:</div>
                              <div className="text-secondary mt-2 overflow-x-hidden">
                                {e?.mobileNo}
                                <br />
                                {e?.email}
                              </div>
                            </div>
                            <div className="w-1/2">
                              <Link
                                href={`/${e?.username}`}
                                className="button-main md:mt-8 mt-3"
                              >
                                Visit Store
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Link href={`/${e?.username}`}>
                        <Image
                          src={
                            e?.cover ?? "/images/other/store-list-office2.png"
                          }
                          width={3000}
                          height={2000}
                          alt="bg-img"
                          className="lg:absolute relative top-0 right-0 bottom-0 lg:bottom-0 lg:w-1/2 w-full h-full object-cover"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </>
          ))}

          <div className="mb-10"></div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default SellerSearch;
