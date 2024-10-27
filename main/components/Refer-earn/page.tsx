"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import Instagram from "@/components/Home1/Instagram";
import Brand from "@/components/Home1/Brand";
import Footer from "@/components/Footer/Footer";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import MenuHome from "@/components/Header/Menu/MenuHome";
import { useUser } from "@/context/UserContext";
import { useCookies } from "react-cookie";
import Link from "next/link";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import toast from "react-hot-toast";
import Toast from "@/components/ui/toast";
import { ReferralLink } from "@/constants";

const ReferEarn = () => {
  const [cookies, _setCookie] = useCookies(["usertoken"]);
  const { userState } = useUser();
  const [auth, setAuth] = useState(false);
  const [copied, setCopied] = useState(false);

  const user = userState && userState?.user?.name;
  useEffect(() => {
    const cookieValue = cookies.usertoken;
    if (cookieValue && user) {
      setAuth(true);
    }
    // eslint-disable-next-line
  }, [user]);
  useEffect(() => {
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  }, [copied]);
  return (
    <>
      <TopNavOne
        props="style-one bg-black"
        slogan="New customers save 10% with the code GET10"
      />
      <div id="header" className="relative w-full">
        <MenuHome props="bg-transparent" />
        <Breadcrumb heading="Refer & Earn" subHeading="Refer & Earn" />
      </div>
      <div className="about md:pt-20 pt-10">
        <div className="about-us-block">
          <div className="container">
            <div className="text flex items-center justify-center">
              <div className="content md:w-5/6 w-full mt-10">
                <div className="heading3 text-center">
                  I{String.raw`'m`} obsessed with the dress Pippa Middleton wore
                  to her brother{String.raw`'s`} wedding.
                </div>
                <div className="body1 text-center md:mt-7 mt-5">
                  Kim Kardashian West needs no introduction. In the 14 years
                  since she first graced our screens in Keeping Up With The
                  Kardashians, she has built her KKW beauty empire, filmed her
                  show, wrapped her show, become a billionaire, studied law,
                  campaigned for the rights of death row inmates, travelled the
                  world to attend events such as Paris Fashion Week, raised four
                  children and launched her wildly successful shapewear brand
                  SKIMS.
                </div>
              </div>
            </div>
            {!auth ? (
              <Link href="/login?ref=refer-earn">
                <button className="btn btn-primary py-4 w-full font-bold underline">
                  Login to Refer & Earn
                </button>
              </Link>
            ) : (
              <div className="mt-16 w-full md:w-9/12 m-auto">
                <div className="message sm:col-span-2">
                  <input
                    className="border-line px-4 pt-3 pb-3 w-full rounded-lg text-center"
                    id="code"
                    type="text"
                    placeholder="Your Referral Code"
                    readOnly
                    defaultValue={`${ReferralLink}?referral_code=${userState?.user?.referralCode}`}
                  />
                </div>
                <div className="flex justify-center  w-full md:w-6/12 lg:w-6/12 m-auto flex-wrap">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${ReferralLink}?referral_code=${userState?.user?.referralCode}`
                      );
                      setCopied(true);
                      toast.custom((t) => (
                        <div
                          className={`${
                            t.visible ? "animate-enter" : "animate-leave"
                          } `}
                        >
                          <Toast type="success" message="Link Copied !" />
                        </div>
                      ));
                    }}
                    className="btn btn-primary py-4 w-full flex justify-center gap-1 underline"
                  >
                    {copied ? (
                      <Icon.CheckCircle size={16} className="mt-1" />
                    ) : (
                      <Icon.Copy size={16} className="mt-1" />
                    )}
                    {copied ? "Link Copied" : "Copy Link to Refer & Earn"}
                  </button>
                  {auth && (
                    <Link href={"/my-referrals"}>
                      <button className="btn btn-primary py-4 w-full flex justify-center gap-1 underline">
                        <Icon.Money size={16} className="mt-2" />
                        your referrals
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            )}

            {/* <div className="heading mt-14">
              <div className="heading4 text-center">Meet our Founders</div>
              <div className="text-center mt-3">#Anvougetheme</div>
            </div> */}

            <div className="list-img w-full md:w-10/12 m-auto  gap-[30px] md:pt-10 pt-10">
              <div className="bg-img">
                <Image
                  src={"/image/refer-earn.png"}
                  width={1500}
                  height={2000}
                  alt="bg-img"
                  className=" rounded-xl w-full hidden md:block"
                />
                <Image
                  src={"/image/refer-earn1.png"}
                  width={1500}
                  height={2000}
                  alt="bg-img"
                  className=" rounded-xl w-full md:hidden block"
                />
              </div>
              {/* <div className="bg-img">
                <Image
                  src={"/images/banner/1.png"}
                  width={1500}
                  height={2000}
                  alt="bg-img"
                  className=" rounded-[30px]  w-full"
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <Instagram />
      <Brand />
      <Footer />
    </>
  );
};

export default ReferEarn;
