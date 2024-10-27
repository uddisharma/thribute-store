"use client";
import React, { useState } from "react";
import Link from "next/link";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";
import MenuHome from "@/components/Header/Menu/MenuHome";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import {
  Forgot_PasswardSchema,
  forgot_passwordSchema,
} from "@/validators/forgot-password.schema";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import axios from "axios";
import { BaseApi, ForgotPassword } from "@/constants";
import { Form } from "@/components/ui/form";
import LoadingButton from "@/components/ui/loading-button";
import Toast from "@/components/ui/toast";
import toast from "react-hot-toast";
const initialValues = {
  email: "",
};
const ForgotPassword1 = () => {
  const [reset, setReset] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onSubmit: SubmitHandler<Forgot_PasswardSchema> = (data) => {
    setLoading(true);
    axios
      .post(`${BaseApi}${ForgotPassword}`, {
        email: data?.email,
      })
      .then((res) => {
        if (res.data.status == "SUCCESS") {
          toast.custom((t) => (
            <div
              className={`${t.visible ? "animate-enter" : "animate-leave"} `}
            >
              <Toast type="success" message="Link has been sent to email !" />
            </div>
          ));
          setReset(initialValues);
          router.push("/");
        } else if (res.data.status == "RECORD_NOT_FOUND") {
          toast.custom((t) => (
            <div
              className={`${t.visible ? "animate-enter" : "animate-leave"} `}
            >
              <Toast type="warning" message="User Not Found !" />
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
      <TopNavOne
        props="style-one bg-black"
        slogan="New customers save 10% with the code GET10"
      />
      <div id="header" className="relative w-full">
        <MenuHome props="bg-transparent" />
        <Breadcrumb
          heading="Forget your password"
          subHeading="Forget your password"
        />
      </div>
      <div className="forgot-pass md:py-20 py-10">
        <div className="container">
          <div className="content-main flex gap-y-8 max-md:flex-col">
            <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
              <div className="heading4">Forgot your password</div>
              <div className="body1 mt-2">
                We will send you an email to reset your password
              </div>
              <Form<Forgot_PasswardSchema>
                validationSchema={forgot_passwordSchema}
                resetValues={reset}
                onSubmit={onSubmit}
                useFormProps={{
                  mode: "onChange",
                  defaultValues: initialValues,
                }}
                className="pt-1.5"
              >
                {({ register, formState: { errors } }) => (
                  <div className="md:mt-7 mt-4">
                    <div className="email ">
                      <input
                        className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                        id="username"
                        type="email"
                        placeholder="Username or email address *"
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="text-red ml-1  text-sm">
                          {errors.email?.message}
                        </p>
                      )}
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
            <div className="right md:w-1/2 w-full lg:pl-[60px] md:pl-[40px] flex items-center">
              <div className="text-content">
                <div className="heading4">New Customer</div>
                <div className="mt-2 text-secondary">
                  Be part of our growing family of new customers! Join us today
                  and unlock a world of exclusive benefits, offers, and
                  personalized experiences.
                </div>
                <div className="block-button md:mt-7 mt-4">
                  <Link href={"/register"} className="button-main">
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPassword1;
