import React from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { usePathname, useRouter } from "next/navigation";
import { commonColors, commonSizes } from "@/data/color-size";

const SideFilters = ({
  openMenuMobile,
  handleMenuMobile,
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
  return (
    <div>
      <div
        style={{ overflowY: "scroll" }}
        id="menu-mobile"
        className={`${openMenuMobile ? "open" : ""}`}
      >
        <div className=" ">
          <div className="container h-full">
            <div className="menu-main h-full overflow-hidden">
              <div className="heading py-2 relative flex items-center justify-center">
                <p className="logo text-3xl font-semibold text-center">
                  Filters
                </p>
                <div
                  className="close-menu-mobile-btn absolute right-0 top-0 mt-4 mr-4 w-6 h-6 rounded-full bg-surface flex items-center justify-center"
                  onClick={handleMenuMobile}
                >
                  <Icon.X size={14} />
                </div>
              </div>

              <div className=" my-10 sidebar lg:w-1/5 md:w-1/4 w-full md:pr-12">
                <div className="filter-type pb-8 border-b border-line">
                  <div className="heading6">Categories</div>

                  <div className="list-type mt-4">
                    <div
                      className={`item flex items-center justify-between cursor-pointer `}
                      onClick={() => {
                        setType(null);
                        setCategory(null);
                        router.push(
                          `${path}?page=1&${
                            color != null ? `&color=${color}` : ""
                          }${sortBy != null ? `&sort=${sortBy}` : ""}
                        ${size != null ? `&size=${size}` : ""}`
                        );
                        setPage(1);
                        handleMenuMobile();
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
                          onClick={() => {
                            handleType(item.category?.id, item?.category?.name);
                            handleMenuMobile();
                          }}
                        >
                          <div className="text-secondary has-line-before hover:text-black capitalize">
                            {item?.category?.name}{" "}
                            {item?.category?.parentCategoryId?.parentCategoryId
                              ?.name == "All" &&
                              item?.category?.parentCategoryId?.name}
                          </div>
                          {item?.category?.parentCategoryId?.parentCategoryId
                            ?.name !== "All" && (
                            <p style={{ fontSize: "9px", textAlign: "end" }}>
                              {`in ${item?.category?.parentCategoryId?.parentCategoryId?.name} ${item?.category?.parentCategoryId?.name} `}{" "}
                            </p>
                          )}
                          <div>
                            {<Icon.ArrowRight size={12} className="" />}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="filter-size pb-8 border-b border-line mt-8">
                  <div className="heading6">Size</div>
                  <div className="list-size flex items-center flex-wrap gap-3 gap-y-4 mt-4">
                    {commonSizes?.map((item: any, index: number) => (
                      <div
                        key={index}
                        className={`size-item text-button w-[44px] h-[44px] flex items-center justify-center rounded-full border border-line ${
                          size === item?.value ? "active" : ""
                        } ${item?.name == "Size Free" && "text-[10px]"}`}
                        onClick={() => {
                          handleSize(item?.value);
                        }}
                      >
                        {item?.name}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="filter-color pb-8 border-b border-line mt-8">
                  <div className="heading6">colors</div>
                  <div className="list-color flex items-center flex-wrap gap-3 gap-y-4 mt-4">
                    {commonColors.map((item: any, index: number) => (
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideFilters;
