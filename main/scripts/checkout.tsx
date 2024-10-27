import Toast from "@/components/ui/toast";
import toast from "react-hot-toast";

export function findShipmentComapanyWithLowCharge(data: any) {
  if (!data || data.length === 0) {
    return null;
  }
  let minCharge = Number.POSITIVE_INFINITY;
  let maxCharge = Number.NEGATIVE_INFINITY;
  let minChargeItem = null;
  let maxChargeItem = null;
  for (const item of data) {
    const freightCharge = item.freight_charges;

    if (freightCharge < minCharge) {
      minCharge = freightCharge;
      minChargeItem = item;
    }

    if (freightCharge > maxCharge) {
      maxCharge = freightCharge;
      maxChargeItem = item;
    }
  }
  return {
    minFreightChargeItem: minChargeItem,
    maxFreightChargeItem: maxChargeItem,
  };
}
export function calculateAfterCoupanAmount(cartTotal: any, coupon: any) {
  if (!coupon || !coupon.code || !coupon.discount || !coupon.discount_type) {
    return toast.custom((t) => (
      <div className={`${t.visible ? "animate-enter" : "animate-leave"} `}>
        <Toast type="danger" message="Invalid coupon data !" />
      </div>
    ));
  }

  if (
    coupon.discount_type !== "percentage" &&
    coupon.discount_type !== "direct_amount"
  ) {
    return toast.custom((t) => (
      <div className={`${t.visible ? "animate-enter" : "animate-leave"} `}>
        <Toast type="danger" message="Unsupported discount type !" />
      </div>
    ));
  }

  if (typeof cartTotal !== "number" || isNaN(cartTotal) || cartTotal < 0) {
    throw new Error("Invalid cart total amount");
  }

  let discountAmount;
  if (coupon.discount_type === "percentage") {
    discountAmount = (cartTotal * coupon.discount) / 100;
  } else {
    discountAmount = coupon.discount;
  }

  const finalAmount = cartTotal - discountAmount;

  return { finalAmount: finalAmount, discountAmount: discountAmount };
}

export function findAddressById(addresses: any, addressId: string): any | null {
  const foundAddress = addresses?.find(
    (address: any) => address._id === addressId
  );
  return foundAddress || null;
}

export function calculateTotalMetrics(items: any) {
  if (items?.length <= 0) return;

  let totalWeight = 0;
  let totalHeight = 0;
  let totalBreadth = 0;
  let totalLength = 0;
  for (const item of items) {
    totalWeight += parseFloat(item.weight) || 0;
    totalHeight += parseFloat(item.height) || 0;
    totalBreadth += parseFloat(item.breadth) || 0;
    totalLength += parseFloat(item.length) || 0;
  }
  return {
    totalWeight,
    totalHeight,
    totalBreadth,
    totalLength,
  };
}

export function generateOrderId(length: any) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars.charAt(randomIndex);
  }

  return result;
}
