// <div className="text-content w-full">
//   <div className="">
//     <div className="pass mt-5">
//       <input
//         className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
//         id="password"
//         type="password"
//         placeholder="Password *"
//         required
//       />
//     </div>
//     <div className="new-pass mt-5">
//       <input
//         className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
//         id="newPassword"
//         type="password"
//         placeholder="New Password *"
//         required
//       />
//     </div>
//     <div className="confirm-pass mt-5">
//       <input
//         className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
//         id="confirmPassword"
//         type="password"
//         placeholder="Confirm Password *"
//         required
//       />
//     </div>
//     <div className="block-button lg:mt-10 mt-6">
//       <button className="button-main">Save Changes</button>
//     </div>
//   </div>
// </div>

"use client";
import { Form } from "@/components/ui/form";
import LoadingButton from "@/components/ui/loading-button";
import { BaseApi, changePasswordFromPanel } from "@/constants";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import {
  ChangePasswordSchema1,
  changePasswordSchema1,
} from "@/validators/password.schema";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import Toast from "@/components/ui/toast";
import toast from "react-hot-toast";
import { useUser } from "@/context/UserContext";
import { useCookies } from "react-cookie";

const Password = () => {
  const [reset, setReset] = useState({});
  const [loading, setLoading] = useState(false);
  const { userState } = useUser();

  const initialValues = {
    oldpassoword: "",
    password: "",
    confirmpassword: "",
  };
  const [cookies] = useCookies(["usertoken"]);
  const onSubmit: SubmitHandler<ChangePasswordSchema1> = (data) => {
    setLoading(true);
    axios
      .patch(
        `${BaseApi}${changePasswordFromPanel}`,
        {
          oldPassword: data?.oldpassword,
          newPassword: data?.confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies?.usertoken}`,
          },
        }
      )
      .then((res) => {
        if (res.data?.status == "SUCCESS") {
          toast.custom((t) => (
            <div
              className={`${t.visible ? "animate-enter" : "animate-leave"} `}
            >
              <Toast type="success" message="Password reset successfully !" />
            </div>
          ));
          setReset(initialValues);
        } else if (res?.data?.status == "FAILURE") {
          toast.custom((t) => (
            <div
              className={`${t.visible ? "animate-enter" : "animate-leave"} `}
            >
              <Toast type="danger" message={res.data?.message} />
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

  return (
    <>
      <div>
        <div className="text-content w-full mt-5">
          <Form<ChangePasswordSchema1>
            validationSchema={changePasswordSchema1}
            resetValues={reset}
            onSubmit={onSubmit}
            useFormProps={{
              defaultValues: initialValues,
            }}
          >
            {({ register, formState: { errors } }) => (
              <div className="text-content w-full">
                <div className="">
                  <div className="pass mt-5">
                    <input
                      className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                      id="password"
                      type="password"
                      placeholder="Old Password *"
                      {...register("oldpassword")}
                    />
                    {errors.oldpassword && (
                      <p className="text-red ml-1  text-sm">
                        {errors.oldpassword?.message}
                      </p>
                    )}
                  </div>
                  <div className="new-pass mt-5">
                    <input
                      className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                      id="newPassword"
                      type="password"
                      placeholder="New Password *"
                      {...register("password")}
                    />
                    {errors.password && (
                      <p className="text-red ml-1  text-sm">
                        {errors.password?.message}
                      </p>
                    )}
                  </div>
                  <div className="confirm-pass mt-5">
                    <input
                      className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm Password *"
                      {...register("confirmPassword")}
                    />
                    {errors.confirmPassword && (
                      <p className="text-red ml-1  text-sm">
                        {errors.confirmPassword?.message}
                      </p>
                    )}
                  </div>
                  {loading ? (
                    <div className="">
                      <LoadingButton />
                    </div>
                  ) : (
                    <button
                      style={{ border: "1px dashed grey" }}
                      className="button-main mt-5 bg-black flex gap-2 align-middle "
                      type="submit"
                    >
                      Save Changes
                      <Icon.ArrowRight size={18} className="" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </Form>
        </div>
      </div>
    </>
  );
};

export default Password;
