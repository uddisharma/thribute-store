import { usePathname, useRouter } from "next/navigation";

import React, { useState } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { commonColors, commonSizes } from "@/data/color-size";

const Mainfilters = ({
  setType,
  setCategory,
  color,
  size,
  sortBy,
  setPage,
  c_data,
  type,
  handleType,
  handleSize,
  handleColor,
}: any) => {
  const router = useRouter();
  const path = usePathname();
  const [colorLimit, setColorLimit] = useState(5);
  const [sizeLimit, setSizeLimit] = useState(5);
  return (
    <div>
      <div>
        <div className="filter-type pb-8 border-b border-line">
          <div className="heading6">Categories</div>
          <div className="list-type mt-4">
            <div
              className={`item flex items-center justify-between cursor-pointer `}
              onClick={() => {
                setType(null);
                setCategory(null);
                router.push(
                  `${path}?page=1&${color != null ? `&color=${color}` : ""}${
                    sortBy != null ? `&sort=${sortBy}` : ""
                  }
                        ${size != null ? `&size=${size}` : ""}`
                );
                setPage(1);
              }}
            >
              <div className="text-secondary has-line-before hover:text-black capitalize">
                All Items
              </div>
              <div>{<Icon.ArrowRight size={12} className="" />}</div>
            </div>
            {c_data &&
              c_data?.map((item: any, index: number) => (
                <div
                  key={index}
                  className={`item flex items-center justify-between cursor-pointer ${
                    type === item.category?.name ? "active" : ""
                  }`}
                  onClick={() =>
                    handleType(item.category?.id, item?.category?.name)
                  }
                >
                  <div className="text-secondary has-line-before hover:text-black capitalize">
                    {item?.category?.name}{" "}
                    {item?.category?.parentCategoryId?.parentCategoryId?.name ==
                      "All" && item?.category?.parentCategoryId?.name}
                  </div>
                  {item?.category?.parentCategoryId?.parentCategoryId?.name !==
                    "All" && (
                    <p style={{ fontSize: "9px", textAlign: "end" }}>
                      {`in ${item?.category?.parentCategoryId?.parentCategoryId?.name} ${item?.category?.parentCategoryId?.name} `}{" "}
                    </p>
                  )}
                  <div>{<Icon.ArrowRight size={12} className="" />}</div>
                </div>
              ))}
          </div>
        </div>
        <div className="filter-size pb-8 border-b border-line mt-8">
          <div className="heading6">Size</div>
          <div className="list-size flex items-center flex-wrap gap-3 gap-y-4 mt-4">
            {commonSizes
              ?.slice(0, sizeLimit)
              ?.map((item: any, index: number) => (
                <div
                  key={index}
                  className={`size-item text-center text-button w-[44px] h-[44px] flex items-center justify-center rounded-full border border-line ${
                    size === item?.value ? "active" : ""
                  } ${item?.name == "Size Free" && "text-[10px]"}`}
                  onClick={() => {
                    handleSize(item?.value);
                  }}
                >
                  {item?.name}
                </div>
              ))}
            {commonSizes?.length != sizeLimit ? (
              <div
                onClick={() => setSizeLimit(commonSizes?.length)}
                className="item flex items-center justify-between cursor-pointer"
              >
                <p className="text-[14px] text-center">Show all Sizes</p>
                <div>{<Icon.ArrowRight size={12} className="" />}</div>
              </div>
            ) : (
              <div
                onClick={() => setSizeLimit(5)}
                className="item flex items-center justify-between cursor-pointer"
              >
                <p className="text-[14px] text-center">Show less Sizes</p>
                <div>{<Icon.ArrowRight size={12} className="" />}</div>
              </div>
            )}
          </div>
        </div>
        <div className="filter-color pb-8 border-b border-line mt-8">
          <div className="heading6">colors</div>
          <div className="list-color flex items-center flex-wrap gap-3 gap-y-4 mt-4">
            {commonColors
              ?.slice(0, colorLimit)
              ?.map((item: any, index: number) => (
                <div
                  key={index}
                  className={`color-item px-3 py-[5px] flex items-center justify-center gap-2 rounded-full border border-line ${
                    color === item?.value ? "active" : ""
                  }`}
                  onClick={() => handleColor(item?.value)}
                >
                  <div
                    style={{ backgroundColor: `${item?.code}` }}
                    className={`color bg-[${item?.code}] w-5 h-5 rounded-full`}
                  ></div>
                  <div
                    className={`caption1 capitalize ${
                      item?.name == "Color Free" && "text-primary"
                    }`}
                  >
                    {item?.name}
                  </div>
                </div>
              ))}
            {commonColors?.length != colorLimit ? (
              <div
                onClick={() => setColorLimit(commonColors?.length)}
                className="item flex items-center justify-between cursor-pointer"
              >
                <p className="text-[14px] text-center">Show all Colors</p>
                <div>{<Icon.ArrowRight size={12} className="" />}</div>
              </div>
            ) : (
              <div
                onClick={() => setColorLimit(5)}
                className="item flex items-center justify-between cursor-pointer"
              >
                <p className="text-[14px] text-center">Show less Colors</p>
                <div>{<Icon.ArrowRight size={12} className="" />}</div>
              </div>
            )}

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mainfilters;
