"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { ProductType } from "@/type/ProductType";
import { useModalCartContext } from "@/context/ModalCartContext";
import { useCart } from "@/context/CartContext";
import CountdownTimeType from "@/type/CountdownType";

const ModalCart = ({
  serverTimeLeft,
}: {
  serverTimeLeft: CountdownTimeType;
}) => {
  const { isModalOpen, closeModalCart } = useModalCartContext();
  const { cartState, removeFromCart } = useCart();

  let [totalCart, _setTotalCart] = useState<number>(0);

  const [activeCart, setActiveCart] = useState<any>();

  function groupByUsername(items: any) {
    return Object.values(
      items.reduce((grouped: any, item: any) => {
        const username = item.sellerId.username;

        if (!grouped[username]) {
          grouped[username] = { username, data: [] };
        }
        grouped[username].data.push(item);
        return grouped;
      }, {})
    );
  }

  const carts: any = groupByUsername(cartState.cartArray);
  activeCart == undefined
    ? carts &&
      carts[0]?.data.map(
        (item: ProductType) => (totalCart += item.price * item.quantity)
      )
    : activeCart &&
      activeCart?.data.map(
        (item: ProductType) => (totalCart += item.price * item.quantity)
      );

  return (
    <>
      <div className={`modal-cart-block`} onClick={closeModalCart}>
        <div
          className={`modal-cart-main flex ${isModalOpen ? "open" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="menu-container left w-1/2 border-r border-line py-6 max-md:hidden h-screen overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <div className="heading5 px-6 pb-3">Your Carts</div>
            <div className="list px-6">
              {carts &&
                carts?.map((e: any, index: any) => (
                  <div
                    onClick={() => {
                      setActiveCart(e);
                    }}
                    key={index}
                    className="item py-5 flex items-center justify-between gap-3 border-b border-line cursor-pointer"
                  >
                    <div className="infor flex items-center gap-5">
                      <div className="bg-img">
                        <Image
                          src={
                            e?.data &&
                            e?.data[0]?.images &&
                            e?.data[0]?.images[0]
                          }
                          width={300}
                          height={300}
                          alt={"Shop Banner"}
                          className="w-[100px] aspect-square flex-shrink-0 rounded-lg"
                        />
                      </div>
                      <div className="">
                        <div className="name text-button">{e?.username}</div>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="product-price text-title">
                            {e?.data?.length == 1
                              ? `1 item`
                              : `${e?.data?.length} items`}
                          </div>
                          <div className="flex items-center gap-2 cursor-pointer ">
                            <div className="product-origin-price text-title text-secondary2 text-sm relative inline-block ">
                              View Menu
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
          <div className="right cart-block md:w-1/2 w-full py-6 relative overflow-hidden">
            <div className="heading px-6 pb-3 flex items-center justify-between relative">
              <div className="heading5">Shopping Cart</div>
              <div
                className="close-btn absolute right-6 top-0 w-6 h-6 rounded-full bg-surface flex items-center justify-center duration-300 cursor-pointer hover:bg-black hover:text-white"
                onClick={closeModalCart}
              >
                <Icon.X size={14} />
              </div>
            </div>
            {cartState?.cartArray?.length > 0 && (
              <div className="time px-6">
                <div className=" flex items-center gap-3 px-5 py-3 bg-green rounded-lg">
                  <p className="text-3xl">🔥</p>
                  <div className="caption1">
                    <span className="text-red caption1 font-semibold">
                      {activeCart == undefined
                        ? carts && carts[0]?.data[0]?.sellerId?.shopname
                        : activeCart && activeCart?.data[0]?.sellerId?.shopname}
                    </span>{" "}
                  </div>
                </div>
              </div>
            )}

            <div
              style={{
                maxHeight: "250px",
                overflowY: "scroll",
              }}
              className=" px-6"
            >
              {cartState?.cartArray?.length == 0 && (
                <div
                  style={{ height: "250px", width: "250px", margin: "auto" }}
                >
                  <img
                    style={{
                      height: "100px",
                      width: "150px",
                      margin: "auto",
                      marginTop: "100px",
                    }}
                    src="https://ouch-cdn2.icons8.com/JgWkbK98MYYvn2KAx-AbR3SFl63q0d0cfXbJ4sfPIf0/rs:fit:368:267/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvODYy/LzM5NGJjMzMxLTVh/ZmUtNGYzMy04MjBl/LTk3MmQyMDJiZjY5/YS5wbmc.png"
                    alt=""
                  />
                  <p className="text-center">No product in cart</p>
                </div>
              )}
              {activeCart == undefined
                ? carts &&
                  carts[0]?.data.map((product: any) => (
                    <div
                      key={product.id}
                      className="item py-5 flex items-center justify-between gap-3 border-b border-line"
                    >
                      <div className="infor flex items-center gap-3 w-full">
                        <div className="bg-img w-[100px] aspect-square flex-shrink-0 rounded-lg overflow-hidden">
                          <Image
                            src={product.images[0]}
                            width={300}
                            height={300}
                            alt={product.name}
                            className="w-full h-full"
                          />
                        </div>
                        <div className="w-full">
                          <div className="flex items-center justify-between w-full">
                            <div className="name text-button">
                              {product?.quantity} * {product.name}
                            </div>
                            <div
                              className="remove-cart-btn caption1 font-semibold text-red underline cursor-pointer"
                              onClick={() => removeFromCart(product.id)}
                            >
                              Remove
                            </div>
                          </div>
                          <div className="flex items-center justify-between gap-2 mt-3 w-full">
                            <div className="flex items-center text-secondary2 capitalize">
                              {product.selectedSize || product.sizes[0]?.size}/
                              {product.selectedColor || product.colors[0].name}
                            </div>
                            <div className="product-price text-title">
                              ₹{product.price}.00
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : activeCart &&
                  activeCart?.data.map((product: any) => (
                    <div
                      key={product.id}
                      className="item py-5 flex items-center justify-between gap-3 border-b border-line"
                    >
                      <div className="infor flex items-center gap-3 w-full">
                        <div className="bg-img w-[100px] aspect-square flex-shrink-0 rounded-lg overflow-hidden">
                          <Image
                            src={product.images[0]}
                            width={300}
                            height={300}
                            alt={product.name}
                            className="w-full h-full"
                          />
                        </div>
                        <div className="w-full">
                          <div className="flex items-center justify-between w-full">
                            <div className="name text-button">
                              {product?.quantity} * {product.name}
                            </div>
                            <div
                              className="remove-cart-btn caption1 font-semibold text-red underline cursor-pointer"
                              onClick={() => removeFromCart(product.id)}
                            >
                              Remove
                            </div>
                          </div>
                          <div className="flex items-center justify-between gap-2 mt-3 w-full">
                            <div className="flex items-center text-secondary2 capitalize">
                              {product.selectedSize || product.sizes[0]?.size}/
                              {product.selectedColor || product.colors[0].name}
                            </div>
                            <div className="product-price text-title">
                              ₹{product.price}.00
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
            <div className="footer-modal bg-white absolute bottom-0 left-0 w-full">
              <div className="flex items-center justify-between pt-6 px-6">
                <div className="heading5">Subtotal</div>
                <div className="heading5">₹{totalCart}.00</div>
              </div>
              <div className="block-button text-center p-6">
                {cartState?.cartArray?.length <= 0 ? (
                  <div className="flex items-center gap-4">
                    <div
                      className="button-main basis-1/2 bg-white border border-black text-black text-center uppercase"
                      onClick={closeModalCart}
                    >
                      View cart
                    </div>
                    <div
                      className="button-main basis-1/2 text-center uppercase"
                      onClick={closeModalCart}
                    >
                      Check Out
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <Link
                      href={`/${
                        activeCart == undefined
                          ? carts && carts[0]?.username
                          : activeCart && activeCart?.username
                      }/cart`}
                      className="button-main basis-1/2 bg-white border border-black text-black text-center uppercase"
                      onClick={closeModalCart}
                    >
                      View cart
                    </Link>
                    <Link
                      href={`/${
                        activeCart == undefined
                          ? carts && carts[0]?.username
                          : activeCart && activeCart?.username
                      }/checkout`}
                      className="button-main basis-1/2 text-center uppercase"
                      onClick={closeModalCart}
                    >
                      Check Out
                    </Link>
                  </div>
                )}
                <div
                  onClick={closeModalCart}
                  className="text-button-uppercase mt-4 text-center has-line-before cursor-pointer inline-block"
                >
                  Or continue shopping
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalCart;
