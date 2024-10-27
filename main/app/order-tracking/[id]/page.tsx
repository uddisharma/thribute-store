"use client";
import React, { useState } from "react";
import Link from "next/link";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import MenuHome from "@/components/Header/Menu/MenuHome";

const data = {
  status: true,
  data: {
    id: "2482000",
    order_id: "4340000",
    order_number: "#JS5897",
    created: "2021-03-01",
    awb_number: "59650109492",
    rto_awb: "75312963180",
    courier_id: "24",
    warehouse_id: "21135",
    rto_warehouse_id: "21135",
    status: "rto",
    rto_status: "delivered",
    shipment_info: "DEL / VED",
    history: [
      {
        status_code: "IT",
        location: "BAREJA EPU (NCX)",
        event_time: "2021-03-02 18:19",
        message: "SHIPMENT ARRIVED",
      },
      {
        status_code: "IT",
        location: "BAREJA EPU (NCX)",
        event_time: "2021-03-02 22:07",
        message: "SHIPMENT FURTHER CONNECTED",
      },
      {
        status_code: "IT",
        location: "AHMEDABAD HUB (AUB)",
        event_time: "2021-03-02 23:50",
        message: "SHIPMENT ARRIVED AT HUB",
      },
      {
        status_code: "IT",
        location: "AHMEDABAD HUB (AUB)",
        event_time: "2021-03-03 03:20",
        message: "SHIPMENT FURTHER CONNECTED",
      },
      {
        status_code: "IT",
        location: "DELHI HUB (DUB)",
        event_time: "2021-03-03 07:27",
        message: "SHIPMENT ARRIVED AT HUB",
      },
      {
        status_code: "IT",
        location: "GOPINATH BAZAR HUB (GNH)",
        event_time: "2021-03-03 13:14",
        message: "SHIPMENT FURTHER CONNECTED",
      },
      {
        status_code: "IT",
        location: "PASCHIM VIHAR ETAIL (VED)",
        event_time: "2021-03-03 14:50",
        message: "SHIPMENT ARRIVED",
      },
      {
        status_code: "OFD",
        location: "PASCHIM VIHAR ETAIL (VED)",
        event_time: "2021-03-03 14:51",
        message: "SHIPMENT OUT FOR DELIVERY",
      },
      {
        status_code: "EX",
        location: "PASCHIM VIHAR ETAIL (VED)",
        event_time: "2021-03-03 16:03",
        message: "REFUSAL CONFIRMATION CODE VERIFIED",
      },
      {
        status_code: "EX",
        location: "PASCHIM VIHAR ETAIL (VED)",
        event_time: "2021-03-03 16:04",
        message: "CONSIGNEE REFUSED TO ACCEPT",
      },
      {
        status_code: "IT",
        location: "PASCHIM VIHAR ETAIL (VED)",
        event_time: "2021-03-04 09:55",
        message: "UNDELIVERED SHIPMENT HELD AT LOCATION",
      },
      {
        status_code: "IT",
        location: "PASCHIM VIHAR ETAIL (VED)",
        event_time: "2021-03-05 10:16",
        message: "UNDELIVERED SHIPMENT HELD AT LOCATION",
      },
      {
        status_code: "RT-IT",
        location: "PASCHIM VIHAR ETAIL (VED)",
        event_time: "2021-03-05 17:18",
        message: "RETURNED TO ORIGIN AT SHIPPER'S REQUEST",
      },
      {
        status_code: "RT-IT",
        location: "PASCHIM VIHAR ETAIL (VED)",
        event_time: "2021-03-05 17:18",
        message: "SHIPMENT ARRIVED",
      },
      {
        status_code: "RT-IT",
        location: "PASCHIM VIHAR ETAIL (VED)",
        event_time: "2021-03-05 19:52",
        message: "SHIPMENT FURTHER CONNECTED",
      },
      {
        status_code: "RT-IT",
        location: "DELHI HUB (DUB)",
        event_time: "2021-03-05 23:57",
        message: "SHIPMENT ARRIVED AT HUB",
      },
      {
        status_code: "RT-IT",
        location: "DELHI HUB (DUB)",
        event_time: "2021-03-06 02:05",
        message: "SHIPMENT FURTHER CONNECTED",
      },
      {
        status_code: "RT-IT",
        location: "DEL ETAIL HUB (DEH)",
        event_time: "2021-03-06 02:54",
        message: "SHIPMENT IN TRANSIT",
      },
      {
        status_code: "RT-IT",
        location: "DEL ETAIL HUB (DEH)",
        event_time: "2021-03-06 03:35",
        message: "SHIPMENT ARRIVED",
      },
      {
        status_code: "RT-IT",
        location: "DEL ETAIL HUB (DEH)",
        event_time: "2021-03-06 05:10",
        message: "SHIPMENT FURTHER CONNECTED",
      },
      {
        status_code: "RT-IT",
        location: "COD PROCESSING CENTRE II (ITG)",
        event_time: "2021-03-06 07:05",
        message: "SHIPMENT IN TRANSIT",
      },
      {
        status_code: "RT-IT",
        location: "COD PROCESSING CENTRE II (ITG)",
        event_time: "2021-03-06 07:06",
        message: "SHIPMENT ARRIVED",
      },
      {
        status_code: "RT-IT",
        location: "COD PROCESSING CENTRE II (ITG)",
        event_time: "2021-03-07 05:00",
        message: "SHIPMENT FURTHER CONNECTED",
      },
      {
        status_code: "RT-IT",
        location: "ASLALI WAREHOUSE (ASL)",
        event_time: "2021-03-08 00:12",
        message: "SHIPMENT ARRIVED AT HUB",
      },
      {
        status_code: "RT-IT",
        location: "ASLALI WAREHOUSE (ASL)",
        event_time: "2021-03-08 04:46",
        message: "SHIPMENT FURTHER CONNECTED",
      },
      {
        status_code: "RT-IT",
        location: "AHMEDABAD (PMX)",
        event_time: "2021-03-08 06:24",
        message: "SHIPMENT ARRIVED",
      },
      {
        status_code: "RT-IT",
        location: "AHMEDABAD (PMX)",
        event_time: "2021-03-08 07:21",
        message: "SHIPMENT OUT FOR DELIVERY",
      },
      {
        status_code: "RT-DL",
        location: "AHMEDABAD (PMX)",
        event_time: "2021-03-08 11:24",
        message: "SHIPMENT DELIVERED",
      },
    ],
  },
};

