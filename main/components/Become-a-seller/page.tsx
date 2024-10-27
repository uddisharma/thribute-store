"use client";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";
import MenuHome from "@/components/Header/Menu/MenuHome";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import Image from "next/image";
import React, { useState } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import {
  BecomeSellerSchema,
  becomesellerSchema,
} from "@/validators/become-seller.schema";
import { Form } from "@/components/ui/form";
import { SubmitHandler } from "react-hook-form";
import { BaseApi, createSellerRequest } from "@/constants";
import axios from "axios";
import LoadingButton from "@/components/ui/loading-button";
import Toast from "@/components/ui/toast";
import toast from "react-hot-toast";

const initialValues = {
  seller_name: "",
  email: "",
  phone: "",
  monthly_orders: "",
  store_address: "",
};

const Becomeseller = () => {
  return (
    <div>
      <TopNavOne
        props="style-one bg-black"
        slogan="New customers save 10% with the code GET10"
      />
      <div id="header" className="relative w-full">
        <MenuHome props="bg-transparent" />
        <Breadcrumb heading="Become a Seller" subHeading="Become a Seller" />
      </div>
      {/* bg-linear */}
      <div className="blog default md:py-20 py-20 ">
        <ChooseUs />
      </div>
      <Footer />
    </div>
  );
};

export default Becomeseller;

