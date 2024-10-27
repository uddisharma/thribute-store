import React from "react";
const MyReferrals = () => {
  return (
    <div className="content-main flex justify-between max-xl:flex-col gap-y-8">
      <div className="xl:w-2/3 xl:pr-3 w-full">
        <div className="time bg-green py-3 px-5 mb-5 flex items-center rounded-lg">
          <div className="heding5">🔥</div>
          <div className="caption1 pl-2">Loading...</div>
        </div>
        <div className="heading bg-surface bora-4 pt-4 pb-4">
          <div className="flex">
            <div className="w-5/12">
              <div className="text-button text-center">Seller</div>
            </div>

            <div className="w-5/12">
              <div className="text-button text-center">Amount</div>
            </div>
            <div className="w-5/12">
              <div className="text-button text-center">Status</div>
            </div>
          </div>
        </div>
        {[...Array(3)].map((index) => (
          <div
            key={index}
            className="flex md:mt-7 md:pb-7 mt-5 pb-5 border-b border-line w-full animate-pulse"
          >
            <div className="w-5/12 flex items-center justify-center">
              <div className="skeleton-text w-10/12 h-4 rounded-lg"></div>
            </div>
            <div className="w-5/12 flex items-center justify-center">
              <div className="skeleton-text w-10/12 h-4 rounded-lg"></div>
            </div>
            <div className="w-5/12 flex items-center justify-center">
              <div className="skeleton-text w-10/12 h-4 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>
      <div className="xl:w-1/3 xl:pl-12 w-full">
        <div className="checkout-block bg-surface p-6 rounded-2xl">
          <div className="heading5">Referrals Summary</div>
          <div className="total-block py-5 flex justify-between border-b border-line">
            <div className="text-title">Completed</div>
            <div className="text-title">
              <div className="skeleton-text w-6 h-4 rounded-lg"></div>
            </div>
          </div>
          <div className="discount-block py-5 flex justify-between border-b border-line">
            <div className="text-title">Pending</div>
            <div className="text-title">
              {" "}
              <div className="skeleton-text w-6 h-4 rounded-lg"></div>
            </div>
          </div>
          <div className="discount-block py-5 flex justify-between border-b border-line">
            <div className="text-title">Total Earned</div>
            <div className="text-title">
              {" "}
              <div className="skeleton-text w-6 h-4 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyReferrals;
