'use client'
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import toast from "react-hot-toast";
import Toast from "../ui/toast";

const Footer = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  return (
    <>
      <div id="footer" className="footer">
        <div className="footer-main bg-surface">
          <div className="container">
            <div className="content-footer py-[60px] flex justify-between flex-wrap gap-y-8">
              <div className="company-infor basis-1/4 max-lg:basis-full pr-7">
                <Link href={"/"} className="logo">
                  <Image
                    className="w-[150px]"
                    src="/image/logo.png"
                    alt="logo"
                    height={350}
                    width={1300}
                  />
                </Link>
                <div className="flex gap-3 mt-3">
                  <div className="flex flex-col ">
                    <span className="text-button">Mail:</span>
                    <span className="text-button mt-3">Phone:</span>
                    <span className="text-button mt-3">Address:</span>
                  </div>
                  <div className="flex flex-col ">
                    <span className="">hi.avitex@gmail.com</span>
                    <span className="mt-3">1-333-345-6868</span>
                    <span className="mt-3 pt-px">
                      549 Oak St.Crystal Lake, IL 60014
                    </span>
                  </div>
                </div>
              </div>
              <div className="right-content flex flex-wrap gap-y-8 basis-3/4 max-lg:basis-full">
                <div className="list-nav flex justify-between basis-2/3 max-md:basis-full gap-4">
                  <div className="item flex flex-col basis-1/3 ">
                    <div className="text-button-uppercase pb-3">Infomation</div>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit"
                      href={"/contact-us"}
                    >
                      Contact us
                    </Link>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href={"/about-us"}
                    >
                      About Us
                    </Link>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href={"/comparison"}
                    >
                      Compare
                    </Link>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href={"/order-tracking"}
                    >
                      Track Order
                    </Link>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href={"/faqs"}
                    >
                      FAQs
                    </Link>
                  </div>
                  <div className="item flex flex-col basis-1/3 ">
                    <div className="text-button-uppercase pb-3">Quick Shop</div>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit"
                      href={"/stores"}
                    >
                      Stores
                    </Link>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href={"/categories"}
                    >
                      Categories
                    </Link>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href={"/refer-earn"}
                    >
                      Refer & Earn
                    </Link>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href={"/pricing"}
                    >
                      Pricing
                    </Link>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href={"/blogs"}
                    >
                      Blogs
                    </Link>
                  </div>
                  <div className="item flex flex-col basis-1/3">
                    <div className="text-button-uppercase pb-3">
                      Customer Services
                    </div>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit"
                      href={"/faqs"}
                    >
                      Orders FAQs
                    </Link>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href={"/policies/terms&conditions"}
                    >
                      Terms & Conditions
                    </Link>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href={"/policies/privacy&poilicy"}
                    >
                      Privacy Policy
                    </Link>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href={"/policies/return&refund"}
                    >
                      Return & Refund
                    </Link>
                    <Link
                      className="caption1 has-line-before duration-300 w-fit pt-2"
                      href={"/become-a-seller"}
                    >
                      Become a Seller
                    </Link>
                  </div>
                </div>
                <div className="newsletter basis-1/3 pl-7 max-md:basis-full max-md:pl-0">
                  <div className="text-button-uppercase">Newletter</div>
                  <div className="caption1 mt-3">
                    Sign up for our newsletter and get 10% off your first
                    purchase
                  </div>
                  <div className="input-block w-full h-[52px] mt-4">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setLoading(true);
                        setTimeout(() => {
                          setLoading(false);
                          setEmail("");
                          toast.custom((t) => (
                            <div
                              className={`${
                                t.visible ? "animate-enter" : "animate-leave"
                              } `}
                            >
                              <Toast
                                type="success"
                                message="Thanks for subscribing!"
                              />
                            </div>
                          ));
                        }, 2000);
                      }}
                      className="w-full h-full relative"
                    >
                      <input
                        value={email}
                        type="email"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        placeholder="Enter your e-mail"
                        className="caption1 w-full h-full pl-4 pr-14 rounded-xl border border-line"
                        required
                      />
                      <button
                        disabled={loading}
                        className="w-[44px] h-[44px] bg-black flex items-center justify-center rounded-xl absolute top-1 right-1"
                      >
                        {!loading ? (
                          <Icon.ArrowRight size={24} color="#fff" />
                        ) : (
                          <Icon.Clock size={20} color="#fff" />
                        )}
                      </button>
                    </form>
                  </div>
                  <div className="list-social flex items-center gap-6 mt-4">
                    <Link href={"https://www.facebook.com/"} target="_blank">
                      <div className="icon-facebook text-2xl text-black"></div>
                    </Link>
                    <Link href={"https://www.instagram.com/"} target="_blank">
                      <div className="icon-instagram text-2xl text-black"></div>
                    </Link>
                    <Link href={"https://www.twitter.com/"} target="_blank">
                      <div className="icon-twitter text-2xl text-black"></div>
                    </Link>
                    <Link href={"https://www.youtube.com/"} target="_blank">
                      <div className="icon-youtube text-2xl text-black"></div>
                    </Link>
                    <Link href={"https://www.pinterest.com/"} target="_blank">
                      <div className="icon-pinterest text-2xl text-black"></div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-bottom py-3 flex items-center justify-between gap-5 max-lg:justify-center max-lg:flex-col border-t border-line">
              <div className="left flex items-center gap-8">
                <div className="copyright caption1 text-secondary">
                  ©2024 Thrubute All Rights Reserved.
                </div>
                <div className="select-block flex items-center gap-5 max-md:hidden">
                  {/* <div className="choose-language flex items-center gap-1.5">
                    <select
                      name="language"
                      id="chooseLanguageFooter"
                      className="caption2 bg-transparent"
                    >
                      <option value="English">English</option>
                      <option value="Espana">Espana</option>
                      <option value="France">France</option>
                    </select>
                    <Icon.CaretDown size={12} color="#1F1F1F" />
                  </div>
                  <div className="choose-currency flex items-center gap-1.5">
                    <select
                      name="currency"
                      id="chooseCurrencyFooter"
                      className="caption2 bg-transparent"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                    <Icon.CaretDown size={12} color="#1F1F1F" />
                  </div> */}
                </div>
              </div>
              <div className="right flex items-center gap-2">
                <div className="caption1 text-secondary">Payment:</div>
                <div className="payment-img">
                  <Image
                    src={"/images/payment/Frame-0.png"}
                    width={500}
                    height={500}
                    alt={"payment"}
                    className="w-9"
                  />
                </div>
                <div className="payment-img">
                  <Image
                    src={"/images/payment/Frame-1.png"}
                    width={500}
                    height={500}
                    alt={"payment"}
                    className="w-9"
                  />
                </div>
                <div className="payment-img">
                  <Image
                    src={"/images/payment/Frame-2.png"}
                    width={500}
                    height={500}
                    alt={"payment"}
                    className="w-9"
                  />
                </div>
                <div className="payment-img">
                  <Image
                    src={"/images/payment/Frame-3.png"}
                    width={500}
                    height={500}
                    alt={"payment"}
                    className="w-9"
                  />
                </div>
                <div className="payment-img">
                  <Image
                    src={"/images/payment/Frame-4.png"}
                    width={500}
                    height={500}
                    alt={"payment"}
                    className="w-9"
                  />
                </div>
                <div className="payment-img">
                  <Image
                    src={"/images/payment/Frame-5.png"}
                    width={500}
                    height={500}
                    alt={"payment"}
                    className="w-9"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
