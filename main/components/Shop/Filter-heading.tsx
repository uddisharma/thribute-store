import React from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";

const FilterHeading = ({
  handleShowOnlySale,
  handleMenuMobile,
  onSort,
  setSortBy,
}: any) => {
  return (
    <div>
      <div className="filter-heading flex items-center justify-between gap-5 flex-wrap">
        <div className="left flex has-line items-center flex-wrap gap-5">
          <div className="large-banner">
            <div className="check-sale flex items-center gap-2">
              <input
                type="checkbox"
                name="filterSale"
                id="filter-sale"
                className="border-line"
                onChange={handleShowOnlySale}
              />
              <label htmlFor="filter-sale" className="cation1 cursor-pointer">
                In Stock
              </label>
            </div>
          </div>
          <div className="small-banner">
            <div
              className="filter-sidebar-btn flex items-center gap-2 cursor-pointer"
              onClick={handleMenuMobile}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4 21V14"
                  stroke="#1F1F1F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 10V3"
                  stroke="#1F1F1F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 21V12"
                  stroke="#1F1F1F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 8V3"
                  stroke="#1F1F1F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 21V16"
                  stroke="#1F1F1F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 12V3"
                  stroke="#1F1F1F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 14H7"
                  stroke="#1F1F1F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 8H15"
                  stroke="#1F1F1F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17 16H23"
                  stroke="#1F1F1F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Filters</span>
            </div>
          </div>
        </div>
        <div className="right flex items-center gap-3">
          <div className="select-block relative">
            <select
              id="select-filter"
              name="select-filter"
              className="caption1 py-2 pl-3 md:pr-20 pr-10 rounded-lg border border-line"
              onChange={(e) => {
                onSort(e.target.value);
                setSortBy(e.target.value);
              }}
              defaultValue={"Sorting"}
            >
              <option value="Sorting" disabled>
                Sorting
              </option>
              <option value="price-low-to-high">Price - Low to High</option>
              <option value="price-high-to-low">Price - High to Low</option>
              <option value="name-a-to-z">Name - A to Z</option>
              <option value="name-z-to-a">Name - Z to A</option>
            </select>
            <Icon.CaretDown
              size={12}
              className="absolute top-1/2 -translate-y-1/2 md:right-4 right-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterHeading;
