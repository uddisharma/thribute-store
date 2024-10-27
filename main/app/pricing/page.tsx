import React from "react";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";
import MenuHome from "@/components/Header/Menu/MenuHome";
import Upcoming from "@/components/upcoming/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
};
const Faqs = () => {
  return (
    <>
      <TopNavOne
        props="style-one bg-black"
        slogan="New customers save 10% with the code GET10"
      />
      <div id="header" className="relative w-full">
        <MenuHome props="bg-transparent" />
        <Breadcrumb heading="Pricing" subHeading="Pricing" />
      </div>
      <div className="faqs-block">
        <section className=" dark:bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-black">
                Designed for business teams like yours
              </h2>
              <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
                Here at Flowbite we focus on markets where technology,
                innovation, and capital can unlock long-term value and drive
                economic growth.
              </p>
            </div>
            <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0 w-full md:w-11/12 lg:w-11/12 m-auto">
              <div
                style={{ border: "1px dotted gray" }}
                className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900  rounded-lg  shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-black"
              >
                <h3 className="mb-4 text-2xl font-semibold">Starter</h3>
                <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                  Best option for personal use &amp; for your next project.
                </p>
                <div className="flex justify-center items-baseline my-8">
                  <span className="mr-2 text-5xl font-extrabold">$29</span>
                  <span className="text-gray-500 dark:text-gray-400">
                    /month
                  </span>
                </div>
                {/* List */}
                <ul role="list" className="mb-8 space-y-4 text-left">
                  <li className="flex items-center space-x-3">
                    {/* Icon */}
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Individual configuration</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    {/* Icon */}
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>No setup, or hidden fees</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    {/* Icon */}
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      Team size:{" "}
                      <span className="font-semibold">1 developer</span>
                    </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    {/* Icon */}
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      Premium support:{" "}
                      <span className="font-semibold">6 months</span>
                    </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    {/* Icon */}
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      Free updates:{" "}
                      <span className="font-semibold">6 months</span>
                    </span>
                  </li>
                </ul>
                <button className="button-main">Get started</button>
              </div>
              <div
                style={{ border: "1px dotted gray" }}
                className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900  rounded-lg  shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-black"
              >
                <h3 className="mb-4 text-2xl font-semibold">Company</h3>
                <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                  Relevant for multiple users, extended &amp; premium support.
                </p>
                <div className="flex justify-center items-baseline my-8">
                  <span className="mr-2 text-5xl font-extrabold">$99</span>
                  <span className="text-gray-500 dark:text-gray-400">
                    /month
                  </span>
                </div>
                {/* List */}
                <ul role="list" className="mb-8 space-y-4 text-left">
                  <li className="flex items-center space-x-3">
                    {/* Icon */}
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Individual configuration</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    {/* Icon */}
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>No setup, or hidden fees</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    {/* Icon */}
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      Team size:{" "}
                      <span className="font-semibold">10 developers</span>
                    </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    {/* Icon */}
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      Premium support:{" "}
                      <span className="font-semibold">24 months</span>
                    </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    {/* Icon */}
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      Free updates:{" "}
                      <span className="font-semibold">24 months</span>
                    </span>
                  </li>
                </ul>
                <button className="button-main">Get started</button>
              </div>
              <div
                style={{ border: "1px dotted gray" }}
                className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900  rounded-lg  shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-black"
              >
                <h3 className="mb-4 text-2xl font-semibold">Company</h3>
                <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                  Relevant for multiple users, extended &amp; premium support.
                </p>
                <div className="flex justify-center items-baseline my-8">
                  <span className="mr-2 text-5xl font-extrabold">$99</span>
                  <span className="text-gray-500 dark:text-gray-400">
                    /month
                  </span>
                </div>
                {/* List */}
                <ul role="list" className="mb-8 space-y-4 text-left">
                  <li className="flex items-center space-x-3">
                    {/* Icon */}
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Individual configuration</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    {/* Icon */}
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>No setup, or hidden fees</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    {/* Icon */}
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      Team size:{" "}
                      <span className="font-semibold">10 developers</span>
                    </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    {/* Icon */}
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      Premium support:{" "}
                      <span className="font-semibold">24 months</span>
                    </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    {/* Icon */}
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      Free updates:{" "}
                      <span className="font-semibold">24 months</span>
                    </span>
                  </li>
                </ul>
                <button className="button-main">Get started</button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Upcoming />
      <Footer />
    </>
  );
};

export default Faqs;
