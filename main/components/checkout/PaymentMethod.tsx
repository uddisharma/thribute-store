import React from "react";

const PaymentMethod = ({ payment, setCheckOutData, checkoutData }: any) => {
  return (
    <div>
      <div className="infor">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
          <div
            onClick={() => {
              setCheckOutData({
                ...checkoutData,
                payment: "UPI",
              });
            }}
            style={{
              border: payment == "UPI" ? "2px solid grey" : "1px dashed grey",
            }}
            className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line active
                                mt-3 cursor-pointer`}
          >
            <div className="color bg-green w-5 h-5 rounded-full"></div>
            <div className="">UPI</div>
            <div className="text-xs  text-center align-middle">
              Save upto 2% bank charges
            </div>
          </div>
          <div
            onClick={() => {
              setCheckOutData({
                ...checkoutData,
                payment: "Gateway",
              });
            }}
            style={{
              border:
                payment == "Gateway" ? "2px solid grey" : "1px dashed grey",
            }}
            className={`color-item px-3 p-[5px] flex items-center justify-center gap-2 rounded-full border border-line active
                                mt-0 md:mt-3 lg:mt-3 cursor-pointer mb-3 md:mb-0 lg:mb-0`}
          >
            <div className="color bg-green w-5 h-5 rounded-full"></div>
            <div className="">Gateway</div>
            <div className="text-xs  text-center align-middle">
              Save upto 2% bank charges
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
