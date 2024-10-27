"use client";
import React, { useState } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import { useUser } from "@/context/UserContext";
import { AddAddressFromPanel, BaseApi } from "@/constants";
import axios from "axios";
import { SubmitHandler } from "react-hook-form";
import { AddressSchema, addressSchema } from "@/validators/address.schema";
import { Form } from "@/components/ui/form";
import LoadingButton from "@/components/ui/loading-button";
import Toast from "@/components/ui/toast";
import toast from "react-hot-toast";

const Address = ({ setCheckOutData, checkoutData, shippingAddress }: any) => {
  const { userState } = useUser();

  const [isOpen2, setIsOpen2] = useState(false);

  const openModal2 = () => {
    setIsOpen2(true);
  };

  const closeModal2 = () => {
    setIsOpen2(false);
  };
  return (
    <div>
      <div className="infor ">
        <div
          onClick={openModal2}
          style={{
            border: "1px dashed grey",
            cursor: "pointer",
          }}
          className="more-infor mt-3 mb-5 p-5 rounded-lg"
        >
          <div className="flex items-center justify-center gap-4 flex-wrap cursor-pointer ">
            <div className="flex items-center gap-1 justify-center">
              <Icon.Plus scale={20} />
              <div className="text-title text-center">Add New Address</div>
            </div>
          </div>
        </div>
        <Modal2 isOpen1={isOpen2} onClose1={closeModal2} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
          {userState?.user?.shippingAddress?.length > 0 ? (
            userState?.user?.shippingAddress?.map((item: any) => (
              <div
                onClick={() => {
                  setCheckOutData({
                    ...checkoutData,
                    shippingAddress: String(item?._id),
                  });
                }}
                key={item}
                style={{
                  border:
                    shippingAddress == String(item?._id)
                      ? "2px solid grey"
                      : "1px dashed grey",
                  cursor: "pointer",
                }}
                className="more-infor p-5 rounded-lg"
              >
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-1">
                    <div className="text-title">{item?.name ?? ""}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <div className="text-secondary">
                    {item?.phone ?? ""} , {item?.email ?? ""}
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <div className="text-secondary">
                    {item?.address ?? ""} , {item?.landmark ?? ""} ,{" "}
                    {item?.district ?? ""} {item?.state ?? ""} (
                    {item?.pincode ?? ""})
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">
              No Address Found! Please Add Your Address.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Address;

export const Modal2 = ({ isOpen1, onClose1 }: any) => {
  const [reset, setReset] = useState({});
  const [loading, setLoading] = useState(false);
  const { setUser, userState } = useUser();

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    phone1: "",
    address: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
    landmark: "",
  };

  const onSubmit: SubmitHandler<AddressSchema> = (data) => {
    setLoading(true);
    axios
      .put(`${BaseApi}${AddAddressFromPanel}/${userState?.user?.id}`, {
        newShippingAddress: data,
      })
      .then((res) => {
        if (res.data?.status == "SUCCESS") {
          setUser(res?.data?.user);
          onClose1();
          toast.custom((t) => (
            <div
              className={`${t.visible ? "animate-enter" : "animate-leave"} `}
            >
              <Toast type="success" message="Address added successfully !" />
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

  if (!isOpen1) return null;

  return (
    <>
      <div className={`modal-search-block`} onClick={onClose1}>
        <div
          className={`address-modal modal-search-main max-h-[235px] md:p-10 p-6 rounded-lg ${
            isOpen1 ? "open" : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="heading6 font-semibold text-center">
            Add New Address
          </div>
          <div className="text-content w-full mt-5">
            <Form<AddressSchema>
              validationSchema={addressSchema}
              resetValues={reset}
              onSubmit={onSubmit}
              useFormProps={{
                defaultValues: initialValues,
              }}
            >
              {({ register, formState: { errors } }) => (
                <div className="">
                  <div className="grid sm:grid-cols-2 gap-4 gap-y-5">
                    <div className="first-name ">
                      <input
                        className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                        id="fullname"
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

                    <div className="email ">
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
                    <div className="phone-number">
                      <input
                        className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                        id="phoneNumber"
                        type="number"
                        placeholder="Phone number"
                        {...register("phone")}
                      />
                      {errors.phone && (
                        <p className="text-red ml-1  text-sm">
                          {errors.phone?.message}
                        </p>
                      )}
                    </div>
                    <div className="phone-number">
                      <input
                        className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                        id="phoneNumber"
                        type="number"
                        placeholder="Alternate Phone number"
                        {...register("phone1")}
                      />
                      {errors.phone1 && (
                        <p className="text-red ml-1  text-sm">
                          {errors.phone1?.message}
                        </p>
                      )}
                    </div>
                    <div className="phone-number">
                      <input
                        className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                        id="phoneNumber"
                        type="text"
                        placeholder="Address "
                        {...register("address")}
                      />
                      {errors.address && (
                        <p className="text-red ml-1  text-sm">
                          {errors.address?.message}
                        </p>
                      )}
                    </div>
                    <div className="phone-number">
                      <input
                        className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                        id="phoneNumber"
                        type="text"
                        placeholder="Landmark"
                        {...register("landmark")}
                      />
                      {errors.landmark && (
                        <p className="text-red ml-1  text-sm">
                          {errors.landmark?.message}
                        </p>
                      )}
                    </div>
                    <div className="phone-number">
                      <input
                        className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                        id="phoneNumber"
                        type="text"
                        placeholder="City"
                        {...register("city")}
                      />
                      {errors.city && (
                        <p className="text-red ml-1  text-sm">
                          {errors.city?.message}
                        </p>
                      )}
                    </div>
                    <div className="phone-number">
                      <input
                        className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                        id="phoneNumber"
                        type="number"
                        placeholder="Pincode"
                        {...register("pincode")}
                      />
                      {errors.pincode && (
                        <p className="text-red ml-1  text-sm">
                          {errors.pincode?.message}
                        </p>
                      )}
                    </div>
                    <div className="phone-number">
                      <input
                        className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                        id="phoneNumber"
                        type="text"
                        placeholder="District"
                        {...register("district")}
                      />
                      {errors.district && (
                        <p className="text-red ml-1  text-sm">
                          {errors.district?.message}
                        </p>
                      )}
                    </div>
                    <div className="phone-number">
                      <input
                        className="border-line px-4 pt-3 pb-3 w-full rounded-lg"
                        id="phoneNumber"
                        type="text"
                        placeholder="State"
                        {...register("state")}
                      />
                      {errors.state && (
                        <p className="text-red ml-1  text-sm">
                          {errors.state?.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2">
                    <button
                      onClick={onClose1}
                      style={{ border: "1px dashed grey" }}
                      className="button-main mt-3 w-11/12 m-auto bg-white text-black "
                    >
                      Cancel
                    </button>

                    {loading ? (
                      <div className="">
                        <LoadingButton />
                      </div>
                    ) : (
                      <button
                        style={{ border: "1px dashed grey" }}
                        className="button-main mt-3 w-11/12 m-auto bg-black flex gap-2 align-middle justify-center"
                        type="submit"
                      >
                        Save
                        <Icon.ArrowRight size={18} className="" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};
