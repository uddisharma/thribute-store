"use client";
import React, { useEffect, useState } from "react";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Footer from "@/components/Footer/Footer";
import { useCart } from "@/context/CartContext";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Address from "@/components/checkout/address";
import Shippingspeed from "@/components/checkout/Shippingspeed";
import CouponCode from "@/components/checkout/CouponCode";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import OrderNote from "@/components/checkout/OrderNote";
import CartItems from "@/components/checkout/CartItems";
import Rates from "@/components/checkout/Rates";
import MenuSeller from "@/components/Header/Menu/MenuSeller";
import { useCookies } from "react-cookie";
import { useUser } from "@/context/UserContext";
import Toast from "@/components/ui/toast";
import toast from "react-hot-toast";
import axios, { AxiosRequestConfig } from "axios";
import {
  BaseApi,
  chargeCap,
  checkDeliveryService,
  createOrder,
  sellerForCheckout,
} from "@/constants";
import {
  calculateTotalMetrics,
  findAddressById,
  generateOrderId,
} from "@/scripts/checkout";

import { ProductType } from "@/type/ProductType";
import { sendOrderConfirmationEmail } from "@/server/actions/order-confirmation.action";
import NotAccpecting from "@/components/not-accpecting/page";

interface checkoutData {
  shippingAddress: string;
  shippingService: string;
  note: string;
  payment: string;
}
const Checkout = () => {
  const [checkoutData, setCheckOutData] = useState<checkoutData>({
    shippingAddress: "",
    shippingService: "",
    note: "",
    payment: "UPI",
  });
  const { shippingAddress, shippingService, note, payment } = checkoutData;
  const searchParams = useSearchParams();
  const { cartState }: any = useCart();
  let cartitemlist = !searchParams?.has("product")
    ? cartState?.cartArray
    : cartState?.cartArray?.filter((e: any) => {
      return e.id == searchParams?.get("product");
    });

  let [totalCart, _setTotalCart] = useState<number>(0);
  const [activetab, setActiveTab] = useState<string>("shipping-address");

  const handlePayment = (item: string) => {
    setActiveTab(item);
  };

  const [cookies, _setCookie] = useCookies(["usertoken"]);
  const [auth, setAuth] = useState<Boolean>();
  const { userState } = useUser();
  const router = useRouter();
  const params = useParams();
  const user = userState && userState?.user?.name;
  const [coupandiscount, setCoupanDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);

  useEffect(() => {
    const cookieValue = cookies.usertoken;
    if (cookieValue && user) {
      setAuth(true);
    } else if (cookieValue == undefined) {
      setAuth(false);
    } else {
      setAuth(false);
    }
    // eslint-disable-next-line
  }, [user, cookies]);

  const [dimensions, setDimensions] = useState<any>({});
  const [loading1, setLoading1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [courior, setCourior] = useState<any>({});
  const [d_0, setD_0] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [delivery, setDelivery] = useState<any>({
    warehouse: null,
    charge: null,
    shopaddress: null,
    token: null,
    delivery: null,
    storestatus: null,
  });

  const cartitems = cartitemlist?.filter((e: ProductType) => {
    return e?.sellerId?.username.toLowerCase() == params?.seller;
  });

  cartitems &&
    cartitems?.map((item: any) => (totalCart += item.price * item.quantity));

  useEffect(() => {
    const dimensions =
      cartitemlist?.length > 0 && calculateTotalMetrics(cartitemlist);
    setDimensions(dimensions);
  }, [cartitemlist]);

  useEffect(() => {
    setLoading1(true);
    axios
      .get(`${BaseApi}${sellerForCheckout}/${params?.seller}`, {
        headers: {
          Authorization: `Bearer ${cookies?.usertoken}`,
        },
      })
      .then((res) => {
        if (res?.data?.status == "SUCCESS") {
          setDelivery({
            ...delivery,
            shopaddress: res?.data?.data?.address,
            token: res?.data?.data?.token,
            warehouse: res?.data?.data?.warehouse,
            charge: res?.data?.data?.charge,
            delivery: res?.data?.data?.delivery,
            storestatus: res?.data?.data?.storestatus,
          });
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
            location.href = `/login?ref=${params?.seller}/checkout${searchParams.has("product")
              ? `?product=${searchParams.get("product")}`
              : ""
              }`;
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
          <div className={`${t.visible ? "animate-enter" : "animate-leave"}`}>
            <Toast type="danger" message="Something went wrong !" />
          </div>
        ));
      })
      .finally(() => {
        setLoading1(false);
      });
  }, []);

  const address = findAddressById(
    userState?.user?.shippingAddress,
    checkoutData?.shippingAddress
  );

  useEffect(() => {
    // const weight = dimensions?.totalWeight;
    // const length = dimensions?.totalLength;
    // const breadth = dimensions?.totalBreadth;
    // const height = dimensions?.totalHeight;
    const origin = delivery?.shopaddress;
    const destination = address?.pincode;
    const payment_type = "prepaid";
    const order_amount = totalCart;
    const weight = dimensions?.totalWeight;
    const length = 10;
    const breadth = 10;
    const height = 10;
    if (
      (address != null && delivery?.token != null) ||
      delivery?.shopaddress != null
    ) {
      const axiosConfig: AxiosRequestConfig = {
        method: "post",
        url: `${BaseApi}${checkDeliveryService}`,
        data: {
          origin,
          destination,
          payment_type,
          order_amount,
          weight,
          length,
          breadth,
          height,
          token: delivery?.token,
        },
        headers: {
          Authorization: `Bearer ${cookies.usertoken}`,
        },
      };
      setLoading(true);
      axios(axiosConfig)
        .then((res) => {
          if (res.data?.status) {
            if (res?.data?.data) {
              setD_0(true);
              setCourior(res?.data?.data);
            } else {
              setD_0(false);
              toast.custom((t) => (
                <div
                  className={`${t.visible ? "animate-enter" : "animate-leave"
                    } `}
                >
                  <Toast
                    type="warning"
                    message="No courior partner found for this address !"
                  />
                </div>
              ));
            }
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
            <div
              className={`${t.visible ? "animate-enter" : "animate-leave"} `}
            >
              <Toast type="danger" message="Something went wrong !" />
            </div>
          ));
          return err;
        })
        .finally(() => {
          setLoading(false);
        });
    }
    // eslint-disable-next-line
  }, [address]);

  const onSubmit = () => {
    if (shippingAddress == "") {
      return toast.custom((t) => (
        <div className={`${t.visible ? "animate-enter" : "animate-leave"} `}>
          <Toast type="warning" message="Please Select Shipping Address !" />
        </div>
      ));
    }
    if (shippingService == "") {
      return toast.custom((t) => (
        <div className={`${t.visible ? "animate-enter" : "animate-leave"} `}>
          <Toast type="warning" message="Please Select Shipping Service !" />
        </div>
      ));
    }
    if (payment == "") {
      return toast.custom((t) => (
        <div className={`${t.visible ? "animate-enter" : "animate-leave"} `}>
          <Toast type="warning" message="Please Select Payment Type !" />
        </div>
      ));
    }

    const shippingMethod =
      checkoutData?.shippingService?.split("-")[0] == "Local"
        ? "Local"
        : checkoutData?.shippingService?.split("-")[0];

    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
      timeZoneName: "short",
    });

    const formattedTime = formatter.format(now);

    const finalAmount =
      totalCart +
      Number(checkoutData?.shippingService?.split("-")[1]) -
      coupandiscount;

    const nimbusPostOrder = {
      order_number: generateOrderId(10),
      shipping_charges: Number(checkoutData?.shippingService?.split("-")[1]),
      discount: coupandiscount,
      cod_charges: 0,
      payment_type: "prepaid",
      order_amount: finalAmount,
      package_weight: dimensions?.totalWeight,
      package_length: dimensions?.totalLength,
      package_breadth: dimensions?.totalBreadth,
      package_height: dimensions?.totalHeight,
      request_auto_pickup: "no",
      consignee: {
        name: address?.name,
        address: address?.address,
        address_2: address?.landmark,
        city: address?.city,
        state: address?.state,
        pincode: address?.pincode,
        phone: address?.phone,
      },
      pickup: {
        warehouse_name: delivery?.warehouse?.warehouse_name,
        name: delivery?.warehouse?.name,
        address: delivery?.warehouse?.address,
        city: delivery?.warehouse?.city,
        state: delivery?.warehouse?.state,
        pincode: delivery?.warehouse?.pincode,
        phone: delivery?.warehouse?.phone,
      },

      order_items: cartitems?.map((e: any) => {
        return {
          name: e?.name,
          qty: e?.quantity,
          price: e?.price,
          sku: generateOrderId(6),
        };
      }),
      courier_id: checkoutData?.shippingService?.split("-")[2],
      is_insurance: "0",
      tags: "",
    };
    const orderId = generateOrderId(7);

    const calculateCharge = (finalamount: any) => {
      return Math.ceil(finalamount * Number(delivery?.charge)) / 100;
    };
    const calculatedCharge = Math.ceil(calculateCharge(finalAmount));
    const charge = Math.min(calculatedCharge, chargeCap);



    const ourOrder = {
      sellerId: cartitems[0]?.sellerId?.id,
      addressId: checkoutData?.shippingAddress,
      order_id: orderId,
      orderItems: cartitems?.map((e: any) => {
        return {
          productId: e?.id,
          color: e?.selectedColor || e?.colors[0].name,
          size: e?.selectedSize || e?.sizes[0]?.size,
          quantity: e?.quantity,
          amount: e.price * e.quantity,
        };
      }),
      totalAmount: finalAmount,
      charge: charge,
      date: formattedTime?.slice(0, 10),
      shipping: Number(checkoutData?.shippingService?.split("-")[1]),
      discount: coupandiscount,
      courior: shippingMethod,
      note: checkoutData?.note,
      order:
        shippingMethod != "Local"
          ? {
            order_id: 3351555,
            shipment_id: 1929242,
            awb_number: "59632220664",
            courier_id: "5",
            courier_name: "Bluedart",
            status: "booked",
            additional_info: "BOM / TEC",
            payment_type: "cod",
            label:
              "http://nimubs-assets.s3.amazonaws.com/labels/20210127140158-79.pdf",
          }
          : {},
    };

    setOrderLoading(true);
    setTimeout(() => {
      axios
        .post(`${BaseApi}${createOrder}`, ourOrder, {
          headers: {
            Authorization: `Bearer ${cookies?.usertoken}`,
          },
        })
        .then((res) => {
          if (res.data?.status == "SUCCESS") {
            router.push(
              `/${params?.seller}/checkout/${generateOrderId(20)}/order-confirm`
            );
            const orderedProduct =
              cartState &&
              cartitemlist?.map((e: any) => {
                return {
                  id: e?.id,
                  quantity: e?.quantity,
                  name: e?.name,
                  price: e?.price,
                  image: e?.images && e?.images[0],
                };
              });

            return sendOrderConfirmationEmail({
              name: address?.name,
              email: address?.email,
              orderedProduct: orderedProduct,
              total: finalAmount,
              address: `${address?.address}, ${address?.city}, ${address?.state}, ${address?.pincode}`,
              tracking: {
                have: true,
                id: orderId,
              },
              seller: params?.seller,
              order: orderId,
              date: formattedTime?.slice(0, 10),
              shipping: Number(checkoutData?.shippingService?.split("-")[1]),
              discount: coupandiscount,
            });
          } else {
            router.push(
              `/${params?.seller}/checkout/${generateOrderId(20)}/order-failed`
            );
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
              location.href = `/login?ref=${params?.seller}/checkout${searchParams.has("product")
                ? `?product=${searchParams.get("product")}`
                : ""
                }`;
            }
            toast.custom((t) => (
              <div
                className={`${t.visible ? "animate-enter" : "animate-leave"} `}
              >
                <Toast type="danger" message="Session Expired !" />
              </div>
            ));
          }
          router.push(
            `/${params?.seller}/checkout/${generateOrderId(20)}/order-failed`
          );
          console.log(err);
          toast.error("Something went wrong");
        })
        .finally(() => {
          setOrderLoading(false);
        });
    }, 3000);
  };

  if (auth == false) {
    return router.push(
      `/login?ref=${params?.seller}/checkout${searchParams.has("product")
        ? `?product=${searchParams.get("product")}`
        : ""
      }`
    );
  }

  if (delivery?.storestatus == false) {
    return (
      <div className=" w-full  m-auto">
        <NotAccpectingOrder />;
      </div>
    );
  }

  return (
    <>
      <TopNavOne
        props="style-one bg-black"
        slogan="New customers save 10% with the code GET10"
      />
      <div id="header" className="relative w-full">
        <MenuSeller props="bg-transparent" />
        <Breadcrumb heading="Checkout" subHeading="Checkout" />
      </div>
      <div className="cart-block md:py-10 py-5">
        <div className="container">
          <div className="checkoutcontainer content-main w-full  m-auto justify-between">
            <div className="left ">
              <div className="information ">
                <div className="form-checkout">
                  <div className="payment-block ">
                    <div className="list-payment ">
                      <div
                        className={`type bg-surface p-5 border border-line rounded-lg ${activetab === "shipping-address" ? "open" : ""
                          }`}
                      >
                        <input
                          className="cursor-pointer"
                          type="radio"
                          id="credit"
                          name="payment"
                          checked={activetab === "shipping-address"}
                          onChange={() => handlePayment("shipping-address")}
                        />
                        <label
                          className="text-button pl-2 cursor-pointer"
                          htmlFor="credit"
                        >
                          Shipping Address
                        </label>

                        <Address
                          setCheckOutData={setCheckOutData}
                          checkoutData={checkoutData}
                          shippingAddress={shippingAddress}
                        />
                      </div>
                      <div
                        className={`type bg-surface p-5 border border-line rounded-lg mt-5 ${activetab === "shipping-service" ? "open" : ""
                          }`}
                      >
                        <input
                          className="cursor-pointer"
                          type="radio"
                          id="shipping-service"
                          name="payment"
                          checked={activetab === "shipping-service"}
                          onChange={() => handlePayment("shipping-service")}
                        />
                        <label
                          className="text-button pl-2 cursor-pointer"
                          htmlFor="shipping-service"
                        >
                          Shipping Speed
                        </label>
                        <Shippingspeed
                          shippingService={shippingService}
                          setCheckOutData={setCheckOutData}
                          checkoutData={checkoutData}
                          setShipping={setShipping}
                          loading={loading}
                          loading1={loading1}
                          d_0={d_0}
                          courior={courior}
                          delivery={delivery}
                          address={address}
                        />
                      </div>
                      <div
                        className={`type bg-surface p-5 border border-line rounded-lg mt-5 ${activetab === "coupon-code" ? "open" : ""
                          }`}
                      >
                        <input
                          className="cursor-pointer"
                          type="radio"
                          id="coupon-code"
                          name="coupon-code"
                          checked={activetab === "coupon-code"}
                          onChange={() => handlePayment("coupon-code")}
                        />
                        <label
                          className="text-button pl-2 cursor-pointer"
                          htmlFor="coupon-code"
                        >
                          Coupon Code
                        </label>
                        <CouponCode
                          setCoupanDiscount={setCoupanDiscount}
                          totalAmount={totalCart}
                        />
                      </div>
                      <div
                        className={`type bg-surface p-5 border border-line rounded-lg mt-5 ${activetab === "payment-method" ? "open" : ""
                          }`}
                      >
                        <input
                          className="cursor-pointer"
                          type="radio"
                          id="payment-method"
                          name="payment-method"
                          checked={activetab === "payment-method"}
                          onChange={() => handlePayment("payment-method")}
                        />
                        <label
                          className="text-button pl-2 cursor-pointer"
                          htmlFor="payment-method"
                        >
                          Payment Method
                        </label>
                        <PaymentMethod
                          payment={payment}
                          setCheckOutData={setCheckOutData}
                          checkoutData={checkoutData}
                        />
                      </div>
                      <div
                        className={`type bg-surface p-5 border border-line rounded-lg mt-5 ${activetab === "order-note" ? "open" : ""
                          }`}
                      >
                        <input
                          className="cursor-pointer"
                          type="radio"
                          id="apple"
                          name="payment"
                          checked={activetab === "order-note"}
                          onChange={() => handlePayment("order-note")}
                        />
                        <label
                          className="text-button pl-2 cursor-pointer"
                          htmlFor="apple"
                        >
                          Order Note
                        </label>
                        <OrderNote
                          note={note}
                          setCheckOutData={setCheckOutData}
                          checkoutData={checkoutData}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="right ">
              <div className="checkout-block">
                <div className="heading5 pb-3">Your Order</div>
                <div className="list-product-checkout">
                  <CartItems />
                </div>
                <Rates
                  discount={coupandiscount}
                  shipping={shipping}
                  totalCart={totalCart}
                />
              </div>
              {orderLoading ? (
                <button className="button-main w-full mt-5 cursor-not-allowed">
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="#D2EF9A"
                    />
                  </svg>
                  please wait
                </button>
              ) : (
                <button
                  style={{
                    cursor:
                      cartitemlist?.length === 0 ? "not-allowed" : "pointer",
                  }}
                  disabled={cartitemlist?.length === 0}
                  onClick={onSubmit}
                  className="button-main w-full mt-5"
                >
                  Confirm Order
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;

const NotAccpectingOrder = () => {
  return (
    <div className="">
      <TopNavOne
        props="style-one bg-black"
        slogan="New customers save 10% with the code GET10"
      />
      <div id="header" className="relative w-full">
        <MenuSeller props="relative w-full" />
      </div>
      <div className="my-20 w-full md:w-8/12 lg:w-8/12 m-auto">
        <NotAccpecting />
      </div>
      <Footer />
    </div>
  );
};
