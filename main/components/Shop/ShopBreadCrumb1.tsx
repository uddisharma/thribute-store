"use client";
import React, { useState } from "react";
import "rc-slider/assets/index.css";
import useMenuMobile from "@/store/useMenuMobile";
import { ItemperPage } from "@/constants";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import FilteredList from "./Filtered-list";
import SideFilters from "./Side-filters";
import FilterHeading from "./Filter-heading";
import ProductRendering from "./product-rendering";
import Pagination1 from "./Pagination";
import Mainfilters from "./Main-filters";

interface Props {
  data: any;
  productPerPage: number;
  dataType: string | null | undefined;
  gender: string | null;
  category: string | null;
  pagiation: any;
  page: number;
  setPage: any;
  paginate: any;
  sortBy: string;
  setSortBy: any;
  onSort: any;
  applyFilter: any;
  setSize1: any;
  setColor1: any;
  p_loading: boolean;
  p_error: boolean;
  c_data: any;
  setCategory: any;
  category1: any;
}

const ShopBreadCrumb1: React.FC<Props> = ({
  data,
  dataType,
  pagiation,
  page,
  setPage,
  paginate,
  sortBy,
  setSortBy,
  onSort,
  setColor1,
  setSize1,
  p_loading,
  p_error,
  c_data,
  setCategory,
  category1,
}) => {
  const searchparams = useSearchParams();
  const [showOnlySale, setShowOnlySale] = useState(false);
  const [type, setType] = useState<string | null | undefined>(
    c_data?.filter(
      (e: any) => e?.category?.id == searchparams.get("category")
    )[0]?.category?.name
  );

  const [size, setSize] = useState<string | null>(
    searchparams.get("size") ?? null
  );
  const [color, setColor] = useState<string | null>(
    searchparams.get("color") ?? null
  );
  const { openMenuMobile, handleMenuMobile } = useMenuMobile();
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 100,
  });

  const handleShowOnlySale = () => {
    setShowOnlySale((toggleSelect) => !toggleSelect);
  };

  const handleType = (type: string | null, name: string | null) => {
    setType((prevType) => (prevType === name ? null : name));
    setCategory((prevType: any) => (prevType === type ? null : type));
    router.push(
      `${path}?page=1&category=${type}${size != null ? `&size=${size}` : ""}${
        sortBy != null ? `&sort=${sortBy}` : ""
      }${color != null ? `&color=${color}` : ""}`
    );
    setPage(1);
  };
  const router = useRouter();
  const path = usePathname();

  const handleSize = (size: string) => {
    router.push(
      `${path}?page=1&size=${size}${color != null ? `&color=${color}` : ""}${
        sortBy != null ? `&sort=${sortBy}` : ""
      }${category1 != null ? `&category=${category1}` : ""}`
    );
    setPage(1);
    setSize1(size);
    setSize((prevSize) => (prevSize === size ? null : size));
  };

  const handlePriceChange = (values: number | number[]) => {
    if (Array.isArray(values)) {
      setPriceRange({ min: values[0], max: values[1] });
    }
  };
  const handleColor = (color: string) => {
    router.push(
      `${path}?page=1&color=${color}${size != null ? `&size=${size}` : ""}${
        sortBy != null ? `&sort=${sortBy}` : ""
      }${category1 != null ? `&category=${category1}` : ""}`
    );
    setPage(1);
    setColor1(color);
    setColor((prevColor) => (prevColor === color ? null : color));
  };
  const selectedType = type;
  const selectedSize = size;
  const selectedColor = color;

  const handleClearAll = () => {
    dataType = null;
    setShowOnlySale(false);
    setType(null);
    setSize(null);
    setColor(null);
    setPriceRange({ min: 0, max: 100 });
    handleType(null, null);
  };

  if (showOnlySale) {
    data = data?.filter((e: any) => {
      return Number(e.stock) > 0;
    });
  }

  return (
    <>
      <div className="shop-product breadcrumb1 lg:py-15 md:py-10 py-6">
        <div className="container">
          <div className="flex max-md:flex-wrap max-md:flex-col-reverse gap-y-8">
            <div className="large-banner sidebar lg:w-1/5 md:w-1/4 w-full md:pr-12">
              <Mainfilters
                setType={setType}
                setCategory={setCategory}
                color={color}
                size={size}
                sortBy={sortBy}
                setPage={setPage}
                c_data={c_data}
                type={type}
                handleType={handleType}
                handleSize={handleSize}
                handleColor={handleColor}
              />
            </div>

            <div className="list-product-block lg:w-3/4 md:w-2/3 w-full md:pl-3">
              <FilterHeading
                handleShowOnlySale={handleShowOnlySale}
                handleMenuMobile={handleMenuMobile}
                onSort={onSort}
                setSortBy={setSortBy}
              />
              <FilteredList
                pagiation={pagiation}
                selectedType={selectedType}
                selectedSize={selectedSize}
                selectedColor={selectedColor}
                setType={setType}
                setCategory={setCategory}
                color={color}
                sortBy={sortBy}
                setPage={setPage}
                size={size}
                setSize={setSize}
                setSize1={setSize1}
                category1={category1}
                type={type}
                setColor={setColor}
                setColor1={setColor1}
                handleClearAll={handleClearAll}
              />
              <ProductRendering
                p_loading={p_loading}
                p_error={p_error}
                data={data}
              />
              <Pagination1
                data={data}
                pagiation={pagiation}
                ItemperPage={ItemperPage}
                page={page}
                setPage={setPage}
                paginate={paginate}
              />
            </div>
          </div>
        </div>
      </div>
      <SideFilters
        openMenuMobile={openMenuMobile}
        handleMenuMobile={handleMenuMobile}
        setType={setType}
        setCategory={setCategory}
        color={color}
        size={size}
        sortBy={sortBy}
        setPage={setPage}
        c_data={c_data}
        type={type}
        handleType={handleType}
        handleSize={handleSize}
        handleColor={handleColor}
      />
    </>
  );
};

export default ShopBreadCrumb1;
