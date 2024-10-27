import { Form } from "@/components/ui/form";
import LoadingButton from "@/components/ui/loading-button";
import { BaseApi, updateProfileFromPanel } from "@/constants";
import { ProfileSchema, profileSchema } from "@/validators/profile.schema";
import axios from "axios";
import React, { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import toast from "react-hot-toast";
import Toast from "@/components/ui/toast";
import { useCookies } from "react-cookie";
import { useUser } from "@/context/UserContext";

const Profile = ({ user }: any) => {
  const [reset, setReset] = useState({});
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();

  const initialValues = {
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: user?.mobileNo ?? "",
  };
  const [cookies] = useCookies(["usertoken"]);
  const onSubmit: SubmitHandler<ProfileSchema> = (data) => {
    setLoading(true);
    axios
      .patch(`${BaseApi}${updateProfileFromPanel}`, data, {
        headers: {
          Authorization: `Bearer ${cookies?.usertoken}`,
        },
      })
      .then((res) => {
        if (res.data?.status == "SUCCESS") {
          setUser(res.data?.data);
          toast.custom((t) => (
            <div
              className={`${t.visible ? "animate-enter" : "animate-leave"} `}
            >
              <Toast type="success" message="Profile Updated successfully !" />
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
        if (err?.response?.data?.status == "UNAUTHORIZED") {
          localStorage.removeItem("user");
          if (typeof window !== "undefined") {
            location.href = `/login?ref=my-account`;
          }
          toast.custom((t) => (
            <div
              className={`${t.visible ? "animate-enter" : "animate-leave"} `}
            >
              <Toast type="danger" message="Session Expired !" />
            </div>
          ));
        }
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

  if (user) {
    return (
      <div className="text-content w-full">
        <Form<ProfileSchema>
          validationSchema={profileSchema}
          resetValues={reset}
          onSubmit={onSubmit}
          useFormProps={{
            defaultValues: initialValues,
          }}
        >
          {({ register, formState: { errors } }) => (
            <div className="">
              <div className=" mt-5">
                <div className="first-name ">
                  <input
                    className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                    id="firstName"
                    type="text"
                    placeholder="Full name"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-red ml-1  text-sm">
                      {errors.name?.message}
                    </p>
                  )}
                </div>

                <div className="email mt-5">
                  <input
                    className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                    id="email"
                    type="email"
                    placeholder="Email address"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red ml-1  text-sm">
                      {errors.email?.message}
                    </p>
                  )}
                </div>
                <div className="phone-number mt-5">
                  <input
                    className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                    id="phoneNumber"
                    type="number"
                    placeholder="Phone number"
                    {...register("phone")}
                  />
                  {errors.name && (
                    <p className="text-red ml-1  text-sm">
                      {errors.phone?.message}
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
                    Save Changes
                    <Icon.ArrowRight size={18} className="" />
                  </button>
                </div>
              )}
            </div>
          )}
        </Form>
      </div>
    );
  }
};

export default Profile;
