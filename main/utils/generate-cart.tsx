export function generateCartProduct(product: any): any {
  return {
    id: product?.id,
    name: product?.name,
    slug: generateSlug(product?.name),
    description: product?.desc,
    image: product?.images,
    price: product?.price,
    quantity: 1,
    size: product.size,
    color: product.color,
    sellerId: product.sellerId._id,
    seller: product.sellerId.username,
    height: product?.height,
    length: product?.length,
    breadth: product?.breadth,
    weight: product?.weight,
  };
}

export function generateSlug(title: string) {
  const slug = title.toLowerCase().replace(/\s+/g, "-");
  return slug.replace(/[^a-z0-9-]/g, "");
}
