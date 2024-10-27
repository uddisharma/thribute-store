import { usePathname, useRouter } from "next/navigation";
import React from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
const FilteredList = ({
  pagiation,
  selectedType,
  selectedSize,
  selectedColor,
  setType,
  setCategory,
  color,
  sortBy,
  setPage,
  size,
  setSize,
  setSize1,
  category1,
  type,
  setColor,
  setColor1,
  handleClearAll,
}: any) => {
  const router = useRouter();
  const path = usePathname();
  return (
    <div>
      <div className="list-filtered flex items-center gap-3 mt-4">
        {pagiation?.itemCount > 0 && (
          <span className="text-secondary pl-1">
            Total Products {pagiation?.itemCount}
          </span>
        )}
        {(selectedType || selectedSize || selectedColor) && (
          <>
            <div className="list flex items-center gap-3">
              <div className="w-px h-4 bg-line"></div>
              {selectedType && (
                <div
                  className="item flex items-center px-2 py-1 gap-1 bg-linear rounded-full capitalize"
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
                  }}
                >
                  <Icon.X className="cursor-pointer" />
                  <span>{selectedType}</span>
                </div>
              )}
              {selectedSize && (
                <div
                  className="item flex items-center px-2 py-1 gap-1 bg-linear rounded-full capitalize"
                  onClick={() => {
                    setSize(null);
                    setSize1(null);
                    router.push(
                      `${path}?page=1&${
                        color != null ? `&color=${color}` : ""
                      }${sortBy != null ? `&sort=${sortBy}` : ""}${
                        type != null ? `&category=${category1}` : ""
                      }`
                    );
                    setPage(1);
                  }}
                >
                  <Icon.X className="cursor-pointer" />
                  <span>{selectedSize}</span>
                </div>
              )}
              {selectedColor && (
                <div
                  className="item flex items-center px-2 py-1 gap-1 bg-linear rounded-full capitalize"
                  onClick={() => {
                    setColor(null);
                    setColor1(null);
                    router.push(
                      `${path}?page=1&${size != null ? `&size=${size}` : ""}${
                        sortBy != null ? `&sort=${sortBy}` : ""
                      }${type != null ? `&category=${category1}` : ""}`
                    );
                    setPage(1);
                  }}
                >
                  <Icon.X className="cursor-pointer" />
                  <span>{selectedColor}</span>
                </div>
              )}
            </div>
            <div
              className="clear-btn flex items-center px-2 py-1 gap-1 rounded-full border border-red cursor-pointer"
              onClick={() => {
                handleClearAll();
                router.push(`${path}?page=1`);
                setPage(1);
                setColor1(null);
                setSize1(null);
                setCategory(null);
              }}
            >
              <Icon.X color="rgb(219, 68, 68)" className="cursor-pointer" />
              <span className="text-button-uppercase text-red">Clear All</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FilteredList;
