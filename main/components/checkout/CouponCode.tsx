import { BaseApi, applyCoupon } from "@/constants";
import { calculateAfterCoupanAmount } from "@/scripts/checkout";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Toast from "../ui/toast";
import { useCookies } from "react-cookie";

const CouponCode = ({ setCoupanDiscount, totalAmount }: any) => {
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [valid, setValid] = useState(false);
  const params = useParams();
  const [cookies] = useCookies(["usertoken"]);
  const handleCoupon = (e: any) => {
    e.preventDefault();
    if (coupon.length <= 0) {
      toast.custom((t) => (
        <div className={`${t.visible ? "animate-enter" : "animate-leave"} `}>
          <Toast type="warning" message="Please Enter Coupon Code" />
        </div>
      ));
      return;
    }
    setIsLoading(true);
    axios
      .post(
        `${BaseApi}${applyCoupon}`,
        {
          username: params?.seller,
          code: coupon?.toUpperCase(),
        },
        {
          headers: {
            Authorization: `Bearer ${cookies?.usertoken}`,
          },
        }
      )
      .then((res) => {
        if (res?.data?.status == "SUCCESS") {
          setApplied(res?.data?.data);
          const result: any = calculateAfterCoupanAmount(
            totalAmount,
            res.data?.data
          );
          setCoupanDiscount(Math.ceil(result?.discountAmount));
          toast.custom((t) => (
            <div
              className={`${t.visible ? "animate-enter" : "animate-leave"} `}
            >
              <Toast
                type="success"
                message={`Hurray 🥳 , You save ₹${Math.ceil(
                  result?.discountAmount
                )} `}
              />
            </div>
          ));

          setValid(true);
        } else if (res?.data?.status == "FAILED") {
          toast.custom((t) => (
            <div
              className={`${t.visible ? "animate-enter" : "animate-leave"} `}
            >
              <Toast type="warning" message="Invalid Coupon" />
            </div>
          ));
        } else {
          toast.custom((t) => (
            <div
              className={`${t.visible ? "animate-enter" : "animate-leave"} `}
            >
              <Toast type="danger" message="Something went wrong !" />
            </div>
          ));
        }
      })
      .catch((err) => {
        console.log(err);
        if (err?.response?.data?.status == "UNAUTHORIZED") {
          localStorage.removeItem("user");
          if (typeof window !== "undefined") {
            location.href = `/login?ref=${params.seller}/checkout`;
          }
          toast.custom((t) => (
            <div
              className={`${t.visible ? "animate-enter" : "animate-leave"} `}
            >
              <Toast type="danger" message="Session Expired !" />
            </div>
          ));
        }
        toast.custom((t) => (
          <div className={`${t.visible ? "animate-enter" : "animate-leave"} `}>
            <Toast type="danger" message="Something went wrong !" />
          </div>
        ));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div>
      <div className="infor">
        <div className="input-block discount-code w-full h-12 sm:mt-7 mt-5">
          <div className="w-full h-full relative">
            <input
              type="text"
              placeholder="Add voucher discount"
              className="w-full h-full bg-white pl-4 pr-14 rounded-lg border border-line uppercase"
              required
              disabled={valid}
              readOnly={valid}
              value={coupon}
              onChange={(e) => {
                setCoupon(e.target.value);
              }}
            />
            {isLoading ? (
              <button
                disabled
                className="button-main absolute top-1 bottom-1 right-1 px-5 rounded-lg flex items-center justify-center cursor-not-allowed"
              >
                Applying...
              </button>
            ) : valid ? (
              <button
                disabled
                className="button-main absolute top-1 bottom-1 right-1 px-5 rounded-lg flex items-center justify-center cursor-not-allowed"
              >
                Applied
              </button>
            ) : (
              <button
                onClick={handleCoupon}
                disabled={coupon == "" || valid}
                className="button-main absolute top-1 bottom-1 right-1 px-5 rounded-lg flex items-center justify-center"
              >
                Apply Code
              </button>
            )}
          </div>
        </div>
        {valid && applied && (
          <div className="list-voucher flex items-center gap-5 flex-wrap sm:mt-7 mt-5">
            <div className={`item bg-green border border-line rounded-lg py-2`}>
              <div className="top flex gap-10 justify-between px-3 pb-2 border-b border-dashed border-line">
                <div className="left">
                  <div className="caption1">Discount</div>
                  <div className="caption1 font-bold">
                    {applied?.discount}
                    {applied?.discount_type == "direct_amount" ? "₹" : "%"} OFF
                  </div>
                </div>
                <div className="right">
                  <div className="caption1">
                    For all orders <br />
                  </div>
                </div>
              </div>
              <div className="bottom gap-6 items-center flex justify-between px-3 pt-2">
                <div className="text-button-uppercase">
                  Code: {applied?.code}
                </div>
                <div className="button-main py-1 px-2.5 capitalize text-xs">
                  Applied
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CouponCode;
