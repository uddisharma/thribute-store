"use client";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";
import MenuHome from "@/components/Header/Menu/MenuHome";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import Error from "@/components/error/page";
import MyReferrals from "@/components/loaders/myreferrals";
import Toast from "@/components/ui/toast";
import { BaseApi, errorRetry, myReferrals } from "@/constants";
import { fetcher } from "@/constants/fetcher";
import { calculateEarnedAmount } from "@/scripts/referrals";
import Link from "next/link";
import React from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import useSWR from "swr";
const Referrals = () => {
  const [cookies, _setCookie] = useCookies(["usertoken"]);

  let { data, isLoading, error } = useSWR(
    `${BaseApi}${myReferrals}`,
    (url) => fetcher(url, cookies.usertoken),
    {
      refreshInterval: 3600000,
      revalidateOnMount: true,
      revalidateOnFocus: true,
      onErrorRetry({ retrycount }: any) {
        if (retrycount > errorRetry) {
          return false;
        }
      },
    }
  );

  const authstatus = error?.response?.data?.status == "UNAUTHORIZED" && true;

  if (authstatus) {
    localStorage.removeItem("user");
    toast.custom((t) => (
      <div className={`${t.visible ? "animate-enter" : "animate-leave"} `}>
        <Toast type="danger" message="Session Expired !" />
      </div>
    ));
    if (typeof window !== "undefined") {
      location.href = `/login?ref=my-referrals`;
    }
  }

  return (
    <div className="">
      <TopNavOne
        props="style-one bg-black"
        slogan="New customers save 10% with the code GET10"
      />
      <div id="header" className="relative w-full">
        <MenuHome props="bg-transparent" />
        <Breadcrumb heading="Your Referrals" subHeading="Your Referrals" />
      </div>
      {isLoading ? (
        <div className="container list-product w-full mt-10">
          <MyReferrals />
        </div>
      ) : error ? (
        <div className="my-20 w-full md:w-8/12 lg:w-8/12  m-auto">
          <Error />
        </div>
      ) : (
        <div className="container content-main flex justify-between max-xl:flex-col gap-y-8 sm:mt-10 mt-10 mb-10">
          <div className="xl:w-2/3 xl:pr-3 w-full">
            <div className="time bg-green py-3 px-5 flex items-center rounded-lg mb-5">
              <div className="heding5">🔥</div>
              <div className="caption1 pl-2">
                Refer and earn: Share the wealth of opportunity and watch your
                pockets grow -
                <Link href="/refer-earn">
                  <span className="min text-red text-button fw-700">
                    {" Refer here"}
                  </span>
                </Link>
              </div>
            </div>
            <div className=" list-product w-full ">
              <div className="w-full m-auto">
                <div className="heading bg-surface bora-4 pt-4 pb-4">
                  <div className="flex">
                    <div className="w-5/12">
                      <div className="text-button text-center">Seller</div>
                    </div>
                    <div className="w-5/12">
                      <div className="text-button text-center">Amount</div>
                    </div>
                    <div className="w-5/12">
                      <div className="text-button text-center">
                        Onboarded Status
                      </div>
                    </div>
                    <div className="w-5/12">
                      <div className="text-button text-center">
                        Payment Status
                      </div>
                    </div>
                  </div>
                </div>
                {data?.data == null ? (
                  <p className="text-center mt-5">No data found</p>
                ) : (
                  <div className="list-product-main w-full mt-3">
                    {data?.data?.map((e: any) => (
                      <div
                        className="item flex md:mt-7 md:pb-7 mt-5 pb-5 border-b border-line w-full"
                        key={e}
                      >
                        <div className="w-5/12 price flex items-center justify-center">
                          <Link href={`/${e?.referredSeller?.username}`}>
                            <div className="text-title text-center underline">
                              {e?.referredSeller?.shopname}
                            </div>
                          </Link>
                        </div>

                        <div className="w-5/12 flex total-price items-center justify-center">
                          <div className="text-title text-center">
                            ₹{e?.amount}
                          </div>
                        </div>
                        <div className="w-5/12 flex total-price items-center justify-center">
                          {e?.onboarded ? (
                            <div className="text-title text-center text-success">
                              Completed
                            </div>
                          ) : (
                            <div
                              style={{ color: "hsl(0deg 73.68% 62.75%)" }}
                              className="text-title text-center "
                            >
                              Pending
                            </div>
                          )}
                        </div>

                        <div className="w-5/12 flex total-price items-center justify-center">
                          {e?.status ? (
                            <div className="text-title text-center text-success">
                              Completed
                            </div>
                          ) : (
                            <div
                              style={{ color: "hsl(0deg 73.68% 62.75%)" }}
                              className="text-title text-center "
                            >
                              Pending
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="xl:w-1/3 xl:pl-12 w-full">
            <div className="checkout-block bg-surface p-6 rounded-2xl">
              <div className="heading5">Referral Summary</div>
              <div className="total-block py-5 flex justify-between border-b border-line">
                <div className="text-title">Competed</div>
                <div className="text-title">
                  <span>
                    {data?.data != null
                      ? calculateEarnedAmount(data?.data)?.trueCount
                      : "-"}
                  </span>
                </div>
              </div>
              <div className="discount-block py-5 flex justify-between border-b border-line">
                <div className="text-title">Pending</div>
                <div className="text-title">
                  {" "}
                  {data?.data != null
                    ? calculateEarnedAmount(data?.data)?.falseCount
                    : "-"}
                </div>
              </div>
              <div className="ship-block py-5 flex justify-between border-b border-line">
                <div className="text-title">Total Earned</div>
                <div className="text-title">
                  {data?.data != null
                    ? `₹${calculateEarnedAmount(data?.data)?.earnedAmount}`
                    : "-"}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Referrals;
