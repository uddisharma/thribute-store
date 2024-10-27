import ProductDetails from "@/components/Seller/Products/page";
import React from "react";

// type Props = {
//   params: { seller: string; id: string };
// };

// export async function generateMetadata(
//   { params }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   const id = params?.id;
//   const seller = params?.seller;

//   const product: any = await fetch(
//     `${BaseApi}${productDetails}/${id}/${seller}`
//   ).then((res) => res.json());

//   const previousImages = (await parent).openGraph?.images || [];

//   let description = "";
//   description = product?.desc && product?.desc?.replace(/<[^>]+>/g, "");
//   description = description?.trim();
//   description = description?.slice(0, 200);

//   return {
//     title: product.name,
//     description,
//     openGraph: {
//       images: [product?.images && product?.images[0], ...previousImages],
//     },
//   };
// }

const page = () => {
  return (
    <div>
      <ProductDetails />
    </div>
  );
};

export default page;
