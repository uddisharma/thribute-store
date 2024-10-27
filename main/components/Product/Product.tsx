"use client";

import React from "react";
import Image from "next/image";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useWishlist } from "@/context/WishlistContext";
import { useModalWishlistContext } from "@/context/ModalWishlistContext";
import { useCompare } from "@/context/CompareContext";
import { useModalCompareContext } from "@/context/ModalCompareContext";
import { useModalQuickviewContext } from "@/context/ModalQuickviewContext";
import { useParams, useRouter } from "next/navigation";
import Toast from "../ui/toast";
import toast from "react-hot-toast";

function calculateDiscount(originalPrice: any, sellingPrice: any) {
  let discount = ((originalPrice - sellingPrice) / originalPrice) * 100;
  return Math.ceil(discount);
}

const Product: React.FC<any> = ({ data, type }) => {
  const { addToWishlist, removeFromWishlist, wishlistState } = useWishlist();
  const { openModalWishlist } = useModalWishlistContext();
  const { addToCompare, removeFromCompare, compareState } = useCompare();
  const { openModalCompare } = useModalCompareContext();
  const { openQuickview } = useModalQuickviewContext();
  const router = useRouter();

  const handleAddToWishlist = () => {
    if (wishlistState.wishlistArray.some((item) => item.id === data.id)) {
      removeFromWishlist(data.id);
    } else {
      addToWishlist(data);
    }
    openModalWishlist();
  };

  const handleAddToCompare = () => {
    if (compareState.compareArray.length < 3) {
      if (compareState.compareArray.some((item) => item.id === data.id)) {
        removeFromCompare(data.id);
      } else {
        addToCompare(data);
      }
    } else {
      toast.custom((t) => (
        <div className={`${t.visible ? "animate-enter" : "animate-leave"} `}>
          <Toast type="warning" message="Compare up to 3 products" />
        </div>
      ));
    }

    openModalCompare();
  };

  const handleQuickviewOpen = () => {
    openQuickview(data);
  };
  const params = useParams();

  const handleDetailProduct = (
    productId: string,
    slug: string,
    sellerId: any
  ) => {
    router.push(
      `/${
        params?.seller || sellerId?.username
      }/product/${productId}?slug=${slug}&id=${productId}`
    );
  };

  return (
    <>
      <div className="product-item grid-type">
        <div
          onClick={() =>
            handleDetailProduct(
              data.id,
              data?.name.toLowerCase()?.split(" ")?.join("-"),
              data?.sellerId
            )
          }
          className="product-main cursor-pointer block"
        >
          <div className="product-thumb bg-white relative overflow-hidden rounded-2xl">
            <div className="list-action-right absolute top-3 right-3 max-lg:hidden">
              <div
                className={`add-wishlist-btn w-[32px] h-[32px] flex items-center justify-center rounded-full bg-white duration-300 relative ${
                  wishlistState.wishlistArray.some(
                    (item) => item.id === data.id
                  )
                    ? "active"
                    : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToWishlist();
                }}
              >
                <div className="tag-action bg-black text-white caption2 px-1.5 py-0.5 rounded-sm">
                  Add To Wishlist
                </div>
                {wishlistState.wishlistArray.some(
                  (item) => item.id === data.id
                ) ? (
                  <>
                    <Icon.Heart
                      size={18}
                      weight="fill"
                      className="text-white"
                    />
                  </>
                ) : (
                  <>
                    <Icon.Heart size={18} />
                  </>
                )}
              </div>
              <div
                className={`compare-btn w-[32px] h-[32px] flex items-center justify-center rounded-full bg-white duration-300 relative mt-2 ${
                  compareState.compareArray.some((item) => item.id === data.id)
                    ? "active"
                    : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCompare();
                }}
              >
                <div className="tag-action bg-black text-white caption2 px-1.5 py-0.5 rounded-sm">
                  Compare Product
                </div>
                <Icon.ArrowsCounterClockwise
                  size={18}
                  className="compare-icon"
                />
                <Icon.CheckCircle size={20} className="checked-icon" />
              </div>
            </div>
            <div className="product-img w-full h-full aspect-[3/4]">
              <>
                {data &&
                  data?.images &&
                  data.images.map((img: any, index: any) => (
                    <Image
                      key={index}
                      src={img}
                      width={500}
                      height={500}
                      priority={true}
                      alt={data.name}
                      className="w-full h-full max-h-48 min-h-max object-cover duration-700"
                    />
                  ))}
              </>
            </div>
            <div className="list-action  px-5 absolute w-full bottom-5 max-lg:hidden">
              <div
                className="quick-view-btn w-full text-button-uppercase py-2 text-center rounded-full duration-300 bg-white hover:bg-black hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  handleQuickviewOpen();
                }}
              >
                Quick View
              </div>
            </div>
          </div>
          <div className="product-infor mt-4 lg:mb-7">
            <div className="product-sold sm:pb-4 pb-2">
              <div className="progress bg-line h-1.5 w-full rounded-full overflow-hidden relative">
                <div
                  className={`progress-sold bg-red absolute left-0 top-0 h-full`}
                  style={{
                    width: `${calculateDiscount(data?.mrp, data?.price)}%`,
                  }}
                ></div>
              </div>
              <div className="flex items-center justify-between gap-3 gap-y-1 flex-wrap mt-2">
                <div className="text-button-uppercase">
                  <span className="text-secondary2 max-sm:text-xs">Sold: </span>
                  <span className="max-sm:text-xs">{data && data?.stock}</span>
                </div>
                <div className="text-button-uppercase">
                  <span className="text-secondary2 max-sm:text-xs">
                    Available:{" "}
                  </span>
                  <span className="max-sm:text-xs">{data && data?.stock}</span>
                </div>
              </div>
            </div>
            <div className="product-name text-title duration-300">
              {data && data?.name}
            </div>

            <div className="list-color py-2 max-md:hidden flex items-center gap-3 flex-wrap duration-500">
              {data &&
                data?.colors &&
                data.colors.map((item: any, index: any) => (
                  <div
                    style={{
                      backgroundColor: item?.code,
                      cursor: item?.available ? "pointer" : "not-allowed",
                    }}
                    className={`color-item w-8 h-8 rounded-full duration-300 relative`}
                    key={index}
                  >
                    <div className="tag-action bg-black text-white caption2 capitalize px-1.5 py-0.5 rounded-sm">
                      {item.name}
                    </div>
                  </div>
                ))}
            </div>

            <div className="product-price-block flex items-center gap-2 flex-wrap mt-1 duration-300 relative z-[1]">
              <div className="product-price text-title">
                ₹{data && data?.price}.00
              </div>

              <>
                <div className="product-origin-price caption1 text-secondary2">
                  <del>₹{data && data?.mrp}.00</del>
                </div>
                <div className="product-sale caption1 font-medium bg-green px-3 py-0.5 inline-block rounded-full">
                  -{calculateDiscount(data && data?.mrp, data && data?.price)}%
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
