"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import MenuHome from "@/components/Header/Menu/MenuHome";
import { LoginSchema, loginSchema } from "@/validators/login.schema";
import { SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useCookies } from "react-cookie";
import { BaseApi, Login } from "@/constants";
import { Form } from "@/components/ui/form";
import LoadingButton from "@/components/ui/loading-button";
import { useUser } from "@/context/UserContext";
import Toast from "@/components/ui/toast";
import toast from "react-hot-toast";

const initialValues = {
  email: "",
  password: "",
  isAgreed: false,
};

const Login1 = () => {
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
      if (params.has("ref")) {
        router.push(`/${params.get("ref")}`);
      } else {
        router.push("/");
      }
    }
    // eslint-disable-next-line
  }, [user]);

  const onSubmit: SubmitHandler<LoginSchema> = (data) => {
    setLoading(true);
    axios
      .post(`${BaseApi}${Login}`, {
        username: data?.email,
        password: data?.password,
      })
      .then((res) => {
        if (res.data.status === "SUCCESS") {
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
              className={`${t.visible ? "animate-enter" : "animate-leave"} `}
            >
              <Toast type="success" message="Login Success !" />
            </div>
          ));
          if (params.has("ref")) {
            router.push(`/${params.get("ref")}`);
          } else {
            router.push("/");
          }
        } else if (res?.data?.message == "blocked") {
          return toast.custom((t) => (
            <div
              className={`${t.visible ? "animate-enter" : "animate-leave"} `}
            >
              <Toast
                type="warning"
                message="Your account is blocked , Please contact us !"
              />
            </div>
          ));
        } else if (res.data?.message == "wrong password") {
          toast.custom((t) => (
            <div
              className={`${t.visible ? "animate-enter" : "animate-leave"} `}
            >
              <Toast type="warning" message="Wrong Password !" />
            </div>
          ));
        } else if (res.data?.message == "user not found") {
          toast.custom((t) => (
            <div
              className={`${t.visible ? "animate-enter" : "animate-leave"} `}
            >
              <Toast type="warning" message="User not found !" />
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
        <Breadcrumb heading="Login" subHeading="Login" />
      </div>
      <div className="login-block md:py-20 py-10">
        <div className="container">
          <div className="content-main flex gap-y-8 max-md:flex-col">
            <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
              <div className="heading4">Login</div>
              <Form<LoginSchema>
                validationSchema={loginSchema}
                resetValues={reset}
                onSubmit={onSubmit}
                useFormProps={{
                  mode: "onChange",
                  defaultValues: initialValues,
                }}
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
                    <div className="pass mt-5">
                      <input
                        className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                        id="password"
                        type="password"
                        placeholder="Password *"
                        {...register("password")}
                      />
                      {errors.password && (
                        <p className="text-red ml-1  text-sm">
                          {errors.password?.message}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-5">
                      <div className="flex items-center">
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
                          className="pl-2 cursor-pointer"
                        >
                          Remember me
                        </label>
                      </div>
                      {errors.isAgreed && (
                        <p className="text-red ml-1  text-sm">
                          {errors.isAgreed?.message}
                        </p>
                      )}
                      <Link
                        href={"/forgot-password"}
                        className="font-semibold hover:underline"
                      >
                        Forgot Your Password?
                      </Link>
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
                          Login
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
                  <Link
                    href={`/register${
                      params?.get("ref") ? "?ref=" + params?.get("ref") : ""
                    }`}
                    className="button-main"
                  >
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

export default Login1;
