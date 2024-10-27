"use client";
import React from "react";
import Image from "next/image";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";
import { ProductType } from "@/type/ProductType";
import { useCompare } from "@/context/CompareContext";
import { useCart } from "@/context/CartContext";
import { useModalCartContext } from "@/context/ModalCartContext";
import MenuHome from "@/components/Header/Menu/MenuHome";

const Compare = () => {
  const { compareState } = useCompare();
  const { cartState, addToCart, updateCart } = useCart();
  const { openModalCart } = useModalCartContext();

  const handleAddToCart = (productItem: ProductType) => {
    if (!cartState.cartArray.find((item) => item.id === productItem.id)) {
      addToCart(
        productItem,
        1,
        productItem?.sizes[0]?.size,
        productItem?.colors[0]?.name
      );
    } else {
      updateCart(
        productItem?.id,
        1,
        productItem?.sizes[0]?.size,
        productItem?.colors[0]?.name
      );
    }
    openModalCart();
  };

  return (
    <>
      <TopNavOne
        props="style-one bg-black"
        slogan="New customers save 10% with the code GET10"
      />
      <div id="header" className="relative w-full">
        <MenuHome props="bg-transparent" />
        <Breadcrumb heading="Compare Products" subHeading="Compare Products" />
      </div>
      <div className="compare-block md:py-20 py-10">
        <div className="container">
          <div className="content-main">
            <div>
              <div className="compare-table flex">
                <div className="left lg:w-[240px] w-[170px] flex-shrink-0 border border-line border-r-0 rounded-l-2xl">
                  <div className="item text-button flex items-center h-[60px] px-8 w-full border-b border-line">
                    Photo
                  </div>
                  <div className="item text-button flex items-center h-[60px] px-8 w-full border-b border-line">
                    Name
                  </div>

                  <div className="item text-button flex items-center h-[60px] px-8 w-full border-b border-line">
                    Price
                  </div>
                  <div className="item text-button flex items-center h-[60px] px-8 w-full border-b border-line">
                    MRP
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
                    Add To Cart
                  </div>
                </div>
                <table className="right border-collapse w-full border-t border-r border-line">
                  <tr className={`flex w-full items-center`}>
                    {compareState.compareArray.map((item, index) => (
                      <td
                        className="w-full border border-line h-[60px] border-t-0 border-r-0"
                        key={index}
                      >
                        <td
                          className="w-full border border-line h-[60px] border-t-0 border-r-0 flex justify-center"
                          key={index}
                        >
                          <Image
                            src={item.images[0]}
                            width={250}
                            height={1500}
                            alt={item.images[0]}
                            className="w-300 h-full m-auto object-cover"
                          />
                        </td>
                      </td>
                    ))}
                  </tr>
                  <tr className={`flex w-full items-center`}>
                    {compareState.compareArray.map((item, index) => (
                      <td
                        className="w-full border border-line h-[60px] border-t-0 border-r-0"
                        key={index}
                      >
                        <div className="h-full flex items-center justify-center">
                          {item?.name}
                        </div>
                      </td>
                    ))}
                  </tr>

                  <tr className={`flex w-full items-center`}>
                    {compareState.compareArray.map((item, index) => (
                      <td
                        className="w-full border border-line h-[60px] border-t-0 border-r-0"
                        key={index}
                      >
                        <div className="h-full flex items-center justify-center">
                          ₹{item.price}.00
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className={`flex w-full items-center`}>
                    {compareState.compareArray.map((item, index) => (
                      <td
                        className="w-full border border-line h-[60px] border-t-0 border-r-0"
                        key={index}
                      >
                        <div className="h-full flex items-center justify-center">
                          ₹{item.mrp}.00
                        </div>
                      </td>
                    ))}
                  </tr>

                  <tr className={`flex w-full items-center`}>
                    {compareState.compareArray.map((item, index) => (
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
                    {compareState.compareArray.map((item, index) => (
                      <td
                        className="w-full border border-line h-[60px] border-t-0 border-r-0 size"
                        key={index}
                      >
                        <div className="h-full flex items-center justify-center capitalize gap-1">
                          {item.sizes.map((size, i) => (
                            <p key={i}>
                              {size?.size}
                              <span>,</span>
                            </p>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr className={`flex w-full items-center`}>
                    {compareState.compareArray.map((item, index) => (
                      <td
                        className="w-full border border-line h-[60px] border-t-0 border-r-0 size"
                        key={index}
                      >
                        <div className="h-full flex items-center justify-center capitalize gap-2">
                          {item?.colors
                            ?.filter((e: any) => {
                              return e.available;
                            })
                            .map((colorItem, i) => (
                              <span
                                key={i}
                                className={`w-6 h-6 rounded-full`}
                                style={{
                                  backgroundColor: `${colorItem.code}`,
                                }}
                              ></span>
                            ))}
                        </div>
                      </td>
                    ))}
                  </tr>

                  <tr className={`flex w-full items-center`}>
                    {compareState.compareArray.map((item, index) => (
                      <td
                        className="w-full border border-line h-[60px] border-t-0 border-r-0"
                        key={index}
                      >
                        {item?.stock <= 0 ? (
                          <div className="h-full flex items-center justify-center">
                            <div className="button-main py-1.5 px-5 cursor-not-allowed">
                              Out Of Stock
                            </div>
                          </div>
                        ) : (
                          <div className="h-full flex items-center justify-center">
                            <div
                              className="button-main py-1.5 px-5"
                              onClick={() => handleAddToCart(item)}
                            >
                              Add To Cart
                            </div>
                          </div>
                        )}
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
