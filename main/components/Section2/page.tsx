import React from "react";
import Image from "next/image";

const Section2 = () => {
  return (
    <>
      <div className="forgot-pass md:py-10 pt-5">
        <div className="container">
          <div className="content-main flex gap-y-8 max-md:flex-col">
            <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
              <Image
                src={"/image/whychooseus/1.png"}
                alt="section2"
                className="rounded-lg"
                width={500}
                height={500}
              />
            </div>
            <div className="right md:w-1/2 w-full lg:pl-[60px] md:pl-[40px] flex items-center">
              <div className="text-content">
                <div className="heading2">Complete Analytics Overview</div>

                <div className="mt-2 text-secondary">
                  Our comprehensive analytics dashboard, Thribute allows you to
                  track your sales, customer behavior, and marketing performance
                  in real-time. Gain valuable insights into your business
                  operations and make data-driven decisions with ease.
                  <ul className="list-none flex flex-col space-y-2 mt-2">
                    <li className="flex items-center space-x-4">
                      <span className="text-indigo-500 text-xl">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                      <span className="text-gray-700">
                        Track sales, customer behavior, and marketing
                        performance.
                      </span>
                    </li>
                    <li className="flex items-center space-x-4 ">
                      <span className="text-indigo-500 text-xl">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                      <span className="text-gray-700">
                        Use Thribute to make data-driven decisions effortlessly.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Section2;
