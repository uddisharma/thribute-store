import React from "react";
import Spinner from "../loaders/Spinner";
import { formatDate1, getDeliveryDate } from "@/scripts/futuredate";

const Shippingspeed = ({
  shippingService,
  setCheckOutData,
  checkoutData,
  setShipping,
  loading,
  loading1,
  courior,
  d_0,
  delivery,
  address,
}: any) => {
  return (
    <div>
      <div className="infor grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 ">
        {delivery?.delivery != undefined && delivery?.delivery?.have && (
          <div
            onClick={() => {
              setCheckOutData({
                ...checkoutData,
                shippingService: `Local-${Math.ceil(
                  Number(delivery?.delivery?.rate)
                )}-1`,
              });
              setShipping(delivery?.delivery?.rate);
            }}
            style={{
              border:
                shippingService ==
                `Local-${Math.ceil(Number(delivery?.delivery?.rate))}-1`
                  ? "2px solid grey"
                  : "1px dashed grey",
              cursor: "pointer",
            }}
            className="more-infor  p-5 rounded-lg mt-3"
          >
            {loading1 ? (
              <div className="flex justify-center items-center">
                <Spinner />
              </div>
            ) : delivery?.delivery?.have ? (
              <>
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-1">
                    <div className="text-title">{delivery?.delivery?.name}</div>
                  </div>
                </div>
                <div className=" mt-1">
                  <div className="text-secondary">
                    Delivery Rate : ₹{Math.ceil(delivery?.delivery?.rate)}
                  </div>
                  <div className="text-secondary">
                    Expected delivery by : {getDeliveryDate()}
                  </div>
                </div>
                <p className="text-red text-xs mt-2">
                  You do not get any tracking Id with this
                </p>
              </>
            ) : (
              ""
            )}
          </div>
        )}
        {!address ? (
          <div
            style={{
              border: "1px dashed grey",
              cursor: "not-allowed",
            }}
            className="more-infor p-5 rounded-lg mt-3"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100px",
              }}
            >
              <p className="my-5">Please Select an address to continue</p>
            </div>
          </div>
        ) : !d_0 ? (
          <div
            style={{
              border: "1px dashed grey",
              cursor: "not-allowed",
            }}
            className="more-infor p-5 rounded-lg mt-3"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100px",
              }}
            >
              <p className="my-5">Courior sevice not found for this address</p>
            </div>
          </div>
        ) : (
          <div
            onClick={() => {
              setCheckOutData({
                ...checkoutData,
                shippingService: `${courior?.name}-${Math.ceil(
                  courior?.freight_charges
                )}-${courior?.id}`,
              });
              setShipping(Math.ceil(courior?.freight_charges));
            }}
            style={{
              border:
                shippingService ==
                `${courior?.name}-${Math.ceil(courior?.freight_charges)}-${
                  courior?.id
                }`
                  ? "2px solid grey"
                  : "1px dashed grey",
              cursor: "pointer",
            }}
            className="more-infor  p-5 rounded-lg mt-3"
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <Spinner />
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-1">
                    <div className="text-title">{courior?.name}</div>
                  </div>
                </div>
                <div className=" mt-1">
                  <div className="text-secondary">
                    Delivery Rate : ₹{Math.ceil(courior?.freight_charges)}
                  </div>
                  <div className="text-secondary">
                    Expected delivery by : {formatDate1(courior?.edd)}
                  </div>
                </div>
                <p className="text-success text-xs mt-2">
                  You will get a tracking id to track your order
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shippingspeed;
