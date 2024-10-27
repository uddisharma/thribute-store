"use client";
import React from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import SkeletonComponent from "@/components/loaders/Orders";
import Link from "next/link";
import useSWR from "swr";
import { BaseApi, errorRetry, userOrders } from "@/constants";
import Error from "@/components/error/page";
import NoDataFound from "@/components/no-data/page";
import { useRouter } from "next/navigation";
import { formatDate } from "@/scripts/futuredate";
import { calculateTotalQuantity } from "@/scripts/ordercount";
import { getFirstProductPhoto } from "@/scripts/image";
import { useCookies } from "react-cookie";
import { fetcher } from "@/constants/fetcher";
import toast from "react-hot-toast";
import Toast from "@/components/ui/toast";
const Page = () => {
  const router = useRouter();

  const [cookies] = useCookies(["usertoken"]);

  let { data, isLoading, error } = useSWR(
    `${BaseApi}${userOrders}`,
    (url) => fetcher(url, cookies.usertoken),
    {
      refreshInterval: 3600000,
      revalidateOnMount: true,
      revalidateOnFocus: true,
      onErrorRetry({ retrycount }: any) {
        if (retrycount > errorRetry) {
          return false;
        }
      },
    }
  );

  const authstatus = error?.response?.data?.status == "UNAUTHORIZED" && true;

  if (authstatus) {
    localStorage.removeItem("user");
    toast.custom((t) => (
      <div className={`${t.visible ? "animate-enter" : "animate-leave"} `}>
        <Toast type="danger" message="Session Expired !" />
      </div>
    ));
    if (typeof window !== "undefined") {
      location.href = `/login?ref=my-account`;
    }
  }

  return (
    <div>
      <Link href={"/stores"}>
        <div
          style={{ border: "1px dashed grey" }}
          className="more-infor mt-5 p-5 rounded-lg"
        >
          <div className="flex items-center justify-center gap-4 flex-wrap cursor-pointer">
            <div className="flex items-center gap-1 justify-center">
              <Icon.Plus scale={20} />
              <div className="text-title text-center">Create New Order</div>
            </div>
          </div>
        </div>
      </Link>
      {isLoading ? (
        [...Array(3)].map((_, i) => <SkeletonComponent key={i} />)
      ) : error ? (
        <div className="my-20 w-full  m-auto">
          <Error />
        </div>
      ) : data?.length <= 0 ? (
        <div className="my-20 w-full  m-auto">
          <NoDataFound />
        </div>
      ) : (
        <>
          {data &&
            data?.map((e: any, i: number) => (
              <>
                <div
                  key={i}
                  style={{ border: "1px dashed grey" }}
                  className="more-infor mt-5 p-5 rounded-lg large-banner"
                >
                  <div className="ordercard">
                    <div>
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <div className="flex gap-5">
                          <div className="text-secondary">
                            #
                            {e?.courior == "Local"
                              ? e?.order_id
                              : e?.order?.order_id}
                          </div>
                          <div className="">
                            <span className="text-title">Store : </span>{" "}
                            <span
                              onClick={() => {
                                router.push(`/${e?.sellerId?.username}`);
                              }}
                              className="text-secondary cursor-pointer"
                            >
                              {e?.sellerId?.shopname}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-5 mt-3">
                        <div className="text-secondary">
                          {formatDate(e?.createdAt)}
                        </div>
                        <div className="">
                          <span className="text-title">Items : </span>{" "}
                          <span className="text-secondary">
                            {calculateTotalQuantity(e?.orderItems)}{" "}
                            {calculateTotalQuantity(e?.orderItems) == 1
                              ? "Item"
                              : "Items"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Image
                      // src={""}
                      src={
                        e?.orderItems &&
                        e?.orderItems?.length &&
                        getFirstProductPhoto(e?.orderItems)
                      }
                      alt="product image"
                      height={70}
                      width={70}
                      className="rounded-lg"
                    />
                  </div>
                  <div className="flex items-center gap-5 ">
                    <div className="">
                      <span className="text-title">Subtotal : </span>{" "}
                      <span className="text-secondary">₹{e?.totalAmount}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-evenly md:justify-start md:gap-10 lg:justify-start lg:gap-10 gap-1 mt-3">
                    <Link
                      href={`/order/${e?.id}?s=${e?.sellerId?.username}&o=${
                        e?.order_id
                      }&c=${e?.courior.split(" ").join("-").toLowerCase()}`}
                    >
                      <div className="text-secondary cursor-pointer border-b border-secondary">
                        View Order
                      </div>
                    </Link>

                    <button
                      onClick={() => {
                        router.push(`/order-tracking/${e?.order?.order_id}`);
                      }}
                      disabled={e?.courior == "Local"}
                      style={{
                        cursor:
                          e?.courior == "Local" ? "not-allowed" : "pointer",
                      }}
                      className=" cursor-pointer text-red border-b border-red "
                    >
                      {e?.courior == "Local" ? "Tracking NA" : "Track Order"}
                    </button>
                  </div>
                </div>

                <div
                  key={i}
                  style={{ border: "1px dashed grey" }}
                  className="more-infor mt-6 p-5 rounded-lg small-banner"
                >
                  <div className="">
                    <div>
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <div className="flex gap-5">
                          <div className="text-secondary">
                            {" "}
                            #
                            {e?.courior == "Local"
                              ? e?.order_id
                              : e?.order?.order_id}
                          </div>
                          <div className="">
                            <span className="text-title">Store : </span>{" "}
                            <span
                              onClick={() => {
                                router.push(`/${e?.sellerId?.username}`);
                              }}
                              className="text-secondary cursor-pointer"
                            >
                              {e?.sellerId?.shopname}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-5 mt-3">
                        <div className="text-secondary">
                          {formatDate(e?.createdAt)}
                        </div>
                        <div className="">
                          <span className="text-title">Items : </span>{" "}
                          <span className="text-secondary">
                            {" "}
                            {calculateTotalQuantity(e?.orderItems)}{" "}
                            {calculateTotalQuantity(e?.orderItems) == 1
                              ? "Item"
                              : "Items"}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-5 mt-2">
                        <div className="">
                          <span className="text-title">Subtotal : </span>{" "}
                          <span className="text-secondary">
                            ₹{e?.totalAmount}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 grid grid-cols-4 gap-5">
                      {e?.orderItems &&
                        e?.orderItems?.length &&
                        e?.orderItems?.map((e: any, i: number) => (
                          <Image
                            key={i}
                            src={e?.productId?.images[0]}
                            alt="product image"
                            height={70}
                            width={70}
                            className="rounded-lg"
                          />
                        ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-evenly md:justify-start md:gap-10 lg:justify-start lg:gap-10 gap-1 mt-5">
                    <Link
                      href={`/order/${e?.id}?s=${e?.sellerId?.username}&o=${e?.order_id}&c=${e?.courior}`}
                    >
                      <div className="text-secondary cursor-pointer border-b border-secondary">
                        View Order
                      </div>
                    </Link>
                    <button
                      onClick={() => {
                        router.push(`/order-tracking/${e?.order?.order_id}`);
                      }}
                      disabled={e?.courior == "Local"}
                      style={{
                        cursor:
                          e?.courior == "Local" ? "not-allowed" : "pointer",
                      }}
                      className=" cursor-pointer text-red border-b border-red "
                    >
                      {e?.courior == "Local" ? "Tracking NA" : "Track Order"}
                    </button>
                  </div>
                </div>
              </>
            ))}
        </>
      )}
    </div>
  );
};

export default Page;

const Modal = ({ isOpen, onClose }: any) => {
  if (!isOpen) return null;

  return (
    <>
      <div className={`modal-search-block `} onClick={onClose}>
        <div
          className={`delete-modal modal-search-main max-h-[235px] md:p-10 p-6 rounded-lg ${
            isOpen ? "open" : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="heading6 font-semibold text-center">
            Do you sure to delete this address
          </div>
          <p className="text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
            ratione pariatur atque, iure inventore quod commodi! Unde quisquam
            dolores placeat?
          </p>
          <div className="grid grid-cols-2">
            <button
              onClick={onClose}
              style={{ border: "1px dashed grey" }}
              className="button-main mt-3 w-11/12 m-auto bg-white text-black "
            >
              Cancel
            </button>

            <button
              style={{ border: "1px dashed grey" }}
              className="button-main mt-3 w-11/12 m-auto hover:bg-red hover:text-white bg-red text-white "
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
