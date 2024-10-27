"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useCart } from "@/context/CartContext";
import MenuSeller from "@/components/Header/Menu/MenuSeller";
import { ProductType } from "@/type/ProductType";

const Cart = () => {
  const router = useRouter();
  const params = useParams();

  const { cartState, updateCart, removeFromCart } = useCart();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    const itemToUpdate = cartState.cartArray.find(
      (item) => item.id === productId
    );
    if (itemToUpdate) {
      updateCart(
        productId,
        newQuantity,
        itemToUpdate.selectedSize,
        itemToUpdate.selectedColor
      );
    }
  };

  let [totalCart, _setTotalCart] = useState<number>(0);

  const redirectToCheckout = () => {
    router.push(`/${params?.seller}/checkout`);
  };

  const cartitems = cartState.cartArray?.filter((e: ProductType) => {
    return e?.sellerId?.username.toLowerCase() == params?.seller;
  });

  cartitems.map((item) => (totalCart += item.price * item.quantity));

  return (
    <>
      <TopNavOne
        props="style-one bg-black"
        slogan="New customers save 10% with the code GET10"
      />
      <div id="header" className="relative w-full">
        <MenuSeller props="bg-white" />
        <Breadcrumb heading="Shopping cart" subHeading="Shopping cart" />
      </div>
      <div className="cart-block md:py-10 py-5">
        <div className="container">
          <div className="content-main flex justify-between max-xl:flex-col gap-y-8">
            <div className="xl:w-2/3 xl:pr-3 w-full">
              <div className="time bg-green py-3 px-5 flex items-center rounded-lg">
                <div className="heding5">🔥</div>
                <div className="caption1 pl-2">
                  Order from our store: browse, select, and checkout all in one
                  convenient transaction. Simplify your shopping experience
                  today!
                </div>
              </div>
              <div className="list-product w-full sm:mt-7 mt-5">
                <div className="w-full">
                  <div className="heading bg-surface bora-4 pt-4 pb-4">
                    <div className="flex">
                      <div className="w-1/2">
                        <div className="text-button text-center">Products</div>
                      </div>
                      <div className="w-1/12">
                        <div className="text-button text-center">Price</div>
                      </div>
                      <div className="w-1/6">
                        <div className="text-button text-center">Quantity</div>
                      </div>
                      <div className="w-1/6">
                        <div className="text-button text-center">
                          Total Price
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="list-product-main w-full mt-3">
                    {cartitems?.length < 1 ? (
                      <p className="text-button pt-3">No product in cart</p>
                    ) : (
                      cartitems?.map((product) => (
                        <div
                          className="item flex md:mt-7 md:pb-7 mt-5 pb-5 border-b border-line w-full"
                          key={product.id}
                        >
                          <div className="w-1/2">
                            <div className="flex items-center gap-6">
                              <div className="bg-img md:w-[100px] w-20 aspect-[3/4]">
                                <Link
                                  href={`/${
                                    product?.sellerId?.username
                                  }/product?slug=${product?.name
                                    ?.split(" ")
                                    .join("-".toLowerCase())}&id=${
                                    product?.id
                                  }`}
                                >
                                  <Image
                                    src={product.images[0]}
                                    width={1000}
                                    height={1000}
                                    alt={product.name}
                                    className="w-full h-full object-cover rounded-lg"
                                  />
                                </Link>
                              </div>
                              <div>
                                <Link
                                  href={`/${
                                    product?.sellerId?.username
                                  }/product?slug=${product?.name
                                    ?.split(" ")
                                    .join("-".toLowerCase())}&id=${
                                    product?.id
                                  }`}
                                >
                                  <div className="text-title">
                                    {product.name}
                                  </div>
                                </Link>
                                <div className="flex items-center text-secondary2 capitalize">
                                  {product.selectedSize ||
                                    product.sizes[0]?.size}
                                  /
                                  {product.selectedColor ||
                                    product.colors[0].name}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="w-1/12 price flex items-center justify-center">
                            <div className="text-title text-center">
                              ₹{product.price}.00
                            </div>
                          </div>
                          <div className="w-1/6 flex items-center justify-center">
                            <div className="quantity-block bg-surface md:p-3 p-2 flex items-center justify-between rounded-lg border border-line md:w-[100px] flex-shrink-0 w-20">
                              <Icon.Minus
                                onClick={() => {
                                  if (product.quantity > 1) {
                                    handleQuantityChange(
                                      product.id,
                                      product.quantity - 1
                                    );
                                  }
                                }}
                                className={`text-base max-md:text-sm ${
                                  product.quantity === 1 ? "disabled" : ""
                                }`}
                              />
                              <div className="text-button quantity">
                                {product.quantity}
                              </div>
                              <Icon.Plus
                                onClick={() =>
                                  handleQuantityChange(
                                    product.id,
                                    product.quantity + 1
                                  )
                                }
                                className="text-base max-md:text-sm"
                              />
                            </div>
                          </div>
                          <div className="w-1/6 flex total-price items-center justify-center">
                            <div className="text-title text-center">
                              ₹{product.quantity * product.price}.00
                            </div>
                          </div>
                          <div className="w-1/12 flex items-center justify-center">
                            <Icon.XCircle
                              className="text-xl max-md:text-base text-red cursor-pointer hover:text-black duration-500"
                              onClick={() => {
                                removeFromCart(product.id);
                              }}
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="xl:w-1/3 xl:pl-12 w-full">
              <div className="checkout-block bg-surface p-6 rounded-2xl">
                <div className="heading5">Order Summary</div>
                <div className="total-block py-5 flex justify-between border-b border-line">
                  <div className="text-title">Subtotal</div>
                  <div className="text-title">
                    ₹<span className="total-product">{totalCart}</span>
                    <span>.00</span>
                  </div>
                </div>
                <div className="discount-block py-5 flex justify-between border-b border-line">
                  <div className="text-title">Discounts</div>
                  <div className="text-title">Not Calulated</div>
                </div>
                <div className="ship-block py-5 flex justify-between border-b border-line">
                  <div className="text-title">Shipping</div>
                  <div className="text-title">Not Calulated</div>
                  {/* <div className="choose-type flex gap-12">
                    <div className="left">
                      <div className="type">
                        {moneyForFreeship - totalCart > 0 ? (
                          <input
                            id="shipping"
                            type="radio"
                            name="ship"
                            disabled
                          />
                        ) : (
                          <input
                            id="shipping"
                            type="radio"
                            name="ship"
                            checked={shipCart === 0}
                            onChange={() => setShipCart(0)}
                          />
                        )}
                        <label className="pl-1" htmlFor="shipping">
                          Free Shipping:
                        </label>
                      </div>
                      <div className="type mt-1">
                        <input
                          id="local"
                          type="radio"
                          name="ship"
                          value={30}
                          checked={shipCart === 30}
                          onChange={() => setShipCart(30)}
                        />
                        <label
                          className="text-on-surface-variant1 pl-1"
                          htmlFor="local"
                        >
                          Local:
                        </label>
                      </div>
                      <div className="type mt-1">
                        <input
                          id="flat"
                          type="radio"
                          name="ship"
                          value={40}
                          checked={shipCart === 40}
                          onChange={() => setShipCart(40)}
                        />
                        <label
                          className="text-on-surface-variant1 pl-1"
                          htmlFor="flat"
                        >
                          Flat Rate:
                        </label>
                      </div>
                    </div>
                    <div className="right">
                      <div className="ship">₹0.00</div>
                      <div className="local text-on-surface-variant1 mt-1">
                        ₹30.00
                      </div>
                      <div className="flat text-on-surface-variant1 mt-1">
                        ₹40.00
                      </div>
                    </div>
                  </div> */}
                </div>
                <div className="total-cart-block pt-4 pb-4 flex justify-between">
                  <div className="heading5">Total</div>
                  <div className="heading5">
                    ₹<span className="total-cart heading5">{totalCart}</span>
                    <span className="heading5">.00</span>
                  </div>
                </div>
                <div className="block-button flex flex-col items-center gap-y-4 mt-5">
                  <div
                    style={{
                      cursor:
                        cartitems?.length <= 0 ? "not-allowed" : "pointer",
                    }}
                    className="checkout-btn button-main text-center w-full"
                    onClick={() => {
                      if (cartitems?.length <= 0) {
                        return;
                      }
                      redirectToCheckout();
                    }}
                  >
                    Process To Checkout
                  </div>
                  <Link
                    className="text-button hover-underline"
                    href={`/${params?.seller}`}
                  >
                    Continue shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
