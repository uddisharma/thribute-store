"use client";
import React, { useState } from "react";
import Link from "next/link";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import MenuOne from "@/components/Header/Menu/MenuHome";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";
import { Form } from "@/components/ui/form";
import * as Icon from "@phosphor-icons/react/dist/ssr";

import {
  ResetPasswordSchema1,
  resetPasswordSchema1,
} from "@/validators/reset.schema";
import axios from "axios";
import { BaseApi, ResetPassword } from "@/constants";
import { useParams, useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import LoadingButton from "@/components/ui/loading-button";
import Toast from "@/components/ui/toast";
import toast from "react-hot-toast";

const initialValues = {
  password: "",
  confirmPassword: "",
};

const ResetPassword1 = () => {
  const [reset, setReset] = useState({});
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const onSubmit: SubmitHandler<ResetPasswordSchema1> = (data) => {
    if (data.confirmPassword != data?.password) {
      toast.custom((t) => (
        <div className={`${t.visible ? "animate-enter" : "animate-leave"} `}>
          <Toast type="warning" message="Password should match !" />
        </div>
      ));
    } else {
      setLoading(true);
      axios
        .put(`${BaseApi}${ResetPassword}`, {
          code: params?.id,
          newPassword: data?.password,
        })
        .then((res) => {
          if (res.data.status == "SUCCESS") {
            toast.custom((t) => (
              <div
                className={`${t.visible ? "animate-enter" : "animate-leave"} `}
              >
                <Toast type="success" message="Password reset successfully !" />
              </div>
            ));
            setReset(initialValues);
            router.push("/");
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
            <div
              className={`${t.visible ? "animate-enter" : "animate-leave"} `}
            >
              <Toast type="danger" message="Something went wrong !" />
            </div>
          ));
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  return (
    <>
      <TopNavOne
        props="style-one bg-black"
        slogan="New customers save 10% with the code GET10"
      />
      <div id="header" className="relative w-full">
        <MenuOne props="bg-transparent" />
        <Breadcrumb
          heading="Reset your password"
          subHeading="Reset your password"
        />
      </div>
      <div className="forgot-pass md:py-20 py-10">
        <div className="container">
          <div className="content-main flex gap-y-8 max-md:flex-col">
            <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
              <div className="heading4">Reset your password</div>
              <div className="body1 mt-2">
                We will send you an email to reset your password
              </div>
              <Form<ResetPasswordSchema1>
                validationSchema={resetPasswordSchema1}
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
                        type="password"
                        placeholder="Enter New Password *"
                        {...register("password")}
                      />
                      {errors.password && (
                        <p className="text-red ml-1  text-sm">
                          {errors.password?.message}
                        </p>
                      )}
                    </div>
                    <div className="email mt-5">
                      <input
                        className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                        id="username"
                        type="password"
                        placeholder="Confirm New Password *"
                        {...register("confirmPassword")}
                      />

                      {errors.confirmPassword && (
                        <p className="text-red ml-1  text-sm">
                          {errors.confirmPassword?.message}
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
                <div className="heading4">Remember your password</div>
                <div className="mt-2 text-secondary">
                  Be part of our growing family of new customers! Join us today
                  and unlock a world of exclusive benefits, offers, and
                  personalized experiences.
                </div>
                <div className="block-button md:mt-7 mt-4">
                  <Link href={"/login"} className="button-main">
                    Login
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

export default ResetPassword1;
