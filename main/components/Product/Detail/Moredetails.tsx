import { useCart } from "@/context/CartContext";
import { useModalCartContext } from "@/context/ModalCartContext";
import { useModalCompareContext } from "@/context/ModalCompareContext";
import { useModalWishlistContext } from "@/context/ModalWishlistContext";
import { useWishlist } from "@/context/WishlistContext";
import React, { useEffect, useState } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useCompare } from "@/context/CompareContext";
import Rate from "@/components/Other/Rate";
import ModalSizeguide from "@/components/Modal/ModalSizeguide";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import toast from "react-hot-toast";
import Toast from "@/components/ui/toast";

const Moredetails = ({ productMain }: any) => {
  const { openModalCompare } = useModalCompareContext();
  const [openSizeGuide, setOpenSizeGuide] = useState<boolean>(false);
  const { addToCart, updateCart, cartState } = useCart();
  const { openModalCart } = useModalCartContext();
  const { openModalWishlist } = useModalWishlistContext();
  const { addToCompare, removeFromCompare, compareState } = useCompare();
  const { addToWishlist, removeFromWishlist, wishlistState } = useWishlist();
  const [activeColor, setActiveColor] = useState<string>("");
  const [activeSize, setActiveSize] = useState<string>("");
  const [watching, setWatching] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  function getRandomIntInclusive(min: any, max: any) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  useEffect(() => {
    setWatching(getRandomIntInclusive(3, 35));
    return () => {
      setWatching(0);
    };
  }, []);

  const router = useRouter();
  const params = useParams();

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
      productMain && productMain?.id,
      quantity,
      activeSize,
      activeColor
    );
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      updateCart(
        productMain && productMain?.id,
        quantity,
        activeSize,
        activeColor
      );
    }
  };

  const handleAddToCart = () => {
    if (!cartState.cartArray.some((item) => item.id === productMain?.id)) {
      addToCart(productMain, quantity, activeSize, activeColor);
    } else {
      updateCart(
        productMain && productMain?.id,
        quantity,
        activeSize,
        activeColor
      );
    }
    openModalCart();
  };

  const handleAddToCart1 = () => {
    if (!cartState.cartArray.some((item) => item.id === productMain?.id)) {
      addToCart(productMain, quantity, activeSize, activeColor);
    } else {
      updateCart(
        productMain && productMain?.id,
        quantity,
        activeSize,
        activeColor
      );
    }
    // openModalCart();
    toast.custom((t) => (
      <div className={`${t.visible ? "animate-enter" : "animate-leave"} `}>
        <Toast type="success" message="Added Successfully !" />
      </div>
    ));
  };

  const handleAddToWishlist = () => {
    if (
      wishlistState.wishlistArray.some(
        (item) => item.id === (productMain && productMain?.id)
      )
    ) {
      removeFromWishlist(productMain && productMain?.id);
    } else {
      addToWishlist(productMain);
    }
    openModalWishlist();
  };

  const handleAddToCompare = () => {
    if (compareState.compareArray.length < 3) {
      if (
        compareState.compareArray.some(
          (item: any) => item.id === (productMain && productMain?.id)
        )
      ) {
        removeFromCompare(productMain && productMain?.id);
      } else {
        addToCompare(productMain);
      }
    } else {
      alert("Compare up to 3 products");
    }
    openModalCompare();
  };

  function getDeliveryDate() {
    const currentDate = new Date();
    const futureDate1 = new Date(currentDate);
    futureDate1.setDate(currentDate.getDate() + 3);
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + 6);

    const currentDay = futureDate1.getDate();
    const currentMonth = futureDate1.toLocaleString("default", {
      month: "long",
    });
    const futureDay = futureDate.getDate();
    const futureMonth = futureDate.toLocaleString("default", { month: "long" });

    return `${currentDay} ${currentMonth} - ${futureDay} ${futureMonth}`;
  }

  const handleOpenSizeGuide = () => {
    setOpenSizeGuide(true);
  };

  const handleCloseSizeGuide = () => {
    setOpenSizeGuide(false);
  };

  const percentSale = Math.floor(
    100 -
      (productMain && productMain?.price / (productMain && productMain?.mrp)) *
        100
  );
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <div className="caption2 text-secondary font-semibold uppercase">
            {productMain && productMain?.brand}
          </div>
          <div className="heading4 mt-1">
            {productMain && productMain?.name}
          </div>
        </div>
        <div
          className={`add-wishlist-btn w-12 h-12 flex items-center justify-center border border-line cursor-pointer rounded-xl duration-300 hover:bg-black hover:text-white ${
            wishlistState.wishlistArray.some(
              (item) => item.id === (productMain && productMain?.id)
            )
              ? "active"
              : ""
          }`}
          onClick={handleAddToWishlist}
        >
          {wishlistState.wishlistArray.some(
            (item) => item.id === (productMain && productMain?.id)
          ) ? (
            <>
              <Icon.Heart size={24} weight="fill" className="text-white" />
            </>
          ) : (
            <>
              <Icon.Heart size={24} />
            </>
          )}
        </div>
      </div>
      <div className="flex items-center mt-3">
        <Rate currentRate={productMain && productMain?.price} size={14} />
        <span className="caption1 text-secondary">
          (
          {Math.abs(
            productMain?.stock > 0 || productMain?.stock < 20
              ? productMain?.stock - percentSale
              : productMain?.mrp - productMain?.price
          )}{" "}
          reviews)
        </span>
      </div>
      <div className="flex items-center gap-3 flex-wrap mt-5 pb-6 border-b border-line">
        <div className="product-price heading5">
          ₹{productMain && productMain?.price}.00
        </div>
        <div className="w-px h-4 bg-line"></div>
        <div className="product-origin-price font-normal text-secondary2">
          <del>₹{productMain && productMain?.mrp}.00</del>
        </div>
        {productMain && productMain?.mrp && (
          <div className="product-sale caption2 font-semibold bg-green px-3 py-0.5 inline-block rounded-full">
            -{percentSale}%
          </div>
        )}

        <div
          dangerouslySetInnerHTML={{
            __html: productMain?.desc?.slice(0, 200),
          }}
          className="desc text-secondary mt-3 text-sm"
        ></div>
      </div>
      <div className="list-action mt-6">
        <div className="sold flex justify-between flex-wrap gap-4">
          <div className="text-title">Stock:</div>
          <div className="right w-3/4">
            <div className="progress h-2 rounded-full overflow-hidden bg-line relative">
              <div
                className={`percent-sold absolute top-0 left-0 h-full bg-green`}
                style={{
                  width: productMain && productMain?.stock,
                }}
              ></div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              {productMain && productMain?.stock <= 0 ? (
                <span className="text-red">Out of stock</span>
              ) : productMain && productMain?.stock <= 10 ? (
                <span className="text-secondary">
                  Hurry up ! Only {productMain && productMain?.stock} item(s)
                  left in stock!
                </span>
              ) : (
                <span className="text-secondary">
                  {productMain && productMain?.stock} items left in stock!
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="choose-color mt-5">
          <div className="text-title">
            Colors: <span className="text-title color">{activeColor}</span>
          </div>
          <div className="list-color flex items-center gap-2 flex-wrap mt-3">
            {productMain &&
              productMain?.colors.map((item: any, index: any) => (
                <div
                  style={{
                    backgroundColor: item?.code,
                    cursor: item?.available ? "pointer" : "not-allowed",
                  }}
                  className={`color-item w-12 h-12 rounded-xl duration-300 relative ${
                    activeColor === item.name ? "active" : ""
                  } `}
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
              ))}
          </div>
        </div>
        <div className="choose-size mt-5">
          <div className="heading flex items-center justify-between">
            <div className="text-title">
              Size: <span className="text-title size">{activeSize}</span>
            </div>
            <div
              className="caption1 size-guide text-red underline cursor-pointer"
              onClick={handleOpenSizeGuide}
            >
              Size Guide
            </div>
            <ModalSizeguide
              data={productMain}
              isOpen={openSizeGuide}
              onClose={handleCloseSizeGuide}
            />
          </div>
          <div className="list-size flex items-center gap-2 flex-wrap mt-3">
            {productMain &&
              productMain?.sizes.map((item: any, index: number) => (
                <>
                  <div
                    className={`size-item ${
                      item.size === "freesize" ? "px-3 py-2" : "w-12 h-12"
                    } flex items-center justify-center text-button rounded-full bg-white border border-line ${
                      activeSize === item.size ? "active" : ""
                    } ${item?.size == "Size Free" && "text-[8px]"}`}
                    key={index}
                    style={{
                      cursor: item?.available ? "pointer" : "not-allowed",
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
                </>
              ))}
          </div>
        </div>
        <div className="text-title mt-5">Quantity:</div>
        <div className="choose-quantity flex items-center lg:justify-between gap-5 gap-y-3 mt-3">
          <div className="quantity-block md:p-3 max-md:py-1.5 max-md:px-3 flex items-center justify-between rounded-lg border border-line sm:w-[180px] w-[120px] flex-shrink-0">
            <Icon.Minus
              size={20}
              onClick={handleDecreaseQuantity}
              className={` cursor-pointer`}
            />
            <div className="body1 font-semibold">{quantity}</div>
            <Icon.Plus
              size={20}
              onClick={handleIncreaseQuantity}
              className="cursor-pointer"
            />
          </div>
          <div
            onClick={() => {
              if (productMain && productMain?.stock <= 0) {
                return;
              }
              handleAddToCart();
            }}
            style={{
              cursor:
                productMain && productMain?.stock <= 0
                  ? "not-allowed"
                  : "pointer",
            }}
            className="cartbtn button-main w-full text-center bg-white text-black border border-black hidden md:block lg:block  "
          >
            {productMain && productMain?.stock <= 0
              ? "Out of Stock"
              : "Add To Cart"}
          </div>
          <div
            onClick={() => {
              if (productMain && productMain?.stock <= 0) {
                return;
              }
              handleAddToCart1();
            }}
            style={{
              cursor:
                productMain && productMain?.stock <= 0
                  ? "not-allowed"
                  : "pointer",
            }}
            className="cartbtn1 button-main w-full text-center bg-white text-black border border-black md:hidden lg:hidden"
          >
            {productMain && productMain?.stock <= 0
              ? "Out of Stock"
              : "Add To Cart"}
          </div>
        </div>
        <div className="button-block mt-5">
          <div
            style={{
              cursor:
                productMain && productMain?.stock <= 0
                  ? "not-allowed"
                  : "pointer",
            }}
            onClick={() => {
              if (productMain && productMain?.stock <= 0) {
                return;
              }
              if (productMain) {
                if (
                  !cartState.cartArray.some(
                    (item) => item.id === productMain?.id
                  )
                ) {
                  addToCart(productMain, quantity, activeSize, activeColor);
                } else {
                  updateCart(
                    productMain && productMain?.id,
                    quantity,
                    activeSize,
                    activeColor
                  );
                }
              }
              router.push(
                `/${params?.seller}/checkout?product=${productMain?.id}`
              );
            }}
            className="button-main w-full text-center"
          >
            {productMain && productMain?.stock <= 0
              ? "Out of Stock"
              : "Buy It Now"}
          </div>
        </div>
        <div className="flex items-center lg:gap-20 gap-8 mt-5 pb-6 border-b border-line">
          <div
            className="compare flex items-center gap-3 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCompare();
            }}
          >
            <div className="compare-btn md:w-12 md:h-12 w-10 h-10 flex items-center justify-center border border-line cursor-pointer rounded-xl duration-300 hover:bg-black hover:text-white">
              <Icon.ArrowsCounterClockwise className="heading6" />
            </div>
            <span>Compare</span>
          </div>
          <div
            onClick={openModal}
            className="share flex items-center gap-3 cursor-pointer"
          >
            <div className="share-btn md:w-12 md:h-12 w-10 h-10 flex items-center justify-center border border-line cursor-pointer rounded-xl duration-300 hover:bg-black hover:text-white">
              <Icon.ShareNetwork weight="fill" className="heading6" />
            </div>
            <span>Share Product</span>
          </div>
          <Modal
            isOpen={isOpen}
            onClose={closeModal}
            productName={productMain?.name}
            id={productMain?.id}
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
          <div className="flex items-center gap-1 mt-3">
            <Icon.Timer className="body1" />
            <div className="text-title">Estimated Delivery:</div>
            <div className="text-secondary">{getDeliveryDate()}</div>
          </div>
          <div className="flex items-center gap-1 mt-3">
            <Icon.Eye className="body1" />
            <div className="text-title">{watching}</div>
            <div className="text-secondary">
              people viewing this product right now!
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3">
            <div className="text-title">SKU:</div>
            <div className="text-secondary">
              {productMain && productMain?.id?.slice(0, 10).toUpperCase()}
            </div>
          </div>

          <div className="flex items-center gap-1 mt-3">
            <div className="text-title">Brand:</div>
            <div className="text-secondary">
              {productMain && productMain?.brand}
            </div>
          </div>
          <div className="flex items-center gap-1 mt-3">
            <div className="text-title">Tags:</div>
            {productMain &&
              productMain?.tags &&
              productMain &&
              productMain?.tags.map((item: any, index: number) => (
                <div
                  onClick={() => {
                    router.push(
                      `/${params?.seller}/search-result?query=${item}`
                    );
                  }}
                  style={{ border: "1px dashed grey" }}
                  className="text-secondary  px-2 rounded-md cursor-pointer"
                  key={index}
                >
                  {item}
                </div>
              ))}
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
      <div className="get-it mt-6">
        <div className="heading5">Get it today</div>
        <div className="item flex items-center gap-3 mt-4">
          <div className="icon-delivery-truck text-4xl"></div>
          <div>
            <div className="text-title">Free shipping</div>
            <div className="caption1 text-secondary mt-1">
              Free shipping on orders over $75.
            </div>
          </div>
        </div>
        <div className="item flex items-center gap-3 mt-4">
          <div className="icon-phone-call text-4xl"></div>
          <div>
            <div className="text-title">Support everyday</div>
            <div className="caption1 text-secondary mt-1">
              Support from 8:30 AM to 10:00 PM everyday
            </div>
          </div>
        </div>
        <div className="item flex items-center gap-3 mt-4">
          <div className="icon-return text-4xl"></div>
          <div>
            <div className="text-title">100 Day Returns</div>
            <div className="caption1 text-secondary mt-1">
              Not impressed? Get a refund. You have 100 days to break our
              hearts.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Moredetails;

const Modal = ({ isOpen, onClose, productName, id }: any) => {
  const [productUrl, setProductUrl] = useState("");

  useEffect(() => {
    const url = `${window.location.href}`;
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
