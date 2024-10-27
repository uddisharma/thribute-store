"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import MenuOne from "@/components/Header/Menu/MenuHome";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { SignUpSchema, signUpSchema } from "@/validators/register.schema";
import { SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useCookies } from "react-cookie";
import { BaseApi, Login, Register } from "@/constants";
import { Form } from "@/components/ui/form";
import LoadingButton from "@/components/ui/loading-button";
import { useUser } from "@/context/UserContext";
import Toast from "@/components/ui/toast";
import toast from "react-hot-toast";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  isAgreed: false,
};

const Register1 = () => {
  const [reset, setReset] = useState({});
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["usertoken"]);
  const { userState, setUser } = useUser();

  const user = userState && userState?.user?.name;
  useEffect(() => {
    const cookieValue = cookies.usertoken;
    if (cookieValue && user) {
      router.push("/");
    }
    // eslint-disable-next-line
  }, [user]);

  const onSubmit: SubmitHandler<SignUpSchema> = (data) => {
    if (data?.confirmPassword != data?.password) {
      return alert("Passwords doesn't match");
    }
    setLoading(true);
    axios
      .post(`${BaseApi}${Register}`, {
        name: data?.name,
        email: data?.email,
        mobileNo: data?.phone,
        password: data?.password,
        userType: 1,
      })
      .then((res) => {
        if (res.data.status == "SUCCESS") {
          axios
            .post(`${BaseApi}${Login}`, {
              username: data?.email,
              password: data?.password,
            })
            .then((res) => {
              if (res.data.status === "SUCCESS") {
                setReset(initialValues);
                const expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() + 7);
                setCookie("usertoken", res.data.data.token, {
                  path: "/",
                  expires: expirationDate,
                });
                setUser(res.data?.data);
                setReset(initialValues);
                toast.custom((t) => (
                  <div
                    className={`${
                      t.visible ? "animate-enter" : "animate-leave"
                    } `}
                  >
                    <Toast
                      type="success"
                      message="Registration Successfull !"
                    />
                    ;
                  </div>
                ));
                if (params.has("ref")) {
                  router.push(`/${params.get("ref")}`);
                } else {
                  router.push("/");
                }
              } else if (res.data?.message == "wrong password") {
                toast.custom((t) => (
                  <div
                    className={`${
                      t.visible ? "animate-enter" : "animate-leave"
                    } `}
                  >
                    <Toast type="warning" message="Wrong Password !" />
                  </div>
                ));
              } else if (res.data?.message == "user not found") {
                toast.custom((t) => (
                  <div
                    className={`${
                      t.visible ? "animate-enter" : "animate-leave"
                    } `}
                  >
                    <Toast type="warning" message="User not found !" />
                  </div>
                ));
              } else {
                toast.custom((t) => (
                  <div
                    className={`${
                      t.visible ? "animate-enter" : "animate-leave"
                    } `}
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
                  className={`${
                    t.visible ? "animate-enter" : "animate-leave"
                  } `}
                >
                  <Toast type="danger" message="Something went wrong !" />
                </div>
              ));
            })
            .finally(() => {
              setLoading(false);
            });
          setReset({ ...initialValues, isAgreed: false });
        } else if (res.data.status == "EXIST") {
          toast.custom((t) => (
            <div
              className={`${t.visible ? "animate-enter" : "animate-leave"} `}
            >
              <Toast type="warning" message="User Already Exist !" />
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
        if (err.response.status == 422) {
          toast.custom((t) => (
            <div
              className={`${t.visible ? "animate-enter" : "animate-leave"} `}
            >
              <Toast type="warning" message="User Already Exist !" />
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
        <MenuOne props="bg-transparent" />
        <Breadcrumb
          heading="Create An Account"
          subHeading="Create An Account"
        />
      </div>
      <div className="register-block md:py-20 py-10">
        <div className="container">
          <div className="content-main flex gap-y-8 max-md:flex-col">
            <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
              <div className="heading4">Register</div>
              <Form<SignUpSchema>
                validationSchema={signUpSchema}
                resetValues={reset}
                onSubmit={onSubmit}
                useFormProps={{
                  defaultValues: initialValues,
                }}
              >
                {({ register, formState: { errors } }) => (
                  <div className="md:mt-7 mt-4">
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 gap-y-5">
                      <div className="message sm:col-span-2">
                        <input
                          className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                          id="name"
                          type="text"
                          placeholder="Full Name *"
                          {...register("name")}
                        />
                        {errors.name && (
                          <p className="text-red ml-1  text-sm">
                            {errors.name?.message}
                          </p>
                        )}
                      </div>
                      <div className="email ">
                        <input
                          className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                          id="username"
                          type="email"
                          placeholder="Email address *"
                          {...register("email")}
                        />
                        {errors.email && (
                          <p className="text-red ml-1 text-sm">
                            {errors.email?.message}
                          </p>
                        )}
                      </div>
                      <div className="phone ">
                        <input
                          className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                          id="phone"
                          type="tel"
                          placeholder="Phone Number *"
                          {...register("phone")}
                        />
                        {errors.phone && (
                          <p className="text-red ml-1 text-sm">
                            {errors.phone?.message}
                          </p>
                        )}
                      </div>
                      <div className="pass ">
                        <input
                          className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                          id="password"
                          type="password"
                          placeholder="Password *"
                          {...register("password")}
                        />
                        {errors.password && (
                          <p className="text-red ml-1 text-sm">
                            {errors.password?.message}
                          </p>
                        )}
                      </div>
                      <div className="confirm-pass ">
                        <input
                          className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm Password *"
                          {...register("confirmPassword")}
                        />
                        {errors.confirmPassword && (
                          <p className="text-red ml-1 text-sm">
                            {errors.confirmPassword?.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center mt-5">
                      <div className="block-input">
                        <input
                          type="checkbox"
                          id="remember"
                          {...register("isAgreed")}
                        />
                        <Icon.CheckSquare
                          size={20}
                          weight="fill"
                          className="icon-checkbox"
                        />
                      </div>
                      <label
                        htmlFor="remember"
                        className="pl-2 cursor-pointer text-secondary2"
                      >
                        I agree to the
                        <Link
                          href={"#!"}
                          className="text-black hover:underline pl-1"
                        >
                          Terms of User
                        </Link>
                      </label>
                    </div>
                    {errors.isAgreed && (
                      <p className="text-red ml-1 text-sm">
                        {errors.isAgreed?.message}
                      </p>
                    )}
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
                          Register
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
                <div className="heading4">Already have an account?</div>
                <div className="mt-2 text-secondary">
                  Welcome back. Sign in to access your personalized experience,
                  saved preferences, and more. We{String.raw`'re`} thrilled to
                  have you with us again!
                </div>
                <div className="block-button md:mt-7 mt-4">
                  <Link href={"/login"} className="button-main ">
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

export default Register1;
