import React from "react";
const SkeletonComponent = () => {
  return (
    <div style={{ border: "1px dotted grey" }} className="p-5 rounded-lg mt-5">
      <div role="status" className=" animate-pulse max-w-lg">
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
      <div className="choose-color mt-2">
        <div className="list-color flex items-center gap-2 flex-wrap mt-3">
          {[...Array(3)].map((index) => (
            <div
              className={` w-12 h-12 rounded-xl duration-300 relative `}
              key={index}
            >
              <div
                style={{
                  height: "45px",
                  width: "45px",
                  borderRadius: "5px",
                }}
                className="skeleton-image"
              ></div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center w-full max-w-[180px] mt-6 md:mt-5">
        <div className="h-3 skeleton-text rounded-full dark:bg-gray-700 w-full" />
        <div className="h-3 ms-2 skeleton-text rounded-full dark:bg-gray-600 w-4/12" />
      </div>
    </div>
  );
};

export default SkeletonComponent;
