"use client";
import React, { useState } from "react";
import Image from "next/image";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useModalCartContext } from "@/context/ModalCartContext";
import { useCart } from "@/context/CartContext";

const ModalCart1 = ({ isOpen, onClose }: any) => {
  const [activeTab, setActiveTab] = useState<string | undefined>("");
  const { isModalOpen, closeModalCart } = useModalCartContext();
  const { cartState, addToCart, removeFromCart, updateCart } = useCart();

  const handleActiveTab = (tab: string) => {
    setActiveTab(tab);
  };

  let moneyForFreeship = 150;
  let [totalCart, setTotalCart] = useState<number>(0);
  let [discountCart, setDiscountCart] = useState<number>(0);

  cartState.cartArray.map((item) => (totalCart += item.price * item.quantity));

  return (
    <>
      <div className={`modal-cart-block`} onClick={closeModalCart}>
        <div
          className={`modal-cart-main  ${isModalOpen ? "open" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="menu-container w-1/2 border-r border-line py-6 max-md:hidden h-screen overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <div className="heading5 px-6 pb-3">You May Also Like</div>
            <div className="list px-6">
              {[1, 2, 3, 4, 5, 6, 7].map((product) => (
                <div
                  key={product}
                  className="item py-5 flex items-center justify-between gap-3 border-b border-line"
                >
                  <div className="infor flex items-center gap-5">
                    <div className="bg-img">
                      <Image
                        src={"/images/product/fashion/1-1.png"}
                        width={300}
                        height={300}
                        alt={"Shop Banner"}
                        className="w-[100px] aspect-square flex-shrink-0 rounded-lg"
                      />
                    </div>
                    <div className="">
                      <div className="name text-button">Bansal Boot House</div>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="product-price text-title">3 Items</div>
                        <div className="flex items-center gap-2 cursor-pointer underline">
                          <div className="product-origin-price text-title text-secondary2 text-sm relative inline-block">
                            View Menu
                            <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></span>
                          </div>
                          <div>
                            <Icon.ArrowRight />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalCart1;
