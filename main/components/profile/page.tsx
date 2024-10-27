"use client";
import React, { useState } from "react";
import Image from "next/image";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";
import Profile from "@/components/profile/profile/page";
import Orders from "@/components/profile/orders/page";
import Address from "@/components/profile/address/page";
import Password from "@/components/profile/password/page";
import MenuHome from "@/components/Header/Menu/MenuHome";
import { useUser } from "@/context/UserContext";

type Tab = {
  id: number;
  title: string;
  content: any;
};

type TabProps = {
  defaultTab: number;
  tabs: Tab[];
};

const Tab: React.FC<TabProps> = ({ defaultTab, tabs }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  return (
    <div className="relative">
      <div className="sticky top-0 bg-white z-10">
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${
                activeTab === tab.id
                  ? "border-b-2 border-blue-500"
                  : "border-b border-transparent"
              } flex-grow py-2 px-4 text-sm font-medium focus:outline-none`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-0.5">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`${activeTab === tab.id ? "" : "hidden"} py-2`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

const MyAccount = () => {
  const { userState } = useUser();
  const user = userState && userState?.user;
  const tabs: Tab[] = [
    { id: 1, title: "Profile", content: <Profile user={user} /> },
    { id: 2, title: "Password", content: <Password /> },
    { id: 3, title: "Address", content: <Address user={user} /> },
    { id: 4, title: "Orders", content: <Orders /> },
  ];

  return (
    <>
      <TopNavOne
        props="style-one bg-black"
        slogan="New customers save 10% with the code GET10"
      />
      <div id="header" className="relative w-full">
        <MenuHome props="bg-transparent" />
        <Breadcrumb heading="My Account" subHeading="My Account" />
      </div>
      <div className="profilepage w-full md:w-10/12 m-auto cart-block md:py-10 py-10 md:my-10 my-0 rounded-lg">
        <div className="container">
          <div className="content-main lg:px-[60px] md:px-4 flex gap-y-8 max-md:flex-col w-full">
            <div className="large-banner left xl:w-1/3 md:w-5/12 w-full xl:pr-[20px] lg:pr-[18px] md:pr-[6px]">
              <Image
                src={"/images/avatar/1.png"}
                width={300}
                height={1000}
                alt="avatar"
                className="rounded-lg"
              />
            </div>
            <div className="right xl:w-2/3 md:w-7/12 w-full xl:pl-[40px] lg:pl-[28px] md:pl-[16px] flex items-center">
              <div className="w-full">
                <Tab defaultTab={1} tabs={tabs} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyAccount;
