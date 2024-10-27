"use client";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";
import MenuHome from "@/components/Header/Menu/MenuHome";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import NoDataFound from "@/components/no-data/page";
import { data } from "@/data/HomeCategory";
import { convertImage, toBase64 } from "@/scripts/image";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

const CategoriesDetails = () => {
  const params = useSearchParams();
  const newdata = data?.filter((e) => {
    return (
      e.parent == params.get("parent") &&
      e.name.toLowerCase() == params.get("name") &&
      e.p_n.toLowerCase() == params.get("p_n") &&
      e.id == params.get("id")
    );
  });
  const heading =
    params.get("p_n") == "all"
      ? `${params.get("name")}`
      : `${params.get("p_n")}'s ${params.get("name")}`;

  const subheading =
    params.get("p_n") == "all"
      ? `${params.get("name")}`
      : `${params.get("p_n")}'s ${params.get("name")}`;
  return (
    <div>
      <TopNavOne
        props="style-one bg-black"
        slogan="New customers save 10% with the code GET10"
      />
      <div id="header" className="relative w-full">
        <MenuHome props="bg-white" />
        <Breadcrumb heading={heading} subHeading={subheading} />
      </div>

      <div className="container blog default pt-5 md:pt-10 md:pb-16 ">
        <div className="">
          {(newdata && newdata?.length <= 0) ||
          newdata[0]?.subcategory?.length <= 0 ? (
            <div className="my-20 w-full md:w-8/12 lg:w-8/12 m-auto">
              <NoDataFound />
            </div>
          ) : (
            <div className="list-product-block relative w-full md:w-9/12 lg:w-9/12 m-auto ">
              <div
                className={`shop-square list-product hide-product-sold grid lg:grid-cols-${4} sm:grid-cols-3 grid-cols-2 sm:gap-[30px] gap-[20px] `}
              >
                {newdata &&
                  newdata?.length > 0 &&
                  newdata[0].subcategory?.map((item: any, i: any) => (
                    <Link
                      key={i}
                      href={{
                        pathname: `/stores/category`,
                        query: {
                          p_n: params.get("p_n")?.toLowerCase(),
                          name: params.get("name")?.toLowerCase(),
                          parent: params.get("parent")?.toLowerCase(),
                          category: item?.id,
                        },
                      }}
                      className="relative group  overflow-hidden collection-item block relative rounded-2xl overflow-hidden cursor-pointer max-h-64"
                    >
                      <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-lg bg-gray-100 bg-img">
                        <Image
                          alt={item?.name}
                          src={item?.photo}
                          fill
                          priority
                          quality={90}
                          placeholder="blur"
                          sizes="(max-width: 768px) 100vw"
                          blurDataURL={`data:image/svg+xml;base64,${toBase64(
                            convertImage(700, 475)
                          )}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-lg">{item?.name}</span>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoriesDetails;