const ChooseUs = () => {
  const [reset, setReset] = useState({});
  const [loading, setLoading] = useState(false);
  const onSubmit: SubmitHandler<BecomeSellerSchema> = (data) => {
    setLoading(true);
    axios
      .post(`${BaseApi}${createSellerRequest}`, data)
      .then((res) => {
        if (res.data?.status === "SUCCESS") {
          setReset(initialValues);
          toast.custom((t) => (
            <div
              className={`${t.visible ? "animate-enter" : "animate-leave"} `}
            >
              <Toast type="success" message="Request has been sent !" />;
            </div>
          ));
        } else if (res.data?.status === "EXIST") {
          toast.custom((t) => (
            <div
              className={`${t.visible ? "animate-enter" : "animate-leave"} `}
            >
              <Toast
                type="warning"
                message="Your request is still under process"
              />
            </div>
          ));
        } else {
          toast.custom((t) => (
            <div
              className={`${t.visible ? "animate-enter" : "animate-leave"} `}
            >
              <Toast type="danger" message="Something went wrong !" />
            </div>
          ));
        }
      })
      .catch((err) => {
        console.log(err);
        toast.custom((t) => (
          <div className={`${t.visible ? "animate-enter" : "animate-leave"} `}>
            <Toast type="danger" message="Something went wrong !" />
          </div>
        ));
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const onSubmit1: SubmitHandler<BecomeSellerSchema> = (data) => {
    setLoading(true);
    axios
      .post(`${BaseApi}${createSellerRequest}`, data)
      .then((res) => {
        if (res.data?.status === "SUCCESS") {
          setReset(initialValues);
          toast.custom((t) => (
            <div
              className={`${t.visible ? "animate-enter" : "animate-leave"} `}
            >
              <Toast type="success" message="Request has been sent !" />;
            </div>
          ));
        } else if (res.data?.status === "EXIST") {
          toast.custom((t) => (
            <div
              className={`${t.visible ? "animate-enter" : "animate-leave"} `}
            >
              <Toast
                type="warning"
                message="Your request is still under process"
              />
            </div>
          ));
        } else {
          toast.custom((t) => (
            <div
              className={`${t.visible ? "animate-enter" : "animate-leave"} `}
            >
              <Toast type="danger" message="Something went wrong !" />
            </div>
          ));
        }
      })
      .catch((err) => {
        console.log(err);
        toast.custom((t) => (
          <div className={`${t.visible ? "animate-enter" : "animate-leave"} `}>
            <Toast type="danger" message="Something went wrong !" />
          </div>
        ));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="choose-us-block mt-[-20px] md:mt-0">
        <div className="container flex max-lg:flex-col max-lg:gap-y-8 items-center justify-between lg:w-11/12 m-auto">
          <div className="bg-img lg:w-6/12 lg:pr-[45px] md:w-1/2 w-6/6">
            {/* <Image
              src={"/images/banner/bg-choose-us-pet.png"}
              width={1200}
              height={1200}
              alt="bg-img"
              priority={true}
              className="w-full"
            /> */}
            <video
              className="w-full border-none rounded-xl"
              muted
              autoPlay
              loop
              src="/video/become-seller.mp4"
            ></video>
          </div>
          <div className="large-banner content lg:w-5/12 lg:pl-[45px]">
            {/* <div className="heading3">Work With Us !</div> */}
            <Form<BecomeSellerSchema>
              validationSchema={becomesellerSchema}
              resetValues={reset}
              onSubmit={onSubmit}
              useFormProps={{
                defaultValues: initialValues,
              }}
            >
              {({ register, formState: { errors } }) => (
                <div
                  style={{ border: "1px dotted gray" }}
                  className="md:mt-6 mt-4  p-10 rounded-lg"
                >
                  <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 gap-y-5">
                    <div className="message sm:col-span-2 ">
                      <input
                        className="border-line px-4 py-3 w-full rounded-lg"
                        id="username"
                        type="text"
                        placeholder="Seller Name *"
                        {...register("seller_name")}
                      />
                      {errors.seller_name && (
                        <p className="text-red ml-1  text-sm">
                          {errors.seller_name?.message}
                        </p>
                      )}
                    </div>
                    <div className="message sm:col-span-2">
                      <input
                        className="border-line px-4 py-3 w-full rounded-lg"
                        id="phone"
                        type="number"
                        maxLength={10}
                        minLength={10}
                        placeholder="Phone No. *"
                        {...register("phone")}
                      />
                      {errors.phone && (
                        <p className="text-red ml-1  text-sm">
                          {errors.phone?.message}
                        </p>
                      )}
                    </div>
                    <div className="message sm:col-span-2">
                      <input
                        className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                        id="email"
                        type="email"
                        placeholder="Email *"
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="text-red ml-1  text-sm">
                          {errors.email?.message}
                        </p>
                      )}
                    </div>

                    <div className="message sm:col-span-2">
                      <input
                        className="border-line px-4 py-3 w-full rounded-lg"
                        id="phone"
                        type="number"
                        maxLength={10}
                        minLength={10}
                        placeholder="Monthly Average Orders *"
                        {...register("monthly_orders")}
                      />
                      {errors.monthly_orders && (
                        <p className="text-red ml-1  text-sm">
                          {errors.monthly_orders?.message}
                        </p>
                      )}
                    </div>
                    <div className="message sm:col-span-2">
                      <input
                        className="border-line px-4 py-3 w-full rounded-lg"
                        id="phone"
                        type="text"
                        placeholder="Store Address *"
                        {...register("store_address")}
                      />
                      {errors.store_address && (
                        <p className="text-red ml-1  text-sm">
                          {errors.store_address?.message}
                        </p>
                      )}
                    </div>
                  </div>
                  {loading ? (
                    <div className="block-button md:mt-7 mt-4">
                      <LoadingButton />
                    </div>
                  ) : (
                    <div className="block-button md:mt-7 mt-4">
                      <button
                        className="button-main bg-black flex gap-2 align-middle justify-center"
                        type="submit"
                      >
                        Continue
                        <Icon.ArrowRight size={18} className="" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </Form>
          </div>
          <div className="small-banner left lg:w-6/12 lg:pr-4">
            <div className="heading3">Work with us !</div>
            <div className="body1 text-secondary2 mt-3">
              Use the form below to get in touch with the sales team
            </div>
            <Form<BecomeSellerSchema>
              validationSchema={becomesellerSchema}
              resetValues={reset}
              onSubmit={onSubmit1}
              useFormProps={{
                defaultValues: initialValues,
              }}
            >
              {({ register, formState: { errors } }) => (
                <div className="md:mt-6 mt-4">
                  <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 gap-y-5">
                    <div className="name ">
                      <input
                        className="border-line px-4 py-3 w-full rounded-lg"
                        id="username"
                        type="text"
                        placeholder="Seller Name *"
                        {...register("seller_name")}
                      />
                      {errors.seller_name && (
                        <p className="text-red ml-1  text-sm">
                          {errors.seller_name?.message}
                        </p>
                      )}
                    </div>
                    <div className="email">
                      <input
                        className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                        id="phone"
                        type="number"
                        placeholder="Seller Phone Number *"
                        {...register("phone")}
                      />
                      {errors.phone && (
                        <p className="text-red ml-1  text-sm">
                          {errors.phone?.message}
                        </p>
                      )}
                    </div>
                    <div className="message sm:col-span-2">
                      <input
                        className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                        id="email"
                        type="email"
                        placeholder="Seller Email Address *"
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="text-red ml-1  text-sm">
                          {errors.email?.message}
                        </p>
                      )}
                    </div>
                    <div className="message sm:col-span-2">
                      <input
                        className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                        id="address"
                        type="text"
                        placeholder="Store Address *"
                        {...register("store_address")}
                      />
                      {errors.store_address && (
                        <p className="text-red ml-1  text-sm">
                          {errors.store_address?.message}
                        </p>
                      )}
                    </div>
                    <div className="message sm:col-span-2">
                      <input
                        className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                        id="orders"
                        type="number"
                        placeholder="Monthly Average Orders *"
                        {...register("monthly_orders")}
                      />
                      {errors.monthly_orders && (
                        <p className="text-red ml-1  text-sm">
                          {errors.monthly_orders?.message}
                        </p>
                      )}
                    </div>
                  </div>
                  {loading ? (
                    <div className="block-button md:mt-7 mt-4">
                      <LoadingButton />
                    </div>
                  ) : (
                    <div className="block-button md:mt-7 mt-4">
                      <button
                        className="button-main bg-black flex gap-2 align-middle justify-center"
                        type="submit"
                      >
                        Continue
                        <Icon.ArrowRight size={18} className="" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};
