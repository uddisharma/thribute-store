"use client";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";
import MenuHome from "@/components/Header/Menu/MenuHome";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import { Form } from "@/components/ui/form";
import LoadingButton from "@/components/ui/loading-button";
import { BaseApi, createContactRequest } from "@/constants";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { ContactSchema, contactSchema } from "@/validators/contact.schema";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import Toast from "@/components/ui/toast";
const initialValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
};
const Contact = () => {
  return (
    <div>
      <TopNavOne
        props="style-one bg-black"
        slogan="New customers save 10% with the code GET10"
      />
      <div id="header" className="relative w-full">
        <MenuHome props="bg-white" />
        <Breadcrumb heading="Contact Us" subHeading="Contact Us" />
      </div>
      {/* bg-linear */}
      <div className="blog default md:pt-10 md:pb-16 py-20 ">
        <ChooseUs />
      </div>
      <Footer />
    </div>
  );
};

export default Contact;

const ChooseUs = () => {
  const [reset, setReset] = useState({});
  const [loading, setLoading] = useState(false);
  const onSubmit: SubmitHandler<ContactSchema> = (data) => {
    setLoading(true);
    axios
      .post(`${BaseApi}${createContactRequest}`, data)
      .then((res) => {
        if (res.data?.status == "SUCCESS") {
          toast.custom((t) => (
            <div
              className={`${t.visible ? "animate-enter" : "animate-leave"} `}
            >
              <Toast
                type="success"
                message="Your request is sent successfully !"
              />
            </div>
          ));
          setReset(initialValues);
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
  const onSubmit1: SubmitHandler<ContactSchema> = (data) => {
    setLoading(true);
    axios
      .post(`${BaseApi}${createContactRequest}`, data)
      .then((res) => {
        if (res.data?.status == "SUCCESS") {
          toast.custom((t) => (
            <div
              className={`${t.visible ? "animate-enter" : "animate-leave"} `}
            >
              <Toast
                type="success"
                message="Your request is sent successfully !"
              />
            </div>
          ));
          setReset(initialValues);
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
          <div className="bg-img lg:w-6/12 lg:pr-[45px] md:w-1/2 w-full">
            <Image
              src={"/image/contact-us.png"}
              width={1000}
              height={1000}
              alt="bg-img"
              priority={true}
              className="w-full rounded-xl"
            />
          </div>
          <div className="large-banner content lg:w-5/12 lg:pl-[45px] ">
            {/* <div className="heading3">Contact us !</div> */}
            <Form<ContactSchema>
              validationSchema={contactSchema}
              resetValues={reset}
              onSubmit={onSubmit}
              useFormProps={{
                defaultValues: initialValues,
              }}
            >
              {({ register, formState: { errors } }) => (
                <div
                  style={{ border: "1px dotted gray" }}
                  className="md:mt-6 mt-4 p-10 rounded-lg py-10"
                >
                  <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 gap-y-5">
                    <div className="message sm:col-span-2 ">
                      <input
                        className="border-line px-4 py-3 w-full rounded-lg"
                        id="username"
                        type="text"
                        placeholder="Your Name *"
                        {...register("name")}
                      />
                      {errors.name && (
                        <p className="text-red ml-1  text-sm">
                          {errors.name?.message}
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
                      <textarea
                        className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                        id="message"
                        rows={3}
                        placeholder="Your Message *"
                        {...register("message")}
                      />
                      {errors.message && (
                        <p className="text-red ml-1  text-sm">
                          {errors.message?.message}
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
          <div className="small-banner left lg:w-2/3 lg:pr-4">
            <div className="heading3">Contact us !</div>
            <div className="body1 text-secondary2 mt-3">
              Use the form below to get in touch with the sales team
            </div>
            <Form<ContactSchema>
              validationSchema={contactSchema}
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
                        placeholder="Your Name *"
                        {...register("name")}
                      />
                      {errors.name && (
                        <p className="text-red ml-1  text-sm">
                          {errors.name?.message}
                        </p>
                      )}
                    </div>
                    <div className="email">
                      <input
                        className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                        id="phone"
                        type="number"
                        placeholder="Phone Number *"
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
                        placeholder="Email Address *"
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="text-red ml-1  text-sm">
                          {errors.email?.message}
                        </p>
                      )}
                    </div>
                    <div className="message sm:col-span-2">
                      <textarea
                        className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                        id="message"
                        rows={3}
                        placeholder="Your Message *"
                        {...register("message")}
                      />
                      {errors.message && (
                        <p className="text-red ml-1  text-sm">
                          {errors.message?.message}
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
