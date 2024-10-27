"use server";

import { render } from "@react-email/render";
import OrderConfirmationEmail from "@/email-templates/order-confirmation";
import { sendEmail } from "../email";

export const sendOrderConfirmationEmail = async (data: {
  name: string;
  email: string;
  orderedProduct: any;
  total: any;
  address: string;
  tracking: any;
  seller: any;
  order: any;
  date: any;
  shipping: any;
  discount: any;
}) => {
  const to = `${data?.name}<${data.email}>`;
  const name = data?.name;
  const total = data?.total;
  const products = data?.orderedProduct;
  const address = data?.address;
  const tracking = data?.tracking;
  const seller = data?.seller;
  const order = data?.order;
  const date = data?.date;
  const shipping = data?.shipping;
  const discount = data?.discount;

  sendEmail({
    to: to,
    subject: "Your Order is Confirmed !",
    html: render(
      OrderConfirmationEmail(
        name,
        products,
        total,
        address,
        tracking,
        seller,
        order,
        date,
        shipping,
        discount
      )
    ),
  });

  return true;
};
