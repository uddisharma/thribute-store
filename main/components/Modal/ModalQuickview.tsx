"use client";

// Quickview.tsx
import React, { useEffect, useState } from "react";
import Image from "next/image";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useModalQuickviewContext } from "@/context/ModalQuickviewContext";
import { useCart } from "@/context/CartContext";
import { useModalCartContext } from "@/context/ModalCartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useModalWishlistContext } from "@/context/ModalWishlistContext";
import { useCompare } from "@/context/CompareContext";
import { useModalCompareContext } from "@/context/ModalCompareContext";
import Rate from "../Other/Rate";
import { useParams, useRouter } from "next/navigation";
import Toast from "../ui/toast";
import toast from "react-hot-toast";
import { getDeliveryDate } from "@/scripts/futuredate";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

const ModalQuickview = () => {
  const { selectedProduct, closeQuickview } = useModalQuickviewContext();
  const [activeColor, setActiveColor] = useState<string>("");
  const [activeSize, setActiveSize] = useState<string>("");
  const { addToCart, updateCart, cartState } = useCart();
  const { openModalCart } = useModalCartContext();
  const { addToWishlist, removeFromWishlist, wishlistState } = useWishlist();
  const { openModalWishlist } = useModalWishlistContext();
  const { addToCompare, removeFromCompare, compareState } = useCompare();
  const { openModalCompare } = useModalCompareContext();
  const [quantity, setQuantity] = useState<number>(1);
  const [viewing, setViewing] = useState<number>();
  const router = useRouter();
  const params = useParams();
  function getRandomIntInclusive(min: any, max: any) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  useEffect(() => {
    setViewing(getRandomIntInclusive(3, 35));
    return () => {
      setViewing(0);
    };
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleActiveColor = (item: string) => {
    setActiveColor(item);
  };

  const handleActiveSize = (item: string) => {
    setActiveSize(item);
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
    updateCart(
      selectedProduct && selectedProduct?.id,
      quantity,
      activeSize,
      activeColor
    );
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      updateCart(
        selectedProduct && selectedProduct?.id,
        quantity,
        activeSize,
        activeColor
      );
    }
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      if (
        !cartState.cartArray.some((item) => item.id === selectedProduct?.id)
      ) {
        addToCart(selectedProduct, quantity, activeSize, activeColor);
      } else {
        updateCart(
          selectedProduct && selectedProduct?.id,
          quantity,
          activeSize,
          activeColor
        );
      }
      openModalCart();
      closeQuickview();
    }
  };

  const handleAddToWishlist = () => {
    if (selectedProduct) {
      if (
        wishlistState.wishlistArray.some(
          (item) => item.id === selectedProduct.id
        )
      ) {
        removeFromWishlist(selectedProduct.id);
      } else {
        addToWishlist(selectedProduct);
      }
    }
    openModalWishlist();
  };

  const handleAddToCompare = () => {
    if (selectedProduct) {
      if (compareState.compareArray.length < 3) {
        if (
          compareState.compareArray.some(
            (item) => item.id === selectedProduct.id
          )
        ) {
          removeFromCompare(selectedProduct.id);
        } else {
          addToCompare(selectedProduct);
        }
      } else {
        toast.custom((t) => (
          <div className={`${t.visible ? "animate-enter" : "animate-leave"} `}>
            <Toast type="warning" message="Compare up to 3 products!" />
          </div>
        ));
      }
    }
    openModalCompare();
  };

  function calculateDiscount(originalPrice: any, sellingPrice: any) {
    let discount = ((originalPrice - sellingPrice) / originalPrice) * 100;
    return Math.ceil(discount);
  }

  return (
    <>
      <div className={`modal-quickview-block`} onClick={closeQuickview}>
        <div
          className={`modal-quickview-main py-6 ${
            selectedProduct !== null ? "open" : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="flex h-full max-md:flex-col-reverse gap-y-6">
            <div className="left lg:w-[388px] md:w-[300px] flex-shrink-0 px-6">
              <div className="list-img max-md:flex items-center gap-4">
                {selectedProduct?.images.map((item: any, index: any) => (
                  <div
                    className="bg-img w-full aspect-[3/4] max-md:w-[150px] max-md:flex-shrink-0 rounded-[20px] overflow-hidden md:mt-6"
                    key={index}
                  >
                    <Image
                      src={item}
                      width={1500}
                      height={2000}
                      alt={item}
                      priority={true}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="right w-full px-6">
              <div className="heading pb-6 flex items-center justify-between relative">
                <div className="heading5">Quick View</div>
                <div
                  className="close-btn absolute right-0 top-0 w-6 h-6 rounded-full bg-surface flex items-center justify-center duration-300 cursor-pointer hover:bg-black hover:text-white"
                  onClick={closeQuickview}
                >
                  <Icon.X size={14} />
                </div>
              </div>
              <div className="product-infor">
                <div className="flex justify-between">
                  <div>
                    <div className="caption2 text-secondary font-semibold uppercase">
                      {selectedProduct?.type}
                    </div>
                    <div className="heading4 mt-1">{selectedProduct?.name}</div>
                  </div>
                  <div
                    className={`add-wishlist-btn w-10 h-10 flex items-center justify-center border border-line cursor-pointer rounded-lg duration-300 hover:bg-black hover:text-white ${
                      wishlistState.wishlistArray.some(
                        (item) => item.id === selectedProduct?.id
                      )
                        ? "active"
                        : ""
                    }`}
                    onClick={handleAddToWishlist}
                  >
                    {wishlistState.wishlistArray.some(
                      (item) => item.id === selectedProduct?.id
                    ) ? (
                      <>
                        <Icon.Heart
                          size={20}
                          weight="fill"
                          className="text-red"
                        />
                      </>
                    ) : (
                      <>
                        <Icon.Heart size={20} />
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center mt-3">
                  <Rate currentRate={selectedProduct?.rate} size={14} />
                  <span className="caption1 text-secondary">
                    {selectedProduct?.brand}
                  </span>
                </div>
                <div className="flex items-center gap-3 flex-wrap mt-5 pb-6 border-b border-line">
                  <div className="product-price heading5">
                    ₹ {selectedProduct?.price}.00
                  </div>
                  <div className="w-px h-4 bg-line"></div>
                  <div className="product-origin-price font-normal text-secondary2">
                    <del>₹{selectedProduct?.mrp}.00</del>
                  </div>
                  {selectedProduct?.mrp && (
                    <div className="product-sale caption2 font-semibold bg-green px-3 py-0.5 inline-block rounded-full">
                      -
                      {calculateDiscount(
                        selectedProduct?.mrp,
                        selectedProduct?.price
                      )}
                      %
                    </div>
                  )}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: selectedProduct?.desc?.slice(0, 200),
                    }}
                    className="desc text-secondary mt-3 text-sm"
                  />
                </div>
                <div className="list-action mt-6">
                  <div className="choose-color">
                    <div className="text-title">
                      Colors:{" "}
                      <span className="text-title color">{activeColor}</span>
                    </div>
                    <div className="list-color flex items-center gap-2 flex-wrap mt-3">
                      {selectedProduct?.colors.map(
                        (item: any, index: number) => (
                          <div
                            style={{
                              backgroundColor: item?.code,
                              cursor: item?.available
                                ? "pointer"
                                : "not-allowed",
                            }}
                            className={`color-item w-12 h-12 rounded-xl duration-300 relative ${
                              activeColor === item.name ? "active" : ""
                            }`}
                            key={index}
                            onClick={() => {
                              if (!item?.available) {
                                return;
                              }
                              handleActiveColor(item.name);
                            }}
                          >
                            <div className="tag-action bg-black text-white caption2 capitalize px-1.5 py-0.5 rounded-sm">
                              {item?.available ? item.name : "Not available"}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  <div className="choose-size mt-5">
                    <div className="heading flex items-center justify-between">
                      <div className="text-title">
                        Size:{" "}
                        <span className="text-title size">{activeSize}</span>
                      </div>
                      <div className="caption1 size-guide text-red underline">
                        Size Guide
                      </div>
                    </div>
                    <div className="list-size flex items-center gap-2 flex-wrap mt-3">
                      {selectedProduct?.sizes.map(
                        (item: any, index: number) => (
                          <div
                            className={`size-item ${
                              item.size === "freesize"
                                ? "px-3 py-2"
                                : "w-12 h-12"
                            } flex items-center justify-center text-button rounded-full bg-white border border-line ${
                              activeSize === item.size ? "active" : ""
                            }`}
                            key={index}
                            style={{
                              cursor: item?.available
                                ? "pointer"
                                : "not-allowed",
                            }}
                            onClick={() => {
                              if (!item?.available) {
                                return;
                              }
                              handleActiveSize(item.size);
                            }}
                          >
                            {item.size}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  <div className="text-title mt-5">Quantity:</div>
                  <div className="choose-quantity flex items-center flex-wrap lg:justify-between gap-5 mt-3">
                    <div className="quantity-block md:p-3 max-md:py-1.5 max-md:px-3 flex items-center justify-between rounded-lg border border-line sm:w-[180px] w-[120px] flex-shrink-0">
                      <Icon.Minus
                        onClick={handleDecreaseQuantity}
                        className={`${
                          selectedProduct?.quantityPurchase === 1
                            ? "disabled"
                            : ""
                        } cursor-pointer body1`}
                      />
                      <div className="body1 font-semibold">{quantity}</div>
                      <Icon.Plus
                        onClick={handleIncreaseQuantity}
                        className="cursor-pointer body1"
                      />
                    </div>
                    <div
                      onClick={() => {
                        if (selectedProduct && selectedProduct?.stock <= 0) {
                          return;
                        }
                        handleAddToCart();
                      }}
                      style={{
                        cursor:
                          selectedProduct && selectedProduct?.stock <= 0
                            ? "not-allowed"
                            : "pointer",
                      }}
                      className="button-main w-full text-center bg-white text-black border border-black"
                    >
                      {selectedProduct && selectedProduct?.stock <= 0
                        ? "Out of Stock"
                        : "Add To Cart"}
                    </div>
                  </div>
                  <div className="button-block mt-5">
                    <div
                      style={{
                        cursor:
                          selectedProduct && selectedProduct?.stock <= 0
                            ? "not-allowed"
                            : "pointer",
                      }}
                      onClick={() => {
                        if (selectedProduct && selectedProduct?.stock <= 0) {
                          return;
                        }
                        if (selectedProduct) {
                          if (
                            !cartState.cartArray.some(
                              (item) => item.id === selectedProduct?.id
                            )
                          ) {
                            addToCart(
                              selectedProduct,
                              quantity,
                              activeSize,
                              activeColor
                            );
                          } else {
                            updateCart(
                              selectedProduct && selectedProduct?.id,
                              quantity,
                              activeSize,
                              activeColor
                            );
                          }
                          closeQuickview();
                        }
                        router.push(
                          `/${params?.seller}/checkout?product=${selectedProduct?.id}`
                        );
                      }}
                      className="button-main w-full text-center"
                    >
                      {selectedProduct && selectedProduct?.stock <= 0
                        ? "Out of Stock"
                        : "Buy It Now"}
                    </div>
                  </div>
                  <div className="flex items-center flex-wrap lg:gap-20 gap-8 gap-y-4 mt-5">
                    <div
                      className="compare flex items-center gap-3 cursor-pointer"
                      onClick={handleAddToCompare}
                    >
                      <div className="compare-btn md:w-12 md:h-12 w-10 h-10 flex items-center justify-center border border-line cursor-pointer rounded-xl duration-300 hover:bg-black hover:text-white">
                        <Icon.ArrowsCounterClockwise className="heading6" />
                      </div>
                      <span>Compare</span>
                    </div>
                    <div
                      onClick={() => {
                        closeQuickview();
                        openModal();
                      }}
                      className="share flex items-center gap-3 cursor-pointer"
                    >
                      <div className="share-btn md:w-12 md:h-12 w-10 h-10 flex items-center justify-center border border-line cursor-pointer rounded-xl duration-300 hover:bg-black hover:text-white">
                        <Icon.ShareNetwork weight="fill" className="heading6" />
                      </div>
                      <span>Share Products</span>
                    </div>
                    <Modal
                      isOpen={isOpen}
                      onClose={closeModal}
                      productName={selectedProduct?.name}
                      id={selectedProduct?.id}
                    />
                  </div>
                  <div className="more-infor mt-6">
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-1">
                        <Icon.ArrowClockwise className="body1" />
                        <div className="text-title">Delivery & Return</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon.Question className="body1" />
                        <div className="text-title">Ask A Question</div>
                      </div>
                    </div>
                    <div className="flex items-center flex-wrap gap-1 mt-3">
                      <Icon.Timer className="body1" />
                      <span className="text-title">Estimated Delivery:</span>
                      <span className="text-secondary">
                        {getDeliveryDate()}
                      </span>
                    </div>
                    <div className="flex items-center flex-wrap gap-1 mt-3">
                      <Icon.Eye className="body1" />
                      <span className="text-title"></span>
                      <span className="text-secondary">
                        {" "}
                        {viewing} peoples viewing this product right now!
                      </span>
                    </div>
                    {/* <div className="flex items-center gap-1 mt-3">
                      <div className="text-title">SKU:</div>
                      <div className="text-secondary">53453412</div>
                    </div>
                    <div className="flex items-center gap-1 mt-3">
                      <div className="text-title">Categories:</div>
                      <div className="text-secondary">
                        {selectedProduct?.category}, {selectedProduct?.gender}
                      </div>
                    </div> */}
                    <div className="flex items-center gap-1 mt-3">
                      <div className="text-title">Brand:</div>
                      <div className="text-secondary">
                        {selectedProduct?.brand}
                      </div>
                    </div>
                  </div>
                  <div className="list-payment mt-7">
                    <div className="main-content lg:pt-8 pt-6 lg:pb-6 pb-4 sm:px-4 px-3 border border-line rounded-xl relative max-md:w-2/3 max-sm:w-full">
                      <div className="heading6 px-5 bg-white absolute -top-[14px] left-1/2 -translate-x-1/2 whitespace-nowrap">
                        Guranteed safe checkout
                      </div>
                      <div className="list grid grid-cols-6">
                        <div className="item flex items-center justify-center lg:px-3 px-1">
                          <Image
                            src={"/images/payment/Frame-0.png"}
                            width={500}
                            height={450}
                            alt="payment"
                            className="w-full"
                          />
                        </div>
                        <div className="item flex items-center justify-center lg:px-3 px-1">
                          <Image
                            src={"/images/payment/Frame-1.png"}
                            width={500}
                            height={450}
                            alt="payment"
                            className="w-full"
                          />
                        </div>
                        <div className="item flex items-center justify-center lg:px-3 px-1">
                          <Image
                            src={"/images/payment/Frame-2.png"}
                            width={500}
                            height={450}
                            alt="payment"
                            className="w-full"
                          />
                        </div>
                        <div className="item flex items-center justify-center lg:px-3 px-1">
                          <Image
                            src={"/images/payment/Frame-3.png"}
                            width={500}
                            height={450}
                            alt="payment"
                            className="w-full"
                          />
                        </div>
                        <div className="item flex items-center justify-center lg:px-3 px-1">
                          <Image
                            src={"/images/payment/Frame-4.png"}
                            width={500}
                            height={450}
                            alt="payment"
                            className="w-full"
                          />
                        </div>
                        <div className="item flex items-center justify-center lg:px-3 px-1">
                          <Image
                            src={"/images/payment/Frame-5.png"}
                            width={500}
                            height={450}
                            alt="payment"
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalQuickview;

const Modal = ({ isOpen, onClose, productName, id }: any) => {
  const [productUrl, setProductUrl] = useState("");

  useEffect(() => {
    const url = `${window.location.href}/product/${id}?slug=${productName
      ?.split(" ")
      .join("-")
      .toLowerCase()}`;
    setProductUrl(url);
  }, []);

  if (!isOpen) return null;

  return (
    <>
      <div className={`modal-search-block `} onClick={onClose}>
        <div
          className={`share-modal modal-search-main md:p-10 p-6 rounded-lg ${
            isOpen ? "open" : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="flex justify-center space-x-8 p-6 bg-white rounded-lg shadow-md">
            <FacebookShareButton url={productUrl} title={productName}>
              <div className="flex flex-col items-center">
                <div className="p-3 bg-gray-100 rounded-full">
                  <FacebookIcon className="text-blue-600 h-6 w-6" />
                </div>
                <div className="mt-2 text-sm font-medium">Facebook</div>
              </div>
            </FacebookShareButton>
            <TwitterShareButton url={productUrl} title={productName}>
              <div className="flex flex-col items-center">
                <div className="p-3 bg-gray-100 rounded-full">
                  <TwitterIcon className="text-blue-400 h-6 w-6" />
                </div>
                <div className="mt-2 text-sm font-medium">Twitter</div>
              </div>
            </TwitterShareButton>
            <WhatsappShareButton
              url={productUrl}
              title={productName}
              separator=" : "
            >
              <div className="flex flex-col items-center">
                <div className="p-3 bg-gray-100 rounded-full">
                  <WhatsAppIcon className="text-gray-600 h-6 w-6 " />
                </div>
                <div className=" text-sm font-medium mt-[-3px]">Whatsapp</div>
              </div>
            </WhatsappShareButton>
          </div>
        </div>
      </div>
    </>
  );
};

function FacebookIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function WhatsAppIcon(props: any) {
  return (
    <img
      style={{ height: "40px", width: "40px", marginTop: "-10px" }}
      src="/images/other/whatsapp.svg"
      alt=""
    />
  );
}

function TwitterIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
