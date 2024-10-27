import React from "react";

const OrderDetails = () => {
  return (
    <div className="content-main flex justify-between max-xl:flex-col gap-y-8">
      <div className="xl:w-2/3 xl:pr-3 w-full">
        <div className="time bg-green py-3 px-5 mb-5 flex items-center rounded-lg">
          <div className="heding5">🔥</div>
          <div className="caption1 pl-2">Loading...</div>
        </div>
        <div className="heading bg-surface bora-4 pt-4 pb-4">
          <div className="flex">
            <div className="w-1/2">
              <div className="text-button text-left ml-2">Products</div>
            </div>

            <div className="w-1/6">
              <div className="text-button text-center">Quantity</div>
            </div>
            <div className="w-1/6">
              <div className="text-button text-center">Color</div>
            </div>
            <div className="w-1/6">
              <div className="text-button text-center">Size</div>
            </div>
            <div className="w-1/6">
              <div className="text-button text-center">Total Price</div>
            </div>
          </div>
        </div>
        {[...Array(3)].map((index) => (
          <div
            key={index}
            className="flex md:mt-7 md:pb-7 mt-5 pb-5 border-b border-line w-full animate-pulse"
          >
            <div className="w-1/2">
              <div className="flex items-center gap-6">
                <div className="skeleton-text w-14 h-14 rounded-lg"></div>
                <div className="skeleton-text w-3/4 h-4 rounded-lg"></div>
              </div>
            </div>

            <div className="w-1/6 flex items-center justify-center">
              <div className="skeleton-text w-6 h-4 rounded-lg"></div>
            </div>
            <div className="w-1/6 flex items-center justify-center">
              <div className="skeleton-text w-6 h-4 rounded-lg"></div>
            </div>
            <div className="w-1/6 flex items-center justify-center">
              <div className="skeleton-text w-6 h-4 rounded-lg"></div>
            </div>
            <div className="w-1/6 flex items-center justify-center">
              <div className="skeleton-text w-12 h-4 rounded-lg"></div>
            </div>
          </div>
        ))}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
          {[...Array(3)].map((index) => (
            <div
              key={index}
              style={{ border: "1px dashed grey" }}
              className="  p-5 rounded-lg"
            >
              <div role="status" className=" animate-pulse ">
                <div className="flex items-center w-full">
                  <div className="h-3 skeleton-text rounded-full w-32" />
                  <div className="h-3 ms-2 skeleton-text rounded-full dark:bg-gray-600 w-24" />
                  <div className="h-3 ms-2 skeleton-text rounded-full dark:bg-gray-600 w-full" />
                </div>
                <div className="flex items-center w-full max-w-[480px]">
                  <div className="h-3 skeleton-text rounded-full dark:bg-gray-700 w-full" />
                  <div className="h-3 ms-2 skeleton-text rounded-full dark:bg-gray-600 w-full" />
                  <div className="h-3 ms-2 skeleton-text rounded-full dark:bg-gray-600 w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="xl:w-1/3 xl:pl-12 w-full">
        <div className="checkout-block bg-surface p-6 rounded-2xl">
          <div className="heading5">Order Summary</div>
          <div className="total-block py-5 flex justify-between border-b border-line">
            <div className="text-title">Subtotal</div>
            <div className="text-title">
              <div className="skeleton-text w-6 h-4 rounded-lg"></div>
            </div>
          </div>
          <div className="discount-block py-5 flex justify-between border-b border-line">
            <div className="text-title">Discounts</div>
            <div className="text-title">
              {" "}
              <div className="skeleton-text w-6 h-4 rounded-lg"></div>
            </div>
          </div>
          <div className="discount-block py-5 flex justify-between border-b border-line">
            <div className="text-title">Shipping</div>
            <div className="text-title">
              {" "}
              <div className="skeleton-text w-6 h-4 rounded-lg"></div>
            </div>
          </div>
          <div className="total-cart-block pt-4 pb-4 flex justify-between">
            <div className="heading5">Total</div>
            <div className="heading5">
              <div className="skeleton-text w-6 h-4 rounded-lg"></div>
            </div>
          </div>
          <div className="block-button flex flex-col items-center gap-y-4 mt-5">
            <div className="checkout-btn button-main text-center w-full cursor-not-allowed">
              Track Order
            </div>
            <div className="text-button hover-underline cursor-not-allowed">
              Download Invoice
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
