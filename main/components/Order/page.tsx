"use client";
import React from "react";
import Image from "next/image";
import TopNavOne from "@/components/Header/TopNav/TopNavOne";
import Footer from "@/components/Footer/Footer";
import MenuSeller from "@/components/Header/Menu/MenuSeller";
import OrderDetails from "@/components/loaders/OrderDetails";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { BaseApi, errorRetry, orderDetails } from "@/constants";
import Error from "@/components/error/page";
import Link from "next/link";
import { calculateTotalQuantity } from "@/scripts/ordercount";
import { formatDate } from "@/scripts/futuredate";
import { useCookies } from "react-cookie";
import { fetcher } from "@/constants/fetcher";
import toast from "react-hot-toast";
import Toast from "@/components/ui/toast";

const Order = () => {
  const params = useParams();

  const [cookies] = useCookies(["usertoken"]);

  let { data, isLoading, error } = useSWR(
    `${BaseApi}${orderDetails}/${params?.id}`,
    (url) => fetcher(url, cookies.usertoken),
    {
      refreshInterval: 3600000,
      revalidateOnMount: true,
      revalidateOnFocus: true,
      onErrorRetry({ retrycount }: any) {
        if (retrycount > errorRetry) {
          return false;
        }
      },
    }
  );

  const authstatus = error?.response?.data?.status == "UNAUTHORIZED" && true;

  const userAddress = (order: any) => {
    const address = order?.customerId?.shippingAddress.filter(
      (address: any) => address._id == order?.addressId
    )[0];
    return address ?? "address not found";
  };

  function calculateTotalAmount(products: any) {
    return products.reduce((total: any, product: any) => {
      const { productId, quantity } = product;
      const { price } = productId;
      return total + price * quantity;
    }, 0);
  }

  if (authstatus) {
    localStorage.removeItem("user");
    toast.custom((t) => (
      <div className={`${t.visible ? "animate-enter" : "animate-leave"} `}>
        <Toast type="danger" message="Session Expired !" />
      </div>
    ));
    if (typeof window !== "undefined") {
      location.href = `/login?ref=order/${params?.id}`;
    }
  }

  return (
    <>
      <TopNavOne
        props="style-one bg-black"
        slogan="New customers save 10% with the code GET10"
      />
      <div id="header" className="relative w-full">
        <MenuSeller props="bg-white" />
      </div>
      <div className="cart-block md:py-20 py-20">
        <div className="container">
          {isLoading ? (
            <div className="list-product w-full ">
              <OrderDetails />
            </div>
          ) : error ? (
            <div className="my-20 w-full md:w-8/12 lg:w-8/12  m-auto">
              <Error />
            </div>
          ) : (
            <div className="content-main flex justify-between max-xl:flex-col gap-y-8">
              <div className="xl:w-2/3 xl:pr-3 w-full">
                <div className="time bg-green py-3 px-5 flex items-center rounded-lg">
                  <div className="heding5">🔥</div>
                  <div className="caption1 pl-2">
                    You have ordered{" "}
                    <span className="min text-red text-button fw-700">
                      {calculateTotalQuantity(data?.orderItems)}{" "}
                      {calculateTotalQuantity(data?.orderItems) == 1
                        ? "Item"
                        : "Items"}
                    </span>{" "}
                    from {data && data?.sellerId?.shopname} on{" "}
                    <span className="min text-red text-button fw-700">
                      {" "}
                      {data && formatDate(data?.createdAt)}
                    </span>{" "}
                  </div>
                </div>
                <div className="list-product w-full sm:mt-7 mt-5">
                  <div className="w-full">
                    <div className="heading bg-surface bora-4 pt-4 pb-4">
                      <div className="flex">
                        <div className="w-1/2">
                          <div className="text-button text-left ml-2">
                            Products
                          </div>
                        </div>
                        <div className="w-1/12">
                          <div className="text-button text-center">Price</div>
                        </div>
                        <div className="w-1/6">
                          <div className="text-button text-center">
                            Quantity
                          </div>
                        </div>
                        <div className="w-1/6">
                          <div className="text-button text-center">Color</div>
                        </div>
                        <div className="w-1/6">
                          <div className="text-button text-center">Size</div>
                        </div>
                        <div className="w-1/6">
                          <div className="text-button text-center">
                            Total Price
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="list-product-main w-full mt-3">
                      {data && data?.orderItems.length < 1 ? (
                        <p className="text-button pt-3">No product found</p>
                      ) : (
                        data &&
                        data?.orderItems.map((product: any) => (
                          <div
                            className="item flex md:mt-7 md:pb-7 mt-5 pb-5 border-b border-line w-full"
                            key={product.id}
                          >
                            <div className="w-1/2">
                              <div className="flex items-center gap-6">
                                <div className="bg-img md:w-[100px] w-20 aspect-[3/4]">
                                  <Image
                                    src={product?.productId?.images[0]}
                                    width={100}
                                    height={100}
                                    alt={product?.productId?.name}
                                    className="w-100 h-100 object-cover rounded-lg"
                                  />
                                </div>
                                <div>
                                  <div className="text-title">
                                    {product?.productId?.name}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="w-1/12 price flex items-center justify-center">
                              <div className="text-title text-center">
                                ₹{product?.productId?.price}.00
                              </div>
                            </div>
                            <div className="w-1/6 flex total-price items-center justify-center">
                              <div className="text-title text-center">
                                {product?.quantity}
                              </div>
                            </div>
                            <div className="w-1/6 flex total-price items-center justify-center">
                              <div className="text-title text-center">
                                {product?.color}
                              </div>
                            </div>
                            <div className="w-1/6 flex total-price items-center justify-center">
                              <div className="text-title text-center">
                                {product?.size}
                              </div>
                            </div>
                            <div className="w-1/6 flex total-price items-center justify-center">
                              <div className="text-title text-center">
                                ₹{product?.quantity * product?.productId?.price}
                                .00
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div
                    style={{ border: "1px dashed grey" }}
                    className="more-infor  p-5 rounded-lg"
                  >
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-1">
                        <div className="text-title">Billed to : </div>
                        <div className="text-secondary">
                          {data && userAddress(data)?.name}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-3">
                      <div className="text-secondary">
                        {data && userAddress(data)?.phone} ,{" "}
                        {data && userAddress(data)?.email}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-3">
                      <div className="text-secondary">
                        {data && userAddress(data)?.address} ,{" "}
                        {data && userAddress(data)?.landmark},{" "}
                        {data && userAddress(data)?.district}{" "}
                        {data && userAddress(data)?.state} ({" "}
                        {data && userAddress(data)?.pincode})
                      </div>
                    </div>
                  </div>
                  <div
                    style={{ border: "1px dashed grey" }}
                    className="more-infor p-5 rounded-lg"
                  >
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-1">
                        <div className="text-title">Sell by : </div>
                        <div className="text-secondary">
                          {data && data?.sellerId?.shopname}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-3">
                      <div className="text-secondary">
                        {data && data?.sellerId?.mobileNo} ,{" "}
                        {data && data?.sellerId?.email}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-3">
                      <div className="text-secondary">
                        {data && data?.sellerId?.shopaddress?.address1},{" "}
                        {data && data?.sellerId?.shopaddress?.landmark} ,{" "}
                        {data && data?.sellerId?.shopaddress?.city}{" "}
                        {data && data?.sellerId?.shopaddress?.state} ({" "}
                        {data && data?.sellerId?.shopaddress?.pincode})
                      </div>
                    </div>
                  </div>
                  <div
                    style={{ border: "1px dashed grey" }}
                    className="more-infor  p-5 rounded-lg"
                  >
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-1">
                        <div className="text-title">Order Number : </div>
                        <div className="text-secondary">
                          {" "}
                          #
                          {data && data?.courior == "Local"
                            ? data && data?.order_id
                            : data && data?.order?.order_id}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-3">
                      <div className="text-title">Courier Company : </div>
                      <div className="text-secondary">
                        {data && data?.courior == "Local"
                          ? data?.sellerId?.deliverypartner?.personal?.name
                          : data?.courior}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-3">
                      <div className="text-title">Shipment Id : </div>
                      <div className="text-secondary">
                        {data && data?.courior == "Local"
                          ? "NA"
                          : "#" + data?.order?.shipment_id}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-3">
                      <div className="text-title">AWB Number : </div>
                      <div className="text-secondary">
                        {" "}
                        {data && data?.courior == "Local"
                          ? "NA"
                          : "#" + data?.order?.awb_number}
                      </div>
                    </div>
                  </div>
                  {data && data?.note && (
                    <div
                      style={{ border: "1px dashed grey" }}
                      className="more-infor  p-5 rounded-lg"
                    >
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <div className="flex items-center gap-1">
                          <div className="text-title">Order Note : </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mt-3">
                        <div className="text-secondary">
                          {data && data?.note}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="xl:w-1/3 xl:pl-12 w-full">
                <div className="checkout-block bg-surface p-6 rounded-2xl">
                  <div className="heading5">Order Summary</div>
                  <div className="total-block py-5 flex justify-between border-b border-line">
                    <div className="text-title">Subtotal</div>
                    <div className="text-title">
                      ₹
                      <span className="total-product">
                        {data && calculateTotalAmount(data?.orderItems)}
                      </span>
                      <span>.00</span>
                    </div>
                  </div>

                  <div className="discount-block py-5 flex justify-between border-b border-line">
                    <div className="text-title">Shipping</div>
                    <div className="text-title">
                      {" "}
                      <span>+₹</span>
                      <span className="discount">{data && data?.shipping}</span>
                      <span>.00</span>
                    </div>
                  </div>
                  <div className="discount-block py-5 flex justify-between border-b border-line">
                    <div className="text-title">Discounts</div>
                    <div className="text-title">
                      {" "}
                      <span>-₹</span>
                      <span className="discount">{data && data?.discount}</span>
                      <span>.00</span>
                    </div>
                  </div>
                  <div className="total-cart-block pt-4 pb-4 flex justify-between">
                    <div className="heading5">Total</div>
                    <div className="heading5">
                      ₹
                      <span className="total-cart heading5">
                        {data && data?.totalAmount}
                      </span>
                      <span className="heading5">.00</span>
                    </div>
                  </div>
                  <div className="block-button flex flex-col items-center gap-y-4 mt-5">
                    {data && data?.courior == "Local" ? (
                      <div className="checkout-btn button-main text-center w-full cursor-not-allowed">
                        Track Order (NA)
                      </div>
                    ) : (
                      <Link
                        className="checkout-btn button-main text-center w-full cursor-pointer"
                        href={`/order-tracking/${
                          data?.order?.awb_number
                        }?courior=${data?.courior
                          .split(" ")
                          .join("-")
                          .toLowerCase()}&corder_id=${data?.id}`}
                      >
                        Track Order
                      </Link>
                    )}
                    {data && data?.courior == "Local" ? (
                      <div className="text-button hover-underline cursor-not-allowed">
                        Download Invoice (NA)
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          // console.log(data?.order?.label);
                          window.open(data?.order?.label, "_blank");
                        }}
                        className="text-button hover-underline cursor-pointer"
                      >
                        Download Invoice
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Order;
