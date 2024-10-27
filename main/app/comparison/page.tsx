import React from "react";
import Image from "next/image";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";
import Rate from "@/components/Other/Rate";
import MenuHome from "@/components/Header/Menu/MenuHome";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Platform Comparison",
};

const Compare = () => {
  const hardcodedData = [
    {
      id: 1,
      name: "Product 1",
      brand: "Brand 1",
      images: ["/image/logo.png"],
      rate: 4.5,
      price: 50,
      type: "Type 1",
      sizes: ["S", "M", "L"],
      variation: [{ colorCode: "red" }, { colorCode: "blue" }],
    },
    {
      id: 2,
      name: "Product 2",
      brand: "Brand 2",
      images: ["/image/other-brands.png"],
      rate: 3.5,
      price: 40,
      type: "Type 2",
      sizes: ["S", "M"],
      variation: [{ colorCode: "green" }, { colorCode: "yellow" }],
    },
  ];

  return (
    <>
      <TopNavOne
        props="style-one bg-black"
        slogan="New customers save 10% with the code GET10"
      />
      <div id="header" className="relative w-full">
        <MenuHome props="bg-transparent" />
        <Breadcrumb
          heading="Platform Comparision"
          subHeading="Platform Comparision"
        />
      </div>
      <div className="compare-block md:py-20 py-10">
        <div className="container">
          <div className="content-main">
            <div>
              <div className="list-product flex">
                <div className="left lg:w-[240px] w-[170px] flex-shrink-0"></div>
              </div>
              <div className="compare-table flex">
                <div className="left lg:w-[240px] w-[170px] flex-shrink-0 border border-line border-r-0 rounded-l-2xl">
                  <div className="item text-button flex items-center h-[60px] px-8 w-full border-b border-line"></div>
                  <div className="item text-button flex items-center h-[60px] px-8 w-full border-b border-line">
                    Rating
                  </div>
                  <div className="item text-button flex items-center h-[60px] px-8 w-full border-b border-line">
                    Price
                  </div>
                  <div className="item text-button flex items-center h-[60px] px-8 w-full border-b border-line">
                    Type
                  </div>
                  <div className="item text-button flex items-center h-[60px] px-8 w-full border-b border-line">
                    Brand
                  </div>
                  <div className="item text-button flex items-center h-[60px] px-8 w-full border-b border-line">
                    Size
                  </div>
                  <div className="item text-button flex items-center h-[60px] px-8 w-full border-b border-line">
                    Colors
                  </div>
                  <div className="item text-button flex items-center h-[60px] px-8 w-full border-b border-line">
                    Metarial
                  </div>
                </div>
                <table className="right border-collapse w-full border-t border-r border-line">
                  <tr className={`flex w-full items-center `}>
                    {hardcodedData.map((item, index) => (
                      <td
                        className="w-full border border-line h-[60px] border-t-0 border-r-0"
                        key={index}
                      >
                        <Image
                          src={item.images[0]}
                          width={150}
                          height={1500}
                          alt={item.images[0]}
                          className="w-[180px] h-[35px] m-auto object-cover mt-3"
                        />
                      </td>
                    ))}
                  </tr>
                  <tr className={`flex w-full items-center`}>
                    {hardcodedData.map((item, index) => (
                      <td
                        className="w-full border border-line h-[60px] border-t-0 border-r-0"
                        key={index}
                      >
                        <div className="h-full flex items-center justify-center">
                          <Rate currentRate={item.rate} size={12} />
                          <p className="pl-1">(1.234)</p>
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className={`flex w-full items-center`}>
                    {hardcodedData.map((item, index) => (
                      <td
                        className="w-full border border-line h-[60px] border-t-0 border-r-0"
                        key={index}
                      >
                        <div className="h-full flex items-center justify-center">
                          ${item.price}.00
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className={`flex w-full items-center`}>
                    {hardcodedData.map((item, index) => (
                      <td
                        className="w-full border border-line h-[60px] border-t-0 border-r-0"
                        key={index}
                      >
                        <div className="h-full flex items-center justify-center capitalize">
                          {item.type}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className={`flex w-full items-center`}>
                    {hardcodedData.map((item, index) => (
                      <td
                        className="w-full border border-line h-[60px] border-t-0 border-r-0"
                        key={index}
                      >
                        <div className="h-full flex items-center justify-center capitalize">
                          {item.brand}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className={`flex w-full items-center`}>
                    {hardcodedData.map((item, index) => (
                      <td
                        className="w-full border border-line h-[60px] border-t-0 border-r-0 size"
                        key={index}
                      >
                        <div className="h-full flex items-center justify-center capitalize gap-1">
                          {item.sizes.map((size, i) => (
                            <p key={i}>
                              {size}
                              <span>,</span>
                            </p>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className={`flex w-full items-center`}>
                    {hardcodedData.map((item, index) => (
                      <td
                        className="w-full border border-line h-[60px] border-t-0 border-r-0 size"
                        key={index}
                      >
                        <div className="h-full flex items-center justify-center capitalize gap-2">
                          {item.variation.map((colorItem, i) => (
                            <span
                              key={i}
                              className={`w-6 h-6 rounded-full`}
                              style={{
                                backgroundColor: `${colorItem.colorCode}`,
                              }}
                            ></span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className={`flex w-full items-center`}>
                    {hardcodedData.map((item, index) => (
                      <td
                        className="w-full border border-line h-[60px] border-t-0 border-r-0"
                        key={index}
                      >
                        <div className="h-full flex items-center justify-center capitalize">
                          Cotton
                        </div>
                      </td>
                    ))}
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Compare;
