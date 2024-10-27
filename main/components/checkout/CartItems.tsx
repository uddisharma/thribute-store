import { useCart } from "@/context/CartContext";
import { ProductType } from "@/type/ProductType";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";

const CartItems = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const { cartState }: any = useCart();
  let cartitemlist = !searchParams?.has("product")
    ? cartState?.cartArray
    : cartState?.cartArray?.filter((e: any) => {
        return e.id == searchParams?.get("product");
      });
  const cartitems = cartitemlist?.filter((e: ProductType) => {
    return e?.sellerId?.username.toLowerCase() == params?.seller;
  });

  return (
    <div>
      {cartitems?.length < 1 ? (
        <p className="text-button pt-3">No product in cart</p>
      ) : (
        cartitems?.map((product: any) => (
          <>
            <div className="item flex items-center justify-between w-full pb-5 border-b border-line gap-6 mt-5">
              <div className="bg-img w-[100px] aspect-square flex-shrink-0 rounded-lg overflow-hidden">
                <Image
                  src={product.images[0]}
                  width={500}
                  height={500}
                  alt="img"
                  className="w-full h-full"
                />
              </div>
              <div className="flex items-center justify-between w-full">
                <div>
                  <div className="name text-title">{product.name}</div>
                  <div className="caption1 text-secondary mt-2">
                    <span className="size capitalize">
                      {product.selectedSize || product.sizes[0].size}
                    </span>
                    <span>/</span>
                    <span className="color capitalize">
                      {product.selectedColor || product.colors[0].name}
                    </span>
                  </div>
                </div>
                <div className="text-title">
                  <span className="quantity">{product.quantity}</span>
                  <span className="px-1">x</span>
                  <span>₹{product.price}.00</span>
                </div>
              </div>
            </div>
          </>
        ))
      )}
    </div>
  );
};

export default CartItems;