interface HistoryItem {
  event_time: string;
}

const newdata: HistoryItem[] = data.data.history.sort(
  (a: HistoryItem, b: HistoryItem) =>
    new Date(b.event_time).getTime() - new Date(a.event_time).getTime()
);
const OrderTracking = () => {
  return (
    <>
      <TopNavOne
        props="style-one bg-black"
        slogan="New customers save 10% with the code GET10"
      />
      <div id="header" className="relative w-full">
        <MenuHome props="bg-transparent" />
        <Breadcrumb heading="Order Tracking" subHeading="Order Tracking" />
      </div>
      <div className="order-tracking md:py-20 py-10">
        <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          <div className="hidden md:block">
            <Image
              src={"/image/track-order1.png"}
              width={500}
              height={1000}
              alt="avatar"
              className="rounded-lg"
            />
          </div>
          <ol className="relative border-s border-gray-200  m-auto dark:border-gray-700">
            {newdata?.map((e: any, i: number) => (
              <li key={i} className="mb-10 ms-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                  <Icon.CheckCircle
                    size={32}
                    className="bg-green rounded-full"
                  />
                </span>
                <div className="flex items-center mb-1 heading6">
                  <h3 className="mb-1 heading6">{e?.message}</h3>
                  {i == 0 && (
                    <span className="bg-green text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3">
                      Latest
                    </span>
                  )}
                </div>

                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  updated on {e?.event_time}
                </time>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                  location : {e?.location}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default OrderTracking;
