"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import blogData from "@/data/Blog.json";
import NewsInsight from "@/components/Home1/NewsInsight";
import Footer from "@/components/Footer/Footer";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import Rate from "@/components/Other/Rate";
import MenuHome from "@/components/Header/Menu/MenuHome";

const BlogDetailTwo = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  let blogId = searchParams.get("id");
  if (blogId === null) {
    blogId = "14";
  }

  const blogMain = blogData[Number(blogId) - 1];

  const handleBlogClick = (category: string) => {
    // Go to blog detail with category selected
    router.push(`/blog/default?category=${category}`);
  };

  const handleBlogDetail = (id: string) => {
    // Go to blog detail with id selected
    router.push(`/blogs/detail?id=${id}`);
  };
  const processedDescription =
    blogMain &&
    blogMain?.description.split("\n").map((line, index) => {
      if (/^\*\*\d+\..+:\*\*$/.test(line)) {
        return <strong key={index}>{line}</strong>;
      } else {
        return (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        );
      }
    });

  return (
    <>
      <TopNavOne
        props="style-one bg-black"
        slogan="New customers save 10% with the code GET10"
      />
      <div id="header" className="relative w-full">
        <MenuHome props="bg-transparent" />
      </div>
      {blogMain ? (
        <div className="blog detail2 md:mt-[34px] mt-[34px] ">
          <div className="container lg:pt-14 md:pt-14 pt-10">
            <div className="blog-content flex justify-between max-lg:flex-col gap-y-10">
              <div className="main xl:w-3/4 lg:w-2/3 lg:pr-[15px]">
                <div className="blog-tag bg-green py-1 px-2.5 rounded-full text-button-uppercase inline-block">
                  {blogMain?.tag}
                </div>
                <div className="heading3 mt-3">{blogMain?.title}</div>
                <div className="author flex items-center gap-4 mt-4">
                  <div className="avatar w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={blogMain?.avatar}
                      width={200}
                      height={200}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="caption1 text-secondary">
                      by {blogMain?.author}
                    </div>
                    <div className="line w-5 h-px bg-secondary"></div>
                    <div className="caption1 text-secondary">
                      {blogMain?.date}
                    </div>
                  </div>
                </div>
                <div className="bg-img md:py-10 py-6">
                  <Image
                    src={blogMain?.thumbImg}
                    width={5000}
                    height={4000}
                    alt={blogMain?.thumbImg}
                    className="w-full object-cover rounded-3xl"
                  />
                </div>
                <div className="content">
                  {/* <p dangerouslySetInnerHTML={{ __html: processedDescription }} /> */}
                  <p>{processedDescription}</p>
                </div>

                <div className="next-pre flex items-center justify-between md:mt-8 mt-5 py-6 border-y border-line">
                  {blogId === "1" ? (
                    <>
                      <div
                        className="left cursor-pointer"
                        onClick={() =>
                          handleBlogDetail(String(blogData?.length))
                        }
                      >
                        <div className="text-button-uppercase text-secondary2">
                          Previous
                        </div>
                        <div className="text-title mt-2">
                          {blogData[blogData.length - 1].title}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className="left cursor-pointer"
                        onClick={() =>
                          handleBlogDetail(blogData[Number(blogId) - 2].id)
                        }
                      >
                        <div className="text-button-uppercase text-secondary2">
                          Previous
                        </div>
                        <div className="text-title mt-2">
                          {blogData[Number(blogId) - 2]?.title}
                        </div>
                      </div>
                    </>
                  )}
                  {Number(blogId) === blogData.length ? (
                    <>
                      <div
                        className="right text-right cursor-pointer"
                        onClick={() => handleBlogDetail("1")}
                      >
                        <div className="text-button-uppercase text-secondary2">
                          Next
                        </div>
                        <div className="text-title mt-2">
                          {blogData[0].title}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className="right text-right cursor-pointer"
                        onClick={() =>
                          handleBlogDetail(blogData[Number(blogId)].id)
                        }
                      >
                        <div className="text-button-uppercase text-secondary2">
                          Next
                        </div>
                        <div className="text-title mt-2">
                          {blogData[Number(blogId)]?.title}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="right xl:w-1/4 lg:w-1/3 lg:pl-[45px]">
                <div className="recent md:mt-10 mt-6">
                  <div className="heading6">Recent Posts</div>
                  <div className="list-recent pt-1">
                    {blogData.map((item) => (
                      <div
                        className="item flex gap-4 mt-5 cursor-pointer"
                        key={item.id}
                        onClick={() => handleBlogDetail(item.id)}
                      >
                        <Image
                          src={item.thumbImg}
                          width={500}
                          height={400}
                          alt={item.thumbImg}
                          className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                        />
                        <div>
                          {/* <div className="blog-tag whitespace-nowrap bg-green py-0.5 px-2 rounded-full text-button-uppercase text-xs inline-block">
                            {item.tag}
                          </div> */}
                          <div className="text-title mt-1">{item.title}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="subcribe md:mt-10 mt-6 bg-surface p-6 rounded-[20px]">
                  <div className="text-center heading5">
                    Subscribe For Daily Newsletter
                  </div>
                  <form className="mt-5">
                    <input
                      className="text-center md:h-[50px] h-[44px] w-full px-4 rounded-xl"
                      type="text"
                      placeholder="Your email address"
                    />
                    <button
                      onClick={() => {
                        router.push("/register");
                      }}
                      className="button-main text-center w-full mt-4"
                    >
                      Sign Up
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:pb-20 md:pb-14 pb-10">
            <NewsInsight data={blogData} start={0} limit={3} />
          </div>
        </div>
      ) : (
        <div className="h-[100vh] w-full flex justify-center item-center">
          <h1 className="text-center mt-48 heading3">Blog Not Found</h1>
        </div>
      )}
      <Footer />
    </>
  );
};

export default BlogDetailTwo;
