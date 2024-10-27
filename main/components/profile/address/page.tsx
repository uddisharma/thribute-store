"use client";
import React, { useState } from "react";
import * as Icon from "@phosphor-icons/react/dist/ssr";
import {
  AddAddressFromPanel,
  BaseApi,
  deleteAddress,
  updateAddressFromPanel,
} from "@/constants";
import axios from "axios";
import { SubmitHandler } from "react-hook-form";
import { AddressSchema, addressSchema } from "@/validators/address.schema";
import { Form } from "@/components/ui/form";
import LoadingButton from "@/components/ui/loading-button";
import Toast from "@/components/ui/toast";
import toast from "react-hot-toast";
import { useUser } from "@/context/UserContext";
import NoDataFound from "@/components/no-data/page";
import { useCookies } from "react-cookie";
const Page = ({ user }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState<any>(null);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const [isOpen1, setIsOpen1] = useState(false);

  const openModal1 = () => {
    setIsOpen1(true);
  };

  const closeModal1 = () => {
    setIsOpen1(false);
  };

  const [isOpen2, setIsOpen2] = useState(false);

  const openModal2 = () => {
    // console.log("first");
    setIsOpen2(true);
  };

  const closeModal2 = () => {
    setIsOpen2(false);
  };

  return (
    <>
      <div
        onClick={openModal2}
        style={{ border: "1px dashed grey" }}
        className="more-infor mt-5 p-5 rounded-lg"
      >
        <div className="flex items-center justify-center gap-4 flex-wrap cursor-pointer">
          <div className="flex items-center gap-1 justify-center">
            <Icon.Plus scale={20} />
            <div className="text-title text-center">Add New Address</div>
          </div>
        </div>
      </div>
      <Modal2 isOpen1={isOpen2} onClose1={closeModal2} />
      {user?.shippingAddress?.length <= 0 ? (
        <div className="my-20 w-full  m-auto">
          <NoDataFound />
        </div>
      ) : (
        user?.shippingAddress?.map((item: any, index: any) => (
          <div
            key={index}
            style={{ border: "1px dashed grey" }}
            className="more-infor mt-5 p-5 rounded-lg"
          >
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-1">
                <div className="text-title">{item?.name ?? ""}</div>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3">
              <div className="text-secondary">
                {item?.phone ?? ""} , {item?.email ?? ""}
              </div>
            </div>
            <div className="flex items-center gap-1 mt-3">
              <div className="text-secondary">
                {item?.address ?? ""} , {item?.landmark ?? ""} ,{" "}
                {item?.district ?? ""} {item?.state ?? ""} (
                {item?.pincode ?? ""})
              </div>
            </div>
            <div className="flex items-center justify-evenly md:justify-start md:gap-10 lg:justify-start lg:gap-10 gap-1 mt-3">
              <div
                onClick={() => {
                  openModal1();
                  setAddress(item);
                }}
                className="text-secondary cursor-pointer border-b border-secondary"
              >
                Edit Address
              </div>
              <Modal1
                isOpen1={isOpen1}
                onClose1={closeModal1}
                address={address}
              />
              <div
                onClick={() => {
                  openModal();
                  setAddress(item);
                }}
                className=" cursor-pointer text-red border-b border-red "
              >
                Delete Address
              </div>
              <Modal isOpen={isOpen} onClose={closeModal} address={address} />
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default Page;

const Modal = ({ isOpen, onClose, address }: any) => {
  const { setUser, userState } = useUser();
  const [cookies] = useCookies(["usertoken"]);
  const deleteaddress = (address_id: any) => {
    axios
      .delete(
        `${BaseApi}${deleteAddress}/${userState?.user?.id}/${address_id}`,
        {
          headers: {
            Authorization: `Bearer ${cookies?.usertoken}`,
          },
        }
      )
      .then((res) => {
        if (res.data.status == "SUCCESS") {
          setUser(res.data?.data);
          onClose();
          toast.custom((t) => (
            <div
              className={`${t.visible ? "animate-enter" : "animate-leave"} `}
            >
              <Toast type="success" message="Address Deleted Successfully !" />
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
        console.log(err);
        toast.custom((t) => (
          <div className={`${t.visible ? "animate-enter" : "animate-leave"} `}>
            <Toast type="danger" message="Something went wrong !" />
          </div>
        ));
      });
  };
  if (!isOpen) return null;

  return (
    <>
      <div className={`modal-search-block `} onClick={onClose}>
        <div
          className={`delete-modal modal-search-main max-h-[235px] md:p-10 p-6 rounded-lg ${
            isOpen ? "open" : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="heading6 font-semibold text-center">
            Do you sure to delete this address
          </div>
          <p className="text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
            ratione pariatur atque, iure inventore quod commodi! Unde quisquam
            dolores placeat?
          </p>
          <div className="grid grid-cols-2">
            <button
              onClick={onClose}
              style={{ border: "1px dashed grey" }}
              className="button-main mt-3 w-11/12 m-auto bg-white text-black "
            >
              Cancel
            </button>

            <button
              onClick={() => {
                deleteaddress(address?._id);
              }}
              style={{ border: "1px dashed grey" }}
              className="button-main mt-3 w-11/12 m-auto hover:bg-red hover:text-white bg-red text-white "
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const Modal1 = ({ isOpen1, onClose1, address }: any) => {
  const [reset, _setReset] = useState({});
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();

  const initialValues = {
    name: address?.name ?? "",
    email: address?.email ?? "",
    phone: address?.phone ?? "",
    phone1: address?.phone1 ?? "",
    address: address?.address ?? "",
    city: address?.city ?? "",
    district: address?.district ?? "",
    state: address?.state ?? "",
    pincode: address?.pincode ?? "",
    landmark: address?.landmark ?? "",
  };
  const [cookies] = useCookies(["usertoken"]);
  const onSubmit: SubmitHandler<AddressSchema> = (data) => {
    setLoading(true);
    axios
      .put(`${BaseApi}${updateAddressFromPanel}/${address?._id}`, data, {
        headers: {
          Authorization: `Bearer ${cookies?.usertoken}`,
        },
      })
      .then((res) => {
        if (res.data?.status == "SUCCESS") {
          setUser(res?.data?.data);
          onClose1();
          toast.custom((t) => (
            <div
              className={`${t.visible ? "animate-enter" : "animate-leave"} `}
            >
              <Toast type="success" message="Address updated successfully !" />
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

  if (!isOpen1) return null;

  if (!address) return null;
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
            Update Your Address
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

const Modal2 = ({ isOpen1, onClose1 }: any) => {
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
  const [cookies] = useCookies(["usertoken"]);
  const onSubmit: SubmitHandler<AddressSchema> = (data) => {
    setLoading(true);
    axios
      .put(
        `${BaseApi}${AddAddressFromPanel}`,
        {
          newShippingAddress: data,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies?.usertoken}`,
          },
        }
      )
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
