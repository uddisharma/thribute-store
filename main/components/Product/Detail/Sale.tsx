"use client";

import React, { useState } from "react";
import { ProductType } from "@/type/ProductType";
import { Navigation, Thumbs } from "swiper/modules";
import SwiperCore from "swiper/core";
import "swiper/css/bundle";
import { useParams, useSearchParams } from "next/navigation";
import useSWR from "swr";
import {
  BaseApi,
  otherProducts,
  otherProductsLimit,
  relatedProducts,
  relatedProductsLimit,
} from "@/constants";
import axios from "axios";
import Swiper1 from "./Swiper";
import Moredetails from "./Moredetails";
import Relatedproducts from "./Relatedproducts";
import Otherproducts from "./Otherproducts";

SwiperCore.use([Navigation, Thumbs]);

interface Props {
  data: ProductType;
}

const Sale: React.FC<Props> = ({ data }) => {
  const [page, setPage] = useState<number>(1);
  const [page1, setPage1] = useState<number>(1);
  const productMain = data;
  const params = useParams();
  const searchparams = useSearchParams();
  const fetcher = (url: any) => axios.get(url).then((res) => res.data);
  let {
    data: data1,
    isLoading,
    error,
  } = useSWR(
    `${BaseApi}${relatedProducts}/${
      params?.seller
    }?page=${page}&limit=${relatedProductsLimit}${
      data && data?.category && `&category=${data && data?.category}`
    }`,
    fetcher,
    {
      refreshInterval: 3600000,
    }
  );
  const pagininator = data1?.data?.paginator;

  data1 = data1?.data?.data?.filter((e: any) => {
    return e.id != searchparams.get("id");
  });

  let {
    data: data2,
    isLoading: isLoading2,
    error: error2,
  } = useSWR(
    `${BaseApi}${otherProducts}/${params?.seller}?page=${page1}&limit=${otherProductsLimit}`,
    fetcher,
    {
      refreshInterval: 3600000,
    }
  );
  const pagininator1 = data2?.data?.paginator;

  data2 = data2?.data?.data?.filter((e: any) => {
    return e.id != searchparams.get("id") && e?.category !== data?.category;
  });

  return (
    <>
      <div className="product-detail sale">
        <div className="featured-product underwear md:py-10 py-10">
          <div className="container flex justify-between gap-y-6 flex-wrap">
            <div className="list-img md:w-1/2 md:pr-[45px] w-full">
              <Swiper1 productMain={productMain} data={data} />
            </div>
            <div className="product-infor md:w-1/2 w-full lg:pl-[15px] md:pl-2">
              <Moredetails productMain={productMain} />
            </div>
          </div>
        </div>
        <div className="desc-tab md:pb-20 pb-10">
          <div className="container">
            <div className="flex items-center justify-center w-full">
              <div className="menu-tab flex items-center md:gap-[60px] gap-8">
                <div
                  className={`tab-item heading5 has-line-before text-secondary2 hover:text-black duration-300`}
                >
                  Description
                </div>
              </div>
            </div>
            <div className="desc-block mt-8">
              <div className="my-10">
                <div
                  dangerouslySetInnerHTML={{
                    __html: data && data?.desc,
                  }}
                  className="desc text-secondary mt-3 "
                ></div>

                <div className="grid lg:grid-cols-4 grid-cols-2 gap-[30px] md:mt-20 mt-6">
                  <div className="item">
                    <div className="icon-delivery-truck text-4xl"></div>
                    <div className="heading6 mt-4">Shipping Faster</div>
                    <div className="text-secondary mt-2">
                      Use on walls, furniture, doors and many more surfaces. The
                      possibilities are endless.
                    </div>
                  </div>
                  <div className="item">
                    <div className="icon-cotton text-4xl"></div>
                    <div className="heading6 mt-4">Cotton Material</div>
                    <div className="text-secondary mt-2">
                      Use on walls, furniture, doors and many more surfaces. The
                      possibilities are endless.
                    </div>
                  </div>
                  <div className="item">
                    <div className="icon-guarantee text-4xl"></div>
                    <div className="heading6 mt-4">High Quality</div>
                    <div className="text-secondary mt-2">
                      Use on walls, furniture, doors and many more surfaces. The
                      possibilities are endless.
                    </div>
                  </div>
                  <div className="item">
                    <div className="icon-leaves-compatible text-4xl"></div>
                    <div className="heading6 mt-4">highly compatible</div>
                    <div className="text-secondary mt-2">
                      Use on walls, furniture, doors and many more surfaces. The
                      possibilities are endless.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Relatedproducts
          data1={data1}
          isLoading={isLoading}
          error={error}
          setPage={setPage}
          page={page}
          pagininator={pagininator}
        />
        <Otherproducts
          data2={data2}
          isLoading2={isLoading2}
          error2={error2}
          setPage1={setPage1}
          page1={page1}
          pagininator1={pagininator1}
        />
      </div>
    </>
  );
};

export default Sale;
